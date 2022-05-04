import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./SearchField.module.sass";
import { onChooseFiles, onSearch } from "../../../Store/actions/CabinetActions";
import { useDebounce } from "../../../generalComponents/Hooks";
import { imageSrc } from "../../../generalComponents/globalVariables";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const SearchField = ({ setChosenFile }) => {
  const { __ } = useLocales();
  const inputRef = useRef(null);
  const path = useSelector(
    (state) => state.Cabinet?.fileList?.path || state.Cabinet?.folderList?.path
  );
  const searchField = useSelector((state) => state.Cabinet?.search);
  const dispatch = useDispatch();

  const search = (query) => dispatch(onChooseFiles(path, query));
  const debounceCallback = useDebounce(search, 500);
  const handleChange = (e) => {
    if (setChosenFile) setChosenFile(null);
    dispatch(onSearch(e.target.value));
    debounceCallback(e.target.value);
  };

  useEffect(() => {
    onSearch("");
  }, [path]);

  return (
    <div className={styles.searchWrap}>
      <img
        src={imageSrc + "assets/PrivateCabinet/magnifying-glass-2.svg"}
        alt="magnify"
        onClick={() => inputRef.current.focus()}
      />
      <input
        placeholder={__("Введите название файла/папки")}
        value={searchField}
        ref={inputRef}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchField;

SearchField.propTypes = {
  setChosenFile: PropTypes.func,
};
