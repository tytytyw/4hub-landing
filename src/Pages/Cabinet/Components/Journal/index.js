import React, {useEffect, useState} from 'react'

import styles from './Journal.module.sass'
import SearchField from '../SearchField'
import StorageSize from '../StorageSize'
import Notifications from '../Notifications'
import Profile from '../Profile'
import ServePanel from '../ServePanel'
import {useDispatch, useSelector} from 'react-redux'
import DateBlock from './DateBlock'
import ContextMenu from '../../../../generalComponents/ContextMenu'
import {useContextMenuFile} from '../../../../generalComponents/collections'
import ContextMenuItem from '../../../../generalComponents/ContextMenu/ContextMenuItem'
import ActionApproval from '../../../../generalComponents/ActionApproval'
import File from '../../../../generalComponents/Files'
import List from './List'
import FolderItem from './FolderItem'
import {onGetJournalFolders} from '../../../../Store/actions/CabinetActions'
import BottomPanel from "../BottomPanel";
import {imageSrc} from '../../../../generalComponents/globalVariables';

import FilesGroup from './WorkElements/FilesGroup/FilesGroup'

import { months } from "../../../../generalComponents/CalendarHelper";
import {useLocales} from "react-localized";

const Journal = () => {
    const { __ } = useLocales()
    const contextMenuFile = useContextMenuFile()
    const workElementsView = useSelector((state) => state.Cabinet.view);
    const [search, setSearch] = useState(null)

    const dispatch = useDispatch()
    const fileList = useSelector((state) => state.Cabinet.fileList)
    const journalFolders = useSelector((state) => state.Cabinet.journalFolders)

    const [year, setYear] = useState(null)

    const [month, setMonth] = useState(null)

    const [filePick, setFilePick] = useState({ show: false, files: [] });

    const [chosenFolder, setChosenFolder] = useState(null)
    const [chosenFile, setChosenFile] = useState(null)
    const [action, setAction] = useState({type: "", name: "", text: ""})
    const [mouseParams, setMouseParams] = useState(null)
    const [filePreview, setFilePreview] = useState(null)

    const nullifyAction = () => setAction({type: "", name: "", text: ""})

    const callbackArrMain = [
        {type: 'resend', name: __(''), text: __(''), callback: (list, index) => setAction(list[index])},
        {type: 'share', name: __(''), text: __(''), callback: (list, index) => setAction(list[index])},
        {type: 'copyLink', name: __(''), text: __(''), callback: () => {}},
        {type: 'customize', name: __('Редактирование файла'), text: __(''), callback: (list, index) => setAction(list[index])},
        {type: 'customizeSeveral', name: __(`Редактирование файлов`), text: __(''), callback: () => {}},
        {type: 'archive', name: __('Добавить файл в архив'), text: __(`Вы действительно хотите архивировать файл ${chosenFile?.name}?`), callback: (list, index) => setAction(list[index])},
        {type: 'intoZip', name: __('Сжать в ZIP'), text: __(''), callback: (list, index) => setAction({...action, type: list[index].type, name: list[index].name})},
        {type: 'properties', name: __('Свойства'), text: __(''), callback: () => setAction({...action, type: 'properties', name: __('Свойства')})},
        {type: 'download', name: __('Загрузка файла'), text: __(''), callback: () => {}},
        {type: 'print', name: __('Распечатать файл'), text: __(''), callback: () => {}},
    ]

    const additionalMenuItems = [
        {
            type: 'delete',
            name: __('Удаление файла'),
            text: __(`Вы действительно хотите удалить файл ${chosenFile?.name}?`),
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
                    imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
                />
            )
        })
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
    
    const renderFilesGroup = (mounth, i) => {
		return (
			<FilesGroup
				key={i}
				index={i}
				fileList={fileList}
				filePreview={filePreview}
				setFilePreview={setFilePreview}
				callbackArrMain={callbackArrMain}
				chosenFile={chosenFile}
				setChosenFile={setChosenFile}
				filePick={filePick}
				setFilePick={setFilePick}
				mounthName={mounth}
				setAction={setAction}
				setMouseParams={setMouseParams}
			/>
		);
	};

    return (
        <div className={styles.parentWrapper}>

                <List
                    title={ __('Папки') }
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

                        <div className={styles.workSpaceWrap}>

                            <div className={styles.FilesList}>
                                {month
                                    ? renderFilesGroup(months()[month - 1].name, 0)
                                    : months().map((item, i) => renderFilesGroup(item.name, i))}
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
                    approve={ __('Удалить') }
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