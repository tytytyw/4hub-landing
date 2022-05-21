import React from "react";
import Button from "../Button/Button";
import styles from "./MailList.module.sass";
import { useLocales } from "react-localized";
import ListItem from "../ListItem/ListItem";
import { useSelector } from "react-redux";
import classnames from "classnames";

function MailList() {
  const { __ } = useLocales();
  const { theme } = useSelector((state) => state.user.userInfo);

  const mailAccount = [
    { id: 1, mail: "AlinaKvitalina@gmail.com" },
    { id: 2, mail: "Kvitalina19@gmail.com" },
    { id: 3, mail: "Kvitalina19@gmail.com" }
  ];

  const renderMailAccount = () => {
    return mailAccount.map((item) => <ListItem key={item.id} mail={item.mail} />);
  };

  return (
    <div className={classnames(styles.wrapper, `scrollbar-thin-${theme}`)}>
      <div className={styles.button}>
        <Button icon={"plus.svg"} onClick={() => console.log("New Mail")}>
          {__("Новое письмо")}
        </Button>
      </div>
      {renderMailAccount()}
    </div>
  );
}

export default MailList;
