import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import api from '../../../../../api';
import {previewTypes} from '../../../../../generalComponents/collections';
import styles from './WorkSpace.module.sass';
import SearchField from '../../SearchField';
import StorageSize from '../../StorageSize';
import Notifications from '../../Notifications';
import Profile from '../../Profile';
import ServePanel from '../../ServePanel';
import WorkBars from '../../WorkElements/WorkBars';
import BottomPanel from '../../ButtomPanel';
import FileBar from '../../WorkElements/FileBar';
import WorkLines from '../../WorkElements/WorkLines';
import FileLine from '../../WorkElements/FileLine';
import WorkBarsPreview from '../../WorkElements/WorkBarsPreview';
import WorkLinesPreview from '../../WorkElements/WorkLinesPreview';
import FileLineShort from '../../WorkElements/FileLineShort';
import ContextMenu from '../../../../../generalComponents/ContextMenu';
import {contextMenuFile} from '../../../../../generalComponents/collections';
import ContextMenuItem from '../../../../../generalComponents/ContextMenu/ContextMenuItem';
import {fileDelete} from '../../../../../generalComponents/fileMenuHelper';
import {onDeleteFile, onAddRecentFiles} from '../../../../../Store/actions/PrivateCabinetActions';
import ActionApproval from '../../../../../generalComponents/ActionApproval';
import File from '../../../../../generalComponents/Files';
import RecentFiles from '../../RecentFiles';
import CustomizeFile from '../../CustomizeFile';
import OptionButtomLine from '../../WorkElements/OptionButtomLine';
import FileProperty from '../../FileProperty';
import CreateZip from '../../CreateZip';
import ShareFile from '../../ContextMenuComponents/ContextMenuFile/ShareFile/ShareFile';
import CopyLink from '../../ContextMenuComponents/ContextMenuFile/CopyLink/CopyLink';
import SuccessMessage from '../../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage';

