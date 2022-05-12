import React, { useRef, useState } from "react";
import styles from "./AudioPlayer.module.sass";
import PropTypes from "prop-types";
import { ReactComponent as PlayIcon } from "../../../../../../../../assets/PrivateCabinet/play-grey.svg";

const AudioPlayer = ({ name, src }) => {
  const audioRef = useRef();
  const [playing, setPlaying] = useState(false);

  const buttonHandler = () => {
    const audio = audioRef.current;
    setPlaying(audio.paused);
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.button} onClick={buttonHandler}>
        {playing ? <div className={styles.pauseIcon}></div> : <PlayIcon />}
      </div>
      <span className={styles.name}>{name}</span>
      <audio className={styles.audio} src={src} ref={audioRef} controls={false}></audio>
    </div>
  );
};

export default AudioPlayer;

AudioPlayer.propTypes = {
  name: PropTypes.string,
  src: PropTypes.string.isRequired
};
