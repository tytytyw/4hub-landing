import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from './Safe.module.sass';
import SafeItem from './SafeItem';
import WorkSpace from './WorkSpace';
import CreateFolder from '../CreateFolder';
import CreateFile from '../CreateFile';
import CreateSafePassword from '../CreateSafePassword';
import PreviewFile from '../PreviewFile';
import ContextMenu from "../../../../generalComponents/ContextMenu";
import { contextMenuFolder, contextMenuSubFolder } from "../../../../generalComponents/collections";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import classNames from "classnames";
import {
    onGetSafes
} from "../../../../Store/actions/PrivateCabinetActions";
import CodePopup from "./CodePopup";

const Safe = ({
               setItem, filePreview, setFilePreview, fileSelect, fileAddCustomization, setFileAddCustomization,
               setAwaitingFiles, awaitingFiles, loaded, setLoaded, loadingFile, fileErrors, setLoadingFile,
}) => {

    const dispatch = useDispatch()
    const safes = useSelector(state => state.PrivateCabinet.safes);
    const path = useSelector(state => state.PrivateCabinet.folderList?.path);
    const [listCollapsed, setListCollapsed] = useState('');
    const [newFolder, setNewFolder] = useState(false);
    const [chosenFolder, setChosenFolder] = useState({path: 'global/all', open: false, subPath: ''});
    const [newFolderInfo] = useState({path: ''});
    const [safePassword, setSafePassword] = useState({open: false});
    const [chosenFile, setChosenFile] = useState(null);
    const [mouseParams, setMouseParams] = useState(null);

    const [listSize, setListSize] = useState('sm')
    const [selectedSafe, setSelectedSafe] = useState(null)
    const [codePopup, setCodePopup] = useState(false)

    const [action, setAction] = useState({type: '', name: '', text: ''});
    const nullifyAction = () => setAction({type: '', name: '', text: ''});

    useEffect(() => {
        dispatch(onGetSafes())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Clear action on change folder
    useEffect(() => {nullifyAction()}, [path]);

    const renderStandardFolderList = () => {
        if(!safes) return null;
        return safes.map((safe, i) => {
            return <SafeItem
                key={i + safe.name}
                safe={safe}
                listSize={listSize}
                chosen={chosenFolder.path === safe.path}
                setMouseParams={setMouseParams}

                onClick={() => {
                    setSelectedSafe(safe)
                    setCodePopup(true)
                }}
            />
        })
    };

    const onSafePassword = (boolean) => setSafePassword({...safePassword, open: boolean});

    const renderMenuItems = (target, type) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                // callback={() => setAction(type[i])}
                imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    };

    const callbackArrMain = [
        {type: 'delete', name: 'Удаление файла', text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`}
    ];

    return (
        <div className={styles.workAreaWrap}>

            <div
                className={classNames({
                    [styles.listWrap]: true,
                    [styles.listWrapCollapsed]: !!listCollapsed
                })}
            >
                <div className={styles.header}>
                    {!listCollapsed && <span>Создать сейф</span>}
                    <div className={styles.imgWrap}>
                        <img
                            className={`${styles.playButton} ${listCollapsed ? styles.playButtonReverse : undefined}`}
                            src='./assets/PrivateCabinet/play-grey.svg'
                            alt='play'
                            onClick={() => setListCollapsed(!listCollapsed)}
                        />
                        <img
                            className={styles.icon}
                            src={`./assets/PrivateCabinet/add-safe.svg`}
                            alt='icon'
                        />
                    </div>
                </div>
                <div className={classNames(styles.children, styles?.[`children_${listSize}`])}>
                    <div className={classNames(styles.folderListWrap, styles?.[`folderListWrap_${listSize}`])}>
                        {renderStandardFolderList()}
                    </div>
                </div>
            </div>

            <WorkSpace
                listSize={listSize}
                setListSize={setListSize}

                chosenFolder={chosenFolder}
                setSafePassword={setSafePassword}
                listCollapsed={listCollapsed}

                filePreview={filePreview}
                setFilePreview={setFilePreview}

                chosenFile={chosenFile}
                setChosenFile={setChosenFile}

                fileSelect={fileSelect}

                action={action}
                setAction={setAction}
            />

            {newFolder &&
            <CreateFolder
                onCreate={setNewFolder}
                title='Новая папка'
                info={newFolderInfo}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
            />}

            {fileAddCustomization.show &&
                <CreateFile
                    title='Добавление файла'
                    info={chosenFolder}
                    blob={fileAddCustomization.file}
                    setBlob={setFileAddCustomization}
                    onToggleSafePassword={onSafePassword}
                    awaitingFiles={awaitingFiles}
                    setAwaitingFiles={setAwaitingFiles}
                    loaded={loaded}
                    setLoaded={setLoaded}
                    loadingFile={loadingFile}
                    fileErrors={fileErrors}
                    setLoadingFile={setLoadingFile}
                />}

            {safePassword.open &&
            <CreateSafePassword
                onToggle={onSafePassword}
                title='Создайте пароль для сейфа'
            />}

            {filePreview?.view &&
                <PreviewFile
                    setFilePreview={setFilePreview}
                    file={filePreview?.file}
                    filePreview={filePreview}
                />}

            {mouseParams !== null &&
                <ContextMenu
                    params={mouseParams}
                    setParams={setMouseParams}
                    tooltip={true}
                >
                    <div className={styles.mainMenuItems}>
                        {renderMenuItems(chosenFolder.subPath ? contextMenuSubFolder.main : contextMenuFolder.main, callbackArrMain)}</div>
                </ContextMenu>}

            {codePopup &&
            <CodePopup
                safe={selectedSafe}
                set={setCodePopup}
            />}

        </div>
    )
}

export default Safe;
