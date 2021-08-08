import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import styles from './WorkSpace.module.sass'
import SearchField from '../../SearchField'
import StorageSize from '../../StorageSize'
import Notifications from '../../Notifications'
import Profile from '../../Profile'
import ServePanel from '../../ServePanel'
import BottomPanel from '../../BottomPanel'
import WorkLinesPreview from './../WorkElements/WorkLinesPreview'

import WorkBarsPreview from '../../WorkElements/WorkBarsPreview'
import WorkBars from '../../WorkElements/WorkBars'
import WorkLines from '../../WorkElements/WorkLines'
import FileBar from "../../WorkElements/FileBar";
import FileLine from "../../WorkElements/FileLine";

import FileLineShort from '../FileLineShort'
import ContextMenu from '../../../../../generalComponents/ContextMenu'
import {contextMenuFile} from '../../../../../generalComponents/collections'
import ContextMenuItem from '../../../../../generalComponents/ContextMenu/ContextMenuItem'
import {fileDelete} from '../../../../../generalComponents/fileMenuHelper'
import {onDeleteFile, onAddRecentFiles} from '../../../../../Store/actions/PrivateCabinetActions'
import ActionApproval from '../../../../../generalComponents/ActionApproval'
import File from '../../../../../generalComponents/Files'

const WorkSpace = ({chosenFile, setChosenFile,
                   listCollapsed, setFilePreview, filePreview,
                   fileSelect, action, setAction, fileList
                  }) => {

    const dispatch = useDispatch();
    const workElementsView = useSelector(state => state.PrivateCabinet.view)
 
    const size = useSelector(state => state.PrivateCabinet.size);
    const [mouseParams, setMouseParams] = useState(null);
    const [filePick, setFilePick] = useState({show: false, files: [], customize: false});
    const nullifyAction = () => setAction({type: '', name: '', text: ''});

    const callbackArrMain = [
        {type: 'resend', name: '', text: ``, callback: ''},
        {type: 'share', name: '', text: ``, callback: ''},
        {type: 'openInApp', name: '', text: ``, callback: ''},
        {type: 'copyLink', name: '', text: ``, callback: ''},
        {type: 'customize', name: 'Редактирование файла', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'customizeSeveral', name: `Редактирование файлов`, text: ``, callback: (list, index) => setFilePick({...filePick, show: true})},
        {type: 'archive', name: '', text: ``, callback: ''},
        {type: 'intoZip', name: '', text: ``, callback: ''},
        {type: 'info', name: '', text: ``, callback: ''},
        {type: 'download', name: 'Загрузка файла', text: ``, callback: () => document.downloadFile.submit()},
        {type: 'print', name: '', text: ``, callback: ''},
    ];

    const additionalMenuItems = [
        {type: 'delete', name: 'Удаление файла', text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`, callback: (list, index) => setAction(list[index])}
    ];

    const deleteFile = () => {fileDelete(chosenFile, dispatch, onDeleteFile); nullifyAction(); setChosenFile(null); dispatch(onAddRecentFiles())};

    const renderMenuItems = (target, type) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={() => type[i]?.callback(type, i)}
                imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    }

    //useEffect(() => setChosenFile(null), [chosenFolder.path, chosenFolder.subPath]); // eslint-disable-line react-hooks/exhaustive-deps
    // Change state to default after changing menu params
    useEffect(() => {
        if(action?.type !== 'customizeSeveral') setFilePick({show: false, files: [], customize: false});
    }, [action]); // eslint-disable-line react-hooks/exhaustive-deps

    // Types of Files view
    const renderFiles = (Type) => {
        if(!fileList?.files) return null;
        return fileList.files.map((file, i) => {
            return <Type
                key={i}
                file={file}
                setChosenFile={setChosenFile}
                chosen={
					filePick.show
						? filePick.files.findIndex((el) => el === file.fid) >= 0
						: chosenFile?.fid === file?.fid
				}
                chosenFile={chosenFile}
                setMouseParams={setMouseParams}
                setAction={setAction}
                setFilePreview={setFilePreview}
                filePreview={filePreview}
                filePick={filePick}
                setFilePick={setFilePick}
                callbackArrMain={callbackArrMain}
                size={size}
            />
        });
    };

    return (<>
        <div className={`${styles.workSpaceWrap} ${typeof listCollapsed === 'boolean' ? listCollapsed ? styles.workSpaceWrapCollapsed : styles.workSpaceWrapUncollapsed : undefined}`}>
            <div className={styles.header}>
                <SearchField />
                <div className={styles.infoHeader}>
                    <StorageSize />
                    <Notifications />
                    <Profile/>
                </div>
            </div>
            <ServePanel
                view={workElementsView}
                chosenFile={chosenFile}
                setAction={setAction}
                fileSelect={fileSelect}
            />

            {fileList?.files?.length > 0 &&
            <div
                style={{
                    height: 'calc(100% - 90px - 55px)'
                }}
            >

                {workElementsView === 'bars' &&
                <WorkBars
                    file={chosenFile}
                    filePick={filePick}
                >
                    {renderFiles(FileBar)}
                </WorkBars>}

                {workElementsView === 'lines' &&
                <WorkLines file={chosenFile} filePick={filePick}>
                    {renderFiles(FileLine)}
                </WorkLines>}

                {workElementsView === 'preview' &&
                <WorkBarsPreview file={chosenFile} filePick={filePick}>
                    {renderFiles(FileBar)}
                </WorkBarsPreview>}

                {workElementsView === 'workLinesPreview' &&
                <WorkLinesPreview file={chosenFile} filePick={filePick}> 
                    {renderFiles(FileLineShort)}
                </WorkLinesPreview>}

            </div>}

            <BottomPanel />
        </div>

        {mouseParams !== null ? <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
            <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuFile.main, callbackArrMain)}</div>
            <div className={styles.additionalMenuItems}>{renderMenuItems(contextMenuFile.additional, additionalMenuItems)}</div>
        </ContextMenu> : null}

        {action.type === 'delete' ? <ActionApproval name={action.name} text={action.text} set={nullifyAction} callback={deleteFile} approve={'Удалить'}>
            <div className={styles.fileActionWrap}><File format={chosenFile?.ext} color={chosenFile?.color} /></div>
        </ActionApproval> : null}

        <form style={{display: 'none'}} name='downloadFile' action='/ajax/download.php' method='post'>
            <input style={{display: 'none'}} name='fid' value={chosenFile?.fid || ''} readOnly />
        </form>

    </>)
}

export default WorkSpace
