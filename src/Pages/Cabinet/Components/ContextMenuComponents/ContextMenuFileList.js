import React from 'react';
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import {imageSrc} from "../../../../generalComponents/globalVariables";
import {previewFormats} from "../../../../generalComponents/collections";
import {onSetModals} from "../../../../Store/actions/CabinetActions";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router";

export const share_types = {
    myFolders: 'file_share',
    folders: 'file_share',
    files: 'file_share'
}

function ContextMenuFileList({file = {}, filePick, mouseParams, filesPage, menuItem, authorizedSafe = null}) {

    const copy_link_types = {
        myFolders: file?.is_dir === 1 ? 'dir_access_add' : ''
    }

    const contextMenuModals = useSelector(s => s.Cabinet.modals.contextMenuModals);
    const dispatch = useDispatch();
    const { pathname } = useLocation();

    const filterContextMenu = (location, array) => {
        if(location === 'archive') {
            return array.filter(item => ['share', 'download', "print"].includes(item.type));
        }
        if(location === 'safe') {
            return array.filter(item => !['share', 'copyLink'].includes(item.type));
        }
        return array;
    }

    const callbackArrMain = filterContextMenu(pathname.split('/')[1],[
        {type: 'share', img: 'share', name: 'Расшарить', text: ``, callback: () => {dispatch(onSetModals('share', {open: true, fids: filePick.show ? filePick.files : file, action_type: file.is_dir === 1 ? 'dir_access_add' : share_types[menuItem], file}))}},
        {type: 'copyLink', img: 'link-4', name: 'Скопировать ссылку', text: ``, callback: () => {dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: 'CopyLinkShare', items: [file], action_type: copy_link_types[menuItem]}))}},
        {type: 'customize', img: 'edit', name: 'Редактировать файл', text: ``, callback: () => {dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: 'CustomizeFile', items: filePick.show ? filePick.files : [file], title: contextMenuModals.items.length === 1 ? 'Редактирование файла' : 'Редактировать выбранные файлы', filesPage, filePick, menuItem}))}},
        {type: 'customizeSeveral', img: 'editSeveral', name: `Ред. несколько файлов`, text: ``, callback: () => {dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: 'CustomizeFile', items: filePick.show ? filePick.files : [file], title: contextMenuModals.items.length === 1 ? 'Редактирование файла' : 'Редактировать выбранные файлы', filesPage, filePick, menuItem}))}},
        {type: 'archive', img: 'archive', name: 'Переместить в архив', text: `Вы действительно хотите архивировать файл ${file?.name}?`, callback: () => {dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: 'MoveToArchive', items: [file], filePick}))}},
        {type: 'intoZip', img: 'zip', name: 'Сжать в ZIP', text: ``, callback: () => {dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: 'CreateZip', items: filePick.show ? filePick.files : [file], title: 'Сжать в ZIP', filesPage}))}},
        {type: 'intoZipSeveral', img: 'severalZip', name: 'Сжать несколько файлов в Zip', text: ``, callback: () => {dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: 'CreateZip', items: filePick.show ? filePick.files : [file], title: 'Сжать в ZIP', filesPage}))}},
        {type: 'properties', img: 'info', name: 'Свойства', text: ``, callback: () => {dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: 'FileProperty', items: [file]}))}},
        {type: 'download', img: 'download-blue', name: 'Скачать', text: ``, callback: () => {dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: 'DownloadFile', items: [file], authorizedSafe}))}},
        {type: 'print', img: 'print-2', name: 'Печать', text: ``, callback: () => {dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: 'PrintFile', items: [file], authorizedSafe}))}},
    ]);
    const additionalMenuItems = [
        {type: 'delete', img: 'garbage', name: 'Удалить', text: `Вы действительно хотите удалить файл ${file?.name}?`, callback: () => {dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: 'DeleteFile', items: filePick.show ? filePick.files : [file], filePick}))}}
    ];

    const excessItems = () => {
        if(filePick?.show) {
            return ['intoZip', 'properties', 'download', 'print']
        } else {
            if(file?.mime_type) {
                switch (file.mime_type.split('/')[0]) {
                    case 'image': return []
                    case 'video': return ['print']
                    case 'audio': return ['print']
                    case 'application': {
                        return file.mime_type === 'application/x-compressed'
                            ? ['print', 'intoZip', 'intoZipSeveral']
                            : [];
                    }
                    default: return ['print'];
                }
            }
            if(previewFormats.filter(ext => file?.ext.toLowerCase().includes(ext))[0]) return [];
            return ['print'];
        }
    }

    const renderMenuItems = (target, type) => {
        const eItems = excessItems();
        let filteredMenu = [...target];
        filteredMenu.forEach((el, i, arr) => {
            eItems.forEach(excess => {if(excess === el.type) delete arr[i]});
        });
        return filteredMenu.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams?.width}
                height={mouseParams?.height}
                text={item.name}
                callback={() => type.forEach((el, index) => {if(el.type === item.type) {el.callback()}})}
                imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    }

    return <>
        <div>{renderMenuItems(callbackArrMain, callbackArrMain)}</div>
        <div style={{margin: '10px 0 10px 0'}}>{renderMenuItems(additionalMenuItems, additionalMenuItems)}</div>
    </>
}

export default ContextMenuFileList;