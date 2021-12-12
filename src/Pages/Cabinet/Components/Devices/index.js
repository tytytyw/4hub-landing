import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import styles from './Devices.module.sass'
import List from '../List'
import DeviceItem from './DeviceItem'
import WorkSpace from './WorkSpace'
import CreateFolder from '../CreateFolder'
import CreateFile from '../CreateFile'
import CreateSafePassword from '../CreateSafePassword'
import PreviewFile from '../PreviewFile/PreviewFile'
import ContextMenu from "../../../../generalComponents/ContextMenu"
import {imageSrc} from '../../../../generalComponents/globalVariables';
import {contextMenuDevice, contextMenuDeviceUser} from "../../../../generalComponents/collections"
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem"
import {
    onGetConnectedContacts,
    onGetDevices, setDevices,
    setSelectedDevice,
    setSelectedUser
} from "../../../../Store/actions/CabinetActions"
import ConnectedContacts from "./ConnectedContacts"
import SuccessPopup from "../Business/SuccessPopup";
import successImg from "../../../../assets/BusinessCabinet/WelcomePage/mail-desktop.svg";
import api from "../../../../api";
import OptionButtomLine from "./OptionButtomLine";

const Devices = ({
               setItem, filePreview, setFilePreview, fileSelect, fileAddCustomization, setFileAddCustomization,
               setAwaitingFiles, awaitingFiles, loaded, setLoaded, loadingFile, fileErrors, setLoadingFile,
}) => {

    const dispatch = useDispatch()
    const devices = useSelector(state => state.Cabinet.devices)
    const size = useSelector(state => state.Cabinet.size);
    const uid = useSelector(state => state.user.uid);

    const selectedDevice = useSelector(state => state.Cabinet.selectedDevice)
    const selectedUser = useSelector(state => state.Cabinet.selectedUser)
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
    const [multiple, setMultiple] = useState(false)
    const [selectedDevices, setSelectedDevices] = useState([])

    //Clear action on change folder
    useEffect(() => {
        dispatch(onGetDevices())
        dispatch(onGetConnectedContacts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const multipleSelect = dev => {
        if (selectedDevices.includes(dev.id)) {
            setSelectedDevices(selectedDevices.filter(i => i !== dev.id))
        } else {
            setSelectedDevices([...selectedDevices, dev.id])
        }
    }

    const renderDevicesList = () => {
        if(!devices) return null;
        return devices.map((dev, i) => {
            if (dev?.is_block === '1' || dev?.is_online === 0) {
                return null
            }
            return <DeviceItem
                key={i + dev.name}
                device={dev}
                selectedDevices={selectedDevices}
                listSize={size}
                chosen={selectedDevice?.id === dev.id || selectedDevices.includes(dev.id)}
                setMouseParams={setMouseParams}
                onClick={() => {
                    if (multiple) {
                        multipleSelect(dev)
                        dispatch(setSelectedDevice(null))
                    } else {
                        dispatch(setSelectedUser(null))
                        dispatch(setSelectedDevice(dev))
                    }
                }}
                listCollapsed={listCollapsed}
            />
        })
    };

    const onSafePassword = (boolean) => setSafePassword({...safePassword, open: boolean});

    const onMultipleBlock = () => {
        const formData = new FormData()
        formData.append('id_device', JSON.stringify(selectedDevices))
        api.post(`/ajax/devices_block.php`, formData, {
            params: {uid}
        })
            .then(() => {
                setSuccessBlocked(true)
                dispatch(setDevices(devices.filter(i => !selectedDevices.includes(i.id))))
                setSelectedDevices([])
            })
    }

    const blockItem = () => {
        if (selectedDevice) {
            const formData = new FormData()
            formData.append('id_device', JSON.stringify([selectedDevice.id]))
            api.post(`/ajax/devices_block.php`, formData, {
                params: {uid}
            })
                .then(() => {
                    setSuccessBlocked(true)
                    dispatch(setDevices(devices.filter(i => i.id !== selectedDevice.id)))
                })
        } else {
            api.post(`/ajax/devices_users_del.php?id_user_to=${selectedUser.id_user}`)
                .then(() => {
                    setSuccessBlocked(true)
                    dispatch(onGetConnectedContacts())
                })
        }

    }

    const renderMenuItems = (target, type) => {
        return target.map((item, i) => {

            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={() => {
                    // eslint-disable-next-line default-case
                    switch (item.type) {
                        case 'disconnectItem':
                            blockItem()
                            break;
                        case 'disconnectAllItem':
                            setMultiple(true)
                            setSelectedDevices([...selectedDevices, selectedDevice.id])
                            break;
                    }
                }}
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
                {multiple &&
                <OptionButtomLine
                    selectedDevices={selectedDevices}
                    setSelectedDevices={setSelectedDevices}
                    onCancel={() => {
                        setSelectedDevices([])
                        setMultiple(false)
                    }}
                    onSubmit={onMultipleBlock}
                />}
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
            {mouseParams !== null &&
            <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
                <div className={styles.mainMenuItems}>
                    {renderMenuItems(mouseParams.type === 'user' ? contextMenuDeviceUser.main : contextMenuDevice.main, callbackArrMain)}
                </div>
            </ContextMenu>}

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
