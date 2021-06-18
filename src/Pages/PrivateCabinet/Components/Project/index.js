import React, {useState} from 'react'

import styles from './Project.module.sass'
import List from './List'
import WorkSpace from './WorkSpace'

const Project = () => {

    const [newFolder, setNewFolder] = useState(false)

    const [projects, setProjects] = useState([])

    return (
        <div className={styles.wrapper}>

            <List
                title='Создать проект '
                src='add_project.svg'
                className={styles.listWrap}
            >

                <div className={styles.folderWrap}>

                    {projects?.length < 1 ?
                        <div className={styles.emptyBlock}>
                            <img
                                className={styles.emptyImg}
                                src="./assets/PrivateCabinet/create_arrow.svg"
                                alt="Create Arrow"
                            />
                            <h4 className={styles.emptyTitle}>СОЗДАЙТЕ Ваш первый проект</h4>
                        </div> :
                        <div>

                        </div>}

                </div>

            </List>

            <WorkSpace

            />
            {/*{newFolder && <CreateFolder
                onCreate={setNewFolder}
                title='Новая папка'
                info={newFolderInfo}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
            />}*/}
            {/*{fileAddCustomization.show ? <CreateFile
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
                setLoadingFile={setLoadingFile}
            /> : null}
            {safePassword.open && <CreateSafePassword
                onToggle={onSafePassword}
                title='Создайте пароль для сейфа'
            />}
            {filePreview?.view ? <PreviewFile setFilePreview={setFilePreview} file={filePreview?.file} filePreview={filePreview} /> : null}
            {mouseParams !== null ? <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
                <div className={styles.mainMenuItems}>{renderMenuItems(chosenFolder.subPath ? contextMenuSubFolder.main : contextMenuFolder.main, callbackArrMain)}</div>
            </ContextMenu> : null}*/}
        </div>
    )
}

export default Project
