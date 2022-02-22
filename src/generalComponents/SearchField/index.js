import React from "react";

import styles from "./SearchField.module.sass";
import { imageSrc } from "../globalVariables";

const SearchField = ({
	 value,
	 setValue,
	 placeholder = "Введите имя пользователя"
}) => {
	return (
		<div className={styles.wrapper}>
			<input
                className={styles.input}
				placeholder={placeholder}
				type="text"
				onChange={(e) => setValue(e.target.value)}
				value={value}
			/>
			<img
				src={
					imageSrc +
					`assets/PrivateCabinet/${
						value ? "garbage.svg" : "magnifying-glass-2.svg"
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
