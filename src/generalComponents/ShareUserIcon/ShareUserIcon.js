import React from "react";
import styles from "./ShareUserIcon.module.sass";
import PropTypes from "prop-types";
import { ReactComponent as UserIcon } from "../../assets/PrivateCabinet/userIcon.svg";

function ShareUserIcon({ userIcon, name }) {
  return (
    <div className={styles.iconWrap}>
      {userIcon.length === 0 ? (
        <div className={styles.emptyUserIcon}>
          <UserIcon title={name} />
        </div>
      ) : (
        <img src={userIcon[0]} className={styles.userIcon} alt="" />
      )}
    </div>
  );
}

export default ShareUserIcon;

ShareUserIcon.defaultProps = {
  userIcon: "",
  name: ""
};
ShareUserIcon.propTypes = {
  userIcon: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string
};
