import React from 'react';

import styles from './DrawZone.module.sass';
import Loader from "../../../../../generalComponents/Loaders/4HUB";

function DrawZone({params, setParams, canvasRef, mainRef, addImageRef, images}) {

    return <main className={styles.paintField} ref={mainRef}>
        <div className={styles.canvasWrap}>
            {params.isLoading ? <Loader
                type='bounceDots'
                position='absolute'
                background='rgba(255, 255, 255, 0)'
                zIndex={5}
                containerType='bounceDots'
                width='60%'
                height='80%'
            /> : null}
            <canvas
                ref={canvasRef}
                className={styles.canvas}
                width={mainRef?.current?.getBoundingClientRect().width - 30 || 0}
                height={mainRef?.current?.getBoundingClientRect().height - 30 || 0}
            />
            {images?.loaded?.length > 1 ? <div className={styles.verticalDivider}/> : null}
            {images?.loaded?.length > 2 ? <div className={styles.horizontalDivider}/> : null}
        </div>
    </main>
}

export default DrawZone;
