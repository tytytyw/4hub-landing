import React, {useEffect, useRef, useState} from 'react'
import { useSelector } from 'react-redux';

import styles from './SelectFolder.module.sass'
import classNames from 'classnames'
import CustomFolderItem from '../../Pages/Cabinet/Components/MyFolders/CustomFolderItem';

const SelectFolder = ({initValue, path, setPath, initFolder, onChange = () => {}, ...props}) => {

    const [open, setOpen] = useState(false)
    const [value] = useState(initValue)
    const global = useSelector(state => state.Cabinet.global);
    const other = useSelector(state => state.Cabinet.other);
    const [chosenFolder, setChosenFolder] = useState(initFolder);
    const ref = useRef()

    const renderFolderList = (root) => {
        if(!Array.isArray(root)) return null;
        return root.map((folder, i) => {
            return <CustomFolderItem
                key={i + folder.name}
                f={folder}
                listCollapsed={false}
                isSelectFolder={true}
                setChosenFolder={setChosenFolder}
                chosenFolder={chosenFolder}
                chosen={chosenFolder.path === folder.path}
                p={25}
                isRecent={false}
                subFolder={false}
                offDispatch={true}
            />
        })
    };

    useEffect(() => {
        const onClick = (event) => {
            if (!ref.current?.contains(event.target)) {
                setOpen(false)
            }
        }
        window.addEventListener('click', onClick)
        return () => window.removeEventListener('click', onClick)
    }, [])

    return (
        <div
            ref={ref}
            className={classNames({
                [styles.selectWrap]: true,
                [props.className]: true,
                [styles.active]: !!open
            })}
        >

            <div
                onClick={() => setOpen(!open)}
                className={classNames({
                    [styles.select]: true,
                    [styles.selected]: !!value
                })}
            >
                <div className={styles.valueWrap}>
                    <span className={classNames({
                        [styles.selectInput]: !props.classNameSelect,
                        [props.classNameSelect]: !!props.classNameSelect
                    })}>{path}</span>
                </div>
                <span className={classNames({
                    [styles.arrow]: true,
                    [styles.active]: !!open
                })}/>
            </div>

            <div className={classNames({
                [styles.contentWrap]: true,
                [styles.active]: !!open
            })}>
                <div className={styles.folderListWrap}>
                    {open && renderFolderList(global)}
                    {open && renderFolderList(other)}
                </div>
            </div>

        </div>
    )
}

export default SelectFolder