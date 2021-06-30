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

const Project = () => {

    const dispatch = useDispatch()
    const projects = useSelector(state => state.PrivateCabinet.projects)
    const size = useSelector(state => state.PrivateCabinet.size)
    const [chosenFolder, setChosenFolder] = useState(null)
    const [mouseParams, setMouseParams] = useState(null)
    const [contextMenu, setContextMenu] = useState(null)
    const [createProject, setCreateProject] = useState(false)

    useEffect(() => {
        dispatch(onGetProjects())
        dispatch(onGetContacts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    const renderProjectMenuItems = (target) => {
        return target.map((item, i) => {
            return <ProjectContextItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
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

            <WorkSpace setMouseParams={setMouseParams}/>

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
                    {renderProjectMenuItems(contextMenuProjects.main)}
                </div>
            </ContextMenu>}

            {createProject &&
            <CreateProject
                title='Создание проекта'
                onCreate={setCreateProject}
            />}

        </div>
    )
}

export default Project
