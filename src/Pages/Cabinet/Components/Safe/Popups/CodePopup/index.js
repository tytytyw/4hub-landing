import React, { useState, useEffect } from "react";
import PopUp from "../../../../../../generalComponents/PopUp";

import styles from "./CodePopup.module.sass";
import Input from "../../../MyProfile/Input";
import Button from "../../../MyProfile/Button";
import SafeIcon from "../../SafeIcon";
import ErrorPass from "../ErrorPass";
import RecoverPass from "../RecoverPass";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../../../../api";
import { onGetSafeFileList } from "../../../../../../Store/actions/CabinetActions";

const CodePopup = ({
	safe,
	set,
	refreshPass,
	setRefreshPass,
	setLoadingType,
	filesPage,
	successLoad
	
}) => {
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const [error, setError] = useState(false);
	const [recoverPass, setRecoverPass] = useState({show: false, active: false});
	const [errors, setErrors] = useState({});
	const uid = useSelector((state) => state.user.uid);
	const [showSendCode, setShowSendCode] = useState(false);
	const [showPass, setShowPass] = useState("");
	const search = useSelector((state) => state.Cabinet.search);
	const codeSentTo = useSelector((state) => state.Cabinet.safeCodeToTel);

	const dispatch = useDispatch();

	const onGetSafeAccess = (password, id_safe, code) => {
		if (password && !code) {
			setLoadingType("squarify");
			api
				.get(
					`/ajax/safe_get_access.php?uid=${uid}&pass=${password}&id_safe=${id_safe}`
				)
				.then((res) => {
					if (res.data.f_pass) setShowSendCode(true);
					else setError("password");
				})
				.catch((error) => console.log(error))
				.finally(() => setLoadingType(""));
		} else setErrors({ password: !password, code: !code });

		if (code) {
			setLoadingType("squarify");
			dispatch(
				onGetSafeFileList(
					code,
					id_safe,
					password,
					successLoad,
					setError,
					setLoadingType,
					search,
					filesPage,
					set
				)
			);
		}
	};

	const recoverStage2 = () => {
		// setLoadingType("squarify");
		api
			.get(
				`/ajax/safe_pass_restore2.php?uid=${uid}&id_safe=${safe.id}&code=${code}`
			)
			.then((res) => {

				if (res.data.ok) {
					// setShowSendCode(true)
					// set({show: false, active: true})
				} else {
					setError(true)
				}
			})
			.catch((error) => console.log(error))
		}
	const onSubmit = () => {
		if (!recoverPass.active) onGetSafeAccess(password, safe.id, code)
		else {recoverStage2()}
	}

	useEffect(() => {
		setErrors({ password: false, code: false });
	}, [password, code]);

	return (
		<>
			{!error && !recoverPass.show && (
				<PopUp set={set}>
					<div className={styles.wrapper}>
						<div className={styles.top}>
							<div className={styles.closeWrap}>
								<div className={styles.close} onClick={() => set(false)}>
									<span className={styles.times} />
								</div>
							</div>
						</div>

						<div className={styles.content}>
							<div className={styles.titleWrap}>
								<SafeIcon type={safe?.id_color} className={styles.titleImg} />
								<h4 className={styles.title}>{safe?.name}</h4>
							</div>

							{!showSendCode && (
								<div className={styles.inputWrap}>
									<input
										type="text"
										style={{ opacity: "0", width: 0, height: 0 }}
									/>
									<Input
										placeholder="Введите пароль"
										className={styles.input}
										isMistake={errors?.password}
										value={password}
										onChange={(event) => setPassword(event.target.value)}
										type="password"
										showPass={showPass}
										setShowPass={setShowPass}
									/>
									<span
										className={styles.link}
										onClick={() => setRecoverPass({show: true, active: true})}
									>
										Забыли пароль?
									</span>
								</div>
							)}

							{showSendCode && (
								<>
									<div className={styles.inputWrap}>
										<p className={styles.orItem}>
											на номер {codeSentTo} отправлен код-пароль для
											доступа к сейфу
										</p>
										<Input
											placeholder="Введите код"
											label={false}
											name="code"
											className={styles.input}
											isMistake={errors?.code}
											onChange={(event) => setCode(event.target.value)}
										/>
										<span className={styles.link}>Не пришол код?</span>
									</div>
								</>
							)}

							<div className={styles.actionBlock}>
								<Button
									type="submit"
									className={styles.actionBtn}
									onClick={onSubmit}
								>
									{showSendCode ? "Войти" : "Далее"}
								</Button>
							</div>
						</div>
					</div>
				</PopUp>
			)}

			{recoverPass.show && (
				<RecoverPass
					refreshPass={refreshPass}
					setRefreshPass={setRefreshPass}
					safe={safe}
					set={setRecoverPass}
					setShowSendCode={setShowSendCode}
					setError={setError}
				/>
			)}
			{error && <ErrorPass setError={setError} mistake={error} set={set} />}
		</>
	);
};

export default CodePopup;
