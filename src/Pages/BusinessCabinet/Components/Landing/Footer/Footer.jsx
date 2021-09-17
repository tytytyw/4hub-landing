import React from "react";
import styles from "./Footer.module.sass";

function Footer() {
	return (
		<footer className={styles.footer}>
			<nav className={styles.nav}>
                <h5 className={styles.nav__title}>
                    <a href="./">
                        <img src='./assets/StartPage/logo.svg' alt="4Hub"/>
                    </a>
                </h5>
				<a className={styles.nav__link} href="./">Тарифный план</a>
				<a className={styles.nav__link} href="./">Безопасноть</a>
				<a className={styles.nav__link} href="./">Функции</a>
			</nav>
            <nav className={styles.nav}>
                <h5 className={styles.nav__title}>
                    Компания
                </h5>
				<a className={styles.nav__link} href="./">О 4Hub</a>
				<a className={styles.nav__link} href="./">Вакансии</a>
				<a className={styles.nav__link} href="./">Блог</a>
			</nav>
            <nav className={styles.nav}>
                <h5 className={styles.nav__title}>
                    Поддержка
                </h5>
				<a className={styles.nav__link} href="./">Контакты</a>
				<a className={styles.nav__link} href="./">Карта сайта</a>
				<a className={styles.nav__link} href="./">Конфиденсальность</a>
			</nav>
            <nav className={styles.nav}>
                <h5 className={styles.nav__title}>
                    Сообщество
                </h5>
				<a className={styles.nav__link} href="./">Разработчикам</a>
				<a className={styles.nav__link} href="./">Пригласите друзей</a>
				<a className={styles.nav__link} href="./">Служба поддержки</a>
			</nav>
		</footer>
	);
}

export default Footer;
