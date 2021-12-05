import React from "react";
import styles from "./FileView.module.sass";
import { ReactComponent as PrinterImg } from "../../../../../../assets/BusinessCabinet/print.svg";
import { ReactComponent as PointerMenuImg } from "../../../../../../assets/BusinessCabinet/pointer-menu.svg";
import logoImg from "../../../../../../assets/BusinessCabinet/logo.png";
import ContextMenu from "../../../../../../generalComponents/ContextMenu";
import { contextMenuDocFile } from "../../../../../../generalComponents/collections";

const FileView = ({
	pageOption,
	mouseParams,
	setMouseParams,
	renderMenuItems,
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
				<div className={styles.header}>
					<img className={styles.logoImg} src={logoImg} alt="" />
				</div>

				<h2 className={styles.title}>{pageOption.label}</h2>
				<p className={styles.text}>
					Это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem
					Ipsum является стандартной "рыбой" для текстов на латинице с начала
					XVI века.
					<br />
					<br />
					В то время некий безымянный печатник создал большую коллекцию размеров
					и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem
					Ipsum не только успешно пережил без заметных изменений пять веков, но
					и перешагнул в электронный дизайн. Его популяризации в новое время
					послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х
					годах и, в более недавнее время, программы электронной вёрстки типа
					Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.
					<br />
					<br />
					часто используемый в печати и вэб-дизайне. Lorem Ipsum является
					стандартной "рыбой" для текстов на латинице с начала XVI века.
					<br />
					<br />
					В то время некий безымянный печатник создал большую коллекцию размеров
					и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem
					Ipsum не только успешно пережил без заметных изменений пять веков, но
					и перешагнул в электронный дизайн. Его популяризации в новое время
					послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х
					годах и, в более недавнее время, программы электронной вёрстки типа
					Aldus PageMaker, в шаблонах которых используется Lorem Ipsum. часто
					используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной
					"рыбой" для текстов на латинице с начала XVI века.
					<br />
					<br />
					часто используемый в печати и вэб-дизайне. Lorem Ipsum является
					стандартной "рыбой" для текстов на латинице с начала XVI века.
					<br />
					<br />В то время некий безымянный печатник создал большую коллекцию
					размеров и форм шрифтов, используя Lorem Ipsum для распечатки
					образцов. Lorem Ipsum не только успешно пережил без заметных изменений
					пять веков, но и перешагнул в электронный дизайн. Его популяризации в
					новое время послужили публикация листов Letraset с образцами Lorem
					Ipsum в 60-х годах и, в более недавнее время,
				</p>
			</div>
			{mouseParams !== null && mouseParams.type === "contextMenuFile" ? (
				<ContextMenu
					params={mouseParams}
					setParams={setMouseParams}
					tooltip={true}
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
