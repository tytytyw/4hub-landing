import classNames from "classnames";
import React from "react";
import styles from "./Button.module.sass";

const Button = ({
	children,
	callback = () => {},
	width = 0,
	height = 0,
	borderRadius = "2px",
	childrenColor = "black",
	backgroundColor = "#EDEDED",
}) => {
	return (
		<div
    onClick={callback}
			className={styles.wrapper}
			style={{ width, height, backgroundColor, borderRadius }}
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
