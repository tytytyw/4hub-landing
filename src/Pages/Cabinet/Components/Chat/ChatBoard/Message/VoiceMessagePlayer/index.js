import React, { useState, useEffect } from "react";
import styles from "./VoiceMessagePlayer.module.sass";
import { ReactComponent as PlayIcon } from "../../../../../../../assets/PrivateCabinet/play-grey.svg";
import classNames from "classnames";
import PropTypes from "prop-types";

const VoiceMessagePlayer = ({ src, histogramData, inboxMessage }) => {
  const [playing, setPlaying] = useState(false);
  const [audio] = useState(new Audio(src));
  const [progress, setProgress] = useState(0);

  const renderHistogram = (
    arr = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ]
  ) => {
    return arr.map((value, i) => (
      <div
        className={classNames({
          [styles.column]: true,
          [styles.lisened]: progress > i * 2,
        })}
        key={i}
        style={{ height: `${value}%` }}
      />
    ));
  };

  const buttonHandler = (e) => {
    e.preventDefault();
    setPlaying(audio.paused);
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const onTimeUpdate = () => {
    setProgress((audio.currentTime / audio.duration) * 100);
  };
  const videoEnded = () => {
    setPlaying(false);

    setTimeout(() => {
      setProgress(0);
      audio.currentTime = 0;
    }, 500);
  };

  const renderRemainder = () => {
    if (!audio.duration || audio.duration === Infinity) return "00:00";
    const remainder = Math.ceil(audio.duration - audio.currentTime);
    const min = Math.floor(remainder / 60);
    const sec = remainder % 60;
    return `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  const onSeek = (e) => {
    audio.pause();
    audio.currentTime = (audio.duration * e.target.value) / 100;
    setPlaying(true);
    audio.play();
  };

  useEffect(() => {
    //fix Chorome bug with Infinity duration
    const fixInfinityDuration = () => {
      const getDuration = () => {
        audio.currentTime = 0;
        audio.removeEventListener("timeupdate", getDuration);
      };
      if (audio.duration === Infinity) {
        audio.currentTime = 1e101;
        audio.addEventListener("timeupdate", getDuration);
      }
    };

    if (audio) {
      audio.addEventListener("timeupdate", onTimeUpdate);
      audio.addEventListener("ended", videoEnded);
      audio.addEventListener("loadedmetadata", fixInfinityDuration);
    }

    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", onTimeUpdate);
        audio.removeEventListener("ended", videoEnded);
        audio.removeEventListener("loadedmetadata", fixInfinityDuration);
      }
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.wrapper}>
      <button
        onClick={buttonHandler}
        className={classNames({
          [styles.playButton]: true,
          [styles.inboxMessage]: inboxMessage,
        })}
      >
        {playing ? <div className={styles.pauseIcon}></div> : <PlayIcon />}
      </button>
      <div
        className={classNames({
          [styles.rightContainer]: true,
          [styles.inboxMessage]: inboxMessage,
        })}
      >
        <div className={styles.audioHistogram}>
          <input
            className={styles.seekBar}
            type="range"
            onClick={onSeek}
            min="0"
            max="100"
            step="1"
          ></input>
          {renderHistogram(histogramData?.length ? histogramData : undefined)}
        </div>
        <span className={styles.duration}>{renderRemainder()}</span>
      </div>
    </div>
  );
};

export default VoiceMessagePlayer;

VoiceMessagePlayer.propTypes = {
  src: PropTypes.string.isRequired,
  histogramData: (props, propName, componentName) => {
    if (Array.isArray(props[propName])) {
      if (props[propName].length !== 50) {
        return new Error(
          `invalid prop ${props[propName]} array lenght must be equal to 50. In ${componentName}`
        );
      } else if (props[propName].some((item) => item > 100 || item < 0)) {
        return new Error(
          `incorrect value of an array ${props[propName]} expected value from 0 to 100`
        );
      }
    }
  },
  inboxMessage: PropTypes.bool,
};
