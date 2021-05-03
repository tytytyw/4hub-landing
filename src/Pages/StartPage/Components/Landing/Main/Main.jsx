import React, { useEffect } from "react";
import styles from "./Main.module.sass";
import Tariff from "../Tariff/Tariff";
import classNames from "classnames";

function Main() {
	const scrollHandler = (e) => {
		const SliderItemText1 = document.querySelector("#slide-text_1");
		const SliderItemText2 = document.querySelector("#slide-text_2");
		const SliderItemText3 = document.querySelector("#slide-text_3");
		const SliderItemText4 = document.querySelector("#slide-text_4");
		const SliderItemPic1 = document.querySelector("#slide-picture_1");
		const SliderItemPic2 = document.querySelector("#slide-picture_2");
		const SliderItemPic3 = document.querySelector("#slide-picture_3");
		const SliderItemPic4 = document.querySelector("#slide-picture_4");
		const sliderTop = document.querySelector(`.${styles.presentation}`);
		const textWrap = document.querySelector(`.${styles.text_wrap}`);

		const frameFirst = () => {
			SliderItemText1.classList.add(styles.text_item_active);
			SliderItemText2.classList.remove(styles.text_item_active);

			SliderItemPic1.classList.add(styles.image_wrap_active);
			SliderItemPic2.classList.remove(styles.image_wrap_active);
		};
		const frameSecond = () => {
			SliderItemText2.classList.add(styles.text_item_active);
			SliderItemText1.classList.remove(styles.text_item_active);
			SliderItemText3.classList.remove(styles.text_item_active);
			textWrap.scrollTo(0, 0);

			SliderItemPic2.classList.add(styles.image_wrap_active);
			SliderItemPic1.classList.remove(styles.image_wrap_active);
			SliderItemPic3.classList.remove(styles.image_wrap_active);
		};
		const frameThird = () => {
			SliderItemText3.classList.add(styles.text_item_active);
			SliderItemText2.classList.remove(styles.text_item_active);
			SliderItemText4.classList.remove(styles.text_item_active);
			textWrap.scrollTo(0, textWrap.scrollHeight);
			SliderItemPic3.classList.add(styles.image_wrap_active);
			SliderItemPic2.classList.remove(styles.image_wrap_active);
			SliderItemPic4.classList.remove(styles.image_wrap_active);
		};
		const frameFourth = () => {
			SliderItemText4.classList.add(styles.text_item_active);
			SliderItemText3.classList.remove(styles.text_item_active);
			SliderItemPic4.classList.add(styles.image_wrap_active);
			SliderItemPic3.classList.remove(styles.image_wrap_active);
		};

		//проверяем до какой картинки доскролил пользователь
		window.scrollY > SliderItemPic1.offsetTop &&
		window.scrollY - sliderTop.offsetTop <
			SliderItemPic1.offsetTop + SliderItemPic1.offsetHeight - 200
			? frameFirst()
			: window.scrollY > SliderItemPic2.offsetTop - 200 &&
			  window.scrollY - sliderTop.offsetTop <
					SliderItemPic2.offsetTop + SliderItemPic2.offsetHeight - 200
			? frameSecond()
			: window.scrollY > SliderItemPic3.offsetTop - 200 &&
			  window.scrollY - sliderTop.offsetTop <
					SliderItemPic3.offsetTop + SliderItemPic3.offsetHeight
			? frameThird()
			: window.scrollY > SliderItemPic4.offsetTop - 200 &&
			  window.scrollY - sliderTop.offsetTop <
					SliderItemPic4.offsetTop + SliderItemPic4.offsetHeight
			? frameFourth()
			: SliderItemText4.classList.remove(styles.text_item_active);
	};

	useEffect(() => {
		window.addEventListener("scroll", scrollHandler);
		document
			.querySelector("#slide-text_1")
			.classList.add(styles.text_item_active);
		document
			.querySelector("#slide-picture_1")
			.classList.add(styles.image_wrap_active);
		return () => window.removeEventListener("scroll", scrollHandler);
	}, []);
	return (
		<div>
			<main className={styles.main}>
				<h2 className={styles.title}>Умное рабочее пространство</h2>
				<div className={styles.presentation}>
					<div className={styles.text_wrap}>
						<div id="slide-text_1" className={classNames(styles.text_item)}>
							<h4 className={styles.presentation__title}>Название заголовка</h4>
							<p className={styles.presentation__text}>
								Cистематизация данных в одном пространстве
							</p>
							<p className={styles.presentation__text}>
								Предоставление доступа к загруженным файлам
							</p>
							<p className={styles.presentation__text}>
								Разграничение прав доступа к файлам
							</p>
						</div>
						<div id="slide-text_2" className={styles.text_item}>
							<h4 className={styles.presentation__title}>Совместный проект</h4>
							<p className={styles.presentation__text}>
								Возможность организации конференций
							</p>
							<p className={styles.presentation__text}>
								Синхронизация совместной работы над проектами с использованием
								встроенных инструментов
							</p>
							<p className={styles.presentation__text}>
								Приватная работа с документами
							</p>
						</div>
						<div id="slide-text_3" className={styles.text_item}>
							<h4 className={styles.presentation__title}>
								Безопастность (Сейф)
							</h4>
							<p className={styles.presentation__text}>
								Надежная защита личных и корпоративных данных
							</p>
							<p className={styles.presentation__text}>Шифрование файлов</p>
						</div>
						<div id="slide-text_4" className={styles.text_item}>
							<h4 className={styles.presentation__title}>
								Синхранизация с Программами
							</h4>
							<p className={styles.presentation__text}>
								Синхронизация со сторонними сервисами
							</p>
							<p className={styles.presentation__text}>
								Встроенный магазин программного обеспечения
							</p>
						</div>
					</div>
					<div className={styles.presentation__images}>
						<div id="slide-picture_1" className={classNames(styles.image_wrap)}>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_1_1
								)}
								src="./assets/StartPage/slider_item_1_1.png"
								alt="добавление файла"
							/>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_1_2
								)}
								src="./assets/StartPage/slider_item_1_2.png"
								alt="добавление файла"
							/>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_1_3
								)}
								src="./assets/StartPage/slider_item_1_3.png"
								alt="добавление файла"
							/>
						</div>
						<div id="slide-picture_2" className={styles.image_wrap}>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_2_1
								)}
								src="./assets/StartPage/slider_item_2_1.png"
								alt="совместный проект"
							/>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_2_2
								)}
								src="./assets/StartPage/slider_item_2_2.png"
								alt="совместный проект"
							/>
						</div>
						<div id="slide-picture_3" className={styles.image_wrap}>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_3_1
								)}
								src="./assets/StartPage/slider_item_3_1.png"
								alt="добавление файла"
							/>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_3_2
								)}
								src="./assets/StartPage/slider_item_3_2.png"
								alt="добавление файла"
							/>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_3_3
								)}
								src="./assets/StartPage/slider_item_3_3.png"
								alt="добавление файла"
							/>
						</div>
						<div id="slide-picture_4" className={styles.image_wrap}>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_4
								)}
								src="./assets/StartPage/slider_item_4.png"
								alt="синхронизация"
							/>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_4_youtube
								)}
								src="./assets/StartPage/youtube.svg"
							/>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_4_telegram
								)}
								src="./assets/StartPage/telegram.svg"
							/>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_4_google_calendar
								)}
								src="./assets/StartPage/google_calendar.svg"
							/>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_4_google_drive
								)}
								src="./assets/StartPage/google_drive.svg"
							/>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_4_slack
								)}
								src="./assets/StartPage/slack.svg"
							/>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_4_viber
								)}
								src="./assets/StartPage/viber.svg"
							/>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_4_whatsapp
								)}
								src="./assets/StartPage/whatsapp.svg"
							/>
							<img
								className={classNames(
									styles.presentation__image,
									styles.image_4_skype
								)}
								src="./assets/StartPage/skype.svg"
							/>
						</div>
					</div>
				</div>
				{/* </Scrollbars> */}
			</main>
			<section className={styles.storage}>
				<h2 className={styles.storage_title}>Хранилище</h2>
				<p className={styles.storage_subtitile}>
					Это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem
					Ipsum является стандартной "рыбой" для текстов на латинице с начала
					XVI века.
				</p>
				<div className={styles.tariffs_list}>
					<Tariff name={"Free"} cost={0} currentPlan={true} promo={""} />
					<Tariff name={"Standart"} cost={30} currentPlan={false} promo={""} />
					<Tariff
						name={"Premium"}
						cost={100}
						discont={50}
						currentPlan={false}
						promo={"Предложение дня"}
					/>
					<Tariff
						name={"Premium plus"}
						cost={120}
						currentPlan={false}
						promo={""}
					/>
				</div>
			</section>
		</div>
	);
}

export default Main;
