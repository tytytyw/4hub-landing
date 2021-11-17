import React, {useEffect} from "react";

import styles from "./ContactList.module.sass";
import {useDispatch, useSelector} from "react-redux";
import {onGetContacts} from "../../../../../Store/actions/CabinetActions";

const ContactList = () => {

    const contactList = useSelector(state => state.Cabinet.contactList);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!contactList) dispatch(onGetContacts());
    }, []) //eslint-disable-line

    const renderContactList = () => (
        contactList.map((contact, i) => (
            <div className={styles.item} key={i}>
                <div className={styles.groupName}>
                    <img src={contact?.icon?.[0]} alt="img" className={styles.avatar} />
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
        ))
    )

    return (
        <div className={styles.listWrap}>
            {contactList ? renderContactList() : null}
        </div>
    )
}

export default ContactList;