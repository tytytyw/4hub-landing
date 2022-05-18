import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./Select.module.sass";
import classnames from "classnames";
import PropTypes from "prop-types";

const Select = ({ data, initValue, onChange, cleareFilter, chatTheme, ...props }) => {
  const { theme } = useSelector((state) => state.user.userInfo);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(initValue);
  const ref = useRef();

  useEffect(() => {
    const onClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const getValue = () => {
    if (!value) {
      return props.placeholder;
    }

    const valueItem = data.find((item) => item?.id === value);
    return valueItem?.text;
  };

  useEffect(() => {
    if (!open && !value) cleareFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, value]);

  return (
    <div
      ref={ref}
      className={classnames({
        [styles.selectWrap]: true,
        [props.className]: true,
        [styles.active]: !!open,
        [styles.darkTheme]: chatTheme === "dark"
      })}
    >
      <div
        onClick={() => {
          setOpen(!open);
          setValue("");
        }}
        className={classnames({
          [styles.select]: true,
          [styles.selected]: !!value
        })}
      >
        <div className={styles.valueWrap}>
          <span
            className={classnames({
              [styles.selectInput]: !props.classNameSelect,
              [props.classNameSelect]: !!props.classNameSelect
            })}
          >
            {getValue()}
          </span>
        </div>
        <span
          className={classnames({
            [styles.arrow]: true,
            [styles.active]: !!open
          })}
        />
      </div>

      <div
        className={classnames(
          {
            [styles.contentWrap]: true,
            [styles.active]: !!open
          },
          `scrollbar-thin-${theme}`
        )}
      >
        <ul className={styles.content}>
          {data.length > 1
            ? data.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setOpen(false);
                    setValue(item.id);
                    onChange(item.id);
                  }}
                  className={classnames({
                    [styles.option]: true,
                    [styles.active]: value === item.id
                  })}
                >
                  {item.text}
                </li>
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default Select;

Select.defaultProps = {
  data: [],
  initValue: "",
  onChange: () => {},
  cleareFilter: () => {}
};

Select.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.exact({
      active: PropTypes.bool,
      id: PropTypes.string,
      text: PropTypes.string
    }),
    PropTypes.array
  ]),
  initValue: PropTypes.string,
  onChange: PropTypes.func,
  cleareFilter: PropTypes.func,
  chatTheme: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  classNameSelect: PropTypes.string
};
