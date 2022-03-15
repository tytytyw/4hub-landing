import React, { useState, useEffect } from "react";
import styles from "./FilterSettings.module.sass";
import classNames from "classnames";

const FilterSettings = ({ setVisualEffects }) => {
	const [options, setOptions] = useState([
		{
			name: "Яркость",
			filterName: "brightness",
			min: 0,
			max: 2,
			step: 0.02,
			value: 1,
			unit: "",
		},
		{
			name: "Контраст",
			filterName: "contrast",
			min: 0,
			max: 2,
			step: 0.02,
			value: 1,
			unit: "",
		},
		{
			name: "Насыщенность",
			filterName: "saturate",
			min: 0,
			max: 2,
			step: 0.02,
			value: 1,
			unit: "",
		},
		{
			name: "Оттенки серого",
			filterName: "grayscale",
			min: 0,
			max: 1,
			step: 0.01,
			value: 0,
			unit: "",
		},
		{
			name: "Смещение цветов",
			filterName: "hue-rotate",
			min: 0,
			max: 360,
			step: 1,
			value: 0,
			unit: "deg",
		},
		{
			name: "Инверсия",
			filterName: "invert",
			min: 0,
			max: 1,
			step: 0.01,
			value: 0,
			unit: "",
		},
		{
			name: "Сепия",
			filterName: "sepia",
			min: 0,
			max: 1,
			step: 0.01,
			value: 0,
			unit: "",
		},
		{
			name: "Размытие",
			filterName: "blur",
			min: 0,
			max: 10,
			step: 0.1,
			value: 0,
			unit: "px",
		},
	]);

	const innerFilterEffects = () =>
		options
			.map((option) => `${option.filterName}(${option.value}${option.unit})`)
			.join(" ");

	useEffect(() => {
		setVisualEffects((prevEffects) => ({
			...prevEffects,
			filter: innerFilterEffects(),
		}));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [options]);

	const renderOptions = () =>
		options.map((option) => (
			<div className={styles.optionWrapper} key={option.name}>
				<p className={styles.title}>{option.name}</p>
				<input
					className={classNames({
						[styles.input]: true,
						[styles.defaultDash]:
							option.filterName === "brightness" ||
							option.filterName === "contrast" ||
							option.filterName === "saturate",
					})}
					min={option.min}
					max={option.max}
					step={option.step}
					value={option.value}
					type="range"
					onChange={(e) =>
						setOptions((prevOptions) => [
							...prevOptions.map((item) =>
								item === option ? { ...option, value: e.target.value } : item
							),
						])
					}
				/>
			</div>
		));

	return <div className={styles.wrapper}>{renderOptions()}</div>;
};

export default FilterSettings;
