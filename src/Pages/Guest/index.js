import React, {useEffect, useState} from 'react'

import styles from './Guest.module.sass'
import SearchField from "./SearchField";
import classNames from "classnames";
import ServePanel from "./ServePanel";

import ContextMenu from "../../generalComponents/ContextMenu";
import {contextMenuFile} from "../../generalComponents/collections";
import ActionApproval from "../../generalComponents/ActionApproval";
import File from "../../generalComponents/Files";
import ContextMenuItem from "../../generalComponents/ContextMenu/ContextMenuItem";
import CopyLink from "../Cabinet/Components/ContextMenuComponents/ContextMenuFile/CopyLink/CopyLink";
import {months} from "../../generalComponents/CalendarHelper";
import FilesGroup from "./WorkElements/FilesGroup/FilesGroup";
import {onGetGuestSharedFiles} from "../../Store/actions/PrivateCabinetActions";
import {useDispatch, useSelector} from "react-redux";

const Guest = () => {

    const dispatch = useDispatch()

    const fileList = useSelector((state) => state.PrivateCabinet.guestSharedFiles);

    const [filePick, setFilePick] = useState({show: false, files: [], customize: false});
    const [action, setAction] = useState({type: "", name: "", text: ""})
    const [mouseParams, setMouseParams] = useState(null)
    const [filePreview, setFilePreview] = useState(null)
    const [chosenFile, setChosenFile] = useState(null)

    const [workElementsView, setWorkElementsView] = useState('workLinesPreview')

    const [showLinkCopy, setShowLinkCopy] = useState(false);

    useEffect(() => {
        dispatch(onGetGuestSharedFiles());
    }, [dispatch]);

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


    const renderFilesGroup = (mounth, i) => {
        return (
            <FilesGroup
                key={i}
                index={i}
                fileList={fileList}
                filePreview={filePreview}
                setFilePreview={setFilePreview}
                callbackArrMain={callbackArrMain}
                chosenFile={chosenFile}
                setChosenFile={setChosenFile}
                filePick={filePick}
                setFilePick={setFilePick}
                mounthName={mounth}
                setAction={setAction}
                setMouseParams={setMouseParams}
            />
        );
    };

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

                <div className={styles.workSpaceWrap}>

                    <div className={styles.FilesList}>
                        {months().map((item, i) => renderFilesGroup(item.name, i))}
                    </div>

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