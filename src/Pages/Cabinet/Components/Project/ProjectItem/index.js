import React, {useEffect, useRef, useState} from 'react'

import styles from './ProjectItem.module.sass'
import classNames from "classnames";
import {ReactComponent as PlayIcon} from '../../../../../assets/PrivateCabinet/play-grey.svg'
import CustomFolderItem from '../CustomFolderItem'
import {useDispatch, useSelector} from 'react-redux'
import {onGetProjectFolders} from '../../../../../Store/actions/CabinetActions'
import CustomItem from '../CustomItem'
import {imageSrc} from '../../../../../generalComponents/globalVariables';
import {getIcon} from "../helpers";

const ProjectItem = ({
        project, listCollapsed, setMouseParams, size,
        chosenFolder, setChosenFolder, setSelectedProject, chosen,
        setNewFolder, params, setParams, listRef
    }) => {

    const dispatch = useDispatch()
    const folders = useSelector(state => state.Cabinet.project.projectFolders)
    const [collapse, setCollapse] = useState(false)
    const projectRef = useRef(null)


    useEffect(() => {
        dispatch(onGetProjectFolders(project.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if(params.fromRecent) {
            if(chosen) {
                setCollapse(true)
                listRef.current.scrollTo({
                    top: projectRef.current.offsetTop,
                    behavior: 'smooth'
                })
            } else {
                setCollapse(false)
            }
            setSelectedProject(project)
            setParams(state => ({...state, fromRecent: false}))
        }
    }, [params.fromRecent]) //eslint-disable-line

    const renderFolders = () => {
        const projectFolders = folders[project.id];
        return projectFolders?.map((folder, index) => {
            return <CustomFolderItem
                key={index}
                listSize={size}
                folder={folder}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
                setMouseParams={setMouseParams}
                project={project}
            />
        })
    }

    return (
        <div
            onClick={() => setSelectedProject(project)}
            className={styles.parentWrap}
            ref={projectRef}
        >

            <div className={classNames({
                [styles.wrapper]: true,
                [styles.wrapperChosen]: !!chosen,
                [styles?.[`wrapper_${size}`]]: !!size,
            })}>

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
                            {getIcon(project)}
                            <div className={styles.nameWrap}>
                                <p className={styles.title}>{project.name}</p>
                                <div
                                    className={classNames({
                                        [styles.tagBlock]: true,
                                        [styles.ftag]: !!project?.tags
                                    })}
                                >
                                    {project?.tags && `#${project.tags}`}
                                </div>
                            </div>
                        </div>

                        <div className={styles.stickWrap}>

                            <div className={styles.symbolWrap}>
                                {project?.id_fig &&
                                <img
                                    className={styles.symbols}
                                    src={`${imageSrc}/assets/PrivateCabinet/signs/${project.id_fig}.svg`}
                                    alt='emoji'
                                />}

                                {project?.id_emo &&
                                <img
                                    className={classNames(styles.symbols, styles.smiles)}
                                    src={`${imageSrc}/assets/PrivateCabinet/smiles/${project.id_emo}.svg`}
                                    alt='emoji'
                                />}

                            </div>

                            <PlayIcon
                                className={classNames({
                                    [styles.playButton]: true,
                                    [styles.revert]: collapse
                                })}
                            />
                        </div>

                    </div>

                    <div
                        className={styles.menuWrap}
                        onClick={e => {
                            e.preventDefault()
                            setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 25, type: 'project'})
                        }}
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
                        listSize={size}
                        badge={project?.tasks}
                        onClick={() => {}}
                        item={{
                            name: 'Создать лист',
                            img: `${imageSrc}assets/PrivateCabinet/documentGrey.svg`,
                            symbol: `${imageSrc}/assets/PrivateCabinet/folders/add.svg`
                        }}
                    />
                    <CustomItem
                        listSize={size}
                        onClick={() => setNewFolder(true)}
                        item={{
                            name: 'Создать новую папку',
                            img: `${imageSrc}/assets/PrivateCabinet/folders/folder-grey.svg`,
                            symbol: `${imageSrc}/assets/PrivateCabinet/folders/add.svg`
                        }}
                    />
                    {renderFolders()}
                </div>

            </div>

        </div>
    )
}

export default ProjectItem