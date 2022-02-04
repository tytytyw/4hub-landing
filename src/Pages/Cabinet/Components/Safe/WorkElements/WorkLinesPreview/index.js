import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./WorkLinesPreview.module.sass";
import { colors } from "../../../../../../generalComponents/collections";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import api from "../../../../../../api";
import File from "../../../../../../generalComponents/Files";
import classNames from "classnames";
import { onGetSafeFileList } from "../../../../../../Store/actions/CabinetActions";
import { useScrollElementOnScreen } from "../../../../../../generalComponents/Hooks";
import Loader from "../../../../../../generalComponents/Loaders/4HUB";

const WorkLinesPreview = ({
	file,
	children,
	hideFileList,
	setLoadingType,
	fileRef,
	gLoader,
	filesPage,
	onSuccessLoading,
	loadingFiles,
	setLoadingFiles,
	filePick
}) => {
	const size = useSelector((state) => state.Cabinet.size);
	const search = useSelector((state) => state.Cabinet?.search);

	const [color, setColor] = useState(null);
	const [f, setF] = useState(file);
	const uid = useSelector((state) => state.user.uid);
	const authorizedSafe = useSelector((state) => state.Cabinet.safe.authorizedSafe);
	const [previewReq, setPreviewReq] = useState({ sent: false, data: null });
    const dispatch = useDispatch();


	useEffect(() => {
		setF(file);
		const newColor = colors.filter((c) => c.color === file?.color);
		setColor(newColor[0]);
	}, [file]);

	const renderFilePreview = () => {
		if (f?.mime_type) {
			switch (f.mime_type.split("/")[0]) {
				case "image": {
					return (
						<img
							src={previewReq.data}
							alt="filePrieview"
							className={hideFileList ? styles.big_pic : ""}
						/>
					);
				}
				default: {
					return (
						<div className={styles.filePreviewWrap}>
							<File format={f?.ext} color={f?.color} />
						</div>
					);
				}
			}
		}
	};

	//TODO: refactor: import getPreview
	const getPreview = () => {
		if (!previewReq.sent) {
			setLoadingType("squarify");
			setPreviewReq({ ...previewReq, sent: true });
			api
				.get(
					`/ajax/safe_file_preview.php?uid=${uid}&fid=${file.fid}&id_safe=${authorizedSafe.id_safe}&pass=${authorizedSafe.password}&code=${authorizedSafe.code}`,
					{
						responseType: "blob",
					}
				)
				.then((res) => {
					const blob = new Blob([res.data]);
					let objectURL = URL.createObjectURL(blob);
					setPreviewReq({ sent: false, data: objectURL });
				})
				.catch((err) => console.log(err))
				.finally(() => setLoadingType(false));
		}
	};

	useEffect(() => {
		if (file?.is_preview === 1) {
			getPreview();
		}
		renderFilePreview();
		setPreviewReq({ sent: false, data: null });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);

	const load = (entry) => {
		if (!gLoader && authorizedSafe) {
			if (entry.isIntersecting && !loadingFiles && filesPage !== 0) {
				setLoadingFiles(true);
				dispatch(
					onGetSafeFileList(
						authorizedSafe.code,
						authorizedSafe.id_safe,
						authorizedSafe.password,
						onSuccessLoading,
						"",
						"",
						search,
						filesPage,
						""
					)
				);
			}
		}
	};

	const options = {
		root: null,
		rootMargin: "0px",
		threshold: 0,
	};

	const [containerRef] = useScrollElementOnScreen(options, load);

	useEffect(() => {
		setLoadingFiles(false);
	}, []); //eslint-disable-line

	return (
		<div className={styles.workLinesPreviewWrap}>
			{!hideFileList && authorizedSafe && (
				<div
					className={classNames(
						styles.fileListWrap,
						styles[`fileListWrap_${size}`]
					)}
					style={{
						height: `${
							filePick.show
								? "calc(100% - 90px - 55px - 90px)"
								: "calc(100% - 90px - 55px)"
						}`,
						gridTemplateColumns:
							size === "small"
								? "repeat(auto-fill, 118px)"
								: size === "medium"
								? "repeat(auto-fill, 160px)"
								: "repeat(auto-fill, 205px)",
						gridAutoRows:
							size === "small" ? "118px" : size === "medium" ? "160px" : "205px",
					}}
				>
					{!gLoader && children}
					{!gLoader ? (
						<div
							className={`${styles.bottomLine} ${
								filesPage === 0 ? styles.bottomLineHidden : ""
							}`}
							ref={containerRef}
						>
							<Loader
								type="bounceDots"
								position="absolute"
								background="white"
								zIndex={5}
								width="100px"
								height="100px"
								containerType="bounceDots"
							/>
						</div>
					) : null}
				</div>
			)}
			{authorizedSafe && <div className={styles.previewFileWrap} ref={fileRef}>
				{f ? (
					<>
						<div className={styles.preview}>
							{f ? (
								f.is_preview === 1 ? (
									renderFilePreview()
								) : (
									<div>
										<div className={styles.filePreviewWrap}>
											<File format={f?.ext} color={f?.color} />
										</div>
									</div>
								)
							) : null}
						</div>
						<span className={styles.fileName}>{f.name}</span>
						<div className={styles.infoFileItem}>
							<span className={styles.itemName}>Теги</span>
							{f.tag ? (
								<span className={styles.tagName}>#{f.tag}</span>
							) : (
								<span className={styles.optionItem}>Добавить тег</span>
							)}
						</div>
						<div className={styles.infoFileItem}>
							<span className={styles.itemName}>Цвет</span>
							{f?.color ? (
								<span
									className={styles.colorCircle}
									style={{
										background: color?.light,
										border: `1px solid ${color?.dark}`,
									}}
								/>
							) : (
								<span className={styles.optionItem}>Добавить цвет</span>
							)}
						</div>
						<div className={styles.infoFileItem}>
							<span className={styles.itemName}>Знаки</span>
							{f?.fig ? (
								<img
									src={`${imageSrc}/assets/PrivateCabinet/signs/${f.fig}.svg`}
									alt="sign"
								/>
							) : (
								<span className={styles.optionItem}>Добавить знаки</span>
							)}
						</div>
						<div className={styles.infoFileItem}>
							<span className={styles.itemName}>Эмоджи</span>
							{f?.emo ? (
								<img
									src={`${imageSrc}/assets/PrivateCabinet/smiles/${f.emo}.svg`}
									alt="sign"
								/>
							) : (
								<span className={styles.optionItem}>Добавить эмоджи</span>
							)}
						</div>
						<div className={styles.infoFileItem}>
							<span className={styles.itemName}>Создан</span>
							{f?.mtime ? (
								<span className={styles.description}>
									{f.mtime.split(" ")[0]}
								</span>
							) : (
								""
							)}
						</div>
						<div className={styles.infoFileItem}>
							<span className={styles.itemName}>Изменен</span>
							{f?.ctime ? (
								<span className={styles.description}>
									{f.ctime.split(" ")[0]}
								</span>
							) : (
								""
							)}
						</div>
						<div className={styles.infoFileItem}>
							<span className={styles.itemName}>Размеры</span>
							{f?.size_now ? (
								<span className={styles.description}>{f.size_now}</span>
							) : (
								""
							)}
						</div>
					</>
				) : null}
			</div>}
		</div>
	);
};

export default WorkLinesPreview;
