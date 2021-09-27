import React, {useState} from 'react';

import styles from './FolderProperty.module.sass';
import PopUp from '../../../../../../generalComponents/PopUp';
import General from './General';
import Security from './Security';
import PrevVersions from './PrevVersions';

const FolderProperty = ({close, folder }) => {

    const [inset, setInset] = useState('general');
    return(<PopUp set={close}>
        <div className={styles.propertiesWrap}>
            <span className={styles.cross} onClick={close} />
            <span className={styles.title}>Свойства: {folder?.name}</span>
            <div className={styles.insetWrap}>
                <div
                    className={`${styles.inset} ${inset === 'general' ? styles.chosen : null}`}
                    onClick={() => setInset('general')}
                >Общие</div>
                <div
                    className={`${styles.inset} ${inset === 'security' ? styles.chosen : null}`}
                    onClick={() => setInset('security')}
                >Доступы</div>
                <div
                    className={`${styles.inset} ${inset === 'prev' ? styles.chosen : null}`}
                    onClick={() => setInset('prev')}
                >Предыдущие версии</div>
            </div>
            {inset === 'general' ? <General folder={folder} /> : null}
            {inset === 'security' ? <Security folder={folder} /> : null}
            {inset === 'prev' ? <PrevVersions folder={folder} /> : null}
            <div className={styles.buttonsWrap}>
                <div className={styles.cancel} onClick={close}>Отмена</div>
                <div className={`${styles.add}`} onClick={close}>Готово</div>
            </div>
        </div>
    </PopUp>)
}

export default FolderProperty;