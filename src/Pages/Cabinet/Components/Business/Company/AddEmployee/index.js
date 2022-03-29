import React, { useState } from "react";

import styles from "./AddEmployee.module.sass";
import SuccessPopup from "../../SuccessPopup";
import Input from "../../../MyProfile/Input";
import PopUp from "../../../../../../generalComponents/PopUp";
import { ReactComponent as Avatar } from "../../../../../../assets/BusinessCabinet/noPhoto.svg";
import { ReactComponent as SuccessImg } from "../../../../../../assets/BusinessCabinet/checked.svg";
import classNames from "classnames";
import Select from "./Select/Select";
import {usePersonStatus} from "../../../../../../generalComponents/collections";

const AddEmployee = ({ nullifyAction, setPageOption, addPerson }) => {
	const personStatus = usePersonStatus();
	const [success, setSuccess] = useState(false);

	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [position, setPosition] = useState("");
	const [status, setStatus] = useState(personStatus[0]);
	const [phone, setPhone] = useState("");
	const [phone2, setPhone2] = useState("");
	const [email, setEmail] = useState("");
	const [email2, setEmail2] = useState("");

	return (
		<PopUp set={nullifyAction}>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<p>Добавить сотрудника</p>
				</div>

				<div className={styles.uploadBlock}>
					<div className={styles.avatarWrapper}>
						<Avatar className={styles.avatar} />
						<label className={styles.uploadLabel} htmlFor="upload_avatar">
							<span>Загрузить</span> аватар
							<input type="file" id="upload_avatar" />
						</label>
					</div>
				</div>

				<div className={styles.formWrap}>
					<div className={styles.row}>
						<div className={styles.field}>
							<label className={styles.label} htmlFor="family">
								Фамилия
							</label>
							<Input
								id="family"
								name="email"
								placeholder="Введите фамилию"
								isName={true}
								onChange={(e) =>
									setSurname(
										e.target.value
											? e.target.value[0].toUpperCase() +
													e.target.value.slice(1)
											: ""
									)
								}
							/>
						</div>
						<div className={styles.field}>
							<label className={styles.label} htmlFor="name">
								Имя
							</label>
							<Input
								id="name"
								name="name"
								placeholder="Введите имя"
								onChange={(e) =>
									setName(
										e.target.value
											? e.target.value[0].toUpperCase() +
													e.target.value.slice(1)
											: ""
									)
								}
								isName={true}
							/>
						</div>
						<div className={styles.field}>
							<label className={styles.label} htmlFor="middle_name">
								Отчество
							</label>
							<Input
								id="surname"
								name="middle_name"
								placeholder="Введите отчество"
								onChange={(e) =>
									setMiddleName(
										e.target.value
											? e.target.value[0].toUpperCase() +
													e.target.value.slice(1)
											: ""
									)
								}
								isName={true}
							/>
						</div>
					</div>
					<div className={styles.row}>
						<div className={classNames(styles.field, styles.position)}>
							<label className={styles.label} htmlFor="position">
								Должность
							</label>

							<Select
								selectFor={"position"}
								value={position}
								setValue={setPosition}
							/>
						</div>
					</div>
					<div className={styles.row}>
						<div className={classNames(styles.field, styles.status)}>
							<label className={styles.label} htmlFor="status">
								Статус
							</label>
							<Select
								selectFor={"status"}
								value={status.text}
								setValue={setStatus}
								options={personStatus}
							/>
						</div>
					</div>
					<div className={styles.row}>
						<div className={classNames(styles.field, styles.contacts)}>
							<label className={styles.label} htmlFor="phone">
								Телефон
							</label>
							<Input
								id="phone"
								name="phone"
								placeholder="+38"
								phone={true}
								onChange={(e) => setPhone(e.target.value)}
							/>
						</div>
						<div className={classNames(styles.field, styles.contacts)}>
							<label className={styles.label} htmlFor="phone2">
								Телефон (2)
							</label>
							<Input
								id="phone2"
								name="phone2"
								placeholder="Дополнительный телефон"
								phone={true}
								onChange={(e) => setPhone2(e.target.value)}
							/>
						</div>
					</div>

					<div className={styles.row}>
						<div className={classNames(styles.field, styles.contacts)}>
							<label className={styles.label} htmlFor="email">
								Email
							</label>
							<Input
								id="email"
								name="email"
								placeholder="Введите email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className={classNames(styles.field, styles.contacts)}>
							<label className={styles.label} htmlFor="email2">
								Email (2)
							</label>
							<Input
								id="email2"
								name="email2"
								placeholder="Введите запасной email"
								onChange={(e) => setEmail2(e.target.value)}
							/>
						</div>
					</div>
				</div>

				<div className={styles.actionBlock}>
					<button onClick={() => nullifyAction()} className={styles.cancelBtn}>
						Отмена
					</button>
					<button
						onClick={() => {
							setSuccess(true);
							addPerson({
								name,
								middleName,
								surname,
								position,
								status,
								phone,
								phone2,
								email,
								email2,
							});
						}}
					>
						Добавить
					</button>
				</div>
			</div>

			{success && (
				<SuccessPopup
					title="Сотрудник успешно добавлен"
					text="Вы успешно добавили сотрудника, теперь он отобразиться в обшей структуре компании"
					set={nullifyAction}
				>
					<SuccessImg width={40} height={40} />
				</SuccessPopup>
			)}
		</PopUp>
	);
};

export default AddEmployee;
