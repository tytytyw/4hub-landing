import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import File from "../../../../../generalComponents/Files";
import styles from "./FileItem.module.sass";
import "../../../../../generalComponents/colors.sass";

const FileItem = ({file}) => {
    console.log(file)
	return (
        <div className={styles.file_wrap}>
            <div className={styles.file_icon}>
                <File color={file.color} format={file.ext} />
            </div>
            <div className={styles.file_info}>
                    <p className={styles.name}>{file.name}</p>
                    <div className={styles.descr}>
                        <span className={styles.file_date}>{file.ctime.split(' ')[0]}</span>
                        <span className={styles.file_size}>{file.size_now}</span>
                    </div>
            </div>
            <div className={styles.symbols}>
                <div>{file?.fig ? <img src={`./assets/PrivateCabinet/signs/${file.fig}.svg`} alt='fig' /> : null}</div>
                <div>{file?.emo ? <img src={`./assets/PrivateCabinet/smiles/${file.emo}.svg`} alt='emoji' /> : null}</div>
                <div>{file?.is_pass ? <img class="FileBar_locked__1cit1" src="./assets/PrivateCabinet/locked.svg" alt="lock"></img> : null}</div>
                
                <div className={styles.file_menu}>
                    <span className={styles.dots}></span>
                    <span className={styles.dots}></span>
                    <span className={styles.dots}></span>
                </div>
            </div>
        </div>
	);
};

export default FileItem;
