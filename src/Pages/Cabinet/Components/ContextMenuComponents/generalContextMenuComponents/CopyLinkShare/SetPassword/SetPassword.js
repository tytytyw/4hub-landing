import React, { useState } from "react";
import styles from "./SetPassword.module.sass";
import PopUp from "../../../../../../../generalComponents/PopUp";
import InputField from "../../../../../../../generalComponents/InputField";
import Error from "../../../../../../../generalComponents/Error";

function SetPassword({ setDisplaySetPassword }) {
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const [passwordCoincide, setPasswordCoincide] = useState(false);
	const [showRepeat, setShowRepeat] = useState(false);
	const [visibility, setVisibility] = useState("password");
	const [error, setError] = useState(false);
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
	const width = window.innerWidth;

	const closeComponent = () => {
		setDisplaySetPassword(false);
		setError(false);
	};

	return (
		<div style={{ display: `block` }}>
			<PopUp set={setDisplaySetPassword}>
				<div className={styles.wrap}>
					<span
						className={styles.cross}
						onClick={() => setDisplaySetPassword(false)}
					/>
					<span className={styles.title}>Установить пароль</span>
					<div className={styles.inputFieldsWrap}>
						<InputField
							model="password"
							switcher={false}
							height={width >= 1440 ? "40px" : "30px"}
							value={password}
							set={setPassword}
							placeholder="Пароль"
							onSwitch={onSwitch}
							visibility={visibility}
							setVisibility={setVisibility}
							disabled={!showRepeat}
						/>
						{showRepeat && (
							<InputField
								model="password"
								switcher={false}
								height={width >= 1440 ? "40px" : "30px"}
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
					<div className={styles.buttonsWrap}>
						<div
							className={styles.cancel}
							onClick={() => setDisplaySetPassword(false)}
						>
							Отмена
						</div>
						<div
							className={`${true ? styles.add : styles.buttonDisabled}`}
						>
							Установить
						</div>
					</div>
				</div>
			</PopUp>
			{error && (
				<Error
					error={error}
					set={closeComponent}
					message="Пароль не добавлен"
				/>
			)}
		</div>
	);
}

export default SetPassword;
