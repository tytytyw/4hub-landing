import React from "react";

import styles from "./DeviceItem.module.sass";
import "../../../../../generalComponents/colors.sass";
import classNames from "classnames";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { getDeviceIconName } from "../../../../../generalComponents/collections";

const DeviceItem = ({
	device,
	chosen,
	onClick,
	setMouseParams,
	listSize,
	listCollapsed,
}) => {
	
	return (
		<>
			<div
				className={classNames({
					[styles.wrapper]: true,
					[styles.wrapperChosen]: !!chosen,
					[styles?.[`wrapper_${listSize}`]]: !!listSize,
				})}
				onClick={onClick}
                title={listCollapsed ? device.name : ''}
			>
				<div className={styles.titleWrap}>
					<div className={styles.titleImg}>
						<img
							src={
								imageSrc +
								`assets/PrivateCabinet/devices/${getDeviceIconName(
									device.device
								)}.svg`
							}
							alt="icon"
							className={styles.icon}
							onError={(e) =>
								e.target.setAttribute(
									"src",
									"./assets/PrivateCabinet/devices/unknown.svg"
								)
							}
						/>
						{device.is_online ? <span className={styles.active} /> : null}
					</div>
					{!listCollapsed && (
						<div className={styles.deviceInfo}>
							<span className={styles.title}>{device.name}</span>
							{/* <div className={styles.details}>
								<span>OS: {device.os}</span>
								<span>Last visited: {device.last_visit}</span>
							</div> */}
						</div>
					)}
				</div>
				<div className={styles.functionWrap}>
					<div
						className={styles.menuWrap}
						onClick={(e) =>
							setMouseParams({
								x: e.clientX,
								y: e.clientY,
								width: 200,
								height: 25,
							})
						}
					>
						<span className={styles.menu} />
					</div>
				</div>
			</div>
		</>
	);
};

export default DeviceItem;
