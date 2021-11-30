import React, { useState } from "react";
import styles from "./SetPassword.module.sass";
import PopUp from "../../../../../../generalComponents/PopUp";
import InputField from "../../../../../../generalComponents/InputField";
import Error from "../../../../../../generalComponents/Error";
import FileInfo from "../../../../../../generalComponents/FileInfo/FileInfo";
import classNames from "classnames";
import {ReactComponent as Password} from "../../../../../../assets/PrivateCabinet/password.svg";
import Success from "../../../../../../generalComponents/Success";

function SetPassword({ file, setDisplaySetPassword, password, setPassword }) {
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const [passwordCoincide, setPasswordCoincide] = useState(false);
	const [showRepeat, setShowRepeat] = useState(true);
	const [visibility, setVisibility] = useState("password");
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const onSwitch = (boolean) => setShowRepeat(boolean);
	const comparePass = (val) => {
		const pass = password.split("");
		const passRepeat = val.split("");
		let boolean = true;
		passRepeat.forEach((el, i) => {
			if (el !== pass[i]) boolean = false;
		});
		setPasswordCoincide(boolean);
	};

	const onAddPass = () => {
		if (password !== passwordRepeat) return setPasswordCoincide(false);
		if (password) {
			setPassword(password)
			setSuccess(true);
		}
	};

	const closeComponent = () => {
		setDisplaySetPassword(false);
		setError(false);
	};

	return (
		<div style={{ display: `block` }}>
			{!error && !success ? <PopUp set={setDisplaySetPassword}>
				<div className={styles.wrap}>
					<div className={styles.header}>
						<FileInfo file={file}/>
					</div>
					<div className={styles.border}/>
					<div className={classNames(styles.row_item, styles.border_bottom)}>
						<div className={styles.ico_wrap}>
							<Password className={styles.row_ico} />
						</div>
						<div className={styles.input_wrap}>
							<p className={styles.input_title}>Пароль</p>
							<input id={'input_pass'} value='Вы можете установить пароль на данный файл' type='button' />
						</div>
					</div>
					<div className={styles.border}/>
					<div className={styles.inputFieldsWrap}>
						<div className={styles.inputWrapInfo}>
							<span>Придумайте пароль для файла</span>
							<InputField
								model="password"
								isPass={true}
								switcher={false}
								height={"35px"}
								value={password}
								set={setPassword}
								placeholder="Пароль"
								onSwitch={onSwitch}
								visibility={visibility}
								setVisibility={setVisibility}
								disabled={!showRepeat}
							/>
						</div>
						<div className={styles.inputWrapInfo}>
							<span>Повторите пароль</span>
							{showRepeat && (
								<InputField
									model="password"
									switcher={false}
									height={"35px"}
									value={passwordRepeat}
									set={setPasswordRepeat}
									placeholder="Повторите пароль"
									visibility={visibility}
									setVisibility={setVisibility}
									comparePass={comparePass}
									mistake={!passwordCoincide}
								/>
							)}
						</div>
					</div>
					<div className={styles.buttonsWrap}>
						<div
							className={styles.cancel}
							onClick={() => setDisplaySetPassword(false)}
						>
							Отмена
						</div>
						<div
							className={`${file ? styles.add : styles.buttonDisabled}`}
							onClick={() => {
								if (file) onAddPass();
							}}
						>
							Установить
						</div>
					</div>
				</div>
			</PopUp> : null}
			{error && (
				<Error
					error={error}
					set={closeComponent}
					message="Пароль не добавлен"
				/>
			)}
			{success && (<Success
					set={closeComponent}
					message='Пароль на файл успешно установлен при передаче файла, на email получателя прийдет указанный Вами пароль'
					title='Пароль успешно установлен'
					success={success}
			/>)}
		</div>
	);
}

export default SetPassword;
