import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.sass';

import {onLog} from './Store/actions/startPageAction';
import PrivateCabinet from './Pages/PrivateCabinet';
import StartPage from "./Pages/StartPage";
import Guest from "./Pages/Guest";

import BusinessCabinet from "./Pages/BusinessCabinet";

function App() {

    const uid = useSelector(state => state.user.uid);
    const dispatch = useDispatch();

    const [options, setOptions] = useState({guest: false, business: true})

    useEffect(() => {
        const uid = document.cookie.match(/uid=[a-zA-Z0-9]*/g);
        if (!!uid) dispatch(onLog(uid[0].split('=')[1]));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        // options.business ? <BusinessCabinet/> :
        <>
            {!uid && !options.guest ? <StartPage setOptions={setOptions} /> : null}
            {!uid && options.guest ? <Guest/> : null}
            {!options.guest && uid ? <PrivateCabinet/> : null}
        </>
    );
}

export default App;
