import React from "react";
import TextButton from "../../../../../../generalComponents/TextButton";
import Button from "./Button";
import styles from "./Buttons.module.sass";
import { ReactComponent as VideoIcon } from "../../../../../../assets/PrivateCabinet/film.svg";
import { ReactComponent as CameraIcon } from "../../../../../../assets/PrivateCabinet/camera.svg";

const Buttons = ({ state, nullifyAction, contentType, setContentType }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.leftContainer}>
				<span></span>
			</div>
			<div className={styles.centerContainer}>
				<Button
					callback={() =>
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
				<div className={styles.actionButton}>
					<Button
						callback={() => console.log("record")}
						width={48}
						height={48}
						borderRadius="50%"
						backgroundColor="#fff"
					>
						{contentType === "image" && <CameraIcon />}
						{contentType === "video" && <VideoIcon />}
					</Button>
				</div>
			</div>
			<div className={styles.rightContainer}>
				<span></span>
				{state === "init" && (
					<TextButton
						text="Отмена"
						type="cancel"
						callback={nullifyAction}
						style={{ width: 116, height: 34 }}
					/>
				)}
			</div>
		</div>
	);
};

export default Buttons;
