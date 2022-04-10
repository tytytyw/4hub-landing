import React from "react";
import { useSelector } from "react-redux";
import CreateZip from "./ContextMenuFile/CreateZip";
import CustomizeFile from "./ContextMenuFile/CustomizeFile";
import CopyLinkShare from "./generalContextMenuComponents/CopyLinkShare";
import FileProperty from "./ContextMenuFile/FileProperty";
import MoveToArchive from "./ContextMenuFile/MoveToArchive/MoveToArchive";
import DownloadFile from "./ContextMenuFile/DownloadFile/DownloadFile";
import PrintFile from "./ContextMenuFile/PrintFile/PrintFile";
import DeleteFile from "./ContextMenuFile/DeleteFile/DeleteFIle";
import { CONTEXT_MENU_FILE } from "../../../../generalComponents/globalVariables";

function ContextModal({ saveCustomizeSeveralFiles }) {
  const contextMenuModals = useSelector(
    s => s.Cabinet.modals.contextMenuModals
  );

  return (
    <>
      {contextMenuModals.type === CONTEXT_MENU_FILE.CREATE_ZIP ? (
        <CreateZip />
      ) : null}
      {contextMenuModals.type === CONTEXT_MENU_FILE.CUSTOMIZE_FILE ? (
        <CustomizeFile saveCustomizeSeveralFiles={saveCustomizeSeveralFiles} />
      ) : null}
      {contextMenuModals.type === CONTEXT_MENU_FILE.COPY_LINK_SHARE ? (
        <CopyLinkShare />
      ) : null}
      {contextMenuModals.type === CONTEXT_MENU_FILE.FILE_PROPERTY ? (
        <FileProperty />
      ) : null}
      {contextMenuModals.type === CONTEXT_MENU_FILE.MOVE_TO_ARCHIVE ? (
        <MoveToArchive />
      ) : null}
      {contextMenuModals.type === CONTEXT_MENU_FILE.DOWNLOAD_FILE ? (
        <DownloadFile />
      ) : null}
      {contextMenuModals.type === CONTEXT_MENU_FILE.PRINT_FILE ? (
        <PrintFile />
      ) : null}
      {contextMenuModals.type === CONTEXT_MENU_FILE.DELETE_FILE ? (
        <DeleteFile />
      ) : null}
    </>
  );
}

export default ContextModal;
