import React from 'react'
import cameraImg from '../../../../../../assets/PrivateCabinet/camera.svg'
import styles from './ProfileUpload.module.sass'
import avatarImg from '../../../../../../assets/PrivateCabinet/avatar2.svg'
import classnames from 'classnames'

const Index = ({ name = 'file', disabled, onChange = () => {}, preview, background={avatarImg}, ...props }) => {

    const inputId = `userPhoto-${Math.random()}`

    const getImage = () => preview ?? background

    return (
        <div className={styles.upload}>

            <input
                ref={props.inputRef}
                className={styles.input}
                id={inputId}
                type="file"
                name={name}
                disabled={disabled}
                accept='image/*'
                onChange={onChange}
            />

            <label htmlFor={inputId}>
                <div className={styles.photoBg}>
                    <img
                        className={classnames({
                            [styles.avatar]: true,
                            [styles.profileImg]: !!preview
                        })}
                        src={getImage()}
                        alt="Avatar"
                    />
                    <img
                        className={classnames({
                            [styles.photo]: true,
                            [styles.uploaded]: !!preview
                        })}
                        src={cameraImg}
                        alt="Camera"
                    />
                </div>
            </label>

        </div>
    )
}

export default Index