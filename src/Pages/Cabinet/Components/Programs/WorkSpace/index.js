import React from 'react'

import styles from './WorkSpace.module.sass'
import SearchField from '../../SearchField'
import StorageSize from '../../StorageSize'
import Notifications from '../../Notifications'
import classnames from "classnames";

const WorkSpace = ({
       // chosenTopListProgram,
       // setChosenTopListProgram,
       listCollapsed
}) => {

    // const dispatch = useDispatch();

    // const programs = useSelector(state => state.Cabinet.programs);
    // const size = useSelector(state => state.Cabinet.size);


    // Types of Files view
    // const renderPrograms = (Type) => {
    //     if (!programs) return null;
    //     return programs.map((program, i) => {
    //         return <Type
    //             key={i}
    //             program={program}
    //             // setChosenProgram={setChosenProgram}
    //             // chosenProgram={chosenProgram}
    //             // setMouseParams={setMouseParams}
    //             // setAction={setAction}
    //             // setFilePreview={setFilePreview}
    //             // filePreview={filePreview}
    //             size={size}
    //         />
    //     });
    // }

    return (
        <>
            <div
                className={classnames({
                    [styles.workSpaceWrap]: true,
                    [styles.collapsed]: listCollapsed,
                    [styles.notCollapsed]: !listCollapsed,
                })}
            >
                <div className={styles.header}>
                    <SearchField/>
                    <div className={styles.infoHeader}>
                        <StorageSize/>
                        <Notifications/>
                        {/*<Profile setItem={setItem}/>*/}
                    </div>
                </div>
            </div>
        </>)
}

export default WorkSpace
