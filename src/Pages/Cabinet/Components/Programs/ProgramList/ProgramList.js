import React, {useEffect, useState} from 'react';

import styles from './ProgramList.module.sass';
import List from "../../List";
import SearchField from "../../../../../generalComponents/SearchField";
import ProgramItem from "../ProgramItem/ProgramItem";
import {useDispatch, useSelector} from "react-redux";
import {onGetCategories} from "../../../../../Store/actions/CabinetActions";

function ProgramList({
    listCollapsed,
    setListCollapsed
}) {

    const size = useSelector(state => state.Cabinet.size);
    const [search, setSearch] = useState('');

    const [newFolderInfo, setNewFolderInfo] = useState({path: ''});
    const searchPlaceholder = "Введите название программы";
    const dispatch = useDispatch();
    const categories = useSelector(s => s.Cabinet.programs.categories);
    const chosenCategory = useSelector(s => s.Cabinet.programs.category);

    const renderPrograms = () => {
        return categories.map((category, i) => {
            return <ProgramItem
                key={i}
                category={category}
                listSize={size}
                listCollapsed={listCollapsed}
                setNewFolderInfo={setNewFolderInfo}
                newFolderInfo={newFolderInfo}
                chosen={chosenCategory.id === category.id}
                padding={'0px 10px 0px 26px'}
            />
        })
    }

    useEffect(() => {
        dispatch(onGetCategories())
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
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
    )
}

export default ProgramList;