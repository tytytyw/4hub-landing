import React, {useState} from 'react'
import styles from './Programms.module.sass'
import WorkSpace from './WorkSpace'
import CategoryList from "./CategoryList/CategoryList";

const Programs = () => {

    const [listCollapsed, setListCollapsed] = useState('');

    const [chosenProgram, setChosenProgram] = useState();

    return (
        <div className={styles.workAreaWrap}>
            <CategoryList
                listCollapsed={listCollapsed}
                setListCollapsed={setListCollapsed}
            />
            <WorkSpace
                chosenProgram={chosenProgram}
                setChosenProgram={setChosenProgram}
                listCollapsed={listCollapsed}
            />

        </div>
    )
}

export default Programs
