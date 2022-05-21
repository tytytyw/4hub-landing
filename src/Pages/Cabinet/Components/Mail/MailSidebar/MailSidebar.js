import React from "react";
import Button from "../Button/Button";
import styles from "./MailSidebar.module.sass";
import { useLocales } from "react-localized";
import Account from "../Account/Account";
import { useSelector } from "react-redux";
import classnames from "classnames";

function MailSidebar() {
  const { __ } = useLocales();
  const { theme } = useSelector((state) => state.user.userInfo);

  const mailAccount = [
    { id: 1, mail: "AlinaKvitalina@gmail.com" },
    { id: 2, mail: "Kvitalina19@gmail.com" },
    { id: 3, mail: "Kvitalina19@gmail.com" }
  ];

  return (
    <div className={classnames(styles.wrapper, `scrollbar-thin-${theme}`)}>
      <div className={styles.button}>
        <Button icon={"plus.svg"} onClick={() => console.log("New Mail")}>
          {__("Новое письмо")}
        </Button>
      </div>
      {mailAccount.map((item) => (
        <Account key={item.id} mail={item.mail} />
      ))}
    </div>
  );
}

export default MailSidebar;
