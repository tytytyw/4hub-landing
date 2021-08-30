import React, {useEffect, useState} from 'react'

import styles from './Project.module.sass'
import List from './List'
import WorkSpace from './WorkSpace'
import ProjectItem from './ProjectItem'
import {useDispatch, useSelector} from 'react-redux'
import {onGetContacts, onGetProjects} from '../../../../Store/actions/PrivateCabinetActions'
import ContextMenuItem from '../../../../generalComponents/ContextMenu/ContextMenuItem'
import ContextMenu from '../../../../generalComponents/ContextMenu'
import {contextMenuProjects, contextMenuSubFolder} from '../../../../generalComponents/collections'
import CreateProject from './CreateProject'
import ProjectContextItem from "./ProjectContextItem";
import CreateFolder from '../ContextMenuComponents/ContextMenuProject/CreateFolder';
import CopyLinkProject from '../ContextMenuComponents/ContextMenuProject/CopyLinkProject';
import SuccessMessage from '../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage';


const Project = () => {

    const dispatch = useDispatch()
    const projects = useSelector(state => state.PrivateCabinet.projects)
    const size = useSelector(state => state.PrivateCabinet.size)
    const [chosenFolder, setChosenFolder] = useState(null)
    const [mouseParams, setMouseParams] = useState(null)
    const [contextMenu, setContextMenu] = useState(null)
    const [createProject, setCreateProject] = useState(false)
    const [addMember, setAddMember] = useState(false)
    const [newFolder, setNewFolder] = useState(false);

    const [action, setAction] = useState({type: '', name: '', text: ''});
    const nullifyAction = () => setAction({type: '', name: '', text: ''});
    const [selectedProject, setSelectedProject] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        dispatch(onGetProjects())
        dispatch(onGetContacts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const callbackArrMain = [
        {type: 'addMember', name: 'Добавить участника', text: ``, callback: () => setAddMember(true)},
        {type: 'addFolder', name: 'Добавить папку', text: ``, callback: () => setNewFolder(true)},
        {type: 'copyLink', name: 'Скопировать ссылку', text: ``, callback: (list, index) => setAction(list[index])},
        ];

    const renderMenuItems = (target) => {
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

    const renderProjectMenuItems = (target, type) => {
        return target.map((item, i) => {
            return <ProjectContextItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={() => type.forEach((el, index) => {if(el.type === item.type) el.callback(type, index)})}
                imageSrc={`./assets/PrivateCabinet/contextMenuProject/${item.img}.svg`}
            />
        })
    }

    const renderProjects = () => {
        return projects?.map((project, index) => (
            <ProjectItem
                size={size}
                key={index}
                project={project}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
                setMouseParams={setMouseParams}
                contextMenu={contextMenu}
                setContextMenu={setContextMenu}
                setSelectedProject={setSelectedProject}
            />
        ))
    }

    return (
        <div className={styles.workAreaWrap}>
            <List
                title='Создать проект'
                src='add_project.svg'
                className={styles.listWrap}
                onCreate={setCreateProject}
            >
                {projects?.length < 1 ?
                    <div className={styles.emptyBlock}>
                        <img
                            className={styles.emptyImg}
                            src="./assets/PrivateCabinet/create_arrow.svg"
                            alt="Create Arrow"
                        />
                        <h4 className={styles.emptyTitle}>СОЗДАЙТЕ Ваш первый проект</h4>
                    </div> :
                    <div className={styles.folderWrap}>
                        {renderProjects()}
                    </div>}
            </List>

            <WorkSpace setMouseParams={setMouseParams} addMember={addMember} setAddMember={setAddMember} />

            {mouseParams?.type === 'menu' &&
            <ContextMenu
                params={mouseParams}
                setParams={setMouseParams}
                tooltip={true}
            >
                <div className={styles.mainMenuItems}>
                    {renderMenuItems(contextMenuSubFolder.main)}
                </div>
            </ContextMenu>}

            {mouseParams?.type === 'project' &&
            <ContextMenu
                params={mouseParams}
                setParams={setMouseParams}
                tooltip={true}
            >
                <div className={styles.mainMenuItems}>
                    {renderProjectMenuItems(contextMenuProjects.main, callbackArrMain)}
                </div>
            </ContextMenu>}

            {showSuccessMessage && <SuccessMessage showSuccessMessage={showSuccessMessage} setShowSuccessMessage={setShowSuccessMessage} />}

            {createProject &&
            <CreateProject
                title='Создание проекта'
                onCreate={setCreateProject}
            />}
            {newFolder && <CreateFolder
                onCreate={setNewFolder}
                title='Новая папка'
            />}
            {action.type === 'copyLink' ? <CopyLinkProject
                nullifyAction={nullifyAction}
                setShowSuccessMessage={setShowSuccessMessage}
                // setLoadingType={setLoadingType}
            /> : null}

        </div>
    )
}

export default Project
