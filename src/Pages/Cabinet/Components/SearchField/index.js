import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "../../../../generalComponents/Hooks";
import { imageSrc } from "../../../../generalComponents/globalVariables";
import styles from "./SearchField.module.sass";
import {
  onChooseFiles,
  onSearch,
  onGetSafeFileList,
  onGetArchiveFiles,
  onGetChatMessages,
} from "../../../../Store/actions/CabinetActions";
import Select from "../../../../generalComponents/Select/Select";
import { useLocation } from "react-router";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const SearchField = ({
  setChosenFile,
  menuItem,
  selectable = true,
  theme = "",
}) => {
  const { __ } = useLocales();
  const inputRef = useRef(null);
  const path = useSelector(
    (state) => state.Cabinet?.fileList?.path || state.Cabinet?.folderList?.path
  );
  const searchField = useSelector((state) => state.Cabinet?.search);
  const authorizedSafe = useSelector(
    (state) => state.Cabinet.safe.authorizedSafe
  );
  const selectedChat = useSelector(
    (state) => state.Cabinet.chat.selectedContact
  );
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const search = (query) => {
    if (pathname === "/folders") dispatch(onChooseFiles(path, query, 1));
    if (pathname.includes("files"))
      dispatch(onChooseFiles("", query, 1, "", "", "", "file_list_all"));
    if (pathname === "/archive")
      dispatch(onGetArchiveFiles(query, 1, "", "", "")); //TODO: add date filter
    if (pathname === "/safe")
      dispatch(
        onGetSafeFileList(
          authorizedSafe.code,
          authorizedSafe.id_safe,
          authorizedSafe.password,
          "",
          "",
          "",
          query,
          1,
          ""
        )
      );
    if (pathname === "/chat-page")
      dispatch(onGetChatMessages(selectedChat, query));
  };
  const debounceCallback = useDebounce(search, 500);
  const handleChange = (e) => {
    if (setChosenFile) setChosenFile(null);
    dispatch(onSearch(e.target.value));
    debounceCallback(e.target.value);
  };

  const [searchArea, setSearhArea] = useState([
    { text: __("Глобальный"), active: true, id: "global" },
    { text: __("Локальный"), active: false, id: "local" },
  ]);

  useEffect(() => {
    onSearch("");
  }, [path]);
  if (menuItem === "safe" && !authorizedSafe) return null;
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
      {selectable && (
        <Select
          placeholder={searchArea.filter((item) => item.active)[0].text}
          className={styles.select}
          classNameSelect={styles.SearchType}
          setSearhArea={setSearhArea}
          data={searchArea}
          theme={theme}
        />
      )}
    </div>
  );
};

export default SearchField;

SearchField.propTypes = {
  setChosenFile: PropTypes.func,
  menuItem: PropTypes.string,
  selectable: PropTypes.bool,
  theme: PropTypes.string,
};
SearchField.defaultProps = {
  selectable: true,
  theme: "",
};
