import React, { useState } from "react";

import styles from "./AddEmployee.module.sass";
import SuccessPopup from "../../SuccessPopup";
import Input from "../../../MyProfile/Input";
import PopUp from "../../../../../../generalComponents/PopUp";
import { ReactComponent as Avatar } from "../../../../../../assets/BusinessCabinet/noPhoto.svg";
import { ReactComponent as SuccessImg } from "../../../../../../assets/BusinessCabinet/checked.svg";
import classNames from "classnames";
import Colors from "../../../../../../generalComponents/Elements/Colors";

const AddEmployee = ({ nullifyAction, setPageOption, addPerson }) => {
	const [success, setSuccess] = useState(false);
	const [name, setName] = useState("");
	const [position, setPosition] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [color, setColor] = useState({
		dark: "#E3E3E3",
		light: "#fff",
		color: "#fff",
		name: "white",
	});
	const PersonColorsVariables = [
		{ dark: "#E3E3E3", light: "#fff", color: "#fff", name: "white" },
		{
			dark: "#20C8D2",
			light: "#20C8D2",
			color: "rgba(32, 200, 210, 1)",
			name: "aqua",
		},
		{
			dark: "#39B31E",
			light: "#39B31E",
			color: "rgba(57, 179, 30, 1)",
			name: "green",
		},
		{
			dark: "#F4A862",
			light: "#F4A862",
			color: "rgba(244, 168, 98, 1)",
			name: "orange",
		},
		{
			dark: "#A30BEB",
			light: "#A30BEB",
			color: "rgba(163, 11, 235, 1)",
			name: "violet",
		},
	];

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
					<div className={classNames(styles.field, styles.contacts)}>
						<Colors
							color={color}
							setColor={setColor}
							customColors={PersonColorsVariables}
							editableClass={"flex_row"}
						/>
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
								onChange={(e) => setName(e.target.value)}
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
								onChange={(e) => setMiddleName(e.target.value)}
								isName={true}
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
								onChange={(e) => setPosition(e.target.value)}
							/>
						</div>
					</div>
					<div className={styles.row}>
						<div className={classNames(styles.field, styles.contacts)}>
							<label className={styles.label} htmlFor="phone">
								Телефон
							</label>
							<Input id="phone" name="phone" placeholder="+38" phone={true} />
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
					<button
						onClick={() => {
							setSuccess(true);
							addPerson({ name, middleName, position, color });
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
