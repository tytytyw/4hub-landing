import React, { useState } from "react";
import styles from "./SetPassword.module.sass";
import api from "../../../../../../api";
import PopUp from "../../../../../../generalComponents/PopUp";
import InputField from "../../../../../../generalComponents/InputField";
import Error from "../../../../../../generalComponents/Error";
import { useSelector } from "react-redux";
import {useLocales} from "react-localized";

function SetPassword({ folder, setDisplaySetPassword, setShowSuccessMessage }) {
	const { __ } = useLocales();
	const uid = useSelector((state) => state.user.uid);
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const [passwordCoincide, setPasswordCoincide] = useState(false);
	const [showRepeat, setShowRepeat] = useState(true);
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

	const onAddPass = () => {
		if (password !== passwordRepeat) return setPasswordCoincide(false);

		const data = {
			uid,
			fids: [folder?.info?.fid],
			pass: password === passwordRepeat ? `${password}` : "",
		};

		if (password) {
			api
				.post('', data/*"/ajax/file_edit.php", data*/)
				.then((res) => {
					setShowSuccessMessage(__('пароль установлен'));
					closeComponent();
				})
				.catch((err) => {
					setError(true);
				});
		}
	};

	const closeComponent = () => {
		setDisplaySetPassword(false);
		setError(false);
	};
console.log(folder)
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
							placeholder={ __("Пароль") }
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
								placeholder={ __("Повторите пароль") }
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
							{ __('Отмена') }
						</div>
						<div
							className={styles.add}
							onClick={() => {
								onAddPass();
							}}
						>
							{ __('Установить') }
						</div>
					</div>
				</div>
			</PopUp>
			{error && (
				<Error
					error={error}
					set={closeComponent}
					message={ __("Пароль не добавлен") }
				/>
			)}
		</div>
	);
}

export default SetPassword;
