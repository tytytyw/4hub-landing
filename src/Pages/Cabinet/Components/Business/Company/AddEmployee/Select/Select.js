import React, { useEffect, useRef, useState } from "react";
import styles from "./Select.module.sass";
import classNames from "classnames";
import {
	personStatus,
	personPositions,
} from "../../../../../../../generalComponents/collections";
import {imageSrc} from '../../../../../../../generalComponents/globalVariables';

const Select = ({ selectFor, value, setValue }) => {
	const [open, setOpen] = useState(false);
	const ref = useRef();

	const [filtredPositions, setFiltredPositions] = useState(personPositions);

	const renderStatus = () => {
		if (!personStatus) return null;
		return personStatus.map((item, index) => {
			if (item.text === value) return null;
			return (
				<div
					className={styles.option}
					key={index}
					onClick={() => {
						setValue(personStatus.filter((i) => i.text === item.text)[0]);
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

	const renderPositions = () => {
		if (!filtredPositions) return null;
		return (
			<div className={styles.positionWrap}>
				<div className={styles.searchWrap}>
                    <img
                    src={imageSrc + "assets/PrivateCabinet/magnifying-glass-2.svg"}
                    alt="magnify"
                    />
					<input
						placeholder="введите название должности"
						className={styles.searchInput}
						onChange={(e) =>
							setFiltredPositions(
								personPositions.filter((position) =>
									position.toLowerCase().includes(e.target.value.toLowerCase())
								)
							)
						}
					/>
				</div>
                <div className={styles.optionsWrap}>
                    {filtredPositions.map((item, index) => {
                        return (
                            <div
                                className={styles.option}
                                key={item + index}
                                onClick={() => {
                                    setValue(item);
                                    setOpen(false);
                                }}
                            >
                                <span>{item}</span>
                            </div>
                        );
                    })}
                </div>
			</div>
		);
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
											personStatus.filter((i) => i.text === value)[0].color
										}`,
									}}
								></div>
							</div>
						)}
						{selectFor === "status" ? (
							value
						) : (
							<input
								className={styles.positionInput}
								placeholder="Выберите из списка или введите вручную"
								value={value}
								onChange={(e) => setValue(e.target.value ? e.target.value[0].toUpperCase() + e.target.value.slice(1) : '')}
							/>
						)}
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
                    [styles.position]: selectFor === 'position'
				})}
			>
				{open && selectFor === "status" ? renderStatus() : renderPositions()}
			</div>
		</div>
	);
};

export default Select;
