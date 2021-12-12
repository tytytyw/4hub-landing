import React, {useEffect} from "react";

import styles from "./ContactList.module.sass";
import {useDispatch, useSelector} from "react-redux";
import {onGetContacts, onGetCompanyContacts} from "../../../../../Store/actions/CabinetActions";
import {imageSrc} from '../../../../../generalComponents/globalVariables';

const ContactList = ({search}) => {
    const id_company = useSelector(state => state.user.id_company)
    const contactList = useSelector(state => id_company ? state.Cabinet.companyContactList : state.Cabinet.contactList);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!contactList) dispatch(id_company ? onGetCompanyContacts() : onGetContacts());
    }, []) //eslint-disable-line

    const renderContactList = () => (
        contactList.map((contact, i) => {
            if (!(contact?.name?.toLowerCase().includes(search.toLowerCase()) || contact?.sname?.toLowerCase().includes(search.toLowerCase()))) return null
            return (
                <div className={styles.item} key={i}>
                    <div className={styles.groupName}>
                        <img src={contact?.icon?.[0] || `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`} alt="img" className={styles.avatar} />
                        <div className={styles.info}>
                            <div className={styles.name}>{`${contact?.sname} ${contact?.name}`}</div>
                            <div className={styles.status}>в сети 29 мин. назад</div>
                        </div>
                    </div>
                    <div className={styles.functionWrap}>
                        <div
                            className={styles.menuWrap}
                            // onClick={e => setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 25})}
                        ><span className={styles.menu}/></div>
                    </div>
                </div>
            )
        })
    )

    return (
        <div className={styles.listWrap}>
            {contactList ? renderContactList() : null}
        </div>
    )
}

export default ContactList;