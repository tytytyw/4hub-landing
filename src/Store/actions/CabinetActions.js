import api, { createCancelToken, deleteCancelToken } from "../../api";
import axios from "axios";

import {
  ADD_RECENT_FILES,
  ADD_RECENT_FOLDERS,
  CHOOSE_FILES,
  CHOOSE_FOLDER,
  CONTACT_LIST,
  COMPANY_CONTACT_LIST,
  COMPANY_DOCUMENTS,
  FILE_DELETE,
  SAFE_FILE_DELETE,
  GET_FOLDERS,
  CHOOSE_RECENT_FILES,
  CUSTOMIZE_FILE,
  CUSTOMIZE_SAFE_FILE,
  GET_CATEGORIES,
  GET_SAFES,
  CODE_TEL,
  CHOOSE_SAFE_FILELIST,
  LOAD_SAFE_FILELIST,
  AUTHORIZED_SAFE,
  GET_DEVICES,
  GET_CONNECTED_CONTACTS,
  SET_SIZE,
  SET_WORKELEMENTSVIEW,
  GET_PROJECT_FOLDER,
  GET_PROJECTS,
  GET_JOURNAL_FOLDERS,
  SEARCH,
  SET_CALENDAR_DATE,
  SORT_FILES,
  LOAD_FILES,
  SET_FILTER_COLOR,
  SET_FILTER_EMOJI,
  SET_FILTER_FIGURE,
  SET_REVERSE_CRITERION,
  SET_FILES_PATH,
  SET_CHOSEN_FILE,
  CHOOSE_GUEST_SHARED_FILES,
  NULLIFY_FILTERS,
  SET_SELECTED_DEVICE,
  SET_SELECTED_USER,
  SET_DRAGGED,
  LOAD_PROJECT_FILES,
  SET_CHOSEN_FOLDER,
  SET_CHOSEN_PROJECT,
  LOAD_FILES_NEXT,
  CHOOSE_FILES_NEXT,
  SET_NEXT_FILES_TO_PREVIOUS,
  SET_PAINT,
  CHAT_GROUPS_LIST,
  RESENT_CHATS_LIST,
  CHAT_ID_USER,
  CHAT_GROUP_DELETE,
  GET_CHAT_FILES,
  SECRET_CHAT_DELETE,
  CHAT_SELECTED_CONTACT,
  SECRET_CHATS_LIST,
  SET_MESSAGE_LIFE_TIME,
  ADD_NEW_MESSAGE,
  MESSAGE_DELETE,
  GET_MESSAGES,
  GET_PREVIUS_MESSAGES,
  SET_MODALS,
  CHOOSE_CATEGORY,
  NULLIFY_FILES,
  SET_CHAT_THEME,
  GET_MAIL,
  NULLIFY_MAILS,
  SET_FOLDER_PATH,
  FILES_USER_SHARED,
  GET_TASK
} from "../types";
import { categories } from "../../Pages/Cabinet/Components/Programs/consts";
import {
  CALENDAR_MODALS,
  LIBRARY,
  LOADING_STATE,
  MODALS,
  SHARED_FILES,
  TOP_MESSAGE_TYPE
} from "../../generalComponents/globalVariables";
import { checkResponseStatus, getDepartment, getLocation } from "../../generalComponents/generalHelpers";

const CancelToken = axios.CancelToken;

/**
 * @deprecated use onLoadFolders
 */
export const onGetFolders = (path, folders) => async (dispatch, getState) => {
  // TODO - Need to modify page && item per page state `&page=${1}&items_per_page=${20}`
  api
    .get(`/ajax/get_folders.php?uid=${getState().user.uid}`)
    .then((res) => {
      const f = {};
      if (res.data?.global) {
        f.global = folders.map((el) => {
          return {
            name: el.name,
            nameRu: el.nameRu,
            path: el.path,
            folders: res.data.global[el.name]
          };
        });
      }
      if (res.data?.other) f.other = res.data.other;
      dispatch({
        type: GET_FOLDERS,
        payload: f
      });
      if (path) {
        let folders = [];
        if (path.split("/")[0] === "global") {
          folders = res.data[path.split("/")[0]][path.split("/")[1]].folders;
        } else {
          res.data[path.split("/")[0]].folders.forEach((f) => {
            if (f.name === path.split("/")[1]) folders = f.folders.folders;
          });
        }
        dispatch({
          type: CHOOSE_FOLDER,
          payload: { folders, path }
        });
      }
    })
    .catch((err) => console.log(err));
};

const addDepth = (params) => {
  switch (getLocation()[0]) {
    case LIBRARY.LIBRARY_PATH: {
      return {
        ...params,
        dep: `/_${getLocation()[0].toUpperCase()}_/`
      };
    }
    default:
      return params;
  }
};

export const onLoadFolders = (url) => async (dispatch, getState) => {
  const cancelRequest = createCancelToken(url);
  let params = {
    uid: getState().user.uid
  };
  params = addDepth(params);

  await api
    .get(`/ajax/${url}.php`, {
      params,
      cancelToken: cancelRequest.token
    })
    .then((res) => {
      dispatch(onChooseFolder(res.data, Object.keys(res.data)[0]));
    })
    .catch((e) => {
      onSetModals(MODALS.ERROR, { open: true, message: "Library folders failed to load." });
      console.log(e);
    })
    .finally(() => {
      deleteCancelToken(url);
    });
};

