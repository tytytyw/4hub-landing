import React from 'react'

import styles from './DataMemory.module.sass'
import {Pie} from 'react-chartjs-2'
import Button from "../Button";
import {imageSrc} from '../../../../../generalComponents/globalVariables';
import {useLocales} from "react-localized";

const DataMemory = ({setPageOption}) => {
    const { __ } = useLocales();
    return (
        <div className={styles.wrapper}>

            <div className={styles.diagramWrap}>
                <Pie
                    type='pie'
                    className={styles.diagram}
                    data={{
                        labels: false,
                        datasets: [{
                            label: 'My First Dataset',
                            data: [300, 50, 100],
                            backgroundColor: [
                                'rgb(0, 123, 255)',
                                'rgb(54, 184, 23)',
                                'rgb(219, 187, 149)'
                            ],
                            hoverOffset: 4
                        }]
                    }}
                />
            </div>

            <div className={styles.contentWrap}>
                <div className={styles.diagramData}>

                    <div className={styles.diagramDataInfo}>
                        <div className={styles.usedMemory}>
                            <p>Использовано: <span>18%</span></p>
                        </div>
                        <div className={styles.usedMemoryData}>
                            <p>{ __('Использовано: ') }<span>28.6</span>{ __('ГБ') } { __('из') } <span>100</span>{ __('ГБ') }</p>
                        </div>
                    </div>

                    <div className={styles.diagramDataView}>
                        <span style={{background: '#007BFF', width: '50%'}}/>
                        <span style={{background: '#36B817', width: '20%'}}/>
                        <span style={{background: '#DBBB95', width: '12%'}}/>
                        <span style={{background: '#7B66D0', width: '5%'}}/>
                    </div>

                </div>

                <div className={styles.memorySource}>

                    <div className={styles.sourceItem}>
                        <div className={styles.sourceImg}>
                            <img src={imageSrc + "assets/PrivateCabinet/video-player.svg"} alt="VideoPlay"/>
                        </div>
                        <p className={styles.sourceName}>{ __('Фильмы') }</p>
                        <p className={styles.sourceSize}>12 { __('ГБ') }</p>
                    </div>

                    <div className={styles.sourceItem}>
                        <div className={styles.sourceImg}>
                            <img src={imageSrc + "assets/PrivateCabinet/picture.svg"} alt="PictureCart"/>
                        </div>
                        <p className={styles.sourceName}>{ __('Изображения') }</p>
                        <p className={styles.sourceSize}>8 { __('ГБ') }</p>
                    </div>

                    <div className={styles.sourceItem}>
                        <div className={styles.sourceImg}>
                            <img src={imageSrc + "assets/PrivateCabinet/music-player.svg"} alt="MusicPlay"/>
                        </div>
                        <p className={styles.sourceName}>{ __('Музыка') }</p>
                        <p className={styles.sourceSize}>500 { __('МБ') }</p>
                    </div>

                    <div className={styles.sourceItem}>
                        <div className={styles.sourceImg}>
                            <img src={imageSrc + "assets/PrivateCabinet/document.svg"} alt="DocumentRead"/>
                        </div>
                        <p className={styles.sourceName}>{ __('Документы') }</p>
                        <p className={styles.sourceSize}>2 { __('ГБ') }</p>
                    </div>

                </div>

                <div className={styles.renew}>
                    <p>{ __('Пакет на использование 100 ГБ хранилища действителед до 26.12.2020') }</p>
                    <button className={styles.renewBtn}>{ __('Продлить') }</button>
                </div>
            </div>

            <div className={styles.actionBlock}>
                <Button
                    onClick={() => setPageOption('tariff_plan')}
                >
                    { __('Сменить пакет') }
                </Button>
            </div>

        </div>
    )
}

export default DataMemory