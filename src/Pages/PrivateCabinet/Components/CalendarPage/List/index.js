import React from 'react';

import styles from './List.module.sass';
import { ReactComponent as FolderIcon } from '../../../../../assets/PrivateCabinet/icons/folder-filled.svg';
import classNames from "classnames";
import {ReactComponent as PlayIcon} from "../../../../../assets/PrivateCabinet/play-grey.svg";

const List = ({title, src, setListCollapsed = () => {}, listCollapsed, children, onCreate, icon = true}) => {

    return (
        <div
            className={classNames({
                [styles.listWrap]: true,
                [styles.listWrapCollapsed]: !!listCollapsed
            })}
        >
            <div className={styles.header}>
                <div className={styles.titleWrap}>
                    <FolderIcon className={styles.folderIcon}/>
                    <h4 className={styles.title}>{title}</h4>
                </div>
                <div className={styles.imgWrap}>
                    <PlayIcon
                        className={classNames({
                            [styles.playButton]: true,
                            [styles.revert]: !!listCollapsed
                        })}
                    />
                </div>
            </div>

            <div className={styles.children}>
                <div className={styles.addTaskBlock}>
                    <p>Создать задачу</p>
                    <img
                        className={styles.addTaskIcon}
                        src="./assets/PrivateCabinet/folders/add.svg"
                        alt="Add Task Icon"
                    />
                </div>
                {children}
            </div>
        </div>
    )
}

export default List;
