import React from "react";
import styles from "./MailTasks.module.sass";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useSelector } from "react-redux";
import ThreeDots from "../../../../../../../generalComponents/ThreeDots/ThreeDots";

function MailTasks({ tasks }) {
  const { theme } = useSelector((s) => s.user.userInfo);

  const renderTimetableLine = () =>
    tasks.map((task, i) => (
      <div key={i} className={classNames(styles.taskLine)}>
        <div className={styles.task}>{task}</div>
        <ThreeDots />
      </div>
    ));

  return (
    <div className={classNames(styles.tasksWrap, `scrollbar-vertical-medium-${theme}`)}>{renderTimetableLine()}</div>
  );
}

export default MailTasks;

MailTasks.defaultProps = {
  tasks: []
};

MailTasks.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.string) //list of tasks //TODO - wait for BE
};
