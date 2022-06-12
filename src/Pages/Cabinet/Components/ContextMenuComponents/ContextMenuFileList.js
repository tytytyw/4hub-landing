import React from "react";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import { CONTEXT_MENU_FILE, imageSrc, MODALS } from "../../../../generalComponents/globalVariables";
import { previewFormats } from "../../../../generalComponents/collections";
import { onSetModals } from "../../../../Store/actions/CabinetActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { fileProps, filePickProps } from "../../../../types/File";
import { mouseParamsProps } from "../../../../types/MouseParams";
import { fileCartRestore } from "generalComponents/fileMenuHelper";

export const share_types = {
  myFolders: "file_share",
  folders: "file_share",
  files: "file_share",
  "shared-files": "file_share"
};

function ContextMenuFileList({ file, filePick, mouseParams, filesPage, menuItem, authorizedSafe }) {
  const { __ } = useLocales();
  const copy_link_types = {
    myFolders: file?.is_dir === 1 ? "dir_access_add" : ""
  };
  const contextMenuModals = useSelector((s) => s.Cabinet.modals.contextMenuModals);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const filterContextMenu = (location, array) => {
    if (location === "archive") {
      return array.filter((item) => ["share", "download", "print"].includes(item.type));
    }
    if (location === "safe") {
      return array.filter((item) => !["share", "copyLink"].includes(item.type));
    }
    if (location === "cart") {
      return (array = [
        {
          type: "restore",
          img: "restore",
          name: __("Восстановить"),
          text: __(""),
          callback: () => {
            fileCartRestore(file.fid, dispatch, uid, __("Файл успешно восстановлен"), __);
          }
        }
      ]);
    }
    return array;
  };

  const callbackArrMain = filterContextMenu(pathname.split("/")[1], [
    {
      type: "share",
      img: "share",
      name: __("Расшарить"),
      text: __(""),
      callback: () => {
        dispatch(
          onSetModals(MODALS.SHARE, {
            open: true,
            fids: filePick.show ? filePick.files : file,
            action_type: file.is_dir === 1 ? "dir_access_add" : share_types[menuItem],
            file
          })
        );
      }
    },
    {
      type: "copyLink",
      img: "link-4",
      name: __("Скопировать ссылку"),
      text: __(""),
      callback: () => {
        dispatch(
          onSetModals(MODALS.CONTEXT_MENU_MODAL, {
            ...contextMenuModals,
            type: CONTEXT_MENU_FILE.COPY_LINK_SHARE,
            items: [file],
            action_type: copy_link_types[menuItem]
          })
        );
      }
    },
    {
      type: "customize",
      img: "edit",
      name: __("Редактировать файл"),
      text: __(""),
      callback: () => {
        dispatch(
          onSetModals(MODALS.CONTEXT_MENU_MODAL, {
            ...contextMenuModals,
            type: CONTEXT_MENU_FILE.CUSTOMIZE_FILE,
            items: filePick.show ? filePick.files : [file],
            title:
              contextMenuModals.items.length === 1 ? __("Редактирование файла") : __("Редактировать выбранные файлы"),
            filesPage,
            filePick,
            menuItem
          })
        );
      }
    },
    {
      type: "customizeSeveral",
      img: "editSeveral",
      name: __(`Ред. несколько файлов`),
      text: __(""),
      callback: () => {
        dispatch(
          onSetModals(MODALS.CONTEXT_MENU_MODAL, {
            ...contextMenuModals,
            type: CONTEXT_MENU_FILE.CUSTOMIZE_FILE,
            items: filePick.show ? filePick.files : [file],
            title: contextMenuModals.items.length === 1 ? "Редактирование файла" : __("Редактировать выбранные файлы"),
            filesPage,
            filePick,
            menuItem
          })
        );
      }
    },
    {
      type: "archive",
      img: "archive",
      name: __("Переместить в архив"),
      text: __(`Вы действительно хотите архивировать файл ${file?.name}?`),
      callback: () => {
        dispatch(
          onSetModals(MODALS.CONTEXT_MENU_MODAL, {
            ...contextMenuModals,
            type: CONTEXT_MENU_FILE.MOVE_TO_ARCHIVE,
            items: [file],
            filePick
          })
        );
      }
    },
    {
      type: "intoZip",
      img: "zip",
      name: __("Сжать в ZIP"),
      text: __(""),
      callback: () => {
        dispatch(
          onSetModals(MODALS.CONTEXT_MENU_MODAL, {
            ...contextMenuModals,
            type: CONTEXT_MENU_FILE.CREATE_ZIP,
            items: filePick.show ? filePick.files : [file],
            title: __("Сжать в ZIP"),
            filesPage
          })
        );
      }
    },
    {
      type: "intoZipSeveral",
      img: "severalZip",
      name: __("Сжать несколько файлов в Zip"),
      text: __(""),
      callback: () => {
        dispatch(
          onSetModals(MODALS.CONTEXT_MENU_MODAL, {
            ...contextMenuModals,
            type: CONTEXT_MENU_FILE.CREATE_ZIP,
            items: filePick.show ? filePick.files : [file],
            title: __("Сжать в ZIP"),
            filesPage
          })
        );
      }
    },
    {
      type: "properties",
      img: "info",
      name: __("Свойства"),
      text: __(""),
      callback: () => {
        dispatch(
          onSetModals(MODALS.CONTEXT_MENU_MODAL, {
            ...contextMenuModals,
            type: CONTEXT_MENU_FILE.FILE_PROPERTY,
            items: [file]
          })
        );
      }
    },
    {
      type: "download",
      img: "download-blue",
      name: __("Скачать"),
      text: __(""),
      callback: () => {
        dispatch(
          onSetModals(MODALS.CONTEXT_MENU_MODAL, {
            ...contextMenuModals,
            type: CONTEXT_MENU_FILE.DOWNLOAD_FILE,
            items: [file],
            authorizedSafe
          })
        );
      }
    },
    {
      type: "print",
      img: "print-2",
      name: __("Печать"),
      text: __(""),
      callback: () => {
        dispatch(
          onSetModals(MODALS.CONTEXT_MENU_MODAL, {
            ...contextMenuModals,
            type: CONTEXT_MENU_FILE.PRINT_FILE,
            items: [file],
            authorizedSafe
          })
        );
      }
    }
  ]);

  const additionalMenuItems = [
    {
      type: "delete",
      img: "garbage",
      name: __("Удалить"),
      text: __(`Вы действительно хотите удалить файл ${file?.name}?`),
      callback: () => {
        dispatch(
          onSetModals("contextMenuModals", {
            ...contextMenuModals,
            type: "DeleteFile",
            items: filePick.show ? filePick.files : [file],
            filePick
          })
        );
      }
    }
  ];

  const excessItems = () => {
    if (filePick?.show) {
      return ["intoZip", "properties", "download", "print"];
    } else {
      if (file?.mime_type) {
        switch (file.mime_type.split("/")[0]) {
          case "image":
            return [];
          case "video":
            return ["print"];
          case "audio":
            return ["print"];
          case "application": {
            return file.mime_type === "application/x-compressed" ? ["print", "intoZip", "intoZipSeveral"] : [];
          }
          default:
            return ["print"];
        }
      }
      if (previewFormats.filter((ext) => file?.ext.toLowerCase().includes(ext))[0]) return [];
      return ["print"];
    }
  };

  const renderMenuItems = (target, type) => {
    const eItems = excessItems();
    let filteredMenu = [...target];
    filteredMenu.forEach((el, i, arr) => {
      eItems.forEach((excess) => {
        if (excess === el.type) delete arr[i];
      });
    });
    return filteredMenu.map((item, i) => {
      return (
        <ContextMenuItem
          key={i}
          width={mouseParams?.width}
          height={mouseParams?.height}
          text={item.name}
          callback={() =>
            type.forEach((el) => {
              if (el.type === item.type) {
                el.callback();
              }
            })
          }
          imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
        />
      );
    });
  };

  return (
    <>
      <div>{renderMenuItems(callbackArrMain, callbackArrMain)}</div>
      <div style={{ margin: "10px 0 10px 0" }}>{renderMenuItems(additionalMenuItems, additionalMenuItems)}</div>
    </>
  );
}

export default ContextMenuFileList;

ContextMenuFileList.propTypes = {
  file: fileProps,
  filePick: filePickProps,
  mouseParams: mouseParamsProps,
  filesPage: PropTypes.number,
  menuItem: PropTypes.string,
  authorizedSafe: PropTypes.exact({
    code: PropTypes.string,
    id_safe: PropTypes.string,
    password: PropTypes.string
  })
};

ContextMenuFileList.defaultProps = {
  file: {},
  authorizedSafe: null
};
