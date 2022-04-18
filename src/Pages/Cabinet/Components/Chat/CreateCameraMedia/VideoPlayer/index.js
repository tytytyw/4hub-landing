import React, { useState, useEffect, useRef } from "react";
import styles from "./VideoPlayer.module.sass";
import { ReactComponent as PlayIcon } from "../../../../../../assets/PrivateCabinet/play-grey.svg";
import classNames from "classnames";
import { ducationTimerToString } from "../../../../../../generalComponents/chatHelper";
import PropTypes from "prop-types";

const VideoPlayer = ({
  source,
  videoPlayerRef,
  visualEffects,
  videoCutParams,
  setVideoCutParams
}) => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const seekPanelRef = useRef();
  const inputRange = useRef();
  const [dragbbleCutBorder, setDragbbleCutBorder] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);

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
        setVideoDuration(videoPlayerRef.current?.duration);
        video.currentTime = 0;
        video.removeEventListener("timeupdate", getDuration);
      };
      if (video.duration === Infinity) {
        video.currentTime = 1e101;
        video.addEventListener("timeupdate", getDuration);
      }
    };

    video.addEventListener("ended", videoEnded);
    video.addEventListener("loadedmetadata", fixInfinityDuration);

    return () => {
      video.removeEventListener("ended", videoEnded);
      video.removeEventListener("loadedmetadata", fixInfinityDuration);
    };
    // eslint-disable-next-line
  }, []);

  const onBorderDragStart = e => {
    setDragbbleCutBorder(e.target.id);
  };

  const onBorderDrag = e => {
    const percent = Math.round(
      (e.offsetX / inputRange.current.clientWidth) * 100
    );
    const time = (videoPlayerRef.current.duration * percent) / 100;
    if (
      (dragbbleCutBorder === "from" &&
        videoCutParams.to.percent - percent > 1) ||
      (dragbbleCutBorder === "to" && percent - videoCutParams.from.percent > 1)
    )
      setVideoCutParams(prev => ({
        ...prev,
        [dragbbleCutBorder]: {
          percent,
          time
        }
      }));
  };
  const onBorderDragEnd = () => setDragbbleCutBorder(null);

  useEffect(() => {
    if (dragbbleCutBorder) {
      inputRange.current.style.cursor = "e-resize";
      inputRange.current.addEventListener("mousemove", onBorderDrag);
      return () => {
        inputRange.current.style.cursor = "default";
        inputRange.current.removeEventListener("mousemove", onBorderDrag);
      };
    }
  }, [dragbbleCutBorder]);

  useEffect(() => {
    if (videoCutParams)
      setVideoCutParams(prev => ({
        ...prev,
        to: {
          percent: 100,
          time: videoDuration
        }
      }));
  }, [videoDuration]);

  return (
    <div
      className={styles.wrapper}
      onMouseUp={onBorderDragEnd}
      onMouseLeave={onBorderDragEnd}
    >
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
        <span
          className={classNames(styles.time, styles.currentTime)}
          style={{
            left: `${videoCutParams?.from?.percent ?? 0}%`,
            transform: `translateX(${videoCutParams ? "-50%" : "0"})`
          }}
        >
          {videoPlayerRef.current?.duration >= 0
            ? ducationTimerToString(
                videoCutParams?.from?.time ??
                  (progress === 0 ? 0 : videoPlayerRef.current?.currentTime)
              )
            : ""}
        </span>
        <input
          className={styles.inputRange}
          ref={inputRange}
          onChange={e => setProgress(e.target.value)}
          onMouseDown={() => setPlaying(false)}
          onClick={onSeek}
          type="range"
          min="0"
          max="99"
          step="1"
        />
        {progress > 0 && (
          <div
            className={styles.seekHolder}
            style={{
              transform: `translateX(${(inputRange.current?.offsetWidth *
                progress) /
                100 -
                2}px)`
            }}
          />
        )}
        {videoCutParams && (
          // border of start video
          <div
            className={styles.borderHolder}
            id="from"
            style={{
              left: `${videoCutParams.from?.percent}%`
            }}
            onMouseDown={onBorderDragStart}
          />
        )}
        {videoCutParams && (
          // border of end video
          <div
            className={styles.borderHolder}
            id="to"
            style={{
              left: `${videoCutParams.to?.percent}%`,
              transform: "translateX(-100%)"
            }}
            onMouseDown={onBorderDragStart}
          />
        )}
        <span
          className={classNames(styles.time, styles.durationTime)}
          style={{
            left: `${videoCutParams?.to?.percent ?? 100}%`,
            transform: `translateX(${videoCutParams ? "-50%" : "-100%"})`
          }}
        >
          {videoDuration !== Infinity && videoDuration > 0
            ? ducationTimerToString(videoCutParams?.to.time || videoDuration)
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
  visualEffects: PropTypes.object,
  videoCutParams: PropTypes.object,
  setVideoCutParams: PropTypes.func
};
