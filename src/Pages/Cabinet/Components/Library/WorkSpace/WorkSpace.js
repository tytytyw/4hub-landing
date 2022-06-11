import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styles from "./WorkSpace.module.sass";
import BottomPanel from "../../BottomPanel";
import { useElementResize } from "../../../../../generalComponents/Hooks";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile/Profile";
import ServePanel from "../../ServePanel";
import { useDispatch, useSelector } from "react-redux";
import ItemsList from "../../WorkElements/ItemsList/ItemsList";
import OptionButtomLine from "../../WorkElements/OptionButtomLine";
import ContextMenu from "../../../../../generalComponents/ContextMenu";
import ContextMenuFileList from "../../ContextMenuComponents/ContextMenuFileList";
import { useLocales } from "react-localized";
import { filePreviewProps } from "../../../../../types/File";
import { fileAddCustomizationProps } from "../../../../../types/File";
import { onChooseFiles } from "../../../../../Store/actions/CabinetActions";
// import { useStandardLibraries } from "../../../../../generalComponents/collections";

function WorkSpace({
  listCollapsed,
  menuItem,
  setFilesPage,
  fileSelect,
  filesPage,
  fileAddCustomization,
  setFileAddCustomization,
  setFilePreview,
  filePreview,
  gLoader,
  setGLoader,
  successLoad
}) {
  const { __ } = useLocales();
  // const STANDARD_LIBRARIES = useStandardLibraries();
  const [containerRef, width] = useElementResize();
  const fileRef = useRef(null);
  const workElementsView = useSelector((s) => s.Cabinet.view);
  const [chosenFile, setChosenFile] = useState(null);
  const [filePick, setFilePick] = useState({
    show: false,
    files: [],
    customize: false,
    intoZip: false
  });
  const [mouseParams, setMouseParams] = useState(null);
  const [action, setAction] = useState({ type: "", name: "", text: "" });
  const dispatch = useDispatch();

  const nullifyFilePick = () => setFilePick({ show: false, files: [], customize: false, intoZip: false });

  useEffect(() => {
    // delete
    dispatch(onChooseFiles("global/all", "", 1, "", successLoad));
    // dispatch(onChooseFiles(STANDARD_LIBRARIES.EDUCATION.path, "", 1, "", successLoad, ""));
  }, []); //eslint-disable-line
  return (
    <>
      <div
        className={`${styles.workSpaceWrap} 
                ${
                  typeof listCollapsed === "boolean"
                    ? listCollapsed
                      ? styles.workSpaceWrapCollapsed
                      : styles.workSpaceWrapUncollapsed
                    : undefined
                }`}
        ref={containerRef}
      >
        <div className={styles.header}>
          <SearchField />
          <div className={styles.infoHeader}>
            <StorageSize />
            <Notifications />
            <Profile />
          </div>
        </div>
        <ServePanel
          view={workElementsView}
          chosenFile={chosenFile}
          setAction={setAction}
          fileSelect={fileSelect}
          addFile={fileSelect}
          chooseSeveral={() => setFilePick({ ...filePick, files: [], show: !filePick.show })}
          filePick={filePick}
          fileAddCustomization={fileAddCustomization}
          setFileAddCustomization={setFileAddCustomization}
          // setGLoader={setGLoader}
          setFilesPage={setFilesPage}
          menuItem={menuItem}
        />
        <ItemsList
          setGLoader={setGLoader}
          setFilesPage={setFilesPage}
          setChosenFile={setChosenFile}
          filePick={filePick}
          setMouseParams={setMouseParams}
          setAction={setAction}
          setFilePreview={setFilePreview}
          filePreview={filePreview}
          setFilePick={setFilePick}
          chosenFile={chosenFile}
          fileSelect={fileSelect}
          filesPage={filesPage}
          gLoader={gLoader}
          fileRef={fileRef}
          width={width}
          successLoad={successLoad}
        />
        {filePick.show ? (
          <OptionButtomLine
            filePick={filePick}
            actionName={filePick.intoZip ? __("Сжать в Zip") : __("Редактировать")}
            setAction={setAction}
            action={action}
            nullifyFilePick={nullifyFilePick}
            chosenFile={chosenFile}
            menuItem={menuItem}
            filesPage={filesPage}
          />
        ) : null}
        {mouseParams !== null && mouseParams?.width && mouseParams?.height ? (
          <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
            <ContextMenuFileList
              filePick={filePick}
              file={chosenFile}
              mouseParams={mouseParams}
              filesPage={filesPage}
              menuItem={menuItem}
            />
          </ContextMenu>
        ) : null}
        <BottomPanel />
      </div>
    </>
  );
}

export default WorkSpace;

WorkSpace.propTypes = {
  listCollapsed: PropTypes.bool,
  menuItem: PropTypes.string,
  setFilesPage: PropTypes.func,
  fileSelect: PropTypes.func,
  filesPage: PropTypes.number,
  fileAddCustomization: fileAddCustomizationProps,
  setFileAddCustomization: PropTypes.func,
  setFilePreview: PropTypes.func,
  filePreview: filePreviewProps,
  gLoader: PropTypes.bool,
  setGLoader: PropTypes.func,
  successLoad: PropTypes.func
};
