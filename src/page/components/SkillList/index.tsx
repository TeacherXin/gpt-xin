import classNames from 'classnames';
import PictureSvg from './assets/pictureSvg';
import styles from './index.module.css';
import { useSkillStore } from './store';

const SkillList: React.FunctionComponent = () => {
    const skillStore = useSkillStore();
    return (
        <div className={styles.skillList}>
            <div className={classNames({
                [styles.pictureItem]: true,
                [styles.selected]: skillStore.selectedSkill === 'picture',
            })}
                onClick={() => {
                    if (skillStore.selectedSkill !== 'picture') {
                        skillStore.setSelectedSkill('picture');
                    } else {
                        skillStore.setSelectedSkill('');
                    }
                }}
            >
                <PictureSvg />
                <p>图像生成</p>
            </div>
        </div>
    );
};

export default SkillList;
