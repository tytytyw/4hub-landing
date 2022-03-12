import React, { useState, useEffect, useRef } from "react";
import PopUp from "../../../../../generalComponents/PopUp";
import styles from "./CreateCameraMedia.module.sass";
import Buttons from "./Buttons";
import {
	cameraAccess,
	wantMimeType,
} from "../../../../../generalComponents/chatHelper";
import Loader from "../../../../../generalComponents/Loaders/4HUB";

const CreateCameraMedia = ({ nullifyAction }) => {
	const [state, setState] = useState("init");
	const [contentType, setContentType] = useState("image");
	const [stream, setStream] = useState(null);
	const [quality, setQuality] = useState(720);
	const [isRecording, setIsRecording] = useState(false);
	const videoRef = useRef();

	const getStream = () =>
		cameraAccess({
			audio: true,
			video: { height: { exact: quality }, facingMode: "user" },
		})
			.then((stream) => onStreamReady(stream))
			.catch(() => console.log("error access to cam"));

	const cleareStreamTracks = () => {
		if (stream) stream.getTracks().forEach((track) => track.stop());
	};

	const onStreamReady = (stream) => {
		const video = videoRef.current;
		video.srcObject = stream;
		video.play();
		setStream(stream);
	};

	useEffect(() => {
		getStream();
		return () => cleareStreamTracks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quality]);

	useEffect(() => {
		return () => cleareStreamTracks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stream]);

	return (
		<PopUp set={nullifyAction}>
			<div className={styles.contentWrapper}>
				<div className={styles.contentPreview}>
					<div className={styles.videoWrapper} height={quality}>
						<video ref={videoRef} className={styles.video} muted={true} />
					</div>
				</div>
				{state === "init" && (
					<select
						className={styles.select}
						value={quality}
						onChange={(e) => setQuality(+e.target.value)}
					>
						<option>1080</option>
						<option>720</option>
						<option>480</option>
						{/* <option>240</option> */}
					</select>
				)}
				{!stream ? (
					<Loader
						type="bounceDots"
						background="transparent"
						zIndex={5}
						width="100px"
						height="100px"
						containerType="bounceDots"
					/>
				) : (
					""
				)}
			</div>

			<Buttons
				state={state}
				nullifyAction={nullifyAction}
				contentType={contentType}
				setContentType={setContentType}
				isRecording={isRecording}
				setIsRecording={setIsRecording}
			/>
		</PopUp>
	);
};

export default CreateCameraMedia;
