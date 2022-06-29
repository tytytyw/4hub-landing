import React, { useState } from "react";
import styles from "./JournalFileLine.module.sass";
import { journalFileProps } from "../../../../../types/File";
import File from "generalComponents/Files";
import { useLocales } from "react-localized";
import OpenInFolderButton from "generalComponents/OpenInFolderButton/OpenInFolderButton";

function JournalFileLine({ file }) {
  const { __ } = useLocales();

  const [isHover, setIsHover] = useState(false);

  const testFile = {
    adate: false,
    color: "rgb(52, 174, 196)",
    ctime: "10.06.2022 00:02",
    date: 1654808524,
    date_archive: "01.01.1970 03:00",
    deadline: 2208981600,
    deny_edit: "0",
    edit_url: "",
    edit_url2:
      "https://fs2.mh.net.ua/oo.php?fid=dce5a70ae38621acd7c5a2d5aedefefa&access_token=227da18a5d0fd47124875596a8b92112",
    emo: "",
    ext: "JPG",
    fid: "dce5a70ae38621acd7c5a2d5aedefefa",
    fig: "",
    file: "3cafa31b2fbff7ac594344008dbfe0cf",
    file_link: "https://fs2.mh.net.ua/file/dce5a70ae38621acd7c5a2d5aedefefa",
    fname: "rename.jpg",
    gdir: "global/all/testText",
    is_archive: "0",
    is_del: "0",
    is_dir: 0,
    is_pass: 0,
    is_preview: 1,
    mime_type: "image/jpeg",
    mtime: "11.06.2022 22:36",
    name: "rename.jpg",
    nameindb: "rename.jpg",
    otime: "01.01.1970 03:00",
    preview: "/upload/227da18a5d0fd47124875596a8b92112/global/all/testText/3cafa31b2fbff7ac594344008dbfe0cf",
    size: 158326,
    size_now: "154.6 KB",
    tag: "",
    tag2: "ZZZZZZZZZZZZ"
  };

  return (
    <div className={styles.journalFileLine} onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <div className={styles.fileAbout}>
        <div className={styles.icon}>
          <File color={file?.id_color} format={file?.ext} />
        </div>
        <div className={styles.fileText}>
          <div className={styles.fileName}>{file?.name && file?.name.slice(0, file?.name.lastIndexOf("."))}</div>
          <div className={styles.fileDate}>
            {file?.mtime?.split(" ")[0]} {file?.size_now}
          </div>
        </div>
      </div>
      <div className={styles.fileRights}>{__("Просмотр")}</div>
      <div className={styles.users}>
        <div className={styles.userIcon}>ICO</div>
        <div className={styles.safe}>Срок хранения: (8дней)</div>
      </div>
      <OpenInFolderButton file={testFile} isHover={isHover} />
    </div>
  );
}

export default JournalFileLine;

JournalFileLine.propTypes = {
  file: journalFileProps
};
