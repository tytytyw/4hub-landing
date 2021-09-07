import React, {useRef, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import styles from './ServePanel.module.sass';
import classNames from "classnames";

import {
    onChooseFiles,
    onSetFileSize,
    onSortFile,
    onChangeFilterFigure,
    onChangeFilterEmoji,
    onChangeFilterColor,
    onSetReverseCriterion
} from '../../../Store/actions/PrivateCabinetActions';
import { ReactComponent as BarsIcon } from '../../../assets/PrivateCabinet/bars.svg';
import { ReactComponent as LinesIcon } from '../../../assets/PrivateCabinet/lines.svg';
import { ReactComponent as PreviewIcon } from '../../../assets/PrivateCabinet/preview.svg';
import { ReactComponent as VerticalLinesIcon } from '../../../assets/PrivateCabinet/vertical-lines.svg';
import { ReactComponent as MenuIcon } from '../../../assets/PrivateCabinet/menu.svg';
import { ReactComponent as ShareIcon } from '../../../assets/PrivateCabinet/share.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/PrivateCabinet/delete.svg';
import { ReactComponent as FileSize } from '../../../assets/PrivateCabinet/file_size.svg';
import { ReactComponent as AddFileIcon } from '../../../assets/PrivateCabinet/add_file.svg';
import { ReactComponent as AddFolderIcon } from '../../../assets/PrivateCabinet/add_folder.svg';
import Colors from "../../../generalComponents/Elements/Colors";
import Signs from "../../../generalComponents/Elements/Signs";
import Emoji from "../../../generalComponents/Elements/Emoji";
import ContextMenuItem from "../../../generalComponents/ContextMenu/ContextMenuItem";
import {onSetWorkElementsView} from "../../../Store/actions/PrivateCabinetActions";
import ContextMenu from "../../../generalComponents/ContextMenu";
import {contextMenuCreateFile, contextMenuFilters} from "../../../generalComponents/collections";

const ServePanel = ({
         chosenFile, setAction, fileSelect, archive, share, chooseSeveral, filePick,
        setFileAddCustomization, fileAddCustomization, disableWorkElementsView, addFolder, addFile
}) => {
    const [mouseParams, setMouseParams] = useState(null);
    const [typeContext, setTypeContext] = useState('');
    // const [reverseCriterea, setReverseCriterea] = useState({byName: false});
    const filterRef = useRef();
    const createRef = useRef();
    const size = useSelector(state => state.PrivateCabinet.size);
    const view = useSelector(state => state.PrivateCabinet.view);
    const search = useSelector(state => state.PrivateCabinet.search);
    const fileCriterion = useSelector(state => state.PrivateCabinet.fileCriterion);
    const fileList = useSelector(state => state.PrivateCabinet.fileList);
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

    const setFilter = (sorting) => {
        dispatch(onSortFile(sorting));
        dispatch(onChooseFiles(fileList.path, search, 1, '', ''));
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

    const renderSortingItems = (target, callback) => (
        target.map((item, i) => {
            return <div
                onClick={() => callback(item.ext)}
                className={styles.contextSortingItem}
                key={i}
            >
                <div className={styles.chosen}>{item.ext === fileCriterion.sorting ? <img src={`/assets/PrivateCabinet/check.svg`} alt='check' /> : null}</div>
                <div>{fileCriterion.reverse[item.ext] ? item.reverseName : item.name}</div>
                {item.ext === 'byName' ? <div
                    className={styles.switch}
                    onClick={() => dispatch(onSetReverseCriterion(item.ext))}
                ><img src={`/assets/PrivateCabinet/vectors.svg`} alt='img' /></div> : null}
            </div>
        })
    )

    const setFigure = (value) => {
        dispatch(onChangeFilterFigure(value));
        dispatch(onChooseFiles(fileList.path, search, 1));
    }
    const setColor = (value) => {
        dispatch(onChangeFilterColor(value));
        dispatch(onChooseFiles(fileList.path, search, 1));
    }
    const setEmoji = (value) => {
        dispatch(onChangeFilterEmoji(value));
        dispatch(onChooseFiles(fileList.path, search, 1));
    }

    return (
        <div className={styles.servePanelWrap}>
            <div className={styles.groupStart}>
            {!disableWorkElementsView && <div className={styles.viewPanel}>
                    <div onClick={() => dispatch(onSetWorkElementsView('bars'))} className={`${view === 'bars' ? styles.iconViewChosen : styles.iconView}`} ><BarsIcon /></div>
                    <div onClick={() => dispatch(onSetWorkElementsView('lines'))} className={`${view === 'lines' ? styles.iconViewChosen : styles.iconView}`} ><LinesIcon /></div>
                    <div onClick={() => dispatch(onSetWorkElementsView('preview'))} className={`${view === 'preview' ? styles.iconViewChosen : styles.iconView}`}><PreviewIcon /></div>
                    <div onClick={() => dispatch(onSetWorkElementsView('workLinesPreview'))} className={`${view === 'workLinesPreview' ? styles.iconViewChosen : styles.iconView}`}><VerticalLinesIcon /></div>
            </div>}
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


                    {addFile && <div
                        onClick={() => addFile()}
                        className={classNames(styles.iconView, styles.addIcon)}
                    >
                        <AddFileIcon className={styles.iconSVG} />
                    </div>}

                    {addFolder && <div
                        onClick={() => addFolder(true)}
                        className={classNames(styles.iconView, styles.addIcon)}
                    >
                        <AddFolderIcon className={styles.iconSVG} />
                    </div>}

                    <div className={classNames(styles.iconViewAF)}>
                        <img src="./assets/PrivateCabinet/file-plus.svg" alt="File plus"/>
                    </div>

                    <div className={classNames(styles.iconViewAF)}>
                        <img src="./assets/PrivateCabinet/folder-plus.svg" alt="File plus"/>
                    </div>

                    <div className={styles.infoBlock}>
                        <p>Срок хранения папки ( 1 день  до 12.08.2020, 08:45 )</p>
                    </div>

                </div>

            </div>
            <div className={styles.groupEnd}>

                {/*<div className={styles.buttons}>
                    <div
                        ref={createRef}
                        className={styles.createButton}
                        onClick={e => openContextMenu(e, 'createFile')}
                    ><span>Создать</span><div /></div>
                    <label className={styles.downloadButton} onClick={() => fileSelect()}>Загрузить</label> setBlob({...blob, show: true})
                </div>*/}

                {chosenFile &&
                <div className={styles.iconButtons}>
                    <div
                        className={styles.iconView}
                        onClick={() => {if(chosenFile) share()}}
                    ><ShareIcon className={styles.iconShare} /></div>
                    <div
                        className={styles.iconView}
                        onClick={() => {
                            if(chosenFile) setAction({type: 'delete', name: 'Удаление файла', text: `Вы действительно хотите удалить файл ${chosenFile?.name}?`});
                        }}
                    ><DeleteIcon className={styles.iconTrash} /></div>
                </div>}

            </div>
            {mouseParams !== null ? <ContextMenu params={mouseParams} setParams={setMouseParams} itemRef={typeContext === 'createFile' ? createRef : filterRef} customClose={typeContext !== 'createFile'}>
                {typeContext === 'filter' ? <div>{renderSortingItems(contextMenuFilters.main, setFilter)}</div> : null}
                {typeContext === 'filter' ? <Colors color={fileCriterion.filters.color} setColor={setColor} title='По цвету' editableClass='minify' /> : null}
                {typeContext === 'filter' ? <Signs sign={fileCriterion.filters.figure} setSign={setFigure} title='По значкам' editableClass='minify' /> : null}
                {typeContext === 'filter' ? <Emoji emoji={fileCriterion.filters.emoji} setEmoji={setEmoji} title='По эмоджи' editableClass='minify' /> : null}
                {typeContext === 'createFile' ? <div className={styles.createFileGroup}>{renderMenuItems(contextMenuCreateFile.other, createFile, '/assets/PrivateCabinet/contextMenuCreateFile/')}</div> : null}
                {typeContext === 'createFile' ? <div className={styles.createFileGroup}>{renderMenuItems(contextMenuCreateFile.microsoft, createFile, '/assets/PrivateCabinet/contextMenuCreateFile/')}</div> : null}
                {typeContext === 'createFile' ? <div className={styles.createFileGroupLast}>{renderMenuItems(contextMenuCreateFile.google, createFile, '/assets/PrivateCabinet/contextMenuCreateFile/')}</div> : null}
            </ContextMenu> : null}
        </div>
    )
}

export default ServePanel;
