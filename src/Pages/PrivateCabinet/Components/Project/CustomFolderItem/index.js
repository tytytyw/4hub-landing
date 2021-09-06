import React from 'react';
import {useDispatch} from 'react-redux'

import styles from './CustomFolderItem.module.sass'
import classNames from 'classnames'
import {onGetPrograms} from '../../../../../Store/actions/PrivateCabinetActions'

const CustomFolderItem = ({folder, chosenFolder, setChosenFolder, badge, setMouseParams, listSize}) => {

    const dispatch = useDispatch();

    const onClickHandler = () => {
        setChosenFolder(folder)
        dispatch(onGetPrograms(folder?.id))
    }

    return (
        <div
            className={classNames({
                [styles.innerFolderWrap]: true,
                [styles.active]: folder?.id && chosenFolder === folder?.id,
                [styles?.[`wrapper_${listSize}`]]: !!listSize
            })}
            onClick={onClickHandler}
        >
            <div className={styles.innerFolder}>

                <div className={styles.innerFolderName}>
                    <img
                        src={`./assets/PrivateCabinet/folders/${folder.icon}.svg`}
                        alt='icon'
                        className={styles.innerFolderIcon}
                    />
                    <div className={styles.nameWrap}>
                        <p className={styles.name}>{folder.name}</p>
                        <div
                            className={classNames({
                                [styles.tagBlock]: true,
                                [styles.ftag]: !!folder?.tag
                            })}
                        >
                            {folder?.tag && `#${folder.tag}`}
                        </div>
                    </div>
                </div>

                <div className={styles.innerFolderMedia}>

                    {folder.emo &&
                    <img
                        className={styles.symbols}
                        src={`./assets/PrivateCabinet/smiles/${folder?.emo}.svg`}
                        alt='emoji'
                    />}

                    {folder.symbol &&
                    <img
                        className={styles.symbols}
                        src={folder?.symbol}
                        alt='emoji'
                    />}

                    <div
                        className={styles.menuWrap}
                        onClick={e => {
                            e.preventDefault()
                            setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 30, type: 'menu'})
                        }}
                    >
                        <span className={styles.menu}/>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CustomFolderItem;
