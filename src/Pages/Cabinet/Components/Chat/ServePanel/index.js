import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ServePanel.module.sass";
import classNames from "classnames";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import { ReactComponent as AddContactIcon } from "../../../../../assets/PrivateCabinet/addContact.svg";
import { ReactComponent as PhoneIcon } from "../../../../../assets/PrivateCabinet/phone-5.svg";
import { ReactComponent as VideoIcon } from "../../../../../assets/PrivateCabinet/film.svg";
import { ReactComponent as CameraIcon } from "../../../../../assets/PrivateCabinet/camera.svg";
import { ReactComponent as InfoIcon } from "../../../../../assets/PrivateCabinet/info-2.svg";
import { ReactComponent as CopyLinkIcon } from "../../../../../assets/PrivateCabinet/copy-link.svg";
import { ReactComponent as PictureIcon } from "../../../../../assets/PrivateCabinet/picture-2.svg";
import {
  onSetPaint,
  onSetModals,
} from "../../../../../Store/actions/CabinetActions";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const ServePanel = ({
  selectedContact,
  setAction,
  setRightPanelContentType,
}) => {
  const { __ } = useLocales();
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);
  const dispatch = useDispatch();
  const paint = useSelector((state) => state.Cabinet.paint);
  const printScreen = useSelector((state) => state.Cabinet.modals.printScreen);

  return (
    <div
      className={classNames({
        [styles.chatBoardHeader]: true,
        [styles.darkTheme]: chatTheme.name === "dark",
      })}
    >
      {selectedContact ? (
        <div className={styles.groupName}>
          <img
            src={
              selectedContact?.icon?.[0] ||
              `${imageSrc}assets/PrivateCabinet/${
                selectedContact?.isGroup ? "chatGroup" : "profile-noPhoto"
              }.svg`
            }
            alt="img"
            className={styles.avatar}
          />
          <div className={styles.info}>
            <div className={styles.name}>{`${selectedContact?.sname || ""} ${
              selectedContact?.name || ""
            }`}</div>
            <div className={styles.status}>{selectedContact?.status || ""}</div>
          </div>
        </div>
      ) : null}
      {selectedContact ? (
        <div className={styles.headerOptions}>
          {(selectedContact.id_real_user &&
            selectedContact.id_real_user !== "0") ||
          selectedContact.isGroup ? (
            <div
              onClick={() =>
                setAction(
                  selectedContact?.isGroup
                    ? { type: "addUsersToGroup" }
                    : {
                        type: "addChat",
                        chatsType: "groups",
                        initialUser: selectedContact,
                      }
                )
              }
              className={styles.iconView}
              title={
                selectedContact.isGroup
                  ? __("Добавить участников в группу")
                  : __(`Создать групповой чат с ${selectedContact.name}`)
              }
            >
              <AddContactIcon title="" className={styles.addContactIcon} />
            </div>
          ) : null}
          <div className={styles.iconView}>
            <PhoneIcon />
          </div>
          <div className={styles.iconView}>
            <VideoIcon />
          </div>
          <div className={styles.separating} />
          <div className={styles.iconView}>
            <CopyLinkIcon />
          </div>
          <div
            className={classNames(styles.iconView, styles.PicInPicIcon)}
            onClick={() =>
              dispatch(
                onSetPaint("mutualEdit", {
                  ...paint.mutualEdit,
                  open: true,
                  destination: "global/all",
                })
              )
            }
          >
            <PictureIcon />
            <div className={styles.line} />
            <PictureIcon />
          </div>
          {!selectedContact?.is_secret_chat ? (
            <div
              onClick={() =>
                printScreen.open
                  ? null
                  : dispatch(
                      onSetModals("printScreen", { ...printScreen, open: true })
                    )
              }
              className={classNames({
                [styles.iconView]: true,
                [styles.disable]: printScreen?.open,
              })}
            >
              <CameraIcon />
            </div>
          ) : (
            ""
          )}
          <div
            className={styles.iconView}
            onClick={() =>
              setRightPanelContentType((state) =>
                state === "info" ? "" : "info"
              )
            }
          >
            <InfoIcon />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ServePanel;

ServePanel.propTypes = {
  selectedContact: PropTypes.object.isRequired,
  setAction: PropTypes.func.isRequired,
  setRightPanelContentType: PropTypes.func.isRequired,
};
