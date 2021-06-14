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
import TellFriend from './TellFriends/TellFriend'
import Support from './Support'
import DataMemory from './DataMemory'
import Personal from './Personal'
import Confident from './Confident'
import PrimaryButton from './PrimaryButton'
import TariffPlan from "./TariffPlan/increase_storage"

const Settings = () => {

    const dispatch = useDispatch()
    const [pageOption, setPageOption] = useState('confident')
    const [popup, setPopup] = useState(false)

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
                        <PrimaryButton
                            text='Конфиденциальность'
                            active={pageOption === 'confident'}
                            onClick={() => setPageOption('confident')}
                        />
                        <PrimaryButton
                            text='Персонализация'
                            active={pageOption === 'personal'}
                            onClick={() => setPageOption('personal')}
                        />
                        <PrimaryButton
                            text='Данные и память'
                            active={pageOption === 'data_memory'}
                            onClick={() => setPageOption('data_memory')}
                        />
                        <PrimaryButton
                            text='Вопросы о 4HUB'
                            active={pageOption === 'questions'}
                            onClick={() => setPageOption('questions')}
                        />

                        <div className={styles.buttonsRight}>
                            <PrimaryButton
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
                {pageOption === 'data_memory' && <DataMemory setPageOption={setPageOption}/>}
                {pageOption === 'questions' && <Support/>}

                {pageOption === 'tariff_plan' && <TariffPlan/>}

            </div>

            {popup &&
            <TellFriend
                set={setPopup}
            />}

            <BottomPanel/>

        </div>
    )
}

export default Settings