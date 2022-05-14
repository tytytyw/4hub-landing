export const imageSrc = process.env.REACT_APP_IMAGE_URL ?? `${window.location.origin}/`; //'https://fsimg.mh.net.ua/';
export const projectSrc = process.env.REACT_APP_URL ?? `${window.location.origin}/`; //'https://fs2.mh.net.ua'

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

export const TOP_MESSAGE_TYPE = {
  ERROR: "error",
  MESSAGE: "message"
};

export const FILE_ACCESS_RIGHTS = {
  API_SHARED_FILES_USER_LIST: "/ajax/file_share_list.php",
  API_DELETE_USER_ACCESS_RIGHTS: "/ajax/file_share_del.php",
  API_ADD_USER_ACCESS_RIGHTS: "/ajax/file_share.php"
};

export const SHARED_ACCESS_RIGHTS = {
  WATCH: "WATCH",
  EDIT: "EDIT",
  DOWNLOAD: "DOWNLOAD"
};

export const ACCESS_RIGHTS_GRANTED = "1";
export const ACCESS_RIGHTS_FORBIDDEN = "0";

export const NO_ELEMENT = -1;

export const TYPES = {
  DATE: "date",
  ARRAY: "array",
  STRING: "string",
  BOOLEAN: "boolean",
  NULL: "null"
};

export const MIDNIGHT = "00:00:00";

//CHAT
export const SIZE_SMALL = "small";
export const AUDIO_MESSAGE = "audio_message";
export const VIDEO_MESSAGE = "video_message";
export const PHOTO = "photo";
export const FILES = "files";
export const VOICE_MESSAGES = "voiceMessages";
export const MUSIC = "music";
export const LINKS = "links";
export const MEDIA = "media";
export const VIDEO = "video";
export const AUDIO = "audio";
export const GIF = "gif";
export const DOCS = "docs";
export const DARK = "dark";
export const MAIN = "main";
export const DELETE_CHAT_GROUP = "deleteChatGroup";
export const LEAVE_FROM_CHAT_GROUP = "leaveFromChatGroup";
export const CHECKBOX = "checkBox";
export const CONTEXT_MENU = "contextMenu";
