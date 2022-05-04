import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./ConnectedContacts.module.sass";
import { ReactComponent as PlayIcon } from "../../../../../assets/PrivateCabinet/play-grey.svg";
import classNames from "classnames";
import ContactItem from "../ContactItem";
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import LoadingFailed from "../LoadingFailed";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const ConnectedContacts = ({
  listCollapsed,
  setMouseParams,
  listSize,
  connectedContactsListLoading,
  loadingFailed,
  getConnectedContacts
}) => {
  const { __ } = useLocales();
  const connectedContacts = useSelector((state) => state.Cabinet.connectedContacts);
  const [collapse, setCollapse] = useState(true);

  const renderContacts = () => {
    return connectedContacts.map((contact, index) => {
      return (
        <ContactItem
          listSize={listSize}
          key={index}
          contact={contact}
          active={contact?.active}
          setMouseParams={setMouseParams}
          listCollapsed={listCollapsed}
        />
      );
    });
  };

  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [styles.hidden]: collapse,
        [styles.loadingFailed]: loadingFailed
      })}
    >
      <div
        className={classNames({
          [styles.titleWrap]: true,
          [styles.titleCollapsed]: !!listCollapsed,
          [styles.titleWrapChosen]: !!collapse
        })}
        onClick={() => setCollapse(!collapse)}
      >
        <span title={listCollapsed ? __("Подключенные пользователи") : ""} className={styles.title}>
          Подключенные пользователи
        </span>
        <PlayIcon
          className={classNames({
            [styles.playButton]: true,
            [styles.revert]: collapse
          })}
          title={collapse ? __("Свернуть") : __("Развернуть")}
        />
      </div>
      <div
        className={classNames({
          [styles.innerContacts]: true
        })}
      >
        {connectedContactsListLoading ? (
          <div
            style={{
              height: "54px",
              position: "relative",
              overflow: "hidden"
            }}
          >
            <Loader
              type="bounceDots"
              position="absolute"
              background="transparent"
              zIndex={5}
              width="100px"
              height="100px"
              containerType="bounceDots"
            />
          </div>
        ) : null}
        {loadingFailed ? collapse && <LoadingFailed callback={getConnectedContacts} /> : null}

        {collapse && renderContacts()}

        {/* TODO: remove */}
        {collapse && renderContacts()}
        {collapse && renderContacts()}
        {collapse && renderContacts()}
        {collapse && renderContacts()}
        {collapse && renderContacts()}
        {collapse && renderContacts()}
        {collapse && renderContacts()}
      </div>
    </div>
  );
};

export default ConnectedContacts;

ConnectedContacts.propTypes = {
  listCollapsed: PropTypes.bool,
  setMouseParams: PropTypes.func,
  listSize: PropTypes.string,
  connectedContactsListLoading: PropTypes.bool,
  loadingFailed: PropTypes.bool,
  getConnectedContacts: PropTypes.func
};
