import React from "react";
import { colors } from "../../../../../generalComponents/collections";
import PropTypes from "prop-types";

const getColorObj = (type) => colors?.find((item) => item.name === type);

const FolderIcon = ({ type, fill, ...props }) => {
  const lightColor = getColorObj(type)?.light;
  const darkColor = getColorObj(type)?.dark;

  const getFill = (type = "dark") => {
    const color = type === "dark" ? darkColor : lightColor;
    return fill || color;
  };
  return (
    <svg
      className={props.className}
      width="19px"
      height="17px"
      viewBox="0 0 19 17"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="folder-2">
        <path
          fill={getFill()}
          d="M8.28906 2.13889L6.84594 0.16775L6.72344 0L0 0L0 16.1944L18.75 16.1944L18.75 2.13889L8.28906 2.13889ZM0.625 15.5833L0.625 0.611111L6.40156 0.611111L7.96406 2.75L7.96781 2.75L9.43344 4.75169C9.49438 4.83481 9.59 4.87911 9.6875 4.87942L9.6875 4.88889L18.125 4.88889L18.125 15.5833L0.625 15.5833Z"
          transform="translate(0 0.15277778)"
          id="Shape"
          stroke="none"
        />
        <path
          fill={getFill()}
          d="M9.38844 0L9.38844 1.52778L1.11844 1.52778L0 0L9.38844 0Z"
          transform="translate(8.736563 2.9027777)"
          id="Path"
          stroke="none"
        />
      </g>
    </svg>
  );
};

export default FolderIcon;

FolderIcon.propTypes = {
  type: PropTypes.string,
  fill: PropTypes.object,
  className: PropTypes.string
};

FolderIcon.defaultProps = {
  type: "grey",
  fill: null
};
