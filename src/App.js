import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.sass';

import {onLog} from './Store/actions/startPageAction';
import PrivateCabinet from './Pages/Cabinet';
import StartPage from "./Pages/StartPage";
import Guest from "./Pages/Guest";

import BusinessCabinet from "./Pages/BusinessCabinet";

function App() {

    const uid = useSelector(state => state.user.uid);
    const dispatch = useDispatch();

    const [options, setOptions] = useState({guest: false, business: false})

    useEffect(() => {
        const uid = document.cookie.match(/uid=[a-zA-Z0-9]*/g);
        if (!!uid) dispatch(onLog(uid[0].split('=')[1]));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {!uid && !options.guest && !options.business ? <StartPage setOptions={setOptions} /> : null}
            {!uid && options.guest && !options.business ? <Guest/> : null}
            {!options.guest && uid && !options.business ? <PrivateCabinet/> : null}
            {!options.guest && options.business ? <BusinessCabinet/> : null}
        </>
    );
}

export default App;
