import React, {useEffect, useRef, useState} from 'react';
import styles from './PreviewImageWithComment.module.sass';
import PopUp from "../../../../../../generalComponents/PopUp";
import classnames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import MiniToolBar from "../../../WorkElements/MiniToolBar/MiniToolBar";
import {drawCanvas} from "../../../PreviewFile/paintHelpers";
import {periods} from "../../../../../../generalComponents/collections";
import {onSetModals} from "../../../../../../Store/actions/CabinetActions";

//TODO - Need to switch to real users
import BlackMan from '../../../../../../assets/PrivateCabinet/minitoolbar/users/photo0.png'
import WhiteMan from '../../../../../../assets/PrivateCabinet/minitoolbar/users/photo1.png'
import Woman from '../../../../../../assets/PrivateCabinet/minitoolbar/users/photo2.png'

const c = {1: [
        {
            img: BlackMan,
            text: 'Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы ',
            replies: [
                {img: WhiteMan, text: 'Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы'},
                {img: Woman, text: 'Text'}
            ]
        },
        {
            img: WhiteMan,
            text: '60-х годах и, в более недавнее время, программы электронной',
            replies: []
        },
    ],
    7: [
        {
            img: BlackMan,
            text: 'Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы ',
            replies: [
                {img: WhiteMan, text: 'Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы'},
                {img: Woman, text: 'Text'}
            ]
        },
        {
            img: WhiteMan,
            text: '60-х годах и, в более недавнее время, программы электронной',
            replies: []
        },
    ]
}

function PreviewImageWithComment() {

    const canvasRef = useRef(null);
    const canvasWrapRef = useRef(null);
    const previewImageWithComment = useSelector(s => s.Cabinet.modals.previewWithComments);
    const [chosenFile, setChosenFile] = useState(previewImageWithComment.chosenFile || null);
    const [params, setParams] = useState({comments: c, renderedFirstImage: false});
    const dispatch = useDispatch();

    const renderImages = () => {
        if(!previewImageWithComment?.files) return null;
        const images = previewImageWithComment?.files?.filter(file => typeof file.mime_type === 'string' ? file.mime_type.includes('image') : false);
        return images.map((image, i) => <div
            className={classnames({
                [styles.itemWrap]: true,
                [styles.itemChosen]: image?.fid === chosenFile?.fid
            })}
            key={i}
            onClick={() => {
                setChosenFile(image);
                drawCanvas(canvasRef?.current, image.preview);
            }}
        >
            <div className={styles.hoverDelete} onClick={() => setChosenFile(image)}/>
            <img className={styles.image} src={image.preview} alt='img' draggable={false}/>

        </div>)
    }

    const toggleComment = () => {
        if(params.comments) return setParams(s => ({...s, comments: null}));
        return setParams(s => ({...s,
            comments: c}
        ));
    }

    const renderGroup = (obj) => {
        return Object.keys(obj).map(key => <div key={key} className={styles.periodWrap}>
            <div className={styles.period}>{periods[key]}</div>
            <div className={styles.commentList}>
                {renderComments(obj[key])}
            </div>
        </div>)
    }

    const renderComments = (array) => (
        array.map((comment, i) => <div key={i} className={styles.commentWrap}>
            <div className={styles.commentItem}>
                <div className={styles.leftPart}>
                    <img src={comment.img} alt='avatar' className={styles.image} />
                    <div className={styles.text}>{comment.text}</div>
                </div>
                <div className={styles.reply}>Ответить</div>
            </div>
            {comment?.replies?.length > 0 ? <div className={styles.replies}>
                {renderComments(comment.replies)}
            </div> : null}
        </div>)
    )

    //rendering chosen image on opening modal
    useEffect(() => {
        if(previewImageWithComment?.chosenFile?.preview && canvasRef?.current.getBoundingClientRect().width > 0 && !params.renderedFirstImage) {
            setParams(s => ({...s, renderedFirstImage: true}))
            drawCanvas(canvasRef?.current, previewImageWithComment.chosenFile.preview)
        }
    }, [previewImageWithComment.chosenFile.preview, params.renderedFirstImage]); //eslint-disable-line

    const closeModal = () => dispatch(onSetModals('previewWithComments', {...previewImageWithComment, open: false, files: [], chosenFile: null}))

    return(<PopUp set={closeModal}>
        <div className={styles.wrap}>
            <div className={styles.imagePanel}>
                {renderImages()}
            </div>
            <div className={styles.workingPanel}>
                <div className={styles.miniToolBarWrap}>
                    <MiniToolBar
                        canvasRef={canvasRef}
                        canvasWrapRef={canvasWrapRef}
                        file={chosenFile}
                        isPreview={false}
                        isComment={true}
                        toggleComment={toggleComment}
                        setFilePreview={closeModal}
                    />
                </div>
                <div className={styles.drawPanel} ref={canvasWrapRef}>
                    <canvas
                        ref={canvasRef}
                        width={canvasWrapRef?.current?.getBoundingClientRect().width}
                        height={canvasWrapRef?.current?.getBoundingClientRect().height}
                        className={styles.canvas}
                    />
                    {params.comments ? <div className={styles.comments}>
                        {renderGroup(params.comments)}
                    </div> : null}
                </div>
            </div>
        </div>
    </PopUp>)
}

export default PreviewImageWithComment;
