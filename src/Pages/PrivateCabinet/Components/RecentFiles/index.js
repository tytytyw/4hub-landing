import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {onChooseRecentFile} from '../../../../Store/actions/PrivateCabinetActions';
import styles from './RecentFiles.module.sass';
import File from "../../../../generalComponents/Files";

const RecentFiles = ({setFilePreview, filePreview}) => {

    const recentFiles = useSelector(state => state.PrivateCabinet.recentFiles);
    const chosenRecentFile = useSelector(state => state.PrivateCabinet.chosenRecentFile);
    const dispatch = useDispatch();

    const renderRecentFiles = () => {
        if(!recentFiles) return null;
      return  recentFiles.map((file, i) => {
          return <div
              className={`${styles.fileWrap} ${chosenRecentFile?.fid === file?.fid ? styles.chosen : ''}`}
              key={i}
              onClick={() => dispatch(onChooseRecentFile(file))}
              onDoubleClick={() => setFilePreview({...filePreview, view: true, file})}
          >
              <div className={styles.innerFileWrap}>
                  <File color={file.id_color} format={file.ext} />
                  {file.is_pass ? <img className={styles.lock} src='./assets/PrivateCabinet/locked.svg' alt='lock' /> : null}
              </div>
              <div className={styles.descriptionWrap}>
                  <div className={styles.fileName}>{file.name.slice(0, file.name.lastIndexOf('.'))}</div>
                  <div className={styles.innerFileInfo}>
                      <div className={styles.fileSize}>{file.size_now}</div>
                      <div className={styles.descriptionGroup}>
                          {file.tag ? <div className={styles.fileTag}>#{file.tag}</div> : null}
                          {file.id_fig && <img src={`./assets/PrivateCabinet/signs/${file.id_fig}.svg`} alt='sign' />}
                          {file.id_emo && <img src={`./assets/PrivateCabinet/smiles/${file.id_emo}.svg`} alt='emoji' />}
                      </div>
                  </div>
              </div>
          </div>
      })
    };

    return(
        <div className={styles.wrap}>
        <div className={styles.recentFilesWrap}>
            {renderRecentFiles()}
        </div>
        </div>
    )
}

export default RecentFiles;