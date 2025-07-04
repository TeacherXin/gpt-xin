import styles from './index.module.css';
import { useDialogCardListStore } from './store';



const DialogCardList: React.FunctionComponent = () => {
    const dialogCardListStore = useDialogCardListStore();
    return (
        <div className={styles.scrollContainer}>
            <div className={styles.dialogCardList}>
                {dialogCardListStore.dialogCardList.map((item) => {
                    return (
                        <div className={styles.dialogCard} key={item.cardId}>
                            <div className={styles.question}>
                                <p>{item.question}</p>
                            </div>
                            <div className={styles.answer}>{item.answer}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DialogCardList;
