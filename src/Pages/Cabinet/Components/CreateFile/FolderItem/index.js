import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './FolderItem.module.sass';
import '../../../../../generalComponents/colors.sass';
import { ReactComponent as PlayIcon } from '../../../../../assets/PrivateCabinet/play-grey.svg';
import {onChooseFolder, onSetPath} from '../../../../../Store/actions/CabinetActions';
import CustomFolderItem from '../CustomFolderItem';
import api, {cancelRequest} from '../../../../../api';
import {setStorageItem, getStorageItem} from "../../../../../generalComponents/StorageHelper";
import {imageSrc} from '../../../../../generalComponents/globalVariables';

const FolderItem = ({
        folder, listCollapsed, chosenFolder, setChosenFolder, chosen, setMouseParams,
    }) => {

    const folderList = useSelector(state => state.Cabinet.folderList);
    const fileList = useSelector(state => state.Cabinet.fileList);
    const uid = useSelector(state => state.user.uid);
    const dispatch = useDispatch();
    const [filesQuantity, setFilesQuantity] = useState(0);
    const file_amount_controller = useRef(null);

    const openFolder = async (e) => {
        chosen ? setChosenFolder({...chosenFolder, path: folder.path, open: !chosenFolder.open, subPath: '', info: folder, files_amount: filesQuantity}) : setChosenFolder({...chosenFolder, path: folder.path, open: true, subPath: '', info: folder});
        
        if(fileList.path !== folder.path) {
            const cancel = new Promise(resolve => {
                resolve(cancelRequest('cancelChooseFiles'));
            })
            await cancel
                .then(() => {
                    dispatch(onChooseFolder(folder.folders, folder.path));
                    dispatch(onSetPath(folder.path));
                    // dispatch(onChooseFiles(folder.path, '', 1, '', ''));
                })
        }
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
                    setStorageItem(`${uid}+${folder.path}`, res.data.col);
                } else {console.error(`Couldn't get files quantity in ${folder.path}`)}
            })
            .catch(err => console.log(err));
    };

    //Open global/all Folder from the beginning
    useEffect(() => {
        if(chosen) dispatch(onChooseFolder(folder.folders, folder.path));
        const files_amount = getStorageItem(`${uid}+${folder.path}`);
        if(files_amount) {
            setFilesQuantity(files_amount);
            if(chosen) setChosenFolder(chosenFolder => ({...chosenFolder, files_amount}))
        } else {
            getQuantity();
        }
        file_amount_controller.current = 1
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if(folderList?.path === folder?.path && file_amount_controller.current) getQuantity()
    }, [fileList?.files?.length]); // eslint-disable-line

    return (
        <>
        <div
            className={`${styles.wrapper} ${chosen ? styles.wrapperChosen : undefined}`}
            onClick={openFolder}
        >
            <div className={styles.titleWrap}>
                <img
                    src={`${imageSrc}assets/PrivateCabinet/${folder.name}.svg`}
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
            </div>
        </div>
        <div
            className={`${styles.innerFolders} ${chosen && chosenFolder.open ? undefined : styles.hidden}`}>
            {renderInnerFolders()}
        </div>
        </>
    )
};

export default FolderItem;
