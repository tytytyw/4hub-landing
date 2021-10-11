import React, {useEffect, useRef, useState} from 'react'
import { useSelector } from 'react-redux';

import styles from './Select.module.sass'
import classNames from 'classnames'
import FolderItem from '../FolderItem';
import CustomFolderItem from '../CustomFolderItem';

const Select = ({initValue, path, setPath, initFolder, onChange = () => {}, ...props}) => {

    const [open, setOpen] = useState(false)
    const [value] = useState(initValue)
    const global = useSelector(state => state.Cabinet.global);
    const other = useSelector(state => state.Cabinet.other?.folders);
    const [chosenFolder, setChosenFolder] = useState(initFolder);
    const ref = useRef()

    useEffect(() => setPath(chosenFolder.subPath || chosenFolder.path), [chosenFolder]) //eslint-disable-line

    const renderStandardFolderList = () => {
        if(!global) return null;
        return global.map((el, i) => {
            return <FolderItem
                key={i + el.name}
                folder={el}
                setChosenFolder={setChosenFolder}
                chosenFolder={chosenFolder}
                chosen={chosenFolder.path === el.path}
                disableAddFolder={true}
            />
        })
    };

    const renderOtherFolderList = () => {
        if(!other) return null;
        return other.map((folder, i) => {
            return <CustomFolderItem
                key={i + folder.name}
                f={folder}
                setChosenFolder={setChosenFolder}
                chosenFolder={chosenFolder}
                chosen={chosenFolder.path === folder.path}
                padding={'0px 10px 0px 26px'}
                subFolder={false}
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

    // const getValue = () => {

    //     if (!value) {
    //         return props.placeholder
    //     }

    //     const valueItem = data.find(item => item?.id === value)
    //     return valueItem?.text
    // }

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
                {open && renderStandardFolderList()}
                {open && renderOtherFolderList()}
            </div>

        </div>
    )
}

export default Select