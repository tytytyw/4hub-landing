import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.sass';

import {onLog} from './Store/actions/startPageAction';
import Cabinet from './Pages/Cabinet';
import StartPage from "./Pages/StartPage";
import Guest from "./Pages/Guest";
import Loader from "./generalComponents/Loaders/4HUB";
import { LocalizedProvider } from 'react-localized';
import locales from './locales';
import {getStorageItem, setStorageItem} from "./generalComponents/StorageHelper";

function App() {

    const [loadingType, setLoadingType] = useState('bounceDots');
    const uid = useSelector(state => state.user.uid);
    const lang = useSelector(state => state.main.personalSettings.lang);
    const dispatch = useDispatch();

    const [options, setOptions] = useState({guest: false})

    useEffect(() => {
        const uid = document?.cookie.match(/uid=[a-zA-Z0-9]*/g);
        const id_company = document?.cookie.match(/id_company=[a-zA-Z0-9]*/g);
        if (!!uid) {
            const data = {uid: uid?.[0].split('=')[1], id_company: id_company?.[0].split('=')[1]}
            dispatch(onLog(data));
        }
        if(!getStorageItem('lang')) {
            setStorageItem('lang', 'ru');
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <LocalizedProvider
            locales={locales}
            selected={lang}
        >
            { ({ localeReady }) => (
                localeReady
                ? <>
                    {!uid && !options.guest && !options.business ? <StartPage setOptions={setOptions} setLoadingType={setLoadingType} /> : null}
                    {!uid && options.guest && !options.business ? <Guest/> : null}
                    {!options.guest && uid && !options.business ? <Cabinet loadingType={loadingType} setLoadingType={setLoadingType} /> : null}
                    {loadingType ? <Loader
                        position='absolute'
                        zIndex={10000}
                        containerType='bounceDots'
                        type='bounceDots'
                        background='white'
                        animation={false}
                    /> : null}
                </>
                : <Loader
                        position='absolute'
                        zIndex={10000}
                        containerType='bounceDots'
                        type='bounceDots'
                        background='white'
                        animation={false}
                    />
                )
            }
        </LocalizedProvider>
    )
}

export default App;
