import React, {useState} from 'react'

import styles from './SendFriend.module.sass'
import PopUp from '../../../../../generalComponents/PopUp'

import {ReactComponent as ChatIcon} from '../../../../../assets/PrivateCabinet/sms.svg'
import Button from '../Button/Button'
import {useSelector} from 'react-redux'
import {messengersData} from '../Contacts/consts'
import api from '../../../../../api'
import classNames from 'classnames'

const TellFriend = ({ set, contact }) => {

    const uid = useSelector(state => state.user.uid)

    const [selectedSoc, setSelectedSoc] = useState(null)
    /*const [search, setSearch] = useState('')
    const [contactList, setContactList] = useState(contacts)

    const [selectedContact, setSelectedContact] = useState(null)


    const [errors, setErrors] = useState({})
    const [submitErrors, setSubmitErrors] = useState({})
    const [fields, setFields] = useState({})
    const [blur, setBlur] = useState({})*/

    /*useEffect(() => {

        const filterArray = contacts.filter(item => {
            const name = getContactName(item).toLowerCase()
            const searchValue = search.toLowerCase()
            return name.includes(searchValue)
        })

        setContactList(filterArray)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

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
*/
    const onSubmit = event => {

        event.preventDefault()

        api.get(`/ajax/contacts_send.php`, {
            params: {
                uid,
                id: contact?.id,
                email: contact?.email
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
            <form
                noValidate
                onSubmit={onSubmit}
                className={styles.wrapper}
            >

                <div className={styles.header}>
                    <div className={styles.profileWrap}>
                        <img
                            src='./assets/PrivateCabinet/logo.svg'
                            alt='logo'
                        />
                        <span>Рассказать друзьям</span>
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
                        <li
                            onClick={() => setSelectedSoc('email')}
                            className={classNames({
                                [styles.socialsItem]: true,
                                [styles.active]: selectedSoc === 'email'
                            })}
                        >
                            <img
                                className={styles.socialIcon}
                                src='./assets/PrivateCabinet/email.svg'
                                alt='Email'
                            />
                            <p>Email</p>
                        </li>
                        {messengersData.map((item, index) => (
                            <li
                                onClick={() => setSelectedSoc(item?.type)}
                                className={classNames({
                                    [styles.socialsItem]: true,
                                    [styles.active]: selectedSoc === item?.type
                                })}
                                key={index}
                            >
                                <img
                                    className={styles.socialIcon}
                                    src={item.icon}
                                    alt={item.label}
                                />
                                <p>{item.label}</p>
                            </li>
                        ))}
                        <li className={styles.socialsItem}>
                            <img
                                className={styles.socialIcon}
                                src='./assets/PrivateCabinet/more.svg'
                                alt='Email'
                            />
                            <p>Ещё</p>
                        </li>
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


export default TellFriend