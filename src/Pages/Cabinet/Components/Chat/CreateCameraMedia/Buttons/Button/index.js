import classNames from "classnames";
import React from "react";
import styles from "./Button.module.sass";

const Button = ({
	children,
	clickCallback = () => {},
	mouseDownCallback,
	isRecording,
	width = 0,
	height = 0,
	borderRadius = "2px",
	childrenColor = "black",
	backgroundColor = "#EDEDED",
	boxShadow = false,
	hoverEffect = false,
	activeBtn,
}) => {
	return (
		<div
			onMouseUp={clickCallback ? clickCallback : null}
			onMouseDown={mouseDownCallback ? mouseDownCallback : null}
			className={classNames({
				[styles.wrapper]: true,
				[styles.recording]: mouseDownCallback && isRecording,
				[styles.hoverEffect]: hoverEffect,
				[styles.active]: activeBtn
			})}
			style={{
				width,
				height,
				backgroundColor: !isRecording ? backgroundColor : "#EB1F1F",
				borderRadius,
				boxShadow: boxShadow ?? ''
			}}
		>
			<div
				className={classNames(styles.childrenWrapper, styles[childrenColor])}
			>
				{children}
			</div>
		</div>
	);
};

export default Button;
