import React, { useState } from "react";
import styles from "./ProgramItem.module.sass";
import { imageSrc } from "../../../../../generalComponents/globalVariables";
import classNames from "classnames";
import Comments from "../Comments/Comments";
import { onSetModals } from "../../../../../Store/actions/CabinetActions";
import { useDispatch } from "react-redux";
import { useLocales } from "react-localized";
import { programItemProps } from "../../../../../types/Programs";

function ProgramItem({ program }) {
  const { __ } = useLocales();
  const [params, setParams] = useState({
    isFavourite: program.isFavourite,
    openedComments: false
  });
  const dispatch = useDispatch();
  const onSetFavourite = () => {
    setParams(s => ({ ...s, isFavourite: !s.isFavourite }));
    if (!params.isFavourite) {
      dispatch(
        onSetModals("success", {
          open: true,
          message: __(
            "Программа появится в списке во вкладке избраные программы"
          ),
          title: __("Программа успешно добавлена в избранные"),
          icon: `${imageSrc}assets/PrivateCabinet/programs/star.svg`
        })
      );
    }
  };
  const onToggleComments = () =>
    setParams(s => ({ ...s, openedComments: !s.openedComments }));
  return (
    <>
      <div
        className={classNames({
          [styles.itemWrap]: true,
          [styles.chosenItem]: params.openedComments
        })}>
        <div className={styles.leftGroup}>
          <img
            src={program.icon || `${imageSrc}assets/PrivateCabinet/more.svg`}
            alt="ico"
            className={styles.programImage}
          />
          <div className={styles.programName}>{program?.name}</div>
        </div>
        <a
          className={styles.centerGroup}
          href={program.link}
          target="_blank"
          rel="noopener noreferrer">
          <div className={styles.copyLink}>{program.link}</div>
        </a>
        <div className={styles.rightGroup}>
          <div
            className={classNames({
              [styles.openComments]: true,
              [styles.openedComments]: params.openedComments
            })}
            onClick={onToggleComments}>
            <span>{__("Отзывы")}</span>&nbsp;
            <span>({program.comments.length})</span>
          </div>
          <img
            onClick={onSetFavourite}
            className={
              params.isFavourite ? styles.isFavourite : styles.isNotFavourite
            }
            src={`${imageSrc}assets/PrivateCabinet/programs/${
              params.isFavourite ? "star" : "greyStar"
            }.svg`}
            alt="favourite"
          />
        </div>
      </div>
      {params.openedComments ? (
        <Comments
          hideComments={onToggleComments}
          comments={program.comments}
          program={program}
        />
      ) : null}
    </>
  );
}

export default ProgramItem;

ProgramItem.propTypes = {
  program: programItemProps
};
