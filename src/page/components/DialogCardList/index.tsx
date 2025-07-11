import { useRef, useEffect } from 'react';
import styles from './index.module.css';
import { useDialogCardListStore } from './store';
import ReactMarkDown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useDialogInputStore } from '../DialogInput/store';
import { Spin } from 'antd';


const DialogCardList: React.FunctionComponent = () => {
    const dialogCardList = useDialogCardListStore((state) => state.dialogCardList);
    const inputLoading = useDialogInputStore((state) => state.inputLoading);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollContainerRef.current && inputLoading) {
            const scrollHeight = scrollContainerRef.current.scrollHeight;
            scrollContainerRef.current!.scrollTop = scrollHeight+ 200;
        }
    }, [dialogCardList[dialogCardList.length - 1]?.answer,
        dialogCardList[dialogCardList.length - 1]?.htmlUrl,
        inputLoading])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getCode = (params: any) => {
        const { inline, className, children, ...props } = params;
        const match = /language-(\w+)/.exec(className || '');
        return !inline && match ? (
            <SyntaxHighlighter
                className={styles.codeBlock}
                language={match[1]}
                PreTag="div"
                style={hybrid}
                {...props}
            >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        );
    };
    

    return (
        <div ref={scrollContainerRef} className={styles.scrollContainer}>
            <div className={styles.dialogCardList}>
                {dialogCardList.map((item, index) => {
                    return (
                        <div className={styles.dialogCard} key={item.cardId}>
                            <div className={styles.question}>
                                <p>{item.question}</p>
                            </div>
                            {
                                item.isPicture ? (
                                    <div key={item.cardId} className={styles.pictureItem}>
                                        {
                                            inputLoading && index === dialogCardList.length - 1 ? 
                                                <Spin className={styles.spin} /> : 
                                                <img src={item.answer} alt="" />
                                        }
                                    </div>
                                ) : (
                                    <div className={styles.answer}>
                                        <ReactMarkDown components={{ code: getCode }}>
                                            {item.answer}
                                        </ReactMarkDown>
                                        {item.htmlUrl && <a href={item.htmlUrl} target="_blank" rel="noreferrer">查看完整网页</a>}
                                    </div>
                                )
                            }
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DialogCardList;
