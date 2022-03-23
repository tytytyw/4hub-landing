import React, { useState, useEffect } from "react";
import styles from "./FilterSettings.module.sass";
import classNames from "classnames";

const FilterSettings = ({ visualEffects, setVisualEffects }) => {
	const [options, setOptions] = useState([
		{
			name: "Яркость",
			filterName: "brightness",
			min: 0,
			max: 2,
			step: 0.02,
			value: visualEffects.filter.brightness,
			unit: "",
		},
		{
			name: "Контраст",
			filterName: "contrast",
			min: 0,
			max: 2,
			step: 0.02,
			value: visualEffects.filter.contrast,
			unit: "",
		},
		{
			name: "Насыщенность",
			filterName: "saturate",
			min: 0,
			max: 2,
			step: 0.02,
			value: visualEffects.filter.saturate,
			unit: "",
		},
		{
			name: "Оттенки серого",
			filterName: "grayscale",
			min: 0,
			max: 1,
			step: 0.01,
			value: visualEffects.filter.grayscale,
			unit: "",
		},
		{
			name: "Смещение цветов",
			filterName: "hue-rotate",
			min: 0,
			max: 360,
			step: 1,
			value: visualEffects.filter["hue-rotate"],
			unit: "deg",
		},
		{
			name: "Инверсия",
			filterName: "invert",
			min: 0,
			max: 1,
			step: 0.01,
			value: visualEffects.filter.invert,
			unit: "",
		},
		{
			name: "Сепия",
			filterName: "sepia",
			min: 0,
			max: 1,
			step: 0.01,
			value: visualEffects.filter.sepia,
			unit: "",
		},
		{
			name: "Размытие",
			filterName: "blur",
			min: 0,
			max: 10,
			step: 0.1,
			value: visualEffects.filter.blur,
			unit: "px",
		},
	]);

	const innerFilterEffects = () =>
		options
			.map((option) => `${option.filterName}(${option.value}${option.unit})`)
			.join(" ");

	useEffect(() => {
		const newFilterParams = {...visualEffects.filter}
		options.forEach(option => newFilterParams[option.filterName] = option.value)
		setVisualEffects((prevEffects) => ({
			...prevEffects,
			filter: {...newFilterParams, result: innerFilterEffects()},
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
