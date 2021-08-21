import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import api from '../../../../api';
import {previewTypes} from '../../../../generalComponents/collections';
import styles from './PreviewFile.module.sass';
import PopUp from '../../../../generalComponents/PopUp';
import File from "../../../../generalComponents/Files";

const PreviewFile = ({setFilePreview, file, filePreview, setLoadingType}) => {

    const uid = useSelector(state => state.user.uid);
    const standardPrev = <div className={styles.filePreviewWrapWrap}><div className={styles.filePreviewWrap}><File format={file?.ext} color={file?.color} /></div></div>;

    const set = () => setFilePreview({...filePreview, view: false, file: null});
    const [previewReq, setPreviewReq] = useState({sent: false, data: null});

    const getPreview = () => {
        if(!previewReq.sent) {
            setLoadingType('squarify')
            setPreviewReq({...previewReq, sent: true});
            setTimeout(() => {
                api.post(`/ajax/file_preview.php?uid=${uid}&fid=${file.fid}`)
                    .then(res => setPreviewReq({sent: true, data: res.data}))
                    .catch(err => console.log(err))
                    .finally(() => setLoadingType(false))
            }, 0);
        }
    }

    const renderOfficePreview = () => {
        const isType = previewTypes.filter(type => type === file.mime_type).length > 0;
            if(isType) {
                return getPreview()
            } else {
                return standardPrev;
            }
    }

    const renderFilePreview = () => {
        switch (file.mime_type.split('/')[0]) {
            case 'image': {
                return <img src={file.preview} alt='filePrieview' />
            }
            case 'video': {
                return <video controls src={`https://fs2.mh.net.ua${file.preview}`} type={file.mime_type}>
                    <source src={`https://fs2.mh.net.ua${file.preview}`} type={file.mime_type}/>
                </video>
            }
            case 'audio': {
                return <div className={styles.audioWrap}>
                    <div className={styles.audioPicWrap}>
                        <img className={styles.audioPic} src='./assets/PrivateCabinet/file-preview_audio.svg' alt='audio'/>
                    </div>
                    <audio controls src={`https://fs2.mh.net.ua${file.preview}`}>
                        <source src={`https://fs2.mh.net.ua${file.preview}`} type={file.mime_type}/>
                    </audio>
                </div>
            }
            case 'application': {
                    return <iframe src={`https://fs2.mh.net.ua${file.preview}`} title={file.name} frameBorder="0" scrolling="no" />
            }
            default: {
                return <div className={styles.filePreviewWrapWrap}><div className={styles.filePreviewWrap}><File format={file?.ext} color={file?.color} /></div></div>
            }
        }
    }

    return (
        <PopUp set={set} background={'none'}>
            <div className={styles.preview} onClick={() => set()}>
                {file ? file.is_preview === 1 ? renderFilePreview() : renderOfficePreview() : null}
                {previewReq.data !== null
                    ? <iframe src={`https://fs2.mh.net.ua${previewReq.data.file_pdf}`} title={previewReq.data.file_name} frameBorder="0" scrolling="no" />
                    : null}
            </div>
        </PopUp>
    );
}

export default PreviewFile;