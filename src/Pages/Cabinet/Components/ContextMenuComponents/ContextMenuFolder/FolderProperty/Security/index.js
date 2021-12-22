import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';

import styles from './Security.module.sass';
import InputField from '../../../../../../../generalComponents/InputField';
import {imageSrc} from '../../../../../../../generalComponents/globalVariables';
import api from '../../../../../../../api';

const Security = ({folder}) => {

    const userInfo = useSelector(state => state.user.userInfo);
    const uid = useSelector(state => state.user.uid);

    const [userList, setUserList] = useState([]);

    const renderUsers = (userList) => {
        return userList.map(user => {
            return <span className={styles.user}>{user?.user_name}</span>
        })
    };

    const noUsers = <div>Доступ не предоставлен никому</div>;

    useEffect(() => {
        async function fetchUsers() {
            return await api.get(`/ajax/dir_access_info.php?uid=${uid}&dir=${folder.info.path}`);
        }
        fetchUsers()
            .then(res => {
                if(!!res.data.ok && res?.data?.access) {
                    setUserList(res.data.access);
                }
            })
            .catch(err => console.error(err))
    }, []) //eslint-disable-line

    return (
        <div className={styles.securityWrap}>
            <div className={styles.infoWrap}>
                <img src={userInfo.icon[0] || `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`} alt='' className={styles.icon}/>
                <div className={styles.inputWrap}><InputField height='90%' placeholder={`${userInfo.name} ${userInfo.sname}`} disabled={true} /></div>
            </div>
            <div className={styles.accessWrap}>
                <span>Список пользователей, которым предоставлен доступ с возможностью изменить разрешение</span>
                <div className={styles.users}>
                    {userList.length > 0 ? renderUsers(userList) : noUsers}
                </div>
            </div>
        </div>
    )
}

export default Security;