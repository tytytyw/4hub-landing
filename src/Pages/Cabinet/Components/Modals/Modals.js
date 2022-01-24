import React from 'react'
import MutualEdit from "../MutualEdit/MutualEdit";
import {useDispatch, useSelector} from "react-redux";
import FileLoader from "../FileLoader";
import Error from "../../../../generalComponents/Error";
import Success from "../../../../generalComponents/Success";
import {onSetModals} from "../../../../Store/actions/CabinetActions";

function Modals ({
     awaitingFiles, setAwaitingFiles, loadingFile, setLoadingFile, loaded, setLoaded,
     setFileAddCustomization, fileAddCustomization, fileErrors, setFileErrors, menuItem
 }) {
    const mutualEdit = useSelector(state => state.Cabinet.paint.mutualEdit);
    const error = useSelector(state => state.Cabinet.modals.error);
    const success = useSelector(state => state.Cabinet.modals.success);
    const dispatch = useDispatch();

    const closeError = () => dispatch(onSetModals('error', {open: false, message: ''}));
    const closeSuccess = () => dispatch(onSetModals('success', {open: false, message: '', title: ''}));

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
        <Error error={error.open} message={error.message} set={closeError} />
        <Success success={success.open} message={success.message} set={closeSuccess} title={success.title} />
    </>
}

export default Modals;