import React, { useState } from "react";
import styles from "./AddLogo.module.sass";
// import logoImg from "../../../../../../../assets/BusinessCabinet/logo.png";
import { ReactComponent as ArrowIcon } from "../../../../../../../assets/BusinessCabinet/SideList/arrow.svg";
import ContextMenu from "../../../../../../../generalComponents/ContextMenu";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { mouseParamsProps } from "../../../../../../../types/MouseParams";

const AddLogo = ({
  mouseParams,
  setMouseParams,
  renderMenuItems,
  setAction,
  companyName,
  setCompanyName,
  companyLogo
}) => {
  const { __ } = useLocales();
  const [defaultTitle] = useState("Добавить лого компании");
  const contextMenuLogo = [
    { name: __("Загрузить Лого"), img: "download-blue", type: "uploadLogo" },
    { name: __("Редактировать"), img: "edit", type: "editLogo" }
  ].filter((menuItem) => (companyLogo ? true : menuItem.type !== "editLogo"));

  const callbackArrMain = [
    {
      type: "uploadLogo",
      name: __("Загрузить Лого"),
      text: ``,
      callback: (list, index) => setAction(list[index])
    },
    {
      type: "editLogo",
      name: __("Редактировать"),
      text: ``,
      callback: (list, index) => setAction(list[index])
    }
  ];

  return (
    <div className={styles.wrapper}>
      {companyLogo ? (
        <img className={styles.companyLogo} src={companyLogo.src} alt="Logo" />
      ) : (
        <input
          type="text"
          placeholder={defaultTitle}
          value={companyName}
          className={styles.title}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      )}
      <ArrowIcon
        className={styles.arrow}
        onClick={(e) => {
          setMouseParams({
            x: e.clientX,
            y: e.clientY,
            width: 158,
            height: 38,
            type: "contextMenuLogo"
          });
        }}
      />
      {mouseParams !== null && mouseParams.type === "contextMenuLogo" ? (
        <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={false}>
          <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuLogo, callbackArrMain)}</div>
        </ContextMenu>
      ) : null}
    </div>
  );
};

export default AddLogo;

AddLogo.propTypes = {
  mouseParams: mouseParamsProps,
  setMouseParams: PropTypes.func,
  renderMenuItems: PropTypes.func,
  setAction: PropTypes.func,
  companyName: PropTypes.string,
  setCompanyName: PropTypes.func,
  companyLogo: PropTypes.any
};
