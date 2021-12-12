import React from "react";
import styles from "./FileView.module.sass";
import { ReactComponent as PrinterImg } from "../../../../../../assets/BusinessCabinet/print.svg";
import { ReactComponent as PointerMenuImg } from "../../../../../../assets/BusinessCabinet/pointer-menu.svg";
import ContextMenu from "../../../../../../generalComponents/ContextMenu";
import { contextMenuDocFile } from "../../../../../../generalComponents/collections";
import { projectSrc } from "../../../../../../generalComponents/globalVariables";

const FileView = ({
	pageOption,
	mouseParams,
	setMouseParams,
	renderMenuItems,
	previewSrc
}) => {
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
			type: "delete",
			name: "Удаление файла",
			text: `Вы действительно хотите удалить файл?`,
			// callback: (list, index) => setAction(list[index]),
            callback: () => {},
		},
	];

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
			{mouseParams !== null && mouseParams.type === "contextMenuFile" ? (
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
		</div>
	);
};

export default FileView;
