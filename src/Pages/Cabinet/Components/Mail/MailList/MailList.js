import React from "react";
import Button from "../Button/Button";
import styles from "./MailList.module.sass";
import { useLocales } from "react-localized";
import ListItem from "../ListItem/ListItem";
import { useDispatch, useSelector } from "react-redux";
import classnames from "classnames";
import PropTypes from "prop-types";
import { onSetModals } from "Store/actions/CabinetActions";

function MailList({ mailAccounts }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.user.userInfo);
  // const contextMenuModals = useSelector((s) => s.Cabinet.modals.contextMenuModals);

  const renderMailAccount = () => {
    return mailAccounts.map((item, i) => <ListItem key={item} mail={item} open={i === 0 ? true : false} />);
  };
  return (
    <div className={classnames(styles.wrapper, `scrollbar-thin-${theme}`)}>
      <div className={styles.button}>
        <Button icon={"plus.svg"} onClick={() => dispatch(onSetModals("contextMenuModals"))}>
          {__("Новое письмо")}
        </Button>
      </div>
      {renderMailAccount()}
    </div>
  );
}

export default MailList;

MailList.defaultProps = {
  mailAccounts: []
};

MailList.propTypes = {
  mailAccounts: PropTypes.arrayOf(PropTypes.string)
};
