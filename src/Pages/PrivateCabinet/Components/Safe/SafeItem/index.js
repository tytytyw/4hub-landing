import React from 'react'

import styles from './SafeItem.module.sass'
import '../../../../../generalComponents/colors.sass'
import classNames from 'classnames'

const SafeItem = ({safe, chosen, setMouseParams, onClick, listSize}) => {

    return (
        <>
            <div
                className={classNames({
                    [styles.wrapper]: true,
                    [styles.wrapperChosen]: !!chosen,
                    [styles?.[`wrapper_${listSize}`]]: true
                })}
                onClick={onClick}
            >
                <div
                    className={styles.menuWrap}
                    onClick={e => {
                        setMouseParams({x: e.clientX, y: e.clientY, width: 200, height: 30})
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

                        {safe?.fig &&
                        <img
                            className={styles.symbols}
                            src={`./assets/PrivateCabinet/signs/${safe.fig}.svg`}
                            alt='emoji'
                        />}
                    </div>
                </div>

                <div className={styles.content}>
                    <img
                        className={styles.safeImg}
                        src="./assets/PrivateCabinet/bank.svg"
                        alt="Safe"
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
