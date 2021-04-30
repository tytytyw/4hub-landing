import React, {useEffect, useState} from 'react'
import cameraImg from '../../../../../../assets/PrivateCabinet/camera.svg'
import styles from './ProfileUpload.module.sass'
import avatarImg from '../../../../../../assets/PrivateCabinet/avatar.svg'
import classnames from 'classnames'

const ProfileUpload = () => {

    const inputId = `userPhoto-${Math.random()}`
    const [image, setImage] = useState()
    const [preview, setPreview] = useState()

    useEffect(() => {
        if (image) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(image)
        } else {
            setPreview(null)
        }
    }, [image])

    const getImage = () => {
        return preview ?? avatarImg
    }

    return (
        <div className={styles.upload}>

            <input
                className={styles.input}
                id={inputId}
                type="file"
                accept='image/*'
                onChange={(event) => {
                    const file = event.target.files[0] ?? null
                    if (file && file.type.substr(0, 5) === 'image') {
                        setImage(file)
                    } else {
                        setImage(null)
                    }
                }}
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
                        alt="Photo"
                    />
                </div>
            </label>

        </div>
    )
}

export default ProfileUpload