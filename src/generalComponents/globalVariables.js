export const imageSrc =
  process.env.REACT_APP_IMAGE_URL ?? `${window.location.origin}/`; //'https://fsimg.mh.net.ua/';
export const projectSrc =
  process.env.REACT_APP_URL ?? `${window.location.origin}/`; //'https://fs2.mh.net.ua'

export const MODALS = {
  ERROR: "error",
  SUCCESS: "success",
  LOADER: "loader",
  SHARE: "share",
  FILE_PREVIEW: "previewFile",
  FILE_PREVIEW_COMMENTS: "previewWithComments",
  PRINT_SCREEN: "printScreen",
  TOP_MESSAGE: "topMessage",
  CONTEXT_MENU_MODAL: "contextMenuModals"
};

export const CONTEXT_MENU_FILE = {
  CREATE_ZIP: "CreateZip",
  CUSTOMIZE_FILE: "CustomizeFile",
  COPY_LINK_SHARE: "CopyLinkShare",
  FILE_PROPERTY: "FileProperty",
  MOVE_TO_ARCHIVE: "MoveToArchive",
  DOWNLOAD_FILE: "DownloadFile",
  PRINT_FILE: "PrintFile",
  DELETE_FILE: "DeleteFile"
};

export const SHARED_FILES = {
  FILES_USER_SHARED: "sharedI",
  FILES_SHARED_TO_USER: "sharedMe"
};
