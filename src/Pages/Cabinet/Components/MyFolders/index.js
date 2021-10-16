import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styles from './MyFolders.module.sass';
import List from '../List';
import FolderItem from './FolderItem';
import WorkSpace from './WorkSpace';
import CreateFolder from '../CreateFolder';
import CustomizeFolder from '../ContextMenuComponents/ContextMenuFolder/CustomizeFolder';
import CreateFile from '../CreateFile';
import CustomFolderItem from './CustomFolderItem';
import CreateSafePassword from '../CreateSafePassword';
import RecentFolders from './RecentFolders';
import PreviewFile from '../PreviewFile';
import FolderProperty from '../ContextMenuComponents/ContextMenuFolder/FolderProperty';
import ContextMenu from '../../../../generalComponents/ContextMenu';
import {
    contextMenuFolder,
    contextMenuSubFolder,
    contextMenuFolderGeneral
} from '../../../../generalComponents/collections';
import ContextMenuItem from '../../../../generalComponents/ContextMenu/ContextMenuItem';
import ActionApproval from '../../../../generalComponents/ActionApproval';
import {ReactComponent as FolderIcon} from '../../../../assets/PrivateCabinet/folder-2.svg';
import api from '../../../../api';
import {onChooseFiles, onGetFolders} from '../../../../Store/actions/CabinetActions';
import Error from '../../../../generalComponents/Error';
import ShareFolder from '../ContextMenuComponents/ContextMenuFolder/ShareFolder/ShareFolder';
import SuccessMessage from '../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage';
import CopyLinkShare from '../ContextMenuComponents/CopyLinkShare';
import {imageSrc} from '../../../../generalComponents/globalVariables';

