import React, { useState } from "react";
import FileView from "./FileView";
import UploadFile from "../UploadFile/UploadFile";

const DocPreview = ({
	pageOption,
	setPageOption,
	setLoadingType,
	mouseParams,
	setMouseParams,
	renderMenuItems,
}) => {
	const [previewFile, setPreviewFile] = useState(false);
	const [blob, setBlob] = useState("");

	return (
		<>
			{previewFile ? (
				<FileView
					pageOption={pageOption}
					mouseParams={mouseParams}
					setMouseParams={setMouseParams}
					renderMenuItems={renderMenuItems}
				/>
			) : (
				<UploadFile
					blob={blob}
					setBlob={setBlob}
					pageOption={pageOption}
					setLoadingType={setLoadingType}
					setPageOption={setPageOption}
					setPreviewFile={setPreviewFile}
				/>
			)}
		</>
	);
};

export default DocPreview;
