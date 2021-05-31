import React from "react";
import File from "../../../../../../generalComponents/Files";
import classNames from "classnames";
import styles from "./StoragePeriod.module.sass";
import { ReactComponent as Calendar } from "../../../../../../assets/PrivateCabinet/calendar-6.svg";
import { ReactComponent as Eye } from "../../../../../../assets/PrivateCabinet/clock.svg";

function StoragePeriod({ file, setDisplayStotagePeriod }) {
	const curretDate = new Date().toLocaleDateString('ru-RU')
	return (
		<div className={styles.wrap}>
			<div className={classNames(styles.header, styles.border_bottom)}>
				<div className={styles.innerFileWrap}>
					<File color={file.id_color} format={file.ext} />
					{file.is_pass ? (
						<img
							className={styles.lock}
							src="./assets/PrivateCabinet/locked.svg"
							alt="lock"
						/>
					) : null}
				</div>
				<div className={styles.descriptionWrap}>
					<div className={styles.fileName}>
						{file.name.slice(0, file.name.lastIndexOf("."))}
					</div>
					<div className={styles.innerFileInfo}>
						<div className={styles.fileSize}>{file.size_now}</div>
						<div className={styles.descriptionGroup}>
							{file.fig && (
								<img
									src={`./assets/PrivateCabinet/signs/${file.fig}.svg`}
									alt="sign"
								/>
							)}
							{file.emo && (
								<img
									src={`./assets/PrivateCabinet/smiles/${file.emo}.svg`}
									alt="emoji"
								/>
							)}
						</div>
					</div>
				</div>
				<div className={styles.buttons_wrap}>
					<div
						className={styles.close_wrap}
						onClick={() => setDisplayStotagePeriod(false)}
					>
						<span className={styles.close} />
					</div>
				</div>
			</div>
			<div className={styles.date_wrap}>
				<div className={styles.title_wrap}>
					<Calendar />
					<h5 className={styles.title}>Укажите даты хранения</h5>
				</div>
				<div className={styles.inputs_wrap}>
					<span className={styles.from}>C</span>
					<input className={styles.date} value={curretDate} type="text" disabled></input>
					<span className={styles.to}>До</span>
					<input className={styles.date} type="date"></input>
					<input
						className={styles.input_submit}
						value="Открыть календарь"
						type="submit"
					/>
				</div>
			</div>
			<div className={styles.time_wrap}>
				<div className={styles.title_wrap}>
					<Eye />
					<h5 className={styles.title}>Укажите время хранения</h5>
				</div>
				<div
					className={classNames(styles.inputs_wrap, styles.inputs_wrap_time)}
				>
					<input className={styles.time_count} min="0" placeholder="ЧЧ" type="number"></input>
					<span>:</span>
					<input className={styles.time_count} min="0" max="60" placeholder="ММ" type="number"></input>
					<span>:</span>
					<input className={styles.time_count} min="0" max="60" placeholder="СС" type="number"></input>
				</div>
			</div>
			<p className={classNames(styles.hint, styles.border_bottom)}>
				После завершения срока хранения в 23:59 ссылка автоматитески будет
				недоступна
			</p>
			<div className={styles.buttonsWrap}>
				<div
					onClick={() => setDisplayStotagePeriod(false)}
					className={styles.add}
				>
					Готово
				</div>
			</div>
		</div>
	);
}

export default StoragePeriod;
