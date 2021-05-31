import React from 'react';

import styles from './OptionButtomLine.module.sass';

const OptionButtomLine = ({filePick, actionName, setAction, setFilePick}) => {

    const onEditFiles = () => {
        if(filePick.files.length > 0) setFilePick({...filePick, customize: true});
    }

    return (
        <div className={styles.optionBottomLine}>
            <div className={styles.cancel} onClick={() => setAction({type: '', name: '', text: ''})}>Отмена</div>
            <div className={`${filePick.files.length > 0 ? styles.edit : styles.buttonDisabled}`} onClick={onEditFiles}>{actionName}</div>
        </div>
    )
}

export default OptionButtomLine;