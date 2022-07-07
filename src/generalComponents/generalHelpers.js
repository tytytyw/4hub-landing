import html2canvas from "html2canvas";
import { imageSrc, MODALS, TOP_MESSAGE_TYPE } from "./globalVariables";
import api from "../api";
import axios from "axios";
import { setCookie } from "./StorageHelper";
import { useLocales } from "react-localized";
import { onSetModals } from "Store/actions/CabinetActions";
const CancelToken = axios.CancelToken;

//set image to requested size with maxWidth && maxHeight params
export function imageToRatio(width, height, maxWidth = 100, maxHeight = 100) {
  let ratio = 0;

  if (width > maxWidth) {
    ratio = maxWidth / width; // get ratio for scaling image
    height = height * ratio; // Reset height to match scaled image
    width = width * ratio; // Reset width to match scaled image
  }

  // Check if current height is larger than max
  if (height > maxHeight) {
    ratio = maxHeight / height; // get ratio for scaling image
    width = width * ratio; // Reset width to match scaled image
    height = height * ratio; // Reset height to match scaled image
  }

  return { height, width };
}

// currently unused !!!!
//make a printScreen of page with navigator
export const handlePrintScreen = async (ref, set) => {
  const video = document.createElement("video");
  const options = { video: true, audio: false };
  const width = window.innerWidth - 200;
  const height = window.innerHeight - 200;
  video.width = width;
  video.height = height;

  await navigator.mediaDevices
    .getDisplayMedia(options)
    .then((stream) => {
      video.srcObject = stream;
      video.play();

      video.addEventListener("canplay", async () => {
        setTimeout(() => {
          video.pause();
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, width, height);
          const data = canvas.toDataURL("image/png");
          ref.setAttribute("src", data);
          if (set) set("block");
        }, 500);
      });
    })
    .catch((err) => {
      console.log("An error occurred: " + err);
    });
};

export const htmlToCanvas = async (element, ref, set) => {
  await html2canvas(element, { allowTaint: true, proxy: imageSrc })
    .then((canvas) => {
      const data = canvas.toDataURL("image/png");
      ref.setAttribute("src", data);
      if (set) set("block", data);
    })
    .catch((e) => console.log(e));
};

export const replaceFile = async (uid, info, file) => {
  const newFIle = file.replace("image/png", "image/octet-stream");
  const blob = new Blob([newFIle], { type: "image/png" });
  let data = new FormData();
  data.append("uid", uid);
  data.append("myfile", blob);
  data.append("fid", info.fid);
  data.append("dir", info.gdir);
  api.post(`/ajax/file_replace.php`, data).catch((e) => console.log(e));
};

export const replaceChatMessage = (message, uid, file) => {
  const newFIle = file.preview.replace("image/png", "image/octet-stream");
  const blob = new Blob([newFIle], { type: "image/png" });
  let data = new FormData();
  data.append("uid", uid);
  data.append("attachment", blob);
  data.append("id_message", message.id);
  data.append("text", ""); //TODO - mkortelov - check for text message
  api.post(`/ajax/chat_message_edit.php`, data).catch((e) => console.log(e));
};

export const useSendFile = async () => {
  const { __ } = useLocales();
  return (uid, file) => {
    const newFIle = file.preview.replace("image/png", "image/octet-stream");
    const blob = new Blob([newFIle], { type: "image/png" });
    let data = new FormData();
    data.append("uid", uid);
    data.append("myfile", blob);
    data.append("fileName", __(`Снимок экрана`));
    data.append("tag", "");
    data.append("pass", "");
    data.append("color", "");
    data.append("symbol", "");
    data.append("emoji", "");

    api
      .post(`ajax/project_file_add.php`, data)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };
};

//loading media to play (after problems with Safari)
export const getMedia = (url, type, set = () => {}, setLoading = () => {}, setError = () => {}) => {
  setLoading(true);
  const cancelLoadMedia = CancelToken.source();
  window.cancellationTokens = { cancelLoadMedia };
  api
    .get(url, {
      responseType: "blob",
      cancelToken: cancelLoadMedia.token
    })
    .then((res) => {
      const blob = new Blob([res.data], { type });
      let objectURL = URL.createObjectURL(blob);
      set(objectURL);
    })
    .catch(() => setError("Failed to load media"))
    .finally(() => {
      setLoading(false);
    });
};

//Exit Profile
export const exit = () => {
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) =>
    cookie.split("=")[0].trim() === "uid"
      ? setCookie(cookie.split("=")[0].trim(), cookie.split("=")[1].trim(), "Thu, 01 Jan 1970 00:00:00 GMT")
      : null
  );
  window.location.pathname = "";
};

