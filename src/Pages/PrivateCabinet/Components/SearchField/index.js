import React, { useRef } from 'react';

import styles from './SearchField.module.sass';

const SearchField = () => {

    const inputRef = useRef(null);

    return (
        <div className={styles.searchWrap}>
            <input
                placeholder='Введите название файла/папки'
                ref={inputRef}
            />
            <img
                src='./assets/PrivateCabinet/magnifying-glass-2.svg'
                alt='magnify'
                onClick={() => inputRef.current.focus()}
            />
        </div>
    )
};

export default SearchField;
