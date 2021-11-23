import React from 'react';

import styles from './OptionButtomLine.module.sass';

const OptionButtomLine = ({
      filePick, setAction, action, setFilePick, callbackArrMain, nullifyFilePick, share, chosenFile, archive
}) => {

    const onZip = () => {
        if(filePick.files.length > 0) {
                callbackArrMain.forEach((el, index, list) => {
                    if(el.type === 'intoZip') setAction({...action, type: list[index].type, name: list[index].name});
                })
        }
    }

    const onEdit = () => filePick.files.length > 0 ? setFilePick({...filePick, customize: true}) : null;

    const onShare = () => chosenFile ? share() : null;

    const onMoveToArchive = () => chosenFile ? archive() : null;

    return (
        <div className={styles.optionBottomLine}>
            <div className={styles.cancel} onClick={nullifyFilePick}>Отмена</div>
            <div
                className={`${filePick.files.length > 0 ? styles.edit : styles.buttonDisabled}`}
                onClick={onZip}
            >Сжать в ZIP</div>
            <div
                className={`${filePick.files.length > 0 ? styles.edit : styles.buttonDisabled}`}
                onClick={onShare}
            >Расшарить</div>
            <div
                className={`${filePick.files.length > 0 ? styles.edit : styles.buttonDisabled}`}
                onClick={onMoveToArchive}
            >Пер. в архив</div>
            <div
                className={`${filePick.files.length > 0 ? styles.edit : styles.buttonDisabled}`}
                onClick={onEdit}
            >Редактировать</div>
        </div>
    )
}

export default OptionButtomLine;