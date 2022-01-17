import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Devices.module.sass";
import List from "../List";
import DeviceItem from "./DeviceItem";
import WorkSpace from "./WorkSpace";
import ContextMenu from "../../../../generalComponents/ContextMenu";
import { imageSrc } from "../../../../generalComponents/globalVariables";
import {
	contextMenuDevice,
	contextMenuDeviceUser,
} from "../../../../generalComponents/collections";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import {
	onGetConnectedContacts,
	onGetDevices,
	setDevices,
	setSelectedDevice,
	setSelectedUser,
} from "../../../../Store/actions/CabinetActions";
import ConnectedContacts from "./ConnectedContacts";
import SuccessPopup from "../Business/SuccessPopup";
import successImg from "../../../../assets/BusinessCabinet/WelcomePage/mail-desktop.svg";
import api from "../../../../api";
import OptionButtomLine from "./OptionButtomLine";

const Devices = () => {
	const dispatch = useDispatch();
	const devices = useSelector((state) => state.Cabinet.devices);
	const size = useSelector((state) => state.Cabinet.size);
	const uid = useSelector((state) => state.user.uid);

	const selectedDevice = useSelector((state) => state.Cabinet.selectedDevice);
	const selectedUser = useSelector((state) => state.Cabinet.selectedUser);

	const [listCollapsed, setListCollapsed] = useState("");

	const [mouseParams, setMouseParams] = useState(null);
	// const [action, setAction] = useState({type: '', name: '', text: ''})

	const [successBlocked, setSuccessBlocked] = useState(false);
	const [multiple, setMultiple] = useState(false);
	const [selectedDevices, setSelectedDevices] = useState([]);

	useEffect(() => {
		dispatch(onGetDevices());
		dispatch(onGetConnectedContacts());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const multipleSelect = (dev) => {
		if (selectedDevices.includes(dev.id)) {
			setSelectedDevices(selectedDevices.filter((i) => i !== dev.id));
		} else {
			setSelectedDevices([...selectedDevices, dev.id]);
		}
	};

	const renderDevicesList = () => {
		if (!devices) return null;
		return devices.map((dev, i) => {
			// if (
                // dev?.is_block === '1'
                // || dev?.is_online === 0
            // ) {
			//     return null
			// }
			return (
				<DeviceItem
					key={i + dev.name}
					device={dev}
					listSize={size}
					chosen={
						selectedDevice?.id === dev.id || selectedDevices.includes(dev.id)
					}
					setMouseParams={setMouseParams}
					onClick={() => {
						if (multiple) {
							multipleSelect(dev);
							dispatch(setSelectedDevice(null));
						} else {
							dispatch(setSelectedUser(null));
							dispatch(setSelectedDevice(dev));
						}
					}}
					listCollapsed={listCollapsed}
				/>
			);
		});
	};

	const onMultipleBlock = () => {
		const formData = new FormData();
		formData.append("id_device", JSON.stringify(selectedDevices));
		api
			.post(`/ajax/devices_block.php`, formData, {
				params: { uid },
			})
			.then(() => {
				setSuccessBlocked(true);
				dispatch(
					setDevices(devices.filter((i) => !selectedDevices.includes(i.id)))
				);
				setSelectedDevices([]);
                setMultiple(false)
			});
	};

	const blockItem = () => {
		if (selectedDevice) {
			const formData = new FormData();
			formData.append("id_device", JSON.stringify([selectedDevice.id]));
			api
				.post(`/ajax/devices_block.php`, formData, {
					params: { uid },
				})
				.then(() => {
					setSuccessBlocked(true);
					dispatch(
						setDevices(devices.filter((i) => i.id !== selectedDevice.id))
					);
				});
		} else {
			api
				.post(`/ajax/devices_users_del.php?id_user_to=${selectedUser.id_user}`)
				.then(() => {
					setSuccessBlocked(true);
					dispatch(onGetConnectedContacts());
				});
		}
	};

	const renderMenuItems = (contextMenuItemsList) => {
		return contextMenuItemsList.map((item, i) => {
			return (
				<ContextMenuItem
					key={i}
					width={mouseParams.width}
					height={mouseParams.height}
					text={item.name}
					callback={() => {
						// eslint-disable-next-line default-case
						switch (item.type) {
							case "disconnectItem":
								blockItem();
								break;
							case "disconnectAllItem":
								setMultiple(true);
								setSelectedDevices([...selectedDevices, selectedDevice.id]);
								break;
						}
					}}
					imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
				/>
			);
		});
	};

	return (
		<div className={styles.workAreaWrap}>
			<List
				icon={false}
				title="Мои устройства"
				setListCollapsed={setListCollapsed}
				listCollapsed={listCollapsed}
			>
				<div className={styles.folderListWrap}>
					{renderDevicesList()}
					<ConnectedContacts
						listSize={size}
						listCollapsed={listCollapsed}
						setMouseParams={setMouseParams}
					/>
				</div>
				{multiple && (
					<OptionButtomLine
						selectedDevices={selectedDevices}
						setSelectedDevices={setSelectedDevices}
						onCancel={() => {
							setSelectedDevices([]);
							setMultiple(false);
						}}
						onSubmit={onMultipleBlock}
					/>
				)}
			</List>
			<WorkSpace listCollapsed={listCollapsed} setMultiple={setMultiple} />
			{mouseParams !== null && (
				<ContextMenu
					params={mouseParams}
					setParams={setMouseParams}
					tooltip={false}
				>
					<div className={styles.mainMenuItems}>
						{renderMenuItems(
							mouseParams.type === "user"
								? contextMenuDeviceUser.main
								: contextMenuDevice.main
						)}
					</div>
				</ContextMenu>
			)}

			{successBlocked && (
				<SuccessPopup title="Устройство заблокировано" set={setSuccessBlocked}>
					<img src={successImg} alt="Success" />
				</SuccessPopup>
			)}
		</div>
	);
};

export default Devices;
