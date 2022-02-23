import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styles from './Programms.module.sass'
import List from '../List'
import WorkSpace from './WorkSpace'
import CustomFolderItem from './CustomFolderItem'
import {
    onGetCategories,
    onGetPrograms,
    onGetRecentPrograms,
    onGetTopListPrograms,
    onGetProgramFolders
} from '../../../../Store/actions/CabinetActions'
import SearchField from "../../../../generalComponents/SearchField";

const Programs = () => {

    const dispatch = useDispatch()
    const size = useSelector(state => state.Cabinet.size)
    const recentPrograms = useSelector(state => state.Cabinet.recentPrograms)

    const [listCollapsed, setListCollapsed] = useState('')

    const [chosenFolder, ] = useState(null)
    const [chosenProgram, setChosenProgram] = useState()
    const [search, setSearch] = useState('')

    const [newFolderInfo, setNewFolderInfo] = useState({path: ''})
    const searchPlaceholder = "Введите название программы";

    useEffect(() => {
        dispatch(onGetProgramFolders())
        dispatch(onGetRecentPrograms())
        dispatch(onGetTopListPrograms())
        dispatch(onGetCategories())
        dispatch(onGetPrograms(chosenFolder?.id))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const renderPrograms = () => {

        if (!recentPrograms) return null;
        return recentPrograms.map((folder, i) => {
            return <CustomFolderItem
                key={i + folder.name}
                folder={folder}
                listSize={size}
                listCollapsed={listCollapsed}
                setNewFolderInfo={setNewFolderInfo}
                newFolderInfo={newFolderInfo}
                chosen={chosenFolder?.path === folder.path}
                padding={'0px 10px 0px 26px'}
            />
        })
    }

    return (
        <div className={styles.workAreaWrap}>
            <List
                icon={false}
                title='Программы'
                src='add-folder.svg'
                setListCollapsed={setListCollapsed}
                listCollapsed={listCollapsed}
                onCreate={() => {}}
            >
                {listCollapsed ? null : (
                    <div className={styles.borderBottom}>
                        <SearchField value={search} setValue={setSearch} placeholder={searchPlaceholder} />
                    </div>
                )}
                <div></div>
                {renderPrograms()}
            </List>

            <WorkSpace
                chosenProgram={chosenProgram}
                setChosenProgram={setChosenProgram}
                listCollapsed={listCollapsed}
            />

        </div>
    )
}

export default Programs
