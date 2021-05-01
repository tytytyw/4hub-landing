import logo from '../img/logo.svg'
import styles from './Header.module.sass';
import classNames from 'classnames';

function Header() {
    return (
        <header className={styles.header}>
            <a className={styles.logo} href="./">
                <img className={styles.logo_img} src={logo} alt='4hub logo'></img>
                <h1 className={styles.logo_title}>4Hub</h1>
            </a>
            <nav className={styles.nav}>
                <div className={classNames(styles.nav__item, styles.info)}>
                    <svg className={styles.info_svg} cursor='pointer' width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <title>info</title>
                        <path className={styles.svg_path} fillRule="evenodd" clipRule="evenodd" d="M0 11.5C0 5.15872 5.15908 0 11.5 0C17.8409 0 23 5.15872 23 11.5C23 17.8413 17.8409 23 11.5 23C5.15908 23 0 17.8413 0 11.5ZM1.41538 11.5C1.41538 17.0607 5.93931 21.5846 11.5 21.5846C17.0607 21.5846 21.5846 17.0607 21.5846 11.5C21.5846 5.93931 17.0607 1.41538 11.5 1.41538C5.93931 1.41538 1.41538 5.93931 1.41538 11.5Z" fill="white"/>
                        <circle className={styles.svg_path} cx="11.6834" cy="6.91451" r="1.18362" fill="white"/>
                        <path className={styles.svg_path}  d="M11.3715 10.0287C10.9809 10.0287 10.6638 10.3458 10.6638 10.7364V16.7518C10.6638 17.1424 10.9809 17.4595 11.3715 17.4595C11.7622 17.4595 12.0792 17.1424 12.0792 16.7518V10.7364C12.0792 10.3454 11.7622 10.0287 11.3715 10.0287Z" fill="white"/>
                    </svg>
                </div>
                <div className={classNames(styles.nav__item, styles.select_wrap)}>
                    <select className={styles.select} name="lang" id="lang-select">
                        <option className={styles.lang_option} value="ru">ru</option>
                    </select>
                    <svg className={styles.select_arrow} width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className={styles.svg_path}  d="M5.90594 7.24815L0.746289 1.96799C0.417904 1.6321 0.417904 1.08753 0.746289 0.75181C1.07438 0.416063 1.60652 0.416063 1.93459 0.75181L6.50009 5.42394L11.0654 0.751946C11.3937 0.416199 11.9257 0.416199 12.2538 0.751946C12.5821 1.08769 12.5821 1.63224 12.2538 1.96812L7.0941 7.24829C6.92998 7.41616 6.7151 7.5 6.50011 7.5C6.28502 7.5 6.06998 7.416 5.90594 7.24815Z" fill="white"/>
                    </svg>

                </div>
                <button className={classNames(styles.sign_btn, styles.nav__item)}>Вход</button>
                <button className={classNames(styles.registration_btn, styles.nav__item)}>Регистрация</button>
            </nav>
        </header>
    )
}

export default Header
