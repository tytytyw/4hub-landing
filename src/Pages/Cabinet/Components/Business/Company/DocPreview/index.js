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
	const [previewFileSrc, setPreviewFileSrc] = useState(null);
	const [fileSrc, setFileSrc] = useState(null);
	const [blob, setBlob] = useState("");

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
