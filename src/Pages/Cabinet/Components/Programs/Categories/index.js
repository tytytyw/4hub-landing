import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import styles from './Categories.module.sass'
import classNames from 'classnames'
import {categoryIcons} from '../consts'
import {onGetPrograms} from '../../../../../Store/actions/CabinetActions'

const Categories = ({chosenCategory, setChosenCategory}) => {

    const dispatch = useDispatch()
    const categories = useSelector(state => state.Cabinet.categories)

    const renderCategories = () => {
        if (!categories) return null
        return categories.map((program, i) => {
            return <div
                className={classNames({
                    [styles.fileWrap]: true,
                    [styles.chosen]: chosenCategory === program?.id
                })}
                key={i}
                onClick={() => {
                    setChosenCategory(program?.id)
                    dispatch(onGetPrograms())
                }}
            >
                <div className={styles.innerFileWrap}>
                    <img
                        src={categoryIcons[program?.type]}
                        alt={program?.name}
                    />
                </div>
                <div className={styles.descriptionWrap}>
                    <div className={styles.fileName}>{program.name}</div>
                </div>
            </div>
        })
    }

    return (
        <div className={styles.wrap}>
            <div className={styles.recentFilesWrap}>
                {renderCategories()}
            </div>
        </div>
    )
}

export default Categories