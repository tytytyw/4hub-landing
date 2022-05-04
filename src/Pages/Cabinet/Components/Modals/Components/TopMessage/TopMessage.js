import React, { useEffect } from "react";
import styles from "./TopMessage.module.sass";

import { useSelector, useDispatch } from "react-redux";
import { onSetModals } from "../../../../../../Store/actions/CabinetActions";

function TopMessage() {
  const topMessage = useSelector(s => s.Cabinet.modals.topMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(
        onSetModals("topMessage", {
          ...topMessage,
          open: false,
          type: "message",
          message: ""
        })
      );
    }, 3000);
  }, []);

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles[topMessage.type]}>{topMessage.message}</div>
      </div>
    </>
  );
}

export default TopMessage;
