import { taskDepartmentKey } from "generalComponents/globalVariables";
import { getStorageItem, setStorageItem } from "generalComponents/StorageHelper";
import { useEffect } from "react";
import { useLocales } from "react-localized";
import { useDispatch, useSelector } from "react-redux";
import { onChoosDep } from "Store/actions/TasksActions";

export function useDepartmentsOfTasks() {
  const { __ } = useLocales();
  const dispatch = useDispatch();
  const department = useSelector((s) => s.Tasks.dep);

  useEffect(() => {
    const dep = getStorageItem(taskDepartmentKey);
    if (dep !== "null") {
      dispatch(onChoosDep(JSON.parse(dep)));
    } else {
      setStorageItem(taskDepartmentKey, JSON.stringify(department?.[0]));
      dispatch(onChoosDep(department?.[0]));
    }
  }, [department]); //eslint-disable-line

  const work = {
    ...department.find((item) => item.is_system === "1" && item.name === "worktask"),
    name: __("Рабочие задачи"),
    icon: "bag"
  };
  const home = {
    ...department.find((item) => item.is_system === "1" && item.name === "hometask"),
    name: __("Личные задачи"),
    icon: "home"
  };
  const other = department.filter((item) => item.is_system === "0");
  return [work, home, ...other];
}
