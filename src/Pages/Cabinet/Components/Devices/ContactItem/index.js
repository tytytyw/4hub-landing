import React from 'react'

import styles from './ContactItem.module.sass'
import '../../../../../generalComponents/colors.sass'
import classNames from 'classnames'

const ContactItem = ({ contact, chosenContact, setChosenContact, setMouseParams, listCollapsed, listSize }) => {

    return (
        <>
            <div
                className={classNames({
                    [styles.wrapper]: true,
                    [styles.wrapperChosen]: chosenContact === contact.id,
                    [styles?.[`wrapper_${listSize}`]]: !!listSize
                })}
                onClick={() => setChosenContact(contact.id)}
            >
                <div className={styles.titleWrap}>
                    <div className={styles.imageWrap}>
                        <img
                            src={contact.image}
                            alt='icon'
                            className={styles.icon}
                        />
                        {contact?.active === 1 && <span className={styles.active}/>}
                    </div>
                    {!listCollapsed && <span className={styles.title}>{contact.name} </span>}
                </div>
                <div className={styles.functionWrap}>
                    <div
                        className={styles.menuWrap}
                        onClick={e => setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 25})}
                    ><span className={styles.menu}/></div>
                </div>
            </div>

        </>
    )
}

export default ContactItem
