import React, {useEffect, useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import api from '../../../../api';
import axios from 'axios';
import styles from './FileLoader.module.sass';
import LoadItem from './LoadItem';
import ActionApproval from '../../../../generalComponents/ActionApproval';
import {
    onChooseFiles,
    onChooseAllFiles,
    onGetSafeFileList,
    nullifyFilters
} from '../../../../Store/actions/CabinetActions';
import {ReactComponent as ErrorIcon} from '../../../../assets/PrivateCabinet/exclamation.svg';
import {ReactComponent as CheckIcon} from '../../../../assets/PrivateCabinet/check.svg';
import {imageSrc} from '../../../../generalComponents/globalVariables';
import {loadDest} from "../../../../generalComponents/collections";

const FileLoader = ({
        awaitingFiles, setAwaitingFiles, loadingFile, setLoadingFile, loaded, setLoaded,
        setFileAddCustomization, fileAddCustomization, fileErrors, setFileErrors, menuItem
}) => {

    const [collapsed, setCollapsed] = useState(false);
    const [processing, setProcessing] = useState(0);
    const [closeApprove, setCloseApprove] = useState(true);
    const [timeLeft, setTimeLeft] = useState(undefined);
    const [params, setParams] = useState({x: -1, y: -1, offsetX: 0, offsetY: 0, width: 0, height: 0});
    const [display, setDisplay] = useState('block');
    const uid = useSelector(state => state.user?.uid);
    const search = useSelector(state => state.Cabinet.search);
    const path = useSelector(state => state.Cabinet.fileList?.path);
    const [response, setResponse] = useState(null);
    const dispatch = useDispatch();
    const fileLoaderRef = useRef(null);
    const fileList = useSelector(state => state.Cabinet.fileList);
    const fileListAll = useSelector(state => state.Cabinet.fileListAll);
    const authorizedSafe = useSelector(state => state.Cabinet.authorizedSafe);
    const sumFiles = awaitingFiles.length + loadingFile.length + loaded.length + fileErrors.length;

    //Cancel Loading variables
    const CancelToken = axios.CancelToken;
    const [options, setOptions] = useState({});

    //Closure FileLoader
    const clearLoadFiles = () => {
        setAwaitingFiles([]);
        setLoadingFile([]);
        setLoaded([]);
        setFileErrors([])
        setCloseApprove(true);
    };
    const offCloseApprove = () => setCloseApprove(true);
    const onCloseApprove = () => {
        awaitingFiles.length > 0 || loadingFile.length > 0 || fileErrors.length > 0 ? setCloseApprove(false) : clearLoadFiles();
    }

    // Actions on first render of the Loader
    const startLoading = (loadForce) => {
        if((loadingFile.length === 0 || loadForce) && awaitingFiles.length > 0) {
            setLoadingFile([awaitingFiles[0]]);
            const files = [...awaitingFiles];
            files.shift();
            setAwaitingFiles(files);
        }
    };

    useEffect(() => {
        if(awaitingFiles.length > 1 && !fileAddCustomization.several) {
            setFileAddCustomization({...fileAddCustomization, several: true, files: [...awaitingFiles]});
            setAwaitingFiles([]);
        } else if(awaitingFiles.length > 1 && fileAddCustomization.several) {
            startLoading();
            setFileAddCustomization({...fileAddCustomization, several: false, files: []})
        } else if(!fileAddCustomization.show) {
            setFileAddCustomization({...fileAddCustomization, show: true, file: awaitingFiles[0]});
            setAwaitingFiles([]);
        } else {
            setFileAddCustomization({show: false, file: null})
            startLoading();
        }
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const sendFile = async (file) => {
        if(file) {
            let data = new FormData();
            data.append('uid', uid);
            data.append('myfile', file.file);
            data.append('fileName', `${file?.options?.name ? file.options.name.slice(0, file.options.name.lastIndexOf('.')) : file.file.name.slice(0, file.file.name.lastIndexOf('.'))}`);
            data.append('tag', file?.options?.tag ? file.options.tag : '');
            data.append('pass', file?.options?.pass ? file.options.pass : '');
            data.append('color', file?.options?.color ? file.options.color : '');
            data.append('symbol', file?.options?.symbol ? file.options.symbol : '');
            data.append('emoji', file?.options?.emoji ? file.options.emoji : '');

            if(file.options.destination === 'Safe') {
                data.append('dir', '');
                data.append('id_safe', authorizedSafe.id_safe);
                data.append('code', authorizedSafe.code);
            }
            if(file.options.destination === 'myFolders' || file.options.destination === 'myFiles') {
                data.append('dir', path ? path : 'global/all');
            }

            // await api.post(`/ajax/${menuItem === 'Safe' ? 'safe_': ""}file_add.php`,
            await api.post(`/ajax/${loadDest[file.options.destination] ?? ''}file_add.php`,
                data,
                {
                    onUploadProgress: e => {
                        setTimeLeft(((e.total / (e.loaded / e.timeStamp)) / 60000).toFixed() - 5);
                        setProcessing((e.loaded * 100) / e.total)
                    },
                    cancelToken: new CancelToken(function executor(e){const cancelLoading = e; setOptions({cancelLoading})})
                })
                .then(res => {
                    setResponse({res, file});
                    setTimeLeft(undefined);
                })
                .catch(err => {console.log(err); setTimeLeft(undefined)});
        }
    };

    useEffect(() => {
        if(response?.res?.data) onGetResponse(response.res, response.file);
    }, [response]); // eslint-disable-line react-hooks/exhaustive-deps

    const onGetResponse = (res, file) => {
        if(res.data.ok === 1) {
            const d = new Date();
            const f = {
                file: {
                    name: file?.options?.name ? file.options.name : file.file.name,
                    fid: res.data.fid,
                    size_now: setSize(file.file.size),
                    size: file.file.size,
                    mtime: `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`,
                    gdir: path ? path : 'global/all',
                    loaded: true
                },
                options: {...file.options}
            };
            const loadedFiles = [...loaded];
            loadedFiles.push(f);
            setLoaded(loadedFiles);
            if(awaitingFiles.length > 0) {
                setProcessing(0);
                const newLoadingFile = [awaitingFiles[0]];
                const awaitFiles = [...awaitingFiles];
                awaitFiles.shift();
                setAwaitingFiles(awaitFiles);
                setLoadingFile(newLoadingFile);
            } else {
                setLoadingFile([]);
                setProcessing(0);
            }
        }else {console.log(res)}
        dispatch(nullifyFilters())
        if (menuItem === 'myFiles' && file.options.destination === 'myFiles') dispatch(onChooseAllFiles(fileListAll?.path, search, 1, '', ''));
        if (menuItem === 'myFolders' && file.options.destination === 'myFolders') dispatch(onChooseFiles(fileList?.path, search, 1, '', ''));
        if (menuItem === 'Safe' && file.options.destination === 'Safe') dispatch(onGetSafeFileList(authorizedSafe.code, authorizedSafe.id_safe, '', '', ''));
    };
    let firstRenderFixer = useRef(0)
    useEffect(() => {if(loadingFile.length > 0) sendFile(loadingFile[0])}, [loadingFile]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {
        if(loadingFile.length === 0 && !fileAddCustomization.show && firstRenderFixer.current !== 0) {
            startLoading()
        } else (firstRenderFixer.current = 1)
        }, [awaitingFiles]); // eslint-disable-line react-hooks/exhaustive-deps

    const renderList = (list, loaded, processing, set, error) => {
      return list.map((item, i) => {
           return <LoadItem
                key={i}
                loaded={loaded}
                processing={processing}
                name={item?.options?.name ? item.options.name.slice(0, item.options.name.lastIndexOf('.')) : item.file.name.slice(0, item.file.name.lastIndexOf('.'))}
                ext={item?.options?.name ? item.options.name.slice(item.options.name.lastIndexOf('.')) : item.file.name.slice(item.file.name.lastIndexOf('.'))}
                color={item?.options?.color ? item.options.color : 'grey'}
                index={i}
                set={set}
                list={list}
                options={options}
                startLoading={startLoading}
                setProcessing={setProcessing}
                setFileAddCustomization={setFileAddCustomization}
                error={error}
                fileErrors={fileErrors}
                setFileErrors={setFileErrors}
                awaitingFiles={awaitingFiles}
                setAwaitingFiles={setAwaitingFiles}
                loadingFile={loadingFile}
                setLoadingFile={setLoadingFile}
            />
      });
    };

    const setSize = (size) => {
        if(size / 1000000000 > 1) size = `${(size / 1000000000).toFixed(2)} GB`;
        if(size / 1000000 > 1) size = `${(size / 1000000).toFixed(2)} MB`;
        if(size / 1000 > 1) size = `${(size / 1000).toFixed(2)} KB`;
        return size;
    };

    const handleDragStart = e => {
        setParams({...params, offsetX: e.clientX - e.target.offsetLeft, offsetY: e.clientY - e.target.offsetTop, width: e.target.clientWidth, height: e.target.clientHeight});
        setTimeout(() => setDisplay('none'), 0);
    };

    const handleDragEnd = e => {
        e.preventDefault();
        setDisplay('block');
        setParams({...params, x: e.clientX, y: e.clientY});
    };

    const handleDrop = e => e.preventDefault();

    const renderPosition = () => {
        const position = {top: '', left: '', right: '', bottom: ''};
        if(params.x === -1 && params.y === -1) return {...position, right: '50px', bottom: '50px'};
        window.innerWidth / 2 >= params.x
            ? position.left = (params.x - params.offsetX) > 50 ? `${params.x - params.offsetX}px` : `${50}px`
            : position.left = (params.x + (params.width - params.offsetX)) < (window.innerWidth - 50) ? `${params.x - params.offsetX}px` : `${window.innerWidth - 50 - params.width}px`;
        window.innerHeight / 2 >= params.y
            ? position.top = (params.y - params.offsetY) > 50 ? `${params.y - params.offsetY}px` : `${50}px`
            : position.top = (params.y + (params.height - params.offsetY)) < (window.innerHeight - 50) ? `${params.y - params.offsetY}px` : `${window.innerHeight - 50 - params.height}px`;
        return position;
    }

    // Spin Status Loader
    const [data, setData] = useState({strokeDasharray: `150 150`, strokeDashoffset: `288`})
    const circleRef = useRef();
    const onProgress = (processing) => {
        const radius = circleRef?.current?.r?.baseVal?.value;
        const circumference = 2 * Math.PI * radius;
        setData({
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: `${circumference - processing / 100 * circumference}`
        });
    };

    useEffect(() => {onProgress(processing)}, [processing]);
    return (
        <>
        <div className={`${styles.loaderWrap} ${collapsed ? `${styles.loaderCollapsed} ${styles.wrapperCollapsed}` : styles.wrapperNotCollapsed}`}
             draggable={true}
             onDragStart={handleDragStart}
             onDragEnd={handleDragEnd}
             onDrop={handleDrop}
             ref={fileLoaderRef}
             style={{
                 display: display,
                 height: collapsed ? '' : sumFiles > 3 ? `280px` : sumFiles === 3 ? '234px' : sumFiles === 2 ? '183px' : '134px',
                 ...renderPosition()
             }}
        >
            <div className={styles.header}>
                {!collapsed ? <span className={`${collapsed ? '' : styles.loadBar}`} style={{width: `${processing}%`}} /> : null}
                {(loadingFile.length > 0 || awaitingFiles.length > 0) && !collapsed ? <span>Загрузка {loadingFile.length + awaitingFiles.length} файлов</span> : null}
                {loadingFile.length === 0 && awaitingFiles.length === 0 && !collapsed ? <span>Загрузка завершена</span> : null}
                <div className={`${styles.optionsWrap} ${collapsed ? styles.optionFull : styles.optionSmall}`}>
                    <div className={styles.progressBarWrap}>
                        {collapsed && processing ? <>
                            <svg viewBox="0 0 100 100" width="30px" className={styles.progressBar}>
                                <circle className={styles.load} cx="50" cy="50" r="45"/>
                                <circle className={styles.loaded} cx="50" cy="50" r="45" ref={circleRef} strokeDasharray={data.strokeDasharray} strokeDashoffset={data.strokeDashoffset} />
                            </svg>
                            <img src={imageSrc + 'assets/PrivateCabinet/download_arrow.svg'} alt='' className={styles.downloadArrow} />
                        </> : null}
                        {collapsed && !processing && fileErrors.length === 0 ? <CheckIcon className={styles.checkIcon} /> : null}
                        {collapsed && fileErrors.length > 0 && !processing ? <ErrorIcon className={styles.mark} /> : null}
                    </div>
                    <div className={`${collapsed ? styles.arrowUp : styles.arrowDown}`} onClick={() => setCollapsed(!collapsed)} />
                    <span className={styles.cross} onClick={onCloseApprove} />
                </div>
            </div>
            <div className={`${collapsed ? styles.mainHidden : styles.main}`}>
                {awaitingFiles.length > 0 || loadingFile.length > 0 || fileErrors.length > 0 ? <div className={styles.timeLeft}>
                    <div>{timeLeft !== undefined ? <span className={styles.time}>{timeLeft < 1 ? `Осталось меньше минуты` : timeLeft > 59 ? `Осталось около 1 часа` : `Осталось ${timeLeft} мин.`}</span> : null}</div>
                    <span
                        className={styles.cancel}
                        onClick={() => {
                            if(awaitingFiles.length > 0 || loadingFile.length > 0) {
                                setFileErrors([...fileErrors, ...loadingFile, ...awaitingFiles]);
                                setLoadingFile([]);
                                setAwaitingFiles([]);
                                setProcessing(0);
                                if(options.cancelLoading) options.cancelLoading();
                            } else {
                                setAwaitingFiles([...awaitingFiles, ...fileErrors]);
                                setFileErrors([]);
                            }
                        }}
                    >{(awaitingFiles.length > 0 || loadingFile.length > 0) ? 'Отмена' : 'Повторить'}</span>
                </div> : <div className={styles.timeLeft} />}
                <div className={styles.scrollFileLoaderWrap}>
                    {loaded.length > 0 ? renderList(loaded, true, 0, setLoaded, false) : null}
                    {loadingFile.length > 0 ? renderList(loadingFile, false, processing, setLoadingFile, false) : null}
                    {awaitingFiles.length > 0 ? renderList(awaitingFiles, false, 0, setAwaitingFiles, false) : null}
                    {fileErrors.length > 0 ? renderList(fileErrors, false, 0, setFileErrors, true) : null}
                </div>
            </div>
        </div>
            {!closeApprove ? <ActionApproval name={'Закрыть загрузки'} text={'Вы действительно хотите закрыть окно с загрузкой? Все незавершенные загрузки будут отменены'} set={offCloseApprove} callback={clearLoadFiles} approve={'Закрыть'}>
                <ErrorIcon className={styles.mark} />
            </ActionApproval> : null}
        </>
    )
};

export default FileLoader;