import React from "react";

import styles from "./General.module.sass";
import { ReactComponent as FolderIcon } from "../../../../../../../assets/PrivateCabinet/folder-2.svg";
import { colors } from "../../../../../../../generalComponents/collections";
import InputField from "../../../../../../../generalComponents/InputField";

const General = ({ folder }) => {
	return (
		<div className={styles.generalWrap}>
			<div className={styles.nameBlock}>
				<div className={styles.folderWrap}>
					<FolderIcon
						className={`${styles.folderWrap} ${
							colors.filter((el) => el.color === folder.info.color)[0]?.name
						}`}
					/>
				</div>
				<div className={styles.inputWrap}>
					<InputField
						height="90%"
						placeholder={folder.info.name}
						disabled={true}
					/>
				</div>
			</div>
			<div className={styles.typeBlock}>
                <div className={styles.typeWrap}>
					<span className={styles.name}>Тип файла:</span>
					<span className={styles.value}>Папка</span>
				</div>
				<div className={styles.typeWrap}>
					<span className={styles.name}>Расположение:</span>
					<span className={styles.value}>{folder.info.path}</span>
				</div>
			</div>
			<div className={styles.infoBlock}>
				<div className={styles.infoWrap}>
					<span className={styles.name}>Размер:</span>
					<span className={styles.value}>{folder.size_now}</span>
				</div>
				<div className={styles.infoWrap}>
					<span className={styles.name}>Дата создания:</span>
					<span className={styles.value}>{folder.mtime}</span>
				</div>
				<div className={styles.infoWrap}>
					<span className={styles.name}>Дата изменения:</span>
					<span className={styles.value}>{folder.ctime}</span>
				</div>
			</div>
		</div>
	);
};

export default General;
