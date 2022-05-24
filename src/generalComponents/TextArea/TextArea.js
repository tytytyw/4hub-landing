import React from "react";
import PropTypes from "prop-types";
import styles from "./TextArea.module.sass";
import { ReactComponent as BarsIcon } from "assets/PrivateCabinet/textarea/bars.svg";
import { ReactComponent as FontSizeIcon } from "assets/PrivateCabinet/textarea/font-size.svg";
import { ReactComponent as LockIcon } from "assets/PrivateCabinet/textarea/lock.svg";
import { ReactComponent as NoteItemIcon } from "assets/PrivateCabinet/textarea/note-item.svg";

function TextArea({ text, onChange, placeholder, height }) {
  const onTypeText = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.textAreaWrap} style={{ height }}>
      <textarea className={styles.textArea} value={text} onChange={onTypeText} placeholder={placeholder} />
      <div className={styles.managementPanel}>
        <button onClick={(e) => e.preventDefault()}>
          <FontSizeIcon />
        </button>
        <button onClick={(e) => e.preventDefault()}>
          <NoteItemIcon />
        </button>
        <button onClick={(e) => e.preventDefault()}>
          <BarsIcon />
        </button>
        <button onClick={(e) => e.preventDefault()}>
          <LockIcon />
        </button>
      </div>
    </div>
  );
}

export default TextArea;

TextArea.defaultProps = {
  placeholder: "",
  onChange: () => {},
  height: 218
};

TextArea.propTypes = {
  text: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  height: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
