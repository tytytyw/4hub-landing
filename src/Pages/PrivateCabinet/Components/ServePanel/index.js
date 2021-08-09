import React, {useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import styles from './ServePanel.module.sass';
import {onChooseFiles, onSetFileSize, onSortFile} from '../../../../Store/actions/PrivateCabinetActions';
import {onSetWorkElementsView} from '../../../../Store/actions/PrivateCabinetActions';
import { ReactComponent as BarsIcon } from '../../../../assets/PrivateCabinet/bars.svg';
import { ReactComponent as LinesIcon } from '../../../../assets/PrivateCabinet/lines.svg';
import { ReactComponent as PreviewIcon } from '../../../../assets/PrivateCabinet/preview.svg';
import { ReactComponent as VerticalLinesIcon } from '../../../../assets/PrivateCabinet/vertical-lines.svg';
import { ReactComponent as MenuIcon } from '../../../../assets/PrivateCabinet/menu.svg';
import { ReactComponent as SafeIcon } from '../../../../assets/PrivateCabinet/safe.svg';
import { ReactComponent as ShareIcon } from '../../../../assets/PrivateCabinet/share.svg';
import { ReactComponent as DeleteIcon } from '../../../../assets/PrivateCabinet/delete.svg';
import { ReactComponent as FileSize } from '../../../../assets/PrivateCabinet/file_size.svg';
import {contextMenuFilters, contextMenuCreateFile} from '../../../../generalComponents/collections';
import ContextMenu from "../../../../generalComponents/ContextMenu";
import ContextMenuItem from "../../../../generalComponents/ContextMenu/ContextMenuItem";

const ServePanel = ({
         chosenFile, setAction, fileSelect, archive, share, chooseSeveral, filePick,
        setFileAddCustomization, fileAddCustomization,
}) => {
    const [mouseParams, setMouseParams] = useState(null);
    const [typeContext, setTypeContext] = useState('');
    const filterRef = useRef();
    const createRef = useRef();
    const size = useSelector(state => state.PrivateCabinet.size);
    const view = useSelector(state => state.PrivateCabinet.view);
    const search = useSelector(state => state.PrivateCabinet.search);
    const dispatch = useDispatch();
    const changeSize = (s) => {
        const sizes = ['small', 'medium', 'big'];
        if(s === sizes[sizes.length - 1]) return sizes[0]
        return sizes[sizes.indexOf(s) + 1];
    }

    const openContextMenu = (e, type) => {
        const width = type === 'createFile' ? 215 : 180;
        const height = type === 'createFile' ? 35 : 30;
        setMouseParams({x: e.clientX, y: e.clientY, width, height});
        setTypeContext(type);
    }

    const setFilter = (filter) => {
        setTypeContext(filter);
        dispatch(onSortFile(filter));
        dispatch(onChooseFiles('global/all', search, 1));
    };

    const createFile = (ext) => {
        const file = {
            file: {name: `No Name.${ext}`, size: 0},
            options: {}
        }
        setFileAddCustomization({...fileAddCustomization, show: true, file, create: true})
        setTypeContext('');
    };

    const renderMenuItems = (target, callback, src) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                imageSrc={src ? `${src + item.img}.svg` : ''}
                callback={item?.ext ? () => {callback(item.ext)} : ''}
            />
        })
    }

    const renderSortingItems = (target, callback, src) => (
        target.map((item, i) => {
            return <div className={styles.contextSortingItem} key={i}>
                <div className={styles.chosen}><img src={`/assets/PrivateCabinet/check.svg`} alt='check' /></div>
                <div>{item.name}</div>
                {item.ext === 'byName' ? <div className={styles.switch}><img src={`/assets/PrivateCabinet/vectors.svg`} alt='img' /></div> : null}
            </div>
        })
    )

    return (
        <div className={styles.servePanelWrap}>
            <div className={styles.groupStart}>
                <div className={styles.viewPanel}>
                    <div onClick={() => dispatch(onSetWorkElementsView('bars'))} className={`${view === 'bars' ? styles.iconViewChosen : styles.iconView}`} ><BarsIcon /></div>
                    <div onClick={() => dispatch(onSetWorkElementsView('lines'))} className={`${view === 'lines' ? styles.iconViewChosen : styles.iconView}`} ><LinesIcon /></div>
                    <div onClick={() => dispatch(onSetWorkElementsView('preview'))} className={`${view === 'preview' ? styles.iconViewChosen : styles.iconView}`}><PreviewIcon /></div>
                    <div onClick={() => dispatch(onSetWorkElementsView('workLinesPreview'))} className={`${view === 'workLinesPreview' ? styles.iconViewChosen : styles.iconView}`}><VerticalLinesIcon /></div>
                </div>
                <div className={styles.filterPanel}>
                    <div
                        onClick={() => dispatch(onSetFileSize(changeSize(size)))}
                        className={`
                            ${styles.iconView} 
                            ${styles.iconSize} 
                            ${size === 'small' ? styles.samllSize : null} 
                            ${size === 'medium' ? styles.mediumSize : null} 
                            ${size === 'big' ? styles.bigSize : null} 
                        `}
                    ><FileSize className={styles.iconSVG} /></div>
                    <div
                        ref={filterRef}
                        className={styles.iconView}
                        onClick={e => openContextMenu(e, 'filter')}
                    ><MenuIcon className={styles.iconSVG} /><div /></div>
                    <span
                        className={filePick?.show ? styles.chooseButtonActive : styles.chooseButton}
                        onClick={chooseSeveral}
                    >Выбрать</span>
                </div>
            </div>
            <div className={styles.groupEnd}>
                <div className={styles.buttons}>
                    <div
                        ref={createRef}
                        className={styles.createButton}
                        onClick={e => openContextMenu(e, 'createFile')}
                    ><span>Создать</span><div /></div>
                    <label className={styles.downloadButton} onClick={() => fileSelect()}>Загрузить</label> {/*setBlob({...blob, show: true})*/}
                </div>
                <div className={styles.iconButtons}>
                    <div
                        className={`${chosenFile ? styles.iconView : styles.iconDisabled}`}
                        onClick={() => {if(chosenFile) archive()}}
                    ><SafeIcon className={styles.iconSafe} /></div>
                    <div
                        className={`${chosenFile ? styles.iconView : styles.iconDisabled}`}
                        onClick={() => {if(chosenFile) share()}}
                    ><ShareIcon className={styles.iconShare} /></div>
                    <div
                        className={`${chosenFile ? styles.iconView : styles.iconDisabled}`}
                        onClick={() => {
                            if(chosenFile) setAction({type: 'delete', name: 'Удаление файла', text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`});
                        }}
                    ><DeleteIcon className={styles.iconTrash} /></div>
                </div>
            </div>
            {mouseParams !== null ? <ContextMenu params={mouseParams} setParams={setMouseParams} itemRef={typeContext === 'createFile' ? createRef : filterRef} customClose={typeContext !== 'createFile'}>
                {typeContext === 'filter' ? <div>{renderSortingItems(contextMenuFilters.main, setFilter, '')}</div> : null}
                {typeContext === 'createFile' ? <div className={styles.createFileGroup}>{renderMenuItems(contextMenuCreateFile.other, createFile, '/assets/PrivateCabinet/contextMenuCreateFile/')}</div> : null}
                {typeContext === 'createFile' ? <div className={styles.createFileGroup}>{renderMenuItems(contextMenuCreateFile.microsoft, createFile, '/assets/PrivateCabinet/contextMenuCreateFile/')}</div> : null}
                {typeContext === 'createFile' ? <div className={styles.createFileGroupLast}>{renderMenuItems(contextMenuCreateFile.google, createFile, '/assets/PrivateCabinet/contextMenuCreateFile/')}</div> : null}
            </ContextMenu> : null}
        </div>
    )
}

export default ServePanel;
