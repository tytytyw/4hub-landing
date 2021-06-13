import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'

import {onGetContacts} from '../../../../Store/actions/PrivateCabinetActions'

import styles from './MyProfile.module.sass'
import {ReactComponent as UploadIcon} from '../../../../assets/PrivateCabinet/upload.svg'

import SearchField from '../SearchField'
import StorageSize from '../StorageSize'
import Notifications from '../Notifications'
import Profile from '../Profile'
import BottomPanel from '../ButtomPanel'
import classnames from 'classnames'
import TellFriend from './TellFriends/TellFriend'
import Support from "./Support/Support";

const MyButton = ({ onClick = () => {}, active = false, ...props }) => (
    <button
        onClick={onClick}
        className={classnames({
            [styles.button]: true,
            [styles.active]: active
        })}
    >
        {props.text} {props.icon &&
        <span className={styles.buttonIcon}>
            {props.icon}
        </span>}
    </button>
)

const MyProfile = ({ defaultPageOption = 'personal_data' }) => {

    const dispatch = useDispatch()
    const [pageOption, setPageOption] = useState(null)
    const [popup, setPopup] = useState(false)

    useEffect(() => {
        setPageOption(defaultPageOption)
    }, [defaultPageOption])

    useEffect(() => {
        dispatch(onGetContacts())
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={styles.wrapper}>

            <div className={styles.header}>
                <SearchField/>
                <div className={styles.infoHeader}>
                    <StorageSize/>
                    <Notifications/>
                    <Profile/>
                </div>
            </div>

            <div className={styles.content}>

                <div className={styles.buttons}>
                    <div className={styles.buttonsList}>
                        <MyButton
                            text='Конфиденциальность'
                            active={pageOption === 'confident'}
                            onClick={() => setPageOption('confident')}
                        />
                        <MyButton
                            text='Персонализация'
                            active={pageOption === 'personal'}
                            onClick={() => setPageOption('personal')}
                        />
                        <MyButton
                            text='Данные и память'
                            active={pageOption === 'data_memory'}
                            onClick={() => setPageOption('data_memory')}
                        />
                        <MyButton
                            text='Вопросы о 4HUB'
                            active={pageOption === 'questions'}
                            onClick={() => setPageOption('questions')}
                        />

                        <div className={styles.buttonsRight}>
                            <MyButton
                                text='Рассказать друзьям'
                                icon={<UploadIcon/>}
                                alt='Upload'
                                active={popup}
                                onClick={() => setPopup(true)}
                            />
                        </div>
                    </div>
                </div>

                {pageOption === 'confident' && <Confident/>}
                {pageOption === 'personal' && <Personal/>}
                {pageOption === 'data_memory' && <DataMemory/>}
                {pageOption === 'questions' && <Support/>}

            </div>

            {popup &&
                <TellFriend
                    set={setPopup}
                />}

            <BottomPanel/>

        </div>
    )
}

export default MyProfile