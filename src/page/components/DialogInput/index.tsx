import styles from './index.module.css';
import { Input, Tooltip } from 'antd';
import SendSvg from './assets/sendSvg.js';
import LoadingSvg from './assets/loadingSvg.js';
import classNames from 'classnames';
import { useDialogInputStore } from './store.js';
import { stopSSE, connectSSE, type Major, type Message } from '../../utils/sse.js';
import { useDialogCardListStore } from '../DialogCardList/store.js';

const { TextArea } = Input;

const DialogInput: React.FunctionComponent = () => {
    const inputStore = useDialogInputStore();
    const dialogCardListStore = useDialogCardListStore();
    const sendData = () => {
        if (inputStore.inputLoading) {
            stopSSE();
            inputStore.setInputLoading(false);
            return;
        }
        if (!inputStore.inputValue) {
            return;
        }
        const url = 'http://localhost:3002/chat';
        const data = {
            message: inputStore.inputValue,
        };
        dialogCardListStore.addDialogCard({
            question: inputStore.inputValue,
            answer: '',
            cardId: '',
        });
        inputStore.setInputValue('');
        inputStore.setInputLoading(true);
        const messageCallback = (message: Message) => {
            dialogCardListStore.changeLastAnswer(message.content);
        };
        const closeCallback = () => {
            inputStore.setInputLoading(false);
        };
        const majorCallback = (major: Major) => {
            dialogCardListStore.changeLastId(major.id);
        };
        connectSSE(url, data, {
            message: messageCallback,
            major: majorCallback,
            close: closeCallback,
        });
    };
    return (
        <div className={classNames({
            [styles.dialogInput]: true,
            [styles.bottomInput]: dialogCardListStore.dialogCardList,
        })}
        >
            <TextArea onChange={(e) => {
                inputStore.setInputValue(e.target.value);
            }}
                value={inputStore.inputValue}
                className={styles.textArea}
            />
            {
                !inputStore.inputLoading ? (
                    <div 
                        onClick={sendData}
                        className={classNames({
                            [styles.sendBtn]: true,
                            [styles.disableBtn]: !inputStore.inputValue,
                            [styles.loading]: inputStore.inputLoading,
                        })}
                    >
                        <SendSvg />
                    </div>
                ) : (
                    <Tooltip placement="top" title="停止生成">
                        <div 
                            onClick={() => {
                                inputStore.setInputLoading(false);
                                stopSSE();
                            }}
                            className={classNames({
                                [styles.sendBtn]: true,
                                [styles.loading]: true,
                            })}
                        >
                            <LoadingSvg /> 
                        </div>
                    </Tooltip>
                )
            }
        </div>
    );
};

export default DialogInput;
