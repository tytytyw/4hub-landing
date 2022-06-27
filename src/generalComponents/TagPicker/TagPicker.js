import React, { useEffect, useRef, useState } from "react";
import styles from "./TagPicker.module.sass";
import classnames from "classnames";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useTags } from "../collections";
import { useLocales } from "react-localized";

function TagPicker({ tag, onSelectTag, placeholder }) {
  const { __ } = useLocales();
  const { theme } = useSelector((s) => s.user.userInfo);

  const tagRef = useRef(null);

  const handleChoose = () => {
    tagRef.current.style.display = "none";
    setTimeout(() => {
      tagRef.current.style.display = "";
    }, 0);
  };
  const [tagOption, setTagOption] = useState({
    count: 30
  });
  const tags = useTags();
  const renderTags = () => {
    return tags.map((tag, i) => {
      return (
        <div key={i} onClick={() => onChangeTag(tag)}>
          {tag}
        </div>
      );
    });
  };
  const onChangeTag = (tag) => {
    const count = 30 - tag.length;
    if (count >= 0) {
      onSelectTag(tag);
      setTagOption({ ...tagOption, count });
    }
  };

  useEffect(() => {
    if (tag.length === 0) {
      onSelectTag(tags[0]);
    }
  }, []); //eslint-disable-line

  return (
    <div className={styles.tagPicker}>
      <span>#</span>
      <input
        className={styles.inputField}
        type="text"
        placeholder={placeholder ?? __("Добавьте #Тег")}
        value={tag}
        onChange={(e) => onChangeTag(e.target.value)}
        onFocus={() => {
          setTagOption({ ...tagOption, show: true });
        }}
      />
      <span>{tagOption.count}/30</span>
      <div className={classnames(styles.tagList, `scrollbar-thin-${theme}`)} ref={tagRef} onClick={handleChoose}>
        {renderTags()}
      </div>
    </div>
  );
}

export default TagPicker;

TagPicker.defaultProps = {
  placeholder: "",
  onSelectTag: () => {}
};

TagPicker.propTypes = {
  tag: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onSelectTag: PropTypes.func.isRequired
};
