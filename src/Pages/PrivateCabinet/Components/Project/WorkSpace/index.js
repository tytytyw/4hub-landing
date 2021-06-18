import React, {useState} from 'react'

import styles from './WorkSpace.module.sass'
import SearchField from '../../SearchField'
import StorageSize from '../../StorageSize'
import Notifications from '../../Notifications'
import Profile from '../../Profile'
import ServePanel from '../../ServePanel'
import MembersPanel from './MembersPanel'
import RecentFiles from '../../RecentFiles'
import classNames from 'classnames'
import WorkLinesPreview from '../WorkElements/WorkLinesPreview'
import FileLineShort from '../../Safe/FileLineShort'
import {useSelector} from 'react-redux'

const WorkSpace = () => {

    const fileList = useSelector(state => state.PrivateCabinet.fileList)

    const [workElementsView, setWorkElementsView] = useState('workLinesPreview')
    const [recentFiles, setRecentFiles] = useState([])

    const [safePassword, setSafePassword] = useState({open: false})
    const [chosenFile, setChosenFile] = useState(null)
    const [mouseParams, setMouseParams] = useState(null)
    const [action, setAction] = useState({type: '', name: '', text: ''})

    const renderFiles = (Type) => {
        if(!fileList?.files) return null
        return fileList.files.map((file, i) => {
            return <Type
                key={i}
                file={file}
                setChosenFile={setChosenFile}
                chosen={chosenFile?.fid === file?.fid}
                setMouseParams={setMouseParams}
                setAction={setAction}
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
                setView={setWorkElementsView}
                view={workElementsView}
            />

            <MembersPanel

            />

            <div className={classNames({
                [styles.mainContent]: true,
                [styles.withFiles]: recentFiles?.length < 1
            })}>

                {workElementsView === 'workLinesPreview' &&
                <WorkLinesPreview file={chosenFile}>
                    {renderFiles(FileLineShort)}
                </WorkLinesPreview>}

            </div>

        </div>
    )
}

export default WorkSpace