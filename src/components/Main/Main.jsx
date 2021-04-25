import React, { useEffect } from "react";
import styles from "./Main.module.css";
import Tariff from "../Tariff/Tariff";
import mainPic_1 from "../../img/slider_item_1.png";
import mainPic_2 from "../../img/slider_item_2.png";
import mainPic_3 from "../../img/slider_item_3.png";
import mainPic_4 from "../../img/slider_item_4.png";
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
    //проверяем до какой картинки доскролил пользователь
		window.scrollY +100 > SliderItemPic1.offsetTop &&
		window.scrollY - sliderTop.offsetTop<
			SliderItemPic1.offsetTop + SliderItemPic1.offsetHeight
			? SliderItemText1.classList.add(styles.text_item_active)
			: SliderItemText1.classList.remove(styles.text_item_active);

		window.scrollY +100 > SliderItemPic2.offsetTop &&
		window.scrollY - sliderTop.offsetTop <
			SliderItemPic2.offsetTop + SliderItemPic2.offsetHeight
			? SliderItemText2.classList.add(styles.text_item_active)
			: SliderItemText2.classList.remove(styles.text_item_active);

		window.scrollY +100 > SliderItemPic3.offsetTop &&
		window.scrollY - sliderTop.offsetTop <
			SliderItemPic3.offsetTop + SliderItemPic3.offsetHeight
			? SliderItemText3.classList.add(styles.text_item_active)
			: SliderItemText3.classList.remove(styles.text_item_active);

		window.scrollY +100 > SliderItemPic4.offsetTop &&
		window.scrollY - sliderTop.offsetTop <
			SliderItemPic4.offsetTop + SliderItemPic4.offsetHeight
			? SliderItemText4.classList.add(styles.text_item_active)
			: SliderItemText4.classList.remove(styles.text_item_active);
	};

	useEffect(() => {
		window.addEventListener("scroll", scrollHandler);
		return () => window.removeEventListener("scroll", scrollHandler);
	}, []);
	return (
		<div>
			<main>
				<h2 className={styles.title}>Remote Workspace</h2>
				<div className={styles.presentation}>
					<div className={styles.text_wrap}>
						<div
							id="slide-text_1"
							className={classNames(styles.text_item, styles.text_item_active)}
						>
							<h4 className={styles.presentation__title}>Название заголовка</h4>
							<p className={styles.presentation__text}>
								Это текст-"рыба", часто используемый в печати и
								вэб&#8209;дизайне. Lorem Ipsum является стандартной "рыбой" для
								текстов на латинице с начала XVI века.
							</p>
							<p className={styles.presentation__text}>
								В то время некий безымянный печатник создал большую коллекцию
								размеров и форм шрифтов
							</p>
						</div>
						<div id="slide-text_2" className={styles.text_item}>
							<h4 className={styles.presentation__title}>Совместный проект</h4>
							<p className={styles.presentation__text}>
								Это текст-"рыба", часто используемый в печати и
								вэб&#8209;дизайне. Lorem Ipsum является стандартной "рыбой" для
								текстов на латинице с начала XVI века.
							</p>
							<p className={styles.presentation__text}>
								В то время некий безымянный печатник создал большую коллекцию
								размеров и форм шрифтов
							</p>
						</div>
						<div id="slide-text_3" className={styles.text_item}>
							<h4 className={styles.presentation__title}>
								Безопастность (Сейф)
							</h4>
							<p className={styles.presentation__text}>
								Это текст-"рыба", часто используемый в печати и
								вэб&#8209;дизайне. Lorem Ipsum является стандартной "рыбой" для
								текстов на латинице с начала XVI века.
							</p>
							<p className={styles.presentation__text}>
								В то время некий безымянный печатник создал большую коллекцию
								размеров и форм шрифтов
							</p>
						</div>
						<div id="slide-text_4" className={styles.text_item}>
							<h4 className={styles.presentation__title}>
								Синхранизация с Программами
							</h4>
							<p className={styles.presentation__text}>
								Это текст-"рыба", часто используемый в печати и
								вэб&#8209;дизайне. Lorem Ipsum является стандартной "рыбой" для
								текстов на латинице с начала XVI века.
							</p>
							<p className={styles.presentation__text}>
								В то время некий безымянный печатник создал большую коллекцию
								размеров и форм шрифтов
							</p>
						</div>
					</div>
					<div className={styles.presentation__images}>
						<img
							id="slide-picture_1"
							className={styles.presentation__image}
							src={mainPic_1}
							alt="добавление файла"
						/>
						<img
							id="slide-picture_2"
							className={styles.presentation__image}
							src={mainPic_2}
							alt="совместный проект"
						/>
						<img
							id="slide-picture_3"
							className={styles.presentation__image}
							src={mainPic_3}
							alt="безопасность"
						/>
						<img
							id="slide-picture_4"
							className={styles.presentation__image}
							src={mainPic_4}
							alt="синхронизация"
						/>
					</div>
				</div>
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
