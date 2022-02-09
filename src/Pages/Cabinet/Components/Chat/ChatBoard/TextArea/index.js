import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./TextArea.module.sass";
import { ReactComponent as SendIcon } from "../../../../../../assets/PrivateCabinet/send.svg";
import classNames from "classnames";

const TextArea = ({ addMessage }) => {
	const textAreaRef = useRef();
	const [cursorPosition, setCursorPosition] = useState(0);
	const [textAreaValue, setTextAreaValue] = useState("");
	const insertEmodji = useSelector((state) => state.Cabinet.chat.insertEmodji);
	const dispatch = useDispatch();

	const findCursorPosition = () => {
		setCursorPosition(textAreaRef.current.selectionStart);
	};

	const cleareTextArea = () => {
		setCursorPosition(0);
		setTimeout(() => {
			setTextAreaValue("");
			textAreaRef.current.style.height = "25px";
		});
	};

	const keyPress = (e) => {
		findCursorPosition();
		if (e.keyCode === 13 && !e.shiftKey) {
			addMessage(textAreaValue);
			cleareTextArea();
		}
	};

	const onTextAreaChange = (e) => {
		findCursorPosition();
		setTextAreaValue(e.target.value);
		e.target.style.height = "auto";
		e.target.style.height = e.target.value
			? e.target.scrollHeight + "px"
			: "25px";
	};

	useEffect(() => {
		if (insertEmodji) {
			setTextAreaValue(
				(text) =>
					text.slice(0, cursorPosition) +
					insertEmodji +
					text.slice(cursorPosition)
			);
			dispatch({ type: "INSERT_EMODJI", payload: "" });

			textAreaRef.current.focus();
			setTimeout(() => {
				textAreaRef.current.selectionStart = cursorPosition + 2;
				textAreaRef.current.selectionEnd = cursorPosition + 2;
			}, 0);

			setCursorPosition((position) => position + 2);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [insertEmodji]);

	return (
		<div className={styles.textMessage}>
			<textarea
				ref={textAreaRef}
				type="text"
				placeholder="Введите текст сообщения"
				className={styles.textInput}
				onClick={findCursorPosition}
				rows={1}
				onKeyDown={keyPress}
				onChange={onTextAreaChange}
				value={textAreaValue}
			/>
			<SendIcon
				className={classNames({
					[styles.messageImg]: true,
					[styles.active]: textAreaValue.length,
				})}
				onClick={() => {
					addMessage(textAreaValue);
					cleareTextArea();
				}}
			/>
		</div>
	);
};

export default TextArea;
