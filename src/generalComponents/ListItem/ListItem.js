import React, { useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./ListItem.module.sass";
import PropTypes from "prop-types";
import api from "api";
import { useDispatch, useSelector } from "react-redux";
import { checkResponseStatus } from "generalComponents/generalHelpers";
import { getStorageItem, setStorageItem } from "generalComponents/StorageHelper";
import { onSetModals } from "Store/actions/CabinetActions";
import { useLocales } from "react-localized";

function ListItem({ title, icon, isChosen, onClick, listCollapsed, setMouseParams, dir }) {
  const { __ } = useLocales();
  const uid = useSelector((state) => state.user.uid);
  const [folderAmount, setFolderAmount] = useState(getStorageItem(`${uid}+${dir}+/_LIBRARY_/`));
  const dispatch = useDispatch();

  useEffect(() => {
    if (dir) {
      getQuantity();
    }
  }, []); // eslint-disable-line

  const getQuantity = () => {
    api
      .post(`/ajax/get_folder_col.php?uid=${uid}&dir=${dir}&dep=/_LIBRARY_/`)
      .then((res) => {
        checkResponseStatus(res.data.ok);
        if (res.data.col.toString() !== folderAmount) {
          setFolderAmount(res.data.col);
          setStorageItem(`${uid}+${dir}+/_LIBRARY_/`, res.data.col);
        }
      })
      .catch((err) => {
        dispatch(
          onSetModals("topMessage", {
            open: true,
            type: "error",
            message: __(`Kоличество файлов в папке не обновлено`)
          })
        );
        console.log(err);
      });
  };

  return (
    <div
      className={classNames(styles.listItemWrap, {
        [styles.active]: isChosen
      })}
      onClick={onClick}
    >
      <div
        className={classNames({
          [styles.listItem]: true
        })}
      >
        {icon ? <img src={icon} alt="icon" className={styles.innerIcon} /> : <div className={styles.innerIcon} />}
        {!listCollapsed && <div className={styles.name}>{title}</div>}
        {dir && <div className={styles.amount}>({folderAmount})</div>}
        <div
          className={styles.dots}
          onClick={(e) => {
            setMouseParams({
              x: e.clientX,
              y: e.clientY,
              width: 200,
              height: 25
            });
          }}
        >
          {setMouseParams && <span />}
        </div>
      </div>
    </div>
  );
}

export default ListItem;

ListItem.defaultProps = {
  title: "",
  icon: "",
  isChosen: false,
  onClick: () => {
    console.log("ListItem empty click");
  },
  listCollapsed: false
};

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  isChosen: PropTypes.bool,
  onClick: PropTypes.func,
  listCollapsed: PropTypes.bool,
  setMouseParams: PropTypes.func,
  dir: PropTypes.string
};
