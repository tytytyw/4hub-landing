import React from "react";
import PropTypes from "prop-types";
import styles from "./WorkSpace.module.sass";
import BottomPanel from "../../BottomPanel";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile/Profile";
import WorkLine from "../WorkLine/WorkLine";
import WorkLinePreview from "../WorkLinePreview/WorkLinePreview";

// import ContextMenu from "../../../../../generalComponents/ContextMenu";
// import ContextMenuFileList from "../../ContextMenuComponents/ContextMenuFileList";

function WorkSpace() {
  return (
    <div className={styles.workSpaceWrap}>
      <div className={styles.header}>
        <SearchField />
        <div className={styles.infoHeader}>
          <StorageSize />
          <Notifications />
          <Profile />
        </div>
      </div>
      <div className={styles.workSpace}>
        <div className={styles.workLine}>
          <WorkLine />
        </div>
        <div className={styles.workLinePreview}>
          <WorkLinePreview />
        </div>
      </div>
      {/* {mouseParams !== null && mouseParams?.width && mouseParams?.height ? (
          <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
            <ContextMenuFileList
              filePick={filePick}
              file={chosenFile}
              mouseParams={mouseParams}
              filesPage={filesPage}
              menuItem={menuItem}
            />
          </ContextMenu>
        ) : null} */}
      <BottomPanel />
    </div>
  );
}

export default WorkSpace;

WorkSpace.propTypes = {
  listCollapsed: PropTypes.bool,
  menuItem: PropTypes.string,
  setFilesPage: PropTypes.func,
  fileSelect: PropTypes.func,
  filesPage: PropTypes.number,
  setFileAddCustomization: PropTypes.func,
  setFilePreview: PropTypes.func
};
