import React, { useState } from "react";
import PopUp from "../../../../../generalComponents/PopUp";
import styles from "./CreateCameraMedia.module.sass";
import Buttons from "./Buttons";

const CreateCameraMedia = ({ nullifyAction }) => {
	const [state, setState] = useState("init");
	const [contentType, setContentType] = useState("image");

	return (
		<PopUp set={nullifyAction}>
			<div className={styles.wrapper}>
				<div className={styles.contentPreview}>
					<div className={styles.videoWrapper}>
                        <video id={styles.video} muted></video>
                    </div>
				</div>
			</div>
			<Buttons
				state={state}
				nullifyAction={nullifyAction}
				contentType={contentType}
				setContentType={setContentType}
			/>
		</PopUp>
	);
};

export default CreateCameraMedia;
