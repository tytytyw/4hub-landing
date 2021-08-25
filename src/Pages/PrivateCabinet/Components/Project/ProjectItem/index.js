import React, {useEffect, useState} from 'react'

import styles from './ProjectItem.module.sass'
import classNames from "classnames";
import {ReactComponent as PlayIcon} from '../../../../../assets/PrivateCabinet/play-grey.svg'
import CustomFolderItem from '../CustomFolderItem'
import {useDispatch, useSelector} from 'react-redux'
import {onGetProjectFolders} from '../../../../../Store/actions/PrivateCabinetActions'
import CustomItem from '../CustomItem'

const ProjectItem = ({
        project, listCollapsed, setMouseParams, size,
        chosenFolder, setChosenFolder
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
                listSize={size}
                folder={folder}
                chosenFolder={chosenFolder}
                setChosenFolder={setChosenFolder}
                setMouseParams={setMouseParams}
            />
        })
    }

    return (
        <div className={styles.parentWrap}>

            <div className={classNames({
                [styles.wrapper]: true,
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
                            <img src={`./assets/PrivateCabinet/project/${project.icon}.svg`} className={styles.projectIcon}/>
                            <div className={styles.nameWrap}>
                                <p className={styles.title}>{project.name}</p>
                                <div
                                    className={classNames({
                                        [styles.tagBlock]: true,
                                        [styles.ftag]: !!project?.tag
                                    })}
                                >
                                    {project?.tag && `#${project.tag}`}
                                </div>
                            </div>
                        </div>

                        <div className={styles.stickWrap}>

                            <div className={styles.symbolWrap}>
                                {project?.fig &&
                                <img
                                    className={styles.symbols}
                                    src={`./assets/PrivateCabinet/signs/${project.fig}.svg`}
                                    alt='emoji'
                                />}

                                {project?.emo &&
                                <img
                                    className={classNames(styles.symbols, styles.smiles)}
                                    src={`./assets/PrivateCabinet/smiles/${project.emo}.svg`}
                                    alt='emoji'
                                />}

                                {project?.symbol &&
                                <img
                                    className={styles.symbols}
                                    src={project.symbol}
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
                            setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 30, type: 'project'})
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
                        item={{
                            name: 'Мои задачи в проете',
                            img: './assets/PrivateCabinet/calendar.svg',
                        }}
                    />
                    <CustomItem
                        listSize={size}
                        item={{
                            name: 'Создать новую папку',
                            img: './assets/PrivateCabinet/folders/folder-grey.svg',
                            symbol: './assets/PrivateCabinet/folders/add.svg'
                        }}
                    />
                    {renderFolders()}
                </div>

            </div>

        </div>
    )
}

export default ProjectItem