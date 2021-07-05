import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useDebounce} from '../../../../generalComponents/Hooks';

import styles from "./SearchField.module.sass";
import {onChooseFiles, onSearch} from '../../../../Store/actions/PrivateCabinetActions';



const SearchField = ({setChosenFile}) => {
	const inputRef = useRef(null);
	const path = useSelector(state => state.PrivateCabinet?.fileList?.path || state.PrivateCabinet?.folderList?.path);
	const searchField = useSelector(state => state.PrivateCabinet?.search);
	const dispatch = useDispatch();

	const search = (query) => dispatch(onChooseFiles(path, query));
	const debounceCallback = useDebounce(search, 500);
	const handleChange = (e) => {
		setChosenFile(null);
		dispatch(onSearch(e.target.value));
		debounceCallback(e.target.value);
	};

	useEffect(() => {onSearch('')}, [path]);

	return (
		<div className={styles.searchWrap}>
			<input
				placeholder='Введите название файла/папки'
				value={searchField}
				ref={inputRef}
				onChange={handleChange}
			/>
			<img
				src="./assets/PrivateCabinet/magnifying-glass-2.svg"
				alt="magnify"
				onClick={() => inputRef.current.focus()}
			/>
		</div>
	);
};

export default SearchField;
