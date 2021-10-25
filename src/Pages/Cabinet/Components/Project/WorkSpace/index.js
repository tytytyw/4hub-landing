import React, {useState} from 'react'

import styles from './WorkSpace.module.sass'
import SearchField from '../../SearchField'
import StorageSize from '../../StorageSize'
import Notifications from '../../Notifications'
import Profile from '../../Profile'
import ServePanel from '../../ServePanel'
// import MembersPanel from './MembersPanel'
import RecentFiles from '../../RecentFiles'
import WorkLinesPreview from '../WorkElements/WorkLinesPreview'
import FileLineShort from '../WorkElements/FileLineShort'
import {useSelector} from 'react-redux'
import AddMember from "../AddMember";
import BottomPanel from "../../BottomPanel";

const WorkSpace = ({setMouseParams, addMember, setAddMember}) => {

    const fileList = useSelector(state => state.Cabinet.fileList)
    const recentFiles = useSelector(state => state.Cabinet.recentFiles)
    const [filePick, setFilePick] = useState({show: false, files: [], customize: false, intoZip: false})
    const [workElementsView, setWorkElementsView] = useState('')
    const [chosenFile, setChosenFile] = useState(null)
    const [action, setAction] = useState({type: '', name: '', text: ''})

    const renderFiles = (Type) => {
        if(!fileList?.files) return null
        return fileList.files.map((file, i) => {
            return <Type
                key={i}
                file={file}
                setChosenFile={setChosenFile}
                chosenFile={chosenFile}
                chosen={chosenFile?.fid === file?.fid}
                setMouseParams={setMouseParams}
                setAction={setAction}
                filePick={filePick}
                setFilePick={setFilePick}
                action={action}
            />
        })
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.header}>
                <SearchField />
                <div className={styles.infoHeader}>
                    <StorageSize />
                    <Notifications />
                    <Profile />
                </div>
            </div>

            {recentFiles?.length > 0 && <RecentFiles
                setView={setWorkElementsView}
                view={workElementsView}
            />}

            <ServePanel
                disableWorkElementsView={true}
            />

            {/*<MembersPanel*/}
            {/*    setAddMember={setAddMember}*/}
            {/*/>*/}

            <WorkLinesPreview
                recentFiles={recentFiles}
                chosenFile={chosenFile}
            >
                {renderFiles(FileLineShort)}
            </WorkLinesPreview>

            {addMember &&
            <AddMember
                set={setAddMember}
            />}
            <BottomPanel />
        </div>
    )
}

export default WorkSpace