import React from "react";

import styles from "./SuccessPopup.module.sass";
import PopUp from "../../../../../generalComponents/PopUp";
import {useLocales} from "react-localized";

const SuccessPopup = ({ set, title, text, children }) => {
	const { __ } = useLocales()
	return (
		<PopUp set={set}>
			<div className={styles.wrapper}>
				<div className={styles.content}>{children}</div>

				<div className={styles.header}>
					<p>{title}</p>
				</div>
                <div className={styles.text}>
					<p>{text}</p>
				</div>
                

				<div className={styles.actionBlock}>
					<button onClick={() => set(false)} className={styles.actionBtn}>
						{ __('Готово') }
					</button>
				</div>
			</div>
		</PopUp>
	);
};

export default SuccessPopup;
