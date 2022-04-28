import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./WorkSpace.module.sass";
import BottomPanel from "../../BottomPanel";
import { useElementResize } from "../../../../../generalComponents/Hooks";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile/Profile";
import ServePanel from "../../ServePanel";
import { useSelector } from "react-redux";

function WorkSpace({ listCollapsed, menuItem, setFilesPage, fileSelect }) {
  const [containerRef] = useElementResize();
  const workElementsView = useSelector(s => s.Cabinet.view);
  const [chosenFile] = useState(null);
  const [filePick, setFilePick] = useState({
    show: false,
    files: [],
    customize: false,
    intoZip: false
  });

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
          // setAction={setAction}
          fileSelect={fileSelect}
          addFile={fileSelect}
          chooseSeveral={() =>
            setFilePick({ ...filePick, files: [], show: !filePick.show })
          }
          filePick={filePick}
          // fileAddCustomization={fileAddCustomization}
          // setFileAddCustomization={setFileAddCustomization}
          // setGLoader={setGLoader}
          setFilesPage={setFilesPage}
          menuItem={menuItem}
        />
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
  fileSelect: PropTypes.func
};
