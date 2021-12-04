import React, {useState} from 'react'
// import styles from "../Verification/Verification.module.sass";
import ViewStandarts from "./view";
import UploadFile from "../UploadFile/UploadFile"

const Standards = () => {
    // {setPageOption} , setSuccess
    const [success] = useState(false)
    const [blob, setBlob] = useState("");

    return (
        <>
            {success ?
                <ViewStandarts/> : <UploadFile blob={blob} setBlob={setBlob} title={'Стандарты компании'} />
                }
        </>
    )
}

export default Standards