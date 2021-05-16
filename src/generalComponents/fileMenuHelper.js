import api from '../api';
import {onDeleteFile} from '../Store/actions/PrivateCabinetActions';

export const fileDelete = (file, dispatch, uid) => {
    api.post(`/ajax/file_del.php?uid=${uid}&dir=${file.gdir}&fid=${file.fid}`)
        .then(res => res.data.ok === 1 ? dispatch(onDeleteFile(file)) : console.log(res?.error))
        .catch(err => console.log(err));
};