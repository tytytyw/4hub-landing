import React from 'react';
import {useSelector} from 'react-redux';

import styles from './Security.module.sass';
import InputField from '../../../../../../../generalComponents/InputField';

const Security = ({folder}) => {

    const userInfo = useSelector(state => state.user.userInfo);

    const userList = ['Коваленко Артем', 'Надельская Ангелина', 'Филь Сергей', 'Филь Сергей', 'Надельская Ангелина'];
    const userListRestriction = ['Коваленко Артем', 'Коваленко Артем', 'Надельская Ангелина', 'Филь Сергей', 'Филь Сергей', 'Надельская Ангелина'];
    const renderUsers = (userList) => {
        return userList.map(user => {
            return <span className={styles.user}>{user}</span>
        })
    };

    return (
        <div className={styles.securityWrap}>
            <div className={styles.infoWrap}>
                <img src={userInfo.icon[0]} alt='' className={styles.icon}/>
                <div className={styles.inputWrap}><InputField height='90%' placeholder={`${userInfo.name} ${userInfo.sname}`} disabled={true} /></div>
            </div>
            <div className={styles.accessWrap}>
                <span>Список пользователей, которым предоставлен доступ с возможностью изменить разрешение</span>
                <div className={styles.users}>
                    {renderUsers(userList)}
                </div>
            </div>
            <div className={styles.limitationWrap}>
                <span>Дополнительные настройки взаимодействия с файлом (разрешение/запрет на изменение, чтение и тд) с возможностью изменить:</span>
                <div className={styles.users}>
                    {renderUsers(userListRestriction)}
                </div>
            </div>
        </div>
    )
}

export default Security;