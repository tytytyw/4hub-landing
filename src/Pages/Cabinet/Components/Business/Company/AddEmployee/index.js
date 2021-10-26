import React, { useState } from "react";

import styles from "./AddEmployee.module.sass";
import successImg from "../../../../../../assets/BusinessCabinet/WelcomePage/mail-desktop.svg";
import SuccessPopup from "../../SuccessPopup";
import Input from "../../../MyProfile/Input";
import PopUp from "../../../../../../generalComponents/PopUp";
import {ReactComponent as Avatar} from '../../../../../../assets/BusinessCabinet/noPhoto.svg';
import classNames from "classnames";

const AddEmployee = ({ nullifyAction, setPageOption, addPerson }) => {
	const [success, setSuccess] = useState(false);
    const [name, setName] = useState('')
    const [position, setPosition] = useState('')
    const [middleName, setMiddleName] = useState('')

	return (
		<PopUp set={nullifyAction}>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<p>Добавить сотрудника</p>
				</div>

				<div className={styles.uploadBlock}>
                    <Avatar className={styles.avatar} />
					<label className={styles.uploadLabel} htmlFor="upload_avatar">
                    <span>Загрузить</span> аватар
						<input type="file" id="upload_avatar" />
					</label>
				</div>

				<div className={styles.formWrap}>
					<div className={styles.row}>
						<div className={styles.field}>
							<label className={styles.label} htmlFor="family">
								Фамилия
							</label>
							<Input id="family" name="email" placeholder="Введите фамилию" />
						</div>
						<div className={styles.field}>
							<label className={styles.label} htmlFor="name">
								Имя
							</label>
							<Input id="name" name="name" placeholder="Введите имя" onChange={e => setName(e.target.value)} />
						</div>
						<div className={styles.field}>
							<label className={styles.label} htmlFor="middle_name">
								Отчество
							</label>
							<Input
								id="surname"
								name="middle_name"
								placeholder="Введите отчество"
                                onChange={e => setMiddleName(e.target.value)}
							/>
						</div>
					</div>
					<div className={styles.row}>
						<div className={classNames(styles.field, styles.position)}>
							<label className={styles.label} htmlFor="position">
								Должность
							</label>
							<Input
								id="position"
								name="position"
								placeholder="Введите должность"
                                onChange={e => setPosition(e.target.value)}
							/>
						</div>
					</div>
					<div className={styles.row}>
						<div className={classNames(styles.field, styles.contacts)}>
							<label className={styles.label} htmlFor="phone">
								Телефон
							</label>
							<Input id="phone" name="phone" placeholder="+38" />
						</div>
						<div className={classNames(styles.field, styles.contacts)}>
							<label className={styles.label} htmlFor="phone2">
								Телефон (2)
							</label>
							<Input
								id="phone2"
								name="phone2"
								placeholder="Дополнительный телефон"
							/>
						</div>
					</div>

					<div className={styles.row}>
						<div className={classNames(styles.field, styles.contacts)}>
							<label className={styles.label} htmlFor="phone">
								Email
							</label>
							<Input id="email" name="email" placeholder="Введите email" />
						</div>
						<div className={classNames(styles.field, styles.contacts)}>
							<label className={styles.label} htmlFor="phone2">
								Email (2)
							</label>
							<Input
								id="email2"
								name="email2"
								placeholder="Введите запасной email"
							/>
						</div>
					</div>
				</div>

				<div className={styles.actionBlock}>
					<button
						onClick={() => setPageOption("welcome")}
						className={styles.cancelBtn}
					>
						Отмена
					</button>
					<button onClick={() => {setSuccess(true); addPerson({name, middleName, position})}}>Добавить</button>
				</div>
			</div>

			{success && (
				<SuccessPopup title="Сотрудник успешно добавлен" set={nullifyAction}>
					<img src={successImg} alt="Success" />
				</SuccessPopup>
			)}
		</PopUp>
	);
};

export default AddEmployee;
