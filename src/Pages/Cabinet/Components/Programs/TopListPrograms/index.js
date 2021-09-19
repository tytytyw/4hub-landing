import React from 'react';
import {useSelector} from 'react-redux';

import styles from './TopListPrograms.module.sass';
import classNames from "classnames";
import {programIcons} from "../consts";

const TopListPrograms = ({setFilePreview, filePreview, chosenTopListProgram, setChosenTopListProgram}) => {

    const topListPrograms = useSelector(state => state.PrivateCabinet.topListPrograms);

    const renderRecentFiles = () => {
        if(!topListPrograms) return null;
      return  topListPrograms.map((program, i) => {
          return <div
              className={classNames({
                  [styles.fileWrap]: true,
                  [styles.chosen]: chosenTopListProgram === program?.id
              })}
              key={i}
              onClick={() => setChosenTopListProgram(program?.id)}
              onDoubleClick={() => setFilePreview({...filePreview, view: true, program})}
          >
              <div className={styles.innerFileWrap}>
                  <img
                      src={programIcons[program?.program]}
                      alt={program?.name}
                  />
              </div>
              <div className={styles.descriptionWrap}>
                  <div className={styles.fileName}>{program.name}</div>
                  <div className={styles.innerFileInfo}>
                      <p className={styles.fileSize}>{program.size}</p>
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

export default TopListPrograms