import React from "react";
import styles from "./Tariff.module.css";
import classNames from "classnames";

function Tariff({ name, cost, currentPlan, promo, discont }) {
	return (
		<div className={styles.tariff}>
			<div
				className={classNames({
					[styles.tariff_line]: true,
					[styles.tariff_line_promo]: !!promo,
				})}
			>
				{promo}
			</div>
			<div className={styles.container}>
				<p className={styles.tariff_name}>{name}</p>
				<p className={styles.tariff_cost}>
					{promo ? (
						<>
                            <span className={styles.tariff_cost_old}>${cost}</span>
                            <span className={styles.tariff_cost_new}>${cost - cost / 100 * discont}</span>
                        </>
                        
					) : (
						`$${cost}`
					)}
				</p>
				<p className={styles.tariff_cost_clarification}>
					На пользователя в месяц начиная с 3 польз.
				</p>
				<ul className={styles.tariff_descrp}>
					<li className={styles.tariff_descrp_item}>
						<svg
							className={styles.tariff_descrp_ico}
							width="20"
							height="20"
							viewBox="0 0 20 20"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M8.97433 0L8.64376 0.0222857C4.04269 0.336143 0.336143 4.04269 0.0225952 8.64376L0 8.97433H8.97433V0Z"
								fill="#4086F1"
							/>
							<path
								d="M17.0388 3.94516C15.4036 2.04624 13.1305 0.906879 10.6382 0.736641L10.3076 0.714355V10.3077H0.714233L0.736829 10.6383C0.874257 12.6536 1.64714 14.5296 2.97221 16.064C3.09107 16.2014 3.22416 16.3385 3.404 16.5084L3.87602 16.9545C4.05616 17.125 4.2004 17.25 4.34402 17.3602C5.97861 18.6185 7.93388 19.2839 9.99809 19.2839C10.2414 19.2839 10.4884 19.2743 10.7326 19.2555C15.2256 18.9091 18.8882 15.2626 19.2522 10.773C19.4559 8.26457 18.6697 5.83945 17.0388 3.94516Z"
								fill="#4086F1"
							/>
						</svg>
						<p className={styles.tariff_descrp_text}>
							2 000 ГБ места для безопасного хранения файлов
						</p>
					</li>
					<li className={styles.tariff_descrp_item}>
						<svg
							className={styles.tariff_descrp_ico}
							width="20"
							height="18"
							viewBox="0 0 20 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M8.72533 2.42657L7.20625 0.339483L7.0773 0.161865H0V17.3089H19.7368V2.42657H8.72533Z"
								fill="white"
							/>
							<path
								d="M0.657837 16.6618V0.808838H6.73843L8.38317 3.07354H8.38711L9.92988 5.19299C9.99402 5.28098 10.0947 5.3279 10.1973 5.32822V5.33825H19.0789V16.6618H0.657837Z"
								fill="#4086F1"
							/>
							<path
								d="M19.079 3.07373V4.69138H10.3737L9.19641 3.07373H19.079Z"
								fill="#4086F1"
							/>
						</svg>

						<p className={styles.tariff_descrp_text}>
							Простые инструменты для храннения и предоставления доступа и
							совместной работы
						</p>
					</li>
					<button
						className={classNames({[styles.tariff_btn]: true, [styles.tariff_current_btn]:currentPlan, [styles.tariff_promo_btn]:promo})}
					>
						{currentPlan ? 'Текущий план' : 'Купить'}
					</button>
				</ul>
			</div>
		</div>
	);
}

export default Tariff;
