import React, {useState} from 'react';
import styles from "./Company.module.sass";
import SideList from "./SideList";
import {ReactComponent as SettingsIcon} from "../../../../../assets/BusinessCabinet/SideList/settings.svg";
import {ReactComponent as InfoIcon} from "../../../../../assets/BusinessCabinet/SideList/info.svg";
import {ReactComponent as TeamIcon} from "../../../../../assets/BusinessCabinet/SideList/team.svg";
import {ReactComponent as OrgIcon} from "../../../../../assets/BusinessCabinet/SideList/org.svg";
import WelcomeCard from "./WelcomePage/WelcomeCard";
import GiveAccess from "./WelcomePage/GiveAccess";
import SuccessSend from "./WelcomePage/SuccessSend";
import AddEmployee from "./AddEmployee";
import Standards from "./Standards";
import SearchField from "../../SearchField";
import Notifications from "../../Notifications";
import Profile from "../../Profile";

const Company = () => {

    const [pageOption, setPageOption] = useState('welcome')

    const sideListData = [
        {name: 'settings', label: 'Настройки', icon: <SettingsIcon/>, children: [
            {name: 'add-employee', label: 'Добавить сотрудников'},
            {name: 'settings_access', label: 'Настройки доступа'},
        ]},
        {name: 'gen_info', label: 'Общие сведения', icon: <InfoIcon/>, children: [
            {name: 'standards', label: 'Стандарты компании'},
            {name: 'mission', label: 'Миссия компании'},
            {name: 'viziya', label: 'Визия'},
            {name: 'contacts', label: 'Контакты'},
        ]},
        {name: 'team', label: 'Команда', icon: <TeamIcon/>, children: [
            {name: 'add-employee', label: 'Добавить сотрудников'},
            {name: 'settings_access', label: 'Настройки доступа'},
        ]},
        {name: 'org_structure', label: 'Орг. Структура', icon: <OrgIcon/>, children: [
            {name: 'add-employee', label: 'Добавить сотрудников'},
            {name: 'settings_access', label: 'Настройки доступа'},
        ]},
    ]

    return (
        <>
            <SideList
                pageOption={pageOption}
                setPageOption={setPageOption}
                data={sideListData}
            />

            <div className={styles.contentWrap}>

                <div className={styles.header}>
                    <SearchField selectable={false}/>
                    <div className={styles.infoHeader}>
                        <div className={styles.notifyWrapper}>
                            <Notifications/>
                        </div>
                        <Profile/>
                    </div>
                </div>

                <div className={styles.content}>

                    {pageOption === 'welcome' && <WelcomeCard setPageOption={setPageOption}/>}
                    {pageOption === 'give-access' && <GiveAccess setPageOption={setPageOption}/>}
                    {pageOption === 'success-mail' && <SuccessSend setPageOption={setPageOption}/>}
                    {pageOption === 'add-employee' && <AddEmployee setPageOption={setPageOption}/>}
                    {pageOption === 'standards' && <Standards setPageOption={setPageOption}/>}

                </div>

            </div>
        </>
    );
};

export default Company;