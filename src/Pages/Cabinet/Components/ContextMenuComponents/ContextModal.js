import React from 'react';
import {useSelector} from "react-redux";
import CreateZip from "./ContextMenuFile/CreateZip";
import CustomizeFile from "./ContextMenuFile/CustomizeFile";
import CopyLinkShare from "./generalContextMenuComponents/CopyLinkShare";
import FileProperty from "./ContextMenuFile/FileProperty";
import MoveToArchive from "./ContextMenuFile/MoveToArchive/MoveToArchive";
import DownloadFile from "./ContextMenuFile/DownloadFile/DownloadFile";
import PrintFile from "./ContextMenuFile/PrintFile/PrintFile";
import DeleteFile from "./ContextMenuFile/DeleteFile/DeleteFIle";

function ContextModal({saveCustomizeSeveralFiles}) {

    const contextMenuModals = useSelector(s => s.Cabinet.modals.contextMenuModals);

    return <>
        {contextMenuModals.type === 'CreateZip' ? <CreateZip /> : null}
        {contextMenuModals.type === 'CustomizeFile' ? <CustomizeFile saveCustomizeSeveralFiles={saveCustomizeSeveralFiles} /> : null}
        {contextMenuModals.type === 'CopyLinkShare' ? <CopyLinkShare /> : null}
        {contextMenuModals.type === 'FileProperty' ? <FileProperty /> : null}
        {contextMenuModals.type === 'MoveToArchive' ? <MoveToArchive /> : null}
        {contextMenuModals.type === 'DownloadFile' ? <DownloadFile /> : null}
        {contextMenuModals.type === 'PrintFile' ? <PrintFile /> : null}
        {contextMenuModals.type === 'DeleteFile' ? <DeleteFile /> : null}
    </>
}

export default ContextModal;