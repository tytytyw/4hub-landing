import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./ServePanel.module.sass";
import classNames from "classnames";
import PropTypes from "prop-types";

import {
  onChooseFiles,
  onGetArchiveFiles,
  onSetFileSize,
  onSortFile,
  onChangeFilterFigure,
  onChangeFilterEmoji,
  onChangeFilterColor,
  onSetReverseCriterion,
  onGetSafeFileList,
  onSetModals,
  onLoadFiles
} from "../../../../Store/actions/CabinetActions";
import { imageSrc, LIBRARY, LOADING_STATE, VIEW_TYPE } from "../../../../generalComponents/globalVariables";
import { onSetWorkElementsView } from "../../../../Store/actions/CabinetActions";
import { ReactComponent as BarsIcon } from "../../../../assets/PrivateCabinet/bars.svg";
import { ReactComponent as LinesIcon } from "../../../../assets/PrivateCabinet/lines.svg";
import { ReactComponent as PreviewIcon } from "../../../../assets/PrivateCabinet/preview.svg";
import { ReactComponent as VerticalLinesIcon } from "../../../../assets/PrivateCabinet/vertical-lines.svg";
import { ReactComponent as MenuIcon } from "../../../../assets/PrivateCabinet/menu.svg";
import { ReactComponent as SafeIcon } from "../../../../assets/PrivateCabinet/safe.svg";
import { ReactComponent as ShareIcon } from "../../../../assets/PrivateCabinet/share.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/PrivateCabinet/delete.svg";
import { ReactComponent as PowerOffIcon } from "../../../../assets/PrivateCabinet/powerOff.svg";
import { ReactComponent as FileSize } from "../../../../assets/PrivateCabinet/file_size.svg";
import { ReactComponent as AddFolderIcon } from "../../../../assets/PrivateCabinet/add_folder.svg";
import { useContextMenuCreateFile, useContextMenuFilters } from "../../../../generalComponents/collections";
import ContextMenu from "../../../../generalComponents/ContextMenu";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import Colors from "../../../../generalComponents/Elements/Colors";
import Signs from "../../../../generalComponents/Elements/Signs";
import Emoji from "../../../../generalComponents/Elements/Emoji";
import { useLocation } from "react-router";
import { useWindowSize } from "../../../../generalComponents/Hooks";
import { share_types } from "../ContextMenuComponents/ContextMenuFileList";
import { useLocales } from "react-localized";
import { filePickProps, fileProps, fileAddCustomizationProps } from "../../../../types/File";
import { deviceProps, contactProps } from "../../../../types/Device";

