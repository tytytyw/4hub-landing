import React, {useLayoutEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {previewFormats} from "../../../../../../generalComponents/collections";
import api from "../../../../../../api";
import {onSetModals} from "../../../../../../Store/actions/CabinetActions";

function PrintFile() {

    const uid = useSelector(s => s.user.uid);
    const contextMenuModals = useSelector(s => s.Cabinet.modals.contextMenuModals);
    const dispatch = useDispatch();

    const checkMimeTypes = (file) => {
        const mType = file?.mime_type ?? contextMenuModals.items[0]?.mime_type;
        const isFormat = previewFormats.filter(format => contextMenuModals.items[0].ext.toLowerCase().includes(format)).length > 0;
        const fid = contextMenuModals.items[0]?.fid ?? '';
        const preview = file?.preview ?? contextMenuModals.items[0]?.preview;
        if(mType === 'application/pdf' || (mType && mType?.includes('image'))) {
            printFile(`${preview}`)
        } else {
            if(isFormat) {
                api.post(`/ajax/file_preview.php?uid=${uid}&fid=${fid}`)
                    .then(res => printFile(res.data.file_pdf))
                    .catch(err => dispatch(onSetModals('error', {open: true, message: err})))
                    .finally(() => dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: '', items: []})));
            }
        }
    };

    const printFile = (path) => {
        try {
            let pri = document.getElementById('frame');
            pri.src = `https://fs2.mh.net.ua${path}`;
            setTimeout(() => {
                pri.contentWindow.focus();
                pri.contentWindow.print();
                dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: '', items: []}))
            }, 1000);
        } catch (err) {
            dispatch(onSetModals('error', {open: true, message: err}))
        }
    };

    useLayoutEffect(() => {
        checkMimeTypes(contextMenuModals.items[0])
    }, [])

    return <iframe
        style={{display: 'none'}}
        title={'print'}
        frameBorder='0'
        scrolling='no'
        id='frame'
    />
}

export default PrintFile;