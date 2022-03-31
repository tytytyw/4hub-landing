import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { onGetSafeFileList } from "../../../../../../Store/actions/CabinetActions";
import { useScrollElementOnScreen } from "../../../../../../generalComponents/Hooks";
import Loader from "../../../../../../generalComponents/Loaders/4HUB";

import styles from './WorkBarsPreview.module.sass';
import File from '../../../../../../generalComponents/Files';
import api from '../../../../../../api';
import {useLocales} from "react-localized";

const WorkBarsPreview = ({
    children,
    file,
    setLoadingType,
    fileRef,
	gLoader,
	filesPage,
	onSuccessLoading,
	loadingFiles,
	setLoadingFiles,}) => {
    const { __ } = useLocales();
    const search = useSelector(state => state.Cabinet?.search);
    const size = useSelector(state => state.Cabinet.size);
    const uid = useSelector(state => state.user.uid);
    const authorizedSafe = useSelector(state => state.Cabinet.safe.authorizedSafe);
    const [previewReq, setPreviewReq] = useState({sent: false, data: null});
    const dispatch = useDispatch();
    
    const innerFilesHeight = () => {
        switch(size) {
            case 'small': return '106px';
            case 'medium': return '149px';
            default: return '177px'
        }
    }
    
    //TODO: refactor: import getPreview
    const getPreview = () => {
        if(!previewReq.sent) {
            setLoadingType('squarify')
            setPreviewReq({...previewReq, sent: true});
            api.get(`/ajax/safe_file_preview.php?uid=${uid}&fid=${file.fid}&id_safe=${authorizedSafe.id_safe}&pass=${authorizedSafe.password}&code=${authorizedSafe.code}`, {
                responseType: 'blob'
            })
                .then(res => {
                    const blob = new Blob([res.data])
                    let objectURL = URL.createObjectURL(blob);
                    setPreviewReq({sent: false, data: objectURL})
                })
                .catch(err => console.log(err))
                .finally(() => setLoadingType(false)) 
        }
    }

    const renderFilePreview = () => {
        if (file?.mime_type) {
            switch (file.mime_type.split('/')[0]) {
            case 'image': {
                return <img src={previewReq.data} alt='filePrieview' />
            }
            default: {
                return <div className={styles.filePreviewWrap}><File format={file?.ext} color={file?.color} /></div>
            }
        }}
    }

    useEffect(() => {
        if (file?.is_preview === 1) {
            getPreview()
        }
        renderFilePreview()
        setPreviewReq({sent: false, data: null})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file])

    const load = (entry) => {
		if (!gLoader && authorizedSafe) {

			if (entry.isIntersecting && !loadingFiles && filesPage !==0) {
				setLoadingFiles(true);
				dispatch(
					onGetSafeFileList(
						authorizedSafe.code,
						authorizedSafe.id_safe,
						authorizedSafe.password,
						onSuccessLoading,
						"",
						"",
						search,
						filesPage,
						''
					)
				);
			}
		}
	};

	const options = {
		root: null,
		rootMargin: "0px",
		threshold: 0,
	};

	const [containerRef] = useScrollElementOnScreen(options, load);

	useEffect(() => {
        setLoadingFiles(false);
    }, []) //eslint-disable-line

    return (<div
        className={styles.workBarsPreviewWrap}
        style={{
            height: 'calc(100% - 90px - 55px)',
            gridTemplateColumns: size === 'small'
                ? 'repeat(auto-fill, 118px)'
                : size === 'medium'
                    ? 'repeat(auto-fill, 160px)'
                    : 'repeat(auto-fill, 205px)',
            gridAutoRows: size === 'small'
                ? '118px'
                : size === 'medium'
                    ? '160px'
                    : '205px',
        }}
    >
        <div className={styles.preview} style={{height: `calc(100% - ${innerFilesHeight()} - 40px)`}}>
            {children?.length === 0 && search.length !== 0
                ? <div
                    className={styles.noSearchResults}
                >{ __('Нет элементов удовлетворяющих условиям поиска') }</div>
                : null}
            {file ? file.is_preview === 1 ? renderFilePreview() : <div><div className={styles.filePreviewWrap}><File format={file?.ext} color={file?.color} /></div></div> : null}
        </div>
        {authorizedSafe && <div className={styles.renderedFiles}>
            <div ref={fileRef} className={styles.innerFiles}>
            {!gLoader && children}
                {!gLoader ? <div
                    className={`${styles.rightLine} ${filesPage === 0 ? styles.rightLineHidden : ''}`}
                    style={{height: '100%'}}
                    ref={containerRef}
                >
                    <Loader
                        type='bounceDots'
                        position='absolute'
                        background='white'
                        zIndex={5}
                        width='100px'
                        height='100px'
                        containerType='bounceDots'
                    />
                </div> : null}
            </div>
        </div>}
    </div>)
}

export default WorkBarsPreview;