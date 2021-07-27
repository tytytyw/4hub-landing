import api from '../api';
import {onDeleteFile} from '../Store/actions/PrivateCabinetActions';

export const fileDelete = (file, dispatch, uid, set, msg) => {
    api.post(`/ajax/file_del.php?uid=${uid}&dir=${file.gdir}&fid=${file.fid}`)
        .then(res => {if(res.data.ok === 1) {
            dispatch(onDeleteFile(file));
            if(set) set(msg)
    } else { console.log(res?.error) }})
        .catch(err => console.log(err));
};