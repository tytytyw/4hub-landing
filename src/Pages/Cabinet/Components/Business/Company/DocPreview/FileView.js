import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./FileView.module.sass";
import { ReactComponent as DownloadIco } from "../../../../../../assets/PrivateCabinet/download.svg";
import { ReactComponent as PointerMenuImg } from "../../../../../../assets/BusinessCabinet/pointer-menu.svg";
import ContextMenu from "../../../../../../generalComponents/ContextMenu";
import { contextMenuDocFile } from "../../../../../../generalComponents/collections";
import { projectSrc } from "../../../../../../generalComponents/globalVariables";
import ActionApproval from "../../../../../../generalComponents/ActionApproval";
import { onDeleteCompanyDocument, onGetCompanyDocument }  from "../../../../../../Store/actions/CabinetActions";
import { ReactComponent as CaseIcon } from "../../../../../../assets/BusinessCabinet/case.svg";
import { ReactComponent as MissionIco } from "../../../../../../assets/BusinessCabinet/mission.svg";
import { ReactComponent as VisionIco } from "../../../../../../assets/BusinessCabinet/vision.svg";
import PopUp from "../../../../../../generalComponents/PopUp";
import classNames from 'classnames'

const FileView = ({
	pageOption,
	mouseParams,
	setMouseParams,
	renderMenuItems,
	previewSrc,
	editSrc,
	action,
	setAction,
	nullifyAction,
	setShowSuccessMessage
}) => {
	const dispatch = useDispatch();
	const [editFile, setEditFile] = useState(false)

	const onContextClick = (e) => {
		setMouseParams({
			type: "contextMenuFile",
			x: e.clientX,
			y: e.clientY,
			width: 163,
			height: 45,
		});
	};
	const callbackArr = [
		{
			type: "editFile",
			name: "Редактировать файл",
			text: ``,
            callback: () => openFileEditor(),
		},
		{
			type: "deleteFile",
			name: "Удаление файла",
			text: `Вы действительно хотите удалить файл?`,
			callback: (list, index) => setAction(list[index]),
		},
	];

	const deleteFile = () => {
		nullifyAction()
		dispatch(onDeleteCompanyDocument(pageOption.name, setShowSuccessMessage, 'документ удален'))
	}
	const openFileEditor = () => {
		nullifyAction()
		setEditFile(true)
	}
	const onCloseFileEditor = () => {
		setEditFile(false)
		setTimeout(() => dispatch(onGetCompanyDocument(pageOption.name)), 3000)
	}
	const renderIcon = () => {
        switch(pageOption.name) {
            case 'standards': return <CaseIcon />
            case 'mission': return <MissionIco />
            case 'viziya': return <VisionIco />
            default: return 'file'
        }
    }

	return (
		<div className={styles.wrapper}>
			<div className={styles.btnWrapper}>
				<button onClick={onContextClick} className={styles.contextBtn}>
					<PointerMenuImg />
				</button>
			</div>
			<div className={classNames(styles.btnWrapper, styles.downloadBtn)}>
				<button onClick={() => document.downloadFile.submit()} className={styles.contextBtn}>
					<DownloadIco />
				</button>
			</div>

			<div className={styles.content}>
				<embed style={{height: "100%", width: "100%"}}  type="application/pdf"  src={projectSrc + previewSrc}></embed>
			</div>
			{mouseParams !== null && mouseParams?.type === "contextMenuFile" ? (
				<ContextMenu
					params={mouseParams}
					setParams={setMouseParams}
					tooltip={false}
					customClose={true}
					disableAutohide={true}
				>
					<div className={styles.mainMenuItems}>
						{renderMenuItems(contextMenuDocFile, callbackArr)}
					</div>
				</ContextMenu>
			) : null}
			{action?.type === "deleteFile" ? (
				<ActionApproval
					name={action.name}
					text={action.text}
					set={nullifyAction}
					callback={deleteFile}
					approve={'Удалить'}
				>
                    {renderIcon()}
                </ActionApproval>
			) : null}
			{editFile
			? <PopUp set={onCloseFileEditor}><div className={styles.editFile}><iframe title={pageOption.name} frameBorder="0" src={editSrc}></iframe></div></PopUp>
			: null}
		</div>
	);
};

export default FileView;
