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

function OrgStructure({
	mouseParams,
	setMouseParams,
	renderMenuItems,
	setAction,
    nullifyAction,
    setPageOption,
    action
}) {
	const onNodeDragStop = (event, node) => console.log("drag stop", node);
	const onElementClick = (e, element) => {
        console.log(element)
		if (e.target.tagName !== "path" && e.target.className.includes("menu"))
			setMouseParams({ x: e.clientX, y: e.clientY, width: 190, height: 25 });
	};
	const connectionLineStyle = { stroke: "#b1b1b7" };
	const snapGrid = [20, 20];
	const [reactflowInstance, setReactflowInstance] = useState(null);
	const [elements, setElements] = useState([]);

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
			type: "copyLink",
			name: "",
			text: ``,
			callback: (list, index) => "",
		},
		{
			type: "customize",
			name: "Редактирование файла",
			text: ``,
			callback: (list, index) => "",
		},
	];

	useEffect(() => {
		setElements([
			{
				id: "1",
				type: "special",
				data: {
					position: "Руководитель компании",
					name: "Андрей Петрович",
					inner: true,
                    color : { dark: "#E3E3E3", light: "red", color: "#red", name: "red" },
				},
				position: { x: 0, y: 0 },
			},

			{
				id: "2-1",
				type: "special",
				data: { position: "консультант", name: "Константин Петрович", color: { dark: "#E3E3E3", light: "#fff", color: "green", name: "green" } },
				position: { x: 300, y: 60 },
			},
			{
				id: "2-2",
				type: "special",
				data: { position: "консультант", name: "Алина Викторовна", color: { dark: "#E3E3E3", light: "#fff", color: "#fff", name: "white" } },
				position: { x: 300, y: 150 },
			},
			{
				id: "2-3",
				type: "special",
				data: { position: "консультант", name: "Наталья Ивановна", color: { dark: "#E3E3E3", light: "#fff", color: "#fff", name: "white" } },
				position: { x: 300, y: 240 },
			},

			{
				id: "3",
				type: "special",
				data: { position: "карп", name: "Алексей Владимирович", color : { dark: "#E3E3E3", light: "#fff", color: "#fff", name: "white" },
            },
				position: { x: 650, y: 325 },
			},
			{
				id: "4",
				type: "special",
				data: { position: "уборщица", name: "Анастасия Георгиевна",  color : { dark: "#E3E3E3", light: "#fff", color: "#fff", name: "white" } },
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

	// useEffect(() => {
	// 	console.log(elements);
	// }, [elements]);

	const addPerson = (info) => {
        const newPerson = {
            //TODO: change id
            id: elements.length + 1 + '',
            type: "special",
            data: { position: info.position, name: info.name + " " + info.middleName, color: info.color },
            position: { x:  600, y: 600 },
        }
        setElements(state => [...state, newPerson])
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
		</div>
	);
}

export default OrgStructure;
