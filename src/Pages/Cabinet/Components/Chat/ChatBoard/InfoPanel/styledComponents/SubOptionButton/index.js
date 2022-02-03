import classNames from "classnames";
import React from "react";
import styles from "./SubOptionButton.module.sass";

const SubOptionButton = ({ name, id, subOption, setSubOption }) => {
	return (
		<div
			className={classNames({
				[styles.button]: true,
				[styles.active]: subOption === id,
			})}
			onClick={() => setSubOption(id)}
		>
			{name}
		</div>
	);
};

export default SubOptionButton;
