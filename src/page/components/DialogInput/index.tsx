import styles from './index.module.css';
import { Input } from 'antd';
import SendSvg from './assets/sendSvg.js';
import classNames from 'classnames';
import { useDialogInputStore } from './store.js';
import { connectSSE } from '../../utils/sse.js';

const { TextArea } = Input;

const DialogInput: React.FunctionComponent = () => {
    const inputStore = useDialogInputStore();
    const sendData = () => {
        const url = 'http://localhost:3002/chat';
        const sendData = {
            message: inputStore.inputValue,
        };
        connectSSE(url, sendData);
    };
    return (
        <div className={styles.dialogInput}>
            <TextArea onChange={(e) => {
                inputStore.setInputValue(e.target.value);
            }}
                value={inputStore.inputValue}
                className={styles.textArea}
            />
            <div onClick={sendData}
                className={classNames({
                [styles.sendBtn]: true,
                [styles.disableBtn]: !inputStore.inputValue,
            })}
            >
                <SendSvg />
            </div>
        </div>
    );
};

export default DialogInput;
