import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { onGetContacts } from "../../../../Store/actions/CabinetActions";

import styles from "./MyProfile.module.sass";
import { ReactComponent as UploadIcon } from "../../../../assets/PrivateCabinet/upload.svg";

import SearchField from "../SearchField";
import StorageSize from "../StorageSize";
import Notifications from "../Notifications";
import Profile from "../Profile/Profile";
import UserForm from "./UserForm";
import BottomPanel from "../BottomPanel";
import Support from "./Support";
import TariffPlan from "./TariffPlan";
import Contacts from "./Contacts";
import Programs from "./Programs";
import TellFriend from "./TellFriends/TellFriend";
import PrimaryButton from "./PrimaryButton";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const MyProfile = ({ defaultPageOption }) => {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const [pageOption, setPageOption] = useState(null);
  const [popup, setPopup] = useState(false);
  useEffect(() => {
    setPageOption(defaultPageOption);
  }, [defaultPageOption]);

  useEffect(() => {
    dispatch(onGetContacts());
  }, []); // eslint-disable-line

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <SearchField />
        <div className={styles.infoHeader}>
          <StorageSize />
          <Notifications />
          <Profile />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.buttons}>
          <div className={styles.buttonsList}>
            <PrimaryButton
              text={__("Личные данные")}
              active={pageOption === "personal_data"}
              onClick={() => setPageOption("personal_data")}
            />
            <PrimaryButton
              text={__("Служба поддержки")}
              active={pageOption === "support"}
              onClick={() => setPageOption("support")}
            />
            <PrimaryButton
              text={__("Тарифный план")}
              active={pageOption === "tariff_plan"}
              onClick={() => setPageOption("tariff_plan")}
            />
            <PrimaryButton
              text={__("Контакты")}
              active={pageOption === "contacts"}
              onClick={() => setPageOption("contacts")}
            />
            <PrimaryButton
              text={__("Подключенные прораммы")}
              active={pageOption === "programs"}
              onClick={() => setPageOption("programs")}
            />
            <div className={styles.buttonsRight}>
              <PrimaryButton
                text={__("Рассказать друзьям")}
                icon={<UploadIcon />}
                alt="Upload"
                active={popup}
                onClick={() => setPopup(true)}
              />
            </div>
          </div>
        </div>

        {pageOption === "personal_data" && <UserForm />}
        {pageOption === "support" && <Support />}
        {pageOption === "tariff_plan" && <TariffPlan />}
        {pageOption === "contacts" && <Contacts />}
        {pageOption === "programs" && <Programs />}
      </div>

      {popup && <TellFriend set={setPopup} />}

      <BottomPanel />
    </div>
  );
};

export default MyProfile;

MyProfile.propTypes = {
  defaultPageOption: PropTypes.string
};

MyProfile.defaultProps = {
  defaultPageOption: "personal_data"
};
