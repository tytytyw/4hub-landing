import React, {useEffect, useState} from 'react'

import styles from './Project.module.sass'
import List from './List'
import WorkSpace from './WorkSpace'
import ProjectItem from './ProjectItem'
import {useDispatch, useSelector} from 'react-redux'
import {onGetProjects} from '../../../../Store/actions/PrivateCabinetActions'
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import ContextMenu from "../../../../generalComponents/ContextMenu";
import {contextMenuSubFolder} from "../../../../generalComponents/collections";

const Project = () => {

    const dispatch = useDispatch()
    const projects = useSelector(state => state.PrivateCabinet.projects)
    const [chosenFolder, setChosenFolder] = useState(null)
    const [mouseParams, setMouseParams] = useState(null)
    const [contextMenu, setContextMenu] = useState(null)

    useEffect(() => {
        dispatch(onGetProjects())
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

    const renderProjects = () => {
        return projects?.map((project, index) => (
            <ProjectItem
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

            <WorkSpace
                setMouseParams={setMouseParams}
            />

            {mouseParams !== null &&
            <ContextMenu
                params={mouseParams}
                setParams={setMouseParams}
                tooltip={true}
            >
                <div
                    className={styles.mainMenuItems}
                >
                    {renderMenuItems(contextMenuSubFolder.main)}
                </div>
            </ContextMenu>}

        </div>
    )
}

export default Project
