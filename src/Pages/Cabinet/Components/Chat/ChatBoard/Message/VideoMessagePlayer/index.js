import React, { useRef, useState, useEffect } from "react";
import styles from "./VideoMessagePlayer.module.sass";

const VideoMessagePlayer = ({ video }) => {
	const circleRadius = 150;
	const circumference = 2 * Math.PI * circleRadius;

	const videoRef = useRef();
	const [playing, setPlaying] = useState(false);
	const [progress, setProgress] = useState(0);
	const [circleOffset, setCircleOffset] = useState(circumference);

	const playHandler = () => {
		!playing ? videoRef.current.play() : videoRef.current.pause();
		setPlaying(!playing);
	};

	useEffect(() => {
		const offset = circumference - (progress / 100) * circumference;
		setCircleOffset(offset);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [progress]);

	const onTimeUpdate = () => {
		setProgress(
			(videoRef.current.currentTime / videoRef.current.duration) * 100
		);
	};
	const videoEnded = () => {
		setPlaying(false);

		setTimeout(() => {
			setProgress(0);
			videoRef.current.currentTime = 0;
		}, 500);
	};

	const renderRemainder = () => {
		if (!videoRef?.current) return "";
		const remainder = Math.ceil(
			videoRef?.current?.duration - videoRef?.current?.currentTime
		);
		const min = Math.floor(remainder / 60);
		const sec = remainder % 60;
		return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
	};

	useEffect(() => {
		const video = videoRef.current;

		//fix Chorome bug with Infinity duration
		const fixInfinityDuration = () => {
			const getDuration = () => {
				video.currentTime = 0;
				video.removeEventListener("timeupdate", getDuration);
			};
			if (video.duration === Infinity) {
				video.currentTime = 1e101;
				video.addEventListener("timeupdate", getDuration);
			}
		};

		if (video) {
			video.addEventListener("timeupdate", onTimeUpdate);
			video.addEventListener("ended", videoEnded);
			video.addEventListener("loadedmetadata", fixInfinityDuration);
		}

		return () => {
			if (video) {
				video.removeEventListener("timeupdate", onTimeUpdate);
				video.removeEventListener("ended", videoEnded);
				video.removeEventListener("loadedmetadata", fixInfinityDuration);
			}
		};
	}, []);

	return (
		<div className={styles.wrapper}>
			<div className={styles.videoWrapper}>
				<svg width={circleRadius * 2} height={circleRadius * 2}>
					<circle
						cx={circleRadius}
						cy={circleRadius}
						r={circleRadius}
						fill="#F5F9FE"
					/>
					<circle
						className={styles.progressCircle}
						cx={circleRadius}
						cy={circleRadius}
						r={circleRadius - 8}
						strokeLinecap="round"
						strokeDashoffset={circleOffset}
						strokeDasharray={`${circumference} ${circumference}`}
						fill="none"
					/>
				</svg>
				<video
					ref={videoRef}
					className={styles.video}
					src={video.link}
					onClick={playHandler}
				></video>
			</div>
			<span className={styles.duration}>{renderRemainder()}</span>
		</div>
	);
};

export default VideoMessagePlayer;
