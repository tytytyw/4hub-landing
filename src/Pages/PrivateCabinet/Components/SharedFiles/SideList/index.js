import React from "react";
import styles from "./SideList.module.sass";
import { useSelector } from "react-redux";
import classNames from "classnames";

function SideList({ children }) {
	const size = useSelector((state) => state.PrivateCabinet.size);

	return (
		<div
			className={classNames({
				[styles.wrapper]: true,
				[styles?.[`wrapper_${size}`]]: size !== "medium",
			})}
		>
			{children}
		</div>
	);
}

export default SideList;
