import React from "react";
import styles from "./TaskTabs.module.sass";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ReactComponent as AddIcon } from "../../../../../../../../assets/PrivateCabinet/plus-3.svg";
import { useSelector } from "react-redux";

function TaskTabs({ taskTabs, chosen }) {
  const { theme } = useSelector((s) => s.user.userInfo);

  const renderTaskTabs = () =>
    taskTabs.map((tab, i) => (
      <div
        key={i}
        className={classNames(styles.taskButton, `interaction-background-${theme}`, {
          [`button-${theme}`]: i === 0 && !chosen //chosen
        })}
      >
        {tab}
      </div>
    ));

  return (
    <div className={styles.taskTabWrap}>
      <AddIcon className={classNames(styles.addIcon)} />
      {renderTaskTabs()}
    </div>
  );
}

export default TaskTabs;

TaskTabs.defaultProps = {
  taskTans: [],
  chosen: false
};

TaskTabs.propTypes = {
  taskTabs: PropTypes.arrayOf(PropTypes.string), //TODO wait for BE
  chosen: PropTypes.bool
};
