import DialogInput from '../DialogInput';
import styles from './index.module.css';

const ChatMain: React.FunctionComponent = () => {
    console.log('ChatMain');
    return (
        <div className={styles.chatMain}>
            <DialogInput />
        </div>
    );
};

export default ChatMain;
