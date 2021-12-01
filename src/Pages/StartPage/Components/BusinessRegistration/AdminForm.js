import React, { useEffect, useState } from "react";
import styles from "./BusinessRegistration.module.sass";
import {useSelector} from 'react-redux'
import Input from "../../../Cabinet/Components/MyProfile/Input";
import { useValidateForm } from "./validation";
import AdminSelect from "./AdminSelect";
import Loader from "../../../../generalComponents/Loaders/4HUB";
import arrowImg from "../../../../assets/BusinessCabinet/arrow.svg";
import { validateEmail } from "../../../Cabinet/Components/MyProfile/Input/validation";
import api from "../../../../api";

let requiredInputs = [
	"surname",
	"name",
	"middle_name",
	"phone",
	"email",
	"password",
	"password_r",
];

const AdminForm = ({
	mainFields,
	setMainFields,
	setStep,
	compare,
	setCompare,
}) => {

	const [checkPhone, setCheckPhone] = useState(true);
	const [checkEmail, setCheckEmail] = useState(true);
	const [confirmPass, setConfirmPass] = useState(true);
	const [showPass, setShowPass] = useState(false);
	const [disablePass, setDisablePass] = useState(false);
	const [loadingType, setLoadingType] = useState("");
	const id_company = useSelector(state => state.user.userInfo.id_company)

	const { fields, setFields, errors, onChange, checkErrors, blurs } =
		useValidateForm(
			{ admin: 1 },
			requiredInputs
		);

	useEffect(() => {
		if (mainFields?.admin) {
			setFields(mainFields?.admin);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	useEffect(() => {
		setDisablePass(!fields.admin);
		!fields.admin
			? (requiredInputs = requiredInputs.filter(item => !item.includes("password")))
			: requiredInputs.push("password", "password_r");
	}, [fields.admin]);

	const onSubmit = (event) => {
		event.preventDefault();
		if (
			checkErrors() &&
			(confirmPass || disablePass) &&
			checkEmail &&
			checkPhone
		) {
			setLoadingType("squarify")
			setMainFields((prev) => ({ ...prev, admin: fields }));
			const sentPass = () => disablePass ? '' : `&pass=${getValue("password")}`
			api.get(
				`/ajax/org_user_reg.php?id_company=${id_company}
				&col=${mainFields.main.emp_num}&type=${mainFields.main.activity_field}
				&name=${getValue("name")}&email=${getValue("email")}&tel=${getValue("phone")}
				&is_admin=1&sname=${getValue("surname")}&pname=${getValue("middle_name")}
				${sentPass()}`
			)
			.then((res) => {
				if (res.data.ok === 1) {
					setStep("complete");
				}
			})
			.catch((err) => {
					console.log(err);
			})
			.finally(() => setLoadingType(""))
		}
	};

	const backStep = () => {
		setMainFields({ ...mainFields, admin: fields });
		setStep("main");
	};

	const getValue = (name) => fields?.[name] || "";

	const isPhone = () =>
		(errors.includes("phone") || !checkPhone) && blurs.includes("phone");
	const isEmail = () =>
		(errors.includes("email") || !checkEmail) && blurs.includes("email");
	const isConfirmPass = () =>
		(errors.includes("password_r") || !confirmPass) && blurs.includes("email");

	return (
		<div className={styles.formWrap}>
			<h4 className={styles.formTitle}>Администратор</h4>

			<form noValidate onSubmit={onSubmit}>
				<div className={styles.formItem}>
					<label className={styles.label}>
						Передача прав Администратора
						{requiredInputs.includes("admin") && (
							<span className={styles.required}>*</span>
						)}
					</label>
					<AdminSelect
						initValue={getValue("admin")}
						error={errors?.includes("admin")}
						onSelect={(value) => onChange(value, "admin")}
						data={[
							{
								id: 1,
								text: "Назначить меня администратором Компании",
								info: `Вы сможете самостоятельно верифицировать компанию, добавлять и 
                                редактировать информацию, открывать и закрывать вакансии и добавлять 
                                кандидатов.`,
							},
							{
								id: 0,
								text: "Назначить другого человека администратором Компании",
								info: `Вы будете добавлены в Компанию как обычный сотрудник. Ваши 
                                полномочия и права доступа сможет определить указанный 
                                Администратор. Указанный Администратор получит на почту 
                                уведомление о назначении.`,
							},
						]}
						placeholder="Назначить меня администратором Компании"
					/>
				</div>

				<div className={styles.row}>
					<div className={styles.formItem}>
						<Input
							required={requiredInputs.includes("surname")}
							isMistake={errors.includes("surname")}
							className={styles.input}
							label="Фамилия"
							placeholder="Фамилия"
							name="surname"
							value={getValue("surname")}
							onChange={(e) => onChange(e.target.value, "surname")}
						/>
					</div>

					<div className={styles.formItem}>
						<Input
							required={requiredInputs.includes("name")}
							isMistake={errors.includes("name")}
							className={styles.input}
							label="Имя"
							placeholder="Имя"
							name="name"
							value={getValue("name")}
							onChange={(e) => onChange(e.target.value, "name")}
						/>
					</div>

					<div className={styles.formItem}>
						<Input
							required={requiredInputs.includes("middle_name")}
							isMistake={errors.includes("middle_name")}
							className={styles.input}
							label="Отчество"
							placeholder="Отчество"
							name="middle_name"
							value={getValue("middle_name")}
							onChange={(e) => onChange(e.target.value, "middle_name")}
						/>
					</div>
				</div>

				<div className={styles.formItem}>
					<Input
						phone={true}
						required={requiredInputs.includes("phone")}
						isMistake={isPhone()}
						className={styles.input}
						label="Телефон"
						placeholder={"Телефон"}
						name="phone"
						value={getValue("phone")}
						onChange={(e) => {
							const phone = e.target.value;
							setCheckPhone(phone?.length === 18);
							onChange(phone, "phone");
						}}
					/>
				</div>

				<div className={styles.formItem}>
					<Input
						required={requiredInputs.includes("email")}
						isMistake={isEmail()}
						className={styles.input}
						label="Email"
						placeholder="Email"
						name="email"
						value={getValue("email")}
						onChange={(e) => {
							const email = e.target.value;
							setCheckEmail(validateEmail(email));
							onChange(email, "email");
						}}
					/>
				</div>

				{!disablePass && (
					<>
						<div className={styles.formItem}>
							<Input
								required={requiredInputs.includes("password")}
								isMistake={errors.includes("password")}
								className={styles.input}
								label="Пароль"
								placeholder="Пароль"
								name="password"
								type="password"
								value={getValue("password")}
								onChange={(e) => onChange(e.target.value, "password")}
								showPass={showPass}
								setShowPass={setShowPass}
							/>
						</div>

						<div className={styles.formItem}>
							<Input
								required={requiredInputs.includes("password_r")}
								isMistake={isConfirmPass()}
								className={styles.input}
								label="Подтвердите пароль"
								placeholder="Подтвердите пароль"
								name="password_r"
								type="password"
								value={getValue("password_r")}
								onChange={(event) => {
									const value = event.target.value;
									setConfirmPass(value === getValue("password"));
									onChange(value, "password_r");
								}}
								showPass={showPass}
								setShowPass={setShowPass}
								showEye={false}
							/>
						</div>
					</>
				)}

				<div className={styles.agreementWrap}>
					<div className={styles.agreement}>
						<div
							onClick={() =>
								setCompare({ ...compare, isAgreed: !compare.isAgreed })
							}
						>
							{compare.isAgreed && (
								<img src="./assets/StartPage/tick.svg" alt="tick" />
							)}
						</div>
					</div>
					<div className={styles.agreementsText}>
						Я принимаю<span> Условия использования </span> 4Hub
						<span> Политику конфиденциальности</span> и
						<span> Политику интелектуальной собственности</span>
					</div>
				</div>

				<div className={styles.actionBlock}>
					<button type="button" onClick={backStep} className={styles.roundBtn}>
						<img src={arrowImg} alt="Arrow" />
					</button>
					<button
						disabled={!compare.isAgreed}
						type="submit"
						className={styles.submitBtn}
					>
						Сохранить и продолжить
					</button>
				</div>
			</form>
			{loadingType ? (
				<Loader
					position="absolute"
					zIndex={10000}
					containerType="bounceDots"
					type="bounceDots"
					background="white"
					animation={false}
				/>
			) : null}
		</div>
	);
};

export default AdminForm;