export const onChooseFolder = (folders, path) => {
  return {
    type: CHOOSE_FOLDER,
    payload: { folders, path }
  };
};

export const onSetFolderPath = (path) => {
  return {
    type: SET_FOLDER_PATH,
    payload: path
  };
};

export const onSetPath = (path) => {
  return {
    type: SET_FILES_PATH,
    payload: path
  };
};

export const onsetInitialChosenFile = (file) => {
  return {
    type: SET_CHOSEN_FILE,
    payload: file
  };
};

/**
 * @deprecated use onLoadFiles
 */
export const onChooseFiles =
  (path, search, page, set, setLoad, loadedFilesType, allFiles, pathname) => async (dispatch, getState) => {
    const filters = getState().Cabinet.fileCriterion.filters;
    const emoji = filters.emoji ? `&filter_emo=${filters.emoji}` : "";
    const sign = filters.figure ? `&filter_fig=${filters.figure}` : "";
    const color = filters.color.color ? `&filter_color=${filters.color.color}` : "";
    const searched = search ? `&search=${search}` : "";
    const sortReverse = filters.reverse && filters.reverse[filters.sorting] ? `&sort_reverse=1` : "";
    const cancelChooseFiles = CancelToken.source();
    const downloadedFiles = pathname?.startsWith("/downloaded-files") ? "&is_uploaded=1" : "";
    window.cancellationTokens = { cancelChooseFiles };
    const url = `/ajax/${allFiles ?? "lsjson"}.php?uid=${getState().user.uid}&dir=${
      allFiles ? "" : path
    }${searched}&page=${page}&per_page=${30}&sort=${
      getState().Cabinet.fileCriterion.sorting
    }${sortReverse}${emoji}${sign}${color}${downloadedFiles}&dep=${getDepartment()}`;
    await api
      .get(url, {
        cancelToken: cancelChooseFiles.token
      })
      .then((files) => {
        if (loadedFilesType === "next") {
          page > 1
            ? dispatch({
                type: LOAD_FILES_NEXT,
                payload: { files: files.data }
              })
            : dispatch({
                type: CHOOSE_FILES_NEXT,
                payload: { files: files.data, path }
              });
        } else {
          page > 1
            ? dispatch({
                type: LOAD_FILES,
                payload: { files: files.data }
              })
            : dispatch({
                type: CHOOSE_FILES,
                payload: { files: files.data, path }
              });
        }
        if (typeof set === "function") set(files.data.length ?? files.data);
        if (setLoad) setLoad(false);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        delete window.cancellationTokens.cancelChooseFiles;
      });
  };

export const onSetNextFilesToPrevious = (path, isDir) => (dispatch) => {
  dispatch({
    type: SET_NEXT_FILES_TO_PREVIOUS,
    payload: path
  });
  if (isDir) {
    dispatch(onChooseFiles(path, "", 1, "", "", "next"));
  }
};

export const nullifyFilters = () => {
  return {
    type: NULLIFY_FILTERS
  };
};

export const onDeleteFile = (file) => {
  return {
    type: FILE_DELETE,
    payload: file
  };
};

