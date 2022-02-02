import React, {useEffect, useRef, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './MyFolders.module.sass';
import List from '../List';
import WorkSpace from './WorkSpace';
import CreateFolder from '../CreateFolder';
import CustomizeFolder from '../ContextMenuComponents/ContextMenuFolder/CustomizeFolder';
import CreateFile from '../CreateFile';
import CustomFolderItem from './CustomFolderItem';
import CreateSafePassword from '../CreateSafePassword';
import RecentFolders from './RecentFolders';
import PreviewFile from '../Modals/Components/PreviewFile/PreviewFile';
import FolderProperty from '../ContextMenuComponents/ContextMenuFolder/FolderProperty';
import ContextMenu from '../../../../generalComponents/ContextMenu';
import {
    contextMenuFolder,
    contextMenuFolderGeneral
} from '../../../../generalComponents/collections';
import ContextMenuItem from '../../../../generalComponents/ContextMenu/ContextMenuItem';
import ActionApproval from '../../../../generalComponents/ActionApproval';
import {ReactComponent as FolderIcon} from '../../../../assets/PrivateCabinet/folder-2.svg';
import api from '../../../../api';
import {
    onAddRecentFiles,
    onAddRecentFolders,
    onChooseFiles,
    onGetFolders
} from '../../../../Store/actions/CabinetActions';
import Error from '../../../../generalComponents/Error';
import SuccessMessage from '../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage';
import {imageSrc} from '../../../../generalComponents/globalVariables';
import {onGetUserInfo} from "../../../../Store/actions/startPageAction";
import {checkBrowser} from '../../../../generalComponents/generalHelpers';

const MyFolders = ({
               setItem, menuItem, setMenuItem, filePreview, setFilePreview, fileSelect, fileAddCustomization, setFileAddCustomization,
               setAwaitingFiles, awaitingFiles, loaded, setLoaded, loadingFile, fileErrors, setLoadingFile,
               nullifyAddingSeveralFiles, saveCustomizeSeveralFiles, setLoadingType, filesPage, setFilesPage
}) => {

    const uid = useSelector(state => state.user.uid);
    const global = useSelector(state => state.Cabinet.global);
    const other = useSelector(state => state.Cabinet.other);
    const recentFolders = useSelector(state => state.Cabinet.recentFolders);
    const path = useSelector(state => state.Cabinet.folderList?.path);
    const fileList = useSelector(state => state.Cabinet.fileList);
    const [listCollapsed, setListCollapsed] = useState('');
    const [newFolder, setNewFolder] = useState(false);
    //TODO - Need to check object keys and delete useless
    const [chosenFolder, setChosenFolder] = useState({path: 'global/all', info: null, files_amount: 0, group: null, contextMenuFolder: null, folderWidth: 310});
    const [chosenSubFolder, ] = useState(null);
    const [newFolderInfo, setNewFolderInfo] = useState({path: ''});
    const [safePassword, setSafePassword] = useState({open: false});
    const [chosenFile, setChosenFile] = useState(null);
    const [mouseParams, setMouseParams] = useState(null);
    const [action, setAction] = useState({type: '', name: '', text: ''});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const dispatch = useDispatch();
    const [error, setError] = useState({isError: false, message: ''});
    const [gLoader, setGLoader] = useState(true);
    const closeError = () => setError({isError: false, message: ''});
    const nullifyAction = () => setAction({type: '', name: '', text: ''});
    const folderListWrapRef = useRef(null);
    const fakeScrollRef = useRef(null);

    //Clear action on change folder
    useEffect(() => {nullifyAction()}, [path]);
    const successLoad = () => {
        setFilesPage(2)
        setGLoader(false)
    }
    useEffect(() => {
        setFilesPage(0)
        setMenuItem('myFolders')
        dispatch(onGetUserInfo());
        dispatch(onGetFolders());
        dispatch(onAddRecentFiles());
        dispatch(onAddRecentFolders());
        dispatch(onChooseFiles('global/all', '', 1, '', successLoad));
        return () => setMenuItem('')
    }, []); //eslint-disable-line

    const renderFolderList = (root, isRecent) => {
        if(!Array.isArray(root)) return null;
        return root.map((folder, i) => {
            return <CustomFolderItem
                key={i + folder.name}
                f={folder}
                listCollapsed={listCollapsed}
                setNewFolderInfo={setNewFolderInfo}
                newFolderInfo={newFolderInfo}
                setNewFolder={setNewFolder}
                setChosenFolder={setChosenFolder}
                chosenFolder={chosenFolder}
                chosen={chosenFolder.path === folder.path}
                p={25}
                isRecent={isRecent}
                subFolder={false}
                setMouseParams={setMouseParams}
                setGLoader={setGLoader}
                setFilesPage={setFilesPage}
                setError={setError}
                setShowSuccessMessage={setShowSuccessMessage}
                openMenu={openFolderMenu}
            />
        })
    };

    const onSafePassword = (boolean) => setSafePassword({...safePassword, open: boolean});

    const openFolderMenu = (e, folder) => {
        setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 25})
        setChosenFolder(state => ({...state, info: folder, contextMenuFolder: folder}))
        if(folder) setNewFolderInfo(state =>({...state, path: folder.path}))
    };

    const closeContextMenu = () => {
        setMouseParams(null);
        setChosenFolder(state => ({...state, contextMenuFolder: null}));
    }

    const renderMenuItems = (target, type) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={() => type[i]?.callback(type, i)}
                imageSrc={imageSrc + `assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    };

    const callbackArrMain = [
        {type: 'addFolder', name: 'Добавить папку', text: ``, callback: () => setNewFolder(true)},
        {type: 'propertiesFolder', name: 'Свойства', text: ``, callback: (list, index) => setAction(list[index])},
    ];

    const callbackArrOther = [
        {type: "customizeFolder", name: "Редактирование папки", text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'resendFolder', name: 'Расшарить', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'setAccessFolder', name: 'Настроить доступ', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'addFolder', name: 'Добавить папку', text: ``, callback: () => setNewFolder(true)},
        {type: 'propertiesFolder', name: 'Свойства', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'deleteFolder', name: 'Удаление папки', text: `Вы действительно хотите удалить выбранную папку?`, callback: (list, index) => setAction(list[index])},
    ];

    const deleteFolder = () => {
        nullifyAction();
        api.post(`/ajax/dir_del.php?uid=${uid}&dir=${chosenFolder?.info?.path}`)
            .then(res => {if(res.data.ok === 1) {
                dispatch(onGetFolders());
                dispatch(onChooseFiles(fileList?.path, '', 1));
                setChosenFolder(state =>({...state, info: null}));
            } else {
                setError({isError: true, message: 'Папка не удалена. Попробуйте еще раз!'});
            }})
            .catch(() => setError({isError: true, message: 'Папка не удалена. Попробуйте еще раз!'}));
    };

    return (
        <div className={styles.workAreaWrap}>
            <List
                title='Папки'
                src='add-folder.svg'
                listCollapsed={listCollapsed}
                setListCollapsed={setListCollapsed}
                onCreate={(boolean) => {setNewFolderInfo(state =>({...state, path: 'other/'})); setNewFolder(boolean);}}
            >
                <div
                    className={styles.topScroll}
                    ref={fakeScrollRef}
                    onScroll={() => {
                        if(folderListWrapRef.current && fakeScrollRef.current) folderListWrapRef.current.scrollLeft = fakeScrollRef.current.scrollLeft
                    }}
                    style={{
                        display: checkBrowser('safari') ? 'none' : 'flex'
                    }}
                >
                    <div style={{width: chosenFolder.folderWidth, minWidth: chosenFolder.folderWidth}} />
                </div>
                <div
                    className={styles.folderListWrap}
                    ref={folderListWrapRef}
                    onScroll={() => {
                        if(folderListWrapRef.current && fakeScrollRef.current) fakeScrollRef.current.scrollLeft = folderListWrapRef.current.scrollLeft;
                    }}
                >
                    {renderFolderList(global, false)}
                    {renderFolderList(other, false)}
                    {recentFolders?.length > 0 && <RecentFolders
                        listCollapsed={listCollapsed}
                        chosen={chosenFolder.path === 'recent'}
                        chosenFolder={chosenFolder}
                        setChosenFolder={setChosenFolder}
                        renderFolderList={renderFolderList}
                    />}
                </div>
            </List>
            <WorkSpace
                chosenFolder={chosenFolder}
                setSafePassword={setSafePassword}
                listCollapsed={listCollapsed}
                setItem={setItem}
                filePreview={filePreview}
                setFilePreview={setFilePreview}
                chosenFile={chosenFile}
                setChosenFile={setChosenFile}
                fileSelect={fileSelect}
                action={action}
                setAction={setAction}
                fileAddCustomization={fileAddCustomization}
                setFileAddCustomization={setFileAddCustomization}
                nullifyAddingSeveralFiles={nullifyAddingSeveralFiles}
                saveCustomizeSeveralFiles={saveCustomizeSeveralFiles}
                showSuccessMessage={showSuccessMessage}
                setShowSuccessMessage={setShowSuccessMessage}
                setLoadingType={setLoadingType}
                gLoader={gLoader}
                setGLoader={setGLoader}
                setNewFolder={setNewFolder}
                setNewFolderInfo={setNewFolderInfo}
                newFolderInfo={newFolderInfo}
                filesPage={filesPage}
                setFilesPage={setFilesPage}
                menuItem={menuItem}
                setChosenFolder={setChosenFolder}
                openFolderMenu={openFolderMenu}
            />
            {newFolder && <CreateFolder
                onCreate={setNewFolder}
                title='Создать папку'
                info={newFolderInfo}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
                newFolderInfo={newFolderInfo}
                seetNewFolderInfo={setNewFolderInfo}
            />}
            {fileAddCustomization.show ? <CreateFile
                title={fileAddCustomization.create ? 'Создать файл' : 'Добавление файла'}
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
                create={fileAddCustomization.create}
                setGLoader={setGLoader}
                initFolder={chosenFolder}
                showChoiceFolders={true}
                menuItem={menuItem}
            /> : null}
            {safePassword.open && <CreateSafePassword
                onToggle={onSafePassword}
                title='Создайте пароль для сейфа'
            />}
            {filePreview?.view ? <PreviewFile
                setFilePreview={setFilePreview}
                file={filePreview?.file}
                filePreview={filePreview}
                setLoadingType={setLoadingType}
                share={setAction}
            /> : null}
            {mouseParams !== null ? <ContextMenu params={mouseParams} setParams={closeContextMenu} tooltip={true}>
                <div className={styles.mainMenuItems}>{renderMenuItems(
                chosenFolder?.contextMenuFolder?.path.indexOf('global') === 0 && chosenFolder?.contextMenuFolder?.path.split('/').length === 2
                        ? contextMenuFolderGeneral.main
                        : contextMenuFolder.main,
                chosenFolder?.contextMenuFolder?.path.indexOf('global') === 0 && chosenFolder?.contextMenuFolder?.path.split('/').length === 2
                        ? callbackArrMain
                        : callbackArrOther
                )}</div>
            </ContextMenu> : null}
            {action.type === 'deleteFolder' ? <ActionApproval name={action.name} text={action.text} set={nullifyAction} callback={deleteFolder} approve={'Удалить'}>
                <div className={styles.fileActionWrap}><FolderIcon className={`${styles.innerFolderIcon}`} /></div>
            </ActionApproval> : null}
            {action.type === 'propertiesFolder'
            ? <FolderProperty
                close={nullifyAction}
                folder={chosenSubFolder || chosenFolder}
            />
            : null}
            {action.type === "customizeFolder" ? (
				<CustomizeFolder
					nullifyAction={nullifyAction}
					setError={setError}
					chosenFolder={chosenFolder}
                    chosenSubFolder={chosenSubFolder}
					title="Редактировать папку"
					setGLoader={setGLoader}
                    info={newFolderInfo}
                    successLoad={successLoad}
				/>
			) : null}
            <Error error={error.isError} set={closeError} message={error.message} />
            {showSuccessMessage && <SuccessMessage showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} />}
        </div>
    )
}

export default MyFolders;
