import classNames from "classnames";
import React from "react";
import styles from "./TextButton.module.sass";

const TextButton = ({
	text = "",
	type = "ok" || "cancel",
	callback = () => {},
	disabled = false,
	style = {},
}) => {
	return (
		<div
			onClick={callback}
			style={style}
			className={classNames({
				[styles.wrapper]: true,
				[styles[type]]: true,
				[styles.disabled]: disabled,
			})}
		>
			{text}
		</div>
	);
};

export default TextButton;
