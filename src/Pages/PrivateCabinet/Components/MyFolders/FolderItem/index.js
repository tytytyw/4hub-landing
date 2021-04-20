import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './FolderItem.module.sass';
import { ReactComponent as PlayIcon } from '../../../../../assets/PrivateCabinet/play-grey.svg';
import { ReactComponent as FolderIcon } from '../../../../../assets/PrivateCabinet/folder-2.svg';
import { ReactComponent as AddIcon } from '../../../../../assets/PrivateCabinet/plus-3.svg';
import { onChooseFolder, onChooseFiles } from '../../../../../Store/actions/PrivateCabinetActions';

const FolderItem = ({
        folder, listCollapsed, newFolderInfo, setNewFolderInfo,
        setNewFolder, chosenFolder, setChosenFolder, chosen
    }) => {

    const folderList = useSelector(state => state.PrivateCabinet.folderList);
    const dispatch = useDispatch();

    const openFolder = (e) => {
        let boolean = false;
        e.target?.viewportElement?.classList.forEach(el => {if(el.toString().search('playButton')) boolean = true});
        if(boolean) {
            chosen ? setChosenFolder({...chosenFolder, path: folder.path, open: !chosenFolder.open}) : setChosenFolder({...chosenFolder, path: folder.path, open: true});
        } else {
            setChosenFolder({...chosenFolder, path: folder.path, open: false});
        }
        dispatch(onChooseFolder(folder.folders, folder.path));
        dispatch(onChooseFiles(folder.path));
    };

    const renderInnerFolders = () => {
        if((!folderList || chosenFolder.path !== folder.path) && !chosenFolder.open) return null;
        return folderList.folders.map((f, i) => {
            return <div className={styles.innerFolderWrap} key={i}>
                <div key={i} className={styles.innerFolder}>
                    <div className={styles.innerFolderName}>
                        <FolderIcon className={styles.innerFolderIcon} />
                        <img className={styles.lock} src={`./assets/PrivateCabinet/locked.svg`} alt='emoji' />
                        {!listCollapsed && <div className={styles.nameWrap}>
                            <div className={styles.Name}><div className={styles.name}>{f.name}</div><span>(9999)</span></div>
                            <span className={styles.tag}>#Фото</span>
                        </div>}
                    </div>
                    <div className={styles.innerFolderMedia}>
                        {!listCollapsed && <img src={`./assets/PrivateCabinet/smiles/${'cool'}.svg`} alt='emoji' />}
                        {!listCollapsed && <img src={`./assets/PrivateCabinet/signs/${'like'}.svg`} alt='emoji' />}
                        <div className={styles.menuWrap}><span className={styles.menu} /></div>
                    </div>
                </div>
            </div>
        })
    };

    //Open global/all Folder from the beginning
    useEffect(() => {if(chosen) dispatch(onChooseFolder(folder.folders, folder.path))}, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        <div
            className={`${styles.wrapper} ${chosen ? styles.wrapperChosen : undefined}`}
            onClick={openFolder}
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
                    className={`${styles.playButton} ${chosen && chosenFolder.open ? styles.revert : undefined}`}
                />
                <div className={styles.menuWrap}><span className={styles.menu} /></div>
            </div>
        </div>
        <div style={{height: `${chosen && chosenFolder.open ? (folder.folders.length * 50 + 50) : 0}px`}} className={`${styles.innerFolders} ${chosen && chosenFolder.open ? undefined : styles.hidden}`}>
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
