import React, {useEffect, useState} from 'react'

import styles from './ProjectItem.module.sass'
import {ReactComponent as LampIcon} from '../../../../../assets/PrivateCabinet/project-icon.svg'
import classNames from "classnames";
import {ReactComponent as PlayIcon} from '../../../../../assets/PrivateCabinet/play-grey.svg'
import CustomFolderItem from '../CustomFolderItem'
import {useDispatch, useSelector} from 'react-redux'
import {onGetProjectFolders} from '../../../../../Store/actions/PrivateCabinetActions'
import CustomItem from '../CustomItem'
import ProjectContext from "../ProjectContext";
import {contextMenuProjects} from "../../../../../generalComponents/collections";

const ProjectItem = ({
        listSize, project, listCollapsed, setMouseParams,
        chosenFolder, setChosenFolder, contextMenu, setContextMenu
    }) => {

    const dispatch = useDispatch()
    const folders = useSelector(state => state.PrivateCabinet.projectFolders)
    const [collapse, setCollapse] = useState(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    //useEffect(() => setChosenFolder(null), [collapse])

    useEffect(() => {
        dispatch(onGetProjectFolders())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderFolders = () => {

        const projectFolders = folders.filter(item => item?.projectId === project.id)

        return projectFolders?.map((folder, index) => {
            return <CustomFolderItem
                key={index}
                listSize={listSize}
                folder={folder}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
                setMouseParams={setMouseParams}
            />
        })
    }

    return (
        <div className={styles.parentWrap}>

            <div className={styles.wrapper}>

                <div
                    className={classNames({
                        [styles.titleWrap]: true,
                        [styles.titleCollapsed]: !!listCollapsed,
                        [styles.titleWrapChosen]: !!collapse
                    })}
                >
                    <div
                        onClick={() => setCollapse(!collapse)}
                        className={styles.leftWrap}
                    >

                        <div className={styles.leftTitleWrap}>
                            <LampIcon/>
                            <p className={styles.title}>{project.name}</p>
                        </div>

                        <PlayIcon
                            className={classNames({
                                [styles.playButton]: true,
                                [styles.revert]: collapse
                            })}
                        />

                    </div>

                    <div
                        className={styles.menuWrap}
                        onClick={() => setContextMenu(project.id)}
                    >
                        <span className={styles.menu}/>
                    </div>

                </div>

                <div
                    className={classNames({
                        [styles.innerFolders]: true,
                        [styles.hidden]: !collapse
                    })}
                >
                    <CustomItem
                        badge={project?.tasks}
                        item={{
                            name: 'Мои задачи в проете',
                            img: './assets/PrivateCabinet/calendar.svg',
                        }}
                    />
                    <CustomItem
                        item={{
                            name: 'Создать новую папку',
                            img: './assets/PrivateCabinet/folders/folder-grey.svg',
                            symbol: './assets/PrivateCabinet/folders/add.svg'
                        }}
                    />
                    {renderFolders()}
                </div>

            </div>

            {contextMenu === project.id &&
            <ProjectContext
                set={setContextMenu}
                data={contextMenuProjects.main}
            />}

        </div>
    )
}

export default ProjectItem