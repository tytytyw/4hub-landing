import React from 'react';

import styles from './ProjectIcons.module.sass';
import { projectIcons } from '../../../../../generalComponents/collections';
import classnames from "classnames";
import {ReactComponent as ClipboardIcon} from '../../../../../assets/PrivateCabinet/project/clipboard.svg'
import {ReactComponent as CoworkingIcon} from '../../../../../assets/PrivateCabinet/project/coworking.svg'
import {ReactComponent as LampIcon} from '../../../../../assets/PrivateCabinet/project/lamp.svg'
import {ReactComponent as PenIcon} from '../../../../../assets/PrivateCabinet/project/pen.svg'
import {ReactComponent as RocketIcon} from '../../../../../assets/PrivateCabinet/project/rocket.svg'
import {ReactComponent as SuitcaseIcon} from '../../../../../assets/PrivateCabinet/project/suitcase.svg'
import {ReactComponent as ThunderIcon} from '../../../../../assets/PrivateCabinet/project/thunder.svg'
import {useLocales} from "react-localized";


const ProjectIcons = ({color, icon, setIcon, title , editableClass = ''}) => {
    const { __ } = useLocales()

    if(!title) {
        title = __('Выберите иконку')
    }
    const set = (el) => icon === el ? setIcon('') : setIcon(el);
    const renderIcons = () => {
        const getIcon = (icon) => {
            switch (icon) {
                case 'clipboard': return <ClipboardIcon className={color.name} alt='icon'/>
                case 'coworking': return <CoworkingIcon className={color.name} alt='icon' />
                case 'lamp': return <LampIcon className={color.name} alt='icon' />
                case 'pen': return <PenIcon className={color.name} alt='icon' />
                case 'rocket': return <RocketIcon className={color.name} alt='icon' />
                case 'suitcase': return <SuitcaseIcon className={color.name} alt='icon' />
                case 'thunder': return <ThunderIcon className={color.name} alt='icon' />
                default: return <ClipboardIcon className={color.name} alt='icon'/>
            }
        }
        return projectIcons.map((el, i) => {
            return <div
                key={i}
                className={classnames({
                    [styles.icon]: true,
                    [styles.iconChosen]: icon === el
                })}
                onClick={() => set(el)}
            >{getIcon(el)}
            </div>
        })
    };

    return (
        <div className={`${styles.iconsWrap} ${editableClass ? styles[editableClass] : ''}`}>
            <span className={styles.title}>{title}</span>
            <div>{renderIcons()}</div>
        </div>
    )
}

export default ProjectIcons;
