import { useDialogCardListStore } from '../DialogCardList/store';
import { useSkillStore } from '../SkillList/store';
import styles from './index.module.css';


const Sidebar: React.FunctionComponent = () => {
    const dialogCardListStore = useDialogCardListStore();
    const skillStore = useSkillStore();

    const newSessionClick = () => {
        dialogCardListStore.clear();
        skillStore.setSelectedSkill('');
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.newBtn} onClick={newSessionClick}>新建对话</div>
        </div>
    );
};

export default Sidebar;
