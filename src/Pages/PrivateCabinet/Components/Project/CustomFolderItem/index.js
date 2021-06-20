import React from 'react';
import {useDispatch} from 'react-redux'

import styles from './CustomFolderItem.module.sass'
import classNames from 'classnames'
import {onGetPrograms} from '../../../../../Store/actions/PrivateCabinetActions'

const CustomFolderItem = ({folder, chosenFolder, setChosenFolder, badge, setMouseParams, contextMenu = true, subFolder = true}) => {

    const dispatch = useDispatch();

    const onClickHandler = () => {
        setChosenFolder(folder?.id)
        dispatch(onGetPrograms(folder?.id))
    }

    return (
        <div
            className={classNames({
                [styles.innerFolderWrap]: true,
                [styles.active]: folder?.id && chosenFolder === folder?.id
            })}
            style={{
                borderBottom: `${!subFolder && '1px solid #CFCFCF'}`
            }}
            onClick={onClickHandler}
        >
            <div className={styles.innerFolder} style={{
                marginLeft: `${subFolder && '30px'}`
            }}>

                <div className={styles.innerFolderName}>
                    <img
                        src={folder.img || `./assets/PrivateCabinet/folders/${folder.icon}.svg`}
                        alt='icon'
                        className={styles.innerFolderIcon}
                    />
                    <div className={styles.nameWrap}>
                        <div className={styles.Name}>
                            <div className={styles.name}>{folder.name}</div>
                        </div>
                    </div>
                </div>

                <div className={styles.innerFolderMedia}>

                    {badge &&
                    <span className={styles.badge}>{badge}</span>}

                    {!badge &&
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

                    {contextMenu &&
                    <div
                        className={styles.menuWrap}
                        onClick={e => {
                            e.preventDefault()
                            setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 30})
                        }}
                    >
                        <span className={styles.menu}/>
                    </div>}

                </div>

            </div>
        </div>
    )
}

export default CustomFolderItem;
