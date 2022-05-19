import React from "react";
import List from "../../../List";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import { useStandardLibraries } from "../../../../../../generalComponents/collections";
import { capitalizeFirstLetter } from "../../../../../../generalComponents/generalHelpers";
import ListItem from "../../../../../../generalComponents/ListItem/ListItem";
import { ReactComponent as AddIcon } from "assets/PrivateCabinet/plus-3.svg";

function LibraryList({ listCollapsed, setListCollapsed }) {
  const { __ } = useLocales();
  console.log(capitalizeFirstLetter("test"));

  const STANDARD_LIBRARIES = useStandardLibraries();

  const renderLibraryItem = () =>
    Object.entries(STANDARD_LIBRARIES).map(([key, name], i) => (
      <ListItem
        key={i}
        title={name}
        listCollapsed={listCollapsed}
        amount={0}
        icon={`./assets/PrivateCabinet/library/${key.toLowerCase()}.svg`}
      />
    ));

  console.log(renderLibraryItem());
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
