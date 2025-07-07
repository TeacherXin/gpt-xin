import styles from './index.module.css';
import { useDialogCardListStore } from './store';
import ReactMarkDown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { hybrid } from 'react-syntax-highlighter/dist/esm/styles/hljs';


const DialogCardList: React.FunctionComponent = () => {
    const dialogCardListStore = useDialogCardListStore();

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
                {dialogCardListStore.dialogCardList.map((item) => {
                    return (
                        <div className={styles.dialogCard} key={item.cardId}>
                            <div className={styles.question}>
                                <p>{item.question}</p>
                            </div>
                            <div className={styles.answer}>
                                <ReactMarkDown components={{ code: getCode }}>
                                    {item.answer}
                                </ReactMarkDown>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DialogCardList;
