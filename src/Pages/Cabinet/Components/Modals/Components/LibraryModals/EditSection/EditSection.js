import React, { useState } from "react";
import classnames from "classnames";
import styles from "./EditSection.module.sass";
import SubmitButtons from "../../SubmitButtons/SubmitButtons";
import {
  imageSrc,
  LIBRARY,
  LIBRARY_MODALS,
  LIBRARY_OWN_ICONS,
  MODALS
} from "../../../../../../../generalComponents/globalVariables";
import PropTypes from "prop-types";
import { editSectionParams } from "../../../../../../../types/Library";
import { useDispatch, useSelector } from "react-redux";
import { useLocales } from "react-localized";
import { onLoadFolders, onSetModals } from "../../../../../../../Store/actions/CabinetActions";
import InputField from "../../../../../../../generalComponents/InputField";
import { ReactComponent as PlayIcon } from "../../../../../../../assets/PrivateCabinet/play-grey.svg";
import api from "api";
import { checkResponseStatus, getDepartment } from "generalComponents/generalHelpers";

function EditSection({ type, params, closeModal }) {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.user.uid);
  const dirName = useSelector((state) => state.Cabinet.folderList.path);
  const [show, setShow] = useState(false);
  const [mistake, setMistake] = useState(false);

  const onChangeTitle = (title) => {
    setMistake(false);
    dispatch(onSetModals(MODALS.LIBRARY, { type, params: { ...params, title } }));
  };

  const onChangeIcon = (icon) => {
    dispatch(onSetModals(MODALS.LIBRARY, { type, params: { ...params, icon } }));
  };

  const showMessage = (message) => {
    dispatch(onSetModals("topMessage", { open: true, type: "message", message }));
    closeModal();
  };
  const editSection = () => {
    if (!params.title) return setMistake(true);
    const method = type === LIBRARY_MODALS.RENAME_SECTION ? "dir_edit.php" : "dir_add.php";
    const modalMessage = type === LIBRARY_MODALS.RENAME_SECTION ? __("Раздел изменён") : __("Раздел добавлен");
    const dir = type === LIBRARY_MODALS.RENAME_SECTION ? dirName.split("/").slice(1).join("") : params.title;
    const dirNameNew = type === LIBRARY_MODALS.RENAME_SECTION ? `&dir_name_new=${params.title}` : "";
    const symbol = params.icon ? `$symbol=${params.icon}` : "";
    const url = `uid=${uid}&dir_name=${dir}${dirNameNew}${symbol}&parent=other&dep=${getDepartment()}`;

    api
      .post(`/ajax/${method}?${url}`)
      .then((res) => {
        if (checkResponseStatus(res.data.ok)) {
          dispatch(onLoadFolders(LIBRARY.API_GET_FOLDERS));
          showMessage(modalMessage);
        } else {
          showMessage(__("Что-то пошло не так. Повторите попытку позже"));
        }
      })
      .catch(() => {
        showMessage(__("Что-то пошло не так. Повторите попытку позже"));
      });
  };

  return (
    <div className={styles.addSectionWrap}>
      <InputField
        model="text"
        value={params.title}
        set={onChangeTitle}
        placeholder={__("Имя раздела")}
        editableClass={"fixedHeight"}
        mistake={mistake}
      />
      <div className={styles.margin} />
      <div
        className={classnames({ [styles.select]: true, [styles.selectShow]: !show, [styles.selectHide]: show })}
        onClick={() => setShow((state) => !state)}
      >
        {params.icon ? (
          <img src={`${imageSrc}assets/PrivateCabinet/library/own/${params.icon}.svg`} alt="icon" />
        ) : (
          <span>{__("Выбирите иконку раздела")}</span>
        )}
        <PlayIcon className={classnames({ [styles.playButton]: true, [styles.playBattonShow]: show })} />
        <div
          className={classnames({
            [styles.optionsList]: true,
            [styles.optionsListHide]: !show,
            [styles.optionsListShow]: show
          })}
        >
          {LIBRARY_OWN_ICONS.map((i) => (
            <img
              key={i}
              src={`${imageSrc}assets/PrivateCabinet/library/own/${i}.svg`}
              alt="icon"
              className={styles.innerIcon}
              onClick={() => onChangeIcon(i)}
            />
          ))}
        </div>
      </div>
      <SubmitButtons type={type} closeModal={closeModal} onSubmit={editSection} />
    </div>
  );
}

export default EditSection;

EditSection.defaultProps = {
  closeModal: () => {}
};

EditSection.propTypes = {
  type: PropTypes.oneOf(Object.values(LIBRARY_MODALS)).isRequired,
  params: editSectionParams.isRequired,
  closeModal: PropTypes.func
};
