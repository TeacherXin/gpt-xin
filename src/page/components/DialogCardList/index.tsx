import styles from './index.module.css';
import { useDialogCardListStore } from './store';
import ReactMarkDown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useDialogInputStore } from '../DialogInput/store';
import { Spin } from 'antd';


const DialogCardList: React.FunctionComponent = () => {
    const dialogCardListStore = useDialogCardListStore();
    const dialogInputStore = useDialogInputStore();

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
        <div className={styles.scrollContainer}>
            <div className={styles.dialogCardList}>
                {dialogCardListStore.dialogCardList.map((item, index) => {
                    return (
                        <div className={styles.dialogCard} key={item.cardId}>
                            <div className={styles.question}>
                                <p>{item.question}</p>
                            </div>
                            {
                                item.isPicture ? (
                                    <div key={item.cardId} className={styles.pictureItem}>
                                        {
                                            dialogInputStore.inputLoading && index === dialogCardListStore.dialogCardList.length - 1 ? 
                                                <Spin className={styles.spin} /> : 
                                                <img src={item.answer} alt="" />
                                        }
                                    </div>
                                ) : (
                                    <div className={styles.answer}>
                                        <ReactMarkDown components={{ code: getCode }}>
                                            {item.answer}
                                        </ReactMarkDown>
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
