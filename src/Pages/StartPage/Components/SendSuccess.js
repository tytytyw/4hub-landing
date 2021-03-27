import React from 'react';

import styles from './SendSuccess.module.sass';
import File from '../../../generalComponents/File';

const SendSuccess = ({data, set}) => {
    const format = data.files.file.name.split('.');
 return(
     <div className={styles.successWrap}>
        <div>Файл успешно отправлен</div>
        <span className={styles.cross} onClick={() => set('')} />
        <div className={styles.imageWrap}>
            <img src='./assets/StartPage/success-file-send.svg'
                 alt=''
                 className={styles.computer}
            />
            <img src='./assets/StartPage/paper-plane-left.svg'
                 alt=''
                 className={styles.planeLeft}
            />
            <img src='./assets/StartPage/paper-plane-right.svg'
                 alt=''
                 className={styles.planeRight}
            />
            <div className={styles.fileWrap}>
                <File format={format[format.length - 1].toLowerCase()} />
            </div>
        </div>
         <span className={styles.infoText}>
             Ваш файл успешно отправлен на указанный email так же вы можете скопировать ссылку
         </span>
         <div className={styles.linkWrap}>
             <div className={styles.inputWrap}><input type='text' value={`http://fs2.mh.net.ua${data.link}`} readOnly /></div>
             <div
                 className={styles.imgWrap}
                 onClick={() => navigator.clipboard.writeText(`http://fs2.mh.net.ua${data.link}`)}
             ><img src='./assets/StartPage/link-icon.svg' alt='copy' /></div>
         </div>
         <div
             className={styles.copyButton}
             onClick={() => navigator.clipboard.writeText(`http://fs2.mh.net.ua${data.link}`)}
         >Копировать ссылку</div>
     </div>
 )
};

export default SendSuccess;
