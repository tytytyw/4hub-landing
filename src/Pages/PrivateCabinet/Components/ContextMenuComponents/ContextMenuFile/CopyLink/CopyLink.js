import React, { useRef, useEffect } from 'react'
import styles from './CopyLink.module.sass'

function CopyLink({ fid, setShowLinkCopy }) {
    const ref = useRef(null);

    const copyText = () => {
        if(navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(`http://fs2.mh.net.ua/ajax/download.php?fid=${fid}`)
        } else {
            ref.current.focus();
            ref.current.select();
            document.execCommand('copy');
        }
    };

    useEffect(() => {
        copyText()
        setTimeout(() => setShowLinkCopy(false), 3000)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={styles.wrap}>
            <input className={styles.input_link} ref={ref} type='text' value={`http://fs2.mh.net.ua/ajax/download.php?fid=${fid}`} readOnly />
            <div className={styles.message}>
                Ссылка скопирована
            </div>
        </div>
    )
}

export default CopyLink
