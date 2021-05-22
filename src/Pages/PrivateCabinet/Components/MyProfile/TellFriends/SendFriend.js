import React, {useEffect, useState} from 'react'

import styles from './SendFriend.module.sass'
import PopUp from '../../../../../generalComponents/PopUp'

import {ReactComponent as ChatIcon} from '../../../../../assets/PrivateCabinet/sms.svg'
import ContactSearch from '../Contacts/ContactList/ContactSearch/ContactSearch'
import RadioCheck from './RadioCheck/RadioCheck'
import Button from '../Button/Button'
import {useSelector} from 'react-redux'
//import {isCorrectData} from '../Input/validation'
import {getContactName, socialsData} from '../Contacts/consts'
import api from "../../../../../api"
/*import Input from "../Input/Input"
import classNames from 'classnames'*/

const SendFriend = ({ set, selectedItem }) => {

    const contacts = useSelector(state => state.PrivateCabinet.contactList)
    const uid = useSelector(state => state.user.uid)

    const [search, setSearch] = useState('')
    const [contactList, setContactList] = useState(contacts)
/*
    const [errors, setErrors] = useState({})
    const [submitErrors, setSubmitErrors] = useState({})
    const [fields, setFields] = useState({})
    const [blur, setBlur] = useState({})*/

    useEffect(() => {

        const filterArray = contacts.filter(item => {
            const name = item.name.toLowerCase()
            const searchValue = search.toLowerCase()
            return name.includes(searchValue)
        })

        setContactList(filterArray)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    const onSearch = value => setSearch(value)

/*
    const onBlurHandler = event => {
        const {name} = event.target
        setBlur({...blur, [name]: true})
    }

    const onChangeHandler = event => {

        let {value, name} = event.target

        if (!isCorrectData(value, name, fields,['email'])) {
            setErrors({...errors, [name]: true})
        } else {
            setErrors({...errors, [name]: false})
            setSubmitErrors({...submitErrors, [name]: false})
        }

        setFields({...fields, [name]: value})

    }
    // !Temporary - NEED TO DELETE
    if(null) {onBlurHandler();onChangeHandler();}
*/

    const onSubmit = event => {

        event.preventDefault()

        api.get(`/ajax/contacts_send.php`, {
            params: {
                uid,
                id: selectedItem?.id,
                email: selectedItem?.email
            }
        }).then(() => {
            set(false)
        }).catch(err => {
            console.log(err)
        })

    }

    //const isMistake = name => (errors?.[name] && blur?.[name]) || submitErrors?.[name]

    return (
        <PopUp set={set}>
            <form noValidate onSubmit={onSubmit} className={styles.wrapper2}>

                <div className={styles.header}>
                    <div className={styles.profileWrap}>
                        <img
                            className={styles.profileImg}
                            src='./assets/PrivateCabinet/profile-noPhoto.svg'
                            alt='pie-chart'
                        />
                        <span>
                            Поделиться контактом
                            &nbsp;<b>{getContactName(selectedItem)}</b>
                        </span>
                    </div>
                    <span
                        className={styles.close}
                        onClick={() => set(false)}
                    >
                        <span className={styles.times}/>
                    </span>
                </div>

                <div className={styles.share}>
                    <div className={styles.blockTitle}>
                        <span className={styles.titleIcon}><ChatIcon/></span>
                        <span className={styles.info}>Поделиться с помощью:</span>
                    </div>
                    <div className={styles.socials}>
                        {socialsData.map((item, index) => (
                            <li className={styles.socialsItem} key={index}>
                                <img
                                    className={styles.socialIcon}
                                    src={item.icon}
                                    alt={item.label}
                                />
                                <p>{item.label}</p>
                            </li>
                        ))}
                    </div>
                </div>

                <div className={styles.contacts}>

                    <div className={styles.contactsWrap}>

                        <div className={styles.blockTitle}>
                            <span className={styles.info}>Контакты</span>
                        </div>
                        <div className={styles.search}>
                            <ContactSearch
                                onChangeHandler={onSearch}
                            />
                        </div>

                        <ul className={styles.contactsList}>
                            {contactList.map((item, index) => (
                                <RadioCheck
                                    item={item}
                                    name='user_id'
                                    key={index}
                                />
                            ))}
                        </ul>

                    </div>

                </div>

                <div className={styles.actionBlock}>
                    <Button
                        type='submit'
                        className={styles.actionBtn}
                    >
                        Отправить
                    </Button>
                </div>

            </form>
        </PopUp>
    )
}


export default SendFriend