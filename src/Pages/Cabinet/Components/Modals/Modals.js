import React from 'react'
import MutualEdit from "./Components/MutualEdit/MutualEdit";
import {useDispatch, useSelector} from "react-redux";
import FileLoader from "../FileLoader";
import Error from "../../../../generalComponents/Error";
import Success from "../../../../generalComponents/Success";
import {onSetModals} from "../../../../Store/actions/CabinetActions";
import Share from "../ContextMenuComponents/generalContextMenuComponents/Share/Share";
import Loader from "../../../../generalComponents/Loaders/4HUB";
import PreviewImageWithComment from "./Components/PreviewImageWithComment/PreviewImageWithComment";

function Modals ({
     awaitingFiles, setAwaitingFiles, loadingFile, setLoadingFile, loaded, setLoaded,
     setFileAddCustomization, fileAddCustomization, fileErrors, setFileErrors, menuItem
 }) {
    const mutualEdit = useSelector(state => state.Cabinet.paint.mutualEdit);
    const error = useSelector(state => state.Cabinet.modals.error);
    const success = useSelector(state => state.Cabinet.modals.success);
    const loader = useSelector(state => state.Cabinet.modals.loader);
    const share = useSelector(state => state.Cabinet.modals.share);
    const previewImageWithComment = useSelector(state => state.Cabinet.modals.previewWithComments);
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
        {share.open ? <Share /> : null}
        {loader ? <Loader
            position='absolute'
            zIndex={10000}
            containerType='bounceDots'
            type='bounceDots'
            background='rgba(256, 256, 256, 0.5)'
            animation={false}
        /> : null}
        {previewImageWithComment.open ? <PreviewImageWithComment /> : null}
    </>
}

export default Modals;