import React from "react";
import File from "../../../../../generalComponents/Files";
import styles from "./FileItem.module.sass";
import "../../../../../generalComponents/colors.sass";

const FileItem = ({file, listCollapsed}) => {
	return (
        <div className={styles.file_wrap}>
            <div className={styles.file_icon}>
                <File color={file.color} format={file.ext} />
            </div>
            {!listCollapsed &&
            <div className={styles.file_info}>
                    <p className={styles.name}>{file.name}</p>
                    <div className={styles.descr}>
                        <span className={styles.file_date}>{file.ctime.split(' ')[0]}</span>
                        <span className={styles.file_size}>{file.size_now}</span>
                    </div>
            </div>}
            <div className={styles.symbols}>
                {!listCollapsed && <>
                <div>{file?.fig ? <img src={`./assets/PrivateCabinet/signs/${file.fig}.svg`} alt='fig' /> : null}</div>
                <div>{file?.emo ? <img src={`./assets/PrivateCabinet/smiles/${file.emo}.svg`} alt='emoji' /> : null}</div>
                <div>{file?.is_pass ? <img src="./assets/PrivateCabinet/locked.svg" alt="lock"></img> : null}</div></>}
                
                <div className={styles.file_menu}>
                    <span className={styles.dots}></span>
                </div>
            </div>
        </div>
	);
};

export default FileItem;
