import React from "react";

import styles from "./CategoryItem.module.sass";
import classNames from "classnames";
import FolderIcon from "./FolderIcon";
import { useDispatch } from "react-redux";
import { onChooseCategory } from "../../../../../Store/actions/CabinetActions";
import PropTypes from "prop-types";

const CategoryItem = ({ category, listCollapsed, listSize, chosen }) => {
  const dispatch = useDispatch();
  const onClickHandler = () => dispatch(onChooseCategory(category));

  return (
    <div
      className={classNames({
        [styles.innerFolderWrap]: true,
        [styles.active]: chosen
      })}
      onClick={onClickHandler}
    >
      <div
        className={classNames({
          [styles.innerFolder]: true,
          [styles?.[`innerFolder_${listSize}`]]: !!listSize
        })}
      >
        <div className={styles.innerFolderName}>
          {category?.image ? (
            <img src={category.image} alt="icon" className={styles.innerFolderIcon} />
          ) : (
            <FolderIcon fill={category?.color} className={styles.innerFolderIcon} />
          )}
          <div className={styles.nameWrap}>
            <div className={styles.Name}>{!listCollapsed && <div className={styles.name}>{category.name}</div>}</div>
          </div>
        </div>
        <div className={styles.innerFolderMedia}>({category.list.length})</div>
      </div>
    </div>
  );
};

export default CategoryItem;

CategoryItem.propTypes = {
  category: PropTypes.object,
  listCollapsed: PropTypes.bool,
  listSize: PropTypes.string,
  chosen: PropTypes.bool
};
