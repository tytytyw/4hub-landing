import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useDebounce} from '../../../../generalComponents/Hooks';

import styles from "./SearchField.module.sass";
import {onChooseFiles, onSearch} from '../../../../Store/actions/PrivateCabinetActions';
import Select from "../../../../generalComponents/Select/Select";


const SearchField = ({setChosenFile}) => {
	const inputRef = useRef(null);
	const path = useSelector(state => state.PrivateCabinet?.fileList?.path || state.PrivateCabinet?.folderList?.path);
	const searchField = useSelector(state => state.PrivateCabinet?.search);
	const dispatch = useDispatch();

	const search = (query) => dispatch(onChooseFiles(path, query));
	const debounceCallback = useDebounce(search, 500);
	const handleChange = (e) => {
		if(setChosenFile) setChosenFile(null);
		dispatch(onSearch(e.target.value));
		debounceCallback(e.target.value);
	};

	const [searchArea, setSearhArea] = useState([{text: 'Глобальный', active: true, id:'Глобальный'}, {text: 'Локальный', active: false, id:'Локальный'}])

	useEffect(() => {onSearch('')}, [path]);

	return (
		<div className={styles.searchWrap}>
			<img
				src="./assets/PrivateCabinet/magnifying-glass-2.svg"
				alt="magnify"
				onClick={() => inputRef.current.focus()}
			/>
			<input
				placeholder='Введите название файла/папки'
				value={searchField}
				ref={inputRef}
				onChange={handleChange}
			/>
			<Select
				placeholder={searchArea.filter(item => item.active)[0].text}
				className={styles.select}
				classNameSelect={styles.SearchType}
				setSearhArea={setSearhArea}
				data={searchArea}
			/>
			
		</div>
	);
};

export default SearchField;
