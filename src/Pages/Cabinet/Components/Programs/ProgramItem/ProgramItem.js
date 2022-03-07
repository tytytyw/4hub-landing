import React, {useState} from 'react';
import styles from './ProgramItem.module.sass';
import {imageSrc} from "../../../../../generalComponents/globalVariables";
import classNames from "classnames";
import Comments from "../Comments/Comments";

function ProgramItem({program}) {

    const [params, setParams] = useState({isFavourite: program.isFavourite, openedComments: false});

    const onSetFavourite = () => setParams(s => ({...s, isFavourite: !s.isFavourite}));
    const onToggleComments = () => setParams(s => ({...s, openedComments: !s.openedComments}));

    return (
        <>
        <div className={classNames({
            [styles.itemWrap]: true,
            [styles.chosenItem]: params.openedComments
        })}>
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
            {params.openedComments ? <Comments hideComments={onToggleComments} comments={program.comments} program={program} /> : null}
        </>
    )
}

export default ProgramItem;