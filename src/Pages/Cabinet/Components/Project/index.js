import React, { useEffect, useState } from "react";
import {imageSrc} from '../../../../generalComponents/globalVariables';
import styles from "./Project.module.sass";
import List from "./List";
import WorkSpace from "./WorkSpace";
import ProjectItem from "./ProjectItem";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../../api";
import {
	onGetContacts,
	onGetProjects,
} from "../../../../Store/actions/CabinetActions";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import ContextMenu from "../../../../generalComponents/ContextMenu";
import {
	contextMenuProjects,
	contextMenuSubFolder,
} from "../../../../generalComponents/collections";
import CreateProject from "./CreateProject";
import ProjectContextItem from "./ProjectContextItem";
import CreateFolder from "../ContextMenuComponents/ContextMenuProject/CreateFolder";
import CopyLinkProject from "../ContextMenuComponents/ContextMenuProject/CopyLinkProject";
import CustomizeProject from "../ContextMenuComponents/ContextMenuProject/CustomizeProject";
import SuccessMessage from "../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage";
import ActionApproval from "../../../../generalComponents/ActionApproval";
import ConfigAccessFolder from "../ContextMenuComponents/ContextMenuProject/ConfigAccessFolder/ConfigAccessFolder";
import ProjectProperty from "../ContextMenuComponents/ContextMenuProject/ProjectProperty";
import { ReactComponent as ClipboardIcon } from "../../../../assets/PrivateCabinet/project/clipboard.svg";
import { ReactComponent as CoworkingIcon } from "../../../../assets/PrivateCabinet/project/coworking.svg";
import { ReactComponent as LampIcon } from "../../../../assets/PrivateCabinet/project/lamp.svg";
import { ReactComponent as PenIcon } from "../../../../assets/PrivateCabinet/project/pen.svg";
import { ReactComponent as RocketIcon } from "../../../../assets/PrivateCabinet/project/rocket.svg";
import { ReactComponent as SuitcaseIcon } from "../../../../assets/PrivateCabinet/project/suitcase.svg";
import { ReactComponent as ThunderIcon } from "../../../../assets/PrivateCabinet/project/thunder.svg";

