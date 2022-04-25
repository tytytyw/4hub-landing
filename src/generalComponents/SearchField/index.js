import React from "react";

import styles from "./SearchField.module.sass";
import { imageSrc } from "../globalVariables";
import { useLocales } from "react-localized";

const SearchField = ({
	value,
	setValue,
	placeholder,
	style
}) => {
	const { __ } = useLocales();
	if (!placeholder) {
		placeholder = __("Введите имя пользователя")
	}
	return (
		<div className={styles.wrapper}>
			<input
				className={styles.input}
				placeholder={placeholder}
				type="text"
				onChange={(e) => setValue(e.target.value)}
				value={value}
				style={style}
			/>
			<img
				src={
					imageSrc +
					`assets/PrivateCabinet/${value ? "garbage.svg" : "magnifying-glass-2.svg"
					}`
				}
				alt="search"
				className={styles.searchGlass}
				onClick={() => setValue("")}
			/>
		</div>
	);
};

export default SearchField;
