import React from "react";
import styles from "./OptionalButton.module.sass";
import { useLocation } from "react-router";

const OptionalButton = () => {
	const { pathname } = useLocation();

	const renderInSharedFiles = () => (
		<div onClick={() => console.log("Открыть файл в системе 4Hub")}>
			<span>Открыть файл в системе 4Hub</span>
		</div>
	);

	return (
		<div className={styles.wrapper}>
			{pathname === "/downloaded-files" && renderInSharedFiles()}
		</div>
	);
};

export default OptionalButton;
