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
import {imageSrc} from '../../../../generalComponents/globalVariables';
import {contextMenuDevice} from "../../../../generalComponents/collections"
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem"
import {onGetConnectedContacts, onGetDevices, setSelectedDevice} from "../../../../Store/actions/CabinetActions"
import ConnectedContacts from "./ConnectedContacts"
import SuccessPopup from "../Business/SuccessPopup";
import successImg from "../../../../assets/BusinessCabinet/WelcomePage/mail-desktop.svg";
import api from "../../../../api";

const Devices = ({
               setItem, filePreview, setFilePreview, fileSelect, fileAddCustomization, setFileAddCustomization,
               setAwaitingFiles, awaitingFiles, loaded, setLoaded, loadingFile, fileErrors, setLoadingFile,
}) => {

    const dispatch = useDispatch()
    const devices = useSelector(state => state.Cabinet.devices)
    const size = useSelector(state => state.Cabinet.size);

    const selectedDevice = useSelector(state => state.Cabinet.selectedDevice)
    const [chosenContact, setChosenContact] = useState(null)

    const [listCollapsed, setListCollapsed] = useState('')
    const [newFolder, setNewFolder] = useState(false)

    const [chosenFolder, setChosenFolder] = useState('')

    const [newFolderInfo, setNewFolderInfo] = useState({path: ''})
    const [safePassword, setSafePassword] = useState({open: false})
    const [chosenFile, setChosenFile] = useState(null)
    const [mouseParams, setMouseParams] = useState(null)
    const [action, setAction] = useState({type: '', name: '', text: ''})

    const [successBlocked, setSuccessBlocked] = useState(false)

    //Clear action on change folder
    useEffect(() => {
        dispatch(onGetDevices())
        dispatch(onGetConnectedContacts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderDevicesList = () => {
        if(!devices) return null;
        return devices.map((dev, i) => {
            return <DeviceItem
                key={i + dev.name}
                device={dev}
                listSize={size}
                chosen={selectedDevice?.id === dev.id}
                setMouseParams={setMouseParams}
                onClick={() => dispatch(setSelectedDevice(dev))}
                listCollapsed={listCollapsed}
            />
        })
    };

    const onSafePassword = (boolean) => setSafePassword({...safePassword, open: boolean});

    const blockDevice = () => {
        api.post(`/ajax/devices_block.php?id_device=${selectedDevice.id}`)
            .then(res => {
                setSuccessBlocked(true)
            })
    }

    const renderMenuItems = (target, type) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={blockDevice}
                imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
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
                        listSize={size}

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
                title='Добавить файла'
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
                <div className={styles.mainMenuItems}>{renderMenuItems(chosenFolder.subPath ? contextMenuDevice.main : contextMenuDevice.main, callbackArrMain)}</div>
            </ContextMenu> : null}

            {successBlocked &&
            <SuccessPopup
                title='Устройство заблокировано'
                set={setSuccessBlocked}
            >
                <img src={successImg} alt="Success"/>
            </SuccessPopup>}
        </div>
    )
}

export default Devices
