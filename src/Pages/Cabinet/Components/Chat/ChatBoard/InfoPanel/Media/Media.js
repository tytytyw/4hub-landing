import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Media.module.sass";
import Header from "../styledComponents/Header";
import SubOptionButton from "../styledComponents/SubOptionButton";
import { useLocales } from "react-localized";
import PropTypes from "prop-types";
import FileMessage from "../../Message/FileMessage";
import AudioMessage from "./AudioMessage";
import AudioPlayer from "./AudioPlayer";
import { subOptionProps } from "../../../../../../../types/Chat";
import {
  SIZE_SMALL,
  VIDEO_MESSAGE,
  AUDIO_MESSAGE,
  PHOTO,
  FILES,
  VOICE_MESSAGES,
  MUSIC
} from "../../../../../../../generalComponents/globalVariables";

const Media = ({ setActiveOption, activeOption }) => {
  const { __ } = useLocales();
  const [activeSubOption, setActiveSubOption] = useState(activeOption?.subOptions[0]);
  const files = useSelector((state) => state.Cabinet.chat.files);

  const renderImages = () => {
    const images = files?.image?.files ?? {};
    return images.map((img, i) => {
      return (
        <div className={styles.miniPictureWrap} key={i}>
          <img src={img.link} alt="pic"></img>
        </div>
      );
    });
  };

  const renderFiles = () => {
    const filesList = files
      ? Object.values(files).reduce(
          (acc, it) =>
            Array.isArray(it)
              ? acc
              : [
                  ...acc,
                  ...Object.values(it.files)
                    .flat()
                    .filter((f) => {
                      return f.kind !== { AUDIO_MESSAGE } && f.kind !== { VIDEO_MESSAGE };
                    })
                ],
          []
        )
      : [];
    return filesList.map((file, i) => <FileMessage key={i} file={file} size={SIZE_SMALL} />);
  };

  const renderVoiceMessages = () => {
    const audio = files?.audio?.files.filter((item) => item.kind === AUDIO_MESSAGE) ?? [];

    return audio.map((info) => {
      return <AudioMessage key={info.id} messageInfo={info} />;
    });
  };

  const renderMusicFiles = () => {
    const audio = files?.audio?.files.filter((item) => item.kind !== AUDIO_MESSAGE) ?? [];
    return audio.map((info) => {
      return <AudioPlayer key={info.id} name={info.name} src={info.link} />;
    });
  };

  const renderSubOptions = () =>
    activeOption.subOptions.map((subOption) => (
      <SubOptionButton
        key={subOption.name}
        subOption={subOption}
        activeSubOption={activeSubOption}
        setActiveSubOption={setActiveSubOption}
      />
    ));

  return (
    <div className={styles.wrapper}>
      <Header setActiveOption={setActiveOption} title={activeOption?.title} />
      {activeOption?.subOptions && Array.isArray(activeOption.subOptions) && activeOption?.subOptions.length ? (
        <div className={styles.subOptions}>{renderSubOptions()}</div>
      ) : (
        ""
      )}
      {activeSubOption?.name === PHOTO ? (
        <div className={styles.content}>
          <div className={styles.groupByDate}>
            <h5 className={styles.dateTitle}>{__("Сегодня")}</h5>
            <div className={styles.picturesWrap}>{renderImages()}</div>
          </div>
        </div>
      ) : null}

      {activeOption?.name === FILES ? (
        <div className={styles.content}>
          <div className={styles.groupByDate}>
            <h5 className={styles.dateTitle}>{__("Сегодня")}</h5>
            <div className={styles.picturesWrap}>{renderFiles()}</div>
          </div>
        </div>
      ) : null}
      {/* {TODO: add group by date} */}
      {activeSubOption?.name === VOICE_MESSAGES ? renderVoiceMessages() : ""}
      {activeSubOption?.name === MUSIC ? renderMusicFiles() : ""}
    </div>
  );
};

export default Media;

Media.propTypes = {
  setActiveOption: PropTypes.func,
  activeOption: subOptionProps
};
