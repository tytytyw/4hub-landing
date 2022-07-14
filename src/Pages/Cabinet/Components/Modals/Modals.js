import React from "react";
import MutualEdit from "./Components/MutualEdit/MutualEdit";
import { useDispatch, useSelector } from "react-redux";
import FileLoader from "../FileLoader";
import Error from "../../../../generalComponents/Error";
import Success from "../../../../generalComponents/Success";
import { onSetModals } from "../../../../Store/actions/CabinetActions";
import Share from "../ContextMenuComponents/generalContextMenuComponents/Share/Share";
import Loader from "../../../../generalComponents/Loaders/4HUB";
import PreviewWithComment from "./Components/PreviewWithComment/PreviewWithComment";
import PrintScreen from "./Components/PrintScreen/PrintScreen";
import PreviewFile from "./Components/PreviewFile/PreviewFile";
import TopMessage from "./Components/TopMessage/TopMessage";
import ContextModal from "../ContextMenuComponents/ContextModal";
import FileAccessRights from "./Components/FileAccessRights/FileAccessRights";
import PropTypes from "prop-types";
import { fileAddCustomizationProps } from "../../../../types/File";
import { loadedFilesProps, loadingFileProps } from "../../../../types/LoadingFiles";
import TaskModals from "./Components/TaskModals/TaskModals";
import LibraryModals from "./Components/LibraryModals/LibraryModals";
import MailModals from "./Components/MailModals/MailModals";
import CalendarModals from "./Components/CalendarModals/CalendarModals";
import ChatModals from "./Components/ChatModals/ChatModals";

function Modals({
  awaitingFiles,
  setAwaitingFiles,
  loadingFile,
  setLoadingFile,
  loaded,
  setLoaded,
  setFileAddCustomization,
  fileAddCustomization,
  fileErrors,
  setFileErrors,
  menuItem,
  saveCustomizeSeveralFiles
}) {
  const mutualEdit = useSelector((state) => state.Cabinet.paint.mutualEdit);
  const error = useSelector((state) => state.Cabinet.modals.error);
  const success = useSelector((state) => state.Cabinet.modals.success);
  const loader = useSelector((state) => state.Cabinet.modals.loader);
  const share = useSelector((state) => state.Cabinet.modals.share);
  const previewImageWithComment = useSelector((state) => state.Cabinet.modals.previewWithComments);
  const printScreen = useSelector((state) => state.Cabinet.modals.printScreen);
  const previewFile = useSelector((state) => state.Cabinet.modals.previewFile);
  const topMessage = useSelector((state) => state.Cabinet.modals.topMessage);
  const fileAccessRights = useSelector((state) => state.Cabinet.modals.fileAccessRights);
  const taskModalsType = useSelector((s) => s.Cabinet.modals.taskModals.type);
  const libraryModalsType = useSelector((s) => s.Cabinet.modals.libraryModals.type);
  const dispatch = useDispatch();
  //MAIL
  const mailModalsType = useSelector((s) => s.Cabinet.modals.mailModals.type);
  //CALENDAR
  const calendarModalsType = useSelector((s) => s.Cabinet.modals.calendarModals.type);

  const closeError = () => dispatch(onSetModals("error", { open: false, message: "" }));
  const closeSuccess = () => dispatch(onSetModals("success", { open: false, message: "", title: "", icon: "" }));
  return (
    <>
      {mutualEdit.open ? <MutualEdit /> : null}
      {awaitingFiles.length > 0 || loadingFile.length > 0 || loaded.length > 0 || fileErrors.length > 0 ? (
        <FileLoader
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
      ) : null}
      <Error error={error.open} message={error.message} set={closeError} />
      <Success
        success={success.open}
        message={success.message}
        set={closeSuccess}
        title={success.title}
        icon={success.icon}
      />
      {topMessage.open ? <TopMessage /> : null}
      {share.open ? <Share /> : null}
      {loader ? (
        <Loader
          position="absolute"
          zIndex={10000}
          containerType="bounceDots"
          type="bounceDots"
          background="rgba(256, 256, 256, 0.5)"
          animation={false}
        />
      ) : null}
      {previewImageWithComment.open ? <PreviewWithComment /> : null}
      {printScreen.open ? <PrintScreen /> : null}
      {previewFile.open ? <PreviewFile /> : null}
      {fileAccessRights.open ? <FileAccessRights /> : null}
      <ContextModal saveCustomizeSeveralFiles={saveCustomizeSeveralFiles} />
      {taskModalsType ? <TaskModals /> : null}
      {mailModalsType ? <MailModals /> : null}
      {libraryModalsType ? <LibraryModals /> : null}
      {calendarModalsType ? <CalendarModals /> : null}
      <ChatModals />
    </>
  );
}

export default Modals;

Modals.propTypes = {
  awaitingFiles: PropTypes.oneOfType([PropTypes.arrayOf(loadingFileProps), PropTypes.array]),
  setAwaitingFiles: PropTypes.func,
  loadingFile: PropTypes.oneOfType([PropTypes.arrayOf(loadingFileProps), PropTypes.array]),
  setLoadingFile: PropTypes.func,
  loaded: PropTypes.arrayOf(loadedFilesProps),
  setLoaded: PropTypes.func,
  setFileAddCustomization: PropTypes.func,
  fileAddCustomization: fileAddCustomizationProps,
  fileErrors: PropTypes.arrayOf(PropTypes.string),
  setFileErrors: PropTypes.func,
  menuItem: PropTypes.string,
  saveCustomizeSeveralFiles: PropTypes.func
};
