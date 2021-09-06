import api from '../api';
import {onDeleteFile, onDeleteSafeFile} from '../Store/actions/PrivateCabinetActions';

export const fileDelete = (file, dispatch, uid, set, msg) => {
    api.post(`/ajax/file_del.php?uid=${uid}&dir=${file.gdir}&fid=${file.fid}`)
        .then(res => {if(res.data.ok === 1) {
            dispatch(onDeleteFile(file));
            if(set) set(msg)
    } else { console.log(res?.error) }})
        .catch(err => console.log(err));
};

export const safeFileDelete = (id_safe, file, dispatch, uid, set, msg) => {
    api.post(`/ajax/safe_file_del.php?uid=${uid}&fid=${file}&id_safe=${id_safe}`)
        .then(res => {if(res.data.ok === 1) {
            dispatch(onDeleteSafeFile(file));
            if(set) set(msg)
    } else { console.log(res?.error) }})
        .catch(err => console.log(err));
};