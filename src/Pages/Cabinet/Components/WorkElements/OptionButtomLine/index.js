import React from 'react';

import styles from './OptionButtomLine.module.sass';

const OptionButtomLine = ({filePick, actionName, setAction, action, setFilePick, callbackArrMain, nullifyFilePick}) => {

    const onAction = () => {
        if(filePick.files.length > 0) {
            if(filePick.intoZip) {
                callbackArrMain.forEach((el, index, list) => {
                    if(el.type === 'intoZip') setAction({...action, type: list[index].type, name: list[index].name})
                })
            } else {setFilePick({...filePick, customize: true})}
        }
    }

    return (
        <div className={styles.optionBottomLine}>
            <div className={styles.cancel} onClick={nullifyFilePick}>Отмена</div>
            <div className={`${filePick.files.length > 0 ? styles.edit : styles.buttonDisabled}`} onClick={onAction}>{actionName}</div>
        </div>
    )
}

export default OptionButtomLine;