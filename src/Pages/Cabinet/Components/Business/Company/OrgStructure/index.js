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
		setChosenPerson(element);
		if (e.target.tagName !== "path" && e.target.className.includes("menu"))
			setMouseParams({ x: e.clientX, y: e.clientY, width: 190, height: 25 });
	};
	const connectionLineStyle = { stroke: "#b1b1b7" };
	const snapGrid = [20, 20];
	const [reactflowInstance, setReactflowInstance] = useState(null);
	const [elements, setElements] = useState([]);
	const [chosenPerson, setChosenPerson] = useState(null);

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
			text: `Вы действительно хотите удалить пользователя ${chosenPerson?.data.name} из орг структуры компании?`,
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
				position: { x: 0, y: 0 },
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

			// {
			// 	id: "e1-2",
			//  type: "step",
			// 	source: "1",
			// 	target: "2",
			// },
			// {
			// 	id: "e2a-3",
			// 	type: "step",
			// 	source: "2",
			// 	target: "3",
			// 	sourceHandle: "a",
			// },
			// {
			// 	id: "e2b-4",
			// 	type: "step",
			// 	source: "2",
			// 	target: "4",
			// 	sourceHandle: "b",
			// },
		]);
	}, []); //eslint-disable-line

	useEffect(() => {
		if (reactflowInstance && elements.length > 0) {
			reactflowInstance.fitView();
		}
	}, [reactflowInstance, elements.length]);

	const onElementsRemove = useCallback(
		(elementsToRemove) =>
			setElements((els) => removeElements(elementsToRemove, els)),
		[]
	);
	const onConnect = useCallback(
		(params) =>
			setElements((els) =>
				addEdge({ ...params, type: "step", style: { stroke: "#b1b1b7" } }, els)
			),
		[]
	);

	const onLoad = useCallback(
		(rfi) => {
			if (!reactflowInstance) {
				setReactflowInstance(rfi);
				console.log("flow loaded:", rfi);
			}
		},
		[reactflowInstance]
	);

	const nodeTypes = {
		special: CustomNodeComponent,
	};

	const addPerson = (info) => {
		// name, middleName, surname, position, status, phone, phone2, email, email2
		const newPerson = {
			//TODO: change id
			id: elements.length + 1 + "",
			type: "special",
			data: { info },
			position: { x: 600, y: 600 },
		};
		setElements((state) => [...state, newPerson]);
	};

	const deletePerson = () => {
		setElements((state) =>
			state.filter((item) => chosenPerson?.id !== item.id)
		);
		nullifyAction();
	};

	const editPerson = (newData) => {
		const newItem = {
			id: newData.person.id,
			type: newData.person.type,
			data: {info: newData.newInfo},
			position: newData.person.position,
		};
		setElements(elements => elements.map(item => item.id === newItem.id ? newItem : item))
		nullifyAction()
	};

	return (
		<div className={styles.wrapper}>
			<ReactFlow
				elements={elements}
				onElementClick={onElementClick}
				onElementsRemove={onElementsRemove}
				onConnect={onConnect}
				onNodeDragStop={onNodeDragStop}
				onLoad={onLoad}
				connectionLineStyle={connectionLineStyle}
				snapToGrid={true}
				snapGrid={snapGrid}
				defaultZoom={1}
				nodeTypes={nodeTypes}
			>
				<Controls />
			</ReactFlow>

			{mouseParams !== null ? (
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
