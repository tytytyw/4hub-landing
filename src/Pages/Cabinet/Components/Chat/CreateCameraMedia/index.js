import React, {useState} from 'react'
import PopUp from '../../../../../generalComponents/PopUp'
import styles from './CreateCameraMedia.module.sass'
import Buttons from './Buttons'

const CreateCameraMedia = ({nullifyAction}) => {
    const [state, setState] = useState('init')

  return (
    <PopUp set={nullifyAction}>
        <div className={styles.wrapper}>
            <div className={styles.contentPreview}>
                <div style={{backgroundColor:'lightgrey', height: '100%'}} />
            </div>
        </div>
        <Buttons state={state} />
    </PopUp>
  )
}

export default CreateCameraMedia