const Project = ({ setLoadingType }) => {
	const dispatch = useDispatch();
	const projects = useSelector((state) => state.Cabinet.projects);
	const uid = useSelector((state) => state.user.uid);
	const size = useSelector((state) => state.Cabinet.size);
	const [chosenFolder, setChosenFolder] = useState(null);
	const [mouseParams, setMouseParams] = useState(null);
	const [contextMenu, setContextMenu] = useState(null);
	const [createProject, setCreateProject] = useState(false);
	const [addMember, setAddMember] = useState(false);
	const [newFolder, setNewFolder] = useState(false);

	const [action, setAction] = useState({ type: "", name: "", text: "" });
	const nullifyAction = () => setAction({ type: "", name: "", text: "" });
	const [selectedProject, setSelectedProject] = useState(null);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);

	useEffect(() => {
		dispatch(onGetProjects());
		dispatch(onGetContacts());
	}, []); // eslint-disable-line

	const callbackArrMain = [
		{
			type: "addMember",
			name: "Добавить участника",
			text: ``,
			callback: () => setAddMember(true),
		},
		{
			type: "addFolder",
			name: "Добавить папку",
			text: ``,
			callback: () => setNewFolder(true),
		},
		{
			type: "copyLink",
			name: "Доступ и экспорт",
			text: ``,
			callback: (list, index) => setAction(list[index]),
		},
		{
			type: "customize",
			name: "Редактирование проекта",
			text: ``,
			callback: (list, index) => setAction(list[index]),
		},
		{
			type: "archive",
			name: "Добавить файл в архив",
			text: `Вы действительно хотите архивировать проект ${selectedProject?.name}?`,
			callback: (list, index) => setAction(list[index]),
		},
        {type: 'propertiesProject', name: 'Свойства', text: ``, callback: (list, index) => setAction(list[index])},

	];

	const additionalMenuItems = [
		{
			type: "delete",
			name: "Удаление проекта",
			text: `Вы действительно хотите удалить проект ${selectedProject?.name}?`,
			callback: (list, index) => setAction(list[index]),
		},
		{
			type: "leave",
			name: "Покинуть проект",
			text: `Вы действительно покинуть проект ${selectedProject?.name}?`,
			callback: (list, index) => setAction(list[index]),
		},
	];

	const callbackArrSub = [
		// {type: 'resendFolder', name: 'Расшарить', text: ``, callback: (list, index) => setAction(list[index])},
		{
			type: "setAccessFolder",
			name: "Доступ и экспорт",
			text: ``,
			callback: (list, index) => setAction(list[index]),
		},
		// {type: 'copyLink', name: 'Скопировать ссылку', text: ``, callback: (list, index) => setAction(list[index])},
		// {type: 'propertiesFolder', name: 'Свойства', text: ``, callback: (list, index) => setAction(list[index])},
		// {type: 'deleteFolder', name: 'Удаление папки', text: `Вы действительно хотите удалить выбранную папку?`, callback: (list, index) => setAction(list[index])},
	];

	const renderMenuItems = (target, type) => {
		return target.map((item, i) => {
			return (
				<ContextMenuItem
					key={i}
					width={mouseParams.width}
					height={mouseParams.height}
					text={item.name}
					imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
					callback={() =>
						type.forEach((el, index) => {
							if (el.name === item.name) el.callback(type, index);
						})
					}
				/>
			);
		});
	};

	const renderProjectMenuItems = (target, type) => {
		return target.map((item, i) => {
			return (
				<ProjectContextItem
					key={i}
					width={mouseParams.width}
					height={mouseParams.height}
					text={item.name}
					callback={() =>
						type.forEach((el, index) => {
							if (el.type === item.type) el.callback(type, index);
						})
					}
					imageSrc={`./assets/PrivateCabinet/contextMenuProject/${item.img}.svg`}
				/>
			);
		});
	};

	const renderProjects = () => {
		return projects?.map((project, index) => (
			<ProjectItem
				size={size}
				key={index}
				project={project}
				chosenFolder={chosenFolder}
				setChosenFolder={setChosenFolder}
				setMouseParams={setMouseParams}
				contextMenu={contextMenu}
				setContextMenu={setContextMenu}
				setSelectedProject={setSelectedProject}
				chosen={selectedProject?.id === project.id}
			/>
		));
	};

	const getIcon = (project) => {
		switch (project.icon) {
			case "clipboard":
				return <ClipboardIcon className={project.id_color} alt="icon" />;
			case "coworking":
				return <CoworkingIcon className={project.id_color} alt="icon" />;
			case "lamp":
				return <LampIcon className={project.id_color} alt="icon" />;
			case "pen":
				return <PenIcon className={project.id_color} alt="icon" />;
			case "rocket":
				return <RocketIcon className={project.id_color} alt="icon" />;
			case "suitcase":
				return <SuitcaseIcon className={project.id_color} alt="icon" />;
			case "thunder":
				return <ThunderIcon className={project.id_color} alt="icon" />;
			default:
				return <ClipboardIcon className={project.id_color} alt="icon" />;
		}
	};

	const deleteProject = () => {
		nullifyAction();
		api
			.post(`/ajax/project_del.php?uid=${uid}&id_project=${selectedProject.id}`)
			.then((res) => {
				if (res.data.ok === 1) {
					setShowSuccessMessage("Проект удален");
					dispatch(onGetProjects());
				} else {
					console.log(res);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className={styles.workAreaWrap}>
			<List
				title="Создать проект"
				src="add_project.svg"
				className={styles.listWrap}
				onCreate={setCreateProject}
			>
				{projects?.length < 1 ? (
					<div className={styles.emptyBlock}>
						<img
							className={styles.emptyImg}
							src={`${imageSrc}/assets/PrivateCabinet/create_arrow.svg`}
							alt="Create Arrow"
						/>
						<h4 className={styles.emptyTitle}>СОЗДАЙТЕ Ваш первый проект</h4>
					</div>
				) : (
					<div className={styles.folderWrap}>{renderProjects()}</div>
				)}
			</List>

			<WorkSpace
				setMouseParams={setMouseParams}
				addMember={addMember}
				setAddMember={setAddMember}
			/>

			{mouseParams?.type === "menu" && (
				<ContextMenu
					params={mouseParams}
					setParams={setMouseParams}
					tooltip={true}
				>
					<div className={styles.mainMenuItems}>
						{renderMenuItems(contextMenuSubFolder.main, callbackArrSub)}
					</div>
				</ContextMenu>
			)}

			{mouseParams?.type === "project" && (
				<ContextMenu
					params={mouseParams}
					setParams={setMouseParams}
					tooltip={true}
				>
					<div className={styles.mainMenuItems}>
						{renderProjectMenuItems(contextMenuProjects.main, callbackArrMain)}
					</div>
					<div className={styles.additionalMenuItems}>
						{renderProjectMenuItems(
							contextMenuProjects.additional,
							additionalMenuItems
						)}
					</div>
				</ContextMenu>
			)}

			{showSuccessMessage && (
				<SuccessMessage
					showSuccessMessage={showSuccessMessage}
					setShowSuccessMessage={setShowSuccessMessage}
				/>
			)}

			{createProject && (
				<CreateProject
					title="Создание проекта"
					onCreate={setCreateProject}
					setLoadingType={setLoadingType}
				/>
			)}
			{newFolder && (
				<CreateFolder onCreate={setNewFolder} title="Новая папка" />
			)}
			{action.type === "copyLink" ? (
				<CopyLinkProject
					nullifyAction={nullifyAction}
					setShowSuccessMessage={setShowSuccessMessage}
					project={selectedProject}
					// setLoadingType={setLoadingType}
				/>
			) : null}
			{action.type === "delete" ? (
				<ActionApproval
					name={action.name}
					text={action.text}
					set={nullifyAction}
					approve={"Удалить"}
					callback={deleteProject}
				>
					<div className={styles.fileActionWrap}>
						{getIcon(selectedProject)}
					</div>
				</ActionApproval>
			) : null}
			{action.type === "leave" ? (
				<ActionApproval
					name={action.name}
					text={action.text}
					set={nullifyAction}
					callback={nullifyAction}
					approve={"Покинуть"}
				>
					<div className={styles.fileActionWrap}>
						{getIcon(selectedProject)}
					</div>
				</ActionApproval>
			) : null}
			{action.type === "archive" ? (
				<ActionApproval
					name={action.name}
					text={action.text}
					set={nullifyAction}
					callback={nullifyAction}
					approve={"Архивировать"}
				>
					<div className={styles.fileActionWrap}>
						{getIcon(selectedProject)}
					</div>
				</ActionApproval>
			) : null}
			{action.type === "customize" ? (
				<CustomizeProject
					title="Редатирование проекта"
					onCreate={nullifyAction}
					project={selectedProject}
					setLoadingType={setLoadingType}
				/>
			) : null}

			{action.type === "setAccessFolder" ? (
				<ConfigAccessFolder
					folder={chosenFolder}
					files={{}}
					close={nullifyAction}
					showSuccessMessage={showSuccessMessage}
					setShowSuccessMessage={setShowSuccessMessage}
				/>
			) : null}

			{action.type === "propertiesProject" ? (
				<ProjectProperty close={nullifyAction} project={selectedProject} getIcon={getIcon} />
			) : null}
		</div>
	);
};

export default Project;
