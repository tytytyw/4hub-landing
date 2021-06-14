import React, {useState} from 'react';

import styles from './FileProperty.module.sass';
import PopUp from '../../../../generalComponents/PopUp';
import General from './General';
import Security from './Security';
import PrevVersions from './PrevVersions';

const FileProperty = ({close, file }) => {

    const [inset, setInset] = useState('general');

    return(<PopUp set={close}>
        <div className={styles.propertiesWrap}>
            <span className={styles.cross} onClick={close} />
            <span className={styles.title}>Свойства: {file?.fname.slice(0, file?.fname.lastIndexOf('.'))}</span>
            <div className={styles.insetWrap}>
                <div
                    className={`${styles.inset} ${inset === 'general' ? styles.chosen : null}`}
                    onClick={() => setInset('general')}
                >Общие</div>
                <div
                    className={`${styles.inset} ${inset === 'security' ? styles.chosen : null}`}
                    onClick={() => setInset('security')}
                >Безопасность</div>
                <div
                    className={`${styles.inset} ${inset === 'prev' ? styles.chosen : null}`}
                    onClick={() => setInset('prev')}
                >Предыдущие версии</div>
            </div>
            {inset === 'general' ? <General file={file} /> : null}
            {inset === 'security' ? <Security file={file} /> : null}
            {inset === 'prev' ? <PrevVersions file={file} /> : null}
            <div className={styles.buttonsWrap}>
                <div className={styles.cancel} onClick={close}>Отмена</div>
                <div className={`${styles.add}`} onClick={close}>Оk</div>
            </div>
        </div>
    </PopUp>)
}

export default FileProperty;