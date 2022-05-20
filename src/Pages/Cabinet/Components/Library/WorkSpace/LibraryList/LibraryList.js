import React from "react";
import List from "../../../List";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { useStandardLibraries } from "../../../../../../generalComponents/collections";
import ListItem from "../../../../../../generalComponents/ListItem/ListItem";
import { ReactComponent as AddIcon } from "assets/PrivateCabinet/plus-3.svg";
import { imageSrc } from "../../../../../../generalComponents/globalVariables";
import { onSetPath } from "../../../../../../Store/actions/CabinetActions";
import { useDispatch, useSelector } from "react-redux";

function LibraryList({ listCollapsed, setListCollapsed }) {
  const { __ } = useLocales();

  const STANDARD_LIBRARIES = useStandardLibraries();
  const dispatch = useDispatch();
  const { fileList } = useSelector((s) => s.Cabinet);

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

  const handleListItemClick = (path) => dispatch(onSetPath(path));

  return (
    <List
      title={__("Библиотека")}
      icon={false}
      leftIconSrc="book.svg"
      listCollapsed={listCollapsed}
      setListCollapsed={setListCollapsed}
    >
      <ListItem title={__("Создать новый раздел")} listCollapsed={listCollapsed} SvgIcon={AddIcon} />
      {renderLibraryItem()}
    </List>
  );
}

export default LibraryList;

LibraryList.propTypes = {
  listCollapsed: PropTypes.bool,
  setListCollapsed: PropTypes.func
};
