import React, {useState} from 'react'
import styles from './ShareToMessengers.module.sass'
import PopUp from '../../../../../../generalComponents/PopUp'
import {imageSrc} from '../../../../../../generalComponents/globalVariables';
import {ReactComponent as ChatIcon} from '../../../../../../assets/PrivateCabinet/sms.svg'
import Button from '../../../MyProfile/Button'
import {messengersData} from '../../../MyProfile/Contacts/consts'
import classNames from 'classnames'

const ShareToMessengers = ({setDisplayMessengers}) => {

    const [selectedSoc, setSelectedSoc] = useState(null)
    const [hrefSoc] = useState(null)
    // const file_link = `http://fs2.mh.net.ua/ajax/download.php?fid=${fid}`;
    // useEffect(()=> {
    //     switch(selectedSoc) {
    //         case 'telegram':
    //             setHrefSoc(`https://t.me/share/url?url=${file_link}`)
    //             break;
    //         case 'whatsapp':
    //             setHrefSoc(`https://api.whatsapp.com/send/?text=${file_link}`)
    //             break;
    //         case 'viber':
    //             setHrefSoc(`viber://forward?text=${file_link}`)
    //             break;
    //         default:
    //             setHrefSoc('')
    //         //TODO: skype, slack
    //     }
    // },[selectedSoc]) // eslint-disable-line react-hooks/exhaustive-deps
    

    return (
        <PopUp set={setDisplayMessengers}>
            <div
                className={styles.wrapper}
            >
                <div className={styles.header}>
                    <div className={styles.profileWrap}>
                        <img
                            className={styles.profileImg}
                            src={imageSrc + './assets/PrivateCabinet/logo.svg'}
                            alt='logo'
                        />
                    </div>
                    <span
                        className={styles.close}
                        onClick={() => setDisplayMessengers(false)}
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
                    </div>
                </div>

                <div className={styles.actionBlock}>
                    <a target='_blanck' href={hrefSoc}>
                        <Button className={styles.actionBtn} disabled={true}>
                            Отправить
                        </Button>
                    </a>
                </div>

            </div>
        </PopUp>
    )
}

export default ShareToMessengers