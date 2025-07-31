import classNames from 'classnames';
import { useDialogCardListStore } from '../DialogCardList/store';
import { useSkillStore } from '../DialogInput/components/SkillList/store';
import logo from './assets/Logo.png';
import SwitchSvg from './assets/switch.svg?react';
import styles from './index.module.css';
import { useSidebarStore } from './store';


const Sidebar: React.FunctionComponent = () => {
    const dialogCardListStore = useDialogCardListStore();
    const skillStore = useSkillStore();
    const sidebarStore = useSidebarStore();

    const newSessionClick = () => {
        dialogCardListStore.clear();
        skillStore.setSelectedSkill('');
    }

    return (
        <div className={classNames({
            [styles.sidebarContainer]: true,
            [styles.sidebarContainerHide]: !sidebarStore.isOpen,
        })}
        >
            <div className={styles.sidebar}>
                <div className={styles.logoItem}>
                    <img src={logo} alt='' />
                    <div className={styles.title}>GptXin</div>
                    <SwitchSvg onClick={() => {
                    sidebarStore.toggleSidebar();
                }}
                    />
                </div>
                <div className={styles.newBtn} onClick={newSessionClick}>新建对话</div>
            </div>
        </div>
    );
};

export default Sidebar;
