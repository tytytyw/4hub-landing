import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import styles from "./SearchField.module.sass";
import {onChooseFiles, onSearch} from "../../../../../Store/actions/PrivateCabinetActions";
import {useDebounce} from "../../../../../generalComponents/Hooks";

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
			
		</div>
	);
};

export default SearchField;
