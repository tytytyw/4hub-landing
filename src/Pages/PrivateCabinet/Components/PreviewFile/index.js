import React from 'react';

import styles from './PreviewFile.module.sass';
import PopUp from '../../../../generalComponents/PopUp';
import File from "../../../../generalComponents/Files";

const PreviewFile = ({setFilePreview, file, filePreview}) => {

    const set = () => setFilePreview({...filePreview, view: false, file: null});

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
                return <iframe src={`https://fs2.mh.net.ua${file.preview}`} title={file.name} frameBorder="0" scrolling="no"  />
            }
            default: {
                return <div className={styles.filePreviewWrapWrap}><div className={styles.filePreviewWrap}><File format={file?.ext} color={file?.color} /></div></div>
            }
        }
    }

    return (
        <PopUp set={set} background={'none'}>
            <div className={styles.preview} onClick={() => set()}>
                {file ? file.is_preview === 1 ? renderFilePreview() : <div className={styles.filePreviewWrapWrap}><div className={styles.filePreviewWrap}><File format={file?.ext} color={file?.color} /></div></div> : null}
            </div>
        </PopUp>
    );
}

export default PreviewFile;