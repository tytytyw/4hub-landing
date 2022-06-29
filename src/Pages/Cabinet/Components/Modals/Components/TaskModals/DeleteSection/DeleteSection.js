import React from "react";
import PropTypes from "prop-types";
import { useLocales } from "react-localized";
import { useDispatch } from "react-redux";
import ActionApproval from "generalComponents/ActionApproval";
import styles from "../../../../MyFolders/WorkSpace/WorkSpace.module.sass";
import { imageSrc } from "generalComponents/globalVariables";
import { onDeleteDepartment } from "Store/actions/TasksActions";
import { ReactComponent as Bag } from "assets/PrivateCabinet/tasks/bag.svg";

const DeleteSection = ({ closeModal, icon }) => {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const deleteDepartment = () => {
    dispatch(onDeleteDepartment());
  };

  return (
    <ActionApproval
      name={__("Удаление раздела")}
      text={__("Вы действительно хотите удалить выбранный раздел?")}
      set={closeModal}
      callback={deleteDepartment}
      approve={__("Удалить")}
    >
      <div className={styles.fileActionWrap}>
        <div className={styles.fileActionWrap}>
          {icon ? (
            <img
              style={{ width: "100%" }}
              src={`${imageSrc}assets/PrivateCabinet/library/own/${icon}.svg`}
              alt={icon}
            />
          ) : (
            <Bag style={{ width: "100%", height: "100%" }} />
          )}
        </div>
      </div>
    </ActionApproval>
  );
};

export default DeleteSection;

DeleteSection.propTypes = {
  closeModal: PropTypes.func,
  icon: PropTypes.string
};
