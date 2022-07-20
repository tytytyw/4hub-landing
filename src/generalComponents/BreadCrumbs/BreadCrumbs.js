import React, { useEffect, useState } from "react";
import styles from "./BreadCrumbs.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { TaskFilters } from "generalComponents/globalVariables";
import { useDayWeekName, useTaskFiltersMenu } from "generalComponents/collections";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { TasksTypes } from "Store/types";
import { useMonths } from "generalComponents/CalendarHelper";
import classNames from "classnames";

function BreadCrumbs() {
  const dispatch = useDispatch();
  const months = useMonths();

  const currentDep = useSelector((s) => s.Tasks.currentDep);
  const filters = useSelector((s) => s.Tasks.filters);
  const filtersMenu = useTaskFiltersMenu();
  const dayName = useDayWeekName();
  const [path, setPath] = useState({ ...filters });

  useEffect(() => {
    setPath((state) => ({ ...state, type: filtersMenu[filters.type] }));
    const year = filters.year;
    const month = months().find((item) => item.id === filters.month)?.name;
    if (filters.type === TaskFilters.BY_DAY || filters.type === TaskFilters.TODAY) {
      const day = `${dayName[new Date(filters.year, filters.month, filters.day).getDay()]}, ${format(
        new Date(filters.year, filters.month, filters.day),
        "dd.MM.yyyy"
      )}`;
      setPath((state) => ({ ...state, year, month, day }));
    }
    if (filters.type === TaskFilters.BY_MONTH) {
      return setPath((state) => ({ ...state, year, month, day: "" }));
    }
    if (filters.type === TaskFilters.BY_YEAR) {
      return setPath((state) => ({ ...state, year, month: "", day: "" }));
    }
    if (filters.type === TaskFilters.BY_WEEK) {
      const startWeek = startOfWeek(new Date(filters.year, filters.month, filters.day), {
        weekStartsOn: 1
      });
      const endWeek = endOfWeek(new Date(filters.year, filters.month, filters.day), {
        weekStartsOn: 1
      });
      const day = `${dayName[startWeek.getDay()]}, ${format(startWeek, "dd.MM.yyyy")} - ${
        dayName[endWeek.getDay()]
      }, ${format(endWeek, "dd.MM.yyyy")}`;
      return setPath((state) => ({ ...state, year, month, day }));
    }
    if (!filters.type) {
      return setPath({ ...filters });
    }
  }, [filters]); //eslint-disable-line

  const onPathClick = (type) => {
    if (type === "year")
      dispatch({
        type: TasksTypes.SELECT_FILTER,
        payload: { type: TaskFilters.BY_YEAR, year: filters.year, month: "", day: "" }
      });
    if (type === "month")
      dispatch({
        type: TasksTypes.SELECT_FILTER,
        payload: { type: TaskFilters.BY_MONTH, year: filters.year, month: filters.month, day: "" }
      });
  };

  const renderPath = () => {
    return Object.entries(path).map(([key, item]) => (
      <React.Fragment key={key}>
        {item && (
          <div className={styles.pathEl}>
            <span className={styles.arrowNext}>&gt;</span>
            <div
              className={classNames(styles.pathEl, { [styles.pathNav]: key === "year" || key === "month" })}
              onClick={() => onPathClick(key)}
            >
              {item}
            </div>
          </div>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div className={styles.breadCrumbsWrap}>
      <div className={styles.pathEl}>{currentDep?.name}</div>
      {renderPath()}
    </div>
  );
}

export default BreadCrumbs;
