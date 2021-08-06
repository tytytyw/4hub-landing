import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import styles from './Safe.module.sass'
import SafeItem from './SafeItem'
import WorkSpace from './WorkSpace'
import PreviewFile from '../PreviewFile'
import ContextMenu from '../../../../generalComponents/ContextMenu'
import {contextMenuSafeItem} from '../../../../generalComponents/collections'
import ContextMenuItem from '../../../../generalComponents/ContextMenu/ContextMenuItem'
import classNames from 'classnames'
import {onGetSafes} from '../../../../Store/actions/PrivateCabinetActions'
import CodePopup from './Popups/CodePopup'
import NoSafe from './Popups/NoSafe'
import CreateSafe from './Popups/CreateSafe'

const Safe = ({filePreview, setFilePreview, fileSelect}) => {

    const dispatch = useDispatch()

    const path = useSelector(state => state.PrivateCabinet.folderList?.path)
    const [chosenFile, setChosenFile] = useState(null)
    const [mouseParams, setMouseParams] = useState(null)

    //const safes = []
    const safes = useSelector(state => state.PrivateCabinet.safes)
    const size = useSelector(state => state.PrivateCabinet.size)

    const [listCollapsed, setListCollapsed] = useState('')
    const [selectedSafe, setSelectedSafe] = useState(null)

    const [createSafe, setCreateSafe] = useState(false)

    const [codePopup, setCodePopup] = useState(false)
    const [refreshPass, setRefreshPass] = useState(false)
    const [noSafePopup, setNoSafePopup] = useState(false)

    const [action, setAction] = useState({type: '', name: '', text: ''})
    const nullifyAction = () => setAction({type: '', name: '', text: ''})

    useEffect(() => {
        setNoSafePopup(safes?.length < 1)
    }, [safes])

    useEffect(() => {
        dispatch(onGetSafes())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Clear action on change folder
    useEffect(() => {nullifyAction()}, [path])

    const renderSafesList = () => {
        if(!safes) return null
        return safes?.map((safe, i) => {
            return <SafeItem
                key={i + safe.name}
                safe={safe}
                listSize={size}
                chosen={setSelectedSafe?.id === safe.id}
                setMouseParams={setMouseParams}
                onClick={() => {
                    setSelectedSafe(safe)
                    setCodePopup(true)
                }}
            />
        })
    }

    const renderMenuItems = (target, type) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                // callback={() => setAction(type[i])}
                imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    }

    return (
        <div className={styles.workAreaWrap}>

            <div
                className={classNames({
                    [styles.listWrap]: true,
                    [styles.listWrapCollapsed]: !!listCollapsed
                })}
            >
                <div className={styles.header}>
                    {!listCollapsed && <span>Создать сейф</span>}
                    <div className={styles.imgWrap}>
                        <img
                            className={`${styles.playButton} ${listCollapsed ? styles.playButtonReverse : undefined}`}
                            src='./assets/PrivateCabinet/play-grey.svg'
                            alt='play'
                            onClick={() => setListCollapsed(!listCollapsed)}
                        />
                        <img
                            onClick={() => setCreateSafe(true)}
                            className={styles.icon}
                            src={`./assets/PrivateCabinet/add-safe.svg`}
                            alt='icon'
                        />
                    </div>
                </div>
                <div className={classNames(styles.children, styles?.[`children_${size}`])}>

                    {safes?.length < 1 ?
                        <div className={styles.emptyBlock}>
                            <img
                                className={styles.emptyImg}
                                src='./assets/PrivateCabinet/create_arrow.svg'
                                alt='Create Arrow'
                            />
                            <h4 className={styles.emptyTitle}>СОЗДАЙТЕ Ваш первый СЕЙФ</h4>
                        </div> :
                        <div className={classNames({
                            [styles.folderListWrap]: true,
                            [styles?.[`folderListWrap_${size}`]]: !!size
                        })}>
                            {renderSafesList()}
                        </div>}

                </div>
            </div>

            <WorkSpace
                listCollapsed={listCollapsed}

                filePreview={filePreview}
                setFilePreview={setFilePreview}

                chosenFile={chosenFile}
                setChosenFile={setChosenFile}

                fileSelect={fileSelect}

                action={action}
                setAction={setAction}
            />

            {filePreview?.view &&
                <PreviewFile
                    setFilePreview={setFilePreview}
                    file={filePreview?.file}
                    filePreview={filePreview}
                />}

            {mouseParams !== null &&
                <ContextMenu
                    params={mouseParams}
                    setParams={setMouseParams}
                    tooltip={true}
                >
                    <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuSafeItem.main)}</div>
                    <div style={{marginTop: '30px'}} className={styles.mainMenuItems}>{renderMenuItems(contextMenuSafeItem.additional)}</div>
                </ContextMenu>}

            {noSafePopup &&
            <NoSafe
                setCreateSafe={setCreateSafe}
                set={setNoSafePopup}
            />}

            {codePopup &&
            <CodePopup
                refreshPass={refreshPass}
                setRefreshPass={setRefreshPass}
                safe={selectedSafe}
                set={setCodePopup}
            />}

            {createSafe &&
            <CreateSafe
                onCreate={setCreateSafe}
            />}

        </div>
    )
}

export default Safe
