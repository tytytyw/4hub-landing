import styles from './Landing.module.sass'
import Main from './Main/Main.jsx'
import Footer from './Footer/Footer'
import { useEffect } from 'react'

function Landing() {
  const scrollTop = () => window.scroll(0,0)
  useEffect(()=> {return (() => document.body.removeAttribute('style'))},[])
  
  return (
    <div className={styles.Landing}>
      <h2 className={styles.title}>Умное рабочее пространство</h2>
      <Main scrollTop={scrollTop} />
      <Footer />
    </div>
  );
}

export default Landing;
