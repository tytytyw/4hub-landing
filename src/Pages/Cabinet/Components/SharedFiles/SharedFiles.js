import React, { useEffect, useRef, useState } from "react";

import styles from "./SharedFiles.module.sass";
import SearchField from "../SearchField";
import StorageSize from "../StorageSize";
import Notifications from "../Notifications";
import Profile from "../Profile/Profile";
import ServePanel from "../ServePanel";
import { useDispatch, useSelector } from "react-redux";
import BottomPanel from "../BottomPanel";
import {
  onGetSharedFiles,
  onSetModals,
  onSetWorkElementsView
} from "../../../../Store/actions/CabinetActions";
import SideMenu from "./SideMenu/SideMenu";
// import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import {
  MODALS,
  SHARED_FILES
} from "../../../../generalComponents/globalVariables";
import ItemsList from "../WorkElements/ItemsList/ItemsList";
import { useElementResize } from "../../../../generalComponents/Hooks";

const SharedFiles = ({ setMenuItem, setFilesPage, filesPage }) => {
  // const { __ } = useLocales();
  const [sideMenuChosenItem, setSideMenuChosenItem] = useState(
    SHARED_FILES.FILES_USER_SHARED
  );
  const [sideMenuCollapsed, setSideMenuCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [chosenFile, setChosenFile] = useState(null);
  const dispatch = useDispatch();
  const [filePick, setFilePick] = useState({ show: false, files: [] });
  const setGLoader = value => dispatch(onSetModals(MODALS.LOADER, value));
  const gLoader = useSelector(s => s.Cabinet.modals.loader);
  const fileRef = useRef(null);
  const [containerRef, width] = useElementResize();
  const fileView = useSelector(s => s.Cabinet.view);
  const [view, setView] = useState({ prev: "", cur: "lines" });

  useEffect(() => {
    setMenuItem("SharedFiles");
    dispatch(onGetSharedFiles(SHARED_FILES.FILES_USER_SHARED, ""));
    setView(s => ({ ...s, prev: fileView }));
    dispatch(onSetWorkElementsView(view.cur));
    setFilesPage(0);
    return () => {
      setMenuItem("");
      dispatch(onSetWorkElementsView(view.prev));
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    if (filePick.customize) {
      setFilePick({
        show: true,
        files: filePick?.files,
        customize: true
      });
    }
  }, [filePick.customize]); // eslint-disable-line

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <SideMenu
        sideMenuCollapsed={sideMenuCollapsed}
        setSideMenuCollapsed={setSideMenuCollapsed}
        search={search}
        setSearch={setSearch}
        sideMenuChosenItem={sideMenuChosenItem}
        setSideMenuChosenItem={setSideMenuChosenItem}
        // renderFilesGroup={renderFilesGroup}
      />

      <div className={styles.workAreaWrap}>
        <div className={styles.header}>
          <SearchField />
          <div className={styles.infoHeader}>
            <StorageSize />
            <Notifications />
            <Profile />
          </div>
        </div>

        <ServePanel
          chooseSeveral={() =>
            setFilePick({ ...filePick, files: [], show: !filePick.show })
          }
          filePick={filePick}
        />
        <div
          className={styles.workSpace}
          style={{
            height: `${
              filePick.show
                ? "calc(100% - 90px - 55px - 80px)"
                : "calc(100% - 90px - 55px)"
            }`
          }}
        >
          <ItemsList
            setGLoader={setGLoader}
            setFilesPage={setFilesPage}
            setChosenFile={setChosenFile}
            filePick={filePick}
            setFilePick={setFilePick}
            chosenFile={chosenFile}
            filesPage={filesPage}
            gLoader={gLoader}
            fileRef={fileRef}
            width={width}
          />
        </div>
        <BottomPanel />
      </div>
    </div>
  );
};

export default SharedFiles;

SharedFiles.propTypes = {
  setMenuItem: PropTypes.func,
  setFilesPage: PropTypes.func,
  filesPage: PropTypes.number
};
