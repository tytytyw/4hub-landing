import React, { useState, useEffect, useRef } from "react";
import styles from "./VideoPlayer.module.sass";
import { ReactComponent as PlayIcon } from "../../../../../../assets/PrivateCabinet/play-grey.svg";
import classNames from "classnames";
import { ducationTimerToString } from "../../../../../../generalComponents/chatHelper";
import PropTypes from "prop-types";

const VideoPlayer = ({ source, videoPlayerRef, visualEffects }) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const seekPanelRef = useRef();

  const onSeek = e => {
    videoPlayerRef.current.currentTime =
      (videoPlayerRef.current.duration * +e.target.value) / 100;
    setPlaying(true);
  };

  const onTimeUpdate = () => {
    setProgress(
      (videoPlayerRef.current.currentTime / videoPlayerRef.current.duration) *
        100
    );
  };
  const videoEnded = () => {
    setPlaying(false);

    setTimeout(() => {
      setProgress(0);
      videoPlayerRef.current.currentTime = 0;
    }, 500);
  };

  useEffect(() => {
    const video = videoPlayerRef.current;
    playing ? video.play() : video.pause();
    if (playing) {
      video.addEventListener("timeupdate", onTimeUpdate);
      return () => video.removeEventListener("timeupdate", onTimeUpdate);
    }
    // eslint-disable-next-line
  }, [playing]);

  useEffect(() => {
    const video = videoPlayerRef.current;
    //TODO - fix Chorome bug with Infinity duration
    const fixInfinityDuration = () => {
      const getDuration = () => {
        video.currentTime = 0;
        video.removeEventListener("timeupdate", getDuration);
      };
      if (video.duration === Infinity) {
        video.currentTime = 1e101;
        video.addEventListener("timeupdate", getDuration);
      }
    };

    // video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", videoEnded);
    video.addEventListener("loadedmetadata", fixInfinityDuration);

    return () => {
      // video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", videoEnded);
      video.removeEventListener("loadedmetadata", fixInfinityDuration);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.wrapper}>
      <video
        ref={videoPlayerRef}
        src={source}
        className={styles.video}
        style={visualEffects}
      />
      <div
        className={classNames({
          [styles.playButton]: true,
          [styles.paused]: playing === false
        })}
        onClick={() => setPlaying(prevValue => !prevValue)}
      >
        {playing ? <div className={styles.pauseIcon}></div> : <PlayIcon />}
      </div>
      <div className={styles.seekPanel} ref={seekPanelRef}>
        <span className={classNames(styles.time, styles.currentTime)}>
          {videoPlayerRef.current?.duration >= 0
            ? ducationTimerToString(
                progress === 0 ? 0 : videoPlayerRef.current?.currentTime
              )
            : ""}
        </span>
        <input
          className={styles.inputRange}
          onChange={e => setProgress(e.target.value)}
          onMouseDown={() => setPlaying(false)}
          onClick={onSeek}
          type="range"
          min="0"
          max="99"
          step="1"
        />
        <div
          className={styles.seekHolder}
          style={{
            transform: `translateX(${(seekPanelRef.current?.clientWidth *
              progress) /
              100}px)`
          }}
        />
        <span className={classNames(styles.time, styles.durationTime)}>
          {videoPlayerRef.current?.duration !== Infinity &&
          videoPlayerRef.current?.duration > 0
            ? ducationTimerToString(videoPlayerRef.current?.duration)
            : ""}
        </span>
      </div>
    </div>
  );
};

export default VideoPlayer;

VideoPlayer.defaultProps = {
  visualEffects: {}
};

VideoPlayer.propTypes = {
  source: PropTypes.string.isRequired,
  videoPlayerRef: PropTypes.object,
  visualEffects: PropTypes.object
};
