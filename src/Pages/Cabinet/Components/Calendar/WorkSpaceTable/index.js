import React from "react";
import styles from "./WorkSpace.module.sass";
import TableTaskItem from "../TableTaskItem";
import { days, hours } from "../helper";
import PropTypes from "prop-types";

const WorkSpaceTable = ({ taskList }) => {
  const renderTask = (day, hour) => {
    const task = taskList?.find(
      (item) => item?.weekDay === day && item?.hour === hour
    );
    if (task) {
      return <TableTaskItem task={task} />;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftBlockWrap}>
        <ul className={styles.hoursList}>
          {hours?.map((item, index) => (
            <li key={index} onClick={() => {}} className={styles.hourItem}>
              <span className={styles.hour}>{item.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr className={styles.row}>
            <th className={styles.firstCell} />
            {days?.map((item, index) => (
              <td key={index} onClick={() => {}}>
                <div className={styles.dayItem}>
                  <span className={styles.day}>{item.day}</span>
                  <h4 className={styles.dayNumber}>{item.number}</h4>
                </div>
              </td>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr className={styles.row}>
            <td className={styles.firstCell} />
            <td className={styles.cell} />
            <td className={styles.cell} />
            <td className={styles.cell} />
            <td className={styles.cell} />
            <td className={styles.cell} />
            <td className={styles.cell} />
            <td className={styles.cell} />
          </tr>

          {hours?.map((hour, index) => (
            <tr key={index} className={styles.row}>
              <td className={styles.firstCell} />
              {days?.map((day, dayIndex) => (
                <td key={dayIndex} className={styles.cell}>
                  {renderTask(day?.id, hour?.value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkSpaceTable;

WorkSpaceTable.propTypes = {
  taskList: PropTypes.any,
};