//Count height of fields for files (WorkBars, WorkLines, WorkBarsPreview, WorkLinesPreview)
export const renderHeight = (recentFiles, filePick, styles, dateFilter) => {
  return recentFiles?.length || dateFilter > 0
    ? filePick.show
      ? styles.showFilePickWithRecentFiles
      : styles.hideFilePickWithRecentFiles
    : dateFilter
    ? styles.dateFilter
    : filePick.show
    ? styles.showFilePick
    : styles.hideFilePick;
};

//Moves file to another folder
export const moveFile = (folder, file, uid) => {
  return api
    .post(`/ajax/file_move.php?uid=${uid}&fid=${file.fid}&dir=${folder.path}`)
    .then((res) => {
      return !!res.data.ok;
    })
    .catch(() => false);
};

//Moves folder to another folder
export const moveFolder = (folder, folderToMove, uid) => {
  if (folder.path.startsWith(folderToMove.path))
    return Promise().reject(new Error("Folder cannot be move to itself or to children"));
  return api
    .post(`/ajax/dir_move.php?uid=${uid}&dir=${folderToMove.name}&parent=${folderToMove.gdir}&dir_new=${folder.path}`)
    .then((res) => {
      return !!res.data.ok;
    })
    .catch(() => false);
};

export function checkBrowser(name) {
  if (window.navigator.userAgent) {
    return navigator.userAgent.toLowerCase().includes(name.toLowerCase());
  } else {
    return false;
  }
}

//Create an array for php request
export function arrayForPhpRequest(key, array) {
  return array.reduce((acc, item, i) => {
    return (acc += `&${key}[${i}]=${item}`);
  }, "");
}

//HEX to RGBA color - full(e.g. - rgba(1, 1, 1, 1) ) or short - e.g. 255, 255, 255
export function hexToRgbA(hex, type) {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return type === "full"
      ? "rgba(" + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") + ",1)"
      : `${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",")}`;
  }
  throw new Error("Bad Hex");
}

//Transforming dataURL canvas into Blob
export function dataURLintoBlobImage(dataURL) {
  const blobBin = atob(dataURL.split(",")[1]);
  let array = [];
  for (let i = 0; i < blobBin.length; i++) {
    array.push(blobBin.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: "image/png" });
}

export const checkResponseStatus = (status) => {
  if (typeof status === "number" && status === 1) {
    return status === 1;
  }
  if (typeof status === "boolean" && status) {
    return status;
  }
  throw Error(`status ${status} with type ${typeof status} is not ok`);
};

// Checks types of incoming value
export function typeCheck(value) {
  const return_value = Object.prototype.toString.call(value);
  const type = return_value.substring(return_value.indexOf(" ") + 1, return_value.indexOf("]"));
  return type.toLowerCase();
}

export function capitalizeFirstLetter(string) {
  return string.split("")[0].toUpperCase() + string.slice(1);
}

export function getLocation() {
  return window.location.pathname.split("/").filter((it) => it.length > 0);
}

export function getDepartment() {
  return getLocation()[0] === "library" ? "/_LIBRARY_/" : "/";
}

export const getIsIncludePath = (filePath, currentPath) => {
  const filePathArray = filePath.split("/");
  const currentPathArray = currentPath.split("/");
  const result = filePathArray.filter((el) => currentPathArray.includes(el)).join("/");
  return result === currentPath;
};

export const getFormatDate = (date) => {
  const newDate = date.split(" ").join("T");
  const formatDate = new Date(newDate).toLocaleString("ru", { year: "numeric", month: "2-digit", day: "2-digit" });
  return formatDate;
};

export const getFormatTime = (date) => {
  if (date) {
    const newDate = date.split(" ").join("T");
    const formatTime = new Date(newDate).toLocaleString("ru", { hour: "2-digit", minute: "2-digit" });
    return formatTime;
  }
};

export const getMaskDate = (date) => {
  const tempValue = date.replace(/\D/gim, "");
  return tempValue.replace(
    ...({
      2: [/(\d{2})/g, "$1"],
      3: [/(\d{2})/g, "$1."],
      4: [/(\d{2})(\d{0,2})/g, "$1.$2"],
      5: [/(\d{2})(\d{2})/g, "$1.$2."],
      6: [/(\d{2})(\d{2})(\d{0,4})/g, "$1.$2.$3"],
      7: [/(\d{2})(\d{2})(\d{1,4})/g, "$1.$2.$3"],
      8: [/(\d{2})(\d{2})(\d{4})/g, "$1.$2.$3"]
    }[tempValue.length] || [])
  );
};

export const changePreviewTime = async (uid, fid, dispatch) => {
  return api
    .post(`/ajax/history_file_update.php?uid=${uid}&fid=${fid}`)
    .then((response) => {
      checkResponseStatus(response.data.ok);
    })
    .catch((e) => {
      dispatch(
        onSetModals(MODALS.TOP_MESSAGE, { open: true, type: TOP_MESSAGE_TYPE.ERROR, message: "Error change mtime" })
      );
      console.log(e);
    });
};
