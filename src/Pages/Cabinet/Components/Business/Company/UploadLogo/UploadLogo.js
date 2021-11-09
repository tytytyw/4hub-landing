import React, { useState, useEffect } from "react";

import styles from "./UploadLogo.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
// import api from '../../../../../../api';
// import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { ReactComponent as FileIco } from "../../../../../../assets/BusinessCabinet/file_dowload.svg";
import classNames from "classnames";

const UploadLogo = ({ nullifyAction, companyName, setCompanyName }) => {
	const [blob, setBlob] = useState("");
	// const [response, setResponse] = useState('');
	const [setError] = useState(false);
    const [blobUrl, setBlobUrl] = useState('')

	const sendFile = () => {
		if (blob) {
			let form = new FormData();
			form.append("file", blob);
			// TODO: add api
			// api.post('', form)
			//     .then(res => {
			//         if(res.status === 200) {
			//             setResponse(res.data);
			//         } else {
			//             setError(true);
			//         }
			//     })
			//     .catch(err => {
			//         console.log(err);
			//         setError(true);
			//     })
		} else {
			setError(true);
		}
	};

    useEffect(() => blob ? setBlobUrl(URL.createObjectURL(blob)) : null, [blob])

	return (
		<PopUp set={nullifyAction}>
			<div className={styles.wrapper}>
				<span className={styles.cross} onClick={nullifyAction} />
				<p className={styles.title}>Логотип компании</p>
				<form className={styles.sendFile}>
					<div className={styles.uploadWrap}>
						<input
							type="file"
							className={styles.inputFile}
							onChange={(e) => setBlob(e.target.files[0])}
						/>
						<FileIco />

						<span className={styles.text}>
							Перетащите Файл или Нажмите{" "}
							<span className={styles.download} onClick={sendFile}>
								Загрузить
							</span>
						</span>
					</div>
				</form>
                <div className={styles.textLogo_container}>
                    <input value={companyName} className={styles.textLogo} type='text' onChange={(e) => setCompanyName(e.target.value)}/>
                </div>
                {blob && <div className={styles.picArea}>
                    <div className={styles.cropArea} draggable={true}>
                        <div className={classNames(styles.dot, styles.dotLT)}></div>
                        <div className={classNames(styles.dot, styles.dotRT)}></div>
                        <div className={classNames(styles.dot, styles.dotLB)}></div>
                        <div className={classNames(styles.dot, styles.dotRB)}></div>
                        <img resize id='canvas' draggable={false} src={blobUrl} alt='crop_logo'></img>
                    </div>
                </div>}
                <div className={styles.buttonsWrap}>
                <div className={styles.cancel} onClick={nullifyAction}>Отмена</div>
                <div className={styles.action}>Сохранить</div>
            </div>

				{/* <div
                        className={styles.submitButton}
                        onClick={sendFile}
                    >Отправить</div> */}
			</div>
		</PopUp>
	);
};

export default UploadLogo;
