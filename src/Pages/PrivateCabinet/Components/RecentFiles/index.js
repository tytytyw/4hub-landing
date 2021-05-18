import React from 'react';
import {useSelector} from 'react-redux';

import styles from './RecentFiles.module.sass';
import File from "../../../../generalComponents/Files";

const RecentFiles = () => {

    const recentFiles = useSelector(state => state.PrivateCabinet.recentFiles);

    const renderRecentFiles = () => {
        if(!recentFiles) return null;
      return  recentFiles.map(file => {
          return <div className={styles.fileWrap}>
              <div className={styles.innerFileWrap}>
                  <File color={file.color} format={file.ext}/>
                  {/*{file.is_pass && <img className={styles.lock} src='./assets/PrivateCabinet/locked.svg' alt='lock' />}*/}
              </div>
              <div className={styles.descriptionWrap}>
                  <div className={styles.fileName}>{file.name.slice(0, file.name.lastIndexOf('.'))}</div>
                  <div className={styles.innerFileInfo}>
                      <div className={styles.fileSize}>{file.size_now}</div>
                      <div className={styles.descriptionGroup}>
                          {file.tag ? <div className={styles.fileTag}>#{file.tag}</div> : null}
                          {file.fig && <img src={`./assets/PrivateCabinet/signs/${file.fig}.svg`} alt='sign' />}
                          {file.emo && <img src={`./assets/PrivateCabinet/smiles/${file.emo}.svg`} alt='emoji' />}
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