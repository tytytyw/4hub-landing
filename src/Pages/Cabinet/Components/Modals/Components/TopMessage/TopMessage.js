import React, { useEffect } from 'react'
import styles from './TopMessage.module.sass'

import { useSelector, useDispatch } from "react-redux"
import {onSetModals} from "../../../../../../Store/actions/CabinetActions";

function TopMessage({ showSuccessMessage }) {

    const topMessage = useSelector(s => s.Cabinet.modals.topMessage);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            dispatch(onSetModals('topMessage', {...topMessage, open: false, type: 'message', message: ''}))
        }, 3000)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
        {topMessage.open ? <div className={styles.wrap}>
            <div className={styles[topMessage.type]}>
                {showSuccessMessage}
            </div>
        </div> : null}
        </>
    )
}

export default TopMessage;