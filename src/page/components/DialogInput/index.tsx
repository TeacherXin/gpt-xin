import styles from './index.module.css';
import { Input, Tooltip } from 'antd';
import SendSvg from './assets/sendSvg.js';
import LoadingSvg from './assets/loadingSvg.js';
import classNames from 'classnames';
import { useDialogInputStore } from './store.js';
import { stopSSE, connectSSE, type Major, type Message, type SendData } from '../../utils/sse.js';
import { useDialogCardListStore } from '../DialogCardList/store.js';
import SkillList from '../SkillList/index.js';
import axios from 'axios';
import { useSkillStore } from '../SkillList/store.js';

const { TextArea } = Input;
let controller = new AbortController();


const DialogInput: React.FunctionComponent = () => {
    const inputStore = useDialogInputStore();
    const dialogCardListStore = useDialogCardListStore();
    const skillStore = useSkillStore();
    const sendData = () => {
        if (skillStore.selectedSkill === 'picture') {
            sendDataByPicture(inputStore.inputValue);
            return;
        }
        if (inputStore.inputLoading) {
            stopSSE();
            inputStore.setInputLoading(false);
            return;
        }
        if (!inputStore.inputValue) {
            return;
        }
        const url = 'http://localhost:3002/chat';
        const data: SendData = {
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
            if (major.sessionId) {
                dialogCardListStore.setSessionId(major.sessionId);
            }
        };
        if (dialogCardListStore.sessionId) {
            data.sessionId = dialogCardListStore.sessionId;
        }
        connectSSE(url, data, {
            message: messageCallback,
            major: majorCallback,
            close: closeCallback,
        });
    };

    const sendDataByPicture = (message: string) => {
        inputStore.setInputValue('');
        dialogCardListStore.addDialogCard({
            question: message,
            answer: '',
            cardId: '',
            isPicture: true,
        });
        inputStore.setInputLoading(true);
        axios.post('http://localhost:3002/picture', {message}, {signal: controller.signal}).then(res => {
            if (res.data.data && res.data.code === 0) { 
                const { data, cardId } = res.data; 
                dialogCardListStore.changeLastAnswer(data); 
                dialogCardListStore.changeLastId(cardId);
                inputStore.setInputLoading(false);
            }
        })
    }
    return (
        <div className={classNames({
            [styles.dialogInput]: true,
            [styles.bottomInput]: dialogCardListStore.dialogCardList?.length,
        })}
        >
            <TextArea onChange={(e) => {
                inputStore.setInputValue(e.target.value);
            }}
                value={inputStore.inputValue}
                className={styles.textArea}
            />
            {dialogCardListStore.dialogCardList.length === 0 && <SkillList />}
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
                                if (skillStore.selectedSkill === 'picture') {
                                    controller.abort();
                                    controller = new AbortController();
                                }
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
