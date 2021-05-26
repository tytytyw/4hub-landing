import React, {useState} from 'react';

// import api from '../../../../api';
import styles from './FileLoader.module.sass';
import LoadItem from './LoadItem';

const FileLoader = ({awaitingFiles, setAwaitingFiles}) => {

    const [collapsed, setCollapsed] = useState(false)

    const renderList = (list, loaded, processing, set) => {
      return list.map((item, i) => {
           return <LoadItem
                key={i}
                loaded={loaded}
                processing={processing}
                name={item.name}
                ext={item.name}
                color={'grey'}
                index={i}
                set={set}
                list={list}
            />
      });
    };

    return (
        <div className={`${styles.loaderWrap} ${collapsed ? styles.loaderCollapsed : ''}`}>
            <div className={styles.header}>
                <span>Загрузка 3 файлов</span>
                <div className={styles.optionsWrap}>
                    <div className={`${collapsed ? styles.arrowUp : styles.arrowDown}`} onClick={() => setCollapsed(!collapsed)} />
                    <span className={styles.cross} />
                </div>
            </div>
            <div className={`${collapsed ? styles.mainHidden : styles.main}`}>
                <div className={styles.timeLeft}>
                    <span className={styles.time}>Осталось 20 мин</span>
                    <span className={styles.cancel}>Отмена</span>
                </div>
                <div className={styles.scrollFileLoaderWrap}>
                    {renderList(awaitingFiles, false, 0, setAwaitingFiles)}
                </div>
            </div>
        </div>
    )
};

export default FileLoader;