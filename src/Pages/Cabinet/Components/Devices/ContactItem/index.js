import React from "react";

import styles from "./ContactItem.module.sass";
import "../../../../../generalComponents/colors.sass";
import classNames from "classnames";
import {
  setSelectedDevice,
  setSelectedUser
} from "../../../../../Store/actions/CabinetActions";
import { useDispatch, useSelector } from "react-redux";
import { emptyProfileImage } from "../../MyProfile/Contacts/consts";
import PropTypes from "prop-types";

const ContactItem = ({ contact, setMouseParams, listCollapsed, listSize }) => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(state => state.Cabinet.selectedUser);
  const getImage = () => {
    const strLength = contact.icon?.[0].length;
    if (contact.icon?.[0].charAt(strLength - 1) === ".") {
      return emptyProfileImage;
    }
    return contact.icon?.[0];
  };

  return (
    <>
      <div
        className={classNames({
          [styles.wrapper]: true,
          [styles.wrapperChosen]: selectedUser?.id_user === contact.id_user,
          [styles?.[`wrapper_${listSize}`]]: !!listSize
        })}
        onClick={() => {
          dispatch(setSelectedUser(contact));
          dispatch(setSelectedDevice(null));
        }}
        title={listCollapsed ? contact?.user_name : ""}>
        <div className={styles.titleWrap}>
          <div className={styles.imageWrap}>
            <img
              src={getImage(contact.icon?.[0])}
              alt="icon"
              className={styles.icon}
              onError={e => e.target.setAttribute("src", emptyProfileImage)}
            />
            {/* {contact?.active === 1 && <span className={styles.active} />} */}
          </div>
          {!listCollapsed && (
            <span className={styles.title}>{contact?.user_name} </span>
          )}
        </div>
        <div className={styles.functionWrap}>
          <div
            className={styles.menuWrap}
            onClick={e =>
              setMouseParams({
                x: e.clientX,
                y: e.clientY,
                width: 200,
                height: 25,
                type: "user"
              })
            }>
            <span className={styles.menu} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactItem;

ContactItem.propTypes = {
  contact: PropTypes.shape({
    icon: PropTypes.array,
    id_user: PropTypes.string,
    user_name: PropTypes.string
  }),
  setMouseParams: PropTypes.func,
  listCollapsed: PropTypes.bool,
  listSize: PropTypes.string
};
