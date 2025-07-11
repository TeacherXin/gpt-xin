import classNames from 'classnames';
import PictureSvg from './assets/pictureSvg';
import HtmlSvg from './assets/htmlSvg';
import styles from './index.module.css';
import { useSkillStore } from './store';
interface SkillItem {
    id: 'picture' | 'html';
    name: string;
}

const skillList: SkillItem[] = [
    {
        id: 'picture',
        name: '图像生成',
    },
    {
        id: 'html',
        name: '网页生成',
    },
]

const IconMap = {
    picture: PictureSvg,
    html: HtmlSvg,
}

const SkillList: React.FunctionComponent = () => {
    const skillStore = useSkillStore();
    return (
        <div className={styles.skillList}>
            {
                skillList.map((item) => {
                    const Icon = IconMap[item.id];
                    return (
                        <div key={item.id}
                            className={classNames({
                                [styles.skillItem]: true,
                                [styles.selected]: skillStore.selectedSkill === item.id,
                            })}
                            onClick={() => {
                                if (skillStore.selectedSkill !== item.id) {
                                    skillStore.setSelectedSkill(item.id);
                                } else {
                                    skillStore.setSelectedSkill('');
                                }
                            }}
                        >
                            <Icon />
                            <p>{item.name}</p>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default SkillList;
