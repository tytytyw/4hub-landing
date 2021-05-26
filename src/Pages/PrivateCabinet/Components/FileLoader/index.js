import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import api from '../../../../api';
import styles from './FileLoader.module.sass';
import LoadItem from './LoadItem';

const FileLoader = ({awaitingFiles, setAwaitingFiles, loadingFile, setLoadingFile, loaded, setLoaded}) => {

    const [collapsed, setCollapsed] = useState(false);
    const [processing, setProcessing] = useState(0);
    const uid = useSelector(state => state.user.uid);
    const path = useSelector(state => state.PrivateCabinet.fileList.path);

    useEffect(() => {
        if(loadingFile.length === 0 && awaitingFiles.length > 0) {
            setLoadingFile([awaitingFiles[0]]);
            const files = [...awaitingFiles];
            files.shift();
            setAwaitingFiles(files);
        }
    },[]); // eslint-disable-line react-hooks/exhaustive-deps

    const sendFile = (file) => {
        if(file) {
            let data = new FormData();
            data.append('uid', uid);
            data.append('myfile', file);
            data.append('fileName', `${file.name.slice(0, file.name.lastIndexOf('.'))}`);
            data.append('dir', path ? path : 'global/all');
            api.post(`/ajax/file_add.php`,
                data,
                {onUploadProgress: e => setProcessing((e.loaded * 100) / e.total)})
                .then(res => {if(res.data.ok === 1) {
                    const d = new Date();
                    const f = {name: file.name, fid: res.data.fid, size_now: setSize(file.size), mtime: `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`}
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
                    }
                }})
                .catch(err => console.log(err));
        }
    };

    useEffect(() => {if(loadingFile.length > 0) {setTimeout(() => sendFile(loadingFile[0]), 1000)}}, [loadingFile]); // eslint-disable-line react-hooks/exhaustive-deps

    const renderList = (list, loaded, processing, set) => {
      return list.map((item, i) => {
           return <LoadItem
                key={i}
                loaded={loaded}
                processing={processing}
                name={item.name.slice(0, item.name.lastIndexOf('.'))}
                ext={item.name.slice(item.name.lastIndexOf('.'))}
                color={'grey'}
                index={i}
                set={set}
                list={list}
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
        <div className={`${styles.loaderWrap} ${collapsed ? styles.loaderCollapsed : ''}`}>
            <div className={styles.header}>
                <span className={styles.loadBar} style={{width: `${processing}%`}} />
                {loadingFile.length > 0 && awaitingFiles.length > 0 ? <span>Загрузка {loadingFile.length + awaitingFiles.length} файлов</span> : null}
                {loadingFile.length === 0 && awaitingFiles.length === 0 ? <span>Загрузка завершена</span> : null}
                <div className={styles.optionsWrap}>
                    <div className={`${collapsed ? styles.arrowUp : styles.arrowDown}`} onClick={() => setCollapsed(!collapsed)} />
                    <span className={styles.cross} />
                </div>
            </div>
            <div className={`${collapsed ? styles.mainHidden : styles.main}`}>
                <div className={styles.timeLeft}>
                    <span className={styles.time}>Осталось 20 мин</span>
                    <span className={styles.cancel}>Отмена</span>
                </div>
                <div className={styles.scrollFileLoaderWrap}>
                    {loaded.length > 0 ? renderList(loaded, true, 0, setLoaded) : null}
                    {loadingFile.length > 0 ? renderList(loadingFile, false, processing, setLoadingFile) : null}
                    {awaitingFiles.length > 0 ? renderList(awaitingFiles, false, 0, setAwaitingFiles) : null}
                </div>
            </div>
        </div>
    )
};

export default FileLoader;