const WorkSpace = ({fileLoading, chosenFile, setChosenFile,
                   chosenFolder, listCollapsed, setFilePreview, filePreview,
                   fileSelect, action, setAction
                  }) => {

    const dispatch = useDispatch();
    const [workElementsView, setWorkElementsView] = useState('bars');
    const uid = useSelector(state => state?.user.uid);
    const fileList = useSelector(state => state.PrivateCabinet.fileList);
    const recentFiles = useSelector(state => state.PrivateCabinet.recentFiles);
    const [mouseParams, setMouseParams] = useState(null);
    //TODO - Need to add to different file views
    const [filePick, setFilePick] = useState({show: false, files: [], customize: false, intoZip: false});
    const nullifyAction = () => setAction({type: '', name: '', text: ''});
    const nullifyFilePick = () => setFilePick({show: false, files: [], customize: false, intoZip: false});
    const [showLinkCopy, setShowLinkCopy] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const callbackArrMain = [
        {type: 'share', name: '', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'copyLink', name: '', text: ``, callback: () => setShowLinkCopy(true)},
        {type: 'customize', name: 'Редактирование файла', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'customizeSeveral', name: `Редактирование файлов`, text: ``, callback: () => setFilePick({...filePick, show: true})},
        {type: 'archive', name: 'Добавить файл в архив', text: `Вы действительно хотите архивировать файл ${chosenFile?.name}?`, callback: (list, index) => setAction(list[index])},
        {type: 'intoZip', name: 'Сжать в ZIP', text: ``, callback: (list, index) => setAction({...action, type: list[index].type, name: list[index].name})},
        {type: 'intoZipSeveral', name: 'Сжать в ZIP', text: ``, callback: () => setFilePick({...filePick, show: true, intoZip: true})},
        {type: 'properties', name: 'Свойства', text: ``, callback: () => setAction({...action, type: 'properties', name: 'Свойства'})},
        {type: 'download', name: 'Загрузка файла', text: ``, callback: () => document.downloadFile.submit()},
        {type: 'print', name: 'Распечатать файл', text: ``, callback: () => checkMimeTypes()},
        ];
    const additionalMenuItems = [
        {type: 'delete', name: 'Удаление файла', text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`, callback: (list, index) => setAction(list[index])}
    ];
    const deleteFile = () => {
        if(filePick.show) {
            const gdir = fileList.path;
            filePick.files.forEach((fid, i, arr) => fileDelete({gdir, fid}, dispatch, uid, i === arr.length - 1 ? setShowSuccessMessage : '', 'Файлы перемещено в корзину'));
            setFilePick({...filePick, files: [], show: false});
        } else{
            fileDelete(chosenFile, dispatch, uid, setShowSuccessMessage, 'Файл перемещен в корзину');
        }
        nullifyAction();
        setChosenFile(null);
        dispatch(onAddRecentFiles());
    };

    const checkMimeTypes = () => {
        if(chosenFile.mime_type) {
            if(chosenFile.mime_type === 'application/pdf') {
                printFile(`${chosenFile.preview}`);
            } else {
                const chosenType = previewTypes.filter(type => type === chosenFile.mime_type);
                if(chosenType.length > 0) {
                    api.post(`/ajax/file_preview.php?uid=${uid}&fid=${chosenFile.fid}`)
                        .then(res => printFile(res.data.file_pdf))
                        .catch(err => console.log(err));
                }
            }
        }
    };

    const printFile = (path) => {
            let pri = document.getElementById('frame');
            pri.src = `https://fs2.mh.net.ua/${path}`;
            setTimeout(() => {
                pri.contentWindow.focus();
                pri.contentWindow.print();
            }, 1000);
    };

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

    const addToArchive = (uid, fid, file) => {
        api.post(`/ajax/file_archive.php?uid=${uid}&fid=${fid}`)
            .then(res => {
                if (res.data.ok === 1) {
                    dispatch(onDeleteFile(file))
                    setShowSuccessMessage('Файл добавлен в архив')
                } else console.log(res?.error)
            })
            .catch(err => console.log(err))
            .finally(() => {
                nullifyAction();
                setChosenFile(null);
                if(filePick.show) nullifyFilePick();
            })
    }

    const archiveFile = () => {
        if(filePick.show) {
            filePick.files.forEach(fid => {
                addToArchive(uid, fid, {fid});
            })
        } else {
            addToArchive(uid, chosenFile.fid, chosenFile);
        }
	}

    useEffect(() => setChosenFile(null), [chosenFolder.path, chosenFolder.subPath]); // eslint-disable-line react-hooks/exhaustive-deps

    // Types of Files view
    const renderFiles = (Type) => {
        if(!fileList?.files) return null;
        return fileList.files.map((file, i) => {
            return <Type
                key={i}
                file={file}
                setChosenFile={setChosenFile}
                chosen={filePick.show ? filePick.files.findIndex(el => el === file.fid) >= 0 : chosenFile?.fid === file?.fid}
                setMouseParams={setMouseParams}
                setAction={setAction}
                setFilePreview={setFilePreview}
                filePreview={filePreview}
                filePick={filePick}
                setFilePick={setFilePick}
            />
        });
    }

    const onActiveCallbackArrMain = (type) => {
        let index;
        callbackArrMain.forEach((el, i) => el.type === type ? index = i : undefined);
        callbackArrMain[index].callback(callbackArrMain, index);
    };

    const cancelArchive = () => {
        nullifyFilePick();
        nullifyAction();
    }

    return (<>
        <div className={`${styles.workSpaceWrap} ${typeof listCollapsed === 'boolean' ? listCollapsed ? styles.workSpaceWrapCollapsed : styles.workSpaceWrapUncollapsed : undefined}`}>
            <div className={styles.header}>
                <SearchField setChosenFile={setChosenFile} />
                <div className={styles.infoHeader}>
                    <StorageSize />
                    <Notifications />
                    <Profile />
                </div>
            </div>
            {recentFiles?.length > 0 && <RecentFiles
                setFilePreview={setFilePreview}
                filePreview={filePreview}
            />}
            <ServePanel
                setView={setWorkElementsView}
                view={workElementsView}
                chosenFile={chosenFile}
                setAction={setAction}
                fileSelect={fileSelect}
                archive={() => onActiveCallbackArrMain('archive')}
                share={() => onActiveCallbackArrMain('share')}
                chooseSeveral={() => setFilePick({...filePick, files: [], show: !filePick.show})}
                filePick={filePick}
            />
            {workElementsView === 'bars' ? <WorkBars
                fileLoading={fileLoading}
                fileSelect={fileSelect}
                filePick={filePick}
            >{renderFiles(FileBar)}</WorkBars> : null}
            {workElementsView === 'lines' ? <WorkLines
                fileLoading={fileLoading}
            >{renderFiles(FileLine)}</WorkLines> : null}
            {workElementsView === 'preview' ? <WorkBarsPreview
                file={chosenFile}
            >{renderFiles(FileBar)}</WorkBarsPreview> : null}
            {workElementsView === 'workLinesPreview' ? <WorkLinesPreview
                file={chosenFile}
            >{renderFiles(FileLineShort)}</WorkLinesPreview> : null}
            {filePick.show ? <OptionButtomLine
                callbackArrMain={callbackArrMain}
                filePick={filePick}
                setFilePick={setFilePick}
                actionName={filePick.intoZip ? 'Сжать в Zip' : 'Редактировать'}
                setAction={setAction}
                action={action}
                nullifyFilePick={nullifyFilePick}
            /> : null}
            <BottomPanel />
        </div>
        {mouseParams !== null ? <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
            <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuFile.main, callbackArrMain)}</div>
            <div className={styles.additionalMenuItems}>{renderMenuItems(contextMenuFile.additional, additionalMenuItems)}</div>
        </ContextMenu> : null}
        {action.type === 'delete' ? <ActionApproval name={filePick.show ? 'Удаление файлов' : action.name} text={filePick.show ? 'Вы действительно хотите удалить выбранные файлы?' : action.text} set={cancelArchive} callback={deleteFile} approve={'Удалить'}>
            <div className={styles.fileActionWrap}><File format={filePick.show ? 'FILES' : chosenFile?.ext} color={chosenFile?.color} /></div>
        </ActionApproval> : null}
        {action.type === 'customize' || filePick.customize ? <CustomizeFile
            title={filePick.customize ? `Редактировать выбранные файлы` : action.name }
            info={chosenFolder}
            file={chosenFile}
            // TODO - Check Cancellation for FilePick
            close={filePick.customize ? nullifyFilePick : nullifyAction}
            filePick={filePick}
            setFilePick={setFilePick}
        /> : null}
        {action.type === 'share' ? (
				<ShareFile file={chosenFile} files={filePick.files} close={nullifyAction} action_type={action.type} showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} />
			) : null}
        {action.type === 'resend' ? (
            <ShareFile file={chosenFile} files={filePick.files} close={nullifyAction} action_type={'send'} showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} />
        ) : null}
        {action.type === 'properties'
            ? <FileProperty
                close={nullifyAction}
                file={chosenFile}
            />
            : null}
        {action.type === 'intoZip'
            ? <CreateZip
                close={nullifyAction}
                file={chosenFile}
                title={action.name}
                info={chosenFolder}
                filePick={filePick}
                nullifyFilePick={nullifyFilePick}
                setShowSuccessMessage={setShowSuccessMessage}
            />
            : null}
        {action.type === 'archive'
            ?   <ActionApproval
					name={filePick.show ? 'Добавить выбранные файлы в архив' : action.name}
					text={filePick.show ? ' Вы действительно хотите переместить в архив выбранные файлы?' : action.text}
					set={cancelArchive}
					callback={archiveFile}
					approve={'Архивировать'}
				>
					<div className={styles.fileActionWrap}>
						<File format={filePick.show ? 'FILES' : chosenFile?.ext} color={chosenFile?.color} />
					</div>
				</ActionApproval>
			: null}
        <form style={{display: 'none'}} name='downloadFile' action='/ajax/download.php' method='post'>
            <input style={{display: 'none'}} name='fid' value={chosenFile?.fid || ''} readOnly />
        </form>
        <iframe
            style={{display: 'none'}}
            title={'print'}
            frameBorder='0'
            scrolling='no'
            id='frame'
        />
        {showLinkCopy && <CopyLink fid={chosenFile?.fid} setShowLinkCopy={setShowLinkCopy}/>}
        {showSuccessMessage && <SuccessMessage showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} />}
    </>)
}

export default WorkSpace;
