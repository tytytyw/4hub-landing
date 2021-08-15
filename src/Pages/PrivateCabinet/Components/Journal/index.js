import React, {useEffect, useState} from 'react'

import styles from './Journal.module.sass'
import SearchField from '../SearchField'
import StorageSize from '../StorageSize'
import Notifications from '../Notifications'
import Profile from '../Profile'
import ServePanel from '../ServePanel'
import FileLine from './WorkElements/FileLine'
import {useDispatch, useSelector} from 'react-redux'
import DateBlock from './DateBlock'
import ContextMenu from '../../../../generalComponents/ContextMenu'
import {contextMenuFile} from '../../../../generalComponents/collections'
import ContextMenuItem from '../../../../generalComponents/ContextMenu/ContextMenuItem'
import ActionApproval from '../../../../generalComponents/ActionApproval'
import File from '../../../../generalComponents/Files'
import classNames from 'classnames'
import {ReactComponent as PlayIcon} from '../../../../assets/PrivateCabinet/play-grey.svg'
import List from './List'
import FolderItem from './FolderItem'
import {onGetJournalFolders} from '../../../../Store/actions/PrivateCabinetActions'
import BottomPanel from "../BottomPanel";

const Journal = () => {

    const [workElementsView, setWorkElementsView] = useState('workLinesPreview')
    const [search, setSearch] = useState(null)

    const dispatch = useDispatch()
    const fileList = useSelector((state) => state.PrivateCabinet.fileList)
    const journalFolders = useSelector((state) => state.PrivateCabinet.journalFolders)

    const [year, setYear] = useState(null)
    const [collapse, setCollapse] = useState(false)

    //const [listCollapsed, setListCollapsed] = useState(false)

    const [month, setMonth] = useState(null)

    const [chosenFolder, setChosenFolder] = useState(null)
    const [chosenFile, setChosenFile] = useState(null)
    const [action, setAction] = useState({type: "", name: "", text: ""})
    const [mouseParams, setMouseParams] = useState(null)
    const [filePreview, setFilePreview] = useState(null)

    const nullifyAction = () => setAction({type: "", name: "", text: ""})

    const additionalMenuItems = [
        {
            type: 'delete',
            name: 'Удаление файла',
            text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`,
            callback: (list, index) => setAction(list[index])
        },
    ]

    useEffect(() => {
        dispatch(onGetJournalFolders())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderMenuItems = (target, type) => {
        return target.map((item, i) => {
            return (
                <ContextMenuItem
                    key={i}
                    width={mouseParams.width}
                    height={mouseParams.height}
                    text={item.name}
                    callback={() => type[i]?.callback(type, i)}
                    imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
                />
            )
        })
    }

    const renderFile = () => {
        const file = fileList?.files?.[fileList.files.length - 1]
        if (!file) return null
        return (
            <FileLine
                file={file}
                setChosenFile={setChosenFile}
                chosenFile={chosenFile}
                setMouseParams={setMouseParams}
                setAction={setAction}
                filePreview={filePreview}
                setFilePreview={setFilePreview}
            />
        )
    }

    const renderFiles = () => {
        if (!fileList) return null
        return fileList.files?.map((file, index) => (
            <FileLine
                key={index}
                file={file}
                setChosenFile={setChosenFile}
                chosenFile={chosenFile}
                setMouseParams={setMouseParams}
                setAction={setAction}
                filePreview={filePreview}
                setFilePreview={setFilePreview}
            />
        ))
    }

    const renderFolders = () => {
        return journalFolders?.map((folder, index) => (
            <FolderItem
                key={index}
                folder={folder}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
                setMouseParams={setMouseParams}
            />
        ))
    }

    return (
        <div className={styles.parentWrapper}>

                <List
                    title='Папки'
                    src='add-folder.svg'
                >
                    {renderFolders()}
                </List>

                <div className={styles.contentRight}>

                    <div className={styles.header}>
                        <SearchField/>
                        <div className={styles.infoHeader}>
                            <StorageSize/>
                            <Notifications/>
                            <Profile/>
                        </div>
                    </div>

                    <ServePanel
                        setView={setWorkElementsView}
                        view={workElementsView}
                    />

                    <div className={styles.wrapper}>

                        <DateBlock
                            search={search}
                            setSearch={setSearch}
                            year={year}
                            setYear={setYear}
                            month={month}
                            setMonth={setMonth}
                        />

                        <div className={styles.filesWrap}>

                            <div className={styles.fileWrap}>

                                <div
                                    onClick={() => setCollapse(!collapse)}
                                    className={styles.collapseHeader}
                                >
                                    <p className={styles.dateName}>Август</p>
                                    <button className={styles.collapseBtn}>
                                        2 объектов
                                    </button>
                                    <div
                                        className={classNames({
                                            [styles.arrowFile]: true,
                                            [styles.active]: !!collapse
                                        })}
                                    >
                                        <PlayIcon
                                            className={classNames({
                                                [styles.playButton]: true,
                                                [styles.revert]: !!collapse
                                            })}
                                        />
                                    </div>
                                </div>

                                {collapse &&
                                <div className={styles.fileDate}>
                                    <p>10.08.2020</p>
                                </div>}

                                <div className={styles.collapseContent}>
                                    {collapse ?
                                        renderFiles() :
                                        renderFile()}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            {mouseParams !== null && (
                <ContextMenu
                    params={mouseParams}
                    setParams={setMouseParams}
                    tooltip={true}
                >
                    <div className={styles.mainMenuItems}>
                        {renderMenuItems(contextMenuFile.main)}
                    </div>
                    <div className={styles.additionalMenuItems}>
                        {renderMenuItems(contextMenuFile.additional, additionalMenuItems)}
                    </div>
                </ContextMenu>
            )}

            {action.type === 'delete' && (
                <ActionApproval
                    name={action.name}
                    text={action.text}
                    set={nullifyAction}
                    callback={() => {
                    }}
                    approve={'Удалить'}
                >
                    <div className={styles.fileActionWrap}>
                        <File format={chosenFile?.ext} color={chosenFile?.color}/>
                    </div>
                </ActionApproval>
            )}

            <BottomPanel />

        </div>
    )
}

export default Journal