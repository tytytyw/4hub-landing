import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import PopUp from "../../../../../generalComponents/PopUp";
import styles from "./CreateCameraMedia.module.sass";
import Buttons from "./Buttons";
import {
	cameraAccess,
	wantMimeType,
} from "../../../../../generalComponents/chatHelper";

const CreateCameraMedia = ({ nullifyAction }) => {
	const [state, setState] = useState("init");
	const [contentType, setContentType] = useState("image");
	const [stream, setStream] = useState(null);
	const videoRef = useRef();

	const getStream = () =>
		cameraAccess()
			.then((stream) => onStreamReady(stream))
			.catch(() => console.log("error access to cam"));

	const onExit = () => {
		if (stream) stream.getTracks().forEach((track) => track.stop());
	};

	const onStreamReady = (stream) => {
		const video = videoRef.current;
		video.srcObject = stream;
		video.play();
		setStream(stream);
	};

	useLayoutEffect(() => {
		getStream();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		return () => onExit();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stream]);

	return (
		<PopUp set={nullifyAction}>
			<div className={styles.wrapper}>
				<div className={styles.contentPreview}>
					<div className={styles.videoWrapper}>
						<video ref={videoRef} className={styles.video} muted={true} />
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
