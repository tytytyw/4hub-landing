import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import styles from './Programms.module.sass'
import List from '../List'
import WorkSpace from './WorkSpace'
import WorkSpaceShop from './WorkSpace/WorkSpaceShop'
import CreateFolder from '../CreateFolder'
import CreateFile from '../CreateFile'
import CustomFolderItem from './CustomFolderItem'
import CreateSafePassword from '../CreateSafePassword'
import PreviewFile from '../PreviewFile'
import ContextMenu from '../../../../generalComponents/ContextMenu'
import {
    contextProgram,
    contextProgramFolder
} from '../../../../generalComponents/collections'
import ContextMenuItem from '../../../../generalComponents/ContextMenu/ContextMenuItem'
import {
    onGetCategories,
    onGetPrograms,
    onGetRecentPrograms,
    onGetTopListPrograms,
    onGetProgramFolders
} from '../../../../Store/actions/PrivateCabinetActions'
import Shops from './Shops'

const Programs = ({
                      setItem, filePreview, setFilePreview, fileSelect,
                      fileAddCustomization, setFileAddCustomization,
                      setAwaitingFiles, awaitingFiles, loaded, setLoaded,
                      loadingFile, fileErrors
                  }) => {

    const dispatch = useDispatch()
    const folders = useSelector(state => state.PrivateCabinet.programFolders)
    const size = useSelector(state => state.PrivateCabinet.size)
    const recentPrograms = useSelector(state => state.PrivateCabinet.recentPrograms)

    const [listCollapsed, setListCollapsed] = useState('')
    const [newFolder, setNewFolder] = useState(false)

    const [collapseShop, setCollapseShop] = useState(false)

    const [chosenShop, setChosenShop] = useState(null)
    const [chosenFolder, setChosenFolder] = useState(null)
    const [chosenProgram, setChosenProgram] = useState()
    const [chosenRecent, setChosenRecent] = useState()
    const [chosenTopListItem, setChosenTopListItem] = useState()

    const [newFolderInfo, setNewFolderInfo] = useState({path: ''})
    const [safePassword, setSafePassword] = useState({open: false})
    const [mouseParams, setMouseParams] = useState(null)

    useEffect(() => {
        dispatch(onGetProgramFolders())
        dispatch(onGetRecentPrograms())
        dispatch(onGetTopListPrograms())
        dispatch(onGetCategories())
        dispatch(onGetPrograms(chosenFolder?.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderProgramFolders = () => {

        if (!folders) return null;
        return folders.map((folder, i) => {
            return <CustomFolderItem
                key={i + folder.name}
                folder={folder}
                listCollapsed={listCollapsed}
                setNewFolderInfo={setNewFolderInfo}
                newFolderInfo={newFolderInfo}
                setNewFolder={setNewFolder}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
                chosen={chosenFolder?.path === folder.path}
                padding={'0px 10px 0px 26px'}
                setMouseParams={setMouseParams}
            />
        })
    }

    const renderRecentPrograms = () => {

        if (!recentPrograms) return null;
        return recentPrograms.map((folder, i) => {
            return <CustomFolderItem
                key={i + folder.name}
                folder={folder}
                listCollapsed={listCollapsed}
                setNewFolderInfo={setNewFolderInfo}
                newFolderInfo={newFolderInfo}
                setNewFolder={setNewFolder}
                chosenFolder={chosenRecent}
                setChosenFolder={setChosenRecent}
                chosen={chosenFolder?.path === folder.path}
                padding={'0px 10px 0px 26px'}
                setMouseParams={setMouseParams}
            />
        })
    }

    const onSafePassword = (boolean) => setSafePassword({...safePassword, open: boolean})

    const callbackArrMain = [
        {
            type: 'delete',
            name: 'Удаление файла',
            text: `Вы действительно хотите удалить файл ${chosenProgram?.name}?`,
            callback: () => {}
        }
    ]

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

    return (
        <div className={styles.workAreaWrap}>
            <List
                icon={false}
                title='Программы'
                src='add-folder.svg'
                setListCollapsed={setListCollapsed}
                listCollapsed={listCollapsed}
                onCreate={(boolean) => {
                    setNewFolder(boolean);
                    setNewFolderInfo({...newFolderInfo, path: ''})
                }}
            >
                <div className={styles.folderListWrap}>

                    <Shops
                        chosenShop={chosenShop}
                        setChosenShop={setChosenShop}
                        collapseShop={collapseShop}
                        setCollapseShop={setCollapseShop}
                        listSize={size}
                    />

                    <div className={styles.createFolderWrap}>
                        <p>Создать новую папку</p>
                        <div className={styles.createFolderImg}>
                            <img
                                src="./assets/PrivateCabinet/add-folder.svg"
                                alt="Create Folder"
                            />
                        </div>
                    </div>

                    {renderProgramFolders()}

                    <div className={styles.recentPrograms}>
                        <p>Недавние Программы</p>
                    </div>
                    {renderRecentPrograms()}
                </div>
            </List>

            {chosenFolder === 'shop' ?
                <WorkSpaceShop
                    setBlob={() => {/*Need to modify*/}}
                    blob={{/*Need to modify*/}}

                    chosenFolder={chosenFolder}

                    chosenProgram={chosenProgram}
                    setChosenProgram={setChosenProgram}

                    chosenCategory={chosenTopListItem}
                    setChosenCategory={setChosenTopListItem}

                    setSafePassword={setSafePassword}
                    listCollapsed={listCollapsed}
                    setItem={setItem}
                    filePreview={filePreview}
                    setFilePreview={setFilePreview}
                    fileSelect={fileSelect}
                /> :
                <WorkSpace
                    setBlob={() => {/*Need to modify*/}}
                    blob={{/*Need to modify*/}}

                    chosenFolder={chosenFolder}

                    chosenProgram={chosenProgram}
                    setChosenProgram={setChosenProgram}

                    chosenTopListProgram={chosenTopListItem}
                    setChosenTopListProgram={setChosenTopListItem}

                    mouseParams={mouseParams}
                    setMouseParams={setMouseParams}

                    setSafePassword={setSafePassword}
                    listCollapsed={listCollapsed}
                    setItem={setItem}
                    filePreview={filePreview}
                    setFilePreview={setFilePreview}
                    fileSelect={fileSelect}
                />}

            {newFolder && <CreateFolder
                onCreate={setNewFolder}
                title='Новая папка'
                info={newFolderInfo}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
            />}

            {fileAddCustomization.show && <CreateFile
                title='Добавить файл'
                info={chosenFolder}
                blob={fileAddCustomization.file}
                setBlob={setFileAddCustomization}
                onToggleSafePassword={onSafePassword}
                awaitingFiles={awaitingFiles}
                setAwaitingFiles={setAwaitingFiles}
                loaded={loaded}
                setLoaded={setLoaded}
                loadingFile={loadingFile}
                fileErrors={fileErrors}
            />}

            {safePassword.open && <CreateSafePassword
                onToggle={onSafePassword}
                title='Создайте пароль для сейфа'
            />}

            {filePreview?.view &&
                <PreviewFile
                    setFilePreview={setFilePreview}
                    file={filePreview?.file}
                    filePreview={filePreview}
                />}

            {mouseParams !== null &&
            <ContextMenu
                params={mouseParams}
                setParams={setMouseParams}
                tooltip={true}
            >
                <div
                    className={styles.mainMenuItems}
                >
                    {renderMenuItems(mouseParams.type === 'program' ?
                        contextProgram.main :
                        contextProgramFolder.main,
                        callbackArrMain)}
                </div>
                <div>
                    {renderMenuItems(mouseParams.type === 'program' ?
                        contextProgram.additional :
                        contextProgramFolder.additional,
                        callbackArrMain)}
                </div>
            </ContextMenu>}
        </div>
    )
}

export default Programs
