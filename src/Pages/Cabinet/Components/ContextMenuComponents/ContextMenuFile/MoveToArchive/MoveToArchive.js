import React from 'react';
import ActionApproval from "../../../../../../generalComponents/ActionApproval";
import styles from "../../../MyFolders/WorkSpace/WorkSpace.module.sass";
import File from "../../../../../../generalComponents/Files";
import {useDispatch, useSelector} from "react-redux";
import {onDeleteFile, onSetModals} from "../../../../../../Store/actions/CabinetActions";
import api from "../../../../../../api";
import {useLocation} from "react-router";
import {useLocales} from "react-localized";

const endpoints = {
    project: 'project_'
}

function MoveToArchive() {
    const { __ } = useLocales();
    const { filePick, items } = useSelector(s => s.Cabinet.modals.contextMenuModals);
    const contextMenuModals = useSelector(s => s.Cabinet.modals.contextMenuModals);
    const uid = useSelector(s => s.user.uid);
    const file = items[0];
    const dispatch = useDispatch();

    const cancelArchive = () => dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: '', items: [], filePick: null}))

    const path = useLocation().pathname.split("/")[1];

    const addToArchive = (uid, fid, file, options) => {
        api.post(`/ajax/${endpoints[path] ?? ''}file_archive.php?uid=${uid}&fid=${fid}`)
            .then(res => {
                if (res.data.ok === 1) {
                    dispatch(onDeleteFile(file));
                    if(options.single) dispatch(onSetModals('topMessage', {open: true, type: 'message', message: __("Файл добавлен в архив")}));
                    if(options.several) dispatch(onSetModals('topMessage', {open: true, type: 'message', message: __("Выбранные файлы добавлено в архив")}));
                } else console.log(res?.error)
            })
            .catch(() => dispatch(onSetModals('topMessage', {open: true, type: 'error', message: __("Файл не добавлен в архив")})))
            .finally(() => dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: '', items: [], filePick: null})));
    }

    const archiveFile = () => {
        if(filePick.show) {
            filePick.files.forEach((fid, i) => {
                const options = {single: false, several: i === filePick.files.length - 1};
                addToArchive(uid, fid, {fid}, options);
            })
        } else {
            addToArchive(uid, file?.fid, file, {single: true, several: false});
        }
    }

    return <>
        <ActionApproval
                name={ __('Архивировать выбранные файлы') }
                text={__(' Вы действительно хотите переместить в архив выбранные файлы?') }
                set={cancelArchive}
                callback={archiveFile}
                approve={ __('Архивировать') }
            >
                <div className={styles.fileActionWrap}>
                    <File format={filePick.show ? 'FILES' : file?.ext} color={file?.color} />
                </div>
            </ActionApproval>
    </>
}

export default MoveToArchive;