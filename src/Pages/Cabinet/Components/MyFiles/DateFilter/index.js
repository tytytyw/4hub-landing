import React from "react";
import styles from "./DateFilter.module.sass";
import Select from "../../../../../generalComponents/Select/Select";
import { getDays, getYears, months } from "./helper";
import classNames from "classnames";

const DateFilter = ({ month, setMonth }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.searchWrap}>
				<div className={styles.yearSelect}>
					<Select
						placeholder="Выбрать год"
						className={styles.select}
						classNameSelect={styles.selectContentYear}
						data={getYears()}
					/>
				</div>

				<div className={styles.daySelect}>
					<Select
						placeholder="Выбрать день"
						className={styles.select}
						classNameSelect={styles.selectContent}
						data={getDays()}
					/>
				</div>
			</div>

			<div className={styles.buttonsWrap}>
				{months?.map((item, index) => (
					<button
						key={index}
						onClick={() => {
							if (month !== item.id) setMonth(item.id);
							else setMonth('');
						}}
						className={classNames({
							[styles.button]: true,
							[styles.active]: item.id === month,
						})}
					>
						{item.text}
					</button>
				))}
			</div>
		</div>
	);
};

export default DateFilter;
