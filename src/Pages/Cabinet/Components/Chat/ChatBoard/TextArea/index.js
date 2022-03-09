import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../../../../api";
import styles from "./TextArea.module.sass";
import { ReactComponent as SendIcon } from "../../../../../../assets/PrivateCabinet/send.svg";
import classNames from "classnames";
import {
	onSetModals,
	onEditChatMessage,
} from "../../../../../../Store/actions/CabinetActions";

const TextArea = ({ addMessage, action, nullifyAction, scrollToBottom }) => {
	const textAreaRef = useRef();
	const [cursorPosition, setCursorPosition] = useState(0);
	const [textAreaValue, setTextAreaValue] = useState("");
	const [editingMessage, setEditingMessage] = useState(false);
	const insertEmodji = useSelector((state) => state.Cabinet.chat.insertEmodji);
	const dispatch = useDispatch();
	const uid = useSelector((state) => state.user.uid);

	const findCursorPosition = () => {
		setCursorPosition(textAreaRef.current.selectionStart);
	};

	const editMessage = (message, text) => {
		// TODO: add attachment handler
		if (text && text !== action.message.text) {
			//message text is edited
			const isGroup = () =>
				action.message.id_group ? `&id_group=${action.message.id_group}` : "";
			const formData = new FormData();
			formData.append("text", text);
			api
				.post(
					`/ajax/chat${
						isGroup() ? "_group" : ""
					}_message_edit.php?uid=${uid}&id_message=${message.id}${isGroup()}`,
					formData
				)
				.then((res) => {
					if (res.data.ok) {
						// TODO: add attachment handler
						dispatch(onEditChatMessage({ ...message, text: text }));
					} else throw new Error();
				})
				.catch(() =>
					dispatch(
						onSetModals("error", {
							open: true,
							message: "Что-то пошло не так, повторите попытку позже",
						})
					)
				);
		}
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
			sendHandler();
		}
	};

	const onTextAreaChange = (e) => {
		findCursorPosition();
		setTextAreaValue(e.target.value);
	};

	const onAddMessage = () => {
		addMessage(textAreaValue)
		scrollToBottom()
	}

	const sendHandler = () => {
		// TODO: add edit message socket action
		editingMessage
			? editMessage(action.message, textAreaValue)
			: onAddMessage();
		cleareTextArea();
		nullifyAction();
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

	useEffect(() => {
		if (action?.type === "editMessage") {
			const saveTextValue = textAreaValue;
			setTextAreaValue(action?.message.text);
			setEditingMessage(true);
			return () => {
				setTextAreaValue(saveTextValue);
				setEditingMessage(false);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [action]);

	useEffect(() => {
		const textarea = textAreaRef.current;
		textarea.style.height = "auto";
		textarea.style.height = textAreaValue
			? textarea.scrollHeight + "px"
			: "25px";
	}, [textAreaValue]);

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
				onClick={sendHandler}
			/>
		</div>
	);
};

export default TextArea;
