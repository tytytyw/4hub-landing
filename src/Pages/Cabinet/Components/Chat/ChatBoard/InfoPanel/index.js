import React, { useState } from "react";
import styles from "./InfoPanel.module.sass";

import MainPanel from "./MainPanel/MainPanel";
import Media from "./Media";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useLocales } from "react-localized";
import classNames from "classnames";
import {
  PHOTO,
  FILES,
  VOICE_MESSAGES,
  MUSIC,
  LINKS,
  MEDIA,
  AUDIO,
  VIDEO,
  GIF,
  DOCS,
  DARK,
  MAIN
} from "../../../../../../generalComponents/globalVariables";

const InfoPanel = ({ setAction }) => {
  const { __ } = useLocales();

  const [activeOption, setActiveOption] = useState({ name: MAIN });
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);
  const files = useSelector((state) => state.Cabinet.chat.files);

  const options = [
    {
      name: FILES,
      title: __("Файлы"),
      subOptions: [],
      count: files ? Object.values(files).reduce((prev, current) => prev + current?.col ?? 0, 0) : 0
    },
    {
      name: MEDIA,
      title: __("Мультимедиа"),
      subOptions: [
        { title: __("Фото"), name: PHOTO },
        { title: __("Видео"), name: VIDEO },
        { title: __("Gif"), name: GIF }
      ],
      count: files?.image?.col || 0 + files?.video?.col || 0 + files?.video?.gif || 0
    },
    {
      name: DOCS,
      title: __("Документы"),
      subOptions: [],
      count: -1
    },
    {
      name: AUDIO,
      title: __("Аудио"),
      subOptions: [
        { title: __("Аудио смс"), name: VOICE_MESSAGES },
        { title: __("Музыка"), name: MUSIC }
      ],
      count: files?.audio?.col || 0
    },
    {
      name: LINKS,
      title: __("Ссылки"),
      subOptions: [],
      count: -1
    }
  ];

  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [styles.darkTheme]: chatTheme.name === DARK
      })}
    >
      {activeOption?.name === MAIN ? (
        <MainPanel setAction={setAction} setActiveOption={setActiveOption} options={options} />
      ) : (
        <Media setActiveOption={setActiveOption} activeOption={activeOption} />
      )}
    </div>
  );
};

export default InfoPanel;

InfoPanel.propTypes = {
  setAction: PropTypes.func.isRequired
};
