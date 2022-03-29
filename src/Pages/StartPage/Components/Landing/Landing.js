import styles from './Landing.module.sass'
import Main from './Main/Main'
import Footer from './Footer/Footer'
import React, { useEffect } from 'react'
import { useLocales } from 'react-localized'

function Landing() {

  const { __ } = useLocales()
  const scrollTop = () => window.scroll(0,0)
  useEffect(()=> {return (() => document.body.removeAttribute('style'))},[])
  
  return (
    <div className={styles.Landing}>
      <h2 className={styles.title}>{ __('Умное рабочее пространство') }</h2>
      <Main scrollTop={scrollTop} />
      <Footer />
    </div>
  );
}

export default Landing;
