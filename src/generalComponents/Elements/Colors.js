import React from 'react';

import styles from './Colors.module.sass';
import { colors } from '../collections';

const Colors = ({ color, setColor }) => {

    const renderColors = () => {
        return colors.map((el, i) => {
            return <div
                className={`
                    ${styles.circleColorWrap} 
                    ${el.name === color.name ? styles.chosenColorWrap : ''}`}
                key={i}
            ><div
                className={styles.circleColor}
                style={{
                    background: el.light,
                    border: `1px solid ${el.dark}`
                }}
                onClick={() => setColor(el)}
            /></div>
        })
    };

    return (
        <div className={styles.colorWrap}>
            <span>Выберите цвет</span>
            <div>{renderColors()}</div>
        </div>
    )
}

export default Colors;
