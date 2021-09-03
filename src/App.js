import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.sass';

import {onLog} from './Store/actions/startPageAction';
import StartPage from './Pages/StartPage';
import PrivateCabinet from './Pages/PrivateCabinet';
import Guest from "./Pages/StartPage/Components/Guest";

function App() {

    const uid = useSelector(state => state.user.uid);
    const dispatch = useDispatch();

    const [guest] = useState(false)

    //! Temporary comment before BUILT
    useEffect(() => {
        // if (window.location.href !== window.location.origin + '/') {
        //     window.location = window.location.origin
        // }
        const uid = document.cookie.match(/uid=[a-zA-Z0-9]*/g);
        if (!!uid) dispatch(onLog(uid[0].split('=')[1]));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {!uid && <StartPage/>}
            {guest && <Guest/>}
            {!guest && uid && <PrivateCabinet/>}
        </>
    );
}

export default App;
