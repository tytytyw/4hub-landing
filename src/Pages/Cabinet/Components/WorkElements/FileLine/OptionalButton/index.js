import React from "react";
import {useSelector} from 'react-redux'
import styles from "./OptionalButton.module.sass";
import { useLocation } from "react-router";
import classNames from "classnames";

const OptionalButton = () => {
	const { pathname } = useLocation();
	const size = useSelector(state => state.Cabinet.size)

	const renderInSharedFiles = () => (
		<div onClick={() => console.log("Открыть файл в системе 4Hub")}>
			<span>Открыть файл в системе 4Hub</span>
		</div>
	);

	const renderInArchive = () => (
		<div onClick={() => console.log("Разархивировать")}>
			<span>Разархивировать</span>
		</div>
	)

	return (
		<div className={classNames(styles.wrapper, styles[size])} >
			{pathname === "/downloaded-files" && renderInSharedFiles()}
			{pathname === "/archive" && renderInArchive()}
		</div>
	);
};

export default OptionalButton;
