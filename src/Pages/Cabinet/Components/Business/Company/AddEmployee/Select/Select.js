import React, { useEffect, useRef, useState } from "react";
import styles from "./Select.module.sass";
import classNames from "classnames";

const Select = ({ selectFor, value, setValue, options }) => {
	const [open, setOpen] = useState(false);
	const ref = useRef();

	const renderStatus = () => {
		if (!options) return null;
		return options.map((item, index) => {
			if (item.text === value) return null;
			return (
				<div
					className={styles.option}
					key={index}
					onClick={() => {
						setValue(options.filter((i) => i.text === item.text)[0]);
						setOpen(false);
					}}
				>
					<div className={styles.colorWrap}>
						<div style={{ background: `${item.color}` }}></div>
					</div>
					<span>{item.text}</span>
				</div>
			);
		});
	};

	useEffect(() => {
		const onClick = (event) => {
			if (!ref.current?.contains(event.target)) {
				setOpen(false);
			}
		};
		window.addEventListener("click", onClick);
		return () => window.removeEventListener("click", onClick);
	}, []);

	return (
		<div
			ref={ref}
			className={classNames({
				[styles.selectWrap]: true,
				[styles.active]: !!open,
			})}
		>
			<div
				onClick={() => setOpen(!open)}
				className={classNames({
					[styles.select]: true,
				})}
			>
				<div className={styles.valueWrap}>
					<span
						className={classNames({
							[styles.selectInput]: true,
						})}
					>
						{selectFor === "status" && (
							<div className={styles.colorWrap}>
								<div
									style={{
										background: `${
											options.filter((i) => i.text === value)[0].color
										}`,
									}}
								></div>
							</div>
						)}
						{value}
					</span>
				</div>
				<span
					className={classNames({
						[styles.arrow]: true,
						[styles.active]: !!open,
					})}
				/>
			</div>

			<div
				className={classNames({
					[styles.contentWrap]: true,
					[styles.active]: !!open,
				})}
			>
				{open && selectFor === "status" ? renderStatus() : ''}
			</div>
		</div>
	);
};

export default Select;
