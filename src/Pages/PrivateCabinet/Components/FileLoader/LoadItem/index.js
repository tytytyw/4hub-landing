import React, {useEffect, useRef, useState} from 'react';

import styles from './LoadItem.module.sass';
import File from "../../../../../generalComponents/Files";
import {ReactComponent as CheckIcon} from "../../../../../assets/PrivateCabinet/check.svg";
import {ReactComponent as CrossIcon} from "../../../../../assets/PrivateCabinet/remove.svg";

const LoadItem = ({list, index, set, loaded, processing, name, ext, color}) => {

    const [data, setData] = useState({strokeDasharray: `0 0`, strokeDashoffset: `${2 * Math.PI * 45}`})
    const circleRef = useRef();
    const onProgress = (processing) => {
        const radius = circleRef?.current?.r?.baseVal?.value;
        const circumference = 2 * Math.PI * radius;
        setData({
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: `${circumference - processing / 100 * circumference}`
        });
    };

    useEffect(() => {onProgress(processing)}, [processing]);

    const deleteItem = () => {
        const items = [...list];
        items.splice(index, 1);
        console.log(items);
        set(items);
    }

    return (<div className={styles.loadItemWrap}>
        <div className={styles.nameWrap}>
            <div className={styles.fileWrap}><File format={ext} color={color} /></div>
            <span className={styles.name}>{name}</span>
        </div>
        <div className={styles.optionsItemWrap}>
            {loaded ? <CheckIcon className={styles.checkIcon} /> : null}
            {!loaded && !processing ? <CrossIcon className={styles.crossIcon} onClick={deleteItem} /> : null}
            {processing ? <span className={styles.progress}>
                <svg viewBox="0 0 100 100" width="30px">
                  <circle className={styles.load} cx="50" cy="50" r="45"/>
                  <circle className={styles.loaded} cx="50" cy="50" r="45" ref={circleRef} strokeDasharray={data.strokeDasharray} strokeDashoffset={data.strokeDashoffset} />
                </svg>
            </span>: null}
        </div>
    </div>)
};

export default LoadItem;