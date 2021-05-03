import styles from './Landing.module.sass'

import Main from './Main/Main.jsx'
import Footer from './Footer/Footer'

function App() {
  return (
    <div className={styles.Landing}>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
