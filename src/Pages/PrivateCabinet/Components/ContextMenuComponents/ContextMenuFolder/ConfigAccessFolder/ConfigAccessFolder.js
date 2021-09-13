import React, {useState, useEffect, useRef} from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './ConfigAccessFolder.module.sass';
import PopUp from '../../../../../../generalComponents/PopUp';
import StoragePeriod from '../../ContextMenuFolder/StoragePeriod/StoragePeriod';
import SetPassword from '../SetPassword/SetPassword';
import { ReactComponent as Password } from '../../../../../../assets/PrivateCabinet/password.svg';
import { ReactComponent as Calendar } from '../../../../../../assets/PrivateCabinet/calendar-6.svg';
import { ReactComponent as Pensil } from '../../../../../../assets/PrivateCabinet/edit.svg';
import { ReactComponent as Eye } from '../../../../../../assets/PrivateCabinet/eye.svg';


function ConfigAccessFolder({folder, close, setShowSuccessMessage}) {
    const [displayStotagePeriod, setDisplayStotagePeriod] = useState(false);
    const [displaySetPassword, setDisplaySetPassword] = useState(false);
    const [dateValue, setDateValue] = useState('');
    const [timeValue, setTimeValue] = useState({hours: '', minutes: '', seconds: ''});
    const uid = useSelector(state => state.user.uid);
    const [size, ] = useState('0 MB')
    const [data, setData] = useState({uid,deadline: ''});
    const linkRef = useRef('');
    const setTime = (time, limit) => {
        return time < limit
        ? time < 10 ? `0${time}` : time
        : time[0];
    }

    useEffect(()=> {
        setData(data => ({...data, deadline: dateValue ? `${dateValue} ${timeValue.hours ? setTime(timeValue.hours, 24) : '23'}:${timeValue.minutes ? setTime(timeValue.minutes, 60) : '59'}` : ''}))
    },[dateValue, timeValue]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <PopUp set={close}>
            {!displayStotagePeriod && <div className={styles.ShareFile_wrap}>
                <div className={classNames(styles.header, styles.border_bottom)}>
                    Настройка доступа папки {folder.name}
                    <span
						className={styles.cross}
						onClick={() => close()}
					/>
                </div>
                <div className={classNames(styles.row_item, styles.border_bottom)}>
                        <div className={styles.ico_wrap}>
                            <Eye className={styles.row_ico} />
                        </div>
                        <div className={styles.input_wrap}>
                            <p className={styles.input_title}>Может просматривать</p>
                            <input value='Все у кого есть эта ссылка, смогут просматривать файл' type='button'></input>
                        </div>
                        <span
                            className={styles.set_list}
                        >Все у кого есть ссылка</span>
                </div>
                <div className={classNames(styles.row_item, styles.border_bottom)}>
                    <div className={styles.ico_wrap}>
                        <Calendar className={styles.row_ico} />
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>Срок хранения файла/папки</p>
                        <input value='Установите срок хранения файла (после завершения файл будет удален)' type='button'></input>
                    </div>
                    <span onClick={() => setDisplayStotagePeriod(true)} className={styles.set_btn}>
                        Установить
                    </span>
                </div>
                <div className={classNames(styles.row_item, styles.border_bottom)}>
                    <div className={styles.ico_wrap}>
                        <Password className={styles.row_ico} />
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>Пароль</p>
                        <input id={'input_pass'} placeholder='Вы можете установить пароль на данный файл'></input>
                    </div>
                    <span onClick={() => setDisplaySetPassword(true)} className={styles.set_btn}>
                        Установить
                    </span>
                </div>
                <div className={styles.share_link}>
                    <div className={styles.row_item}>
                        <div className={styles.ico_wrap}>
                            <Pensil className={styles.row_ico} />
                        </div>
                        <div className={styles.input_wrap}>
                            <p className={styles.input_title}>Может редактировать</p>
                            <input value='Все у кого есть эта ссылка, смогут изменять файл' type='button'></input>
                        </div>
                        <span
                            className={styles.set_list}
                        >Все у кого есть ссылка</span>
                    </div>
                    
                </div>
            </div>}
            {displayStotagePeriod && <StoragePeriod
                setDisplayStotagePeriod={setDisplayStotagePeriod}
                dateValue={dateValue}
                setDateValue={setDateValue}
                timeValue={timeValue}
                setTimeValue={setTimeValue}
                size={size}
                data={data}
            />}
            {displaySetPassword && <SetPassword
                folder={folder}
                setDisplaySetPassword={setDisplaySetPassword}
                setShowSuccessMessage={setShowSuccessMessage}
            />}
            <input ref={linkRef} type='text' style={{display: 'none'}} />
        </PopUp>
    )
}

export default ConfigAccessFolder
