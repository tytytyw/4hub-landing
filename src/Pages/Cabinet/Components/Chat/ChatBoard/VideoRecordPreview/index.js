import React, { useState, useEffect } from "react";
import styles from "./VideoRecordPreview.module.sass";
import classNames from "classnames";
import PropTypes from "prop-types";

const VideoRecordPreview = ({ isVideoMessage, ducationTimer, timeLimit, recordEnd }) => {
  const circleRadius = 150;
  const circumference = 2 * Math.PI * (circleRadius - 8);

  const [progress, setProgress] = useState(0);
  const [circleOffset, setCircleOffset] = useState(circumference);

  useEffect(() => {
    const offset = circumference - (progress / 100) * circumference;
    setCircleOffset(offset);
    // eslint-disable-next-line
  }, [progress]);
  useEffect(() => {
    if (timeLimit) setProgress((ducationTimer / timeLimit) * 100);
    // eslint-disable-next-line
  }, [ducationTimer]);
  useEffect(() => {
    if (progress === 100) setTimeout(() => recordEnd(), 300);
    // eslint-disable-next-line
  }, [progress]);

  return (
    <div className={styles.wrapper}>
      <div
        className={classNames({
          [styles.videoWrapper]: true,
          [styles.circle]: isVideoMessage
        })}
      >
        {isVideoMessage ? (
          <svg width={circleRadius * 2} height={circleRadius * 2}>
            <circle cx={circleRadius} cy={circleRadius} r={circleRadius} fill="#F5F9FE" />
            <circle
              className={styles.progressCircle}
              cx={circleRadius}
              cy={circleRadius}
              r={circleRadius - 8}
              strokeLinecap="round"
              strokeDashoffset={circleOffset}
              strokeDasharray={`${circumference} ${circumference}`}
              fill="none"
            />
          </svg>
        ) : (
          ""
        )}
        <video ref={isVideoMessage} className={classNames({ [styles.video]: isVideoMessage })} muted={true} />
      </div>
    </div>
  );
};

export default VideoRecordPreview;

VideoRecordPreview.defaultProps = {
  timeLimit: 0
};

VideoRecordPreview.propTypes = {
  isVideoMessage: PropTypes.exact({ current: PropTypes.instanceOf(Element) }),
  ducationTimer: PropTypes.number,
  timeLimit: PropTypes.number,
  recordEnd: PropTypes.func.isRequired
};
