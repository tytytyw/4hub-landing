import React, { useEffect } from "react";
import List from "../../List";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { useStandardLibraries } from "../../../../../generalComponents/collections";
import ListItem from "../../../../../generalComponents/ListItem/ListItem";
import { ReactComponent as AddIcon } from "assets/PrivateCabinet/plus-3.svg";
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

  const renderDefaultLibraryItem = () =>
    Object.entries(STANDARD_LIBRARIES).map(([key, it], i) => (
      <ListItem
        key={i}
        title={it.name}
        listCollapsed={listCollapsed}
        amount={0}
        icon={`${imageSrc}assets/PrivateCabinet/library/${key.toLowerCase()}.svg`}
        onClick={() => handleListItemClick(it.path)}
        isChosen={it.path === folderList.path}
      />
    ));

  const renderOtherLibraryItem = (other) => {
    return other.map((item, i) => (
      <ListItem
        key={i}
        title={item.name}
        listCollapsed={listCollapsed}
        amount={0}
        icon={
          item?.fig
            ? `${imageSrc}assets/PrivateCabinet/library/own/${item?.fig}.svg`
            : `${imageSrc}assets/PrivateCabinet/folder-2.svg`
        }
        onClick={() => handleListItemClick(item.path)}
        isChosen={item.path === folderList.path}
        setMouseParams={setMouseParams}
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
        SvgIcon={AddIcon}
        onClick={addSection}
      />
      {folderList.folders ? renderDefaultLibraryItem() : null}
      {folderList.folders?.other ? renderOtherLibraryItem(folderList.folders.other) : null}
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
