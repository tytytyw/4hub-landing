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
  CONTEXT_MENU_MODAL: "contextMenuModals",
  FILE_ACCESS_RIGHTS: "fileAccessRights"
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
  FILES_USER_SHARED: "file_share_mylist", // used for fileList endPoint
  FILES_SHARED_TO_USER: "file_share_get", // used for fileList endPoint
  API_FILES_USER_SHARED_AMOUNT: "/ajax/file_share_mylist_col.php",
  API_FILES_SHARED_TO_USER_AMOUNT: "/ajax/file_share_list_col.php",
  API_USERLIST_FILES_USER_SHARED: "/ajax/file_share_list.php"
};
