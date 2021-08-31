import React, {useEffect, useState} from 'react'

import styles from './Guest.module.sass'
import SearchField from "./SearchField";
import classNames from "classnames";
import ServePanel from "./ServePanel";
import SideList from "./SideList";
import WorkLinesPreview from "../../../PrivateCabinet/Components/WorkElements/WorkLinesPreview";
import FileBar from "./WorkElements/FileBar";
import {useDispatch, useSelector} from "react-redux";
import {onChooseAllFiles} from "../../../../Store/actions/PrivateCabinetActions";

import filesList from './data.json'
import {ReactComponent as PlayIcon} from "../../../../assets/PrivateCabinet/play-grey.svg";
import FileLine from "../../../PrivateCabinet/Components/WorkElements/FileLine";
import ContextMenu from "../../../../generalComponents/ContextMenu";
import {contextMenuFile} from "../../../../generalComponents/collections";
import ActionApproval from "../../../../generalComponents/ActionApproval";
import File from "../../../../generalComponents/Files";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import CopyLink from "../../../PrivateCabinet/Components/ContextMenuComponents/ContextMenuFile/CopyLink/CopyLink";
import WorkBarsPreview from "./WorkElements/WorkBarsPreview";
import FileLineShort from "./WorkElements/FileLineShort";

const Guest = () => {

    const dispatch = useDispatch()

    const size = useSelector((state) => state.PrivateCabinet.size)
    const view = useSelector(state => state.PrivateCabinet.view);

    const [filePick] = useState({show: false, files: [], customize: false});
    const [action, setAction] = useState({type: "", name: "", text: ""})
    const [mouseParams, setMouseParams] = useState(null)
    const [filePreview, setFilePreview] = useState(null)
    const [chosenFile, setChosenFile] = useState(null)
    const [workElementsView, setWorkElementsView] = useState('workLinesPreview')

    const [showLinkCopy, setShowLinkCopy] = useState(false);
    const [collapse, setCollapse] = useState(true);
    const [gLoader, setGLoader] = useState(false);

    console.log(gLoader)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {dispatch(onChooseAllFiles('', 1, '', setGLoader));}, []);

    const renderFiles = (Type) => {
        if (!filesList) return null
        return filesList?.map((file, index) => (
            <Type
                key={index}
                file={file}
                filePick={filePick}
                setChosenFile={setChosenFile}
                chosenFile={chosenFile}
                setMouseParams={setMouseParams}
                setAction={setAction}
                filePreview={filePreview}
                setFilePreview={setFilePreview}
            />
        ))
    }

    const renderMenuItems = (target, type) => {
        return target.map((item, i) => {
            return (
                <ContextMenuItem
                    key={i}
                    width={mouseParams.width}
                    height={mouseParams.height}
                    text={item.name}
                    callback={() =>
                        type.forEach((el, index) => {
                            if (el.type === item.type) el.callback(type, index);
                        })
                    }
                    imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
                />
            );
        });
    };

    const callbackArrMain = [
        {
            type: "share",
            name: "",
            text: ``,
            callback: (list, index) => setAction(list[index]),
        },
        {
            type: "copyLink",
            name: "",
            text: ``,
            callback: () => setShowLinkCopy(true),
        },
        {
            type: "properties",
            name: "Свойства",
            text: ``,
            callback: () =>
                setAction({ ...action, type: "properties", name: "Свойства" }),
        },
        {
            type: "download",
            name: "Загрузка файла",
            text: ``,
            callback: () => document.downloadFile.submit(),
        },
    ];

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

            <ServePanel
                chosenFile={chosenFile}
                workElementsView={workElementsView}
                setWorkElementsView={setWorkElementsView}
            />

            <div className={styles.main}>

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

                <div className={styles.workSpaceWrap}>
                    {view === "bars" && (
                        <div className={classNames({
                            [styles.collapseContent]: true,
                            [styles?.[`collapseContent_${size}`]]: size !== 'meidum'
                        })}>
                            {collapse && renderFiles(FileBar)}
                        </div>
                    )}
                    {view === "lines" && (
                        <div className={styles.collapseContentLine}>
                            {renderFiles(FileLine, true)}
                        </div>
                    )}
                    {view === "preview" && (
                        <WorkBarsPreview
                            file={chosenFile}
                            filePick={filePick}
                        >
                            {renderFiles(FileBar)}
                        </WorkBarsPreview>
                    )}
                    {view === "workLinesPreview" && (
                        <div className={styles.workSpace}>
                            <SideList>
                                <div>{renderFiles(FileLineShort, true)}</div>
                            </SideList>
                            <div className={styles.filePreviewWrap}>
                                <WorkLinesPreview
                                    file={chosenFile}
                                    hideFileList={true}
                                    filePick={filePick}
                                />
                            </div>
                        </div>
                    )}
                </div>

            </div>


            {mouseParams !== null && (
                <ContextMenu
                    params={mouseParams}
                    setParams={setMouseParams}
                    tooltip={true}
                >
                    <div className={styles.mainMenuItems}>
                        {renderMenuItems(contextMenuFile.main, callbackArrMain)}
                    </div>
                </ContextMenu>
            )}
            {action.type === "delete" ? (
                <ActionApproval
                    name={filePick.show ? "Удаление файлов" : action.name}
                    text={
                        filePick.show
                            ? "Вы действительно хотите удалить выбранные файлы?"
                            : action.text
                    }
                    set={() => {}}
                    callback={() => {}}
                    approve={"Удалить"}
                >
                    <div className={styles.fileActionWrap}>
                        <File
                            format={filePick.show ? "FILES" : chosenFile?.ext}
                            color={chosenFile?.color}
                        />
                    </div>
                </ActionApproval>
            ) : null}

            {showLinkCopy && (
                <CopyLink fid={chosenFile?.fid} setShowLinkCopy={setShowLinkCopy} />
            )}

        </div>
    )
}

export default Guest