import React, {useLayoutEffect, useRef, useState} from 'react';

import styles from './MutualEdit.module.sass';
import PopUp from "../../../../generalComponents/PopUp";
import MiniToolBar from "../WorkElements/MiniToolBar/MiniToolBar";
import ImagePanel from "./ImagePanel/ImagePanel";
import DrawZone from "./DrawZone/DrawZone";
import {useSelector, useDispatch} from "react-redux";
import {onSetModals, onSetPaint} from "../../../../Store/actions/CabinetActions";
import api from "../../../../api";
import {loadDest} from "../../../../generalComponents/collections";
import {dataURLintoBlobImage} from "../../../../generalComponents/generalHelpers";

function MutualEdit({menuItem}) {

    const canvasRef = useRef();
    const canvasWrapRef = useRef();
    const mainRef = useRef();
    const inputRef = useRef();
    const uid = useSelector(s => s.user.uid);
    const authorizedSafe = useSelector(state => state.Cabinet.authorizedSafe);
    const mutualEdit = useSelector(s => s.Cabinet.paint.mutualEdit);
    const project = useSelector(s => s.Cabinet.project);
    const [images, setImages] = useState({loaded: [], saved: [], chosen: []});
    const dispatch = useDispatch();

    const [params, setParams] = useState({isLoading: false, isChoosing: false})

    const pushLoaded = (files) => {
        setImages(s => ({...s, loaded: [...s.loaded, ...files].slice(0,4)}));
    }

    const deleteLoaded = (i) => {
        setImages(s => ({...s, loaded: s.loaded.filter((el, index) => i !== index)}))
    }

    const addToChosen = (fid) => {
        if(images.chosen.indexOf(fid) === -1) {
            setImages(s => ({...s, chosen: [...s.chosen, fid]}));
        } else {
            setImages(s => ({...s, chosen: deleteChosen(fid)}));
        }
    }

    const deleteChosen = (fid) => {
        let chosen = [...images.chosen];
        if([...images.chosen].indexOf(fid) !== -1) {
            chosen.splice([...images.chosen].indexOf(fid), 1);
        }
        return chosen;
    }

    const deleteSaved = (i) => {
        setImages(s => ({...s, saved: s.saved.filter((el, index) => i !== index), chosen: deleteChosen(images.saved[i].fid)}))
    }

    const saveImage = async (file) => {

        const image = new File([dataURLintoBlobImage(file)], "Совместное редактирование.png");

        let data = new FormData();
        data.append('uid', uid);
        data.append('myfile', image);
        data.append('fileName', `Совместное редактирование`);
        data.append('tag', '');
        data.append('pass', '');
        data.append('color', '');
        data.append('symbol', '');
        data.append('emoji', '');
        data.append('dir', mutualEdit.destination);

        if(menuItem === 'safe') {
            data.append('id_safe', authorizedSafe.id_safe);
            data.append('code', authorizedSafe.code);
        }
        if(menuItem === 'project') {
            data.append('id_project', project?.chosenProject?.id);
        }

        setParams(s => ({...s, isLoading: true}));
        return await api.post(`/ajax/${loadDest[menuItem] ?? ''}file_add.php`, data)
            .then(res => {
                if(!!res?.data?.ok) {
                    setImages(s => ({...s, saved: [...s.saved, {src: file, fid: res?.data?.fid || ''}]}));
                } else {
                    dispatch(onSetModals('error', {open: true, message: `Файл не сохранен, попробуйте еще раз`}));
                }
            })
            .catch(err => {dispatch(onSetModals('error', {open: true, message: `${err}`}))})
            .finally(() => setParams(s => ({...s, isLoading: false})));
    }

    useLayoutEffect(() => {
        if (mutualEdit.data.length > 0 && canvasRef?.current) {
            pushLoaded(mutualEdit.data);
            dispatch(onSetPaint('mutualEdit', {...mutualEdit, data: []}));
        }
    }, []); //eslint-disable-line

    const closeMutualEdit = () => dispatch(onSetPaint('mutualEdit', {...mutualEdit, open: false, data: [], destination: ''}))

    return<PopUp set={closeMutualEdit}>
        <div className={styles.mutualEdit} ref={canvasWrapRef}>
            <header className={styles.header}>
                <MiniToolBar
                    canvasRef={canvasRef}
                    canvasWrapRef={canvasWrapRef}
                    toolBarType="mutualEdit"
                    title="Сравнить документы/файлы"
                    images={images.loaded}
                    saveImageToPanel={saveImage}
                    chosen={images.chosen}
                    isLoading={params.isLoading}
                />
            </header>
            <div className={styles.mainField}>
                <ImagePanel
                    addImage={true}
                    pushImages={pushLoaded}
                    images={images.loaded}
                    deleteImage={deleteLoaded}
                    inputRef={inputRef}
                />
                <DrawZone
                    canvasRef={canvasRef}
                    mainRef={mainRef}
                    images={images}
                    params={params}
                    setParams={setParams}
                    inputRef={inputRef}
                />
                <div className={styles.rightPanelWrap}>
                    <div className={styles.asideWrap}>
                        <ImagePanel
                            images={images.saved}
                            deleteImage={deleteSaved}
                            isChoosing={params.isChoosing}
                            addToChosen={addToChosen}
                            chosen={images.chosen}
                        />
                    </div>
                    <div className={styles.buttonsWrap}>
                        <div
                            className={`${styles.sendSavedButton} ${params.isChoosing ? styles.choosing : ''}`}
                            onClick={() => setParams(s => ({...s, isChoosing: !params.isChoosing}))}
                        >Выбрать</div>
                        <div className={`${styles.sendSavedButton} ${images.chosen.length === 0 ? styles.notActive : ''}`}>Отправить</div>
                    </div>
                </div>
            </div>
        </div>
    </PopUp>
}

export default MutualEdit
