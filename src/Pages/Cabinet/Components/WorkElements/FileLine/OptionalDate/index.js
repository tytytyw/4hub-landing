import React from "react";
import styles from "./OptionalDate.module.sass";
import { useLocation } from "react-router";

const OptionalDate = ({ file }) => {
	const { pathname } = useLocation();
	return (
		<div className={styles.wrapper}>
			<span className={styles.descriptoin}>Дата загрузки: </span>
			<span className={styles.value}>
				{pathname === "/downloaded-files" && file.ctime && file.ctime.split(' ')[0]}
			</span>
		</div>
	);
};

export default OptionalDate;
