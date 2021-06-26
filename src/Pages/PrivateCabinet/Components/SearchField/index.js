import React, { useRef } from "react";

import styles from "./SearchField.module.sass";

const SearchField = ({ fileList, setFoundFiles }) => {
	const inputRef = useRef(null);
	const searchFiles = (value) => {
		setFoundFiles(
			value !== ""
				? fileList?.files.filter((file) => file.name.includes(value))
				: null
		);
	};

	return (
		<div className={styles.searchWrap}>
			<input
				placeholder="Введите название файла/папки"
				ref={inputRef}
				onChange={(e) => searchFiles(e.target.value)}
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
