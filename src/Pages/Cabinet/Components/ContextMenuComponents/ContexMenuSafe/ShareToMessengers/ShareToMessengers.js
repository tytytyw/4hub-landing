import React from "react";
import styles from "./ShareToMessengers.module.sass";
import classNames from "classnames";

const ShareToMessengers = ({ setDisplayMessengers, user_to }) => {
	//TODO: add safe link
	const safe_link = `http://fs2.mh.net.ua`;
	const HrefSocial = (selectedSoc) => {
		switch (selectedSoc) {
            case "email":
                return(`mailto:${user_to}?body=${safe_link}`);
			case "telegram":
				return(`https://t.me/share/url?url=${safe_link}`);
			case "whatsapp":
				return(`https://api.whatsapp.com/send/?text=${safe_link}`);
			case "viber":
				return(`viber://forward?text=${safe_link}`);
			default:
				return("");
		}
	}

	const messengersData = [
		{
			label: "Email",
			type: "email",
			icon: "./assets/PrivateCabinet/socials/mail.svg",
		},
		{
			label: "Viber",
			type: "viber",
			icon: "./assets/PrivateCabinet/socials/viber.svg",
		},
		{
			label: "WhatsApp",
			type: "whatsapp",
			icon: "./assets/PrivateCabinet/socials/whatsapp.svg",
		},
		{
			label: "Telegram",
			type: "telegram",
			icon: "./assets/PrivateCabinet/socials/telegram.svg",
		},
        //TODO: skype, slack
	];

	return (
		<div className={styles.share}>
			<div className={styles.socials}>
				{messengersData.map((item, index) => (
					<li
						className={classNames({
							[styles.socialsItem]: true,
						})}
						key={index}
					>
                        <a target='_blanck' href={HrefSocial(item?.type)}>
                            <img
                                className={styles.socialIcon}
                                src={item.icon}
                                alt={item.label}
                            />
                        </a>
					</li>
				))}
				<span
					className={styles.close}
					onClick={() => setDisplayMessengers(false)}
				>
					<span className={styles.times} />
				</span>
			</div>
		</div>
	);
};

export default ShareToMessengers;
