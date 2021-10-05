import React, {useEffect} from 'react'

import styles from './Shops.module.sass'
import {ReactComponent as PlayIcon} from '../../../../../assets/PrivateCabinet/play-grey.svg'
import classNames from 'classnames'
import shoppingIcon from '../../../../../assets/PrivateCabinet/shopping-cart.svg'
import ShopItem from "../ShopItem";
import {imageSrc} from '../../../../../generalComponents/globalVariables';

const Shops = ({chosenShop, setChosenShop, collapseShop, setCollapseShop, setMouseParams, listSize, listCollapsed}) => {

    const shops = [
        {id: 1, name: 'App Store', img: `${imageSrc}assets/PrivateCabinet/shops/app-store.svg`},
        {id: 2, name: 'Google Play', img: `${imageSrc}assets/PrivateCabinet/shops/google-play.svg`},
        {id: 3, name: 'Street Market', img: `${imageSrc}assets/PrivateCabinet/shops/street-market.svg`},
    ]

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setChosenShop(null), [chosenShop])

    const renderShops = () => {

        return shops?.map((shop, index) => (
            <ShopItem
                key={index}
                shop={shop}
                chosenShop={chosenShop}
                setChosenShop={setChosenShop}
                setMouseParams={setMouseParams}
                listSize={listSize}
                listCollapsed={listCollapsed}
            />
        ))

    }

    return (
        <div
            className={classNames({
                [styles.listItem]: true,
                [styles.active]: collapseShop
            })}
        >
            <div
                onClick={() => setCollapseShop(!collapseShop)}
                className={styles.itemWrap}
            >
                <div className={styles.itemInfo}>
                    <img src={shoppingIcon} alt='Shop'/>
                    {!listCollapsed && <p>Магазин</p>}
                </div>
                <PlayIcon
                    className={classNames({
                        [styles.playButton]: true,
                        [styles.active]: collapseShop
                    })}
                />
            </div>

            {collapseShop &&
            <div className={styles.shopList}>
                {renderShops()}
            </div>}

        </div>
    )
}

export default Shops