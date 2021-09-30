import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import styles from './WorkSpace.module.sass'
import SearchField from '../../SearchField'
import StorageSize from '../../StorageSize'
import Notifications from '../../Notifications'
import Profile from '../../Profile'
import ServePanel from '../../ServePanel'
import BottomPanel from '../../BottomPanel'
import FileBar from '../WorkElements/FileBar'
import WorkBarsPreview from '../WorkElements/WorkBarsPreview'
import ContextMenu from '../../../../../generalComponents/ContextMenu'
import {contextMenuFile} from '../../../../../generalComponents/collections'
import ContextMenuItem from '../../../../../generalComponents/ContextMenu/ContextMenuItem'
import {fileDelete} from '../../../../../generalComponents/fileMenuHelper'
import {onDeleteFile, onAddRecentFiles} from '../../../../../Store/actions/CabinetActions'
import ActionApproval from '../../../../../generalComponents/ActionApproval'
import File from '../../../../../generalComponents/Files'
import OptionButtomLine from "../WorkElements/OptionButtomLine"
import {imageSrc} from '../../../../../generalComponents/globalVariables';

const WorkSpace = ({chosenFile, setChosenFile,
                       chosenFolder, listCollapsed, setItem, setFilePreview, filePreview,
                       fileSelect, action, setAction
                   }) => {

    const dispatch = useDispatch();
    //const selectedDevice = useSelector(state => state.Cabinet.selectedDevice)

    const [workElementsView, setWorkElementsView] = useState('preview');
    const fileList = useSelector(state => state.Cabinet.fileList);
    const [mouseParams, setMouseParams] = useState(null);
    const [filePick, setFilePick] = useState({show: false, files: [], customize: false});
    const nullifyAction = () => setAction({type: '', name: '', text: ''});

    const callbackArrMain = [
        {type: 'resend', name: '', text: ``, callback: ''},
        {type: 'share', name: '', text: ``, callback: ''},
        {type: 'openInApp', name: '', text: ``, callback: ''},
        {type: 'copyLink', name: '', text: ``, callback: ''},
        {type: 'customize', name: 'Редактирование файла', text: ``, callback: (list, index) => setAction(list[index])},
        {
            type: 'customizeSeveral',
            name: `Редактирование файлов`,
            text: ``,
            callback: (list, index) => setFilePick({...filePick, show: true})
        },
        {type: 'archive', name: '', text: ``, callback: ''},
        {type: 'intoZip', name: '', text: ``, callback: ''},
        {type: 'info', name: '', text: ``, callback: ''},
        {type: 'download', name: 'Загрузка файла', text: ``, callback: () => document.downloadFile.submit()},
        {type: 'print', name: '', text: ``, callback: ''},
    ]

    const additionalMenuItems = [
        {
            type: 'delete',
            name: 'Удаление файла',
            text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`,
            callback: (list, index) => setAction(list[index])
        }
    ]

    const deleteFile = () => {
        fileDelete(chosenFile, dispatch, onDeleteFile)
        nullifyAction()
        setChosenFile(null)
        dispatch(onAddRecentFiles())
    }

    const renderMenuItems = (target, type) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={() => type[i]?.callback(type, i)}
                imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    }

    // Types of Files view
    const renderFiles = (Type) => {
        if (!fileList?.files) return null
        return fileList.files.map((file, i) => {
            return <Type
                key={i}
                file={file}
                setChosenFile={setChosenFile}
                chosen={chosenFile?.fid === file?.fid}
                setMouseParams={setMouseParams}
                setAction={setAction}
                setFilePreview={setFilePreview}
                filePreview={filePreview}
                filePick={filePick}
                setFilePick={setFilePick}
            />
        })
    }

    return (
        <>
            <div
                className={`${styles.workSpaceWrap} ${typeof listCollapsed === 'boolean' ? listCollapsed ? styles.workSpaceWrapCollapsed : styles.workSpaceWrapUncollapsed : undefined}`}>
                <div className={styles.header}>
                    <SearchField/>
                    <div className={styles.infoHeader}>
                        <StorageSize/>
                        <Notifications/>
                        <Profile setItem={setItem}/>
                    </div>
                </div>

                <ServePanel
                    setView={setWorkElementsView}
                    view={workElementsView}
                    chosenFile={chosenFile}
                    setAction={setAction}
                    fileSelect={fileSelect}
                />

                {workElementsView === 'preview' &&
                <WorkBarsPreview file={chosenFile}>
                    {renderFiles(FileBar)}
                </WorkBarsPreview>}

                {/*<div className={styles.contentWrapper}>

                    <div className={styles.previewWrapper}>
                        {selectedDevice && <img src={`./assets/PrivateCabinet/devices/${selectedDevice.device || 'unknown'}.svg`} alt="Macbook Pro"/>}
                    </div>

                    <div className={styles.optionsWrapper}>
                        <div className={styles.previewFileWrap}>
                            {selectedDevice &&
                            <>
                                <div className={styles.preview}>
                                    <div className={styles.filePreviewWrap}>
                                        <div className={styles.content}>
                                            <img src={`./assets/PrivateCabinet/devices/${selectedDevice.device || 'unknown'}.svg`} alt="Macbook Pro"/>
                                            <p className={styles.contentInfo}>{selectedDevice.name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.infoFileItem}>
                                    <span className={styles.itemName}>Система</span>
                                    <span className={styles.description}>{selectedDevice?.platform}</span>
                                </div>
                                <div className={styles.infoFileItem}>
                                    <span className={styles.itemName}>Браузер</span>
                                    <span className={styles.description}>{selectedDevice?.browser}</span>
                                </div>
                                <div className={styles.infoFileItem}>
                                    <span className={styles.itemName}>Регион</span>
                                    <span className={styles.description}>{selectedDevice?.country}</span>
                                </div>
                                <div className={styles.infoFileItem}>
                                    <span className={styles.itemName}>Город</span>
                                    <span className={styles.description}>Киев</span>
                                </div>
                                <div className={styles.infoFileItem}>
                                    <span className={styles.itemName}>iP адрес</span>
                                    <span className={styles.description}>{selectedDevice?.ip}</span>
                                </div>
                                <div className={styles.infoFileItem}>
                                    <span className={styles.itemName}>Провайдер</span>
                                    <span className={styles.description}>{selectedDevice?.provider}</span>
                                </div>
                                <div className={styles.infoFileItem}>
                                    <span className={styles.itemName}>Активность</span>
                                    <span className={styles.description}>{selectedDevice?.last_visit}</span>
                                </div>
                            </>}
                        </div>
                    </div>

                </div>*/}

                {filePick.show ? <OptionButtomLine
                    filePick={filePick}
                    setFilePick={setFilePick}
                    actionName={'Редактировать'}
                    setAction={setAction}
                /> : null}

                <BottomPanel/>
            </div>

            {mouseParams !== null &&
            <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
                <div className={styles.mainMenuItems}>
                    {renderMenuItems(contextMenuFile.main, callbackArrMain)}
                </div>
                <div className={styles.additionalMenuItems}>
                    {renderMenuItems(contextMenuFile.additional, additionalMenuItems)}
                </div>
            </ContextMenu>}

            {action.type === 'delete' &&
            <ActionApproval
                name={action.name}
                text={action.text}
                set={nullifyAction}
                callback={deleteFile}
                approve={'Удалить'}
            >
                <div className={styles.fileActionWrap}>
                    <File format={chosenFile?.ext} color={chosenFile?.color}/>
                </div>
            </ActionApproval>}

        </>)
}

export default WorkSpace
