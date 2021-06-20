import React, {useState} from 'react';

import styles from './WorkLinesPreview.module.sass';

import {ReactComponent as EditIcon} from '../../../../../../assets/PrivateCabinet/edit-fill.svg'
import {ReactComponent as DotsMenu} from '../../../../../../assets/PrivateCabinet/dots-menu.svg'
import {ReactComponent as InfoIcon} from '../../../../../../assets/PrivateCabinet/info.svg'
import InfoPopover from '../InfoPopover';
import classNames from 'classnames';
import Input from '../../../MyProfile/Input';
import MiniToolBar from "../MiniToolBar";

const WorkLinesPreview = ({recentFiles, children}) => {

    const [infoPopover, setInfoPopover] = useState(false)
    const [toolBar, setToolBar] = useState(false)

    return (
        <div
            className={styles.workLinesPreviewWrap}
            style={{
                height: `${recentFiles?.length > 0 ? 'calc(100% - 90px - 55px - 78px - 60px)' : 'calc(100% - 90px - 55px - 60px)'}`
            }}
        >

            <div className={styles.fileListWrap}>
                {children}
            </div>

            <div className={styles.previewFileWrap}>

                <div className={styles.previewHeader}>
                    <h4 className={styles.previewTitle}>Дизайн мото сайта</h4>
                    <div className={styles.actionBlock}>

                        <button
                            onClick={() => setToolBar(!toolBar)}
                            className={classNames({
                                [styles.actionBtn]: true,
                                [styles.activeBtn]: toolBar
                            })}
                        >
                            <EditIcon/>
                        </button>

                        <button
                            className={classNames({
                                [styles.actionBtn]: true,
                            })}
                        >
                            <DotsMenu/>
                        </button>

                        <button
                            onMouseEnter={() => setInfoPopover(true)}
                            onMouseLeave={() => setInfoPopover(false)}
                            className={classNames({
                                [styles.actionBtn]: true,
                                [styles.activeBtn]: infoPopover
                            })}
                        >
                            <InfoIcon/>
                        </button>

                    </div>
                </div>

                <div className={styles.previewContent}>

                    {infoPopover &&
                    <InfoPopover
                        set={setInfoPopover}
                    />}

                    {toolBar &&
                    <MiniToolBar
                        set={setToolBar}
                    />}

                    <div className={styles.previewImg}>
                        <img src='./assets/PrivateCabinet/Bitmap2.png' alt='Moto Site'/>
                    </div>

                    <div className={styles.commentBlock}>

                        <div className={styles.addCommentBlock}>
                            <img src='./assets/PrivateCabinet/avatars/a2.svg' alt='Comment Avatar'/>
                            <Input
                                placeholder='Комментировать'
                                className={styles.commentInput}
                            />
                        </div>

                        <div className={styles.commentContent}>

                            <div className={styles.commentItem}>
                                <img
                                    className={styles.commentAvatar}
                                    src='./assets/PrivateCabinet/avatars/a3.svg'
                                    alt='Comment Avatar'
                                />
                                <p className={styles.commentText}>
                                    Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
                                    время, программы электронной вёрстки типа
                                </p>
                            </div>

                            <div className={styles.commentItem}>
                                <img
                                    className={styles.commentAvatar}
                                    src='./assets/PrivateCabinet/avatars/a3.svg'
                                    alt='Comment Avatar'
                                />
                                <p className={styles.commentText}>
                                    Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
                                    время, программы электронной вёрстки типа
                                </p>
                            </div>

                            <div className={styles.commentItem}>
                                <img
                                    className={styles.commentAvatar}
                                    src='./assets/PrivateCabinet/avatars/a3.svg'
                                    alt='Comment Avatar'
                                />
                                <p className={styles.commentText}>
                                    Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
                                    время, программы электронной вёрстки типа
                                </p>
                            </div>

                            <div className={styles.commentItem}>
                                <img
                                    className={styles.commentAvatar}
                                    src='./assets/PrivateCabinet/avatars/a3.svg'
                                    alt='Comment Avatar'
                                />
                                <p className={styles.commentText}>
                                    Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее
                                    время, программы электронной вёрстки типа
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>)
}

export default WorkLinesPreview;