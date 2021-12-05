import React, { useState } from "react";
import ViewStandarts from "./view";
import UploadFile from "../UploadFile/UploadFile";

const DocPreview = ({ pageOption, setPageOption, setLoadingType }) => {
	const [previewFile, setPreviewFile] = useState(false);
	const [blob, setBlob] = useState("");

	return (
		<>
			{previewFile ? (
				<ViewStandarts pageOption={pageOption} />
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
