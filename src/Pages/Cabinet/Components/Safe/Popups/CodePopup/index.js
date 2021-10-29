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
	onSuccessLoading,
	
}) => {
	const [password, setPassword] = useState("");
	const [code, setCode] = useState("");
	const [error, setError] = useState(false);
	const [recoverPass, setRecoverPass] = useState(false);
	const [errors, setErrors] = useState({});
	const uid = useSelector((state) => state.user.uid);
	const [sendCode, showSendCode] = useState(false);
	const [showPass, setShowPass] = useState("");
	const search = useSelector((state) => state.Cabinet.search);

	const dispatch = useDispatch();

	const onGetSafeAccess = (password, id_safe, code) => {
		if (password && !code) {
			setLoadingType("squarify");
			api
				.get(
					`/ajax/safe_get_access.php?uid=${uid}&pass=${password}&id_safe=${id_safe}`
				)
				.then((res) => {
					if (res.data.f_pass) showSendCode(true);
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
					onSuccessLoading,
					setError,
					setLoadingType,
					search,
					filesPage,
					set
				)
			);
		}
	};

	useEffect(() => {
		setErrors({ password: false, code: false });
	}, [password, code]);

	return (
		<>
			{!error && !recoverPass && (
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

							{!sendCode && (
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
										onClick={() => setRecoverPass(true)}
									>
										Забыли пароль?
									</span>
								</div>
							)}

							{sendCode && (
								<>
									<div className={styles.inputWrap}>
										<p className={styles.orItem}>
											на ваш контактный номер телефона отправлен код-пароль для
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
									onClick={() => onGetSafeAccess(password, safe.id, code)}
								>
									{sendCode ? "Войти" : "Далее"}
								</Button>
							</div>
						</div>
					</div>
				</PopUp>
			)}

			{recoverPass && (
				<RecoverPass
					refreshPass={refreshPass}
					setRefreshPass={setRefreshPass}
					safe={safe}
					set={setRecoverPass}
				/>
			)}
			{error && <ErrorPass setError={setError} mistake={error} set={set} />}
		</>
	);
};

export default CodePopup;
