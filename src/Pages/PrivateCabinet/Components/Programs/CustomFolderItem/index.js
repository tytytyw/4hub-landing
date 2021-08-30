import React from 'react';
import {useDispatch} from 'react-redux'

import styles from './CustomFolderItem.module.sass'
import classNames from 'classnames'
import {onGetPrograms} from '../../../../../Store/actions/PrivateCabinetActions'

const CustomFolderItem = ({folder, padding, chosenFolder, setChosenFolder, setMouseParams, listCollapsed, listSize}) => {

    const dispatch = useDispatch();

    const onClickHandler = () => {
        setChosenFolder(folder?.id)
        dispatch(onGetPrograms(folder?.id))
    }

    return (
        <div
            className={classNames({
                [styles.innerFolderWrap]: true,
                [styles.active]: chosenFolder === folder?.id,
            })}
            onClick={onClickHandler}
        >
            <div className={classNames({
                [styles.innerFolder]: true,
                [styles?.[`innerFolder_${listSize}`]]: !!listSize
            })} >

                <div className={styles.innerFolderName}>
                    <img
                        src={`./assets/PrivateCabinet/${folder.icon}.svg`}
                        alt='icon'
                        className={styles.innerFolderIcon}
                    />
                    <div className={styles.nameWrap}>
                        <div className={styles.Name}>
                            {!listCollapsed && <div className={styles.name}>{folder.nameRu}</div>}
                        </div>
                    </div>
                </div>

                <div className={styles.innerFolderMedia}>

                    {!listCollapsed &&
                    <>
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
                    </>}

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

export default CustomFolderItem;
