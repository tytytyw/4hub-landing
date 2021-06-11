import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import styles from './ConnectedContacts.module.sass'
import {ReactComponent as PlayIcon} from '../../../../../assets/PrivateCabinet/play-grey.svg'
import CustomFolderItem from "../CustomFolderItem"
import classNames from "classnames"
import ContactItem from "../ContactItem";

const ConnectedContacts = ({listCollapsed, chosenContact, setChosenContact, setMouseParams}) => {

    const dispatch = useDispatch()
    const connectedContacts = useSelector(state => state.PrivateCabinet.connectedContacts)

    const [collapse, setCollapse] = useState(true)

    useEffect(() => setChosenContact(null), [collapse])

    const renderContacts = () => {
      return connectedContacts.map((contact, index) => {
          return <ContactItem
              key={index}
              contact={contact}
              active={contact?.active}
              chosenContact={chosenContact}
              setChosenContact={setChosenContact}
              setMouseParams={setMouseParams}
          />
      })
    }

    return (
        <div className={styles.wrapper}>
            <div
                className={classNames({
                    [styles.titleWrap]: true,
                    [styles.titleCollapsed]: !!listCollapsed,
                    [styles.titleWrapChosen]: !!collapse
                })}
                onClick={() => setCollapse(!collapse)}
            >
                <span className={styles.title}>Подключенные пользователи</span>
                <PlayIcon
                    className={classNames({
                        [styles.playButton]: true,
                        [styles.revert]: collapse
                    })}
                />
            </div>
            <div
                className={classNames({
                    [styles.innerFolders]: true,
                    [styles.hidden]: !collapse
                })}
            >
                {renderContacts()}
            </div>
        </div>
    )
}

export default ConnectedContacts