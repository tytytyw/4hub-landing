import React from 'react'

import styles from './FileLineShort.module.sass'
import classNames from 'classnames'
import { useSelector } from 'react-redux'

const ProgramLineShort = ({
	program,
	chosenProgram,
	setChosenProgram,
	setMouseParams
}) => {
	const size = useSelector((state) => state.Cabinet.size);

	return (
		<div
			onClick={() => setChosenProgram(program)}
			//onDoubleClick={() => setFilePreview({ ...filePreview, view: true, program })}
			className={classNames({
				[styles.wrapper]: true,
				[styles.active]: chosenProgram?.id === program?.id,
				[styles?.[`wrapper_${size}`]]: size !== "medium",
			})}
		>
			<div>
				<div className={styles.fileAbout}>
					<div className={styles.file}>
						<img
							className={styles.contentImg}
							src={program?.icon}
							alt={program?.name}
						/>
						{/*<File format={program?.ext} color={program?.is_write === '0' ? '#C1C1C1' : program?.color} />*/}
					</div>

					<div className={styles.infoWrap}>
						<div className={styles.fileName}>
							{program?.name}
						</div>

						<div className={styles.fileInfo}>
							<span className={styles.fileDate}>
								{program?.ctime?.split(" ")[0]}
							</span>
							<span className={styles.fileSize}>{program?.size_now}</span>
							{size !== "small" && (
								<div className={styles.symbols}>
									{program?.is_pass === 1 && (
										<img
											className={styles.locked}
											src={`./assets/PrivateCabinet/locked.svg`}
											alt="lock"
										/>
									)}
									{program?.fig && (
										<img
											className={styles.sign}
											src={`./assets/PrivateCabinet/signs/${program?.fig}.svg`}
											alt="sign"
										/>
									)}
									{program?.emo && (
										<img
											className={styles.smile}
											src={`./assets/PrivateCabinet/smiles/${program?.emo}.svg`}
											alt="emoji"
										/>
									)}
								</div>
							)}
						</div>
					</div>

					{size === "small" && (
						<div className={styles.symbols}>
							{program?.is_pass === 1 && (
								<img
									className={styles.locked}
									src={`./assets/PrivateCabinet/locked.svg`}
									alt="lock"
								/>
							)}
							{program?.fig && (
								<img
									className={styles.sign}
									src={`./assets/PrivateCabinet/signs/${program?.fig}.svg`}
									alt="sign"
								/>
							)}
							{program?.emo && (
								<img
									className={styles.smile}
									src={`./assets/PrivateCabinet/smiles/${program?.emo}.svg`}
									alt="emoji"
								/>
							)}
						</div>
					)}
					<div className={styles.optionsWrap}>
						<div
							className={styles.menuWrap}
							onClick={(e) => {
								setMouseParams({
									x: e.clientX,
									y: e.clientY,
									width: 260,
									height: 25,
								});
							}}
						>
							<span className={styles.menu} />
						</div>
					</div>
				</div>
			</div>
			{/*<div className={styles.linkWrap}>
				<a className={styles.link} href={`https://fs2.mh.net.ua`}>
					https://fs2.mh.net.ua
				</a>
			</div>*/}
		</div>
	);
};

export default ProgramLineShort
