import React, { useState } from "react";
import TextButton from "../../../../../../generalComponents/TextButton";
import Button from "./Button";
import styles from "./Buttons.module.sass";
import { ReactComponent as VideoIcon } from "../../../../../../assets/PrivateCabinet/film.svg";
import { ReactComponent as CameraIcon } from "../../../../../../assets/PrivateCabinet/camera.svg";
import { ReactComponent as MessageIcon } from "../../../../../../assets/PrivateCabinet/chat/message.svg";
import { ReactComponent as PencilIcon } from "../../../../../../assets/PrivateCabinet/chat/pencil.svg";
import { ReactComponent as RotateIcon } from "../../../../../../assets/PrivateCabinet/chat/rotate.svg";
import { ReactComponent as MirrorIcon } from "../../../../../../assets/PrivateCabinet/chat/mirror.svg";
import { ReactComponent as SettingsIcon } from "../../../../../../assets/PrivateCabinet/chat/settings.svg";
import { ducationTimerToString } from "../../../../../../generalComponents/chatHelper";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import FilterSettings from "./FilterSettings";

const Buttons = ({
	state,
	nullifyAction,
	contentType,
	setContentType,
	onActionBtnHandler,
	isRecording,
	videoRecordStop,
	takePicture,
	ducationTimer,
	setInitialState,
	stream,
	setVisualEffects,
}) => {
	const [activeBtn, setActiveBtn] = useState(null);
	const [centralButtons] = useState([
		{
			name: "addMessage",
			clickCallback: () => {
				setActiveBtn((prevState) =>
					prevState === "addMessage" ? null : "addMessage"
				);
			},
			icon: <MessageIcon />,
		},
		{
			name: "addСaption",
			clickCallback: () => {
				setActiveBtn((prevState) =>
					prevState === "addСaption" ? null : "addСaption"
				);
			},
			icon: <PencilIcon strole="none" />,
		},
		{
			name: "rotate",
			clickCallback: () => {
				// setActiveBtn(null);
				setVisualEffects((prevEffects) => ({
					...prevEffects,
					transform: {
						...prevEffects.transform,
						rotate:
							prevEffects.transform.rotate === 270
								? 0
								: prevEffects.transform.rotate + 90,
					},
				}));
			},
			icon: <RotateIcon />,
		},
		{
			name: "mirror",
			clickCallback: () => {
				// setActiveBtn(null);
				setVisualEffects((prevEffects) => ({
					...prevEffects,
					transform: {
						...prevEffects.transform,
						scale: prevEffects.transform.scale ? "" : "scale(-1, 1)",
					},
				}));
			},
			icon: <MirrorIcon />,
		},
		{
			name: "settings",
			clickCallback: () => {
				setActiveBtn((prevState) =>
					prevState === "settings" ? null : "settings"
				);
			},
			icon: <SettingsIcon />,
		},
	]);

	const onClickHandler = () => {
		if (contentType === "video") return videoRecordStop();
		if (contentType === "image") return takePicture()
	};

	const renderLeftBtns = () => {
		if (state === "readyToSend")
			return (
				<Button
					clickCallback={() => {setInitialState(); setActiveBtn(null)}}
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
		if (state === "readyToSend")
			return centralButtons.map((btn) => (
				<Button
					clickCallback={btn.clickCallback}
					width={54}
					height={34}
					borderRadius="2px"
					childrenColor="black"
					backgroundColor="#fff"
					boxShadow="0px 2px 4px #DEDEDE"
					hoverEffect={true}
					key={btn.name}
					activeBtn={activeBtn === btn.name}
				>
					{btn.icon}
				</Button>
			));
	};

	const renderRightBtns = () => {
		if (state === "init" && !isRecording)
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
			{activeBtn === "settings" && (
				<div className={styles.optionsWrapper}>
					<FilterSettings setVisualEffects={setVisualEffects} />
				</div>
			)}
			<div className={styles.buttonsWrapper}>
				<div className={styles.leftContainer}>{renderLeftBtns()}</div>
				<div className={styles.centerContainer}>
					{state === "init" && stream && (
						<div className={styles.actionButton}>
							<Button
								clickCallback={onClickHandler}
								mouseDownCallback={() =>
									!isRecording &&
									contentType === "video" &&
									onActionBtnHandler()
								}
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
					{renderCentralBtns()}
				</div>
				<div className={styles.rightContainer}>{renderRightBtns()}</div>
			</div>
		</div>
	);
};

export default Buttons;
