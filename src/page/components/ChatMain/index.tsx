import DialogCardList from '../DialogCardList';
import DialogInput from '../DialogInput';
import SidebarHeader from '../Sidebar/components/sidebarHeader';
import { useSidebarStore } from '../Sidebar/store';
import styles from './index.module.css';

const ChatMain: React.FunctionComponent = () => {
    const isOpen = useSidebarStore((state) => state.isOpen);
    return (
        <div className={styles.chatMain}>
            <div className={styles.sidebarHeader}>
                {!isOpen && <SidebarHeader /> }
            </div>
            <DialogCardList />
            <DialogInput />
        </div>
    );
};

export default ChatMain;
