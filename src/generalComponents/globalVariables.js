export const imageSrc =
  process.env.REACT_APP_IMAGE_URL ?? `${window.location.origin}/`; //'https://fsimg.mh.net.ua/';
export const projectSrc =
  process.env.REACT_APP_URL ?? `${window.location.origin}/`; //'https://fs2.mh.net.ua'

export const MODALS = {
  ERROR: "error",
  SUCCESS: "success",
  LOADER: "loader",
  FILE_PREVIEW: "previewFile"
};

//Shared files
export const SHARED_FILES = {
  FILES_USER_SHARED: "sharedI",
  FILES_SHARED_TO_USER: "sharedMe"
};
