import React, {useEffect, useState} from 'react'

import styles from './Guest.module.sass'
import SearchField from "./SearchField";
import classNames from "classnames";
import ServePanel from "./ServePanel";
import SideList from "../../../PrivateCabinet/Components/SharedFiles/SideList";
import {months} from "../../../../generalComponents/CalendarHelper";
import WorkLinesPreview from "../../../PrivateCabinet/Components/WorkElements/WorkLinesPreview";
import FileBar from "./WorkElements/FileBar";
import {useDispatch, useSelector} from "react-redux";
import {onChooseAllFiles} from "../../../../Store/actions/PrivateCabinetActions";

import filesList from './data.json'
import {ReactComponent as PlayIcon} from "../../../../assets/PrivateCabinet/play-grey.svg";

const Guest = () => {

    const dispatch = useDispatch()

    const size = useSelector((state) => state.PrivateCabinet.size)
    const view = useSelector(state => state.PrivateCabinet.view);

    const [filePick, setFilePick] = useState(null)
    const [action, setAction] = useState({type: "", name: "", text: ""})
    const [mouseParams, setMouseParams] = useState(null)
    const [filePreview, setFilePreview] = useState(null)
    const [chosenFile, setChosenFile] = useState(null)
    const [workElementsView, setWorkElementsView] = useState('workLinesPreview')

    const [collapse, setCollapse] = useState(true);
    const [gLoader, setGLoader] = useState(false);

    useEffect(() => {dispatch(onChooseAllFiles('', 1, '', setGLoader));}, []);

    const renderFiles = (Type) => {
        if (!filesList) return null
        return filesList?.map((file, index) => (
            <Type
                key={index}
                file={file}
                setChosenFile={setChosenFile}
                chosenFile={chosenFile}
                setMouseParams={setMouseParams}
                setAction={setAction}
                filePreview={filePreview}
                setFilePreview={setFilePreview}
            />
        ))
    }

    return (
        <div className={styles.wrapper}>

            <div className={styles.header}>

                <div className={styles.logoWrap}>
                    <div className={styles.logo}>
                        <img className={styles.hubIcon} src={`./assets/PrivateCabinet/4Hub-min.svg`} alt='4HUB' />
                        <p>4Hub</p>
                    </div>
                </div>

                <div className={styles.navbar}>

                    <SearchField/>
                    <div className={styles.authActionBlock}>
                        <button className={styles.authBtn}>Вход</button>
                        <button className={classNames(styles.authBtn, styles.authBtnReg)}>Регистрация</button>
                    </div>

                </div>

            </div>

            <div className={styles.main}>

                <ServePanel
                    chosenFile={chosenFile}
                    workElementsView={workElementsView}
                    setWorkElementsView={setWorkElementsView}
                />

                <div className={styles.topBlock}>
                    <img src="./assets/PrivateCabinet/folder-5.svg" alt="Folder"/>
                    <p>Дизайн файлообменика</p>
                </div>

                <div
                    onClick={() => setCollapse(!collapse)}
                    className={styles.collapseHeader}
                >
                    <p className={styles.dateName}>Август</p>
                    <button className={styles.collapseBtn}>
                        2 объектов
                    </button>
                    <div
                        className={classNames({
                            [styles.arrowFile]: true,
                            [styles.active]: !!collapse
                        })}
                    >
                        <PlayIcon
                            className={classNames({
                                [styles.playButton]: true,
                                [styles.revert]: !!collapse
                            })}
                        />
                    </div>
                </div>

                <div className={styles.workSpace}>
                    {view === "bars" && (
                        <div className={classNames({
                            [styles.collapseContent]: true,
                            [styles?.[`collapseContent_${size}`]]: size !== 'meidum'
                        })}>
                            {collapse && renderFiles(FileBar)}
                        </div>
                    )}
                    {view === "lines" && (
                        <div className={classNames({
                            [styles.collapseContent]: true,
                            [styles?.[`collapseContent_${size}`]]: size !== 'meidum'
                        })}>

                        </div>
                    )}
                </div>

            </div>

        </div>
    )
}

export default Guest