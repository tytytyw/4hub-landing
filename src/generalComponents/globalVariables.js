export const imageSrc = process.env.REACT_APP_IMAGE_URL ?? `${window.location.origin}/`; //'https://fsimg.mh.net.ua/';
export const projectSrc = process.env.REACT_APP_URL ?? `${window.location.origin}/`; //'https://fs2.mh.net.ua'

export const MODALS = {
  NO_MODAL: "",
  ERROR: "error",
  SUCCESS: "success",
  LOADER: "loader",
  SHARE: "share",
  FILE_PREVIEW: "previewFile",
  FILE_PREVIEW_COMMENTS: "previewWithComments",
  PRINT_SCREEN: "printScreen",
  TOP_MESSAGE: "topMessage",
  CONTEXT_MENU_MODAL: "contextMenuModals",
  FILE_ACCESS_RIGHTS: "fileAccessRights",
  TASKS: "taskModals",
  LIBRARY: "libraryModals",
  MAIL: "mailModals",
  CALENDAR: "calendarModals"
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
export const CONTEXT_MENU_FOLDER = {
  DELETE_FOLDER: "DeleteFolder"
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
  NULL: "null",
  UNDEFINED: "undefined",
  FUNCTION: "function"
};

export const MIDNIGHT = "00:00:00";

//CHAT
export const SIZE_SMALL = "small";
export const AUDIO_MESSAGE = "audio_message";
export const VIDEO_MESSAGE = "video_message";
export const PHOTO = "image";
export const FILES = "files";
export const VOICE_MESSAGES = "voiceMessages";
export const MUSIC = "music";
export const LINKS = "links";
export const MEDIA = "media";
export const VIDEO = "video";
export const AUDIO = "audio";
export const GIF = "gif";
export const DOCS = "application";
export const DARK = "dark";
export const MAIN = "main";
export const DELETE_CHAT_GROUP = "deleteChatGroup";
export const LEAVE_FROM_CHAT_GROUP = "leaveFromChatGroup";
export const CHECKBOX = "checkBox";
export const CONTEXT_MENU = "contextMenu";
export const LOCAL_CLIENT = "LOCAL_CLIENT";
export const CHAT_CALLROOM = {
  NO_CALL: "NO_CALL",
  OUTGOING_CALL: "OUTGOING_CALL",
  INCOMING_CALL: "INCOMING_CALL",
  VOICE_CALL: "VOICE_CALL",
  VIDEO_CALL: "VIDEO_CALL"
};

export const CHAT_CALLROOM_SOCKET_ACTION = "call_room";
export const CHAT_CALLROOM_ACTIONS = {
  JOIN: "JOIN",
  ASK_TO_CONNECT: "ASK_TO_CONNECT",
  LEAVE: "LEAVE",
  ADD_PEER: "ADD_PEER",
  REMOVE_PEER: "REMOVE_PEER",
  RELAY_SDP: "RELAY_SDP",
  RELAY_ICE: "RELAY_ICE",
  ICE_CANDIDIATE: "ICE_CANDIDIATE",
  SESSION_DESCRIPTION: "SESSION_DESCRIPTION",
  ACCEPT_CALL: "ACCEPT_CALL"
};

//Customable button
export const BUTTON_TYPES = {
  LIGHT_LONG: "light-long",
  SMALL: "small",
  LARGE: "large",
  FULL_WIDTH: "fullWidth",
  GREY: "grey",
  ICON: "icon",
  ROUND_GREY: "round-grey",
  ROUND_RED: "round-red",
  ROUND_GREEN: "round-green"
};

//CALENDAR && TASKS Component
export const TASK = {
  API_GET_TASKS: "task_get",
  API_GET_TASKS_CALENDAR: "task_calendar"
};

export const CALENDAR_MODALS = {
  ADD_TASK: "AddTask",
  EDIT_TASK: "EditTask",
  SUCCESS_ADD: "SuccessAdd"
};

// MY TASKS
export const TASK_TYPES = {
  TASK: "task",
  BIRTHDAY: "birthady",
  ONLINE_MEETING: "onlineMeetings",
  OFFLINE_MEETING: "offlineMeetings",
  REMINDER: "reminder",
  OTHER: "other",
  NOTES: "notes",
  MEETINGS: "meetings",
  CALLS: "calls",
  MAILS: "mails"
};
export const URGENCY_TYPES = {
  URGENT: "urgent",
  PLANNED: "planned"
};

export const STATUS_TYPES = {
  DONE: "done",
  IN_PROGRESS: "inProgress",
  CLARIFICATION: "clarification",
  NOT_DONE: "notDone",
  DEFAULT: "default"
};
export const BOARDS = {
  [TASK_TYPES.MEETINGS]: TASK_TYPES.MEETINGS,
  [TASK_TYPES.CALLS]: TASK_TYPES.CALLS,
  [TASK_TYPES.MAILS]: TASK_TYPES.MAILS,
  [TASK_TYPES.TASK]: TASK_TYPES.TASK
};

export const TASKS_SCHEMA = {
  GRID_BAR: "grid-bar",
  EXPANDED_MEETINGS_BOARD: "expanded-meetings-board",
  EXPANDED_CALLS_BOARD: "expanded-calls-board",
  EXPANDED_MAIL_BOARD: "expanded-mail-board",
  EXPANDED_TASKS_BOARD: "expanded-tasks-board"
};

export const STYLED_CLASSES = {
  [TASKS_SCHEMA.GRID_BAR]: ["medium-item", "small-item-left", "small-item-right", "big-item"],
  [TASKS_SCHEMA.EXPANDED_MEETINGS_BOARD]: ["expanded-board", "hidden", "hidden", "hidden"],
  [TASKS_SCHEMA.EXPANDED_CALLS_BOARD]: ["hidden", "expanded-board", "hidden", "hidden"],
  [TASKS_SCHEMA.EXPANDED_MAIL_BOARD]: ["hidden", "hidden", "expanded-board", "hidden"],
  [TASKS_SCHEMA.EXPANDED_TASKS_BOARD]: ["hidden", "hidden", "hidden", "expanded-board"]
};

export const LOADING_STATE = {
  LOADING: "LOADING",
  LOAD_NEXT_COLUMN: "next",
  IDLE: "IDLE"
};

export const TASK_MODALS = {
  ADD_SECTION: "AddSection",
  EDIT_SECTION: "EditSection",
  DELETE_SECTION: "DeleteSection",
  ADD_NOTE: "AddNote",
  EDIT_NOTE: "EditNote",
  ADD_TASK: "AddTask",
  ADD_MEETING: "AddMeeting",
  EDIT_MEETING: "EditMeeting",
  RESCHEDULE_ONE: "RescheduleOne",
  RESCHEDULE_ALL: "RescheduleAll",
  ADD_CALL: "AddCall",
  ADD_LETTER: "AddLetter",
  DELETE_TASK: "DeleteTask",
  ADD_COMMENT_TASK: "AddCommentTask",
  ADD_REMINDER: "AddReminder",
  EDIT_TASK: "EditTask",
  ADD_NOTE_TO_MEETING: "AddNoteToMeeting",
  ADD_PASSWORD: "AddPassword",
  OPEN_TASK: "OpenTask"
};

export const contextMenuFolder = {
  CUSTOMIZE: "customize",
  DELETE: "delete"
};

export const contextMenuTask = {
  CUSTOMIZE: "customize",
  DELETE: "delete",
  ADD_COMMENT: "addComment",
  ADD_REMINDER: "reminder",
  RESCHEDULE_ONE: "rescheduleOne",
  RESCHEDULE_ALL: "rescheduleAll",
  ADD_MEETING_NOTE: "addMeetingNote"
};

export const TaskFields = {
  NAME: "name",
  DATE_START: "date_start",
  DATE_END: "date_end",
  EMAILS: "emails",
  TAGS: "tags",
  TEXT: "prim",
  ID_EMOTION: "id_emo",
  ID_FIGURE: "id_fig",
  ID_COLOR: "id_color",
  ID_TYPE: "id_type",
  ID_DEP: "id_dep",
  ID_ACT: "id_act",
  ID_STATUS: "id_status"
};

// MAIL

export const MAIL_MODALS = {
  NEW_MAIL: "NewMail"
};

// LIBRARY
export const LIBRARY = {
  LIBRARY_PATH: "library",
  API_GET_FILES: "lsjson",
  API_GET_FOLDERS: "get_folders"
};

// FOLDER
export const FOLDER = {
  API_GET_FILES: "lsjson"
};

export const VIEW_TYPE = {
  BARS: "bars",
  LINES: "lines",
  BARS_PREVIEW: "preview",
  LINES_PREVIEW: "workLinesPreview"
};

export const LIBRARY_MODALS = {
  ADD_SECTION: "AddSection",
  RENAME_SECTION: "RenameSection"
};

export const LIBRARY_OWN_ICONS = [
  "brain",
  "chess",
  "circuit",
  "cube",
  "curve",
  "cutlery",
  "gift",
  "globe",
  "graduation-hat",
  "group",
  "house",
  "integration",
  "layout",
  "mouse",
  "music-notes",
  "photo-gallery",
  "portfolio",
  "settings",
  "stats",
  "vector",
  "wallet"
];

// CART
export const CART = {
  API_GET_FILES: "trash_list"
};

// JOURNAL

export const JOURNAL = {
  API_GET_JOURNAL_FILES: "history_get",
  SORT_DATE_CHANGE: "byDateChanged"
};

// SORT FILES

export const SORT_FILES = {
  NAME: "byName",
  GROUP: "mtime",
  SIZE: "bySize",
  TYPE: "byType",
  TAGS: "byTags"
};
