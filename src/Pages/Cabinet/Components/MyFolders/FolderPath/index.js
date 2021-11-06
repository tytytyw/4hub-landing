import React from "react"

import styles from "./FolderPath.module.sass"
import {folders} from "../../../../../generalComponents/collections";
import {useDispatch, useSelector} from "react-redux";
import {onChooseFiles, onChooseFolder, onSetPath} from "../../../../../Store/actions/CabinetActions";

const FolderPath = ({width, setFilesPage, setGLoader, setChosenFolder}) => {

    const path = useSelector(state => state.Cabinet.fileList?.path)
    const folderList = useSelector(state => state.Cabinet?.folderList)
    const globalFolders = useSelector(state => state.Cabinet?.global)
    const otherFolders = useSelector(state => state.Cabinet?.other?.folders)
    const dispatch = useDispatch()

    const filterEl = (el) => {
        for(let folder of folders) {
            if(el === folder.name) return folder.nameRu
        }
        return el;
    }

    const chooseFolder = (i) => {
        const newPath = path.split("/").slice(0, i + 1).join("/");
        if(newPath !== path) {
            if(newPath.split("/").length === 2 && newPath === folderList?.path) {
                dispatch(onChooseFolder(folderList?.folders, newPath));
                dispatch(onSetPath(newPath));
                const folder = [...globalFolders, ...otherFolders].filter(f => f.path === newPath)
                setChosenFolder(state => ({...state, path: newPath, open: false, subPath: '', info: folder[0] ?? null}))
            }
            setGLoader(true)
            dispatch(onChooseFiles(newPath, '', 1, '', setGLoader))
            setFilesPage(1)
        }
    }

    const renderPath = () => (
        path.split("/").map((el, i) => (
            <div
                className={`${styles.pathEl} ${i === 0 && (el === "global" || el === "others") ? styles.hide : ''}`}
                key={i}
            >
                {i !== 1 ? <span className={styles.arrowNext}>&gt;</span> : null}
                <div
                    className={styles.pathEl}
                    onClick={() => chooseFolder(i)}
                >{ i === 1 ? filterEl(el) : el}</div>
            </div>
        ))
    )

    return(
        <>
            {path ? <div style={{width}} className={styles.pathWrap}>{renderPath()}</div> : null}
        </>
    )
}

export default FolderPath