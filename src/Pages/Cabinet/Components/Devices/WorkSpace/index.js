import React from "react";
import { useSelector } from "react-redux";

import styles from "./WorkSpace.module.sass";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import Profile from "../../Profile";
import ServePanel from "../../ServePanel";
import BottomPanel from "../../BottomPanel";
import { getDeviceIconName } from "../../../../../generalComponents/collections";
import {useLocales} from "react-localized";

const WorkSpace = ({ listCollapsed, setMultiple }) => {
	const { __ } = useLocales();
	const selectedDevice = useSelector((state) => state.Cabinet.selectedDevice);
	const selectedUser = useSelector((state) => state.Cabinet.selectedUser);

	return (
		<>
			<div
				className={`${styles.workSpaceWrap} ${
					typeof listCollapsed === "boolean"
						? listCollapsed
							? styles.workSpaceWrapCollapsed
							: styles.workSpaceWrapUncollapsed
						: undefined
				}`}
			>
				<div className={styles.header}>
					<SearchField />
					<div className={styles.infoHeader}>
						<StorageSize />
						<Notifications />
						<Profile />
					</div>
				</div>

				<ServePanel chosenFile={selectedDevice || selectedUser} chooseSeveral={setMultiple} />

				{selectedDevice && (
					<div className={styles.contentWrapper}>
						<div className={styles.previewWrapper}>
							{selectedDevice && (
								<img
									src={`./assets/PrivateCabinet/devices/${getDeviceIconName(selectedDevice.device)}.svg`}
									onError={(e) =>
										e.target.setAttribute(
											"src",
											"./assets/PrivateCabinet/devices/unknown.svg"
										)
									}
									alt="device icon"
								/>
							)}
						</div>

						<div className={styles.optionsWrapper}>
							<div className={styles.previewFileWrap}>
								<>
									<div className={styles.preview}>
										<div className={styles.filePreviewWrap}>
											<div className={styles.content}>
												<img
                                                    src={`./assets/PrivateCabinet/devices/${getDeviceIconName(selectedDevice.device)}.svg`}
													onError={(e) =>
														e.target.setAttribute(
															"src",
															"./assets/PrivateCabinet/devices/unknown.svg"
														)
													}
													alt="device icon"
												/>
												<p className={styles.contentInfo}>
													{selectedDevice.name}
												</p>
											</div>
										</div>
									</div>
									<div className={styles.infoFileItem}>
										<span className={styles.itemName}>{ __('Система') }</span>
										<span className={styles.description}>
											{selectedDevice?.platform}
										</span>
									</div>
									<div className={styles.infoFileItem}>
										<span className={styles.itemName}>{ __('Браузер') }</span>
										<span className={styles.description}>
											{selectedDevice?.browser}
										</span>
									</div>
									<div className={styles.infoFileItem}>
										<span className={styles.itemName}>{ __('Регион') }</span>
										<span className={styles.description}>
											{selectedDevice?.country}
										</span>
									</div>
									<div className={styles.infoFileItem}>
										<span className={styles.itemName}>{ __('Адрес') }</span>
										<span className={styles.address}>
											{selectedDevice?.adr}
										</span>
									</div>
									<div className={styles.infoFileItem}>
										<span className={styles.itemName}>{ __('iP адрес') }</span>
										<span className={styles.description}>
											{selectedDevice?.ip}
										</span>
									</div>
									<div className={styles.infoFileItem}>
										<span className={styles.itemName}>{ __('Провайдер') }</span>
										<span className={styles.description}>
											{selectedDevice?.provider}
										</span>
									</div>
									<div className={styles.infoFileItem}>
										<span className={styles.itemName}>{ __('Активность') }</span>
										<span className={styles.description}>
                                        {selectedDevice?.last_visit?.split('-').reverse().join('.')}
										</span>
									</div>
                                    <div className={styles.disableBtn}>{ __('Отключить') }</div>
								</>
							</div>
						</div>
					</div>
				)}

				<BottomPanel />
			</div>
		</>
	);
};

export default WorkSpace;
