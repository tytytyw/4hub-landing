import styles from './Landing.module.sass'
import Main from './Main/Main.jsx'
import Footer from './Footer/Footer'

function Landing() {
  return (
    <div className={styles.Landing}>
      <h2 className={styles.title}>Умное рабочее пространство</h2>
      <Main />
      <Footer />
    </div>
  );
}

export default Landing;
