import React from 'react'

import styles from './StarRating.module.sass'
import {ReactComponent as StarIcon} from '../../../../../../assets/PrivateCabinet/star.svg'
import classNames from 'classnames'

const StarRating = ({rating}) => {

    const renderRatings = rating => {
        const result = []
        for (let i = 1; i <= 5; i++) {

            const rate = parseInt(rating)
            const bool = Math.floor(rate) < i

            result.push(
                <StarIcon
                    src="./assets/PrivateCabinet/star.svg"
                    alt="Star"
                    className={classNames({
                        [styles.star]: true,
                        [styles.starDisabled]: bool
                    })}
                />
            )
        }
        return result
    }

    return (
        <div className={styles.wrapper}>
            {renderRatings(rating)}
        </div>
    )
}

export default StarRating