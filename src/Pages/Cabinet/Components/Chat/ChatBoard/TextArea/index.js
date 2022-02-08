import React, { useState } from "react";
import styles from "./TextArea.module.sass";
import { ReactComponent as SendIcon } from "../../../../../../assets/PrivateCabinet/send.svg";
import classNames from "classnames";

const TextArea = ({ inputRef, setCursorPosition, addMessage }) => {
	const [textAreaValue, setTextAreaValue] = useState("");
	//TODO - Need to change after chat is developed
	const findCursorPosition = () =>
		setCursorPosition(inputRef.current.selectionStart);

	const cleareTextArea = () => {
		setTimeout(() => {
			setTextAreaValue("");
			inputRef.current.style.height = "25px";
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
		setTextAreaValue(e.target.value);
		e.target.style.height = "auto";
		e.target.style.height = e.target.value
			? e.target.scrollHeight + "px"
			: "25px";
	};

	return (
		<div className={styles.textMessage}>
			<textarea
				ref={inputRef}
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
