import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PopUp from "../../../../../../generalComponents/PopUp";
import styles from "./RecoverPass.module.sass";
import Button from "../../../MyProfile/Button";
import RefreshPass from "../RefreshPass";
import Select from "../../../../../../generalComponents/Select/Select";
import api from "../../../../../../api";

const RecoverPass = ({ set, safe, refreshPass, setRefreshPass, setShowSendCode, setLoadingType }) => {
    const uid = useSelector((state) => state.user.uid);
    const userInfo = useSelector((state) => state.user.userInfo);
    const [selectData, setSelectData] = useState([])
    const [sentCodeto, setSentCodeto] = useState(selectData[0]?.id);
    useEffect(() => {
        if (userInfo?.email) setSelectData(data => [...data, {text: 'Email', id:'email'}])
        if (userInfo?.tel) setSelectData(data => [...data, {text: 'Телефон', id:'tel'}])
    }, [userInfo])
	useEffect(() => {
		setSentCodeto(selectData[0]?.id)
    }, [selectData])

    const recoverStage1 = () => {
			setLoadingType("squarify");
			api
				.get(
					`/ajax/safe_pass_restore1.php?uid=${uid}&id_safe=${safe.id}&send_to=${sentCodeto}`
				)
				.then((res) => {

                    if (res.data.ok) {
                        setShowSendCode(true)
                        set({show: false, active: true})
                    }
				})
				.catch((error) => console.log(error))
                .finally(() => setLoadingType(''))
    }
	return (
		<>
			{!refreshPass && (
				<PopUp set={() => set({show: false, active: false})}>
					<div className={styles.wrapper}>
						<div className={styles.top}>
							<div className={styles.closeWrap}>
								<div className={styles.close} onClick={() => set({show: false, active: false})}>
									<span className={styles.times} />
								</div>
							</div>
						</div>

						<div className={styles.content}>
							<div className={styles.titleWrap}>
								<h4 className={styles.title}>Восстановление пароля</h4>
							</div>

							<div className={styles.textWrap}>
								<p className={styles.text}>
									Введите Email / Телефон указанный при регистрации, Вам будет
									направлен код для восстановления пароля
								</p>
							</div>

							<div className={styles.formItem}>
								<label htmlFor={styles.inputWrap} className={styles.label}>
                                    Выберите способ восстановления
								</label>

								<div className={styles.inputWrap}>
                                    <Select
                                        setSelectData={setSelectData}
                                        data={selectData}
                                        initValue={sentCodeto}
                                        onChange={value => setSentCodeto(value)}
                                        placeholder={selectData[0]?.text}
                                    />
								</div>
							</div>

							<div className={styles.actionBlock}>
								<Button
									type="submit"
									className={styles.submitBtn}
                                    onClick={recoverStage1}
								>
									Отправить
								</Button>
							</div>
						</div>
					</div>
				</PopUp>
			)}

			{refreshPass && <RefreshPass safe={safe} set={setRefreshPass} />}
		</>
	);
};

export default RecoverPass;
