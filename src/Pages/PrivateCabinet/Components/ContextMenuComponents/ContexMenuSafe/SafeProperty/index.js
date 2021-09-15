import React, { useState } from "react";

import styles from "./SafeProperty.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import General from "./General";
import Security from "./Security";
import PrevVersions from "./PrevVersions";

const SafeProperty = ({ close, safe }) => {
	const [inset, setInset] = useState("general");
	return (
		<PopUp set={close}>
			<div className={styles.propertiesWrap}>
				<span className={styles.cross} onClick={close} />
				<span className={styles.title}>Свойства: {safe?.name}</span>
				<div className={styles.insetWrap}>
					<div
						className={`${styles.inset} ${
							inset === "general" ? styles.chosen : null
						}`}
						onClick={() => setInset("general")}
					>
						Общие
					</div>
					<div
						className={`${styles.inset} ${
							inset === "security" ? styles.chosen : null
						}`}
						onClick={() => setInset("security")}
					>
						Доступы
					</div>
					<div
						className={`${styles.inset} ${
							inset === "prev" ? styles.chosen : null
						}`}
						onClick={() => setInset("prev")}
					>
						Предыдущие версии
					</div>
				</div>
				{inset === "general" ? <General safe={safe} /> : null}
				{inset === "security" ? <Security safe={safe} /> : null}
				{inset === "prev" ? <PrevVersions safe={safe} /> : null}
				<div className={styles.buttonsWrap}>
					<div className={styles.cancel} onClick={close}>
						Отмена
					</div>
					<div className={`${styles.add}`} onClick={close}>
						Готово
					</div>
				</div>
			</div>
		</PopUp>
	);
};

export default SafeProperty;
