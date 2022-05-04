import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./AddContact.module.sass";
import ActionApproval from "../../../../../generalComponents/ActionApproval";
import InputField from "../../../../../generalComponents/InputField";
import api from "../../../../../api";
import { ReactComponent as ContactsDatabaseIcon } from "../../../../../assets/PrivateCabinet/contactsDatabase.svg";
import classNames from "classnames";
import { onGetCompanyContacts, onGetContacts } from "../../../../../Store/actions/CabinetActions";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

function AddContact({ action, nullifyAction, setShowSuccessPopup }) {
  const { __ } = useLocales();
  const [name, setName] = useState("");
  const [sname, setSname] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [requiredInputError, setRequiredInputError] = useState(false);
  const id_company = useSelector((state) => state.user.id_company);
  const uid = useSelector((state) => state.user.uid);

  const dispatch = useDispatch();

  const onSubmit = () => {
    if (name && (tel?.length > 8 || checkEmail(email))) {
      const addCompanyParams = () => (id_company ? `&id_company=${id_company}` : "");
      setTimeout(() => nullifyAction(), 100);
      const formData = new FormData();
      formData.append("tel", createContactArray(tel));
      formData.append("email", createContactArray(email));
      api
        .post(
          `/ajax/${
            id_company ? "org_" : ""
          }contacts_add.php?uid=${uid}&name=${name}&sname=${sname}${addCompanyParams()}`,
          formData
        )
        .then(() => {
          dispatch(id_company ? onGetCompanyContacts() : onGetContacts());
          setShowSuccessPopup({
            title: __("База контактов успешно добавлена"),
            text: __("База контактов успешно добавлен в Вашу книгу контактов")
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else setRequiredInputError(true);
  };

  const createContactArray = (value) => {
    const result = [];
    result.push(value);
    return JSON.stringify(result);
  };

  const checkEmail = (email) => email?.includes("@") && email?.length > 2;

  useEffect(() => {
    setName(name ? (name) => name[0].toUpperCase() + name.slice(1) : "");
    setSname(sname ? (sname) => sname[0].toUpperCase() + sname.slice(1) : "");
  }, [name, sname]);

  return (
    <div className={styles.wrapper}>
      <ActionApproval
        name={action.name}
        set={nullifyAction}
        callback={onSubmit}
        approve={__("Добавить")}
        childrenWidth={"100%"}
      >
        <div className={styles.inputWrap}>
          <InputField
            mistake={requiredInputError && !name}
            value={name}
            set={setName}
            height={40}
            placeholder={__("Имя")}
          />
        </div>
        <div className={styles.inputWrap}>
          <InputField value={sname} set={setSname} height={40} placeholder={__("Фамилия")} />
        </div>
        <div className={styles.inputWrap}>
          <InputField
            mistake={requiredInputError && !(tel?.length > 8) && !checkEmail(email)}
            value={tel}
            set={setTel}
            phone={true}
            height={40}
            placeholder={__("Номер телефона")}
          />
        </div>
        <div className={styles.inputWrap}>
          <InputField
            mistake={requiredInputError && !(tel?.length > 8) && !checkEmail(email)}
            value={email}
            set={setEmail}
            height={40}
            placeholder={__("Email")}
          />
        </div>
        <div>
          <p className={styles.text}>{__("или")}</p>
          <div className={styles.addContactsDatabase}>
            <ContactsDatabaseIcon className={styles.icon} />
            <span className={classNames(styles.text, styles.button)}>{__("Загрузите")}</span>
            <span className={styles.text}>{__("базу контактов")}</span>
          </div>
        </div>
      </ActionApproval>
    </div>
  );
}

export default AddContact;

AddContact.propTypes = {
  action: PropTypes.object,
  nullifyAction: PropTypes.func,
  setShowSuccessPopup: PropTypes.func
};
