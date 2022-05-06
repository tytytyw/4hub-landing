import React from "react";
import styles from "../FileLine.module.sass";
import classNames from "classnames";

import { ReactComponent as DownLoadIcon } from "../../../../../../assets/PrivateCabinet/download.svg";
import { ReactComponent as PrintIcon } from "../../../../../../assets/PrivateCabinet/print.svg";
import { ReactComponent as SettingsIcon } from "../../../../../../assets/PrivateCabinet/settings.svg";
import { ReactComponent as DeleteIcon } from "../../../../../../assets/PrivateCabinet/delete.svg";
import { ReactComponent as ShareIcon } from "../../../../../../assets/PrivateCabinet/share.svg";
import { ReactComponent as ZipIcon } from "../../../../../../assets/PrivateCabinet/zip.svg";
import { useLocation } from "react-router";
import { useLocales } from "react-localized";
import { useDispatch, useSelector } from "react-redux";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";
import { CONTEXT_MENU_FILE, MODALS } from "../../../../../../generalComponents/globalVariables";
import { share_types } from "../../../ContextMenuComponents/ContextMenuFileList";

import PropTypes from "prop-types";
import { fileProps } from "../../../../../../types/WorkElements";

const Buttons = ({
  file,
  // callbackArrMain, TODO - Need to delete after testing in folders, files, safe, download-files, archive
  setAction,
  openFolderMenu,
  setMouseParams
}) => {
  const { __ } = useLocales();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const contextMenuModals = useSelector((s) => s.Cabinet.modals.contextMenuModals);
  const authorizedSafe = useSelector((state) => state.Cabinet.safe.authorizedSafe);

  const downloadFile = () => {
    // TODO - api for downloading folder
    if (file?.is_dir === 0) {
      dispatch(
        onSetModals(MODALS.CONTEXT_MENU_MODAL, {
          ...contextMenuModals,
          type: CONTEXT_MENU_FILE.DOWNLOAD_FILE,
          items: [file],
          authorizedSafe
        })
      );
    }
  };

  const printFile = () => {
    dispatch(
      onSetModals(MODALS.CONTEXT_MENU_MODAL, {
        ...contextMenuModals,
        type: CONTEXT_MENU_FILE.PRINT_FILE,
        items: [file],
        authorizedSafe
      })
    );
  };

  const onPropertiesFile = () => {
    dispatch(
      onSetModals(MODALS.CONTEXT_MENU_MODAL, {
        ...contextMenuModals,
        type: CONTEXT_MENU_FILE.FILE_PROPERTY,
        items: [file]
      })
    );
  };

  const onShareFile = () => {
    dispatch(
      onSetModals(MODALS.SHARE, {
        open: true,
        fids: file,
        action_type: file.is_dir === 1 ? "dir_access_add" : share_types[pathname.split("/")[1]],
        file
      })
    );
  };

  const renderDownloadBtn = () => (
    <div className={styles.iconView}>
      <DownLoadIcon onClick={downloadFile} />
    </div>
  );

  const renderPrintBtn = () =>
    file?.ext !== "ZIP" && file?.is_dir !== 1 ? (
      <div className={styles.iconView}>
        <PrintIcon onClick={printFile} />
      </div>
    ) : (
      <div className={classNames(styles.iconView, styles.hidden)}></div>
    );

  const renderSettingBtn = () => (
    <div
      className={classNames({
        [styles.iconView]: true,
        [styles.iconSettings]: true,
        [styles.disable]: file?.is_write === "0"
      })}
    >
      <SettingsIcon onClick={file?.is_write === "0" ? null : onPropertiesFile} />
    </div>
  );
  const renderDeleteBtn = () => (
    <div
      className={classNames(styles.iconView, styles.iconTrash)}
      onClick={() =>
        setAction({
          type: "delete",
          name: __("Удаление файла"),
          text: __(`Вы действительно хотите удалить файл ${file?.name}?`)
        })
      }
    >
      <DeleteIcon />
    </div>
  );
  const renderShareBtn = () => (
    <div className={classNames(styles.iconView, styles.iconShare)}>
      <ShareIcon onClick={onShareFile} />
    </div>
  );

  const renderIntoZipBtn = () => (
    <div
      className={classNames(styles.iconView)}
      onClick={() => {
        dispatch(
          onSetModals(MODALS.CONTEXT_MENU_MODAL, {
            ...contextMenuModals,
            type: CONTEXT_MENU_FILE.CREATE_ZIP,
            items: [file],
            title: __("Сжать в ZIP")
          })
        );
      }}
    >
      <ZipIcon />
    </div>
  );

  const renderContextMenuBtn = () => (
    <div
      className={styles.menuWrap}
      onClick={(e) => {
        file?.is_dir
          ? openFolderMenu(e, file)
          : setMouseParams({
              x: e.clientX,
              y: e.clientY,
              width: 240,
              height: 25
            });
      }}
    >
      <span className={styles.menu} />
    </div>
  );

  const renderMyFilesButtons = () => (
    <>
      {renderPrintBtn()}
      {renderDownloadBtn()}
      {renderSettingBtn()}
      {renderDeleteBtn()}
      {renderShareBtn()}
      {renderContextMenuBtn()}
    </>
  );

  const renderArchiveButtons = () => (
    <>
      {renderPrintBtn()}
      {renderDownloadBtn()}
      {renderDeleteBtn()}
      {renderShareBtn()}
    </>
  );

  const renderSharedFilesButtons = () => (
    <>
      {renderPrintBtn()}
      {renderShareBtn()}
    </>
  );

  const renderMyDownloadedFileButtons = () => (
    <>
      {renderPrintBtn()}
      {renderDownloadBtn()}
      {renderSettingBtn()}
      {renderContextMenuBtn()}
    </>
  );

  const renderCartButtons = () => (
    <>
      {renderDownloadBtn()}
      {renderPrintBtn()}
      {renderIntoZipBtn()}
      {renderDeleteBtn()}
      {renderShareBtn()}
    </>
  );

  return (
    <div className={styles.optionsWrap}>
      {pathname.startsWith("/folders") && renderMyFilesButtons()}
      {pathname.startsWith("/files") && renderMyFilesButtons()}
      {pathname.startsWith("/safe") && renderMyFilesButtons()}
      {pathname.startsWith("/downloaded-files") && renderMyDownloadedFileButtons()}
      {pathname.startsWith("/archive") && renderArchiveButtons()}
      {pathname.startsWith("/shared-files") && renderSharedFilesButtons()}
      {pathname.startsWith("/cart") && renderCartButtons()}
    </div>
  );
};

export default Buttons;

Buttons.propTypes = {
  file: fileProps,
  setAction: PropTypes.func,
  openFolderMenu: PropTypes.func,
  setMouseParams: PropTypes.func
};
