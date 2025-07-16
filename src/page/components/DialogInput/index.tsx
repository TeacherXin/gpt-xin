import styles from './index.module.css';
import { Input, Tooltip } from 'antd';
import SendSvg from './assets/send.svg?react';
import LoadingSvg from './assets/loading.svg?react';
import classNames from 'classnames';
import { useDialogInputStore } from './store.js';
import { stopSSE, connectSSE, type Major, type Message, type SendData, type CallBackMap } from '../../utils/sse.js';
import { useDialogCardListStore } from '../DialogCardList/store.js';
import SkillList from '../SkillList/index.js';
import axios from 'axios';
import { useSkillStore } from '../SkillList/store.js';

const { TextArea } = Input;
let controller = new AbortController();


const DialogInput: React.FunctionComponent = () => {
    const inputStore = useDialogInputStore();
    const dialogCardList = useDialogCardListStore((state) => state.dialogCardList);
    const sessionId = useDialogCardListStore((state) => state.sessionId);
    const changeLastHtmlUrl = useDialogCardListStore((state) => state.changeLastHtmlUrl);
    const addDialogCard = useDialogCardListStore((state) => state.addDialogCard);
    const changeLastAnswer = useDialogCardListStore((state) => state.changeLastAnswer);
    const changeLastId = useDialogCardListStore((state) => state.changeLastId);
    const setSessionId = useDialogCardListStore((state) => state.setSessionId);
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
        const url = '/api/chat';
        const data: SendData = {
            message: inputStore.inputValue,
        };
        addDialogCard({
            question: inputStore.inputValue,
            answer: '',
            cardId: '',
        });
        inputStore.setInputValue('');
        inputStore.setInputLoading(true);
        const messageCallback = (message: Message) => {
            changeLastAnswer(message.content);
        };
        const closeCallback = () => {
            inputStore.setInputLoading(false);
        };
        const majorCallback = (major: Major) => {
            changeLastId(major.id);
            if (major.sessionId) {
                setSessionId(major.sessionId);
            }
        };
        if (sessionId) {
            data.sessionId = sessionId;
        }
        const callbackMap: CallBackMap =  {
            message: messageCallback,
            major: majorCallback,
            close: closeCallback,
        }
        if (skillStore.selectedSkill === 'html') {
            data.type = 'html';
            callbackMap.source = (source) => {
                changeLastHtmlUrl(source.html);
            };
        }
        connectSSE(url, data, callbackMap);
    };

    const sendDataByPicture = (message: string) => {
        inputStore.setInputValue('');
        addDialogCard({
            question: message,
            answer: '',
            cardId: '',
            isPicture: true,
        });
        inputStore.setInputLoading(true);
        axios.post('/api/picture', {message}, {signal: controller.signal}).then(res => {
            if (res.data.data && res.data.code === 0) { 
                const { data, cardId } = res.data; 
                changeLastAnswer(data); 
                changeLastId(cardId);
                inputStore.setInputLoading(false);
            }
        })
    }
    return (
        <div className={classNames({
            [styles.dialogInput]: true,
            [styles.bottomInput]: dialogCardList?.length,
        })}
        >
            <TextArea onChange={(e) => {
                inputStore.setInputValue(e.target.value);
            }}
                value={inputStore.inputValue}
                className={styles.textArea}
            />
            {dialogCardList.length === 0 && <SkillList />}
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
