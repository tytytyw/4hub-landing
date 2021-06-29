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

const WorkSpace = ({
                       setBlob, blob, fileLoading,

                       chosenProgram, setChosenProgram,
                       chosenTopListProgram, setChosenTopListProgram,
                       chosenFolder,

                       listCollapsed, setItem,
                       setFilePreview, filePreview,
                       mouseParams, setMouseParams,
                       fileSelect
                   }) => {

    const dispatch = useDispatch();
    const [workElementsView, setWorkElementsView] = useState('bars');
    const programs = useSelector(state => state.PrivateCabinet.programs);
    const size = useSelector(state => state.PrivateCabinet.size);

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
                size={size}
            />
        });
    }

    return (
        <>
            <div
                className={`${styles.workSpaceWrap} ${typeof listCollapsed === 'boolean' ? listCollapsed ? styles.workSpaceWrapCollapsed : styles.workSpaceWrapUncollapsed : undefined}`}
            >
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
                    {renderPrograms(ProgramBar)}
                </WorkBars>}
                {/*{workElementsView === 'lines' ? <WorkLines fileLoading={fileLoading}>{renderFiles(FileLine)}</WorkLines> : null}
            {workElementsView === 'preview' ? <WorkBarsPreview file={chosenProgram}>{renderFiles(FileBar)}</WorkBarsPreview> : null}
            {workElementsView === 'workLinesPreview' ? <WorkLinesPreview file={chosenProgram}>{renderFiles(FileLineShort)}</WorkLinesPreview> : null}*/}
                <BottomPanel/>
            </div>

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
