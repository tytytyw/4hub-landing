import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { onGetUserInfo } from '../../Store/actions/startPageAction';
import { onGetFolders, onChooseFiles, onAddRecentFiles, onAddRecentFolders } from '../../Store/actions/PrivateCabinetActions';
import styles from './PrivateCabinet.module.sass';
import SideMenu from './Components/SideMenu';
import MyFolders from './Components/MyFolders';
import Safe from './Components/Safe';
import MyProfile from './Components/MyProfile';
import MyFiles from './Components/MyFiles';
import FileLoader from './Components/FileLoader';
import Programs from "./Components/Programs";

import {Switch, Route, Redirect} from 'react-router'

const PrivateCabinet = () => {

    const uid = useSelector(state => state.user.uid);
    const path = useSelector(state => state.PrivateCabinet.fileList?.path);
    const dispatch = useDispatch();
    const [menuItem, setItem] = useState('Мои папки');
    const [collapsed, setCollapsed] = useState(false)
    const minHeight = window.outerHeight >= 1440 ? window.outerHeight * 0.8 : window.outerHeight * 0.75;
    const [filePreview, setFilePreview] = useState({view: false, file: null});
    const [fileAddCustomization, setFileAddCustomization] = useState({show: false, file: {}});
    const [fileErrors, setFileErrors] = useState([]);

    useEffect(() => {
        dispatch(onGetUserInfo());
        dispatch(onGetFolders());
        dispatch(onChooseFiles('global/all'));
        dispatch(onAddRecentFiles());
        dispatch(onAddRecentFolders());

        let date = new Date();
        date.setHours(date.getHours() + 1);
        document.cookie = `uid=${uid};expires=${date}`;
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    //Loading multiple files info
    const inputRef = useRef();
    const [awaitingFiles, setAwaitingFiles] = useState([]);
    const [loadingFile, setLoadingFile] = useState([]);
    const [loaded, setLoaded] = useState([]);
    const onInputFiles = (e) => {
        const files = [...e.target.files].map(file => {return {file, options: {filePath: path}}});
        setAwaitingFiles([...awaitingFiles].concat(...files));
        inputRef.current.value = '';
    };

    const fileSelect = () => inputRef.current.click();

    return (
        <div className={styles.mainWrap} style={{minHeight}}>
            <SideMenu
                collapsed={collapsed} setCollapsed={setCollapsed}
            />
            <div
                className={styles.workArea}
                style={{
                    minHeight,
                    width: collapsed ? `calc(100vw - 55px)` : '82%'
                }}>

                <Switch>

                    <Route
                        path='/personal-data'
                        render={() => <MyProfile
                            menuItem={menuItem}
                            setItem={setItem}
                        />}
                        exact
                    />

                    <Route
                        path='/support'
                        render={() => <MyProfile
                            defaultPageOption='support'
                            menuItem={menuItem}
                            setItem={setItem}
                        />}
                    />

                    <Route
                        path='/folders'
                        render={() => <MyFolders
                            filePreview={filePreview}
                            setFilePreview={setFilePreview}
                            fileSelect={fileSelect}
                            fileAddCustomization={fileAddCustomization}
                            setFileAddCustomization={setFileAddCustomization}
                            setAwaitingFiles={setAwaitingFiles}
                            awaitingFiles={awaitingFiles}
                            loaded={loaded}
                            setLoaded={setLoaded}
                            loadingFile={loadingFile}
                            fileErrors={fileErrors}
                            setLoadingFile={setLoadingFile}
                        />}
                    />

                    <Route
                        path='/files'
                        render={() => <MyFiles
                            filePreview={filePreview}
                            setFilePreview={setFilePreview}
                            awaitingFiles={awaitingFiles}
                            setAwaitingFiles={setAwaitingFiles}
                            loaded={loaded}
                            setLoaded={setLoaded}
                            loadingFile={loadingFile}
                            fileErrors={fileErrors}
                            fileSelect={fileSelect}
                            fileAddCustomization={fileAddCustomization}
                            setFileAddCustomization={setFileAddCustomization}
                            setLoadingFile={setLoadingFile}
                        />}
                    />

                    <Route
                        path='/programs'
                        render={() => <Programs
                            setItem={setItem}
                            filePreview={filePreview}
                            setFilePreview={setFilePreview}
                            fileSelect={fileSelect}
                            fileAddCustomization={fileAddCustomization}
                            setFileAddCustomization={setFileAddCustomization}
                            setAwaitingFiles={setAwaitingFiles}
                            awaitingFiles={awaitingFiles}
                            loaded={loaded}
                            setLoaded={setLoaded}
                            loadingFile={loadingFile}
                            fileErrors={fileErrors}
                        />}
                    />

                    <Route
                        path='/safe'
                        render={() => <Safe
                            filePreview={filePreview}
                            setFilePreview={setFilePreview}
                            fileSelect={fileSelect}
                            fileAddCustomization={fileAddCustomization}
                            setFileAddCustomization={setFileAddCustomization}
                            setAwaitingFiles={setAwaitingFiles}
                            awaitingFiles={awaitingFiles}
                            loaded={loaded}
                            setLoaded={setLoaded}
                            loadingFile={loadingFile}
                            fileErrors={fileErrors}
                            setLoadingFile={setLoadingFile}
                        />}
                    />

                    <Redirect to='/folders'/>

                </Switch>

            </div>
            {awaitingFiles.length > 0 || loadingFile.length > 0 || loaded.length > 0 || fileErrors.length > 0
                ? <FileLoader
                    awaitingFiles={awaitingFiles}
                    setAwaitingFiles={setAwaitingFiles}
                    loadingFile={loadingFile}
                    setLoadingFile={setLoadingFile}
                    loaded={loaded}
                    setLoaded={setLoaded}
                    setFileAddCustomization={setFileAddCustomization}
                    fileAddCustomization={fileAddCustomization}
                    fileErrors={fileErrors}
                    setFileErrors={setFileErrors}
                />
            : null}
            <div style={{display: 'none'}}>
                <input type='file' multiple='multiple' onChange={onInputFiles} ref={inputRef} />
            </div>

        </div>
    )
}

export default PrivateCabinet;
