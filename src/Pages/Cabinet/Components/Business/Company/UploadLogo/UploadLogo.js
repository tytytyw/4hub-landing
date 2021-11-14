import React, { useState, useEffect } from "react";

import styles from "./UploadLogo.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
// import api from '../../../../../../api';
// import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { ReactComponent as FileIco } from "../../../../../../assets/BusinessCabinet/file_dowload.svg";
import classNames from "classnames";

const UploadLogo = ({ nullifyAction, setCompanyLogo }) => {
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
	const picArea = document.querySelector("#picture");
	let startX = null;
	let startWidth = cropArea?.offsetWidth;
	let startHeight = cropArea?.offsetHeight;
	let dot_horizontal;
	let dot_vertilal;
	let cropAreaOffsetTop_initial = cropArea?.offsetTop
	let cropAreaOffsetLeft_initial = cropArea?.offsetLeft

	const mouseMoveOnDot = (e) => {
		e.stopPropagation()
		let difference;
		difference = startWidth + e.clientX - startX;

		if (dot_horizontal === "right") difference = startWidth + e.clientX - startX;
		if (dot_horizontal === "left") difference = startWidth + startX - e.clientX;

		const newWidth =
			difference > hiddenPic.width ? hiddenPic.width : difference;
		const newHeight = newWidth / 3;

		initialCordinates = {
			x: e.offsetX,
			y: e.offsetY,
		};
		cropArea.style.width = `${newWidth}px`;
		cropArea.style.height = `${Math.round(newHeight)}px`;

		if (dot_vertilal === "top" && cropArea.offsetHeight > 21) {
			cropArea.style.top = `${cropAreaOffsetTop_initial + Math.round(startHeight - newHeight)}px`
		}
		if (dot_horizontal === "left" && cropArea.offsetWidth > 63) {
			cropArea.style.left = `${cropAreaOffsetLeft_initial + Math.round(startWidth - newWidth)}px`
		}
	};

	const moveDot = (e, vertical, horizontal) => {
		e.stopPropagation()
		startX = e.clientX;
		startHeight = cropArea?.offsetHeight;
		dot_horizontal = horizontal;
		dot_vertilal = vertical;
		cropAreaOffsetTop_initial = cropArea.offsetTop
		cropAreaOffsetLeft_initial = cropArea.offsetLeft
		picArea.addEventListener("mousemove", mouseMoveOnDot);
	};

	const dotMouseUp = () => {
		startWidth = cropArea?.offsetWidth;
		startX = null;
		dot_horizontal = null;
		dot_vertilal = null;
		picArea.removeEventListener("mousemove", mouseMoveOnDot);
		cropArea.removeEventListener(
			"mousemove",
			mouseMoveOnCropArea
		);
	};

	let initialCordinates;

	const moveCropArea = (e) => {
		e.stopPropagation()
		if (e.target.id === "crop_area") {
			initialCordinates = {
				x: e.nativeEvent.offsetX,
				y: e.nativeEvent.offsetY,
			};
			cropArea.addEventListener("mousemove", mouseMoveOnCropArea);
		}
	};

	const mouseMoveOnCropArea = (e) => {
		e.stopPropagation()
		const difference = {
			x: e.offsetX - initialCordinates.x,
			y: initialCordinates.y - e.offsetY,
		};

		const validateCordinates = (cordinate, type) => {
			if (cordinate <= 0) return 0;
			if (type === "top") {
				const maxValue = hiddenPic.height - cropArea.offsetHeight;
				if (cordinate >= maxValue) return maxValue;
			}
			if (type === "left") {
				const maxValue = hiddenPic.width - cropArea.offsetWidth;
				if (cordinate >= maxValue) return maxValue;
			}
			return cordinate;
		};
		const newCordinates = {
			x: cropArea.offsetLeft + difference.x,
			y: cropArea.offsetTop - difference.y,
		};
		cropArea.style.top = `${validateCordinates(newCordinates.y, "top")}px`;
		cropArea.style.left = `${validateCordinates(newCordinates.x, "left")}px`;
	};

	useEffect(
		() => (blob ? setBlobUrl(URL.createObjectURL(blob)) : null),
		[blob]
	);

	useEffect(() => {
		setTimeout(() => setHiddenPic(document.querySelector("#hiddenPic")), 10);
	}, [blob]);

	const createNewImage = () => {
		const canvas = document.querySelector('#canvas');
		const context = canvas.getContext('2d')
		canvas.width = cropArea.offsetWidth;
		canvas.height = cropArea.offsetHeight
		const scaleX = hiddenPic.naturalWidth / hiddenPic.width;
		const scaleY = hiddenPic.naturalHeight / hiddenPic.height;
		context.drawImage(hiddenPic, cropArea.offsetLeft * scaleX, cropArea.offsetTop* scaleY, canvas.width * scaleX, canvas.height * scaleY, 0, 0, canvas.width, canvas.height)
		const newImageUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		const newImage = new Image();
		newImage.src = newImageUrl
		setCompanyLogo(newImage)

		nullifyAction()
	}

	const preventDefault = (e) => e.preventDefault();
	useEffect(() => {
		document.addEventListener("dragstart", preventDefault)
		return () => document.removeEventListener("dragstart", preventDefault)
	}, [])

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
							accept=".png,.jpeg,.jpg"
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
					<div className={styles.picArea}  onMouseUp={dotMouseUp} onMouseLeave={dotMouseUp}>
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
									top: 10,
									left: 10,
								}}
								onMouseDown={moveCropArea}
								onMouseUp={() => {
									cropArea.removeEventListener(
										"mousemove",
										mouseMoveOnCropArea
									);
								}}
							>
								<div
									className={classNames(styles.dot, styles.dotLT)}
									onMouseDown={(e) => moveDot(e, "top", "left")}
								></div>
								<div
									className={classNames(styles.dot, styles.dotRT)}
									onMouseDown={(e) => moveDot(e, "top", "right")}
								></div>
								<div
									className={classNames(styles.dot, styles.dotLB)}
									onMouseDown={(e) => moveDot(e, "bottom", "left")}
								></div>
								<div
									className={classNames(styles.dot, styles.dotRB)}
									onMouseDown={(e) => moveDot(e, "bottom", "right")}
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
								id="picture"
							></div>
						</div>
						<canvas id='canvas' style={{visibility: 'hidden'}}></canvas>
					</div>
				)}

				<div className={styles.buttonsWrap}>
					<div className={styles.cancel} onClick={nullifyAction}>
						Отмена
					</div>
					<div className={styles.action} onClick={createNewImage}>Сохранить</div>
				</div>
			</div>
		</PopUp>
	);
};

export default UploadLogo;
