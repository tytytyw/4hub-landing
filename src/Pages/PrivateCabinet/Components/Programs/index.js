import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import shoppingIcon from '../../../../assets/PrivateCabinet/shopping-cart.svg'
import styles from './Programms.module.sass'
import List from '../List'
import WorkSpace from './WorkSpace'
import CreateFolder from '../CreateFolder'
import CreateFile from '../CreateFile'
import CustomFolderItem from './CustomFolderItem'
import CreateSafePassword from '../CreateSafePassword'
import PreviewFile from '../PreviewFile'
import ContextMenu from '../../../../generalComponents/ContextMenu'
import {contextMenuFolder, contextMenuSubFolder} from '../../../../generalComponents/collections'
import ContextMenuItem from '../../../../generalComponents/ContextMenu/ContextMenuItem'
import {
    onGetFolders,
    onGetPrograms,
    onGetRecentPrograms,
    onGetTopListPrograms
} from '../../../../Store/actions/programsAction'
import classNames from "classnames";

const Programs = ({
                      setItem, filePreview, setFilePreview, fileSelect,
                      fileAddCustomization, setFileAddCustomization,
                      setAwaitingFiles, awaitingFiles, loaded, setLoaded,
                      loadingFile, fileErrors
                  }) => {

    const dispatch = useDispatch()
    const folders = useSelector(state => state.programs.programFolders)
    const recentPrograms = useSelector(state => state.programs.recentPrograms)
    const [listCollapsed, setListCollapsed] = useState('')
    const [newFolder, setNewFolder] = useState(false)

    const [chosenFolder, setChosenFolder] = useState(1)
    const [chosenProgram, setChosenProgram] = useState()
    const [chosenRecent, setChosenRecent] = useState()
    const [chosenTopListProgram, setChosenTopListProgram] = useState()

    const [newFolderInfo, setNewFolderInfo] = useState({path: ''})
    const [safePassword, setSafePassword] = useState({open: false})
    const [mouseParams, setMouseParams] = useState(null)

    useEffect(() => {
        dispatch(onGetFolders())
        dispatch(onGetRecentPrograms())
        dispatch(onGetTopListPrograms())
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
                chosen={chosenFolder.path === folder.path}
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
                chosen={chosenFolder.path === folder.path}
                padding={'0px 10px 0px 26px'}
                setMouseParams={setMouseParams}
            />
        })
    }

    const onSafePassword = (boolean) => setSafePassword({...safePassword, open: boolean})

    const renderMenuItems = (target, type) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    }

    const callbackArrMain = [
        {
            type: 'delete',
            name: 'Удаление файла',
            text: `Вы действительно хотите удалить файл ${chosenProgram?.name}?`
        }
    ]

    return (
        <div className={styles.workAreaWrap}>
            <List
                programms={true}
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

                    <div
                        onClick={() => setChosenFolder('shop')}
                        className={classNames({
                            [styles.listItem]: true,
                            [styles.active]: chosenFolder === 'shop'
                        })}
                    >
                        <div className={styles.itemInfo}>
                            <img src={shoppingIcon} alt='Shop'/>
                            <p>Магазин</p>
                        </div>
                    </div>

                    {renderProgramFolders()}

                    <div className={styles.recentPrograms}>
                        <p>Недавние Программы</p>
                    </div>
                    {renderRecentPrograms()}
                </div>
            </List>

            <WorkSpace
                setBlob={() => {/*Need to modify*/}}
                blob={{/*Need to modify*/}}

                chosenFolder={chosenFolder}

                chosenProgram={chosenProgram}
                setChosenProgram={setChosenProgram}

                chosenTopListProgram={chosenTopListProgram}
                setChosenTopListProgram={setChosenTopListProgram}

                setSafePassword={setSafePassword}
                listCollapsed={listCollapsed}
                setItem={setItem}
                filePreview={filePreview}
                setFilePreview={setFilePreview}
                fileSelect={fileSelect}
            />

            {newFolder && <CreateFolder
                onCreate={setNewFolder}
                title='Новая папка'
                info={newFolderInfo}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
            />}

            {fileAddCustomization.show ? <CreateFile
                title='Добавление файла'
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
            /> : null}

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
                    {renderMenuItems(chosenFolder.subPath ? contextMenuSubFolder.main : contextMenuFolder.main, callbackArrMain)}
                </div>
            </ContextMenu>}
        </div>
    )
}

export default Programs
