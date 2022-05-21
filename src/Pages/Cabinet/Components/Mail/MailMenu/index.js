import React from "react";
import Button from "../Button/Button";
import styles from "./MailMenu.module.sass";
import { useLocales } from "react-localized";

function MailMenu() {
  const { __ } = useLocales();

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.button}>
          <Button icon={"plus.svg"} onClick={() => console.log("New Mail")}>
            {__("Новое письмо")}
          </Button>
        </div>
        {/* {
          mailAccount.map((item)=> {

          })
        } */}
      </div>
    </>
  );
}

export default MailMenu;
