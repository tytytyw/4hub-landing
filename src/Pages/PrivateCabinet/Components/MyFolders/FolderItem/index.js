import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './FolderItem.module.sass';
import '../../../../../generalComponents/colors.sass';
import { ReactComponent as PlayIcon } from '../../../../../assets/PrivateCabinet/play-grey.svg';
import { ReactComponent as FolderIcon } from '../../../../../assets/PrivateCabinet/folder-2.svg';
import { ReactComponent as AddIcon } from '../../../../../assets/PrivateCabinet/plus-3.svg';
import { onChooseFolder, onChooseFiles } from '../../../../../Store/actions/PrivateCabinetActions';
import CustomFolderItem from '../CustomFolderItem';
import api, {cancelRequest} from '../../../../../api';

const FolderItem = ({
        folder, listCollapsed, newFolderInfo, setNewFolderInfo,
        setNewFolder, chosenFolder, setChosenFolder, chosen, setMouseParams,
        setGLoader
    }) => {

    const folderList = useSelector(state => state.PrivateCabinet.folderList);
    const fileList = useSelector(state => state.PrivateCabinet.fileList);
    const uid = useSelector(state => state.user.uid);
    const dispatch = useDispatch();
    const [filesQuantity, setFilesQuantity] = useState(0);

    const openFolder = async (e) => {
        let boolean = false;
        e.target?.viewportElement?.classList.forEach(el => {if(el.toString().search('playButton')) boolean = true});
        if(boolean) {
            chosen ? setChosenFolder({...chosenFolder, path: folder.path, open: !chosenFolder.open, subPath: '', info: folder}) : setChosenFolder({...chosenFolder, path: folder.path, open: true, subPath: '', info: folder});
        } else {
            setChosenFolder({...chosenFolder, path: folder.path, open: false, subPath: '', info: folder});
        }
        const cancel = new Promise(resolve => {
            resolve(cancelRequest('cancelChooseFiles'));
        })
        await cancel
            .then(() => {
                dispatch(onChooseFolder(folder.folders, folder.path));
                setGLoader(true);
                dispatch(onChooseFiles(folder.path, '', 1, '', setGLoader));
            })
    };

    const renderInnerFolders = () => {
        if((!folderList || chosenFolder.path !== folder.path) && !chosenFolder.open) return null;
        return folderList.folders.map((f, i) => {
            return <CustomFolderItem
                key={i}
                f={f}
                setChosenFolder={setChosenFolder}
                chosenFolder={chosenFolder}
                listCollapsed={listCollapsed}
                padding={'0 15px 0 50px'}
                chosen={f.path === chosenFolder.subPath}
                subFolder={true}
                setMouseParams={setMouseParams}
            />
        })
    };

    const getQuantity = async () => {
        api.post(`/ajax/get_folder_col.php?uid=${uid}&dir=${folder.path}`)
            .then(res => {
                if(res.data.ok === 1) {
                    setFilesQuantity(res.data.col)
                    if(chosen) setChosenFolder(chosenFolder => ({...chosenFolder, files_amount: res.data.col}))
                }
            })
            .catch(err => console.log(err));
    };

    //Open global/all Folder from the beginning
    useEffect(() => {
        if(chosen) dispatch(onChooseFolder(folder.folders, folder.path));
        getQuantity();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(folderList?.path === folder?.path) getQuantity()
    }, [fileList?.files?.length]); // eslint-disable-line

    const openMenu = (e) => {
        setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 30})
        setNewFolderInfo({...newFolderInfo, path: folder.path})
    };

    const addFolder = () => {
        setNewFolderInfo({...newFolderInfo, path: folder.path});
        setNewFolder(true);
    };

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
                {!listCollapsed && <span> ({filesQuantity})</span>}
            </div>
            <div className={styles.functionWrap}>
                <PlayIcon
                    className={`${styles.playButton} ${chosen && chosenFolder.open ? styles.revert : undefined}`}
                />
                <div
                    className={styles.menuWrap}
                    onClick={openMenu}
                ><span className={styles.menu} /></div>
            </div>
        </div>
        <div style={{
                height: `${chosen && chosenFolder.open ? (folder.folders.length * 50 + 50) : 0}px`,
                minHeight: `${chosen && chosenFolder.open ? (folder.folders.length * 50 + 50) : 0}px`
            }}
             className={`${styles.innerFolders} ${chosen && chosenFolder.open ? undefined : styles.hidden}`}>
            <div
                className={styles.addFolderToFolder}
                onClick={addFolder}
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
