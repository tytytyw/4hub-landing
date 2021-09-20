import React from "react";

import styles from "./General.module.sass";
import InputField from "../../../../../../../generalComponents/InputField";

const General = ({ project, getIcon }) => {
	return (
		<div className={styles.generalWrap}>
			<div className={styles.nameBlock}>
				<div className={styles.projectWrap}>
					{getIcon(project)}
				</div>
				<div className={styles.inputWrap}>
					<InputField height="90%" placeholder={project.name} disabled={true} />
				</div>
			</div>
			<div className={styles.typeBlock}>
				<div className={styles.typeWrap}>
					<span className={styles.name}>Тип файла:</span>
					<span className={styles.value}>Проект</span>
				</div>
				<div className={styles.typeWrap}>
					<span className={styles.name}>Расположение:</span>
					<span className={styles.value}></span>
				</div>
			</div>
			<div className={styles.infoBlock}>
				<div className={styles.infoWrap}>
					<span className={styles.name}>Размер:</span>
					<span className={styles.value}></span>
				</div>
				<div className={styles.infoWrap}>
					<span className={styles.name}>Дата создания:</span>
					<span className={styles.value}>{project.ut}</span>
				</div>
				<div className={styles.infoWrap}>
					<span className={styles.name}>Дата изменения:</span>
					<span className={styles.value}></span>
				</div>
			</div>
		</div>
	);
};

export default General;
