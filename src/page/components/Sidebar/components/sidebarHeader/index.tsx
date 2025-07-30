import styles from './index.module.css';
import logo from '../../assets/logo.png';
import SwitchSvg from '../../assets/switch.svg?react';
import { useSidebarStore } from '../../store';

const SidebarHeader: React.FunctionComponent = () => {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar)
    return (
        <div className={styles.logoItem}>
            <img src={logo} alt='' />
            <div className={styles.title}>GptXin</div>
            <SwitchSvg onClick={toggleSidebar} />
        </div>
    );
};

export default SidebarHeader;
