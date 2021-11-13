import React, { useState, useEffect } from "react";

import styles from "./UploadLogo.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
// import api from '../../../../../../api';
// import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { ReactComponent as FileIco } from "../../../../../../assets/BusinessCabinet/file_dowload.svg";
import classNames from "classnames";

const UploadLogo = ({ nullifyAction }) => {
	const [blob, setBlob] = useState("");
	// const [response, setResponse] = useState('');
	const [setError] = useState(false);
	const [blobUrl, setBlobUrl] = useState("");
	const [hiddenPic, setHiddenPic] = useState(null);

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

	const cropArea = document.querySelector("#crop_area");

	let startX = null;
	let startWidth = cropArea?.offsetWidth;
	let startHeight = cropArea?.offsetHeight;

	const dotHandler = (e, vertical, horizontal) => {
		e.dataTransfer.dropEffect = "move";
		e.dataTransfer.effectAllowed = "linkMove";
		let difference;
		if (horizontal === "right") difference = startWidth + e.clientX - startX;
		if (horizontal === "left") difference = startWidth + startX - e.clientX;
		const newWidth =
			difference > hiddenPic.width ? hiddenPic.width : difference;
		const newHeight = newWidth / 3;

		if (e.type === "dragstart") {
			startX = e.clientX;
			startHeight = cropArea?.offsetHeight;
		}
		if (e.type === "dragend") {
			startWidth = cropArea?.offsetWidth;
			startX = null;
		}
		if (e.type === "drag") {
			cropArea.style.width = `${newWidth}px`;
			cropArea.style.height = `${newHeight}px`;
			// if (vertical === "top")
			// 	cropArea.style.transform = `translateY(${
			// 		-Math.round(newHeight - startHeight) / 2
			// 	}px)`;
			// if (vertical === "bottom")
			// 	cropArea.style.transform = `translateY(${
			// 		Math.round(newHeight - startHeight) / 2
			// 	}px)`;
			
			// console.log(cropArea.offsetTop)
		}
	};

	useEffect(
		() => (blob ? setBlobUrl(URL.createObjectURL(blob)) : null),
		[blob]
	);

	useEffect(() => {
		setTimeout(() => setHiddenPic(document.querySelector("#hiddenPic")), 10);
	}, [blob]);

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
							accept=".png,.jpeg"
							draggable={false}
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

				{blob && (
					<div className={styles.picArea}>
						<div
							className={styles.picWrap}
							style={{ width: hiddenPic?.width, height: hiddenPic?.height }}
						>
							<div
								id="crop_area"
								className={styles.cropArea}
								draggable={false}
								style={{
									width: 192,
									height: 64,
									maxWidth: hiddenPic?.width,
									maxHeight: hiddenPic?.height,
								}}
							>
								<div
									className={classNames(styles.dot, styles.dotLT)}
									onDrag={(e) => dotHandler(e, "top", "left")}
									onDragStart={(e) => dotHandler(e, "top", "left")}
									onDragEnd={(e) => dotHandler(e, "top", "left")}
								></div>
								<div
									className={classNames(styles.dot, styles.dotRT)}
									onDrag={(e) => dotHandler(e, "top", "right")}
									onDragStart={(e) => dotHandler(e, "top", "right")}
									onDragEnd={(e) => dotHandler(e, "top", "right")}
								></div>
								<div
									className={classNames(styles.dot, styles.dotLB)}
									onDrag={(e) => dotHandler(e, "bottom", "left")}
									onDragStart={(e) => dotHandler(e, "bottom", "left")}
									onDragEnd={(e) => dotHandler(e, "bottom", "left")}
								></div>
								<div
									className={classNames(styles.dot, styles.dotRB)}
									onDrag={(e) => dotHandler(e, "bottom", "right")}
									onDragStart={(e) => dotHandler(e, "bottom", "right")}
									onDragEnd={(e) => dotHandler(e, "bottom", "right")}
								></div>
							</div>
							<img
								className={styles.editablePicture}
								id="hiddenPic"
								draggable={false}
								src={blobUrl}
								alt="crop_logo"
							></img>
							<div
								style={{ backgroundImage: `url(${blobUrl})` }}
								className={styles.picture}
								draggable={false}
							></div>
						</div>
					</div>
				)}

				<div className={styles.buttonsWrap}>
					<div className={styles.cancel} onClick={nullifyAction}>
						Отмена
					</div>
					<div className={styles.action}>Сохранить</div>
				</div>
			</div>
		</PopUp>
	);
};

export default UploadLogo;
