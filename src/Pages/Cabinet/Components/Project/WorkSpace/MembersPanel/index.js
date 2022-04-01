import React from "react";

import styles from "./MembersPanel.module.sass";
import classNames from "classnames";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";

const MembersPanel = ({ setAddMember }) => {
  const members = [
    { user: "", img: "a1", active: false },
    { user: "", img: "a2", active: true },
    { user: "", img: "a3", active: true },
    { user: "", img: "a4", active: false },
    { user: "", img: "a2", active: true },
    { user: "", img: "a1", active: false },
    { user: "", img: "a3", active: true }
  ];

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        <li
          onClick={() => setAddMember(true)}
          className={classNames(styles.addMemberBtn, styles.item)}
        >
          <img
            className={styles.icon}
            src={`${imageSrc}assets/PrivateCabinet/add-member.svg`}
            alt="Add Member"
          />
        </li>
        {members?.map((member, index) => (
          <li className={styles.item} key={index}>
            <img
              className={styles.itemImg}
              src={`${imageSrc}assets/PrivateCabinet/avatars/${member?.img}.svg`}
              alt={member?.user}
            />
            {member?.active && <span className={styles.active} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MembersPanel;

MembersPanel.propTypes = {
  setAddMember: PropTypes.func
};
