import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import styles from './Devices.module.sass'
import List from '../List'
import DeviceItem from './DeviceItem'
import WorkSpace from './WorkSpace'
import CreateFolder from '../CreateFolder'
import CreateFile from '../CreateFile'
import CreateSafePassword from '../CreateSafePassword'
import PreviewFile from '../PreviewFile'
import ContextMenu from "../../../../generalComponents/ContextMenu"
import { contextMenuFolder, contextMenuSubFolder } from "../../../../generalComponents/collections"
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem"
import {onGetConnectedContacts, onGetDevices} from "../../../../Store/actions/PrivateCabinetActions"
import ConnectedContacts from "./ConnectedContacts"

const Devices = ({
               setItem, filePreview, setFilePreview, fileSelect, fileAddCustomization, setFileAddCustomization,
               setAwaitingFiles, awaitingFiles, loaded, setLoaded, loadingFile, fileErrors, setLoadingFile,
}) => {

    const dispatch = useDispatch()
    const devices = useSelector(state => state.PrivateCabinet.devices)

    const [chosenDevice, setChosenDevice] = useState(null)
    const [chosenContact, setChosenContact] = useState(null)

    const [listCollapsed, setListCollapsed] = useState('')
    const [newFolder, setNewFolder] = useState(false)

    const [chosenFolder, setChosenFolder] = useState('')

    const [newFolderInfo, setNewFolderInfo] = useState({path: ''})
    const [safePassword, setSafePassword] = useState({open: false})
    const [chosenFile, setChosenFile] = useState(null)
    const [mouseParams, setMouseParams] = useState(null)
    const [action, setAction] = useState({type: '', name: '', text: ''})

    //Clear action on change folder
    useEffect(() => {
        dispatch(onGetDevices())
        dispatch(onGetConnectedContacts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderDevicesList = () => {
        if(!devices) return null;
        return devices.map((el, i) => {
            return <DeviceItem
                key={i + el.name}
                device={el}
                setChosenDevice={setChosenDevice}
                chosenDevice={chosenDevice}
                setMouseParams={setMouseParams}
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
    ]

    return (
        <div className={styles.workAreaWrap}>
            <List
                icon={false}
                title='Мои устройства'
                src='add-folder.svg'
                setListCollapsed={setListCollapsed}
                listCollapsed={listCollapsed}
                onCreate={(boolean) => {setNewFolder(boolean); setNewFolderInfo({...newFolderInfo, path: ''})}}
            >
                <div className={styles.folderListWrap}>
                    {renderDevicesList()}
                    <ConnectedContacts
                        setChosenContact={setChosenContact}
                        chosenContact={chosenContact}

                        listCollapsed={listCollapsed}
                        setListCollapsed={setListCollapsed}
                        chosenFolder={chosenFolder}
                        setChosenFolder={setChosenFolder}
                        setMouseParams={setMouseParams}
                    />
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
            />
            {newFolder && <CreateFolder
                onCreate={setNewFolder}
                title='Новая папка'
                info={newFolderInfo}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
            />}
            {fileAddCustomization.show ? <CreateFile
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
            /> : null}
            {safePassword.open && <CreateSafePassword
                onToggle={onSafePassword}
                title='Создайте пароль для сейфа'
            />}
            {filePreview?.view ? <PreviewFile setFilePreview={setFilePreview} file={filePreview?.file} filePreview={filePreview} /> : null}
            {mouseParams !== null ? <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
                <div className={styles.mainMenuItems}>{renderMenuItems(chosenFolder.subPath ? contextMenuSubFolder.main : contextMenuFolder.main, callbackArrMain)}</div>
            </ContextMenu> : null}
        </div>
    )
}

export default Devices
