import React from "react";
import PropTypes from "prop-types";
import styles from "../Note/Note.module.sass";
import { colorType } from "types/Color";

const Corner = ({ id, id_color }) => {
  return (
    <svg
      width="48"
      height="26"
      viewBox="0 0 48 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.corner}
    >
      <path
        d="M47.7913 0.505859C42.5473 19.9381 4.22409 25.391 4.22409 25.391H0.0566406C30.2533 25.3041 26.3116 0.505859 26.3116 0.505859C38.8313 5.90661 47.7913 0.505859 47.7913 0.505859Z"
        fill={`url(#paint0_linear_3_95359${id})`}
      />
      <defs>
        <linearGradient
          id={`paint0_linear_3_95359${id}`}
          x1="18.9556"
          y1="4.91431"
          x2="28.4498"
          y2="20.246"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0363128" stopColor={`${id_color?.light}`} />
          <stop offset="0.2737" stopColor="#fff" />
          <stop offset="1" style={{ stopColor: id_color?.dark }} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Corner;

Corner.propTypes = {
  id: PropTypes.string,
  id_color: PropTypes.oneOfType([colorType, PropTypes.string])
};
