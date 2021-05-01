import React from 'react'

import styles from './Support.module.sass'

import Accordion from '../../Accordion/Accordion'
import QuestionForm from './QuestionForm/QuestionForm'

const Support = () => {
    return (
        <div className={styles.support}>

            <h2 className={styles.title}>Часто задаваемые вопросы</h2>
            <Accordion/>

            <h2 className={styles.title}>Остались вопросы?</h2>
            <QuestionForm/>

        </div>
    )
}

export default Support