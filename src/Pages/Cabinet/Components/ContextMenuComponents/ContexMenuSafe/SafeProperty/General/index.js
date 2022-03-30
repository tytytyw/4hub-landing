import React from "react";

import styles from "./General.module.sass";
import SafeIcon from "../../../../Safe/SafeIcon";
import InputField from "../../../../../../../generalComponents/InputField";
import {useLocales} from "react-localized";

const General = ({ safe }) => {
	const { __ } = useLocales();
	return (
		<div className={styles.generalWrap}>
			<div className={styles.nameBlock}>
				<div className={styles.safeWrap}>
					<SafeIcon type={safe.id_color} />
				</div>
				<div className={styles.inputWrap}>
					<InputField height="90%" placeholder={safe.name} disabled={true} />
				</div>
			</div>
			<div className={styles.typeBlock}>
				<div className={styles.typeWrap}>
					<span className={styles.name}>{ __('Тип файла:') }</span>
					<span className={styles.value}>{ __('Сейф') }</span>
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
					<span className={styles.value}>{safe.ut}</span>
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
