import React from "react";
import styles from "./FileMessage.module.sass";
import File from "../../../../../../../generalComponents/Files";

const FileMessage = ({ file }) => {
	const ext = file.name.slice(file.name.lastIndexOf(".") + 1);

	return (
		<div className={styles.wrapper}>
			<div className={styles.fileBar}>
				<div className={styles.file}>
					<File color="grey" format={ext} className={styles.mainFile} />
				</div>
				<div className={styles.fname}>{file.name}</div>
			</div>
		</div>
	);
};

export default FileMessage;
