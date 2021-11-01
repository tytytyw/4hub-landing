import React, { useState, useEffect } from "react";
import styles from "./Company.module.sass";
import SideList from "./SideList";
import { ReactComponent as SettingsIcon } from "../../../../../assets/BusinessCabinet/SideList/settings.svg";
import { ReactComponent as InfoIcon } from "../../../../../assets/BusinessCabinet/SideList/info.svg";
import { ReactComponent as TeamIcon } from "../../../../../assets/BusinessCabinet/SideList/team.svg";
import { ReactComponent as OrgIcon } from "../../../../../assets/BusinessCabinet/SideList/org.svg";
import WelcomeCard from "./WelcomePage/WelcomeCard";
import GiveAccess from "./WelcomePage/GiveAccess";
import SuccessSend from "./WelcomePage/SuccessSend";
import Standards from "./Standards";
import SearchField from "../../SearchField";
import Notifications from "../../Notifications";
import Profile from "../../Profile";
import Verification from "./Verification";
import OrgStructure from "./OrgStructure";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import ContextMenuItem from "../../../../../generalComponents/ContextMenu/ContextMenuItem";

const Company = () => {
	const [pageOption, setPageOption] = useState("org_structure");
	const [mouseParams, setMouseParams] = useState(null);
	const [action, setAction] = useState({ type: "add-employee", name: "", text: "" });
    const nullifyAction = () => setAction({ type: "", name: "", text: "" });

	const sideListData = [
		{
			name: "gen_info",
			label: "Общие сведения",
			icon: <InfoIcon />,
			children: [
				{ name: "standards", label: "Стандарты компании" },
				{ name: "mission", label: "Миссия компании" },
				{ name: "viziya", label: "Визия" },
				{ name: "contacts", label: "Контакты" },
			],
		},
		{
			name: "team",
			label: "Команда",
			icon: <TeamIcon />,
			children: [
				{ name: "add-employee", label: "Добавить сотрудников" },
				{ name: "settings_access", label: "Настройки доступа" },
			],
		},
		{
			name: "org_structure",
			label: "Орг. Структура",
			icon: <OrgIcon />,
			children: [
				{ name: "add-employee", label: "Добавить сотрудников" },
				{ name: "settings_access", label: "Настройки доступа" },
			],
		},
		{
			name: "settings",
			label: "Настройки",
			icon: <SettingsIcon />,
			children: [
				{ name: "add-employee", label: "Добавить сотрудников" },
				{ name: "settings_access", label: "Настройки доступа" },
			],
		},
	];

	const renderMenuItems = (target, type) => {
		return target.map((item, i) => {
			return (
				<ContextMenuItem
					key={i}
					width={mouseParams.width}
					height={mouseParams.height}
					text={item.name}
					callback={() =>
						type.forEach((el, index) => {
							if (el.type === item.type) el.callback(type, index);
						})
					}
					imageSrc={`${imageSrc}assets/PrivateCabinet/${item.img}.svg`}
				/>
			);
		});
	};

    useEffect(() => {
        setMouseParams(null)

    }, [action, pageOption])

	return (
		<div className={styles.wrapper}>
			<SideList
				pageOption={pageOption}
				setPageOption={setPageOption}
				data={sideListData}
			/>

			<div className={styles.contentWrap}>
				<div className={styles.header}>
					<SearchField selectable={false} />
					<div className={styles.infoHeader}>
						<div className={styles.notifyWrapper}>
							<Notifications />
						</div>
						<Profile />
					</div>
				</div>

				<div className={styles.content}>
					{pageOption === "init" && (
						<Verification setPageOption={setPageOption} />
					)}
					{pageOption === "welcome" && (
						<WelcomeCard setPageOption={setPageOption} />
					)}
					{pageOption === "give-access" && (
						<GiveAccess setPageOption={setPageOption} />
					)}
					{pageOption === "success-mail" && (
						<SuccessSend setPageOption={setPageOption} />
					)}
					{pageOption === "standards" && (
						<Standards setPageOption={setPageOption} />
					)}
					{pageOption === "org_structure" && (
						<OrgStructure
							mouseParams={mouseParams}
							setMouseParams={setMouseParams}
							renderMenuItems={renderMenuItems}
							setAction={setAction}
                            nullifyAction={nullifyAction}
                            setPageOption={setPageOption}
                            action={action}
						/>
					)}

				</div>
			</div>
		</div>
	);
};

export default Company;
