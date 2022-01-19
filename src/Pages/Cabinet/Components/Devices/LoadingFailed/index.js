import React from "react";
import styles from "./LoadingFailed.module.sass";

const LoadingFailed = ({callback}) => {

	return (
		<div className={styles.errorWrapper}>
			<span className={styles.message}>Неудалось загрузить данные</span>
			<button className={styles.repeatBtn} onClick={callback}>Повторить</button>
		</div>
	);
};

export default LoadingFailed;