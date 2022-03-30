import React, {useState} from 'react';

import styles from './FolderProperty.module.sass';
import PopUp from '../../../../../../generalComponents/PopUp';
import General from './General';
import Security from './Security';
import PrevVersions from './PrevVersions';
import {useLocales} from "react-localized";

const FolderProperty = ({close, folder }) => {
    const { __ } = useLocales();
    const [inset, setInset] = useState('general');
    return(<PopUp set={close}>
        <div className={styles.propertiesWrap}>
            <span className={styles.cross} onClick={close} />
            <span className={styles.title}>Свойства: {folder?.info.name}</span>
            <div className={styles.insetWrap}>
                <div
                    className={`${styles.inset} ${inset === 'general' ? styles.chosen : null}`}
                    onClick={() => setInset('general')}
                >{ __('Общие') }</div>
                <div
                    className={`${styles.inset} ${inset === 'security' ? styles.chosen : null}`}
                    onClick={() => setInset('security')}
                >{ __('Доступы') }</div>
                <div
                    className={`${styles.inset} ${inset === 'prev' ? styles.chosen : null}`}
                    onClick={() => setInset('prev')}
                >{ __('Предыдущие версии') }</div>
            </div>
            {inset === 'general' ? <General folder={folder} /> : null}
            {inset === 'security' ? <Security folder={folder} /> : null}
            {inset === 'prev' ? <PrevVersions folder={folder} /> : null}
            <div className={styles.buttonsWrap}>
                <div className={styles.cancel} onClick={close}>{ __('Отмена') }</div>
                <div className={`${styles.add}`} onClick={close}>{ __('Готово') }</div>
            </div>
        </div>
    </PopUp>)
}

export default FolderProperty;