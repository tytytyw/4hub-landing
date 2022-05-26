import React from "react";
import List from "../../List";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { useStandardLibraries } from "../../../../../generalComponents/collections";
import ListItem from "../../../../../generalComponents/ListItem/ListItem";
import { ReactComponent as AddIcon } from "assets/PrivateCabinet/plus-3.svg";
import {
  imageSrc,
  LIBRARY,
  LIBRARY_MODALS,
  LOADING_STATE,
  MODALS,
  VIEW_TYPE
} from "../../../../../generalComponents/globalVariables";
import { onLoadFiles, onSetModals, onSetPath } from "../../../../../Store/actions/CabinetActions";
import { useDispatch, useSelector } from "react-redux";

function LibraryList({ listCollapsed, setListCollapsed }) {
  const { __ } = useLocales();

  const STANDARD_LIBRARIES = useStandardLibraries();
  const dispatch = useDispatch();
  const { fileList, view } = useSelector((s) => s.Cabinet);

  const renderLibraryItem = () =>
    Object.entries(STANDARD_LIBRARIES).map(([key, it], i) => (
      <ListItem
        key={i}
        title={it.name}
        listCollapsed={listCollapsed}
        amount={0}
        icon={`${imageSrc}assets/PrivateCabinet/library/${key.toLowerCase()}.svg`}
        onClick={() => handleListItemClick(it.path)}
        isChosen={it.path === fileList.path}
      />
    ));

  const handleListItemClick = (path) => {
    const type = view === VIEW_TYPE.LINES_PREVIEW ? LOADING_STATE.LOAD_NEXT_COLUMN : LOADING_STATE.LOADING;
    dispatch(onSetPath(path));
    dispatch(onLoadFiles(LIBRARY.API_GET_FILES, 1, type));
  };

  const addSection = () =>
    dispatch(
      onSetModals(MODALS.LIBRARY, { type: LIBRARY_MODALS.ADD_SECTION, params: { width: 420, title: "", icon: "" } })
    );

  return (
    <List
      title={__("Библиотека")}
      icon={false}
      leftIconSrc="book.svg"
      listCollapsed={listCollapsed}
      setListCollapsed={setListCollapsed}
    >
      <ListItem
        title={__("Создать новый раздел")}
        listCollapsed={listCollapsed}
        SvgIcon={AddIcon}
        onClick={addSection}
      />
      {renderLibraryItem()}
    </List>
  );
}

export default LibraryList;

LibraryList.propTypes = {
  listCollapsed: PropTypes.bool,
  setListCollapsed: PropTypes.func
};
