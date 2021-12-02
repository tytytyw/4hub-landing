import React, { useState } from "react";
import styles from "./BusinessRegistration.module.sass";
import AdminForm from "./AdminForm";
import MainForm from "./MainForm";
import SuccessCreated from "./SuccessCreated";
import PopUp from "../../../../generalComponents/PopUp";
import Loader from "../../../../generalComponents/Loaders/4HUB";

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
	const [loadingType, setLoadingType] = useState("");

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
							setLoadingType={setLoadingType}
						/>
					)}

					{step === "admin" && (
						<AdminForm
							compare={compare}
							setCompare={setCompare}
							mainFields={mainFields}
							setMainFields={setMainFields}
							setStep={setStep}
							setLoadingType={setLoadingType}
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
		</PopUp>
	);
};

export default BusinessRegistration;
