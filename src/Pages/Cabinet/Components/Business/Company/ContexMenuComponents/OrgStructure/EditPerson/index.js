import React, { useState } from "react";

import styles from "./EditPerson.module.sass";
import Input from "../../../../../MyProfile/Input";
import PopUp from "../../../../../../../../generalComponents/PopUp";
import { ReactComponent as Avatar } from "../../../../../../../../assets/BusinessCabinet/noPhoto.svg";
import classNames from "classnames";
import Select from "../../../AddEmployee/Select/Select";
import {usePersonStatus} from "../../../../../../../../generalComponents/collections";

const EditPerson = ({ person, nullifyAction, editPerson, disableСhanges }) => {
	const personStatus = usePersonStatus();
	const [name, setName] = useState(person.data.info.name);
	const [surname, setSurname] = useState(person.data.info.surname);
	const [middleName, setMiddleName] = useState(person.data.info.middleName);
	const [position, setPosition] = useState(person.data.info.position);
	const [status, setStatus] = useState(person.data.info.status);
	const [phone, setPhone] = useState(person.data.info.phone);
	const [phone2, setPhone2] = useState(person.data.info.phone2);
	const [email, setEmail] = useState(person.data.info.email);
	const [email2, setEmail2] = useState(person.data.info.email2);

	return (
		<PopUp set={nullifyAction}>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<p>{!disableСhanges ? "Редактировать сотрудника" : "Информация о сотруднике"}</p>
				</div>

				<div className={styles.uploadBlock}>
					<div className={styles.avatarWrapper}>
						<Avatar className={styles.avatar} />
						{!disableСhanges && <label className={styles.uploadLabel} htmlFor="upload_avatar">
							<span>Загрузить</span> аватар
							<input type="file" id="upload_avatar" />
						</label>}
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
								placeholder={!disableСhanges ? "Введите фамилию" : "не указана"}
								isName={true}
								value={surname}
								disabled={disableСhanges}
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
								placeholder={!disableСhanges ? "Введите имя" : "не указано"}
								value={name}
								disabled={disableСhanges}
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
								id="middle_name"
								name="middle_name"
								placeholder={!disableСhanges ? "Введите отчество" : "не указано"}
								value={middleName}
								disabled={disableСhanges}
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
								disableСhanges={disableСhanges}
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
								disableСhanges={disableСhanges}
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
								placeholder={!disableСhanges ? "+38" : "телефон не указан"}
								phone={true}
								value={phone}
								disabled={disableСhanges}
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
								placeholder={!disableСhanges ? "Дополнительный телефон" : "телефон не указан"}
								phone={true}
								value={phone2}
								disabled={disableСhanges}
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
								placeholder={!disableСhanges ? "Введите email" : "email не указан"}
								value={email}
								disabled={disableСhanges}
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
								placeholder={!disableСhanges ? "Введите запасной email" : "запасной email не указан"}
								value={email2}
								disabled={disableСhanges}
								onChange={(e) => setEmail2(e.target.value)}
							/>
						</div>
					</div>
				</div>

				<div className={styles.actionBlock}>
					{!disableСhanges && <button onClick={() => nullifyAction()} className={styles.cancelBtn}>
						Отмена
					</button>}
					<button
						onClick={() => {
							!disableСhanges ?
							editPerson({
								person,
								newInfo: {
									name,
									middleName,
									surname,
									position,
									status,
									phone,
									phone2,
									email,
									email2,
								},
							}) : nullifyAction()
						}}
					>
						{disableСhanges ? "Готово" : "Сохранить"}
					</button>
				</div>
			</div>
		</PopUp>
	);
};

export default EditPerson;
