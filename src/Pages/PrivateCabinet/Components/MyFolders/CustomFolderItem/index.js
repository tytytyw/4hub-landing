import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './CustomFolderItem.module.sass';
import {colors} from '../../../../../generalComponents/collections';
import {onChooseFiles, onChooseFolder} from '../../../../../Store/actions/PrivateCabinetActions';
import { ReactComponent as FolderIcon } from '../../../../../assets/PrivateCabinet/folder-2.svg';
import {ReactComponent as PlayIcon} from '../../../../../assets/PrivateCabinet/play-grey.svg';
import {ReactComponent as AddIcon} from '../../../../../assets/PrivateCabinet/plus-3.svg';
import api from '../../../../../api';

const CustomFolderItem = ({f, setChosenFolder, chosenFolder, listCollapsed, padding, chosen, subFolder,
                           setNewFolderInfo, setNewFolder, newFolderInfo, setMouseParams}) => {

    const [filesQuantity, setFilesQuantity] = useState(0);
    const uid = useSelector(state => state.user.uid);
    const folderList = useSelector(state => state.PrivateCabinet.folderList);
    const fileList = useSelector(state => state.PrivateCabinet.fileList);
    const dispatch = useDispatch();

    const getQuantity = () => {
        api.post(`/ajax/get_folder_col.php?uid=${uid}&dir=${f.path}`)
            .then(res => {if(res.data.ok === 1) setFilesQuantity(res.data.col)})
            .catch(err => console.log(err));
    };

    useEffect(() => {getQuantity()}, []); // eslint-disable-line

    useEffect(() => {
        if(folderList?.path === f?.path) getQuantity()
    }, [fileList?.files?.length]); // eslint-disable-line

    const openFolder = (e) => {
        let boolean = false;
        e.target?.viewportElement?.classList.forEach(el => {if(el.toString().search('playButton')) boolean = true});
        if(boolean) {
            f.path === chosenFolder.path ? setChosenFolder({...chosenFolder, path: f.path, open: !chosenFolder.open, subPath: '', info: f}) : setChosenFolder({...chosenFolder, path: f.path, open: true, subPath: '', info: f});
        } else {
            setChosenFolder({...chosenFolder, path: f.path, open: false, subPath: '', info: f});
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

    const clickHandle = (e) => {
        subFolder ? setChosenFolder({...chosenFolder, subPath: f.path}) : openFolder(e);
        dispatch(onChooseFiles(f.path));
    };

    const menuClick = (e) => {setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 30})};

    const handleAddFolder = () => {
        setNewFolderInfo({...newFolderInfo, path: f.path});
        setNewFolder(true);
    };

    return (<>
        <div
            className={`${styles.innerFolderWrap} ${f.path === chosenFolder.path || f.path === chosenFolder.subPath ? styles.chosenSubFolderWrap : undefined}`}
            onClick={clickHandle}
        >
            <div className={styles.innerFolder} style={{padding}}>
                <div className={styles.innerFolderName}>
                    <FolderIcon className={`${styles.innerFolderIcon} ${colors.filter(el => el.color === f.color)[0]?.name}`} />
                    {f.is_pass === 1 && <img className={styles.lock} src={`./assets/PrivateCabinet/locked.svg`} alt='emoji' />}
                    {!listCollapsed && <div className={styles.nameWrap}>
                        <div className={styles.Name}><div className={styles.name}>{f.name}</div><span>({filesQuantity})</span></div>
                        {f.tags && <span className={styles.tag}>#{f.tags}</span>}
                    </div>}
                </div>
                <div className={styles.innerFolderMedia}>
                    {!listCollapsed && f.emo && <img src={`./assets/PrivateCabinet/smiles/${f.emo}.svg`} alt='emoji' />}
                    {!listCollapsed && f.fig && <img src={`./assets/PrivateCabinet/signs/${f.fig}.svg`} alt='emoji' />}
                    {!subFolder ? <PlayIcon
                        className={`${styles.playButton} ${f.path === chosenFolder.path && chosenFolder.open ? styles.revert : undefined}`}
                    /> : null}
                    <div
                        className={styles.menuWrap}
                        onClick={menuClick}
                    ><span className={styles.menu} /></div>
                </div>
            </div>
        </div>
        {!subFolder && <div
            style={{
                height: `${f.path === chosenFolder.path && chosenFolder.open ? (f.folders.folders.length * 50 + 50) : 0}px`,
                minHeight: `${f.path === chosenFolder.path && chosenFolder.open ? (f.folders.folders.length * 50 + 50) : 0}px`
            }}
            className={`${styles.innerFolders} ${f.path === chosenFolder.path && chosenFolder.open ? undefined : styles.hidden}`}
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
            {folderList ? renderInnerFolders() : null}
        </div>}
    </>)
}

export default CustomFolderItem;
