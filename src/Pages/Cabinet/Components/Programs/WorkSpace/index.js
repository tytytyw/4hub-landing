import React from "react";

import styles from "./WorkSpace.module.sass";
import SearchField from "../../SearchField";
import StorageSize from "../../StorageSize";
import Notifications from "../../Notifications";
import classnames from "classnames";
import { useSelector } from "react-redux";
import ProgramItem from "../ProgramItem/ProgramItem";
import Profile from "../../Profile/Profile";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";

const WorkSpace = ({ listCollapsed }) => {
  const { __ } = useLocales();
  const category = useSelector((s) => s.Cabinet.programs.category);
  const { theme } = useSelector((state) => state.user.userInfo);
  const renderPrograms = () => category.list.map((program, i) => <ProgramItem key={i} program={program} />);

  const emptyList = () => <div className={styles.emptyList}>{__("Список программ пуст")}</div>;

  return (
    <>
      <div
        className={classnames({
          [styles.workSpaceWrap]: true,
          [styles.collapsed]: listCollapsed,
          [styles.notCollapsed]: !listCollapsed
        })}
      >
        <div className={styles.header}>
          <SearchField />
          <div className={styles.infoHeader}>
            <StorageSize />
            <Notifications />
            <Profile />
          </div>
        </div>
        <div className={classnames(styles.fileList, `scrollbar-${theme}`)}>
          {category?.list ? (category.list.length > 0 ? renderPrograms() : emptyList()) : null}
        </div>
      </div>
    </>
  );
};

export default WorkSpace;

WorkSpace.propTypes = {
  listCollapsed: PropTypes.bool
};
