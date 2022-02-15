import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import styles from "./OptionalButton.module.sass";
import {useHistory, useLocation} from "react-router";
import {onSetPath, onChooseFiles, onsetInitialChosenFile, onSetModals, onGetArchiveFiles} from '../../../../../../Store/actions/CabinetActions'
import api from "../../../../../../api";
import classNames from "classnames";

const OptionalButton = ({file, successLoad}) => {
	const history = useHistory()
	const { pathname } = useLocation();
	const size = useSelector(state => state.Cabinet.size)
	const dispatch = useDispatch()
	const uid = useSelector((state) => state.user.uid);
	
	const goToFolder = () => {
        const path = file.gdir
		dispatch(onsetInitialChosenFile(file))
        dispatch(onChooseFiles(path, '', 1, '', ''))
		dispatch(onSetPath(path));
		setTimeout(() => history.push("/folders"), 50)
    }

	const unArchiveFile = () => {
		api.get(`/ajax/file_unarchive.php?uid=${uid}&fid1=${file.fid}`)
			.then((res) => {
				if (res.data.ok) {
					//TODO: replace to topMessage
					onGetArchiveFiles('', 1, '', successLoad, '')
					//TODO: dispatch fileList filter
					dispatch(onSetModals('success', {open: true, message: 'Файл успешно разархивирован', title: ''}));
				} else throw new Error();
			})
			.catch(() => dispatch(onSetModals('error', {open: true, message: 'что-то пошло не так', title: 'ошибка'})))
	}
 
	const renderInSharedFiles = () => (
		// onSetPath
		<div onClick={goToFolder}>
			<span>Открыть файл в системе 4Hub</span>
		</div>
	);

	const renderInArchive = () => (
		<div onClick={unArchiveFile}>
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
