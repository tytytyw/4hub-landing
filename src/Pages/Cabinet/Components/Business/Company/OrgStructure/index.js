import React, { useState, useEffect, useCallback } from "react";
import styles from "./OrgStructure.module.sass";
import ReactFlow, {
	isEdge,
	removeElements,
	addEdge,
	Controls,
} from "react-flow-renderer";
import CustomNodeComponent from './CustomNodeComponent'

function OrgStructure() {
	const onNodeDragStop = (event, node) => console.log("drag stop", node);
	const onElementClick = (event, element) => {
		console.log("click", element);
	};
	const connectionLineStyle = { stroke: "#b1b1b7" };
	const snapGrid = [20, 20];
	const [reactflowInstance, setReactflowInstance] = useState(null);
	const [elements, setElements] = useState([]);

	useEffect(() => {
		setElements([
			{
				id: "1",
				type: "special",
				data: { position:'Руководитель компании', name: "Андрей Петрович", inner: true},
				position: { x: 0, y: 0 },
			},

			{
				id: "2-1",
				type: "special",
				data: { position:'консультант', name: "Константин Петрович" },
				position: { x: 300, y: 60 },
			},
            {
				id: "2-2",
				type: "special",
				data: { position:'консультант', name: "Алина Викторовна" },
				position: { x: 300, y: 150 },
			},
            {
				id: "2-3",
				type: "special",
				data: { position:'консультант', name: "Наталья Ивановна" },
				position: { x: 300, y: 240 },
			},

			{
				id: "3",
				type: "special",
				data: { position:'карп', name: "Алексей Владимирович" },
				position: { x: 650, y: 25 },
			},
			{
				id: "4",
				type: "special",
				data: { position:'уборщица', name: "Анастасия Георгиевна" },
				position: { x: 650, y: 100 },
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
	}, []);

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
		</div>
	);
}

export default OrgStructure;
