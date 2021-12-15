import React, { useState, useEffect } from "react";
import FileView from "./FileView";
import UploadFile from "../UploadFile/UploadFile";
import { onGetCompanyDocument }  from "../../../../../../Store/actions/CabinetActions";
import { useDispatch, useSelector } from "react-redux";

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
	const [blob, setBlob] = useState("");
	const companyDocuments = useSelector((state) => state.Cabinet.company.documents);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(onGetCompanyDocument(pageOption.name , setLoadingType))
	}, [pageOption]) // eslint-disable-line react-hooks/exhaustive-deps

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
