import React from "react";
import styles from "./OptionalDate.module.sass";
import { useLocation } from "react-router";

const OptionalDate = ({ file }) => {
	const { pathname } = useLocation();

	const getText = () => {
		switch (pathname) {
			case "/downloaded-files": return {title: "Дата загрузки: ", value: file.ctime?.split(' ')[0] ?? ""}
			// TODO: get date of arhive
			case "/archive": return {title: "Дата архивирования: ", value: file.atime?.split(' ')[0] ?? "00.00.0000"}
			default: return ""
		}
	}
 	return (
		<div className={styles.wrapper}>
			<span className={styles.description}>{getText().title}</span>
			<span className={styles.value}>{getText().value}</span>
		</div>
	);
};

export default OptionalDate;
