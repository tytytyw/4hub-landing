import React, { useState, useEffect, useRef } from "react";
import PopUp from "../../../../../generalComponents/PopUp";
import styles from "./CreateCameraMedia.module.sass";
import Buttons from "./Buttons";
import {
	cameraAccess,
	wantMimeType,
} from "../../../../../generalComponents/chatHelper";
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import VideoPlayer from "./VideoPlayer";

const CreateCameraMedia = ({ nullifyAction }) => {
	const [state, setState] = useState("init");
	const [contentType, setContentType] = useState("image");
	const [stream, setStream] = useState(null);
	const [videoPreview, setVideoPreview] = useState(null);
	const [quality, setQuality] = useState(720);
	const [isRecording, setIsRecording] = useState(false);
	const [mediaRecorder, setMediaRecorder] = useState(null);
	const [ducationTimer, setDucationTimer] = useState(0);

	const streamPreviewRef = useRef();
	const videoPreviewRef = useRef();

	const constraints = {
		audio: true,
		video: { height: { exact: quality }, facingMode: "user" },
	};

	const getStream = () =>
		cameraAccess(constraints)
			.then((stream) => onStreamReady(stream))
			.catch(() => console.log("error access to cam"));

	const cleareStreamTracks = () => {
		if (stream) stream.getTracks().forEach((track) => track.stop());
	};

	const onStreamReady = (stream) => {
		const video = streamPreviewRef.current;
		video.srcObject = stream;
		video.play();
		setStream(stream);
	};

	const onRecordVideo = () => {
		const recorder = new MediaRecorder(stream, {
			mimeType: wantMimeType(constraints),
		});
		recorder.start();
		setMediaRecorder(recorder);
	};

	const onActionBtnHandler = () => {
		console.log("onActionBtnHandler");
		if (contentType === "video") {
			setIsRecording(true);
			onRecordVideo();
		}

		if (contentType === "image") {
		}
	};

	const videoDataAviable = (e) => {
		setVideoPreview(URL.createObjectURL(e.data));
		cleareStreamTracks();
		setState('readyToSend')
	};

	const videoRecordStop = () => {
		setIsRecording(false);
		mediaRecorder.stop();
	};

	const setInitialState = () => {
		setStream(null)
		setState('init')
		setVideoPreview(null)
		getStream()
	}

	useEffect(() => {
		getStream();
		return () => cleareStreamTracks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quality]);

	useEffect(() => {
		return () => cleareStreamTracks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stream]);

	useEffect(() => {
		if (mediaRecorder) {
			mediaRecorder.addEventListener("dataavailable", videoDataAviable);

			return () =>
				mediaRecorder.removeEventListener("dataavailable", videoDataAviable);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mediaRecorder]);

	useEffect(() => {
		if (isRecording) {
			const timer = setInterval(() => {
				setDucationTimer((sec) => sec + 1);
			}, 1000);
			return () => {
				clearInterval(timer);
				setDucationTimer(0);
			};
		}
	}, [isRecording]);

	return (
		<PopUp set={nullifyAction}>
			<div className={styles.contentWrapper}>
				<div className={styles.contentPreview}>
					<div className={styles.videoWrapper} height={quality}>
						{videoPreview ? (
							<VideoPlayer source={videoPreview} videoPlayerRef={videoPreviewRef}/>
						) : null}
						{!videoPreview ? (
							<video
								ref={streamPreviewRef}
								className={styles.video}
								muted={true}
							/>
						) : null}
					</div>
				</div>
				{state === "init" && !isRecording && stream && (
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
				{!stream && !isRecording ? (
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
				onActionBtnHandler={onActionBtnHandler}
				videoRecordStop={videoRecordStop}
				ducationTimer={ducationTimer}
				setInitialState={setInitialState}
				stream={stream}
			/>
		</PopUp>
	);
};

export default CreateCameraMedia;
