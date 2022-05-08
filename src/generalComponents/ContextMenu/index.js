import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import styles from "./ContextMenu.module.sass";
import { mouseParamsProps } from "../../types/MouseParams";

const ContextMenu = ({
  children,
  params,
  setParams,
  tooltip,
  itemRef,
  customClose,
  movehorizontal,
  disableAutohide,
  withoutOffset,
  style
}) => {
  const closeContext = (e) => {
    if (!customClose) {
      setParams(null);
    } else {
      setMenuIsUsed(true);
      if (navigator.userAgent.includes("Chrome")) {
        const isBackground =
          e.path.filter((el) => {
            if (typeof el?.classList === "object" && typeof el?.classList[0] === "string") {
              return el.classList[0].includes(styles.background);
            }
            return false;
          }).length > 0;
        if (isBackground) setParams(null);
      }
    }
  };
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const contextMenuRef = useRef();
  const [top, setTop] = useState({ menu: "", tooltip: "" });
  const [element, setElement] = useState(null);
  const [menuIsUsed, setMenuIsUsed] = useState(false);

  useEffect(() => {
    if (itemRef) setElement(itemRef.current.getBoundingClientRect());
    setMenuVertical();
    window.addEventListener("click", closeContext);
    return () => window.removeEventListener("click", closeContext);
    // eslint-disable-next-line
  }, []);

  const setMenuHorizontal = () => {
    if (withoutOffset) return `${params.x - params.width / 2}px`;
    if (params.width + params.x >= screenWidth) {
      return `${params.x - params.width}px`;
    } else {
      return `${params.x}px`;
    }
  };

  const setMenuVertical = () => {
    if (contextMenuRef.current.offsetHeight + params.y >= screenHeight) {
      setTop({
        ...top,
        menu: `${params.y - contextMenuRef.current.offsetHeight - 20}px`,
        tooltip: `${contextMenuRef.current.offsetHeight}px`
      });
    } else {
      setTop({ ...top, menu: `${params.y + 10}px`, tooltip: "-20px" });
    }
  };

  const autoHide = () => {
    if (menuIsUsed && !disableAutohide) setParams(null);
  };

  return (
    <>
      <div
        className={styles.contextMenuWrap}
        onMouseLeave={autoHide}
        ref={contextMenuRef}
        style={{
          top: element ? `${element.bottom}px` : top.menu,
          left: element
            ? `${element.left + element.width / 2 - params.width / 2 + movehorizontal}px`
            : setMenuHorizontal(),
          ...style
        }}
      >
        <div className={styles.wrap}>
          {!element && tooltip ? (
            <span
              className={styles.span}
              style={{
                top: top.tooltip,
                right: params.width + params.x >= screenWidth ? "0px" : `${params.width - 20}px`,
                borderTop: top.tooltip === "-20px" ? "" : "10px solid white",
                borderBottom: top.tooltip !== "-20px" ? "" : "10px solid white"
              }}
            />
          ) : null}
          {children}
        </div>
      </div>
      <div className={styles.background} />
    </>
  );
};

export default ContextMenu;

ContextMenu.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element]),
  params: mouseParamsProps,
  setParams: PropTypes.func,
  tooltip: PropTypes.bool,
  itemRef: PropTypes.objectOf(PropTypes.object),
  customClose: PropTypes.bool,
  movehorizontal: PropTypes.number,
  disableAutohide: PropTypes.bool,
  withoutOffset: PropTypes.bool,
  style: PropTypes.exact({
    boxShadow: PropTypes.string
  })
};

ContextMenu.defaultProps = {
  movehorizontal: 0,
  disableAutohide: false,
  withoutOffset: false,
  style: {}
};
