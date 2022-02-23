import React, { useRef, useState, useEffect } from "react";
import styles from "./VideoMessagePlayer.module.sass";

const VideoMessagePlayer = ({ video }) => {
	const circleRadius = 150;
	const circumference = 2 * Math.PI * (circleRadius - 8);

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

	const rewindVideo = (value) => {
		const video = videoRef?.current;
		if (video) {
			video.pause();
			setProgress(value);
			video.currentTime = (video.duration * value) / 100;
			video.play();
		}
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

	const clickHandler = (e) => {
		const targetCoords = e.currentTarget.getBoundingClientRect();
		const outerRadius = circleRadius;
		const innerRadius = circleRadius - 15;
		const calcDistanceBetweenPoints = (a, b) =>
			Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
		// coordinates relative to center circle
		const clickCoordinats = {
			x: e.clientX - targetCoords.left - circleRadius,
			y: (e.clientY - targetCoords.top - circleRadius) * -1,
		};
		const clickRadius = calcDistanceBetweenPoints(
			{ x: 0, y: 0 },
			clickCoordinats
		);
		const coordinatsStartProgressBar = { x: 0, y: clickRadius };
		const valueBaseTriangle = calcDistanceBetweenPoints(
			clickCoordinats,
			coordinatsStartProgressBar
		);
		if (clickRadius > innerRadius && clickRadius < outerRadius) {
			// click on progress bar
			const numToSquare = (num) =>
				(Math.round(num * 10000) * Math.round(num * 10000)) / 100000000;
			const multiplyNum = (a, b) =>
				(Math.round(a * 10000) * Math.round(b * 10000)) / 100000000;
			const circularArcRange =
				clickRadius *
				Math.acos(
					(numToSquare(clickRadius) +
						numToSquare(clickRadius) -
						numToSquare(valueBaseTriangle)) /
						(2 * multiplyNum(clickRadius, clickRadius))
				);
			const calcProgress = (range) => (range / circumference) * 100;
			if (clickCoordinats.x === 0) setProgress(clickCoordinats.y > 0 ? 0 : 50);
			if (clickCoordinats.x > 0) rewindVideo(calcProgress(circularArcRange)); // '< 180deg'
			if (clickCoordinats.x < 0)
				rewindVideo(calcProgress(circumference - circularArcRange)); // '> 180deg'
		}
		if (clickRadius < innerRadius) {
			// click on video
			playHandler();
		}
	};

	return (
		<div className={styles.wrapper} onClick={clickHandler}>
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
					// onClick={playHandler}
				></video>
			</div>
			<span className={styles.duration}>{renderRemainder()}</span>
		</div>
	);
};

export default VideoMessagePlayer;
