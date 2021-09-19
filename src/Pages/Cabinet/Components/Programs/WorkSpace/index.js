import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import styles from './WorkSpace.module.sass'
import {fileDelete} from '../../../../../generalComponents/fileMenuHelper'
import {onDeleteFile} from '../../../../../Store/actions/CabinetActions'
import SearchField from '../../SearchField'
import StorageSize from '../../StorageSize'
import Notifications from '../../Notifications'
import Profile from '../../Profile'
import TopListPrograms from './../TopListPrograms'
import ServePanel from '../../ServePanel'
import WorkBars from '../WorkElements/WorkBars'
import BottomPanel from '../../BottomPanel'
import ActionApproval from '../../../../../generalComponents/ActionApproval'
import File from '../../../../../generalComponents/Files'
import CustomizeFile from '../../ContextMenuComponents/ContextMenuFile/CustomizeFile'
import ProgramBar from '../WorkElements/ProgramBar'
import WorkBarsPreview from '../WorkElements/WorkBarsPreview'
import WorkLinesPreview from '../WorkElements/WorkLinesPreview'
import ProgramLineShort from '../WorkElements/ProgramLineShort'
import ProgramLine from '../WorkElements/ProgramLine'

const WorkSpace = ({
                       setBlob, blob, fileLoading,

                       chosenProgram, setChosenProgram,
                       chosenTopListProgram, setChosenTopListProgram,
                       chosenFolder,

                       listCollapsed, setItem,
                       setFilePreview, filePreview,
                       setMouseParams,
                       fileSelect
                   }) => {

    const dispatch = useDispatch();

    const [filePick] = useState({ show: false, files: [] });
    const view = useSelector(state => state.Cabinet.view);
    const programs = useSelector(state => state.Cabinet.programs);
    const size = useSelector(state => state.Cabinet.size);

    const [action, setAction] = useState({type: '', name: '', text: ''});

    const nullifyAction = () => setAction({type: '', name: '', text: ''});

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
                    chosenProgram={chosenProgram}
                    setAction={setAction}
                    fileSelect={fileSelect}
                />
                {view === 'bars' &&
                <WorkBars
                    setBlob={setBlob}
                    blob={blob}
                    fileLoading={fileLoading}
                    fileSelect={fileSelect}
                    shop={chosenFolder === 'shop'}
                >
                    {renderPrograms(ProgramBar)}
                </WorkBars>}
                {view === "lines" && (
                    <div className={styles.collapseContentLine}>
                        {renderPrograms(ProgramLine)}
                    </div>
                )}

                {view === 'preview' &&
                <WorkBarsPreview
                    filePick={filePick}
                    chosenProgram={chosenProgram}
                    setChosenProgram={setChosenProgram}
                >
                    {renderPrograms(ProgramBar)}
                </WorkBarsPreview>}
                {view === 'workLinesPreview' &&
                <WorkLinesPreview
                    chosenProgram={chosenProgram}
                    setChosenProgram={setChosenProgram}
                >
                    {renderPrograms(ProgramLineShort)}
                </WorkLinesPreview>}

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

export default WorkSpace
