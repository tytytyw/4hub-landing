import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./WorkBars.module.sass";
import { ReactComponent as AddIcon } from "../../../../../../assets/PrivateCabinet/plus-3.svg";
import { onGetSafeFileList } from "../../../../../../Store/actions/CabinetActions";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import Loader from "../../../../../../generalComponents/Loaders/4HUB";
import { useScrollElementOnScreen } from "../../../../../../generalComponents/Hooks";

const WorkBars = ({
	children,
	fileSelect,
	hideUploadFile,
	fileRef,
	gLoader,
	filePick,
	filesPage,
	onSuccessLoading,
	loadingFiles,
	setLoadingFiles,
}) => {
	const size = useSelector((state) => state.Cabinet.size);
	const search = useSelector((state) => state.Cabinet.search);
	const fileList = useSelector((state) => state.Cabinet.fileList);
	const dispatch = useDispatch();
	const authorizedSafe = useSelector((state) => state.Cabinet.authorizedSafe);

	const load = (entry) => {
		if (!gLoader && authorizedSafe) {

			if (entry.isIntersecting && !loadingFiles && filesPage !==0) {
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
						''
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
    }, []) //eslint-disable-line

	return (
		<div
			ref={fileRef}
			className={styles.workBarsWrap}
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
			{fileList?.length === 0 ? (
				<div
					onClick={fileSelect}
					className={`
                    ${styles.addFile}
                    ${size === "medium" ? styles.mediumSize : null}
                    ${size === "small" ? styles.smallSize : null}
                `}
				>
					<AddIcon className={styles.addIcon} />
					<span>Перетащите файл или нажмите загрузить</span>
				</div>
			) : null}
			{fileList?.length === 0 &&
			(!children || children?.length === 0) &&
			search.length === 0 ? (
				<img
					src={`${imageSrc}assets/PrivateCabinet/addPropose.png`}
					alt="addFile"
					className={
						size === "big"
							? styles.textAddIcon
							: size === "medium"
							? styles.textAddIconMedium
							: styles.textAddIconSmall
					}
				/>
			) : null}
			{children?.length === 0 && (search.length !== 0 || hideUploadFile) ? (
				<div
					className={styles.noSearchResults}
					style={{
						left:
							size === "small"
								? "158px"
								: size === "medium"
								? "200px"
								: "245px",
					}}
				>
					Нет элементов удовлетворяющих условиям поиска
				</div>
			) : null}
			{gLoader ? (
				<Loader
					type='bounceDots'
					position='absolute'
					background='rgba(255, 255, 255, 0.75)'
					zIndex={5}
					containerType='bounceDots'
				/>
			) : (
				children
			)}
			{!gLoader ? (
				<div
					className={`${styles.bottomLine} ${
						filesPage === 0 ? styles.bottomLineHidden : ""
					}`}
					style={{ height: "100%" }}
					ref={containerRef}
				>
					{loadingFiles && <Loader
						type="bounceDots"
						position="absolute"
						background="white"
						zIndex={5}
						width="100px"
						height="100px"
						containerType="bounceDots"
					/>}
				</div>
			) : null}
		</div>
	);
};

export default WorkBars;