const MyFolders = ({
               setItem, menuItem, setMenuItem, filePreview, setFilePreview, fileSelect, fileAddCustomization, setFileAddCustomization,
               setAwaitingFiles, awaitingFiles, loaded, setLoaded, loadingFile, fileErrors, setLoadingFile,
               nullifyAddingSeveralFiles, saveCustomizeSeveralFiles, setLoadingType, filesPage, setFilesPage
}) => {

    const uid = useSelector(state => state.user.uid);
    const global = useSelector(state => state.Cabinet.global);
    const other = useSelector(state => state.Cabinet.other?.folders);
    const recentFolders = useSelector(state => state.Cabinet.recentFolders);
    const path = useSelector(state => state.Cabinet.folderList?.path);
    const [listCollapsed, setListCollapsed] = useState('');
    const [newFolder, setNewFolder] = useState(false);
    const [chosenFolder, setChosenFolder] = useState({path: 'global/all', open: false, subPath: '', info: null, files_amount: 0});
    const [chosenSubFolder, setChosenSubFolder] = useState(null);
    const [newFolderInfo, setNewFolderInfo] = useState({path: ''});
    const [safePassword, setSafePassword] = useState({open: false});
    const [chosenFile, setChosenFile] = useState(null);
    const [mouseParams, setMouseParams] = useState(null);
    const [action, setAction] = useState({type: '', name: '', text: ''});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const dispatch = useDispatch();
    const [error, setError] = useState({isError: false, message: ''});
    const [gLoader, setGLoader] = useState(false);
    const closeError = () => setError({isError: false, message: ''});
    const nullifyAction = () => setAction({type: '', name: '', text: ''});

    //Clear action on change folder
    useEffect(() => {nullifyAction()}, [path]);
    useEffect(() => {
        setFilesPage(0)
        setMenuItem('myFolders')
        dispatch(onChooseFiles('global/all', '', 1, '', setGLoader));
        return () => setMenuItem('')
    }, []); //eslint-disable-line

    const renderStandardFolderList = () => {
        if(!global) return null;
        return global.map((el, i) => {
            return <FolderItem
                key={i + el.name}
                folder={el}
                listCollapsed={listCollapsed}
                setNewFolderInfo={setNewFolderInfo}
                newFolderInfo={newFolderInfo}
                setNewFolder={setNewFolder}
                setChosenFolder={setChosenFolder}
                chosenFolder={chosenFolder}
                chosen={chosenFolder.path === el.path}
                setMouseParams={setMouseParams}
                setGLoader={setGLoader}
                setFilesPage={setFilesPage}
            />
        })
    };

    const renderOtherFolderList = () => {
        if(!other) return null;
        return other.map((folder, i) => {
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
                padding={'0px 10px 0px 26px'}
                subFolder={false}
                setMouseParams={setMouseParams}
                setGLoader={setGLoader}
                setFilesPage={setFilesPage}
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

    const callbackArrSub = [
        {type: "customizeFolder", name: "Редактирование папки", text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'resendFolder', name: 'Расшарить', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'setAccessFolder', name: 'Доступ и экспорт', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'propertiesFolder', name: 'Свойства', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'deleteFolder', name: 'Удаление папки', text: `Вы действительно хотите удалить выбранную папку?`, callback: (list, index) => setAction(list[index])}
    ];

    const deleteFolder = () => {
        nullifyAction();
        api.post(`/ajax/dir_del.php?uid=${uid}&dir=${chosenFolder?.subPath ? chosenFolder.subPath : chosenFolder.path}`)
            .then(res => {if(res.data.ok === 1) {
                dispatch(onGetFolders());
                dispatch(onChooseFiles('global/all', '', 1));
                //TODO - Need to fix bug to disappear subfolder after deletion - React Component doesn't see changes
                setChosenFolder({...chosenFolder, open: false});
            } else {
                setError({isError: true, message: 'Папка не удалена. Попробуйте еще раз!'});
            }})
            .catch(() => setError({isError: true, message: 'Папка не удалена. Попробуйте еще раз!'}));
    };

    useEffect(() => {
        if (chosenFolder.subPath) {
            const globalFolder = chosenFolder.path.includes('global');
            setChosenSubFolder({info: globalFolder
                ? chosenFolder.info?.folders.filter(f => f.path === chosenFolder.subPath)[0]
                : chosenFolder.info?.folders.folders.filter(f => f.path === chosenFolder.subPath)[0]
            })
        } else setChosenSubFolder(null)
        return () => setChosenSubFolder(null)
    }, [chosenFolder.subPath]) //eslint-disable-line        

    return (
        <div className={styles.workAreaWrap}>
            <List
                title='Папки'
                src='add-folder.svg'
                listCollapsed={listCollapsed}
                setListCollapsed={setListCollapsed}
                onCreate={(boolean) => {setNewFolder(boolean); setNewFolderInfo({...newFolderInfo, path: ''})}}
            >
                <div className={styles.folderListWrap}>
                    {renderStandardFolderList()}
                    {renderOtherFolderList()}
                    {recentFolders?.length > 0 && <RecentFolders
                        listCollapsed={listCollapsed}
                        setListCollapsed={setListCollapsed}
                        chosen={chosenFolder.path === 'recent'}
                        chosenFolder={chosenFolder}
                        setChosenFolder={setChosenFolder}
                        setMouseParams={setMouseParams}
                        setGLoader={setGLoader}
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
            />
            {newFolder && <CreateFolder
                onCreate={setNewFolder}
                title='Новая папка'
                info={newFolderInfo}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
            />}
            {fileAddCustomization.show ? <CreateFile
                title={fileAddCustomization.create ? 'Создать файл' : 'Добавить файл'}
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
            /> : null}
            {safePassword.open && <CreateSafePassword
                onToggle={onSafePassword}
                title='Создайте пароль для сейфа'
            />}
            {action.type === 'resendFolder' ? (
                <ShareFolder
                    folder={chosenSubFolder || chosenFolder}
                    files={{}}
                    close={nullifyAction}
                    action_type={action.type}
                    showSuccessMessage={showSuccessMessage}
                    setShowSuccessMessage={setShowSuccessMessage}
                />
            ) : null}
            {action.type === 'setAccessFolder' ? <CopyLinkShare
                nullifyAction={nullifyAction}
                folder={chosenSubFolder || chosenFolder}
                setShowSuccessMessage={setShowSuccessMessage}
                setLoadingType={setLoadingType}
            /> : null}
            {filePreview?.view ? <PreviewFile setFilePreview={setFilePreview} file={filePreview?.file} filePreview={filePreview} setLoadingType={setLoadingType} /> : null}
            {mouseParams !== null ? <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
                <div className={styles.mainMenuItems}>{renderMenuItems(chosenFolder.subPath
                    ? contextMenuSubFolder.main
                    : chosenFolder.path.indexOf('global') >= 0
                        ? contextMenuFolderGeneral.main
                        : contextMenuFolder.main,
            chosenFolder.subPath
                    ? callbackArrSub
                    : chosenFolder.path.indexOf('global') >= 0
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
				/>
			) : null}
            <Error error={error.isError} set={closeError} message={error.message} />
            {showSuccessMessage && <SuccessMessage showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} />}
        </div>
    )
}

export default MyFolders;
