import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DeleteMessage.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import classNames from "classnames";
import api from "../../../../../../api";
import {
	onSetModals,
	onDeleteChatMessage,
} from "../../../../../../Store/actions/CabinetActions";
import {useLocales} from "react-localized";

const DeleteMessage = ({ set, message, nullifyAction }) => {
	const { __ } = useLocales();
	const uid = useSelector((state) => state.user.uid);
	const text = message?.text?.split("\n").slice(0, 5) ?? [];
	const dispatch = useDispatch();

	const onAproveBtnHandler = () => {
		nullifyAction();
		api
			.get(
				`/ajax/chat${
					message.id_group ? "_group" : ""
				}_message_del.php?uid=${uid}&id_message=${message.id}${
					message.id_group ? `&id_group=${message.id_group}` : ""
				}`
			)
			.then((res) => {
				if (res.data.ok) {
					dispatch(onDeleteChatMessage(message));
					dispatch(
						onSetModals("topMessage", {
							open: true,
							type: "message",
							message: __("Сообщение удалено"),
						})
					);
				} else {
					dispatch(
						onSetModals("error", {
							open: true,
							message: __("Что-то пошло не так, повторите попытку позже"),
						})
					);
				}
			});
	};

	return (
		<PopUp set={set}>
			<div className={styles.wrap}>
				<div className={styles.cross} onClick={set} />
				<span className={styles.title}>Удалить сообщение</span>
				<div className={styles.subTitle}>
					{ __('Вы действительно хотите удалить сообщение?') }
				</div>
				{message.text?.length ? (
					<div className={styles.textWrap}>
						{text.map((item, index) => (
							<p key={index} className={styles.text}>
								{index === 4 && message.text.length > 5 ? `${item}...` : item}
							</p>
						))}
					</div>
				) : (
					""
				)}
				<div className={styles.buttonsWrap}>
					<div
						className={classNames(styles.cancel, styles.button)}
						onClick={set}
					>
						{ __('Отмена') }
					</div>
					<div
						className={classNames(styles.action, styles.button)}
						// onClick={() => onAproveBtnHandler()}
					>
						{ __('Удалить у меня') }
					</div>
					<div
						className={classNames(styles.action, styles.button)}
						onClick={() => onAproveBtnHandler()}
					>
						{ __('Удалить у всех') }
					</div>
				</div>
			</div>
		</PopUp>
	);
};

export default DeleteMessage;
