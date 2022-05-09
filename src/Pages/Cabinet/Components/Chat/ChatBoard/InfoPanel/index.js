import React, { useState } from "react";
import styles from "./InfoPanel.module.sass";

import MainPanel from "./MainPanel";
import Media from "./Media";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useLocales } from "react-localized";
import classNames from "classnames";

const InfoPanel = ({ setAction }) => {
  const { __ } = useLocales();

  const [activeOption, setActiveOption] = useState({ name: "main" });
  const chatTheme = useSelector((state) => state.Cabinet.chat.theme);
  const files = useSelector((state) => state.Cabinet.chat.files);

  const options = [
    {
      name: "files",
      title: __("Файлы"),
      subOptions: [],
      count: files ? Object.values(files).reduce((prev, current) => prev + current?.col ?? 0, 0) : 0
    },
    {
      name: "media",
      title: __("Мультимедиа"),
      subOptions: [
        { name: __("Фото"), id: "photo" },
        { name: __("Видео"), id: "video" },
        { name: __("Gif"), id: "gif" }
      ],
      count: files?.image?.col || 0 + files?.video?.col || 0 + files?.video?.gif || 0
    },
    {
      name: "docs",
      title: __("Документы"),
      subOptions: [],
      count: -1
    },
    {
      name: "audio",
      title: __("Аудио"),
      subOptions: [
        { name: __("Аудио смс"), id: "voiceMessages" },
        { name: __("Музыка"), id: "music" }
      ],
      count: files?.audio?.col || 0
    },
    {
      name: "links",
      title: __("Ссылки"),
      subOptions: [],
      count: -1
    }
  ];

  return (
    <div
      className={classNames({
        [styles.wrapper]: true,
        [styles.darkTheme]: chatTheme.name === "dark"
      })}
    >
      {activeOption?.name === "main" ? (
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
