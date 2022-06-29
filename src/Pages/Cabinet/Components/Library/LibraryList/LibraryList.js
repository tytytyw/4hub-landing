import React, { useEffect } from "react";
import List from "../../List";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { useStandardLibraries } from "../../../../../generalComponents/collections";
import ListItem from "../../../../../generalComponents/ListItem/ListItem";
import { imageSrc, LIBRARY_MODALS, MODALS } from "../../../../../generalComponents/globalVariables";
import { onChooseFiles, onSetFolderPath, onSetModals } from "../../../../../Store/actions/CabinetActions";
import { useDispatch, useSelector } from "react-redux";

function LibraryList({ listCollapsed, setListCollapsed, successLoad, setMouseParams }) {
  const { __ } = useLocales();

  const STANDARD_LIBRARIES = useStandardLibraries();
  const dispatch = useDispatch();
  const { folderList } = useSelector((s) => s.Cabinet);

  useEffect(() => {
    dispatch(onChooseFiles(folderList?.path, "", 1, "", successLoad, ""));
  }, [folderList?.path]); //eslint-disable-line

  const getIcon = (item) => {
    if (item.path.startsWith("other")) {
      return item?.fig
        ? `${imageSrc}assets/PrivateCabinet/library/own/${item.fig}.svg`
        : `${imageSrc}assets/PrivateCabinet/folder-2.svg`;
    } else {
      return `${imageSrc}assets/PrivateCabinet/library/${item.path.toLowerCase()}.svg`;
    }
  };

  const renderLibraryItem = (other) => {
    return other.map((item, i) => (
      <ListItem
        key={i}
        title={item.name}
        listCollapsed={listCollapsed}
        icon={getIcon(item)}
        onClick={() => handleListItemClick(item.path)}
        isChosen={item.path === folderList.path}
        setMouseParams={item.path.startsWith("other") ? setMouseParams : null}
        dir={item.path}
      />
    ));
  };
  const handleListItemClick = (path) => {
    dispatch(onSetFolderPath(path));
  };

  const addSection = () => {
    dispatch(
      onSetModals(MODALS.LIBRARY, { type: LIBRARY_MODALS.ADD_SECTION, params: { width: 420, title: "", icon: "" } })
    );
  };

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
        icon={`${imageSrc}assets/PrivateCabinet/plus-3.svg`}
        onClick={addSection}
      />
      {folderList.folders && renderLibraryItem(Object.values(STANDARD_LIBRARIES))}
      {folderList.folders?.other && renderLibraryItem(folderList.folders.other)}
    </List>
  );
}

export default LibraryList;

LibraryList.propTypes = {
  listCollapsed: PropTypes.bool,
  setListCollapsed: PropTypes.func,
  successLoad: PropTypes.func,
  setMouseParams: PropTypes.func
};
