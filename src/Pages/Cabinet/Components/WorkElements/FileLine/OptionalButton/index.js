import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import styles from "./OptionalButton.module.sass";
import {useHistory, useLocation} from "react-router";
import {onSetPath, onChooseFiles, onsetInitialChosenFile} from '../../../../../../Store/actions/CabinetActions'
import classNames from "classnames";

const OptionalButton = ({file}) => {
	const history = useHistory()
	const { pathname } = useLocation();
	const size = useSelector(state => state.Cabinet.size)
	const dispatch = useDispatch()
	
	const goToFolder = () => {
        const path = file.gdir
		dispatch(onsetInitialChosenFile(file))
        dispatch(onChooseFiles(path, '', 1, '', ''))
		dispatch(onSetPath(path));
		setTimeout(() => history.push("/folders"), 50)
    }

	const renderInSharedFiles = () => (
		// onSetPath
		<div onClick={goToFolder}>
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
