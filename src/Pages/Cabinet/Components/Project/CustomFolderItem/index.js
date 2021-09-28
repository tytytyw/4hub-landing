import React from 'react';
import {imageSrc} from '../../../../../generalComponents/globalVariables';
import { ReactComponent as FolderIcon } from '../../../../../assets/PrivateCabinet/folder-2.svg';
import {colors} from '../../../../../generalComponents/collections';
import styles from './CustomFolderItem.module.sass'
import classNames from 'classnames'

const CustomFolderItem = ({folder, chosenFolder, setChosenFolder, badge, setMouseParams, listSize}) => {

    const onClickHandler = () => {
        setChosenFolder(folder)
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
                    <FolderIcon className={classNames(styles.innerFolderIcon, colors.filter(el => el.name === folder.color)[0]?.name)} />
                    {folder.is_pass === 1 && <img className={styles.lock} src={`${imageSrc}assets/PrivateCabinet/locked.svg`} alt='emoji' />}
                    <div className={styles.nameWrap}>
                        <p className={styles.name}>{folder.name}</p>
                        <div
                            className={classNames({
                                [styles.tagBlock]: true,
                                [styles.ftag]: !!folder?.tags
                            })}
                        >
                            {folder?.tags && `#${folder.tags}`}
                        </div>
                    </div>
                </div>

                <div className={styles.innerFolderMedia}>

                    {folder.emo &&
                    <img
                        className={styles.symbols}
                        src={`${imageSrc}/assets/PrivateCabinet/smiles/${folder?.emo}.svg`}
                        alt='emoji'
                    />}

                    {folder.fig &&
                    <img
                        className={styles.symbols}
                        src={`${imageSrc}assets/PrivateCabinet/signs/${folder.fig}.svg`}
                        alt='emoji'
                    />}

                    <div
                        className={styles.menuWrap}
                        onClick={e => {
                            e.preventDefault()
                            setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 25, type: 'menu'})
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
