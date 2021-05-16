import React from 'react';

import styles from './Colors.module.sass';
import { colors } from '../collections';

const Colors = ({ color, setColor }) => {

    const renderColors = () => {
        return colors.map((el, i) => {
            return <div
                key={i}
                className={styles.circleColor}
                style={{
                    background: color?.dark === el.dark ? el.dark : el.light,
                    border: `1px solid ${el.dark}`
                }}
                onClick={() => setColor(el)}
            />
        })
    };

    return (
        <div className={styles.colorWrap}>
            <span>Выберите цвет</span>
            <div>{renderColors()}</div>
        </div>
    )
};

export default Colors;
