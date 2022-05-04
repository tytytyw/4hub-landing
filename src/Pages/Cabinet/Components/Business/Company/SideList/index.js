import React from "react";
import styles from "./SideList.module.sass";

import ListMenu from "./ListMenu";
import AddLogo from "./AddLogo";
import PropTypes from "prop-types";
import { mouseParamsProps } from "../../../../../../types/MouseParams";

const SideList = ({
  data = [],
  pageOption,
  setPageOption,
  mouseParams,
  setMouseParams,
  renderMenuItems,
  setAction,
  companyName,
  setCompanyName,
  companyLogo,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.topHeader}>
        <AddLogo
          mouseParams={mouseParams}
          setMouseParams={setMouseParams}
          renderMenuItems={renderMenuItems}
          setAction={setAction}
          companyName={companyName}
          setCompanyName={setCompanyName}
          companyLogo={companyLogo}
        />
      </div>

      <ListMenu
        page={pageOption}
        setPage={setPageOption}
        menuData={data}
        setPageOption={setPageOption}
      />
    </div>
  );
};

export default SideList;

SideList.propTypes = {
  data: PropTypes.array,
  pageOption: PropTypes.object,
  setPageOption: PropTypes.func,
  mouseParams: mouseParamsProps,
  setMouseParams: PropTypes.func,
  renderMenuItems: PropTypes.func,
  setAction: PropTypes.func,
  companyName: PropTypes.string,
  setCompanyName: PropTypes.func,
  companyLogo: PropTypes.any,
};

SideList.defaultProps = {
  data: [],
};
