import React, { useRef } from "react";
import { useLocales } from "react-localized";

import styles from "./SendSuccess.module.sass";
import File from "../../../generalComponents/Files";
import { imageSrc } from "../../../generalComponents/globalVariables";
import PropTypes, { string } from "prop-types";

const SendSuccess = ({ data, set }) => {
  const { __ } = useLocales();
  const format = data.files.file.name.split(".");
  const ref = useRef(null);

  const copyText = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(`http://fs2.mh.net.ua${data.link}`);
    } else {
      ref.current.focus();
      ref.current.select();
      document.execCommand("copy");
    }
  };

  return (
    <div className={styles.successWrap}>
      <div>{__("Файл успешно отправлен")}</div>
      <span className={styles.cross} onClick={() => set("")} />
      <div className={styles.imageWrap}>
        <img
          src={imageSrc + "assets/StartPage/success-file-send.svg"}
          alt="computer"
          className={styles.computer}
        />
        <img
          src={imageSrc + "assets/StartPage/paper-plane-left.svg"}
          alt="paper-plane"
          className={styles.planeLeft}
        />
        <img
          src={imageSrc + "assets/StartPage/paper-plane-right.svg"}
          alt="paper-plane"
          className={styles.planeRight}
        />
        <div className={styles.fileWrap}>
          <File format={format[format.length - 1].toLowerCase()} />
        </div>
      </div>
      <span className={styles.infoText}>
        {__(
          "Ваш файл успешно отправлен на указанный email так же вы можете скопировать ссылку"
        )}
      </span>
      <div className={styles.linkWrap}>
        <div className={styles.inputWrap}>
          <input
            ref={ref}
            type="text"
            value={`http://fs2.mh.net.ua${data.link}`}
            readOnly
          />
        </div>
        <div
          className={styles.imgWrap}
          onClick={() =>
            navigator.clipboard.writeText(`http://fs2.mh.net.ua${data.link}`)
          }>
          <img src={imageSrc + "assets/StartPage/link-icon.svg"} alt="copy" />
        </div>
      </div>
      <div className={styles.copyButton} onClick={() => copyText()}>
        {__("Копировать ссылку")}
      </div>
    </div>
  );
};

export default SendSuccess;

SendSuccess.propTypes = {
  data: PropTypes.shape({
    link: PropTypes.string,
    files: PropTypes.shape({
      file: PropTypes.shape({
        name: string
      })
    })
  }),
  set: PropTypes.func
};
