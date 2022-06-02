import React, { useState } from "react";
import styles from "./BoardServicePanel.module.sass";
import PropTypes from "prop-types";
import {
  BOARDS,
  imageSrc,
  MODALS,
  TASK_MODALS,
  TASKS_SCHEMA
} from "../../../../../../../generalComponents/globalVariables";
import { useTaskBoardTitle } from "../../../../../../../generalComponents/collections";
import { ReactComponent as FrameIcon } from "assets/PrivateCabinet/tasks/frame.svg";
import classNames from "classnames";
import { ReactComponent as AddIcon } from "../../../../../../../assets/PrivateCabinet/plus-3.svg";
import ThreeDots from "../../../../../../../generalComponents/ThreeDots/ThreeDots";
import { ReactComponent as LinesIcon } from "assets/PrivateCabinet/lines.svg";
import { ReactComponent as BarsIcon } from "assets/PrivateCabinet/tasks/bars.svg";
import { ReactComponent as CalendarIcon } from "assets/PrivateCabinet/tasks/calendar.svg";
import { ReactComponent as ListIcon } from "assets/PrivateCabinet/tasks/list.svg";
import TabsPicker from "../../../../../../../generalComponents/TabsPicker/TabsPicker";
import { onSetModals } from "../../../../../../../Store/actions/CabinetActions";
import { useDispatch } from "react-redux";

function BoardServicePanel({ type, isLastElement, setSchema, schema }) {
  const TITLE = useTaskBoardTitle();
  const dispatch = useDispatch();
  const [tabSelect, setTabSelect] = useState(2);

  const ELEMENTS = [ListIcon, BarsIcon, LinesIcon, CalendarIcon];
  const renderAddImage = () => (
    <>
      <img
        className={styles[`${type}_emptyImg`]}
        src={`${imageSrc}assets/PrivateCabinet/create_arrow.svg`}
        alt="Create Arrow"
      />
      {type && (
        <img
          className={styles[`${type}_inscription`]}
          src={`${imageSrc}assets/PrivateCabinet/tasks/inscriptions/${type.toLowerCase().replace("_", "-")}.png`}
          alt="inscription"
        />
      )}
    </>
  );

  const onAdd = () => {
    if (type === BOARDS.MEETINGS_BOARD) {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.ADD_MEETING,
          params: { width: 420, date: "", time: "", name: "" }
        })
      );
    }
    if (type === BOARDS.CALLS_BOARD) {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.ADD_CALL,
          params: { width: 420, date: "", time: "", name: "" }
        })
      );
    }
    if (type === BOARDS.MAIL_BOARD) {
      dispatch(
        onSetModals(MODALS.TASKS, {
          type: TASK_MODALS.ADD_LETTER,
          params: { width: 420, topic: "", receiver: "", text: "" }
        })
      );
    }
  };

  const onExpand = () => {
    switch (type) {
      case BOARDS.MEETINGS_BOARD:
        schema === TASKS_SCHEMA.EXPANDED_MEETINGS_BOARD
          ? setSchema(TASKS_SCHEMA.GRID_BAR)
          : setSchema(TASKS_SCHEMA.EXPANDED_MEETINGS_BOARD);
        break;
      case BOARDS.CALLS_BOARD:
        schema === TASKS_SCHEMA.EXPANDED_CALLS_BOARD
          ? setSchema(TASKS_SCHEMA.GRID_BAR)
          : setSchema(TASKS_SCHEMA.EXPANDED_CALLS_BOARD);
        break;
      case BOARDS.MAIL_BOARD:
        schema === TASKS_SCHEMA.EXPANDED_MAIL_BOARD
          ? setSchema(TASKS_SCHEMA.GRID_BAR)
          : setSchema(TASKS_SCHEMA.EXPANDED_MAIL_BOARD);
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.boardServicePanelWrap}>
      <span className={styles.boardTitle}>{TITLE[type]}</span>
      <div className={styles.buttonsWrap}>
        <FrameIcon className={styles.frameIcon} onClick={onExpand} />
        {!isLastElement ? (
          <div className={styles.addIconWrap}>
            <AddIcon className={classNames(styles.addIcon)} onClick={onAdd} />
            {renderAddImage()}
          </div>
        ) : null}
        {isLastElement ? <TabsPicker ELEMENTS={ELEMENTS} selected={tabSelect} onClick={setTabSelect} /> : null}
        <div className={styles.threeDots}>
          <ThreeDots onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default BoardServicePanel;

BoardServicePanel.defaultProps = {
  setSchema: () => {}
};

BoardServicePanel.propTypes = {
  type: PropTypes.oneOf(Object.values(BOARDS)).isRequired,
  isLastElement: PropTypes.bool,
  setSchema: PropTypes.func.isRequired,
  schema: PropTypes.oneOf(Object.values(TASKS_SCHEMA))
};
