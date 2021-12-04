import React, { useState } from "react";
import ViewStandarts from "./view";
import UploadFile from "../UploadFile/UploadFile";

const DocPreview = ({ pageOption, setPageOption, setLoadingType }) => {
	// {setPageOption} , setSuccess
	const [success] = useState(false);
	const [blob, setBlob] = useState("");

	return (
		<>
			{success ? (
				<ViewStandarts />
			) : (
				<UploadFile
					blob={blob}
					setBlob={setBlob}
					title={pageOption.label}
					setLoadingType={setLoadingType}
					setPageOption={setPageOption}
				/>
			)}
		</>
	);
};

export default DocPreview;
