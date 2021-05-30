import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import styles from './WorkSpace.module.sass'
import {fileDelete} from '../../../../../generalComponents/fileMenuHelper'
import {onDeleteFile} from '../../../../../Store/actions/PrivateCabinetActions'
import ContextMenuItem from '../../../../../generalComponents/ContextMenu/ContextMenuItem'
import SearchField from '../../SearchField'
import StorageSize from '../../StorageSize'
import Notifications from '../../Notifications'
import Profile from '../../Profile'
import TopListPrograms from './../TopListPrograms'
import ServePanel from '../../ServePanel'
import WorkBars from '../WorkElements/WorkBars'
import BottomPanel from '../../ButtomPanel'
import ContextMenu from '../../../../../generalComponents/ContextMenu'
import ActionApproval from '../../../../../generalComponents/ActionApproval'
import File from '../../../../../generalComponents/Files'
import CustomizeFile from '../../CustomizeFile'
import {contextMenuFile} from '../../../../../generalComponents/collections'
import ProgramBar from '../WorkElements/ProgramBar'
import ProgramShop from "../WorkElements/ProgramShop";

const WorkSpace = ({
                       setBlob, blob, fileLoading,

                       chosenProgram, setChosenProgram,
                       chosenTopListProgram, setChosenTopListProgram,
                       chosenFolder,

                       listCollapsed, setItem,
                       setFilePreview, filePreview,
                       fileSelect
                   }) => {

    const dispatch = useDispatch();
    const [workElementsView, setWorkElementsView] = useState('bars');
    const programs = useSelector(state => state.programs.programs);
    const [mouseParams, setMouseParams] = useState(null);
    const [action, setAction] = useState({type: '', name: '', text: ''});

    const nullifyAction = () => setAction({type: '', name: '', text: ''});

    const callbackArrMain = ['', '', '', '',
        {type: 'customize', name: 'Редактирование файла', text: ``},
        '', '', '', '', '', '', ''];
    const additionalMenuItems = [
        {type: 'delete', name: 'Удаление файла', text: `Вы действительно хотите удалить файл ${chosenProgram?.name}?`}
    ];
    const deleteFile = () => {
        fileDelete(chosenProgram, dispatch, onDeleteFile);
        nullifyAction();
        setChosenProgram(null)
    };

    const renderMenuItems = (target, type) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={() => setAction(type[i])}
                imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    }

    // Types of Files view
    const renderPrograms = (Type) => {
        if (!programs) return null;
        return programs.map((program, i) => {
            return <Type
                key={i}
                program={program}
                setChosenProgram={setChosenProgram}
                chosenProgram={chosenProgram}
                setMouseParams={setMouseParams}
                setAction={setAction}
                setFilePreview={setFilePreview}
                filePreview={filePreview}
            />
        });
    };

    console.log(chosenFolder)

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
                <TopListPrograms
                    setFilePreview={setFilePreview}
                    filePreview={filePreview}

                    chosenTopListProgram={chosenTopListProgram}
                    setChosenTopListProgram={setChosenTopListProgram}
                />
                <ServePanel
                    setBlob={setBlob}
                    blob={blob}
                    setView={setWorkElementsView}
                    view={workElementsView}
                    chosenProgram={chosenProgram}
                    setAction={setAction}
                    fileSelect={fileSelect}
                />
                {workElementsView === 'bars' &&
                <WorkBars
                    setBlob={setBlob}
                    blob={blob}
                    fileLoading={fileLoading}
                    fileSelect={fileSelect}
                    shop={chosenFolder === 'shop'}
                >
                    {chosenFolder === 'shop' ? renderPrograms(ProgramShop) : renderPrograms(ProgramBar)}
                </WorkBars>}
                {/*{workElementsView === 'lines' ? <WorkLines fileLoading={fileLoading}>{renderFiles(FileLine)}</WorkLines> : null}
            {workElementsView === 'preview' ? <WorkBarsPreview file={chosenProgram}>{renderFiles(FileBar)}</WorkBarsPreview> : null}
            {workElementsView === 'workLinesPreview' ? <WorkLinesPreview file={chosenProgram}>{renderFiles(FileLineShort)}</WorkLinesPreview> : null}*/}
                <BottomPanel/>
            </div>
            {mouseParams !== null &&
            <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
                <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuFile.main, callbackArrMain)}</div>
                <div
                    className={styles.additionalMenuItems}>{renderMenuItems(contextMenuFile.additional, additionalMenuItems)}</div>
            </ContextMenu>}
            {action.type === 'delete' &&
            <ActionApproval name={action.name} text={action.text} set={nullifyAction} callback={deleteFile}
                            approve={'Удалить'}>
                <div className={styles.fileActionWrap}><File format={chosenProgram?.ext} color={chosenProgram?.color}/>
                </div>
            </ActionApproval>}
            {action.type === 'customize' &&
            <CustomizeFile
                title={action.name}
                info={chosenFolder}
                file={chosenProgram}
                close={nullifyAction}
            />}
        </>)
}

export default WorkSpace;
