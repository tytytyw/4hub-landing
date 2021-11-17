import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './CustomFolderItem.module.sass';
import {colors} from '../../../../../generalComponents/collections';
import {onChooseFiles, onChooseFolder, onDeleteFile, onSetPath} from '../../../../../Store/actions/CabinetActions';
import { ReactComponent as FolderIcon } from '../../../../../assets/PrivateCabinet/folder-2.svg';
import {ReactComponent as PlayIcon} from '../../../../../assets/PrivateCabinet/play-grey.svg';
import {ReactComponent as AddIcon} from '../../../../../assets/PrivateCabinet/plus-3.svg';
import api, {cancelRequest} from '../../../../../api';
import {getStorageItem, setStorageItem} from "../../../../../generalComponents/StorageHelper";
import {imageSrc} from '../../../../../generalComponents/globalVariables';
import {moveFile} from "../../../../../generalComponents/generalHelpers";

const CustomFolderItem = ({
      f, setChosenFolder, chosenFolder, listCollapsed, padding, chosen, subFolder, setError,
      setNewFolderInfo, setNewFolder, newFolderInfo, setMouseParams, setGLoader, setFilesPage,
      setShowSuccessMessage, openMenu
}) => {

    const [filesQuantity, setFilesQuantity] = useState(0);
    const uid = useSelector(state => state.user.uid);
    const draggedFile = useSelector(state => state.Cabinet.dragged);
    const folderList = useSelector(state => state.Cabinet.folderList);
    const fileList = useSelector(state => state.Cabinet.fileList);
    const dispatch = useDispatch();
    const file_amount_controller = useRef(null);
    const [folderParams, setFolderParams] = useState({open: false})

    const getQuantity = () => {
        api.post(`/ajax/get_folder_col.php?uid=${uid}&dir=${f.path}`)
            .then(res => {if(res.data.ok === 1) {
                setFilesQuantity(res.data.col)
                if(chosen) setChosenFolder(chosenFolder => ({...chosenFolder, files_amount: res.data.col}))
                setStorageItem(`${uid}+${f.path}`, res.data.col);
            }})
            .catch(err => console.log(err));
    };

    useEffect(() => {
        const files_amount = getStorageItem(`${uid}+${f.path}`);
        if(files_amount) {
            setFilesQuantity(files_amount);
            if(chosen) setChosenFolder(chosenFolder => ({...chosenFolder, files_amount}))
        } else {
            getQuantity();
        }
        file_amount_controller.current = 1
    }, []); // eslint-disable-line

    useEffect(() => {
        if(folderList?.path === f?.path && file_amount_controller.current) getQuantity()
    }, [fileList?.files?.length]); // eslint-disable-line

    const openFolder = (e, currentPath) => {
        let boolean = false;
        e.target?.viewportElement 
            ? e.target?.viewportElement?.classList.forEach(el => {if(el.toString().search('playButton')) boolean = true})
            : e.target.classList.forEach(el => {if (el.includes('playButton')) boolean = true});
        console.log(boolean)
        if(boolean) {
            setFolderParams(state => ({...state, open: !state.open}))
            setChosenFolder(state => ({...state, info: f}))
            // f.path === chosenFolder.path
            //     ? setChosenFolder({...chosenFolder, path: f.path, subPath: '', info: f, files_amount: filesQuantity})
            //     : setChosenFolder({...chosenFolder, path: f.path, subPath: '', info: f});
        }
        // else {
        //     setChosenFolder({...chosenFolder, path: f.path, open: false, subPath: '', info: f, files_amount: filesQuantity});
        // }
        dispatch(onChooseFolder(f.folders.folders, f.path));
    };

    const renderInnerFolders = () => {
        const currentPath = fileList?.path.split('/').slice(0, f.path.split('/').length).join('/');
        if(currentPath !== f.path || !folderParams.open) return null;
        const folders = f.folders.folders;
        return folders.map((f, i) => {
            return <CustomFolderItem
                key={i}
                f={f}
                setChosenFolder={setChosenFolder}
                chosenFolder={chosenFolder}
                listCollapsed={listCollapsed}
                padding={'0 15px 0 50px'}
                chosen={fileList?.path.includes(f.path)}
                subFolder={true}
                setMouseParams={setMouseParams}
                setGLoader={setGLoader}
                setFilesPage={setFilesPage}
                setError={setError}
                setShowSuccessMessage={setShowSuccessMessage}
                openMenu={openMenu}
            />
        })
    };

    const clickHandle = async (e) => {
        const currentPath = fileList?.path.split('/').slice(0, f.path.split('/').length).join('/');
        openFolder(e, currentPath);

        if (!fileList?.path.includes(f.path)) {
            const cancel = new Promise(resolve => {
                resolve(cancelRequest('cancelChooseFiles'));
            })
            await cancel.then(() => {
                setGLoader(true);
                dispatch(onSetPath(f.path));
                const ev = e;
                setTimeout(() => {
                    if(ev.target.className === styles.menuWrap) openMenu(ev);
                }, 0)
                dispatch(onChooseFiles(f.path, '', 1, '', setGLoader));
                setFilesPage(1)
            })
        }
    }


    const handleAddFolder = () => {
        setNewFolderInfo({...newFolderInfo, path: f.path});
        setNewFolder(true);
    };

    const handleDrop = async () => {
        await moveFile(f, draggedFile, uid)
            .then(result => {
                if(!result) setError(state => ({...state, isError: true, message: 'Файл не был перемещен'}))
                if(result) {
                    dispatch(onDeleteFile(draggedFile));
                    setShowSuccessMessage('Файл перемещен');
                }
            })
    }

    return (<>
        <div
            className={`${styles.innerFolderWrap} ${f.path === chosenFolder.path || f.path === chosenFolder.subPath ? styles.chosenSubFolderWrap : undefined}`}
            onClick={clickHandle}
            onDrop={handleDrop}
        >
            <div className={styles.innerFolder} style={{padding}}>
                <div className={styles.innerFolderName}>
                    <FolderIcon className={`${styles.innerFolderIcon} ${colors.filter(el => el.color === f.color)[0]?.name}`} />
                    {f.is_pass === 1 && <img className={styles.lock} src={`${imageSrc}assets/PrivateCabinet/locked.svg`} alt='emoji' />}
                    {!listCollapsed && <div className={styles.nameWrap}>
                        <div className={styles.Name}><div className={styles.name}>{f.name}</div><span>({filesQuantity})</span></div>
                        {f.tags && <span className={styles.tag}>#{f.tags}</span>}
                    </div>}
                </div>
                <div className={styles.innerFolderMedia}>
                    {!listCollapsed && f.emo && <img src={`${imageSrc}assets/PrivateCabinet/smiles/${f.emo}.svg`} alt='emoji' />}
                    {!listCollapsed && f.fig && <img src={`${imageSrc}assets/PrivateCabinet/signs/${f.fig}.svg`} alt='emoji' />}
                    <PlayIcon
                        className={`${styles.playButton} ${f.path === chosenFolder.path && folderParams.open ? styles.revert : undefined}`}
                    />
                    <div
                        className={styles.menuWrap}
                        onClick={openMenu}
                    ><span className={styles.menu} /></div>
                </div>
            </div>
        </div>
        <div
            style={{
                height: `${fileList?.path.includes(f.path) && folderParams.open ? 'max-content' : '0px'}`,
                minHeight: `${fileList?.path.includes(f.path) && folderParams.open ? 'max-content' : '0px'}`
            }}
            className={`${styles.innerFolders} ${fileList?.path.includes(f.path) && folderParams.open ? undefined : styles.hidden}`}
        ><div
                className={styles.addFolderToFolder}
                onClick={handleAddFolder}
            >
                <div className={styles.addFolderName}>
                    <FolderIcon style={{width: '17px'}} />
                    {!listCollapsed && <span>Новая папка</span>}
                </div>
                <AddIcon className={styles.addFolderIcon} />
            </div>
            {renderInnerFolders()}
        </div>
    </>)
}

export default CustomFolderItem;
