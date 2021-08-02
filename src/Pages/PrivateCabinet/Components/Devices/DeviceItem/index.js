import React from 'react'

import styles from './DeviceItem.module.sass'
import '../../../../../generalComponents/colors.sass'
import classNames from 'classnames'
import {imageSrc} from '../../../../../generalComponents/globalVariables';

const DeviceItem = ({ device, chosen, onClick, setMouseParams, listSize }) => {

    return (
        <>
            <div
                className={classNames({
                    [styles.wrapper]: true,
                    [styles.wrapperChosen]: !!chosen,
                    [styles?.[`wrapper_${listSize}`]]: !!listSize
                })}
                onClick={onClick}
            >
                <div className={styles.titleWrap}>
                    <div className={styles.titleImg}>
                        <img
                            src={imageSrc + `/assets/PrivateCabinet/devices/${device.device || 'unknown'}.svg`}
                            alt='icon'
                            className={styles.icon}
                        />
                    </div>
                    <span className={styles.title}>{device.name}</span>
                </div>
                <div className={styles.functionWrap}>
                    <div
                        className={styles.menuWrap}
                        onClick={e => setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 30})}
                    ><span className={styles.menu}/></div>
                </div>
            </div>

        </>
    )
};

export default DeviceItem
