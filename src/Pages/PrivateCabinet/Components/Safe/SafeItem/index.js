import React from 'react'

import styles from './SafeItem.module.sass'
import classNames from 'classnames'
import SafeIcon from '../SafeIcon'

const SafeItem = ({safe, chosen, setMouseParams, onClick, listSize, setSelectedSafe}) => {

    return (
        <>
            <div
                className={classNames({
                    [styles.wrapper]: true,
                    [styles.wrapperChosen]: !!chosen,
                    [styles?.[`wrapper_${listSize}`]]: true
                })}
            >
                <div
                    className={styles.menuWrap}
                    onClick={e => {
                        setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 30})
                        setSelectedSafe(safe)
                    }}
                >
                    <span className={styles.menu}/>
                </div>

                <div className={styles.topPart}>
                    <div className={styles.icons}>
                        {safe?.emo &&
                        <img
                            className={styles.symbols}
                            src={`./assets/PrivateCabinet/smiles/${safe.emo}.svg`}
                            alt='emoji'
                        />}

                        {safe?.sign &&
                        <img
                            className={styles.symbols}
                            src={`./assets/PrivateCabinet/signs/${safe.sign}.svg`}
                            alt='emoji'
                        />}
                    </div>
                </div>

                <div
                    onClick={onClick}
                    className={styles.content}
                >

                    <SafeIcon
                        type={safe?.id_color || 'blue'}
                        className={styles.safeImg}
                    />

                    <div
                        className={classNames({
                            [styles.tagBlock]: true,
                            [styles.ftag]: !!safe?.tag
                        })}
                    >
                        {safe?.tag && `#${safe.tag}`}
                    </div>

                    <p>{safe?.name}</p>
                </div>

            </div>
        </>
    )
}

export default SafeItem
