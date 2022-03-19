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
import { ReactComponent as CropIcon } from "../../../../../../assets/PrivateCabinet/chat/crop.svg";
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
	const [activeOption, setActiveOption] = useState(null);
	const [centralButtons] = useState([
		{
			name: "addMessage",
			clickCallback: () => {
				setActiveOption((prevState) =>
					prevState === "addMessage" ? null : "addMessage"
				);
			},
			icon: <MessageIcon />,
		},
		{
			name: "addСaption",
			clickCallback: () => {
				setActiveOption((prevState) =>
					prevState === "addСaption" ? null : "addСaption"
				);
			},
			icon: <PencilIcon strole="none" />,
		},
		{
			name: "transformOptions",
			clickCallback: () => setActiveOption("transformOptions"),
			icon: <RotateIcon />,
			subButtons: [
				{
					name: "rotate",
					clickCallback: () => {
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
					name: "crop",
					clickCallback: () => {},
					icon: <CropIcon />,
				},
			],
		},
		{
			name: "filterSettings",
			clickCallback: () => {
				setActiveOption((prevState) =>
					prevState === "filterSettings" ? null : "filterSettings"
				);
			},
			icon: <SettingsIcon />,
			subButtons: [],
		},
	]);

	const onClickHandler = () => {
		if (contentType === "video") return videoRecordStop();
		if (contentType === "image") return takePicture();
	};

	const onBackButtonhandler = () =>
		activeOption ? setActiveOption(null) : setInitialState();

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
		if (state === "readyToSend") {
			const buttons =
				centralButtons.filter((btn) => btn.name === activeOption)[0]
					?.subButtons || centralButtons;
			if (!buttons?.length) return null;

			return buttons.map((btn) => (
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
				>
					{btn.icon}
				</Button>
			));
		}
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
			{activeOption === "filterSettings" && (
				<div className={styles.optionsWrapper}>
					<FilterSettings setVisualEffects={setVisualEffects} />
				</div>
			)}
			<div className={styles.buttonsWrapper}>
				<div className={styles.leftContainer}>
					{state === "readyToSend" && (
						<Button
							clickCallback={onBackButtonhandler}
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
					)}
				</div>
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
