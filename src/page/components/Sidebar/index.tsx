import styles from './index.module.css';


const Sidebar: React.FunctionComponent = () => {

    return (
        <div className={styles.sidebar}>
            <div className={styles.newBtn}>新建对话</div>
        </div>
    );
};

export default Sidebar;
