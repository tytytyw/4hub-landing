import api from '../../../../../api';
import { onDeleteChatGroup, onDeleteSecretChat } from '../../../../../Store/actions/CabinetActions';

export const groupDelete = (group, dispatch, uid, set, msg) => {
    api.post(`/ajax/chat_group_del.php?uid=${uid}&id_group=${group.id}`)
        .then(res => {
            if(res.data.ok) {
                dispatch(onDeleteChatGroup(group));
                if (set) set(msg)
            } else console.log(res?.error) 
        })
        .catch(err => console.log(err))
        // .finnaly(() => {})
};

export const secretChatDelete = (group, dispatch, uid, set, msg) => {
    api.post(`/ajax/chat_group_sec_del.php?uid=${uid}&id_group=${group.id}`)
        .then(res => {
            if(res.data.ok) {
                dispatch(onDeleteSecretChat(group));
                if (set) set(msg)
            } else console.log(res?.error) 
        })
        .catch(err => console.log(err))
        // .finnaly(() => {})
};