export const onGetContacts = () => async (dispatch, getState) => {
  const uid = getState().user.uid;

  api
    .get(`/ajax/contacts_list.php?uid=${uid}`)
    .then((response) => {
      const data = response.data?.data;

      const newData = [];
      for (const key in data) {
        newData.push(data[key]);
      }

      dispatch({
        type: CONTACT_LIST,
        payload: newData.sort((a, b) => a.name?.localeCompare(b.name))
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const onAddRecentFolders = (folders) => async (dispatch, getState) => {
  api
    .get(`ajax/dir_recent.php?uid=${getState().user.uid}`)
    .then((res) => {
      const newFolders = res.data.map((folder) => {
        if (folder.path.split("/")[0] === "global" && folder.path.split("/").length === 2) {
          const newFolder = folder;
          folders.forEach((f) => (f.path === folder.path ? (newFolder.nameRu = f.nameRu) : undefined));
          return newFolder;
        } else {
          return folder;
        }
      });
      dispatch({
        type: ADD_RECENT_FOLDERS,
        payload: newFolders
      });
    })
    .catch((err) => console.log(err));
};

export const onAddRecentFiles = (url) => async (dispatch, getState) => {
  const uri = url ?? "history_files";

  api
    .get(`/ajax/${uri}.php?uid=${getState().user.uid}`)
    .then((res) => {
      dispatch({
        type: ADD_RECENT_FILES,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
export const clearRecentFiles = () => {
  return {
    type: ADD_RECENT_FILES,
    payload: null
  };
};

export const clearFileList = () => {
  return {
    type: NULLIFY_FILES,
    payload: {
      files: null,
      path: "global/all",
      filesNext: null
    }
  };
};

export const clearFolders = () => {
  return {
    type: "GET_FOLDERS",
    payload: { global: null, other: null }
  };
};

export const onChooseRecentFile = (file) => {
  return {
    type: CHOOSE_RECENT_FILES,
    payload: file
  };
};

export const onCustomizeFile = (file) => {
  return {
    type: CUSTOMIZE_FILE,
    payload: file
  };
};

//SAFE

export const onGetSafes = () => async (dispatch, getState) => {
  api
    .get(`/ajax/safe_list.php?uid=${getState().user.uid}`)
    .then((res) => {
      if (res.data.ok) {
        dispatch({
          type: CODE_TEL,
          payload: res.data.tel
        });
        if (res.data.safes) {
          dispatch({
            type: GET_SAFES,
            payload: Object.values(res.data.safes)
          });
        } else {
          dispatch({
            type: GET_SAFES,
            payload: []
          });
        }
      } else {
        console.log(res);
      }
    })
    .catch((error) => console.log(error));
};

export const onGetSafeFileList =
  (code, id_safe, password, set, setErrPass, setLoadingType, search, page, setLoad) => async (dispatch, getState) => {
    const emoji = getState().Cabinet.fileCriterion.filters.emoji
      ? `&filter_emo=${getState().Cabinet.fileCriterion.filters.emoji}`
      : "";
    const sign = getState().Cabinet.fileCriterion.filters.figure
      ? `&filter_fig=${getState().Cabinet.fileCriterion.filters.figure}`
      : "";
    const color = getState().Cabinet.fileCriterion.filters.color.color
      ? `&filter_color=${getState().Cabinet.fileCriterion.filters.color.color}`
      : "";
    const searched = search ? `&search=${search}` : "";
    const sortReverse =
      getState().Cabinet.fileCriterion.reverse &&
      getState().Cabinet.fileCriterion?.reverse[getState().Cabinet.fileCriterion.sorting]
        ? `&sort_reverse=1`
        : "";
    const cancelChooseFiles = CancelToken.source();
    window.cancellationTokens = { cancelChooseFiles };

    const url = `/ajax/safe_file_list.php?uid=${
      getState().user.uid
    }&code=${code}&id_safe=${id_safe}${searched}&page=${page}&per_page=${30}&sort=${
      getState().Cabinet.fileCriterion.sorting
    }${sortReverse}${emoji}${sign}${color}`;

    await api
      .get(url, {
        cancelToken: cancelChooseFiles.token
      })
      .then((res) => {
        if (res.data.ok) {
          dispatch(onAuthorizedSafe(id_safe, code, password));
          page > 1
            ? dispatch({
                type: LOAD_SAFE_FILELIST,
                payload: { files: res.data.files }
              })
            : dispatch({
                type: CHOOSE_SAFE_FILELIST,
                payload: { files: res.data.files }
              });
        } else {
          setErrPass("code");
        }
        if (set) set(res.data?.files?.length);
        if (setLoad) setLoad(false);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        if (setLoadingType) setLoadingType("");
        delete window.cancellationTokens.cancelChooseFiles;
      });
  };

export const onAuthorizedSafe = (id_safe, code, password) => async (dispatch) => {
  dispatch({
    type: AUTHORIZED_SAFE,
    payload: { id_safe, code, password }
  });
};

export const onExitSafe = () => async (dispatch) => {
  dispatch({
    type: CHOOSE_SAFE_FILELIST,
    payload: null
  });
  dispatch({
    type: AUTHORIZED_SAFE,
    payload: null
  });
};

export const onCustomizeSafeFile = (file) => {
  return {
    type: CUSTOMIZE_SAFE_FILE,
    payload: file
  };
};

export const onDeleteSafeFile = (file) => {
  return {
    type: SAFE_FILE_DELETE,
    payload: file
  };
};

// PROGRAMS

export const onGetCategories = () => async (dispatch) => {
  dispatch({
    type: GET_CATEGORIES,
    payload: Object.keys(categories).map((category) => ({
      name: category,
      ...categories[category]
    }))
  });
};

export const onChooseCategory = (category) => async (dispatch) => {
  dispatch({
    type: CHOOSE_CATEGORY,
    payload: category
  });
};

// DEVICES

export const setSelectedDevice = (data) => ({
  type: SET_SELECTED_DEVICE,
  payload: data
});

export const setSelectedUser = (id) => ({
  type: SET_SELECTED_USER,
  payload: id
});

export const setDevices = (data) => ({
  type: GET_DEVICES,
  payload: data
});

export const onGetDevices = (setDevicesListLoading, setErrors) => async (dispatch, getState) => {
  setDevicesListLoading(true);
  setErrors((prevState) => {
    return { ...prevState, devicesListError: false };
  });
  api
    .get(`/ajax/devices_list.php?uid=${getState().user.uid}`)
    .then((res) => {
      if (res.data.ok === 1) {
        let list = [];
        Object.entries(res.data.devices).forEach((device) => {
          let obj = {
            id: device[1].id,
            ip: device[1].ip,
            adr: device[1].adr,
            is_block: device[1].is_block,
            browser: device[1].data?.browser,
            country: device[1].country,
            platform: device[1].data?.platform,
            provider: device[1].provider,
            name: device[1].data.browser,
            os: device[1].data.platform,
            device: device[1].data.device_type || "unknown",
            last_visit: device[1]?.ut_last?.split(" ")[0] || "",
            is_online: device[1]?.is_online
          };
          list.push(obj);
        });
        dispatch({
          type: GET_DEVICES,
          payload: list
        });
      } else throw new Error();
    })
    .catch(() =>
      setErrors((prevState) => {
        return { ...prevState, devicesListError: true };
      })
    )
    .finally(() => setDevicesListLoading(false));
};

export const onGetConnectedContacts = (setConnectedContactsListLoading, setErrors) => async (dispatch, getState) => {
  try {
    setConnectedContactsListLoading(true);
    setErrors((prevState) => {
      return { ...prevState, сonnectedContactsError: false };
    });
    const res = await api.get(`/ajax/devices_users_list.php?uid=${getState().user.uid}}`);
    if (res?.data?.ok) {
      dispatch({
        type: GET_CONNECTED_CONTACTS,
        payload: res.data.users
      });
    } else throw new Error();
  } catch {
    setErrors((prevState) => {
      return { ...prevState, сonnectedContactsError: true };
    });
  } finally {
    setConnectedContactsListLoading(false);
  }
  /*dispatch({
        type: GET_CONNECTED_CONTACTS,
        payload: [
            {
                id: 1,
                name: 'Алина Квиталина',
                active: 1,
                image: `${imageSrc}assets/PrivateCabinet/avatars/a1.svg`
            },
            {
                id: 2,
                name: 'Катерина',
                active: 0,
                image: `${imageSrc}assets/PrivateCabinet/avatars/a2.svg`
            },
            {
                id: 3,
                name: 'Антон Медведев',
                active: 1,
                image: `${imageSrc}assets/PrivateCabinet/avatars/a3.svg`
            },
            {
                id: 4,
                name: 'Коваленко Андрей',
                active: 0,
                image: `${imageSrc}assets/PrivateCabinet/avatars/a4.svg`
            }
        ]
    })*/
};

// PROJECT

export const onGetProjects = () => async (dispatch, getState) => {
  api.get(`/ajax/project_list.php?uid=${getState().user.uid}`).then((res) => {
    if (res.data.ok) {
      if (res.data.projects) {
        dispatch({
          type: GET_PROJECTS,
          payload: Object.values(res.data.projects)
        });
      } else {
        dispatch({
          type: GET_PROJECTS,
          payload: []
        });
      }
    } else {
      console.log(res);
    }
  });
};

export const onGetProjectFolders = (projectId) => async (dispatch, getState) => {
  api.get(`/ajax/project_folders_list.php?uid=${getState().user.uid}&id_project=${projectId}`).then((res) => {
    if (res.data.ok) {
      if (res.data.project_folders) {
        let projectFolders = res.data.project_folders;
        dispatch({
          type: GET_PROJECT_FOLDER,
          payload: { projectFolders, projectId }
        });
      } else {
        dispatch({
          type: GET_PROJECT_FOLDER,
          payload: []
        });
      }
    } else {
      console.log(res);
    }
  });
};

export const onChooseProjectFiles = (folder, project) => async (dispatch, getState) => {
  const url = `ajax/project_file_list.php?uid=${getState().user.uid}&id_project=${project.id}&dir=${folder.name}`;
  api
    .get(url)
    .then((res) => {
      if (res?.data?.ok === 1) {
        dispatch({
          type: LOAD_PROJECT_FILES,
          payload: res.data.files
        });
      } else {
        dispatch({
          type: SET_MODALS,
          payload: {
            key: "error",
            value: { open: true, message: "Failed to load project files" }
          }
        });
      }
    })
    .catch(() => ({
      type: SET_MODALS,
      payload: {
        key: "error",
        value: { open: true, message: "Failed to load project files" }
      }
    }));
};

export const setChosenFolderProject = (folder) => {
  return {
    type: SET_CHOSEN_FOLDER,
    payload: folder
  };
};

export const onChooseProject = (project) => {
  return {
    type: SET_CHOSEN_PROJECT,
    payload: project
  };
};

// JOURNAL

export const onGetJournalFolders = () => ({
  type: GET_JOURNAL_FOLDERS,
  payload: [
    {
      id: 1,
      icon: "my-files",
      name: "Весь список"
    },
    {
      id: 2,
      icon: "shared-files",
      name: "Расшаренные файлы"
    },
    {
      id: 3,
      icon: "downloaded-files",
      name: "Загруженные файлы"
    },
    {
      id: 4,
      icon: "downloaded-link",
      name: "Загруженные ссылки"
    },
    {
      id: 5,
      icon: "my-folders",
      name: "Мои папки"
    },
    {
      id: 6,
      icon: "my-files",
      name: "Мои файлы"
    },
    {
      id: 7,
      icon: "programs",
      name: "Программы"
    },
    {
      id: 8,
      icon: "project",
      name: "Совместный проект"
    },
    {
      id: 9,
      icon: "archive",
      name: "Архив"
    },
    {
      id: 9,
      icon: "trash-cart",
      name: "Корзина"
    }
  ]
});

export const onSetFileSize = (size) => {
  return {
    type: SET_SIZE,
    payload: size
  };
};

export const onSetWorkElementsView = (view) => {
  return {
    type: SET_WORKELEMENTSVIEW,
    payload: view
  };
};

// CALENDAR PAGE
export const setCalendarDate = (date) => {
  return {
    type: SET_CALENDAR_DATE,
    payload: date
  };
};

export const onAddNewTask = (endpoint, message) => async (dispatch, getState) => {
  const params = {
    name: getState().Cabinet.taskCriterion.name,
    id_type: getState().Cabinet.taskCriterion.id_type,
    id_dep: getState().Cabinet.taskCriterion.id_dep,
    prim: getState().Cabinet.taskCriterion.text,
    date_start: getState().Cabinet.taskCriterion.dateFrom,
    date_end: getState().Cabinet.taskCriterion.dateTo,
    uid: getState().user.uid,
    filter_color: getState().Cabinet.taskCriterion.filters.color.color,
    filter_emo: getState().Cabinet.taskCriterion.filters.emoji,
    filter_fig: getState().Cabinet.taskCriterion.filters.figure,
    id_act: getState().Cabinet.taskCriterion.id_act,
    emails: getState().Cabinet.taskCriterion.emails,
    tags: getState().Cabinet.taskCriterion.tagOption
  };
  api
    .get(`/ajax/${endpoint}.php`, { params })
    .then((response) => {
      if (checkResponseStatus(response.data.ok)) {
        dispatch(onSetModals(MODALS.LOADER, false));
        dispatch(
          onSetModals(MODALS.CALENDAR, {
            type: CALENDAR_MODALS.SUCCESS_ADD
          })
        );
      } else {
        dispatch(onSetModals(MODALS.LOADER, false));
        dispatch(onSetModals(MODALS.TOP_MESSAGE, { open: true, type: TOP_MESSAGE_TYPE.ERROR, message }));
      }
    })
    .catch((error) => {
      onSetModals(MODALS.ERROR, { open: true, message });
      console.log(error);
    });
};

export const onGetAllTasks = () => async (dispatch, getState) => {
  api
    .get(`ajax/task_get.php`, {
      params: {
        uid: getState().user.uid,
        id_dep: getState().Cabinet.taskCriterion.id_dep,
        id_type: getState().Cabinet.taskCriterion.id_type
      }
    })
    .then((response) => {
      if (checkResponseStatus(response.data.ok)) {
        dispatch({
          type: GET_TASK,
          payload: response.data.tasks
        });
      } else {
        onSetModals(MODALS.ERROR, { open: true, message: "error" });
      }
    })
    .catch((error) => {
      onSetModals(MODALS.ERROR, { open: true, message: "error" });
      console.log(error);
    });
};

export const onDeleteTask = (id, message, error) => async (dispatch, getState) => {
  //mylog
  console.log(message);
  api
    .delete(`ajax/task_del.php`, {
      params: {
        uid: getState().user.uid,
        id_task: id
      }
    })
    .then((response) => {
      if (checkResponseStatus(response.data.ok)) {
        dispatch(onSetModals(MODALS.LOADER, false));
        dispatch(
          onSetModals(MODALS.SUCCESS, {
            open: true,
            message
          })
        );
        dispatch(onGetAllTasks());
      } else {
        dispatch(onSetModals(MODALS.ERROR, { open: true, message: error }));
      }
    })
    .catch((error) => {
      dispatch(onSetModals(MODALS.ERROR, { open: true, message: error }));
      console.log(error);
    });
};

export const onSearch = (value) => {
  return {
    type: SEARCH,
    payload: value
  };
};

// SHARED FILES
export const onGetSharedFiles = (type) => async (dispatch, getState) => {
  const url = {
    [SHARED_FILES.FILES_USER_SHARED]: "file_share_mylist",
    [SHARED_FILES.FILES_SHARED_TO_USER]: "file_share_get"
  };
  try {
    const res = await api.get(`/ajax/${url[type]}.php?uid=${getState().user.uid}`);
    dispatch({
      type: CHOOSE_FILES,
      payload: { files: res.data.data, path: "global/all" }
    });
  } catch (e) {
    onSetModals(MODALS.ERROR, { open: true, message: "Files failed to load." });
    console.log(e);
  }
};

export const onGetFilesUserShared = (endpoint, fid, message) => async (dispatch, getState) => {
  api
    .get(`${endpoint}`, {
      params: {
        uid: getState().user.uid,
        fid
      }
    })
    .then((response) => {
      if (checkResponseStatus(response.data.ok)) {
        dispatch({
          type: FILES_USER_SHARED,
          payload: response.data.access
        });
      } else {
        onSetModals(MODALS.ERROR, { open: true, message });
      }
    })
    .catch((e) => {
      onSetModals(MODALS.ERROR, { open: true, message });
      console.log(e);
    });
};

export const onSortFile = (sorting) => {
  return {
    type: SORT_FILES,
    payload: sorting
  };
};

export const onChangeFilterColor = (value) => {
  return {
    type: SET_FILTER_COLOR,
    payload: value
  };
};

export const onChangeFilterFigure = (value) => {
  return {
    type: SET_FILTER_FIGURE,
    payload: value
  };
};

export const onChangeFilterEmoji = (value) => {
  return {
    type: SET_FILTER_EMOJI,
    payload: value
  };
};

export const onSetReverseCriterion = (value) => {
  return {
    type: SET_REVERSE_CRITERION,
    payload: value
  };
};

// GUEST MODE
export const onGetGuestFolderFiles = (did, setLoading) => async (dispatch) => {
  try {
    const res = await axios.get(`/ajax/dir_access_list.php?did=${did}`);
    dispatch({
      type: CHOOSE_GUEST_SHARED_FILES,
      payload: res.data.data
    });
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

// ARCHIVE

// TODO: move to onChooseFiles
export const onGetArchiveFiles =
  (search, page, set, setLoad, loadedFilesType, dateFilter) => async (dispatch, getState) => {
    const emoji = getState().Cabinet.fileCriterion.filters.emoji
      ? `&filter_emo=${getState().Cabinet.fileCriterion.filters.emoji}`
      : "";
    const sign = getState().Cabinet.fileCriterion.filters.figure
      ? `&filter_fig=${getState().Cabinet.fileCriterion.filters.figure}`
      : "";
    const color = getState().Cabinet.fileCriterion.filters.color.color
      ? `&filter_color=${getState().Cabinet.fileCriterion.filters.color.color}`
      : "";
    const searched = search ? `&search=${search}` : "";
    const dateFiltered = dateFilter
      ? `${dateFilter?.d ? `&d=${dateFilter?.d}` : ""}${dateFilter?.m ? `&m=${dateFilter?.m}` : ""}${
          dateFilter?.y ? `&y=${dateFilter?.y}` : ""
        }`
      : "";
    const sortReverse =
      getState().Cabinet.fileCriterion.reverse &&
      getState().Cabinet.fileCriterion?.reverse[getState().Cabinet.fileCriterion.sorting]
        ? `&sort_reverse=1`
        : "";
    const cancelChooseFiles = CancelToken.source();
    window.cancellationTokens = { cancelChooseFiles };
    const url = `/ajax/archive_list.php?uid=${
      getState().user.uid
    }${searched}${dateFiltered}&page=${page}&per_page=${30}&sort=${
      getState().Cabinet.fileCriterion.sorting
    }${sortReverse}${emoji}${sign}${color}`;
    await api
      .get(url, {
        cancelToken: cancelChooseFiles.token
      })
      .then((files) => {
        if (loadedFilesType === "next") {
          page > 1
            ? dispatch({
                type: LOAD_FILES_NEXT,
                payload: { files: files.data }
              })
            : dispatch({
                type: CHOOSE_FILES_NEXT,
                payload: { files: files.data }
              });
        } else {
          page > 1
            ? dispatch({
                type: LOAD_FILES,
                payload: { files: files.data }
              })
            : dispatch({
                type: CHOOSE_FILES,
                payload: { files: files.data }
              });
        }
        if (typeof set === "function") set(files.data.length ?? files.data);
        if (setLoad) setLoad(false);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        delete window.cancellationTokens.cancelChooseFiles;
      });
  };

export const setDragged = (element) => {
  return {
    type: SET_DRAGGED,
    payload: element
  };
};

// Chat
export const onGetChatGroups = (updateGroupUsersList) => async (dispatch, getState) => {
  const uid = getState().user.uid;

  api
    .get(`/ajax/chat_group_list.php?uid=${uid}`)
    .then((response) => {
      const data = response.data?.chat_groups;

      const newData = [];
      for (const key in data) {
        const group = data[key];
        newData.push({
          ...group,
          isGroup: true,
          users: Object.values(group.users)
        });
        if (updateGroupUsersList?.id_group === group.id_group)
          dispatch(
            onSetSelectedContact({
              ...updateGroupUsersList,
              users: Object.values(group.users)
            })
          );
      }

      dispatch({
        type: CHAT_GROUPS_LIST,
        payload: newData
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const onGetReсentChatsList = () => async (dispatch, getState) => {
  const uid = getState().user.uid;

  api
    .get(`/ajax/chat_list.php?uid=${uid}`)
    .then((response) => {
      if (response.data.ok) {
        dispatch({
          type: CHAT_ID_USER,
          payload: response.data.id_user
        });

        const data = response.data?.data;
        const newData = [];
        for (const key in data) {
          newData.push({ ...data[key] });
        }
        dispatch({
          type: RESENT_CHATS_LIST,
          payload: newData
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const onGetSecretChatsList = () => async (dispatch, getState) => {
  const uid = getState().user.uid;

  api
    .get(`/ajax/chat_group_sec_list.php?uid=${uid}`)
    .then((response) => {
      if (response.data.ok) {
        const data = response.data.chat_groups;
        const newData = [];
        const userId = getState().Cabinet.chat.userId;
        for (const key in data) {
          const chat = Object.values(data[key].users).filter((item) => item.id !== userId)[0];
          if (chat)
            newData.push({
              ...chat,
              is_user: 1,
              real_user_date_last: chat.date_last,
              id: chat.id_group,
              is_secret_chat: true
            });
        }
        dispatch({
          type: SECRET_CHATS_LIST,
          payload: newData
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const onDeleteChatGroup = (group) => {
  return {
    type: CHAT_GROUP_DELETE,
    payload: group
  };
};

export const onDeleteSecretChat = (secretChat) => {
  return {
    type: SECRET_CHAT_DELETE,
    payload: secretChat
  };
};

export const onGetChatMessages = (target, search, page, loadingMessages) => (dispatch, getState) => {
  const uid = getState().user.uid;
  const { isGroup, is_secret_chat } = target;

  api
    .get(
      `/ajax/chat${isGroup || is_secret_chat ? "_group" : ""}_message_get.php?uid=${uid}&is_group=1${
        search ? `&search=${search}` : ""
      }${isGroup || is_secret_chat ? `&id_group=${target.id}` : `&id_user_to=${target.id_real_user}`}&page=${
        page || 1
      }&per_page=10`
    )
    .then((response) => {
      if (response.data.ok) {
        if (getState().Cabinet.chat.selectedContact?.id === target?.id) {
          const messages = response.data?.data ?? {};
          page > 1
            ? dispatch({
                type: GET_PREVIUS_MESSAGES,
                payload: messages
              })
            : dispatch({
                type: GET_MESSAGES,
                payload: messages
              });
          if (typeof loadingMessages === "function") loadingMessages(messages);
          if (page === 1)
            dispatch({
              type: GET_CHAT_FILES,
              payload: response.data?.attachments ?? null
            });
        }
      }
    })
    .catch((error) => {
      dispatch({
        type: SET_MODALS,
        payload: {
          key: "topMessage",
          value: { open: true, type: "error", message: "Ошибка загрузки" }
        }
      });
      console.log(error);
    });
};

export const addNewChatMessage = (msg) => (dispatch) => {
  dispatch({
    type: ADD_NEW_MESSAGE,
    payload: msg
  });
};

export const onSetSelectedContact = (contact) => {
  return {
    type: CHAT_SELECTED_CONTACT,
    payload: contact
  };
};

export const onSetMessageLifeTime = (value) => {
  return {
    type: SET_MESSAGE_LIFE_TIME,
    payload: value
  };
};

export const onDeleteChatMessage = (message) => (dispatch, getState) => {
  const oldMessages = getState().Cabinet.chat.messages;
  const messages = {
    ...oldMessages,
    [message.day]: oldMessages[message.day].filter((msg) => msg.id !== message.id)
  };
  dispatch({
    type: MESSAGE_DELETE,
    payload: messages
  });
};

export const onEditChatMessage = (editedData, messageInfo) => (dispatch, getState) => {
  const oldMessages = getState().Cabinet.chat.messages;
  const messages = {
    ...oldMessages,
    [messageInfo.day]: oldMessages[messageInfo.day].map((msg) =>
      msg.id === messageInfo.id ? { ...msg, ...editedData } : msg
    )
  };
  dispatch({
    type: MESSAGE_DELETE,
    payload: messages
  });
};

export const changeChatTheme = (theme) => async (dispatch) => {
  dispatch({
    type: SET_CHAT_THEME,
    payload: theme
  });
};

export const saveChatTheme = (themeName) => async (dispatch, getState) => {
  const formData = new FormData();
  formData.set("uid", getState().user.uid);
  formData.set("chat_theme", themeName);

  api
    .post(`/ajax/user_edit2.php`, formData)
    .then((res) => {
      if (!res.data.ok) throw new Error();
    })
    .catch(() =>
      dispatch({
        type: SET_MODALS,
        payload: {
          key: "topMessage",
          value: { open: true, type: "error", message: "Error" }
        }
      })
    );
};

// COMPANY
export const onGetCompanyContacts = (setShowSuccessMessage, message) => async (dispatch, getState) => {
  const uid = getState().user.uid;
  const id_company = getState().user.id_company;

  api
    .get(`/ajax/org_contacts_list.php?uid=${uid}&id_company=${id_company}`)
    .then((response) => {
      const data = response.data?.data;

      const newData = [];
      for (const key in data) {
        newData.push(data[key]);
      }

      dispatch({
        type: COMPANY_CONTACT_LIST,
        payload: newData.sort((a, b) => a.name?.localeCompare(b.name))
      });
      if (setShowSuccessMessage) setShowSuccessMessage(message);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const onGetCompanyDocument = (type, loader) => async (dispatch, getState) => {
  const uid = getState().user.uid;
  const id_company = getState().user.id_company;
  const preview = getState().Cabinet.company.documents[type].preview;
  if (loader && !preview) loader("true");
  api
    .get(`/ajax/org_file_get.php?uid=${uid}&id_company=${id_company}&type=${type} `)
    .then((res) => {
      const data = {
        type,
        file: res.data.icon?.filter((src) => src.slice(src.lastIndexOf(".")).includes("doc"))[0] || null,
        preview: res.data.icon?.filter((src) => src.slice(src.lastIndexOf(".")) === ".pdf")[0] || null,
        edit: res.data.edit?.[0] || null
      };
      dispatch({
        type: COMPANY_DOCUMENTS,
        payload: data
      });
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => (loader ? loader("") : null));
};

export const onDeleteCompanyDocument = (type, success, msg) => async (dispatch, getState) => {
  const uid = getState().user.uid;
  const id_company = getState().user.id_company;
  api
    .get(`/ajax/org_file_del.php?uid=${uid}&id_company=${id_company}&type=${type} `)
    .then((res) => {
      if (res.data.ok) {
        const data = {
          type,
          file: null,
          preview: null
        };
        dispatch({
          type: COMPANY_DOCUMENTS,
          payload: data
        });
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => (success ? success(msg) : null));
};

export const onSetPaint = (key, value) => {
  return {
    type: SET_PAINT,
    payload: { key, value }
  };
};

export const onSetModals = (key, value) => {
  return {
    type: SET_MODALS,
    payload: { key, value }
  };
};

export const onLoadFiles =
  (endpoint, page, loadType = LOADING_STATE.LOADING) =>
  async (dispatch, getState) => {
    const cancelRequest = createCancelToken(endpoint);
    const params = {
      uid: getState().user.uid,
      filter_emo: getState().Cabinet.fileCriterion.filters.emoji,
      filter_fig: getState().Cabinet.fileCriterion.filters.figure,
      filter_color: getState().Cabinet.fileCriterion.filters.color.color, //TODO - Need to check path to store
      search: getState().Cabinet.search,
      sort_reverse: 1,
      dir: getState().Cabinet.fileList.path,
      page,
      dep: `/_${getLocation()[0].toUpperCase()}_/`
    };
    api
      .get(`/ajax/${endpoint}.php`, {
        params,
        cancelToken: cancelRequest.token
      })
      .then((files) => {
        if (loadType === LOADING_STATE.LOAD_NEXT_COLUMN) {
          page > 1
            ? dispatch({
                type: LOAD_FILES_NEXT,
                payload: { files: files.data }
              })
            : dispatch({
                type: CHOOSE_FILES_NEXT,
                payload: { files: files.data }
              });
        } else {
          page > 1
            ? dispatch({
                type: LOAD_FILES,
                payload: { files: files.data }
              })
            : dispatch({
                type: CHOOSE_FILES,
                payload: { files: files.data }
              });
        }
      })
      .catch((e) => {
        onSetModals(MODALS.ERROR, { open: true, message: "Files failed to load." });
        console.log(e);
      })
      .finally(() => {
        deleteCancelToken(endpoint);
      });
  };

// MAIL
export const getMails = () => {
  return {
    type: GET_MAIL,
    payload: {
      mails: [
        {
          from: "Alina Kvitalina",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru ",
          date: "2021-22-04 11:00",
          id: 1,
          files: [],
          isRead: false
        },
        {
          from: "Alina Kvitalina",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru ",
          date: "2021-22-04 10:00",
          id: 2,
          files: ["image", "video"],
          isRead: false
        },
        {
          from: "Alina Kvitalina",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru ",
          date: "2021-22-04 10:30",
          id: 3,
          files: ["image"],
          isRead: true
        },
        {
          from: "Alina Kvitalina",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru ",
          date: "2021-22-04 12:00",
          id: 4,
          files: [],
          isRead: true
        },
        {
          from: "Alina Kvitalina",
          text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)",
          date: "2021-22-04 10:12",
          id: 5,
          files: ["image", "video"],
          isRead: false
        },
        {
          from: "Alina Kvitalina",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru ",
          date: "2021-22-04 13:00",
          id: 6,
          files: ["image", "video"],
          isRead: true
        },
        {
          from: "Alina Kvitalina",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru ",
          date: "2021-22-04 12:30",
          id: 7,
          files: ["image", "video"],
          isRead: true
        },
        {
          from: "Alina Kvitalina",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru ",
          date: "2021-22-04 14:00",
          id: 8,
          files: [],
          isRead: true
        },
        {
          from: "Alina Kvitalina",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru ",
          date: "2021-22-04 15:00",
          id: 9,
          files: ["image", "video"],
          isRead: true
        },
        {
          from: "Alina Kvitalina",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru ",
          date: "2021-22-04 16:00",
          id: 10,
          files: [],
          isRead: true
        },
        {
          from: "Alina Kvitalina",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laboru ",
          date: "2021-22-04 18:00",
          id: 11,
          files: ["image", "video"],
          isRead: true
        }
      ]
    }
  };
};

export const clearMailList = () => {
  return {
    type: NULLIFY_MAILS,
    payload: {
      mails: [],
      path: ""
    }
  };
};

export const onSetMailPath = (path) => {
  return {
    type: GET_MAIL,
    payload: {
      path
    }
  };
};
