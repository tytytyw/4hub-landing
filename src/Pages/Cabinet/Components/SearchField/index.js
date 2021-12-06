import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useDebounce} from '../../../../generalComponents/Hooks';
import {imageSrc} from '../../../../generalComponents/globalVariables';
import styles from "./SearchField.module.sass";
import {onChooseFiles, onSearch, onGetSafeFileList} from '../../../../Store/actions/CabinetActions';
import Select from "../../../../generalComponents/Select/Select";


const SearchField = ({setChosenFile, menuItem, selectable = true}) => {

	const inputRef = useRef(null);
	const path = useSelector(state => state.Cabinet?.fileList?.path || state.Cabinet?.folderList?.path);
	const searchField = useSelector(state => state.Cabinet?.search);
	const authorizedSafe = useSelector(state => state.Cabinet.authorizedSafe);
	const dispatch = useDispatch();

	const search = (query) => {
		if (menuItem === 'myFolders') dispatch(onChooseFiles(path, query, 1))
		if (menuItem === 'myFiles') dispatch(onChooseFiles('', query, 1, '', '', '', 'file_list_all'))
		if (menuItem === 'safe') dispatch(
            onGetSafeFileList(
                authorizedSafe.code,
                authorizedSafe.id_safe,
                authorizedSafe.password,
                '',
                '',
                '',
                query,
                1,
                ''
        ))
	};
	const debounceCallback = useDebounce(search, 500);
	const handleChange = (e) => {
		if(setChosenFile) setChosenFile(null);
		dispatch(onSearch(e.target.value));
		debounceCallback(e.target.value);
	};

	const [searchArea, setSearhArea] = useState([{text: 'Глобальный', active: true, id:'Глобальный'}, {text: 'Локальный', active: false, id:'Локальный'}])

	useEffect(() => {onSearch('')}, [path]);
	if (menuItem === 'safe' && !authorizedSafe) return null
	return (
		<div className={styles.searchWrap}>
			<img
				src={imageSrc + "assets/PrivateCabinet/magnifying-glass-2.svg"}
				alt="magnify"
				onClick={() => inputRef.current.focus()}
			/>
			<input
				placeholder='Введите название файла/папки'
				value={searchField}
				ref={inputRef}
				onChange={handleChange}
			/>
			{selectable &&
			<Select
				placeholder={searchArea.filter(item => item.active)[0].text}
				className={styles.select}
				classNameSelect={styles.SearchType}
				setSearhArea={setSearhArea}
				data={searchArea}
			/>}
			
		</div>
	);
};

export default SearchField;
