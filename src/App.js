import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import './App.sass';

import { onLog } from './Store/actions/startPageAction';
import StartPage from './Pages/StartPage';
import PrivateCabinet from './Pages/PrivateCabinet';

function App() {

    const uid = useSelector(state => state.user.uid);
    const dispatch = useDispatch();

    //! Temporary comment before BUILT
    useEffect(() => {
        const uid = document.cookie.match(/uid=[a-zA-Z0-9]*/g);
        if(!!uid) dispatch(onLog(uid[0].split('=')[1]));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
    <>
        {!uid && <StartPage />}
        {uid && <PrivateCabinet />}
    </>
  );
}

export default App;
