import React from "react";

import styles from "./General.module.sass";
import InputField from "../../../../../../../generalComponents/InputField";
import {useLocales} from "react-localized";

const General = ({ project, getIcon }) => {
	const { __ } = useLocales()
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
					<span className={styles.name}>{ __('Тип файла:') }</span>
					<span className={styles.value}>{ __('Проект') }</span>
				</div>
				<div className={styles.typeWrap}>
					<span className={styles.name}>{ __('Расположение:') }</span>
					<span className={styles.value}/>
				</div>
			</div>
			<div className={styles.infoBlock}>
				<div className={styles.infoWrap}>
					<span className={styles.name}>{ __('Размер:') }</span>
					<span className={styles.value}/>
				</div>
				<div className={styles.infoWrap}>
					<span className={styles.name}>{ __('Дата создания:') }</span>
					<span className={styles.value}>{project.ut}</span>
				</div>
				<div className={styles.infoWrap}>
					<span className={styles.name}>{ __('Дата изменения:') }</span>
					<span className={styles.value}/>
				</div>
			</div>
		</div>
	);
};

export default General;
