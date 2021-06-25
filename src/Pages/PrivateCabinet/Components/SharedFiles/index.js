import React, {useState} from 'react'

import styles from './SharedFiles.module.sass'
import SearchField from '../SearchField'
import StorageSize from '../StorageSize'
import Notifications from '../Notifications'
import Profile from '../Profile'
import ServePanel from '../ServePanel'
import Select from '../../../../generalComponents/Select/Select'
import classNames from 'classnames'
import FileLine from './WorkElements/FileLine'
import {useSelector} from 'react-redux'
import {getYears, months} from './helper'

const SharedFiles = () => {

    const [workElementsView, setWorkElementsView] = useState('workLinesPreview')
    const [search, setSearch] = useState(null)
    const fileList = useSelector((state) => state.PrivateCabinet.fileList);

    const [year, setYear] = useState(null)
    const [month, setMonth] = useState(null)

    const [chosenFile, setChosenFile] = useState(null)
    const [action, setAction] = useState({ type: "", name: "", text: "" })
    const [mouseParams, setMouseParams] = useState(null)
    const [filePreview, setFilePreview] = useState(null)

    const renderFiles = () => {
        if (!fileList) return null
        return fileList.files?.map((file, index) => (
            <FileLine
                key={index}
                file={file}
                setChosenFile={setChosenFile}
                chosenFile={chosenFile}
                setMouseParams={setMouseParams}
                setAction={setAction}
                filePreview={filePreview}
                setFilePreview={setFilePreview}
            />
        ))
    }

    return (
        <div className={styles.parentWrapper}>

            <div className={styles.header}>
                <SearchField />
                <div className={styles.infoHeader}>
                    <StorageSize />
                    <Notifications />
                    <Profile />
                </div>
            </div>

            <ServePanel
                setView={setWorkElementsView}
                view={workElementsView}
            />

            <div className={styles.wrapper}>

                <div className={styles.contentHeader}>

                    <div className={styles.searchWrap}>

                        <div className={styles.yearSelect}>
                            <Select
                                placeholder='Выбрать год'
                                className={styles.select}
                                classNameSelect={styles.selectContentYear}
                                data={getYears()}
                            />
                        </div>

                        <div className={styles.search}>
                            <input
                                type="search"
                                value={search}
                                onChange={event => setSearch(event.target.value)}
                                className={styles.input}
                                placeholder='Введите ключевое слово'
                            />
                            <img
                                className={styles.icon}
                                src="./assets/PrivateCabinet/magnifying-glass-2.svg"
                                alt="Search"
                            />
                        </div>

                    </div>

                    <div className={styles.buttonsWrap}>

                        {months?.map((item, index) => (
                            <button
                                onClick={() => setMonth(item.id)}
                                className={classNames({
                                    [styles.button]: true,
                                    [styles.active]: item.id === month
                                })}
                            >
                                {item.text}
                            </button>
                        ))}

                        <div className={styles.daySelect}>
                            <Select
                                placeholder='Выбрать год'
                                className={styles.select}
                                classNameSelect={styles.selectContent}
                                data={getYears()}
                            />
                        </div>

                    </div>

                </div>

                <div className={styles.filesWrap}>

                    <div className={styles.fileWrap}>

                        <div className={styles.collapseHeader}>
                            <p className={styles.dateName}>Август</p>
                            <button className={styles.collapseBtn}>
                                2 объектов
                            </button>
                            <div className={styles.arrowFile}>
                                <img
                                    src="./assets/PrivateCabinet/play-grey.svg"
                                    alt="Play Grey"
                                />
                            </div>
                        </div>

                        <div className={styles.fileDate}>
                            <p>10.08.2020</p>
                        </div>

                        <div className={styles.collapseContent}>
                            {renderFiles()}
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default SharedFiles