import React, {useState} from 'react';
import File from '../../../../../../generalComponents/Files';
import classNames from 'classnames';
// import { useSelector, useDispatch } from 'react-redux';

import styles from './ShareFile.module.sass';
// import api from '../../../../api';
import PopUp from '../../../../../../generalComponents/PopUp';
// import ContactList from '../../../MyProfile/Contacts/ContactList/ContactList';
// import {tags, colors} from '../../../../generalComponents/collections';
// import Error from '../../../../generalComponents/Error';
// import { onCustomizeFile, onAddRecentFiles } from '../../../../Store/actions/PrivateCabinetActions';
// import Colors from '../../../../generalComponents/Elements/Colors';
// import '../../../../generalComponents/colors.sass';
// import Signs from '../../../../generalComponents/Elements/Signs';
// import File from '../../../../generalComponents/Files';

import { ReactComponent as Password } from '../../../../../../assets/PrivateCabinet/password.svg';
import { ReactComponent as Calendar } from '../../../../../../assets/PrivateCabinet/calendar-6.svg';
import { ReactComponent as Pensil } from '../../../../../../assets/PrivateCabinet/edit.svg';
import { ReactComponent as Eye } from '../../../../../../assets/PrivateCabinet/eye.svg';

function ShareFile({file, close}) {
    return (
        <PopUp set={close}>
            <div className={styles.ShareFile_wrap}>
                <div className={classNames(styles.header, styles.border_bottom)}>
                    <div className={styles.innerFileWrap}>
                        <File color={file.id_color} format={file.ext} />
                        {file.is_pass ? <img className={styles.lock} src='./assets/PrivateCabinet/locked.svg' alt='lock' /> : null}
                    </div>
                    <div className={styles.descriptionWrap}>
                        <div className={styles.fileName}>{file.name.slice(0, file.name.lastIndexOf('.'))}</div>
                        <div className={styles.innerFileInfo}>
                            <div className={styles.fileSize}>{file.size_now}</div>
                            <div className={styles.descriptionGroup}>
                                {file.fig && <img src={`./assets/PrivateCabinet/signs/${file.fig}.svg`} alt='sign' />}
                                {file.emo && <img src={`./assets/PrivateCabinet/smiles/${file.emo}.svg`} alt='emoji' />}
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttons_wrap}>
                    <div
                        className={styles.file_menu}
                        // TODO: контекстное меню  
                        // onClick={(e) => {
                        //     setMouseParams({
                        //         x: e.clientX,
                        //         y: e.clientY,
                        //         width: 200,
                        //         height: 30,
                        //     });
                        // }}
                    >
                        <span className={styles.dots}></span>
                    </div>
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
                        {/*TODO: вынести инпут в отдельный компонент?*/}
                        <input placeholder='Эл.адрес или имя' type='text'></input>
                    </div>
                    <div className={styles.recipient_messenger}>
                        <input value='Отправить через мессенджер' type='button'></input>
                    </div>
                </div>
                <div className={classNames(styles.comment, styles.border_bottom)}>
                    <textarea placeholder='Добавить комментарий к Файлу' type='text'></textarea >
                </div>
                <div className={classNames(styles.row_item, styles.border_bottom)}>
                    {/* <Locked /> */}
                    <div className={styles.ico_wrap}>
                        <Password className={styles.row_ico} />
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>Пароль</p>
                        <input id={'input_pass'} placeholder='Вы можете установить пароль на данный файл' type='password'></input>
                    </div>
                    <input className={styles.input_submit} value='Установить' type='submit' />
                </div>
                <div className={classNames(styles.row_item, styles.border_bottom)}>
                    {/* <Locked /> */}
                    <div className={styles.ico_wrap}>
                        <Calendar className={styles.row_ico} />
                    </div>
                    <div className={styles.input_wrap}>
                        <p className={styles.input_title}>Срок хранения файла/папки</p>
                        <input value='Установите срок хранения файла (после завершения файл будет удален)' type='button'></input>
                    </div>
                    <input className={styles.input_submit} value='Установить' type='submit' />
                </div>
                <div className={styles.share_link}>
                    <h5 className={styles.share_link_title}>Поделиться вместо этого ссылкой </h5>
                    <div className={styles.row_item}>
                        <div className={styles.ico_wrap}>
                            <Pensil className={styles.row_ico} />
                        </div>
                        <div className={styles.input_wrap}>
                            <p className={styles.input_title}>Может редактировать</p>
                            <input value='Все у кого есть эта ссылкаа, смогут изменять файл' type='button'></input>
                        </div>
                        <input className={styles.input_submit} value='Скопировать ссылку' type='submit' />
                    </div>
                    <div className={styles.row_item}>
                        <div className={styles.ico_wrap}>
                            <Eye className={styles.row_ico} />
                        </div>
                        <div className={styles.input_wrap}>
                            <p className={styles.input_title}>Может просматривать</p>
                            <input value='Все у кого есть эта ссылка, смогут просматривать файл' type='button'></input>
                        </div>
                        <input className={styles.input_submit} value='Скопировать ссылку' type='submit' />
                    </div>
                </div>
            </div>
        </PopUp>
    )
}

export default ShareFile
