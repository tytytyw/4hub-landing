import React, { useState } from "react";
import styles from "../UploadFile/UploadFile.module.sass";

import { ReactComponent as CaseIcon } from "../../../../../../assets/BusinessCabinet/case.svg";
import classNames from "classnames";

const UploadFile = ({title, setBlob, blob, setLoadingType, setPageOption}) => {
    const [formatError, setFormatError] = useState(false);

    const onAddFile = (e) => {
        const validateFile = file => {
            return file.name.slice(file.name.lastIndexOf('.')) === '.doc' || file.name.slice(file.name.lastIndexOf('.')) === '.docx'
		}
		if(validateFile(e.target.files[0])) {
			setFormatError(false)
			setBlob(e.target.files[0])
		} else {
			setBlob(null)
			setFormatError(true)
		}
    }
    const sendFile = () => {
		if (blob) {
            setLoadingType("squarify")
            // TODO: add api
            setTimeout(() => setLoadingType(''), 2000)
			// let form = new FormData();
			// form.append("file", blob);
			// api.post('', form)
			//     .then(res => {
			//     })
			//     .catch(err => {
			//         console.log(err);
			//     })
		}
	};

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
					<div className={styles.uploadBlock}>
						<p
							onClick={(e) => e.stopPropagation()}
							className={styles.uploadText}
						>
							Перетащите сюда файл или
							<label htmlFor="Verification-upload">
								{" "}
								Загрузите
							</label>
						</p>
						<input onChange={onAddFile} id="Verification-upload" type="file" />
					</div>
				</div>
                {formatError ? <p className={styles.fileError}> необходимо загрузить файл с раширением .doc или .docx</p> : null}
				<div className={styles.actionBlock}>
					<button onClick={() => {setPageOption({name: 'init'})}} className={styles.cancelBtn}>Отмена</button>
					<button onClick={sendFile} className={classNames({[styles.action]: true, [styles.disableBtn] : !blob})} >Подтвердить</button>
				</div>
			</div>
		</div>
	);
}

export default UploadFile;
