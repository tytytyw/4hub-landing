import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Company.module.sass";
import SideList from "./SideList";
import { ReactComponent as SettingsIcon } from "../../../../../assets/BusinessCabinet/SideList/settings.svg";
import { ReactComponent as InfoIcon } from "../../../../../assets/BusinessCabinet/SideList/info.svg";
import { ReactComponent as TeamIcon } from "../../../../../assets/BusinessCabinet/SideList/team.svg";
import { ReactComponent as OrgIcon } from "../../../../../assets/BusinessCabinet/SideList/org.svg";
import WelcomeCard from "./WelcomePage/WelcomeCard";
import GiveAccess from "./WelcomePage/GiveAccess";
import SuccessSend from "./WelcomePage/SuccessSend";
import DocPreview from "./DocPreview";
import Contacts from "./Contacts";
import SearchField from "../../SearchField";
import Notifications from "../../Notifications";
import Profile from "../../Profile/Profile";
import OrgStructure from "./OrgStructure";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import ContextMenuItem from "../../../../../generalComponents/ContextMenu/ContextMenuItem";
import BusinessRegistration from "../../../../StartPage/Components/BusinessRegistration";
import UploadLogo from "./UploadLogo/UploadLogo";
import { onGetUserInfo } from "../../../../../Store/actions/startPageAction";
import { onGetCompanyContacts } from "../../../../../Store/actions/CabinetActions";
import Loader from "../../../../../generalComponents/Loaders/4HUB";
import SuccessMessage from "../../ContextMenuComponents/ContextMenuFile/SuccessMessage/SuccessMessage";
import { useLocales } from "react-localized";

const Company = () => {
  const { __ } = useLocales();
  const [pageOption, setPageOption] = useState({ name: "init" });
  const [mouseParams, setMouseParams] = useState(null);
  const [action, setAction] = useState({ type: "", name: "", text: "" });
  const nullifyAction = () => setAction({ type: "", name: "", text: "" });
  const [businessRegistration, setBusinessRegistration] = useState(false);
  const id_company = useSelector(state => state.user.id_company);
  const col_admins = useSelector(state => state.user.userInfo?.col_admins);
  const [companyName, setCompanyName] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const dispatch = useDispatch();
  const [blob, setBlob] = useState("");
  const [loadingType, setLoadingType] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const sideListData = [
    {
      name: "get_info",
      label: __("Общие сведения"),
      icon: <InfoIcon />,
      children: [
        { name: "standards", label: __("Стандарты компании") },
        { name: "mission", label: __("Миссия компании") },
        { name: "viziya", label: __("Визия") },
        { name: "contacts", label: __("Контакты") }
      ]
    },
    {
      name: "team",
      label: __("Команда"),
      icon: <TeamIcon />,
      children: [
        { name: "add-employee", label: __("Добавить сотрудников") },
        { name: "settings_access", label: __("Настройки доступа") }
      ]
    },
    {
      name: "org_structure",
      label: __("Орг. Структура"),
      icon: <OrgIcon />,
      children: [
        { name: "add-employee", label: __("Добавить сотрудников") },
        { name: "settings_access", label: __("Настройки доступа") }
      ]
    },
    {
      name: "settings",
      label: __("Настройки"),
      icon: <SettingsIcon />,
      children: [
        { name: "add-employee", label: __("Добавить сотрудников") },
        { name: "settings_access", label: __("Настройки доступа") }
      ]
    }
  ];

  const renderMenuItems = (target, type) => {
    return target.map((item, i) => {
      return (
        <ContextMenuItem
          key={i}
          width={mouseParams.width}
          height={mouseParams.height}
          text={item.name}
          callback={() =>
            type.forEach((el, index) => {
              if (el.type === item.type) el.callback(type, index);
            })
          }
          imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
        />
      );
    });
  };

  useEffect(() => {
    setMouseParams(null);
  }, [action, pageOption]);

  useEffect(() => {
    dispatch(onGetUserInfo());
    setBusinessRegistration(col_admins === 1);
  }, [col_admins]); //eslint-disable-line

  useEffect(() => {
    dispatch(onGetCompanyContacts());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.wrapper}>
      {id_company && businessRegistration ? (
        <BusinessRegistration
          setBusinessRegistration={setBusinessRegistration}
        />
      ) : null}

      <SideList
        pageOption={pageOption}
        setPageOption={setPageOption}
        data={sideListData}
        mouseParams={mouseParams}
        setMouseParams={setMouseParams}
        renderMenuItems={renderMenuItems}
        setAction={setAction}
        companyName={companyName}
        setCompanyName={setCompanyName}
        companyLogo={companyLogo}
      />

      <div className={styles.contentWrap}>
        <div className={styles.header}>
          <SearchField selectable={false} />
          <div className={styles.infoHeader}>
            <div className={styles.notifyWrapper}>
              <Notifications />
            </div>
            <Profile />
          </div>
        </div>

        <div
          style={{ position: loadingType ? "relative" : "" }}
          className={styles.content}
        >
          {pageOption.name === "welcome" && (
            <WelcomeCard setPageOption={setPageOption} />
          )}
          {pageOption.name === "give-access" && (
            <GiveAccess setPageOption={setPageOption} />
          )}
          {pageOption.name === "success-mail" && (
            <SuccessSend setPageOption={setPageOption} />
          )}
          {(pageOption.name === "standards" ||
            pageOption.name === "mission" ||
            pageOption.name === "viziya") && (
            <DocPreview
              setPageOption={setPageOption}
              pageOption={pageOption}
              setLoadingType={setLoadingType}
              mouseParams={mouseParams}
              setMouseParams={setMouseParams}
              renderMenuItems={renderMenuItems}
              action={action}
              setAction={setAction}
              nullifyAction={nullifyAction}
              setShowSuccessMessage={setShowSuccessMessage}
            />
          )}
          {pageOption.name === "contacts" && (
            <Contacts
              setLoadingType={setLoadingType}
              setShowSuccessMessage={setShowSuccessMessage}
              mouseParams={mouseParams}
              setMouseParams={setMouseParams}
              renderMenuItems={renderMenuItems}
            />
          )}
          {pageOption.name === "org_structure" && (
            <OrgStructure
              mouseParams={mouseParams}
              setMouseParams={setMouseParams}
              renderMenuItems={renderMenuItems}
              setAction={setAction}
              nullifyAction={nullifyAction}
              setPageOption={setPageOption}
              action={action}
            />
          )}

          {action.type === "uploadLogo" || action.type === "editLogo" ? (
            <UploadLogo
              nullifyAction={nullifyAction}
              setCompanyLogo={setCompanyLogo}
              blob={blob}
              setBlob={setBlob}
            />
          ) : null}
          {loadingType ? (
            <Loader
              position="absolute"
              zIndex={10000}
              containerType="bounceDots"
              type="bounceDots"
              background="white"
              animation={false}
              width="100px"
              height="100px"
            />
          ) : null}
        </div>
      </div>
      {showSuccessMessage && (
        <SuccessMessage
          showSuccessMessage={showSuccessMessage}
          setShowSuccessMessage={setShowSuccessMessage}
        />
      )}
    </div>
  );
};

export default Company;
