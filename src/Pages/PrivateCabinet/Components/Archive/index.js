import React, {useState} from 'react'

import styles from './Archive.module.sass'
import SearchField from '../SearchField'
import StorageSize from '../StorageSize'
import Notifications from '../Notifications'
import Profile from '../Profile'
import ServePanel from '../ServePanel'
import {useSelector} from 'react-redux'
import DateBlock from '../Journal/DateBlock'
import ContextMenu from '../../../../generalComponents/ContextMenu'
import {contextMenuFile} from '../../../../generalComponents/collections'
import ContextMenuItem from '../../../../generalComponents/ContextMenu/ContextMenuItem'
import ActionApproval from "../../../../generalComponents/ActionApproval";
import File from "../../../../generalComponents/Files";
import BottomPanel from "../BottomPanel";
import SideList from '../SharedFiles/SideList'
import FilesGroup from './WorkElements/FilesGroup/FilesGroup'

import { months } from "../../../../generalComponents/CalendarHelper";
import WorkLinesPreview from '../WorkElements/WorkLinesPreview'

const Archive = () => {

    const workElementsView = useSelector((state) => state.PrivateCabinet.view);

    //const [workElementsView, setWorkElementsView] = useState('workLinesPreview')
    const [search, setSearch] = useState(null)
    const fileList = useSelector((state) => state.PrivateCabinet.fileList)

    const [year, setYear] = useState(null)
    const [month, setMonth] = useState(null)

    const [filePick, setFilePick] = useState({ show: false, files: [] });

    const [chosenFile, setChosenFile] = useState(null)
    const [action, setAction] = useState({ type: "", name: "", text: "" })
    const [mouseParams, setMouseParams] = useState(null)
    const [filePreview, setFilePreview] = useState(null)

    const nullifyAction = () => setAction({ type: "", name: "", text: "" });

    const callbackArrMain = [
        {type: 'resend', name: '', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'share', name: '', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'copyLink', name: '', text: ``, callback: () => {}},
        {type: 'customize', name: 'Редактирование файла', text: ``, callback: (list, index) => setAction(list[index])},
        {type: 'customizeSeveral', name: `Редактирование файлов`, text: ``, callback: () => {}},
        {type: 'archive', name: 'Добавить файл в архив', text: `Вы действительно хотите архивировать файл ${chosenFile?.name}?`, callback: (list, index) => setAction(list[index])},
        {type: 'intoZip', name: 'Сжать в ZIP', text: ``, callback: (list, index) => setAction({...action, type: list[index].type, name: list[index].name})},
        {type: 'properties', name: 'Свойства', text: ``, callback: () => setAction({...action, type: 'properties', name: 'Свойства'})},
        {type: 'download', name: 'Загрузка файла', text: ``, callback: () => {}},
        {type: 'print', name: 'Распечатать файл', text: ``, callback: () => {}},
    ]
    
    const additionalMenuItems = [
        {
            type: 'delete',
            name: 'Удаление файла',
            text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`,
            callback: (list, index) => setAction(list[index])
        },
    ]

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

            <div className={styles.header}>
                <SearchField />
                <div className={styles.infoHeader}>
                    <StorageSize />
                    <Notifications />
                    <Profile />
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

                    {workElementsView === "workLinesPreview" && (
						<div className={styles.workSpace}>
							<SideList>
								{month
									? renderFilesGroup(months()[month - 1].name, 0)
									: months().map((item, i) => renderFilesGroup(item.name, i))}
							</SideList>
							<div className={styles.filePreviewWrap}>
								<WorkLinesPreview
									file={chosenFile}
									hideFileList={true}
									filePick={filePick}
								/>
							</div>
						</div>
					)}
					{/*TODO: заменить при получении сгруппированного на даты списка файлов */}
					{workElementsView !== "workLinesPreview" && (
						<div className={styles.FilesList}>
							{month
								? renderFilesGroup(months()[month - 1].name, 0)
								: months().map((item, i) => renderFilesGroup(item.name, i))}
						</div>
					)}

                </div>

            </div>

            {mouseParams !== null && (
                <ContextMenu
                    params={mouseParams}
                    setParams={setMouseParams}
                    tooltip={true}
                >
                    <div className={styles.mainMenuItems}>
                        {renderMenuItems(contextMenuFile.main, callbackArrMain)}
                    </div>
                    <div className={styles.additionalMenuItems}>
                        {renderMenuItems(contextMenuFile.additional, additionalMenuItems)}
                    </div>
                </ContextMenu>
            )}

            {action.type === "delete" && (
                <ActionApproval
                    name={action.name}
                    text={action.text}
                    set={nullifyAction}
                    callback={() => {}}
                    approve={"Удалить"}
                >
                    <div className={styles.fileActionWrap}>
                        <File format={chosenFile?.ext} color={chosenFile?.color} />
                    </div>
                </ActionApproval>
            )}

            <BottomPanel />

        </div>
    )
}

export default Archive