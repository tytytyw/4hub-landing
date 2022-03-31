import React from 'react';

import styles from './Signs.module.sass';
import { signs } from '../collections';
import classnames from "classnames";
import {imageSrc} from '../globalVariables';
import {useLocales} from "react-localized";

const Signs = ({sign, setSign, title, editableClass = ''}) => {
    const { __ } = useLocales();
    if(!title) {
        title = __('Добавить знак')
    }
    const set = (el) => sign === el ? setSign('') : setSign(el);

    const renderSigns = () => {
        return signs.map((el, i) => {
            return <div
                key={i}
                className={classnames({
                    [styles.sign]: true,
                    [styles.signChosen]: sign === el
                })}
                onClick={() => set(el)}
            ><img src={`${imageSrc}assets/PrivateCabinet/signs/${el}.svg`} alt='sign' />
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
