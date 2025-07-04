import DialogCardList from '../DialogCardList';
import DialogInput from '../DialogInput';
import styles from './index.module.css';

const ChatMain: React.FunctionComponent = () => {
    return (
        <div className={styles.chatMain}>
            <DialogCardList />
            <DialogInput />
        </div>
    );
};

export default ChatMain;
