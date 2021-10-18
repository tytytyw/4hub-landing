import React from 'react';

import styles from './OptionButtomLine.module.sass';
import classNames from "classnames";

const OptionButtomLine = ({selectedDevices, setSelectedDevices, onSubmit, onCancel}) => {

    return (
        <div className={styles.optionBottomLine}>
            <div className={styles.cancel} onClick={onCancel}>Отмена</div>
            <div
                className={classNames({
                    [styles.buttonDisabled]: true,
                    [styles.edit]: selectedDevices.length > 0
                })}
                onClick={() => onSubmit()}
            >Блокировать</div>
        </div>
    )
}

export default OptionButtomLine;