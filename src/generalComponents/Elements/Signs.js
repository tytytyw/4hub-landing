import React from 'react';

import styles from './Signs.module.sass';
import { signs } from '../collections';
import classnames from "classnames";

const Signs = ({sign, setSign, title = 'Добавить знак', editableClass = ''}) => {

    const renderSigns = () => {
        return signs.map((el, i) => {
            return <div
                key={i}
                className={classnames({
                    [styles.sign]: true,
                    [styles.signChosen]: sign === el
                })}
                onClick={() => setSign(el)}
            ><img src={`./assets/PrivateCabinet/signs/${el}.svg`} alt='sign' />
            </div>
        })
    };

    return (
        <div className={`${styles.signsWrap} ${editableClass ? styles[editableClass] : ''}`}>
            <span className={styles.title}>{title}</span>
            <div>{renderSigns()}</div>
        </div>
    )
}

export default Signs;