const ServePanel = ({
  chosenFile,
  chooseSeveral,
  filePick,
  setFileAddCustomization,
  fileAddCustomization,
  disableWorkElementsView,
  addFolder,
  addFile,
  setGLoader,
  setNewFolderInfo,
  setFilesPage,
  dateFilter
}) => {
  const { __ } = useLocales();
  const contextMenuCreateFile = useContextMenuCreateFile();
  const contextMenuFilters = useContextMenuFilters();
  const [, height] = useWindowSize();
  const [mouseParams, setMouseParams] = useState(null);
  const [typeContext, setTypeContext] = useState("");
  const filterRef = useRef();
  const createRef = useRef();
  const size = useSelector((state) => state.Cabinet.size);
  const view = useSelector((state) => state.Cabinet.view);
  const search = useSelector((state) => state.Cabinet.search);
  const fileCriterion = useSelector((state) => state.Cabinet.fileCriterion);
  const fileList = useSelector((state) => state.Cabinet.fileList);
  const authorizedSafe = useSelector((state) => state.Cabinet.safe.authorizedSafe);
  const contextMenuModals = useSelector((state) => state.Cabinet.modals.contextMenuModals);
  const dispatch = useDispatch();

  const { pathname } = useLocation();

  const changeSize = (s) => {
    const sizes = window.innerHeight > 693 ? ["small", "medium", "big"] : ["small", "medium"];
    if (s === sizes[sizes.length - 1]) return sizes[0];
    return sizes[sizes.indexOf(s) + 1];
  };
  useEffect(() => {
    if (height <= 693 && size === "big") dispatch(onSetFileSize("medium"));
  }, [height]); //eslint-disable-line

  const openContextMenu = (e, type) => {
    const width = type === "createFile" ? 215 : 180;
    const height = type === "createFile" ? 35 : 30;
    setMouseParams({ x: e.clientX, y: e.clientY, width, height });
    setTypeContext(type);
  };

  const setFilter = (sorting) => {
    const type = view === VIEW_TYPE.LINES_PREVIEW ? LOADING_STATE.LOAD_NEXT_COLUMN : LOADING_STATE.LOADING;
    if (setGLoader) setGLoader(true);
    dispatch(onSortFile(sorting));
    if (pathname === "/folders") dispatch(onChooseFiles(fileList.path, search, 1, "", setGLoader, pathname));
    if (pathname === "/archive") dispatch(onGetArchiveFiles(search, 1, "", setGLoader, "", dateFilter, pathname));
    if (pathname === "/cart")
      dispatch(onChooseFiles(fileList.path, search, 1, "", setGLoader, "", "trash_list", pathname));
    if (pathname.includes("files"))
      dispatch(onChooseFiles(fileList.path, search, 1, "", setGLoader, "", "file_list_all", pathname));
    if (pathname === "/safe") {
      dispatch(
        onGetSafeFileList(
          authorizedSafe.code,
          authorizedSafe.id_safe,
          authorizedSafe.password,
          "",
          "",
          "",
          search,
          1,
          ""
        )
      );
    }
    if (pathname.startsWith("/library")) {
      dispatch(onLoadFiles(LIBRARY.API_GET_FILES, 1, type));
    }
    if (setFilesPage) setFilesPage(2);
  };

  const createFile = (ext) => {
    const file = {
      file: { name: `No Name.${ext}`, size: 0 },
      options: {}
    };
    setFileAddCustomization({
      ...fileAddCustomization,
      show: true,
      file,
      create: true
    });
    setTypeContext("");
  };

  const renderMenuItems = (target, callback, src) => {
    return target.map((item, i) => {
      return (
        <ContextMenuItem
          key={i}
          width={mouseParams.width}
          height={mouseParams.height}
          text={item.name}
          imageSrc={src ? `${src + item.img}.svg` : ""}
          callback={
            item?.ext
              ? () => {
                  callback(item.ext);
                }
              : ""
          }
        />
      );
    });
  };

  const renderSortingItems = (target, callback) =>
    target.map((item, i) => {
      return pathname !== "/archive" && item.name === __("По дате архивирования") ? (
        ""
      ) : (
        <div onClick={() => callback(item.ext)} className={styles.contextSortingItem} key={i}>
          <div className={styles.chosen}>
            {item.ext === fileCriterion.sorting ? (
              <img src={`${imageSrc}assets/PrivateCabinet/check.svg`} alt="check" />
            ) : null}
          </div>
          <div>{fileCriterion.reverse[item.ext] ? item.reverseName : item.name}</div>
          {item.ext === "byName" ? (
            <div className={styles.switch} onClick={() => dispatch(onSetReverseCriterion(item.ext))}>
              <img src={`${imageSrc}assets/PrivateCabinet/vectors.svg`} alt="img" />
            </div>
          ) : null}
        </div>
      );
    });

  const setFigure = (value) => {
    const type = view === VIEW_TYPE.LINES_PREVIEW ? LOADING_STATE.LOAD_NEXT_COLUMN : LOADING_STATE.LOADING;
    dispatch(onChangeFilterFigure(value));
    if (pathname === "/folders") dispatch(onChooseFiles(fileList.path, search, 1, "", "", pathname));
    if (pathname === "/archive") dispatch(onGetArchiveFiles(search, 1, "", setGLoader, "", dateFilter, pathname));
    if (pathname === "/cart") dispatch(onChooseFiles(fileList.path, search, 1, "", "", "", "trash_list", pathname));
    if (pathname.includes("files"))
      dispatch(onChooseFiles(fileList.path, search, 1, "", "", "", "file_list_all", pathname));
    if (pathname === "/safe") {
      dispatch(
        onGetSafeFileList(
          authorizedSafe.code,
          authorizedSafe.id_safe,
          authorizedSafe.password,
          "",
          "",
          "",
          search,
          1,
          ""
        )
      );
    }
    if (pathname.startsWith("/library")) {
      dispatch(onLoadFiles(LIBRARY.API_GET_FILES, 1, type));
    }
    if (setFilesPage) setFilesPage(2);
  };
  const setColor = (value) => {
    const type = view === VIEW_TYPE.LINES_PREVIEW ? LOADING_STATE.LOAD_NEXT_COLUMN : LOADING_STATE.LOADING;
    dispatch(onChangeFilterColor(value));
    if (pathname === "/folders") dispatch(onChooseFiles(fileList.path, search, 1, "", "", pathname));
    if (pathname === "/archive") dispatch(onGetArchiveFiles(search, 1, "", setGLoader, "", dateFilter, pathname));
    if (pathname === "/cart")
      dispatch(onChooseFiles(fileList.path, search, 1, "", setGLoader, "", "trash_list", pathname));
    if (pathname.includes("files"))
      dispatch(onChooseFiles(fileList.path, search, 1, "", "", "", "file_list_all", pathname));
    if (pathname === "/safe") {
      dispatch(
        onGetSafeFileList(
          authorizedSafe.code,
          authorizedSafe.id_safe,
          authorizedSafe.password,
          "",
          "",
          "",
          search,
          1,
          ""
        )
      );
    }
    if (pathname.startsWith("/library")) {
      dispatch(onLoadFiles(LIBRARY.API_GET_FILES, 1, type));
    }
    if (setFilesPage) setFilesPage(2);
  };
  const setEmoji = (value) => {
    const type = view === VIEW_TYPE.LINES_PREVIEW ? LOADING_STATE.LOAD_NEXT_COLUMN : LOADING_STATE.LOADING;
    dispatch(onChangeFilterEmoji(value));
    if (pathname === "/folders") dispatch(onChooseFiles(fileList.path, search, 1, "", "", pathname));
    if (pathname === "/archive") dispatch(onGetArchiveFiles(search, 1, "", setGLoader, "", dateFilter, pathname));
    if (pathname === "/cart") dispatch(onChooseFiles(fileList.path, search, 1, "", "", "", "trash_list", pathname));
    if (pathname.includes("files"))
      dispatch(onChooseFiles(fileList.path, search, 1, "", "", "", "file_list_all", pathname));
    if (pathname === "/safe") {
      dispatch(
        onGetSafeFileList(
          authorizedSafe.code,
          authorizedSafe.id_safe,
          authorizedSafe.password,
          "",
          "",
          "",
          search,
          1,
          ""
        )
      );
    }
    if (pathname.startsWith("/library")) {
      dispatch(onLoadFiles(LIBRARY.API_GET_FILES, 1, type));
    }
    if (setFilesPage) setFilesPage(2);
  };

  const tempChoose = () => (
    <span className={filePick?.show ? styles.chooseButtonActive : styles.chooseButton} onClick={chooseSeveral}>
      {__("Выбрать")}
    </span>
  );

  const tempFilter = () => (
    <div
      ref={filterRef}
      className={classNames(styles.iconView, styles.iconViewArrow)}
      onClick={(e) => openContextMenu(e, "filter")}
    >
      <MenuIcon className={styles.iconSVG} />
      <div />
    </div>
  );

  const tempDownload = () => (
    <label className={styles.downloadButton} onClick={addFile}>
      {__("Загрузить")}
    </label>
  );

  const tempTabs = () =>
    !disableWorkElementsView && (
      <div className={styles.viewPanel}>
        <div
          onClick={() => dispatch(onSetWorkElementsView("bars"))}
          className={`${view === "bars" ? styles.iconViewChosen : styles.iconView}`}
        >
          <BarsIcon />
        </div>
        <div
          onClick={() => dispatch(onSetWorkElementsView("lines"))}
          className={`${view === "lines" ? styles.iconViewChosen : styles.iconView}`}
        >
          <LinesIcon />
        </div>
        <div
          onClick={() => dispatch(onSetWorkElementsView("preview"))}
          className={`${view === "preview" ? styles.iconViewChosen : styles.iconView}`}
        >
          <PreviewIcon />
        </div>
        <div
          onClick={() => dispatch(onSetWorkElementsView("workLinesPreview"))}
          className={`${view === "workLinesPreview" ? styles.iconViewChosen : styles.iconView}`}
        >
          <VerticalLinesIcon />
        </div>
      </div>
    );

  const tempSize = () => (
    <div
      onClick={() => dispatch(onSetFileSize(changeSize(size)))}
      className={`
                ${styles.iconView} 
                ${styles.iconSize} 
                ${size === "small" ? styles.samllSize : null} 
                ${size === "medium" ? styles.mediumSize : null} 
                ${size === "big" ? styles.bigSize : null} 
            `}
    >
      <FileSize className={styles.iconSVG} />
    </div>
  );

  const tempCreate = () => (
    <div ref={createRef} className={styles.createButton} onClick={(e) => openContextMenu(e, "createFile")}>
      <span>{__("Создать")}</span>
      <div />
    </div>
  );

  const tempAdd = () =>
    addFolder && (
      <div
        onClick={() => {
          addFolder(true);
          if (setNewFolderInfo) setNewFolderInfo((s) => ({ ...s, path: fileList?.path }));
        }}
        className={classNames(styles.iconView, styles.addIcon)}
      >
        <AddFolderIcon className={styles.iconSVG} />
      </div>
    );

  const tempDelete = () => (
    <div
      className={`${chosenFile ? styles.iconView : styles.iconDisabled}`}
      onClick={() => {
        if (chosenFile) {
          dispatch(
            onSetModals("contextMenuModals", {
              ...contextMenuModals,
              type: "DeleteFile",
              items: filePick.show ? filePick.files : [chosenFile],
              filePick
            })
          );
        }
      }}
    >
      <DeleteIcon className={styles.iconTrash} />
    </div>
  );

  const tempDisconnect = () => (
    <div
      className={`${chosenFile ? styles.iconView : styles.iconDisabled}`}
      onClick={() => console.log("click on disconnect btn")}
    >
      <PowerOffIcon className={styles.iconTrash} />
    </div>
  );

  const tempShare = () => (
    <div
      className={`${chosenFile ? styles.iconView : styles.iconDisabled}`}
      onClick={() => {
        if (chosenFile) {
          dispatch(
            onSetModals("share", {
              open: true,
              fids: filePick.show ? filePick.files : chosenFile,
              action_type: chosenFile.is_dir === 1 ? "dir_access_add" : share_types[pathname.split("/")[1]],
              file: chosenFile
            })
          );
        }
      }}
    >
      <ShareIcon className={styles.iconShare} />
    </div>
  );

  const tempArchive = () => (
    <div
      className={`${chosenFile ? styles.iconView : styles.iconDisabled}`}
      onClick={() => {
        if (chosenFile) {
          dispatch(
            onSetModals("contextMenuModals", {
              ...contextMenuModals,
              type: "MoveToArchive",
              items: filePick.files,
              filePick
            })
          );
        }
      }}
    >
      <SafeIcon className={styles.iconSafe} />
    </div>
  );

  const renderInFolders = () => (
    <>
      <div className={styles.groupStart}>
        {tempTabs()}
        <div className={styles.filterPanel}>
          {tempSize()} {tempFilter()} {tempChoose()} {tempAdd()}
        </div>
      </div>
      <div className={styles.groupEnd}>
        <div className={styles.buttons}>
          {tempCreate()} {tempDownload()}
        </div>
        <div className={styles.iconButtons}>
          {tempArchive()} {tempShare()} {tempDelete()}
        </div>
      </div>
    </>
  );

  const renderInArchive = () => (
    <>
      <div className={styles.groupStart}>
        {tempTabs()}
        <div className={styles.filterPanel}>
          {tempSize()} {tempFilter()} {tempChoose()} {tempAdd()}
        </div>
      </div>
      <div className={styles.groupEnd}>
        <div className={styles.iconButtons}>
          {tempShare()} {tempDelete()}
        </div>
      </div>
    </>
  );

  const renderInSafe = () => {
    return authorizedSafe ? (
      <>
        <div className={styles.groupStart}>
          {tempTabs()}
          <div className={styles.filterPanel}>
            {tempSize()} {tempFilter()} {tempChoose()} {tempAdd()}
          </div>
        </div>
        <div className={styles.groupEnd}>
          <div className={styles.buttons}>
            {tempCreate()} {tempDownload()}
          </div>
          <div className={styles.iconButtons}>
            {tempArchive()} {tempShare()} {tempDelete()}
          </div>
        </div>
      </>
    ) : (
      <div className={styles.groupStart}>
        <div className={styles.filterPanel}>{tempSize()}</div>
      </div>
    );
  };

  const renderInDevices = () => (
    <>
      <div className={styles.groupStart}>
        <div className={styles.filterPanel}>
          {tempSize()} {tempChoose()}
        </div>
      </div>
      <div className={styles.groupEnd}>
        <div className={styles.iconButtons}>{tempDisconnect()}</div>
      </div>
    </>
  );

  const renderInPrograms = () => (
    <>
      <div className={styles.groupStart}>
        {tempTabs()}
        <div className={styles.filterPanel}>
          {tempSize()} {tempFilter()} {tempChoose()} {tempAdd()}
        </div>
      </div>
    </>
  );

  const renderInSharedFiles = () => (
    <>
      <div className={styles.groupStart}>
        <div className={styles.filterPanel}>
          {tempFilter()} {tempChoose()}
        </div>
      </div>
    </>
  );

  const renderInProject = () => (
    <>
      <div className={styles.groupStart}>
        <div className={styles.filterPanel}>
          {tempSize()} {disableWorkElementsView ? tempFilter() : null} {disableWorkElementsView ? tempChoose() : null}{" "}
          {disableWorkElementsView ? tempAdd() : null}
        </div>
      </div>
      {disableWorkElementsView ? (
        <div className={styles.groupEnd}>
          <div className={styles.buttons}>
            {tempCreate()} {tempDownload()}
          </div>
          <div className={styles.iconButtons}>
            {tempArchive()} {tempShare()} {tempDelete()}
          </div>
        </div>
      ) : null}
    </>
  );

  const renderInLibrary = () => (
    <>
      <div className={styles.groupStart}>
        {tempTabs()}
        <div className={styles.filterPanel}>
          {tempSize()} {tempFilter()} {tempChoose()} {tempAdd()}
        </div>
      </div>
      <div className={styles.groupEnd}>
        <div className={styles.iconButtons}>
          {tempArchive()} {tempShare()} {tempDelete()}
        </div>
      </div>
    </>
  );

  const renderInCart = () => (
    <>
      <div className={styles.groupStart}>
        {tempTabs()}
        <div className={styles.filterPanel}>
          {tempSize()} {tempFilter()} {tempChoose()} {tempAdd()}
        </div>
      </div>
      <div className={styles.groupEnd}>
        <div className={styles.iconButtons}>
          {tempArchive()} {tempShare()} {tempDelete()}
        </div>
      </div>
    </>
  );
  return (
    <div className={styles.servePanelWrap}>
      {pathname.startsWith("/folders") && renderInFolders()}
      {pathname.startsWith("/files") && renderInFolders()}
      {pathname.startsWith("/devices") && renderInDevices()}
      {pathname.startsWith("/programs") && renderInPrograms()}
      {pathname.startsWith("/safe") && renderInSafe()}
      {pathname.startsWith("/project") && renderInProject()}
      {pathname.startsWith("/shared-files") && renderInSharedFiles()}
      {pathname.startsWith("/downloaded-files") && renderInSharedFiles()}
      {pathname.startsWith("/archive") && renderInArchive()}
      {pathname.startsWith("/library") && renderInLibrary()}
      {pathname.startsWith("/cart") && renderInCart()}

      {mouseParams !== null ? (
        <ContextMenu
          params={mouseParams}
          setParams={setMouseParams}
          itemRef={typeContext === "createFile" ? createRef : filterRef}
          customClose={typeContext !== "createFile"}
        >
          {typeContext === "filter" ? <div>{renderSortingItems(contextMenuFilters.main, setFilter)}</div> : null}
          {typeContext === "filter" ? (
            <Colors color={fileCriterion.filters.color} setColor={setColor} title="По цвету" editableClass="minify" />
          ) : null}
          {typeContext === "filter" ? (
            <Signs sign={fileCriterion.filters.figure} setSign={setFigure} title="По значкам" editableClass="minify" />
          ) : null}
          {typeContext === "filter" ? (
            <Emoji emoji={fileCriterion.filters.emoji} setEmoji={setEmoji} title="По эмоджи" editableClass="minify" />
          ) : null}
          {typeContext === "createFile" ? (
            <div className={styles.createFileGroup}>
              {renderMenuItems(
                contextMenuCreateFile.other,
                createFile,
                `${imageSrc}assets/PrivateCabinet/contextMenuCreateFile/`
              )}
            </div>
          ) : null}
          {typeContext === "createFile" ? (
            <div className={styles.createFileGroup}>
              {renderMenuItems(
                contextMenuCreateFile.microsoft,
                createFile,
                `${imageSrc}assets/PrivateCabinet/contextMenuCreateFile/`
              )}
            </div>
          ) : null}
          {typeContext === "createFile" ? (
            <div className={styles.createFileGroupLast}>
              {renderMenuItems(
                contextMenuCreateFile.google,
                createFile,
                `${imageSrc}assets/PrivateCabinet/contextMenuCreateFile/`
              )}
            </div>
          ) : null}
        </ContextMenu>
      ) : null}
    </div>
  );
};

export default ServePanel;

ServePanel.propTypes = {
  chosenFile: PropTypes.oneOfType([deviceProps, contactProps, fileProps]),
  chooseSeveral: PropTypes.func,
  filePick: filePickProps,
  setFileAddCustomization: PropTypes.func,
  fileAddCustomization: fileAddCustomizationProps,
  disableWorkElementsView: PropTypes.bool,
  addFolder: PropTypes.func,
  addFile: PropTypes.func,
  setGLoader: PropTypes.func,
  setNewFolderInfo: PropTypes.func,
  setFilesPage: PropTypes.func,
  dateFilter: PropTypes.exact({
    y: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    d: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    m: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  })
};
