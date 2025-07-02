import ChatMain from './components/ChatMain';
import Sidebar from './components/Sidebar';
import styles from './index.module.css';

const Page: React.FunctionComponent = () => {
    console.log('Page');
    return (
        <div className={styles.page}>
            <Sidebar />
            <ChatMain />
        </div>
    );
};

export default Page;
