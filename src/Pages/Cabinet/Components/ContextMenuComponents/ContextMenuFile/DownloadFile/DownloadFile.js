import React, {useLayoutEffect} from 'react';
import {onSetModals} from "../../../../../../Store/actions/CabinetActions";
import {useDispatch, useSelector} from "react-redux";

function DownloadFile() {

    const contextMenuModals = useSelector(s => s.Cabinet.modals.contextMenuModals);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        document.downloadFile.submit();
        setTimeout(() => {
            dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: '', items: []}))
        }, 0);
    }, [])

    return <form style={{display: 'none'}} name='downloadFile' action='/ajax/download.php' method='post'>
        <input style={{display: 'none'}} name='fid' value={contextMenuModals?.items[0]?.fid || ''} readOnly />
    </form>
}

export default DownloadFile;