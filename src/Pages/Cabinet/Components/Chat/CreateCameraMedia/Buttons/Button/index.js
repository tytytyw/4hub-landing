import classNames from "classnames";
import React from "react";
import styles from "./Button.module.sass";

const Button = ({
	children,
	callback = () => {},
	actionCallback,
	isRecording,
	setIsRecording,
	width = 0,
	height = 0,
	borderRadius = "2px",
	childrenColor = "black",
	backgroundColor = "#EDEDED",
}) => {
	return (
		<div
    		onClick={actionCallback ? null : callback}
			onMouseDown={actionCallback ? actionCallback : null}
			// TODO: temp
			onMouseUp={() => setIsRecording && setIsRecording(false)}
			className={classNames({[styles.wrapper]: true, [styles.recording]: actionCallback && isRecording})}
			style={{ width, height, backgroundColor: !isRecording ? backgroundColor : '#EB1F1F' , borderRadius }}
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
