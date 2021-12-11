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
}) => {
	const [previewFileSrc, setPreviewFileSrc] = useState(null);
	const [fileSrc, setFileSrc] = useState(null);
	const [blob, setBlob] = useState("");
	const companyDocuments = useSelector((state) => state.Cabinet.company.documents);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(onGetCompanyDocument(pageOption.name))
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	console.log(companyDocuments)

	return (
		<>
			{previewFileSrc ? (
				<FileView
					pageOption={pageOption}
					mouseParams={mouseParams}
					setMouseParams={setMouseParams}
					renderMenuItems={renderMenuItems}
					fileSrc={fileSrc}
				/>
			) : (
				<UploadFile
					blob={blob}
					setBlob={setBlob}
					pageOption={pageOption}
					setLoadingType={setLoadingType}
					setPageOption={setPageOption}
					setPreviewFile={setPreviewFileSrc}
					setFileSrc={setFileSrc}
				/>
			)}
		</>
	);
};

export default DocPreview;
