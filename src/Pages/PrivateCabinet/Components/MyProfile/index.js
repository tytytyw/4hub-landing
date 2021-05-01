import React, {useState} from 'react'

import styles from './MyProfile.module.sass'
import uploadIcon from '../../../../assets/PrivateCabinet/upload.svg'

import SearchField from '../SearchField'
import StorageSize from '../StorageSize'
import Notifications from '../Notifications'
import Profile from '../Profile'
import UserForm from './UserForm/UserForm'
import BottomPanel from '../ButtomPanel'
import classnames from 'classnames'
import Support from './Support/Support'

const MyButton = ({ text, icon, alt, onClick = () => {}, active = false }) => (
    <button
        onClick={onClick}
        className={classnames({
            [styles.button]: true,
            [styles.active]: active
        })}
    >
        {text} {icon ?
        <span className={styles.buttonIcon}>
            <img src={icon} alt={alt}/>
        </span> : null}
    </button>
)

const MyProfile = (props) => {

    const [pageOption, setPageOption] = useState('personal_data')

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
                            text='Личные данные'
                            active={pageOption === 'personal_data'}
                            onClick={() => setPageOption('personal_data')}
                        />
                        <MyButton
                            text='Служба поддержки'
                            active={pageOption === 'support'}
                            onClick={() => setPageOption('support')}
                        />
                        <MyButton text='Тарифный план'/>
                        <MyButton text='Контакты'/>
                        <MyButton text='Подключенные прораммы'/>
                        <div className={styles.buttonsRight}>
                            <MyButton text='Расказать друзьям' icon={uploadIcon} alt='Upload'/>
                        </div>
                    </div>
                </div>

                {pageOption === 'personal_data' && <UserForm/>}
                {pageOption === 'support' && <Support/>}

            </div>

            <BottomPanel/>

        </div>
    )


}

export default MyProfile