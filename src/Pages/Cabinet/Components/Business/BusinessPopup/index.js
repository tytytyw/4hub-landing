import React from 'react';
import PopUp from "../../CalendarPage/Popup";
import BusinessRegistration from "../../../../StartPage/Components/BusinessRegistration";

const BusinessPopup = ({set}) => {
    return (
        <PopUp set={set}>
            <BusinessRegistration/>
        </PopUp>
    );
};

export default BusinessPopup;