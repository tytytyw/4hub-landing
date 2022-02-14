import React from 'react';
import {useSelector} from "react-redux";
import CreateZip from "./ContextMenuFile/CreateZip";
import CustomizeFile from "./ContextMenuFile/CustomizeFile";

// action_type, items = [{}, {}], filesPage?, title, filePick?, menuItem; via props - setCustomizeSeveralFiles



function ContextModal({saveCustomizeSeveralFiles}) {

    const contextMenuModals = useSelector(s => s.Cabinet.modals.contextMenuModals);

    return <>
        {contextMenuModals.type === 'CreateZip' ? <CreateZip /> : null}
        {contextMenuModals.type === 'CustomizeFile' ? <CustomizeFile saveCustomizeSeveralFiles={saveCustomizeSeveralFiles} /> : null}
    </>
}

export default ContextModal;