import React, { useRef } from "react";
import styles from "../UploadFile/UploadFile.module.sass";

import { ReactComponent as CaseIcon } from "../../../../../../assets/BusinessCabinet/case.svg";
import classNames from "classnames";

const UploadFile = ({title, setBlob, blob}) => {
	const labelRef = useRef();
	const upload = () => {
		labelRef.current.click();
	};

    const onAddFile = (e) => {
        setBlob(e.target.files[0])
    }

	return (
		<div className={styles.centeredWrapper}>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<CaseIcon className={styles.icon} />
					<p className={styles.title} >{title}</p>
				</div>

				<div className={styles.infoBlock}>
					<p className={styles.labelText}>
						Добавьте документ {title.toLowerCase()}
					</p>
					<div onClick={upload} className={styles.uploadBlock}>
						<p
							onClick={(e) => e.stopPropagation()}
							className={styles.uploadText}
						>
							Перетащите сюда файл или
							<label ref={labelRef} htmlFor="Verification-upload">
								{" "}
								Загрузите
							</label>
						</p>
						<input onChange={onAddFile} id="Verification-upload" type="file" />
					</div>
				</div>

				<div className={styles.actionBlock}>
					<button className={styles.cancelBtn}>Отмена</button>
					<button className={classNames({[styles.action]: true, [styles.disableBtn] : !blob})} >Подтвердить</button>
				</div>
			</div>
		</div>
	);
}

export default UploadFile;
