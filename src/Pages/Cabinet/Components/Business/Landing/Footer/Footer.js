import React from "react";
import styles from "./Footer.module.sass";
import {imageSrc} from '../../../../../../generalComponents/globalVariables';
import {useLocales} from "react-localized";

function Footer() {
	const { __ } = useLocales()
	return (
		<footer className={styles.footer}>
			<nav className={styles.nav}>
                <h5 className={styles.nav__title}>
                    <a href="./">
                        <img src={imageSrc + 'assets/StartPage/logo.svg'} alt="4Hub"/>
                    </a>
                </h5>
				<a className={styles.nav__link} href="./">{ __('Тарифный план') }</a>
				<a className={styles.nav__link} href="./">{ __('Безопасноть') }</a>
				<a className={styles.nav__link} href="./">{ __('Функции') }</a>
			</nav>
            <nav className={styles.nav}>
                <h5 className={styles.nav__title}>
                    Компания
                </h5>
				<a className={styles.nav__link} href="./">{ __('О 4Hub') }</a>
				<a className={styles.nav__link} href="./">{ __('Вакансии') }</a>
				<a className={styles.nav__link} href="./">{ __('Блог') }</a>
			</nav>
            <nav className={styles.nav}>
                <h5 className={styles.nav__title}>
					{ __('Поддержка') }
                </h5>
				<a className={styles.nav__link} href="./">{ __('Контакты') }</a>
				<a className={styles.nav__link} href="./">{ __('Карта сайта') }</a>
				<a className={styles.nav__link} href="./">{ __('Конфиденсальность') }</a>
			</nav>
            <nav className={styles.nav}>
                <h5 className={styles.nav__title}>
					{ __('Сообщество') }
                </h5>
				<a className={styles.nav__link} href="./">{ __('Разработчикам') }</a>
				<a className={styles.nav__link} href="./">{ __('Пригласите друзей') }</a>
				<a className={styles.nav__link} href="./">{ __('Служба поддержки') }</a>
			</nav>
		</footer>
	);
}

export default Footer;
