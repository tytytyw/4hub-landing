import React from 'react'
import MutualEdit from "../MutualEdit/MutualEdit";
import {useSelector} from "react-redux";
import FileLoader from "../FileLoader";
import Error from "../../../../generalComponents/Error";
import Success from "../../../../generalComponents/Success";

function Modals ({
     awaitingFiles, setAwaitingFiles, loadingFile, setLoadingFile, loaded, setLoaded,
     setFileAddCustomization, fileAddCustomization, fileErrors, setFileErrors, menuItem
 }) {
    const mutualEdit = useSelector(state => state.Cabinet.paint.mutualEdit);


    return <>
        {mutualEdit.open ? <MutualEdit /> : null}
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
                menuItem={menuItem}
            />
            : null}
        {/*{error.open ? <Error /> : null}*/}
        {/*{success.open ? <Success /> : null}*/}
    </>
}

export default Modals;