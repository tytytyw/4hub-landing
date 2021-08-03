import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import styles from './WorkSpace.module.sass'
import {fileDelete} from '../../../../../generalComponents/fileMenuHelper'
import {onDeleteFile} from '../../../../../Store/actions/PrivateCabinetActions'
import ContextMenuItem from '../../../../../generalComponents/ContextMenu/ContextMenuItem'
import SearchField from '../../SearchField'
import StorageSize from '../../StorageSize'
import Notifications from '../../Notifications'
import Profile from '../../Profile'
import WorkBars from '../WorkElements/WorkBars'
import BottomPanel from '../../ButtomPanel'
import ContextMenu from '../../../../../generalComponents/ContextMenu'
import ActionApproval from '../../../../../generalComponents/ActionApproval'
import File from '../../../../../generalComponents/Files'
import CustomizeFile from '../../ContextMenuComponents/ContextMenuFile/CustomizeFile'
import {contextMenuFile} from '../../../../../generalComponents/collections'
import Categories from '../Categories'
import ProgramShop from '../WorkElements/ProgramShop'
import MoreProgram from '../WorkElements/MoreProgram'

const WorkSpaceShop = ({
                           setBlob, blob, fileLoading,

                           chosenProgram, setChosenProgram,
                           chosenCategory, setChosenCategory,
                           chosenFolder,

                           listCollapsed, setItem,

                           fileSelect
                       }) => {

    const dispatch = useDispatch();
    const programs = useSelector(state => state.PrivateCabinet.programs);

    const [moreProgram, setMoreProgram] = useState(null);
    const [mouseParams, setMouseParams] = useState(null);
    const [action, setAction] = useState({type: '', name: '', text: ''});

    const nullifyAction = () => setAction({type: '', name: '', text: ''});

    const callbackArrMain = ['', '', '', '',
        {type: 'customize', name: 'Редактирование файла', text: ``},
        '', '', '', '', '', '', ''];
    const additionalMenuItems = [
        {type: 'delete', name: 'Удаление файла', text: `Вы действительно хотите удалить файл ${chosenProgram?.name}?`}
    ];

    const deleteFile = () => {
        fileDelete(chosenProgram, dispatch, onDeleteFile);
        nullifyAction();
        setChosenProgram(null)
    }

    useEffect(() => setMoreProgram(null), [
        chosenFolder,
        chosenProgram,
        chosenCategory
    ])

    const renderMenuItems = (target, type) => {
        return target.map((item, i) => {
            return <ContextMenuItem
                key={i}
                width={mouseParams.width}
                height={mouseParams.height}
                text={item.name}
                callback={() => setAction(type[i])}
                imageSrc={`./assets/PrivateCabinet/contextMenuFile/${item.img}.svg`}
            />
        })
    }

    return (
        <>
            <div
                className={`${styles.workSpaceWrap} ${typeof listCollapsed === 'boolean' ? listCollapsed ? styles.workSpaceWrapCollapsed : styles.workSpaceWrapUncollapsed : undefined}`}>

                <div className={styles.header}>
                    <SearchField/>
                    <div className={styles.infoHeader}>
                        <StorageSize/>
                        <Notifications/>
                        <Profile setItem={setItem}/>
                    </div>
                </div>

                <Categories
                    chosenCategory={chosenCategory}
                    setChosenCategory={setChosenCategory}
                />

                {moreProgram ?
                    <MoreProgram
                        program={moreProgram}
                    /> :

                    <WorkBars
                        setBlob={setBlob}
                        blob={blob}
                        fileLoading={fileLoading}
                        fileSelect={fileSelect}
                        shop={chosenFolder === 'shop'}
                    >
                        {programs.length > 0 &&
                        programs.map((program, i) => (
                            <ProgramShop
                                key={i}
                                program={program}
                                moreProgram={moreProgram}
                                setMoreProgram={setMoreProgram}
                            />
                        ))}
                    </WorkBars>}

                <BottomPanel/>
            </div>
            {mouseParams !== null &&
            <ContextMenu params={mouseParams} setParams={setMouseParams} tooltip={true}>
                <div className={styles.mainMenuItems}>{renderMenuItems(contextMenuFile.main, callbackArrMain)}</div>
                <div
                    className={styles.additionalMenuItems}>{renderMenuItems(contextMenuFile.additional, additionalMenuItems)}</div>
            </ContextMenu>}
            {action.type === 'delete' &&
            <ActionApproval name={action.name} text={action.text} set={nullifyAction} callback={deleteFile}
                            approve={'Удалить'}>
                <div className={styles.fileActionWrap}><File format={chosenProgram?.ext} color={chosenProgram?.color}/>
                </div>
            </ActionApproval>}
            {action.type === 'customize' &&
            <CustomizeFile
                title={action.name}
                info={chosenFolder}
                file={chosenProgram}
                close={nullifyAction}
            />}
        </>)
}

export default WorkSpaceShop
