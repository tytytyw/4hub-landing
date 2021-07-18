import React, {useState, useEffect, useRef} from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './ShareFolder.module.sass';
import api from '../../../../../../api';
import PopUp from '../../../../../../generalComponents/PopUp';
import Error from '../../../../../../generalComponents/Error';
import StoragePeriod from '../StoragePeriod/StoragePeriod';
import ShareToMessengers from '../ShareToMessengers/ShareToMessengers';
import SetPassword from '../SetPassword/SetPassword';
import { ReactComponent as Password } from '../../../../../../assets/PrivateCabinet/password.svg';
import { ReactComponent as Calendar } from '../../../../../../assets/PrivateCabinet/calendar-6.svg';
import { ReactComponent as Pensil } from '../../../../../../assets/PrivateCabinet/edit.svg';
import { ReactComponent as Eye } from '../../../../../../assets/PrivateCabinet/eye.svg';
import {ReactComponent as FolderIcon} from "../../../../../../assets/PrivateCabinet/folder-2.svg";
import {colors} from "../../../../../../generalComponents/collections";

function ShareFolder({folder, close, action_type, setShowSuccessMessage}) {
    const [error, setError] = useState(false);
    const [emptyField, setEmptyField] = useState(false);
    const [displayStotagePeriod, setDisplayStotagePeriod] = useState(false);
    const [displaySetPassword, setDisplaySetPassword] = useState(false);
    const [displayMessengers, setDisplayMessengers] = useState(false);
    const [dateValue, setDateValue] = useState('');
    const [timeValue, setTimeValue] = useState({hours: '', minutes: '', seconds: ''});
    const uid = useSelector(state => state.user.uid);
    const [size, ] = useState('0 MB')
    const [data, setData] = useState(
        {
            uid,
            dir: folder.path,
            email: '',
            prim: '',
            deadline: '',
            is_read: true
    });
    const linkRef = useRef('');
    const setTime = (time, limit) => {
        return time < limit
        ? time < 10 ? `0${time}` : time
        : time[0];
    }

    useEffect(()=> {
        if (action_type === 'share') {
            setData(data => ({...data, is_write: 1, dir: folder?.info?.path}))
        }
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(()=> {
        setData(data => ({...data, deadline: dateValue ? `${dateValue} ${timeValue.hours ? setTime(timeValue.hours, 24) : '23'}:${timeValue.minutes ? setTime(timeValue.minutes, 60) : '59'}` : ''}))
    },[dateValue, timeValue]) // eslint-disable-line react-hooks/exhaustive-deps

    const onShareFile = async (forAll, isRead) => { // "$GUEST$" to give access to every user that has a link
        const email = forAll ?? data.email;
        const is_read = isRead ?? data['is_read'];
        const url = `/ajax/dir_access_add.php?uid=${data.uid}&dir=${data.dir}&email=${email}&is_read=${is_read}&prim=${data.prim}&deadline=${data.deadline}`;
        try {
            const res = await api.get(url);
            if(res.data.ok === 1) {
                if(res.data.link_shere_to_user) return res.data.link_shere_to_user
            } else if (res.data.error) {
                setError(res.data.error === 'user_to not found' ? 'Пользователь не найден' : res.data.error)
            } else {
                setError('Что-то пошло не так. Повторите попытку позже')
            }
        } catch (err) {
            setError(`${err}`)
        }
    }

    const copyLink = async (forAll, isRead) => {
        const link = await onShareFile(forAll, isRead);
        if(link) {
            if(navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(link);
            } else {
                linkRef.current.value = link;
                linkRef.current.focus();
                linkRef.current.select();
                document.execCommand('copy');
                linkRef.current.value = '';
            }
            setShowSuccessMessage('Ссылка скопирована');
        }
    }

    const copyRead = () => copyLink('$GUEST$', true);
    const copyWrite = () => copyLink('$GUEST$', false);
    const onShareToUser = async () => {
        const res = await onShareFile();
        if(res) close();
    }

    return (
        <PopUp set={close}>
            {!displayStotagePeriod && !displayMessengers && <div className={styles.ShareFile_wrap}>
                <div className={classNames(styles.header, styles.border_bottom)}>
                    <div className={styles.innerFileWrap}>
                        <FolderIcon className={`${styles.folderIcon} ${folder?.info?.color ? colors.filter(el => el.color === folder.info.color)[0]?.name : folder.info?.nameRu ? styles.generalFolder : ''}`} />
                        {folder?.info?.is_pass ? <img className={styles.lock} src='./assets/PrivateCabinet/locked.svg' alt='lock' /> : null}
                    </div>
                    <div className={styles.descriptionWrap}>
                        <div className={styles.fileName}>{folder?.info?.nameRu ?? folder?.info?.name}</div>
                        <div className={styles.innerFileInfo}>
                            <div className={styles.fileSize}>{size}</div>
                            <div className={styles.descriptionGroup}>
                                {folder?.info?.fig && <img src={`./assets/PrivateCabinet/signs/${folder.info.fig}.svg`} alt='sign' />}
                                {folder?.info?.emo && <img src={`./assets/PrivateCabinet/smiles/${folder.info.emo}.svg`} alt='emoji' />}
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttons_wrap}>
                        <div className={styles.close_wrap}  onClick={close}>
                            <span className={styles.close} />
                        </div>
                    </div>
                </div>
                <div className={classNames(styles.recipient, styles.border_bottom)}>
                    <p className={styles.recipient_title}>
                        Кому:
                    </p>
                    <div className={styles.recipient_mail}>
                        <input className={emptyField ? styles.empty : ''} onClick={() => setEmptyField(false)} onChange={(e)=> setData(data => ({...data, email: e.target.value}))} value={data.email} placeholder='Эл.адрес или имя' type='text'></input>
                    </div>
                    <div className={styles.recipient_messenger}>
                        <span onClick={() => setDisplayMessengers(true)}>Отправить через мессенджер</span>
                    </div>
                </div>
                <div className={classNames(styles.comment, styles.border_bottom)}>
                    <textarea onChange={(e)=> setData(data => ({...data, prim: e.target.value}))} value={data.prim}  placeholder='Добавить комментарий к Файлу' type='text'></textarea >
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
                <div className={styles.share_link}>
                    <h5 className={styles.share_link_title}>Поделиться вместо этого ссылкой </h5>
                    <div className={styles.row_item}>
                        <div className={styles.ico_wrap}>
                            <Pensil className={styles.row_ico} />
                        </div>
                        <div className={styles.input_wrap}>
                            <p className={styles.input_title}>Может редактировать</p>
                            <input value='Все у кого есть эта ссылка, смогут изменять файл' type='button'></input>
                        </div>
                        <span
                            className={styles.set_btn}
                            onClick={copyWrite}
                        >Скопировать ссылку</span>
                    </div>
                    <div className={styles.row_item}>
                        <div className={styles.ico_wrap}>
                            <Eye className={styles.row_ico} />
                        </div>
                        <div className={styles.input_wrap}>
                            <p className={styles.input_title}>Может просматривать</p>
                            <input value='Все у кого есть эта ссылка, смогут просматривать файл' type='button'></input>
                        </div>
                        <span
                            className={styles.set_btn}
                            onClick={copyRead}
                        >Скопировать ссылку</span>
                    </div>
                </div>
                <div className={styles.buttonsWrap}>
                        <div className={styles.add} onClick={() => {data.email ? onShareToUser() : setEmptyField(true)}}>Отправить</div>
                </div>
            </div>}
            {error && <Error error={error} set={close} message={error} />}
            {displayStotagePeriod && <StoragePeriod
                folder={folder}
                setDisplayStotagePeriod={setDisplayStotagePeriod}
                dateValue={dateValue}
                setDateValue={setDateValue}
                timeValue={timeValue}
                setTimeValue={setTimeValue}
                size={size}
            />}
            {displayMessengers && <ShareToMessengers
                setDisplayMessengers={setDisplayMessengers}
                close={close}
                // TODO - Use created url
                fid={folder?.info?.fid}
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

export default ShareFolder
