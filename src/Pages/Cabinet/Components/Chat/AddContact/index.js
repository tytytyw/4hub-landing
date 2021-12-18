import React, {useState} from "react";
import styles from "./AddContact.module.sass";
import ActionApproval from "../../../../../generalComponents/ActionApproval";
import InputField from "../../../../../generalComponents/InputField";

import {ReactComponent as ContactsDatabaseIcon} from "../../../../../assets/PrivateCabinet/contactsDatabase.svg";
import classNames from "classnames";

function AddContact({action, nullifyAction}) {
    const [name, setName] = useState('')
    const [sname, setSname] = useState('')
    const [tel, setTel] = useState('')
    const [email, setEmail] = useState('')

	return (
		<div className={styles.wrapper}>
			<ActionApproval
				name={action.name}
				set={nullifyAction}
				callback={() => console.log("addCont")}
				approve={"Добавить"}
				childrenWidth={"100%"}
			>
				<div className={styles.inputWrap}>
					<InputField value={name} set={setName} height={40} placeholder="Имя" />
				</div>
				<div className={styles.inputWrap}>
					<InputField value={sname} set={setSname} height={40} placeholder="Фамилия" />
				</div>
				<div className={styles.inputWrap}>
					<InputField value={tel} set={setTel} phone={true} height={40} placeholder="Номер телефона" />
				</div>
				<div className={styles.inputWrap}>
					<InputField value={email} set={setEmail} height={40} placeholder="Email" />
				</div>
				<div>
					<p className={styles.text}>или</p>
					<div className={styles.addContactsDatabase}>
						<ContactsDatabaseIcon className={styles.icon} />
						<span className={classNames(styles.text, styles.button)}>Загрузите</span>
						<span className={styles.text}>базу контактов</span>
					</div>
				</div>
			</ActionApproval>
		</div>
	);
}

export default AddContact;
