import React from 'react';

import styles from './OptionButtomLine.module.sass';
import {onSetModals} from "../../../../../Store/actions/CabinetActions";
import {useDispatch, useSelector} from "react-redux";
import {share_types} from "../../ContextMenuComponents/ContextMenuFileList";
import {useLocation} from "react-router";

const OptionButtomLine = ({
      filePick, setAction, action, callbackArrMain, nullifyFilePick, share, chosenFile, archive, filesPage, menuItem
}) => {

    const contextMenuModals = useSelector(s => s.Cabinet.modals.contextMenuModals);
    const dispatch = useDispatch();

    const {pathname} = useLocation();

    const onZip = () => chosenFile ? dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: 'CreateZip', items: filePick.files, title: 'Сжать в ZIP', filesPage})) : null;

    const onEdit = () => chosenFile ? dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: 'CustomizeFile', items: filePick.files, title: contextMenuModals.items.length === 1 ? 'Редактирование файла' : 'Редактировать выбранные файлы', filesPage, filePick, menuItem})) : null;

    const onShare = () => chosenFile ? dispatch(onSetModals('share', {open: true, fids: filePick.files, action_type: share_types[pathname.split('/')[1]]})) : null;

    const onMoveToArchive = () => chosenFile ? dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: 'MoveToArchive', items: filePick.files, filePick})) : null;

    return (
        <div className={styles.optionBottomLine}>
            <div className={styles.cancel} onClick={nullifyFilePick}>Отмена</div>
            <div
                className={`${filePick.files.length > 0 ? styles.edit : styles.buttonDisabled}`}
                onClick={onZip}
            >Сжать в ZIP</div>
            <div
                className={`${filePick.files.length > 0 ? styles.edit : styles.buttonDisabled}`}
                onClick={onShare}
            >Расшарить</div>
            <div
                className={`${filePick.files.length > 0 ? styles.edit : styles.buttonDisabled}`}
                onClick={onMoveToArchive}
            >Пер. в архив</div>
            <div
                className={`${filePick.files.length > 0 ? styles.edit : styles.buttonDisabled}`}
                onClick={onEdit}
            >Редактировать</div>
        </div>
    )
}

export default OptionButtomLine;