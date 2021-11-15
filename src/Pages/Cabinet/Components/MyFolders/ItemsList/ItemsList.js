import React, {useEffect, useState} from "react"

import styles from "./ItemsList.module.sass"
import WorkBars from "../../WorkElements/WorkBars";
import FileBar from "../../WorkElements/FileBar";
import {renderHeight} from "../../../../../generalComponents/generalHelpers";
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import WorkLines from "../../WorkElements/WorkLines";
import FileLine from "../../WorkElements/FileLine";
import WorkBarsPreview from "../../WorkElements/WorkBarsPreview";
import WorkLinesPreview from "../../WorkElements/WorkLinesPreview";
import FileLineShort from "../../WorkElements/FileLineShort";
import {useDispatch, useSelector} from "react-redux";
import {
    onChooseFiles,
    onChooseFolder,
    onSetNextFilesToPrevious,
    onSetPath
} from "../../../../../Store/actions/CabinetActions";
import {useScrollElementOnScreen} from "../../../../../generalComponents/Hooks";
import FilesGroup from "../../WorkElements/FilesGroup/FilesGroup";
import {periods} from "../../../../../generalComponents/collections";

const ItemsList = ({
       setGLoader, setFilesPage, setChosenFolder, setChosenFile, filePick, setMouseParams,
       setAction, setFilePreview, filePreview, setFilePick, callbackArrMain, chosenFile, fileLoading,
       fileSelect, filesPage, chosenFolder, gLoader, fileRef, width
}) => {

    // const uid = useSelector(state => state?.user.uid);
    const fileList = useSelector(state => state.Cabinet.fileList);
    const folderList = useSelector(state => state.Cabinet.folderList);
    const recentFiles = useSelector(state => state.Cabinet.recentFiles);
    const workElementsView = useSelector(state => state.Cabinet.view);
    const dispatch = useDispatch();

    const folderSelect = (folder) => {
        const path = fileList.path + `/${folder.name}` //TODO - need to be folder.path
        setGLoader(true)
        dispatch(onChooseFiles(path, '', 1, '', setGLoader))
        setFilesPage(1)
        if(path.split("/").length === 3) {
            dispatch(onChooseFolder(folderList?.folders, path));
            dispatch(onSetPath(path));
            setChosenFolder(state => ({...state, open: true, subPath: path}))
        }
    }

    //To render FilePath properly after fileNext is destroyed
    const chooseItemNext = (item) => {
        const f = {...item};
        f.is_dir
            ? dispatch(onSetNextFilesToPrevious(f.path, true))
            : dispatch(onSetNextFilesToPrevious(f.gdir, false))
    }

    // Types of Files view
    const renderFiles = (Type, files, params) => {
        if(!files) return null;
        return files.map((file, i) => {
            return <Type
                key={i}
                file={file}
                setChosenFile={setChosenFile}
                chosen={filePick.show ? filePick.files.findIndex(el => el === file.fid) >= 0 : chosenFile?.fid === file?.fid}
                setMouseParams={setMouseParams}
                setAction={setAction}
                setFilePreview={setFilePreview}
                filePreview={filePreview}
                filePick={filePick}
                setFilePick={setFilePick}
                callbackArrMain={callbackArrMain}
                folderSelect={folderSelect}
                setGLoader={setGLoader}
                params={params}
                chooseItemNext={chooseItemNext}
            />
        });
    }

    const renderGroups = (Type, list, params) => {
        if(!list) return null;
        const keys = Object.keys(list);
        return keys.map((k, i) => (
            list[k].length > 0 ? <FilesGroup
                key={i}
                index={i}
                fileList={list[k]}
                filePreview={filePreview}
                setFilePreview={setFilePreview}
                callbackArrMain={callbackArrMain}
                chosenFile={chosenFile}
                setChosenFile={setChosenFile}
                filePick={filePick}
                setFilePick={setFilePick}
                title={periods[k] ?? "Более года назад"}
                setAction={setAction}
                setMouseParams={setMouseParams}
                //WorkBars
                fileLoading={fileLoading}
                fileSelect={fileSelect}
                filesPage={filesPage}
                setFilesPage={setFilesPage}
                chosenFolder={chosenFolder}
                gLoader={gLoader}
                renderFiles={renderFiles}
                //WorkLinesPreview
                params={params}
                //WorkBarsPreview
                setChosenFolder={setChosenFolder}
            /> : null
        ))
    }

    const [loadingFiles, setLoadingFiles] = useState(false);
    const search = useSelector(state => state.Cabinet.search);

    useEffect(() => {
        setLoadingFiles(false);
    }, [fileList?.path])

    const onSuccessLoading = (result) => {
        if(typeof result === 'number') {
            setTimeout(() => {
                result > 0 ? setFilesPage(filesPage => filesPage + 1) : setFilesPage(0);
                setLoadingFiles(false);
            }, 50) // 50ms needed to prevent recursion of ls_json requests
        } else if(typeof result === 'object') {
            let moreElements = false;
            for(let key in result) {
                if(result[key].length > 0) moreElements = true;
            }
            setTimeout(() => {
                moreElements ? setFilesPage(filesPage => filesPage + 1) : setFilesPage(0);
                setLoadingFiles(false);
            }, 500)
        } else {
            setTimeout(() => {setFilesPage(0); setLoadingFiles(false)}, 500);
        }
    }

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0
    }

    const load = (entry) => {
        if(!gLoader) {
            if(entry.isIntersecting && !loadingFiles && filesPage !== 0 && window.location.pathname === '/folders'){
                setLoadingFiles(true);
                dispatch(onChooseFiles(fileList?.path, search, filesPage, onSuccessLoading, ''));
            }
            if(entry.isIntersecting && !loadingFiles && filesPage !== 0 && window.location.pathname.includes('files')){
                setLoadingFiles(true);
                // dispatch(onChooseAllFiles(fileListAll?.path, search, filesPage, onSuccessLoading, ''));
            }
        }
    }

    const [scrollRef] = useScrollElementOnScreen(options, load);

    return(
        <>
            {workElementsView === 'bars' && Array.isArray(fileList?.files) ?
                <WorkBars
                    fileLoading={fileLoading}
                    fileSelect={fileSelect}
                    filePick={filePick}
                    filesPage={filesPage}
                    setFilesPage={setFilesPage}
                    fileRef={fileRef}
                    chosenFolder={chosenFolder}
                    gLoader={gLoader}
                    hideUploadFile={fileList === null}
                    load={load}
                    options={options}
                >{renderFiles(FileBar, fileList?.files)}</WorkBars>
                : null}

            {!Array.isArray(fileList?.files) && workElementsView !== 'workLinesPreview' && workElementsView !== 'preview' ? <div className={`${styles.FilesList} ${renderHeight(recentFiles, filePick, styles)}`}>
                    {renderGroups(FileBar, fileList?.files)}
                    {!gLoader ? <div
                        className={`${styles.bottomLine} ${filesPage === 0 ? styles.bottomLineHidden : ''}`}
                        style={{height: '100%'}}
                        ref={scrollRef}
                    >
                        <Loader
                            type='bounceDots'
                            position='absolute'
                            background='white'
                            zIndex={5}
                            width='100px'
                            height='100px'
                            containerType='bounceDots'
                        />
                    </div> : null}
                </div>
                : null}

            {workElementsView === 'lines' && Array.isArray(fileList?.files) ? <WorkLines
                fileLoading={fileLoading}
                filePick={filePick}
                filesPage={filesPage}
                setFilesPage={setFilesPage}
                fileRef={fileRef}
                chosenFolder={chosenFolder}
                gLoader={gLoader}
                load={load}
                options={options}
            >{renderFiles(FileLine, fileList?.files)}</WorkLines> : null}

            {workElementsView === 'preview' ? <WorkBarsPreview
                file={chosenFile}
                filePick={filePick}
                filesPage={filesPage}
                setFilesPage={setFilesPage}
                fileRef={fileRef}
                chosenFolder={chosenFolder}
                gLoader={gLoader}
                width={width}
                grouped={!Array.isArray(fileList?.files)}
                chosenFile={chosenFile}
                load={load}
                options={options}
            >{Array.isArray(fileList?.files) ? renderFiles(FileBar, fileList?.files) : renderGroups(FileBar, fileList?.files)}</WorkBarsPreview> : null}

            {workElementsView === 'workLinesPreview' ? <WorkLinesPreview
                file={chosenFile}
                filePick={filePick}
                filesPage={filesPage}
                setFilesPage={setFilesPage}
                fileRef={fileRef}
                chosenFolder={chosenFolder}
                gLoader={gLoader}
                load={load}
                options={options}
                renderFiles={renderFiles}
                renderGroups={renderGroups}
            >{Array.isArray(fileList?.files) ? renderFiles(FileLineShort, fileList?.files) : renderGroups(FileLineShort, fileList?.files)}</WorkLinesPreview> : null}
        </>
    )
}

export default ItemsList