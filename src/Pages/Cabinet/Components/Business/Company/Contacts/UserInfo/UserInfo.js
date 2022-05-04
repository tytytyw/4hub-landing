import React from "react";
import styles from "./UserInfo.module.sass";
import { imageSrc } from "../../../../../../../generalComponents/globalVariables";
import { ReactComponent as ShareIcon } from "../../../../../../../assets/PrivateCabinet/share.svg";
import { ReactComponent as EditIcon } from "../../../../../../../assets/PrivateCabinet/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../../../../assets/PrivateCabinet/garbage.svg";
import { ReactComponent as PhoneIcon } from "../../../../../../../assets/PrivateCabinet/phone-3.svg";
import { ReactComponent as MailIcon } from "../../../../../../../assets/PrivateCabinet/mail-3.svg";
import classNames from "classnames";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { selectedItemProps } from "../../../../../../../types/Contacts";

function UserInfo({ selectedItem, setAction }) {
  const { __ } = useLocales();
  const renderContactItem = (array, type) => {
    if (!array) return null;
    return array.map((value, index) => {
      return (
        <div className={styles.inputWrap} key={type + index}>
          <div className={styles.iconWrap}>{type === "phone" ? <PhoneIcon /> : <MailIcon />}</div>
          <input readOnly className={styles.input} value={value} />
        </div>
      );
    });
  };
  const renderSocialItem = (array) => {
    if (!array) return null;
    return array.map((item) => {
      if (item.type === "skype") item.type = "skype-2";
      return (
        <div className={styles.inputWrap} key={item.type}>
          <div className={classNames(styles.iconWrap, styles.iconWrap_soc)}>
            <img
              width={30}
              height={30}
              src={`${imageSrc}assets/PrivateCabinet/socials/${item.type}.svg`}
              alt={item.type}
            />
          </div>
          <input readOnly className={styles.input} value={item.link} />
        </div>
      );
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.emptyBlock}></div>
        <div className={styles.avatar}>
          <img
            className={styles.picture}
            src={selectedItem?.icon?.[0] || `${imageSrc}assets/PrivateCabinet/profile-noPhoto.svg`}
            alt="avatar"
          />
        </div>
        <div className={styles.buttons}>
          <div className={styles.iconView}>
            <ShareIcon className={styles.iconShare} />
          </div>

          <div className={styles.iconView} onClick={() => setAction({ type: "editContact", name: "", text: "" })}>
            <EditIcon className={styles.iconShare} />
          </div>

          <div
            className={styles.iconView}
            onClick={() =>
              setAction({
                type: "deleteContact",
                name: __("Удаление контакта"),
                text: __(`Вы действительно хотите удалить контакт ${selectedItem?.name} ${selectedItem?.sname}?`)
              })
            }
          >
            <DeleteIcon height={17} className={styles.iconTrash} />
          </div>
        </div>
      </div>
      <p className={styles.name}>
        <span>{selectedItem?.name} </span>
        <span>{selectedItem?.pname} </span>
        <span>{selectedItem?.sname}</span>
      </p>
      <div className={styles.scrollArea}>
        {renderContactItem(selectedItem?.tel, "phone")}
        {renderContactItem(selectedItem?.email, "mail")}
        {renderSocialItem(selectedItem?.mes)}
        {renderSocialItem(selectedItem?.soc)}
      </div>
    </div>
  );
}

export default UserInfo;

UserInfo.propTypes = {
  selectedItem: selectedItemProps,
  setAction: PropTypes.func
};
