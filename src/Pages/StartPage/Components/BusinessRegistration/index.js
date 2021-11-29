import React, { useState } from "react";
import styles from "./BusinessRegistration.module.sass";
import AdminForm from "./AdminForm";
import MainForm from "./MainForm";
import SuccessCreated from "./SuccessCreated";
import PopUp from "../../../../generalComponents/PopUp";

const BusinessRegistration = ({setBusinessRegistration}) => {
	const [compare, setCompare] = useState({
		isLogin: false,
		isPass: false,
		isCoincidePass: false,
		isAgreed: false,
		isСompany: false,
	});
	const [mainFields, setMainFields] = useState({});
	const [step, setStep] = useState("main");

	return (
		<PopUp set={() => {}}>
			<div className={styles.wrapper}>
				<main className={styles.main}>
					{step === "main" && (
						<MainForm
							compare={compare}
							setCompare={setCompare}
							mainFields={mainFields}
							setMainFields={setMainFields}
							setStep={setStep}
						/>
					)}

					{step === "admin" && (
						<AdminForm
							compare={compare}
							setCompare={setCompare}
							mainFields={mainFields}
							setMainFields={setMainFields}
							setStep={setStep}
						/>
					)}

					{step === "complete" && (
						<SuccessCreated
							mainFields={mainFields}
							setMainFields={setMainFields}
							setStep={setStep}
							set={setBusinessRegistration}
						/>
					)}
				</main>
			</div>
		</PopUp>
	);
};

export default BusinessRegistration;
