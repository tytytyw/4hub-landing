import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import api from '../../../../api';
import axios from 'axios';
import styles from './FileLoader.module.sass';
import LoadItem from './LoadItem';
import ActionApproval from "../../../../generalComponents/ActionApproval";
import {onChooseFiles} from "../../../../Store/actions/PrivateCabinetActions";
import {ReactComponent as ErrorIcon} from "../../../../assets/PrivateCabinet/exclamation.svg";

const FileLoader = ({
        awaitingFiles, setAwaitingFiles, loadingFile, setLoadingFile, loaded, setLoaded,
        setFileAddCustomization, fileAddCustomization, fileErrors, setFileErrors,
}) => {

    const [collapsed, setCollapsed] = useState(false);
    const [processing, setProcessing] = useState(0);
    const [closeApprove, setCloseApprove] = useState(true);
    const uid = useSelector(state => state.user?.uid);
    const path = useSelector(state => state.PrivateCabinet.fileList?.path);
    const [response, setResponse] = useState(null);
    const dispatch = useDispatch();

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
        if(awaitingFiles.length > 1) {
            startLoading();
        } else if(!fileAddCustomization.show) {
            setFileAddCustomization({show: true, file: awaitingFiles[0]});
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
            data.append('dir', path ? path : 'global/all');
            data.append('tag', file?.options?.tag ? file.options.tag : '');
            data.append('pass', file?.options?.password ? file.options.password : '');
            data.append('color', file?.options?.color ? file.options.color : '');
            data.append('symbol', file?.options?.symbol ? file.options.symbol : '');
            data.append('emoji', file?.options?.emoji ? file.options.emoji : '');
            await api.post(`/ajax/file_add.php`,
                data,
                {
                    onUploadProgress: e => {setProcessing((e.loaded * 100) / e.total)},
                    cancelToken: new CancelToken(function executor(e){const cancelLoading = e; setOptions({cancelLoading})})
                })
                .then(res => setResponse({res, file}))
                .catch(err => console.log(err));
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
        dispatch(onChooseFiles(path));
    };

    useEffect(() => {if(loadingFile.length > 0) sendFile(loadingFile[0])}, [loadingFile]); // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(() => {if(loadingFile.length === 0 && !fileAddCustomization.show) startLoading()}, [awaitingFiles]); // eslint-disable-line react-hooks/exhaustive-deps

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

    return (
        <>
        <div className={`${styles.loaderWrap} ${collapsed ? styles.loaderCollapsed : ''}`}>
            <div className={styles.header}>
                <span className={styles.loadBar} style={{width: `${processing}%`}} />
                {loadingFile.length > 0 || awaitingFiles.length > 0 ? <span>Загрузка {loadingFile.length + awaitingFiles.length} файлов</span> : null}
                {loadingFile.length === 0 && awaitingFiles.length === 0 ? <span>Загрузка завершена</span> : null}
                <div className={styles.optionsWrap}>
                    <div className={`${collapsed ? styles.arrowUp : styles.arrowDown}`} onClick={() => setCollapsed(!collapsed)} />
                    <span className={styles.cross} onClick={() => setCloseApprove(false)} />
                </div>
            </div>
            <div className={`${collapsed ? styles.mainHidden : styles.main}`}>
                <div className={styles.timeLeft}>
                    <span className={styles.time}>Осталось 20 мин</span>
                    <span
                        className={styles.cancel}
                        onClick={() => {
                            setFileErrors([...fileErrors, ...loadingFile, ...awaitingFiles]);
                            setLoadingFile([]);
                            setAwaitingFiles([]);
                            setProcessing(0)
                            if(options.cancelLoading) options.cancelLoading();
                        }}
                    >Отмена</span>
                </div>
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