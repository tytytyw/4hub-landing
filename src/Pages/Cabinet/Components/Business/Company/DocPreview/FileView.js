import React from "react";
import { useDispatch } from "react-redux";
import styles from "./FileView.module.sass";
import { ReactComponent as PrinterImg } from "../../../../../../assets/BusinessCabinet/print.svg";
import { ReactComponent as PointerMenuImg } from "../../../../../../assets/BusinessCabinet/pointer-menu.svg";
import ContextMenu from "../../../../../../generalComponents/ContextMenu";
import { contextMenuDocFile } from "../../../../../../generalComponents/collections";
import { projectSrc } from "../../../../../../generalComponents/globalVariables";
import ActionApproval from "../../../../../../generalComponents/ActionApproval";
import { onDeleteCompanyDocument }  from "../../../../../../Store/actions/CabinetActions";
import { ReactComponent as CaseIcon } from "../../../../../../assets/BusinessCabinet/case.svg";
import { ReactComponent as MissionIco } from "../../../../../../assets/BusinessCabinet/mission.svg";
import { ReactComponent as VisionIco } from "../../../../../../assets/BusinessCabinet/vision.svg";

const FileView = ({
	pageOption,
	mouseParams,
	setMouseParams,
	renderMenuItems,
	previewSrc,
	action,
	setAction,
	nullifyAction,
	setShowSuccessMessage
}) => {
	const dispatch = useDispatch();

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
			type: "customize",
			name: "Редактировать файл",
			text: ``,
			// callback: (list, index) => setAction(list[index]),
            callback: () => {},
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
			<div className={styles.printWrapper}>
				<button className={styles.printBtn}>
					<PrinterImg />
				</button>
				<button onClick={onContextClick} className={styles.printBtn}>
					<PointerMenuImg/>
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
		</div>
	);
};

export default FileView;
