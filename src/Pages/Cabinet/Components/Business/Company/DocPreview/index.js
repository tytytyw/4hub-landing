import React, { useState, useEffect } from "react";
import FileView from "./FileView";
import UploadFile from "../UploadFile/UploadFile";
import { onGetCompanyDocument } from "../../../../../../Store/actions/CabinetActions";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { mouseParamsProps } from "../../../../../../types/MouseParams";
import { actionProps } from "../../../../../../types/Action";

const DocPreview = ({
  pageOption,
  setPageOption,
  setLoadingType,
  mouseParams,
  setMouseParams,
  renderMenuItems,
  action,
  setAction,
  nullifyAction,
  setShowSuccessMessage
}) => {
  const [blob, setBlob] = useState({});
  const companyDocuments = useSelector(
    state => state.Cabinet.company.documents
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onGetCompanyDocument(pageOption.name, setLoadingType));
  }, [pageOption]);

  return (
    <>
      {companyDocuments[pageOption.name]?.preview ? (
        <FileView
          pageOption={pageOption}
          mouseParams={mouseParams}
          setMouseParams={setMouseParams}
          renderMenuItems={renderMenuItems}
          previewSrc={companyDocuments[pageOption.name]?.preview}
          editSrc={companyDocuments[pageOption.name]?.edit}
          downloadFileSrc={companyDocuments[pageOption.name]?.file}
          action={action}
          setAction={setAction}
          nullifyAction={nullifyAction}
          setShowSuccessMessage={setShowSuccessMessage}
        />
      ) : (
        <UploadFile
          blob={blob}
          setBlob={setBlob}
          pageOption={pageOption}
          setLoadingType={setLoadingType}
          setPageOption={setPageOption}
        />
      )}
    </>
  );
};

export default DocPreview;

DocPreview.propTypes = {
  pageOption: PropTypes.shape({
    name: PropTypes.string
  }),
  setPageOption: PropTypes.func,
  setLoadingType: PropTypes.func,
  mouseParams: mouseParamsProps,
  setMouseParams: PropTypes.func,
  renderMenuItems: PropTypes.func,
  action: actionProps,
  setAction: PropTypes.func,
  nullifyAction: PropTypes.func,
  setShowSuccessMessage: PropTypes.func
};
