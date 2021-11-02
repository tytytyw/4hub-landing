import React, { useState, useEffect, useCallback } from "react";
import styles from "./OrgStructure.module.sass";
import ReactFlow, {
	// isEdge,
	removeElements,
	addEdge,
	Controls,
} from "react-flow-renderer";
import CustomNodeComponent from "./CustomNodeComponent";
import ContextMenu from "../../../../../../generalComponents/ContextMenu";
import { contextMenuPerson } from "../../../../../../generalComponents/collections";
import AddEmployee from "../AddEmployee";
import ActionApproval from "../../../../../../generalComponents/ActionApproval";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import EditPerson from "../ContexMenuComponents/OrgStructure/EditPerson";
import { ReactComponent as Plus } from "../../../../../../assets/PrivateCabinet/plus-3.svg";

function OrgStructure({
	mouseParams,
	setMouseParams,
	renderMenuItems,
	setAction,
	nullifyAction,
	setPageOption,
	action,
}) {
	const onNodeDragStop = (event, node) => console.log("drag stop", node);
	const onElementClick = (e, element) => {
		console.log(element);
		if (element.type === "special") {
			setChosenPerson(element);
			if (e.target.tagName !== "path" && e.target.className.includes("menu"))
				setMouseParams({
					type: "contextMenu",
					x: e.clientX,
					y: e.clientY,
					width: 220,
					height: 25,
				});
		} else if (element.type === "step") {
			setChosenLine(element);
			setMouseParams({
				type: "deleteLine",
				x: e.clientX,
				y: e.clientY,
				width: 16,
				height: 19,
			});
		}
	};
	const connectionLineStyle = { stroke: "#b1b1b7" };
	const snapGrid = [10, 10];
	// const [reactflowInstance, setReactflowInstance] = useState(null);
	const [elements, setElements] = useState([]);
	const [chosenPerson, setChosenPerson] = useState(null);
	const [chosenLine, setChosenLine] = useState(null);

	const callbackArr = [
		{
			type: "add-employee",
			name: "Добавить сотрудника",
			text: ``,
			callback: () =>
				setAction({
					type: "add-employee",
					name: "Добавить сотрудника",
					text: "",
				}),
		},
		{
			type: "delete",
			name: "Удаление сотрудника",
			text: `Вы действительно хотите удалить пользователя ${
				chosenPerson?.data.info.surname +
				" " +
				chosenPerson?.data.info.name +
				" " +
				chosenPerson?.data.info.middleName
			} из орг структуры компании?`,
			callback: (list, index) => setAction(list[index]),
		},
		{
			type: "info",
			name: "Информация о сотруднике",
			text: ``,
			callback: (list, index) => setAction(list[index]),
		},
		{
			type: "customize",
			name: "Редактирование сотрудника",
			text: ``,
			callback: (list, index) => setAction(list[index]),
		},
	];

	useEffect(() => {
		setElements([
			{
				id: "1",
				type: "special",
				data: {
					info: {
						position: "Руководитель компании",
						name: "Андрей",
						middleName: "Петрович",
						inner: true,
						status: { color: "#fff", name: "white", text: "Без статуса" },
					},
				},
				position: { x: 10, y: 10 },
			},
			{
				id: "2-1",
				type: "special",
				data: {
					info: {
						position: "консультант",
						name: "Константин",
						middleName: "Петрович",
						status: {
							color: "#F4A862",
							name: "orange",
							text: "Открытая вакансия",
						},
					},
				},
				position: { x: 300, y: 60 },
			},
			{
				id: "2-2",
				type: "special",
				data: {
					info: {
						position: "консультант",
						name: "Алина",
						middleName: "Викторовна",
						status: { color: "#fff", name: "white", text: "Без статуса" },
					},
				},
				position: { x: 300, y: 150 },
			},
			{
				id: "2-3",
				type: "special",
				data: {
					info: {
						position: "консультант",
						name: "Наталья",
						middleName: "Ивановна",
						status: { color: "#20C8D2", name: "aqua", text: "Отпуск" },
					},
				},
				position: { x: 300, y: 240 },
			},
			{
				id: "3",
				type: "special",
				data: {
					info: {
						position: "карп",
						name: "Алексей",
						middleName: "Владимирович",
						status: {
							color: "#39B31E",
							name: "green",
							text: "Декретный отпуск",
						},
					},
				},
				position: { x: 650, y: 325 },
			},
			{
				id: "4",
				type: "special",
				data: {
					info: {
						position: "уборщица",
						name: "Анастасия",
						middleName: "Георгиевна",
						status: {
							color: "#A30BEB",
							name: "violet",
							text: "Испытательный срок",
						},
					},
				},
				position: { x: 650, y: 700 },
			},
			{
				id: "e1-2",
				type: "step",
				source: "1",
				target: "2-1",
			},
			{
				id: "e2a-3",
				type: "step",
				source: "1",
				target: "2-2",
				sourceHandle: "a",
			},
			{
				id: "e2b-4",
				type: "step",
				source: "1",
				target: "2-3",
				sourceHandle: "b",
			},
		]);
	}, []); //eslint-disable-line

	// useEffect(() => {
	// 	if (reactflowInstance && elements.length > 0) {
	// 		reactflowInstance.fitView();
	// 	}
	// }, [reactflowInstance, elements.length]);

	const onElementsRemove = useCallback((elementsToRemove) => {
		setElements((els) => removeElements(elementsToRemove, els));
	}, []);
	const onConnect = useCallback(
		(params) =>
			setElements((els) =>
				addEdge({ ...params, type: "step", style: { stroke: "#b1b1b7" } }, els)
			),
		[]
	);

	// const onLoad = useCallback(
	// 	(rfi) => {
	// 		console.log(reactflowInstance)
	// 		if (!reactflowInstance) {
	// 			setReactflowInstance(rfi);
	// 			console.log("flow loaded:", rfi);
	// 		}
	// 	},
	// 	[reactflowInstance]
	// );

	const nodeTypes = {
		special: CustomNodeComponent,
	};

	const addPerson = (info) => {
		const newPerson = {
			//TODO: change id
			id: elements.length + 1 + info.middleName + info.surname,
			type: "special",
			data: { info },
			position: {
				x:
					typeof chosenPerson?.position.x === "number"
						? chosenPerson?.position.x + 300
						: 10,
				y:
					typeof chosenPerson?.position.y === "number"
						? chosenPerson?.position.y
						: 10,
			},
		};
		const newLine = {
			id: chosenPerson?.id + "line" + elements.length,
			type: "step",
			source: chosenPerson?.id,
			target: elements.length + 1 + info.middleName + info.surname,
		};
		setElements(
			chosenPerson
				? (state) => [...state, newPerson, chosenPerson && newLine]
				: () => [newPerson]
		);
	};

	const deletePerson = () => {
		const elementsToRemove = elements.filter(
			(el) =>
				chosenPerson?.id === el.id ||
				chosenPerson?.id === el.source ||
				chosenPerson?.id === el.target
		);
		onElementsRemove(elementsToRemove);
		nullifyAction();
	};

	const deleteLine = () => {
		const elementsToRemove = elements.filter(el => chosenLine?.id === el.id);
		onElementsRemove(elementsToRemove)
		nullifyAction();
	};

	const editPerson = (newData) => {
		const newItem = {
			id: newData.person.id,
			type: newData.person.type,
			data: { info: newData.newInfo },
			position: newData.person.position,
		};
		setElements((elements) =>
			elements.map((item) => (item.id === newItem.id ? newItem : item))
		);
		nullifyAction();
	};

	return (
		<div className={styles.wrapper}>
			<ReactFlow
				elements={elements}
				onElementClick={onElementClick}
				onElementsRemove={onElementsRemove}
				onConnect={onConnect}
				onNodeDragStop={onNodeDragStop}
				// onLoad={onLoad}
				connectionLineStyle={connectionLineStyle}
				snapToGrid={true}
				snapGrid={snapGrid}
				defaultZoom={1}
				nodeTypes={nodeTypes}
				zoomOnDoubleClick={false}
				translateExtent={[[0, 0], [Infinity, Infinity]]}
				// paneMoveable={false}
			>
				<Controls />
				{!elements.length && (
					<div
						className={styles.firstPersonAdd}
						onClick={() =>
							setAction({
								type: "add-employee",
								name: "Добавить сотрудника",
								text: "",
							})
						}
					>
						<Plus className={styles.plusIco} />
						<span className={styles.tile}>Добавить Руководителя компании</span>
					</div>
				)}
			</ReactFlow>
			{mouseParams !== null && mouseParams.type === "contextMenu" ? (
				<ContextMenu
					params={mouseParams}
					setParams={setMouseParams}
					tooltip={true}
					customClose={true}
					disableAutohide={true}
				>
					<div className={styles.mainMenuItems}>
						{renderMenuItems(contextMenuPerson, callbackArr)}
					</div>
				</ContextMenu>
			) : null}

			{mouseParams !== null && mouseParams.type === "deleteLine" ? (
				<ContextMenu
					params={mouseParams}
					setParams={setMouseParams}
					tooltip={false}
					customClose={true}
					disableAutohide={true}
				>
					<div
						className={styles.menuLine}
						onClick={() => deleteLine(chosenLine)}
						title="удалить линию"
					/>
				</ContextMenu>
			) : null}

			{action.type === "add-employee" ? (
				<AddEmployee
					nullifyAction={nullifyAction}
					setPageOption={setPageOption}
					addPerson={addPerson}
				/>
			) : null}
			{action.type === "customize" ? (
				<EditPerson
					nullifyAction={nullifyAction}
					person={chosenPerson}
					editPerson={editPerson}
				/>
			) : null}
			{action.type === "info" ? (
				<EditPerson
					nullifyAction={nullifyAction}
					person={chosenPerson}
					editPerson={editPerson}
					disableСhanges={true}
				/>
			) : null}
			{action.type === "delete" ? (
				<ActionApproval
					name={action.name}
					text={action.text}
					set={nullifyAction}
					callback={deletePerson}
					approve={"Удалить"}
				>
					{/* TODO: past actual avatar */}
					<img
						src={`${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`}
						alt="avatar"
						className={styles.icon}
					/>
				</ActionApproval>
			) : null}
		</div>
	);
}

export default OrgStructure;
