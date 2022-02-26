import React from "react";
import { useSelector } from "react-redux";
import styles from "./DeleteMessage.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import classNames from "classnames";
import api from "../../../../../../api";

const DeleteMessage = ({ set, message }) => {
    const uid = useSelector((state) => state.user.uid);
	const text = message?.text?.split("\n").slice(0,5)??[];
	const onAproveBtnHandler = () => {
		api.get(`/ajax/chat_message_del.php?uid=${uid}&id_message=${message.id}`)
			.then((res) => {
				if (res.data.ok) {
					console.log(res)
				} else {
                    console.log('err')
                }
			})
    };
    
	return (
		<PopUp set={set}>
			<div className={styles.wrap}>
				<div className={styles.cross} onClick={set} />
				<span className={styles.title}>Удалить сообщение</span>
				<div className={styles.subTitle}>
					Вы действительно хотите удалить сообщение?
				</div>
				{message.text?.length ? <div className={styles.textWrap}>
					{text.map((item, index) => (
						<p key={index} className={styles.text}>
							{index === 4 && message.text.length > 5 ? `${item}...` : item}
						</p>
					))}
				</div> : ''}
				<div className={styles.buttonsWrap}>
					<div
						className={classNames(styles.cancel, styles.button)}
						onClick={set}
					>
						Отмена
					</div>
					<div
						className={classNames(styles.action, styles.button)}
						// onClick={() => onAproveBtnHandler()}
					>
						Удалить у меня
					</div>
					<div
						className={classNames(styles.action, styles.button)}
						onClick={() => onAproveBtnHandler()}
					>
						Удалить у всех
					</div>
				</div>
			</div>
		</PopUp>
	);
};

export default DeleteMessage;
