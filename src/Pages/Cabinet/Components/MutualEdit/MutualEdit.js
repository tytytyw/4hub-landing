import React, {useRef, useState} from 'react';

import styles from './MutualEdit.module.sass';
import PopUp from "../../../../generalComponents/PopUp";
import MiniToolBar from "../WorkElements/MiniToolBar/MiniToolBar";
import Loader from "../../../../generalComponents/Loaders/4HUB";

function MutualEdit() {

    const canvasRef = useRef();
    const canvasWrapRef = useRef();

    const [params, setParams] = useState({isLoading: false})

    return<PopUp>
        <div className={styles.mutualEdit} ref={canvasWrapRef}>
            <header className={styles.header}>
                <MiniToolBar
                    canvasRef={canvasRef}
                    canvasWrapRef={canvasWrapRef}
                    toolBarType="mutualEdit"
                    title="Сравнить документы/файлы"
                    // setFilePreview={setFilePreview}
                    // share={share}
                />
            </header>
            <div className={styles.mainField}>
                <aside className={styles.leftPanel}></aside>
                <main>
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
                        />
                    </div>
                </main>
                <aside></aside>
            </div>
        </div>
    </PopUp>
}

export default MutualEdit