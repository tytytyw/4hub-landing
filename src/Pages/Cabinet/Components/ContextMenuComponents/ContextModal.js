import React from 'react';
import {useSelector} from "react-redux";
import CreateZip from "./ContextMenuFile/CreateZip";

// action_type, items = [{}, {}], filesPage?, title, filePick?, menuItem; via props - setCustomizeSeveralFiles



function ContextModal() {

    const contextMenuModals = useSelector(s => s.Cabinet.modals.contextMenuModals);

    return <>
        {contextMenuModals.type === 'CreateZip' ? <CreateZip /> : null}
    </>
}

export default ContextModal;