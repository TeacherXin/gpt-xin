import classNames from 'classnames';
import PictureSvg from './assets/picture.svg?react';
import HtmlSvg from './assets/html.svg?react';
import styles from './index.module.css';
import { useSkillStore } from './store';
import catImg from './assets/cat.png';
import dogImg from './assets/dog.png';
import birdImg from './assets/bird.png';
import turtleImg from './assets/turtle.png';
import tetrisImg from './assets/tetris.png';
import snakeImg from './assets/snake.png';
import timeImg from './assets/time.png';
import studentImg from './assets/student.png'
import { useDialogInputStore } from '../../store';
interface SkillItem {
    id: 'picture' | 'html';
    name: string;
    list: {
        id: string;
        url: string;
        text: string;
    } [];
}

const skillList: SkillItem[] = [
    {
        id: 'picture',
        name: '图像生成',
        list: [
            {
                id: 'cat',
                url: catImg,
                text: '帮我画一只正在玩耍的小猫',
            },
            {
                id: 'dog',
                url: dogImg,
                text: '帮我画一只正在草坪奔跑的小狗',
            },
            {
                id: 'bird',
                url: birdImg,
                text: '帮我画一只正在飞翔的小鸟',
            },
            {
                id: 'turtle',
                url: turtleImg,
                text: '帮我画一只正在游泳的海龟',
            },
        ],
    },
    {
        id: 'html',
        name: '网页生成',
        list: [
            {
                id: 'tetris',
                url: tetrisImg,
                text: '帮我生成一个俄罗斯方块的游戏页面',
            },
            {
                id: 'snake',
                url: snakeImg,
                text: '帮我生成一个贪吃蛇的游戏页面',
            },
            {
                id: 'time',
                url: timeImg,
                text: '帮我生成一个世界时钟的页面',
            },
            {
                id: 'student',
                url: studentImg,
                text: '帮我生成一个学生管理系统的页面',
            },
        ],
    },
]

const IconMap = {
    picture: PictureSvg,
    html: HtmlSvg,
}

const SkillList: React.FunctionComponent = () => {
    const skillStore = useSkillStore();
    const setInputValue = useDialogInputStore((state) => state.setInputValue);

    const skillClick = (text: string) => () => {
        setInputValue(text);
    }
    return (
        <div className={styles.skillList}>
            {
                skillList.map((item) => {
                    const Icon = IconMap[item.id];
                    return (
                        <div className={styles.skillContainer} key={item.id}>
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
                            {skillStore.selectedSkill === item.id && (
                            <div className={styles.imgList}>
                                {
                                    item.list.map(item => {
                                        return <img onClick={skillClick(item.text)} key={item.id} src={item.url} alt="" />
                                    })
                                }
                            </div>
)}
                        </div>
                    )
                })
            }
        </div>
    );
};

export default SkillList;
