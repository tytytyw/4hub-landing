import React, {useState} from 'react';
import styles from './ProgramItem.module.sass';
import {imageSrc} from "../../../../../generalComponents/globalVariables";
import classNames from "classnames";

function ProgramItem({program}) {

    const [params, setParams] = useState({isFavourite: program.isFavourite, openedComments: false});

    const onSetFavourite = () => setParams(s => ({...s, isFavourite: !s.isFavourite}));
    const onToggleComments = () => program.comments.length > 0 ? setParams(s => ({...s, openedComments: !s.openedComments})) : null;

    return (
        <div className={styles.itemWrap}>
            <div className={styles.leftGroup}>
                <img src={program.icon} alt='ico' className={styles.programImage} />
                <div className={styles.programName}>{program?.name}</div>
            </div>
            <div className={styles.centerGroup}>
                <div className={styles.copyLink}>{program.link}</div>
            </div>
            <div className={styles.rightGroup}>
                <div
                    className={classNames({
                        [styles.openComments]: true,
                        [styles.isComments]: program.comments.length > 0,
                        [styles.openedComments]: params.openedComments
                    })}
                    onClick={onToggleComments}
                >
                    <span>Отзывы</span>&nbsp;
                    <span>({program.comments.length})</span>
                </div>
                <img onClick={onSetFavourite} className={params.isFavourite ? styles.isFavourite : styles.isNotFavourite} src={`${imageSrc}assets/PrivateCabinet/programs/${params.isFavourite ? 'star' : 'greyStar'}.svg`} alt='favourite' />
            </div>
        </div>
    )
}

export default ProgramItem;