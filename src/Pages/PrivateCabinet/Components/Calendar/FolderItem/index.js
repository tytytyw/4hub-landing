import React from 'react';
import {useDispatch} from 'react-redux'

import styles from './CustomFolderItem.module.sass'
import classNames from 'classnames'
import {onGetPrograms} from '../../../../../Store/actions/PrivateCabinetActions'

const FolderItem = ({folder, chosenFolder, setChosenFolder, setMouseParams}) => {

    const dispatch = useDispatch();

    const onClickHandler = () => {
        setChosenFolder(folder?.id)
        dispatch(onGetPrograms(folder?.id))
    }

    return (
        <div
            className={classNames({
                [styles.wrapper]: true,
                [styles.active]: chosenFolder === folder?.id
            })}
            onClick={onClickHandler}
        >
            <div className={styles.innerFolder}>

                <div className={styles.innerFolderName}>
                    <img
                        src={`./assets/PrivateCabinet/journal/${folder.icon}.svg`}
                        alt='icon'
                        className={styles.innerFolderIcon}
                    />
                    <div className={styles.nameWrap}>
                        <div className={styles.name}>{folder.name}</div>
                    </div>
                </div>

                <div className={styles.innerFolderMedia}>
                    <div
                        className={styles.menuWrap}
                        onClick={e => {
                            setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 30})
                        }}
                    >
                        <span className={styles.menu}/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FolderItem
