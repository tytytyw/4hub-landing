import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './CustomFolderItem.module.sass';
import {colors} from '../../../../../generalComponents/collections';
import {onChooseFiles, onChooseFolder, onSetPath} from '../../../../../Store/actions/CabinetActions';
import { ReactComponent as FolderIcon } from '../../../../../assets/PrivateCabinet/folder-2.svg';
import {ReactComponent as PlayIcon} from '../../../../../assets/PrivateCabinet/play-grey.svg';
import api, {cancelRequest} from '../../../../../api';
import {getStorageItem, setStorageItem} from "../../../../../generalComponents/StorageHelper";
import {imageSrc} from '../../../../../generalComponents/globalVariables';

const CustomFolderItem = ({f, setChosenFolder, chosenFolder, listCollapsed, padding, chosen, subFolder, setMouseParams}) => {

    const [filesQuantity, setFilesQuantity] = useState(0);
    const uid = useSelector(state => state.user.uid);
    const folderList = useSelector(state => state.Cabinet.folderList);
    const fileList = useSelector(state => state.Cabinet.fileList);
    const dispatch = useDispatch();
    const file_amount_controller = useRef(null);

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

    const openFolder = (e) => {
        let boolean = false;
        e.target?.viewportElement?.classList.forEach(el => {if(el.toString().search('playButton')) boolean = true});
        if(boolean) {
            f.path === chosenFolder.path ? setChosenFolder({...chosenFolder, path: f.path, open: !chosenFolder.open, subPath: '', info: f, files_amount: filesQuantity}) : setChosenFolder({...chosenFolder, path: f.path, open: true, subPath: '', info: f});
        } else {
            setChosenFolder({...chosenFolder, path: f.path, open: false, subPath: '', info: f, files_amount: filesQuantity});
        }
        dispatch(onChooseFolder(f.folders.folders, f.path));
    };

    const renderInnerFolders = () => {
        if((!folderList || chosenFolder.path !== f.path) && !chosenFolder.open) return null;
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

    const clickHandle = async (e) => {
        if (fileList.path !== f.path) {
            const cancel = new Promise(resolve => {
                resolve(cancelRequest('cancelChooseFiles'));
            })
            await cancel.then(() => {
                subFolder ? setChosenFolder({...chosenFolder, subPath: f.path, files_amount: filesQuantity}) : openFolder(e);
                dispatch(onSetPath(f.path));
                dispatch(onChooseFiles(f.path, '', 1, '', ''));
            })
        } else setChosenFolder({...chosenFolder, open: !chosenFolder.open})
    } 

    return (<>
        <div
            className={`${styles.innerFolderWrap} ${f.path === chosenFolder.path || f.path === chosenFolder.subPath ? styles.chosenSubFolderWrap : undefined}`}
            onClick={clickHandle}
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
                    {!subFolder ? <PlayIcon
                        className={`${styles.playButton} ${f.path === chosenFolder.path && chosenFolder.open ? styles.revert : undefined}`}
                    /> : null}
                </div>
            </div>
        </div>
        {!subFolder && <div
            className={`${styles.innerFolders} ${f.path === chosenFolder.path && chosenFolder.open ? undefined : styles.hidden}`}
        >
            {folderList ? renderInnerFolders() : null}
        </div>}
    </>)
}

export default CustomFolderItem;
