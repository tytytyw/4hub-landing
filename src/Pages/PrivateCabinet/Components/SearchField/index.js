import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useDebounce} from '../../../../generalComponents/Hooks';

import styles from "./SearchField.module.sass";
import {onChooseFiles} from '../../../../Store/actions/PrivateCabinetActions';



const SearchField = ({ fileList, setFoundFiles }) => {
	const inputRef = useRef(null);
	const [value, setValue] = useState('');
	const path = useSelector(state => state.PrivateCabinet?.fileList?.path || state.PrivateCabinet?.folderList?.path);
	const dispatch = useDispatch();

	const search = (query) => dispatch(onChooseFiles(path, query));
	const debounceCallback = useDebounce(search, 500);
	const handleChange = (e) => {
		setValue(e.target.value);
		debounceCallback(e.target.value);
	};

	return (
		<div className={styles.searchWrap}>
			<input
				placeholder='Введите название файла/папки'
				value={value}
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
