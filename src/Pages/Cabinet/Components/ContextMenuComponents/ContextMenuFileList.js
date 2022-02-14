import React from 'react';
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";
import {imageSrc} from "../../../../generalComponents/globalVariables";
import {contextMenuFile, previewFormats} from "../../../../generalComponents/collections";
import {onSetModals} from "../../../../Store/actions/CabinetActions";
import {useDispatch, useSelector} from "react-redux";

function ContextMenuFileList({file = {}, filePick, mouseParams, filesPage}) {

    const contextMenuModals = useSelector(s => s.Cabinet.modals.contextMenuModals);
    const dispatch = useDispatch();

    const callbackArrMain = [
        {type: 'share', name: '', text: ``, callback: () => {}},
        {type: 'copyLink', name: '', text: ``, callback: () => {}},
        {type: 'customize', name: 'Редактирование файла', text: ``, callback: () => {}},
        {type: 'customizeSeveral', name: `Редактирование файлов`, text: ``, callback: () => {}},
        {type: 'archive', name: 'Добавить файл в архив', text: `Вы действительно хотите архивировать файл ${file?.name}?`, callback: () => {}},
        {type: 'intoZip', name: 'Сжать в ZIP', text: ``, callback: () => {dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: 'CreateZip', items: filePick.show ? filePick.files : [file], title: 'Сжать в ZIP', filesPage}))}},
        {type: 'intoZipSeveral', name: 'Сжать в ZIP', text: ``, callback: () => {dispatch(onSetModals('contextMenuModals', {...contextMenuModals, type: 'CreateZip', items: filePick.show ? filePick.files : [file], title: 'Сжать в ZIP', filesPage}))}},
        {type: 'properties', name: 'Свойства', text: ``, callback: () => () => {}},
        {type: 'download', name: 'Загрузка файла', text: ``, callback: () => {}},
        {type: 'print', name: 'Распечатать файл', text: ``, callback: () => {}},
    ];
    const additionalMenuItems = [
        {type: 'delete', name: 'Удаление файла', text: `Вы действительно хотите удалить файл ${file?.name}?`, callback: () => {}}
    ];

    const excessItems = () => {
        if(filePick.show) {
            return ['intoZip', 'properties', 'download', 'print']
        } else {
            if(file.mime_type) {
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
            if(previewFormats.filter(ext => file.ext.toLowerCase().includes(ext))[0]) return [];
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
                callback={() => type.forEach((el, index) => {if(el.type === item.type) el.callback(type, index)})}
                imageSrc={`${imageSrc}assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    }

    return <>
        <div>{renderMenuItems(contextMenuFile.main, callbackArrMain)}</div>
        <div style={{margin: '10px 0 10px 0'}}>{renderMenuItems(contextMenuFile.additional, additionalMenuItems)}</div>
    </>
}

export default ContextMenuFileList;