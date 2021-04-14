import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './FolderItem.module.sass';
import { ReactComponent as PlayIcon } from '../../../../../assets/PrivateCabinet/play-grey.svg';
import { ReactComponent as FolderIcon } from '../../../../../assets/PrivateCabinet/folder-2.svg';
import { ReactComponent as AddIcon } from '../../../../../assets/PrivateCabinet/plus-3.svg';
import { onChooseFolder } from '../../../../../Store/actions/PrivateCabinetActions';

const FolderItem = ({
        folder, listCollapsed, newFolderInfo, setNewFolderInfo,
        setNewFolder, chosenFolder, setChosenFolder, chosen
    }) => {

    const folderList = useSelector(state => state.PrivateCabinet.folderList);
    const dispatch = useDispatch();

    const onSetFolder = () => {
        openFolder();
        chosenFolder.path === folder.path ? setChosenFolder({...chosenFolder, path: ''}) : setChosenFolder({...chosenFolder, path: folder.path});
    };

    const openFolder = () => {
        dispatch(onChooseFolder(folder.folders, folder.path));
    };

    const renderInnerFolders = () => {
        if(!folderList || chosenFolder.path !== folder.path) return null;
        return folderList.folders.map((f, i) => {
            return <div key={i} className={styles.innerFolder}>
                <FolderIcon className={styles.innerFolderIcon} />
                {!listCollapsed &&<div>{f.name}</div>}
            </div>
        })
    };

    return (
        <>
        <div
            className={styles.wrapper}
            onClick={() => onSetFolder()}
        >
            <div className={styles.titleWrap}>
                <img
                    src={`./assets/PrivateCabinet/${folder.name}.svg`}
                    alt='icon'
                    className={styles.icon}
                />
                {!listCollapsed && <span className={styles.title}>{folder.nameRu} </span>}
                {!listCollapsed && <span> ({folder.files.length})</span>}
            </div>
            <div className={styles.functionWrap}>
                <PlayIcon
                    className={`${styles.playButton} ${chosen ? styles.revert : undefined}`}
                    onClick={() => {onSetFolder()}}
                />
                <div className={styles.menuWrap}><span className={styles.menu} /></div>
            </div>
        </div>
        <div style={{height: `${chosen ? (folder.folders.length * 50 + 50) : 0}px`}} className={`${styles.innerFolders} ${chosen ? undefined : styles.hidden}`}>
            <div
                className={styles.addFolderToFolder}
                onClick={() => {
                    setNewFolderInfo({...newFolderInfo, path: folder.path});
                    setNewFolder(true);
                }}
            >
                <div className={styles.addFolderName}>
                    <FolderIcon style={{width: '17px'}} />
                    {!listCollapsed && <span>Новая папка</span>}
                </div>
                <AddIcon className={styles.addFolderIcon} />
            </div>
            {renderInnerFolders()}
        </div>
        </>
    )
};

export default FolderItem;
