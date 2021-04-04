import React from 'react';
import { useSelector } from 'react-redux';
import './App.sass';

import StartPage from './Pages/StartPage'
import PrivateCabinet from './Pages/PrivateCabinet'

function App() {

    const uid = useSelector(state => state.initial.uid);

    return (
    <>
        {!uid && <StartPage />}
        {uid && <PrivateCabinet />}
    </>
  );
}

export default App;
