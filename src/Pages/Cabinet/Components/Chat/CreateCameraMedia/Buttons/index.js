import React from "react";
import TextButton from "../../../../../../generalComponents/TextButton";
import Button from "./Button";
import styles from "./Buttons.module.sass";
import { ReactComponent as VideoIcon } from "../../../../../../assets/PrivateCabinet/film.svg";
import { ReactComponent as CameraIcon } from "../../../../../../assets/PrivateCabinet/camera.svg";
import { ducationTimerToString } from "../../../../../../generalComponents/chatHelper";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";

const Buttons = ({
	state,
	nullifyAction,
	contentType,
	setContentType,
	onActionBtnHandler,
	isRecording,
	videoRecordStop,
	ducationTimer,
	setInitialState,
	stream,
}) => {
	const onClickHandler = () => {
		if (contentType === 'video') return videoRecordStop();
	};

	const renderLeftBtns = () => {
		if (state === "readyToSend")
			return (
				<Button
					clickCallback={setInitialState}
					width={38}
					height={38}
					borderRadius="50%"
					childrenColor="white"
					backgroundColor="#EDEDED"
				>
					<img
						alt="back"
						style={{ transform: "translateX(-1px)" }}
						src={imageSrc + "assets/PrivateCabinet/arrow-2.svg"}
					/>
				</Button>
			);
	};

	const renderCentralBtns = () => {
		if (isRecording)
			return (
				<Button
					width={64}
					height={34}
					borderRadius="2px"
					childrenColor="white"
					backgroundColor="#EB1F1F"
				>
					{ducationTimerToString(ducationTimer)}
				</Button>
			);
		if (state === "init")
			return (
				<Button
					clickCallback={() =>
						setContentType((state) => (state === "image" ? "video" : "image"))
					}
					width={48}
					height={48}
					borderRadius="50%"
					childrenColor="white"
				>
					{contentType === "video" && <CameraIcon />}
					{contentType === "image" && <VideoIcon />}
				</Button>
			);
	};

	const renderRightBtns = () => {
		if (state === "init")
			return (
				<TextButton
					text="Отмена"
					type="cancel"
					callback={nullifyAction}
					style={{ width: 116, height: 34 }}
				/>
			);
		if (state === "readyToSend")
			return (
				<Button
					clickCallback={() => console.log("send file")}
					width={38}
					height={38}
					borderRadius="50%"
					childrenColor="white"
					backgroundColor="#4086F1"
				>
					<img
						alt="upload"
						style={{ transform: "rotate(90deg)", width: 22, height: 22 }}
						src={imageSrc + "assets/PrivateCabinet/arrow.svg"}
					/>
				</Button>
			);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.leftContainer}>{renderLeftBtns()}</div>
			<div className={styles.centerContainer}>
				{renderCentralBtns()}
				{state === "init" && stream && (
					<div className={styles.actionButton}>
						<Button
							clickCallback={onClickHandler}
							mouseDownCallback={() => !isRecording && contentType === 'video' && onActionBtnHandler()}
							width={48}
							height={48}
							borderRadius="50%"
							backgroundColor="#fff"
							isRecording={isRecording}
						>
							{contentType === "image" && <CameraIcon />}
							{contentType === "video" &&
								(isRecording ? (
									<div className={styles.square} />
								) : (
									<VideoIcon />
								))}
						</Button>
					</div>
				)}
			</div>
			<div className={styles.rightContainer}>{renderRightBtns()}</div>
		</div>
	);
};

export default Buttons;
