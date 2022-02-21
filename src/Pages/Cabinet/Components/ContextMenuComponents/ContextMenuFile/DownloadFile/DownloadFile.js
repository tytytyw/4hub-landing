import React, {useLayoutEffect, useRef} from 'react';
import {onSetModals} from "../../../../../../Store/actions/CabinetActions";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";

function DownloadFile() {

    const uid = useSelector(s => s.user.uid);
    const contextMenuModals = useSelector(s => s.Cabinet.modals.contextMenuModals);
    const dispatch = useDispatch();
    const formRef = useRef();

    const location = useLocation().pathname.split('/')[1];

    useLayoutEffect(() => {
        if(formRef.current) formRef.current.submit();
        setTimeout(() => {
            dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: '', items: [], authorizedSafe: null}))
        }, 0);
    }, []) //eslint-disable-line

    return <>
        {location === 'safe'
        ? <form
                style={{ display: "none" }}
                name="downloadFile"
                action={`/ajax/safe_file_download.php?${uid}&id_safe=${
                    contextMenuModals.authorizedSafe?.id_safe || ""
                }&pass=${contextMenuModals.authorizedSafe?.password || ""}&code=${
                    contextMenuModals.authorizedSafe?.code || ""
                }`}
                method="post"
                ref={formRef}
            >
                <input
                    style={{ display: "none" }}
                    name="fid"
                    value={contextMenuModals?.items[0]?.fid || ''}
                    readOnly
                />
            </form>
        : <form style={{display: 'none'}} name='downloadFile' action='/ajax/download.php' method='post'>
              <input style={{display: 'none'}} name='fid' value={contextMenuModals?.items[0]?.fid || ''} readOnly />
          </form>}
    </>
}

export default DownloadFile;