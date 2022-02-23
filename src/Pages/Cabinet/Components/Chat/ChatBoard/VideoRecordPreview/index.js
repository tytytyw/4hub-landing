import React, { useState, useEffect } from "react";
import styles from "./VideoRecordPreview.module.sass";
import classNames from "classnames";

const VideoRecordPreview = ({
	video,
	isVideoMessage,
	ducationTimer,
	timeLimit = 0,
	recordEnd,
}) => {
	const circleRadius = 150;
	const circumference = 2 * Math.PI * (circleRadius - 8);

	const [progress, setProgress] = useState(0);
	const [circleOffset, setCircleOffset] = useState(circumference);

	useEffect(() => {
		const offset = circumference - (progress / 100) * circumference;
		setCircleOffset(offset);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [progress]);
	useEffect(() => {
		if (timeLimit) setProgress((ducationTimer / timeLimit) * 100);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ducationTimer]);
	useEffect(() => {
		if (progress === 100) setTimeout(() => recordEnd(), 300);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [progress]);

	return (
		<div className={styles.wrapper}>
			<div
				className={classNames({
					[styles.videoWrapper]: true,
					[styles.circle]: isVideoMessage,
				})}
			>
				{isVideoMessage ? (
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
				) : (
					""
				)}
				<video
					ref={isVideoMessage}
					className={classNames({ [styles.video]: isVideoMessage })}
					src={video}
					muted={true}
				></video>
			</div>
		</div>
	);
};

export default VideoRecordPreview;
