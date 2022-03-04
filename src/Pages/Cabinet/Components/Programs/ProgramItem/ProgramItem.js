import React from 'react';

import styles from './ProgramItem.module.sass'
import classNames from 'classnames'
import FolderIcon from "./FolderIcon";

const ProgramItem = ({category, chosenFolder, setChosenFolder, listCollapsed, listSize}) => {


    const onClickHandler = () => {
        console.log(category)
        // setChosenFolder(category?.id)
    }

    return (
        <div
            className={classNames({
                [styles.innerFolderWrap]: true,
                [styles.active]: chosenFolder === category?.id,
            })}
            onClick={onClickHandler}
        >
            <div className={classNames({
                [styles.innerFolder]: true,
                [styles?.[`innerFolder_${listSize}`]]: !!listSize
            })}>

                <div className={styles.innerFolderName}>
                    {category?.image ?
                        <img
                            src={category.image}
                            alt='icon'
                            className={styles.innerFolderIcon}
                        /> :
                        <FolderIcon
                            fill={category?.color}
                            className={styles.innerFolderIcon}
                        />}
                    <div className={styles.nameWrap}>
                        <div className={styles.Name}>
                            {!listCollapsed && <div className={styles.name}>{category.name}</div>}
                        </div>
                    </div>
                </div>
                <div className={styles.innerFolderMedia}>({category.list.length})</div>
            </div>
        </div>
    )
}

export default ProgramItem;
