import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./CustomizeFile.module.sass";
import api from "../../../../../../api";
import PopUp from "../../../../../../generalComponents/PopUp";
import InputField from "../../../../../../generalComponents/InputField";
import { tags, colors } from "../../../../../../generalComponents/collections";
import Error from "../../../../../../generalComponents/Error";
import {
	onCustomizeFile,
	onCustomizeSafeFile,
	onAddRecentFiles,
	onChooseFiles,
    onChooseAllFiles,
	onGetSafeFileList,
} from "../../../../../../Store/actions/PrivateCabinetActions";
import Colors from "../../../../../../generalComponents/Elements/Colors";
import "../../../../../../generalComponents/colors.sass";
import Signs from "../../../../../../generalComponents/Elements/Signs";
import Emoji from "../../../../../../generalComponents/Elements/Emoji";
import File from "../../../../../../generalComponents/Files";

const CustomizeFile = ({
	title,
	close,
	file,
	filePick,
	fileAddCustomization,
	setFileAddCustomization,
	saveCustomizeSeveralFiles,
	setLoadingType,
	menuItem,
}) => {
	const uid = useSelector((state) => state.user.uid);
	const path = useSelector((state) => state.PrivateCabinet?.fileList?.path);
	const [name, setName] = useState(
		file ? file.name.slice(0, file.name.lastIndexOf(".")) : ""
	);
	const [password, setPassword] = useState("");
	const [passwordRepeat, setPasswordRepeat] = useState("");
	const [passwordCoincide, setPasswordCoincide] = useState(false);
	const [showRepeat, setShowRepeat] = useState(false);
	const [color, setColor] = useState(
		filePick.customize || fileAddCustomization.several
			? colors[0]
			: colors.find((c) => c.color === file.color) ?? colors[0]
	);
	const [tagOption, setTagOption] = useState({
		chosen:
			filePick.customize || fileAddCustomization.several ? "" : file.tag || "",
		count: 30,
	});
	const [sign, setSign] = useState(
		filePick.customize || fileAddCustomization.several ? "" : file.fig
	);
	const [emoji, setEmoji] = useState(
		filePick.customize || fileAddCustomization.several ? "" : file.emo
	);
	const [error, setError] = useState(false);
	const [visibility, setVisibility] = useState("password");
	const authorizedSafeData = useSelector(
		(state) => state.PrivateCabinet.authorizedSafe
	);
	const dispatch = useDispatch();

	const onSwitch = (boolean) => setShowRepeat(boolean);

	const comparePass = (val) => {
		const pass = password.split("");
		const passRepeat = val.split("");
		let boolean = true;
		passRepeat.forEach((el, i) => {
			if (el !== pass[i]) boolean = false;
		});
		setPasswordCoincide(boolean);
	};

	const renderTags = () => {
		return tags.map((tag, i) => {
			return (
				<div key={i} onClick={() => onChangeTag(tag)}>
					{tag}
				</div>
			);
		});
	};

	const onAddFile = () => {
		if (password !== passwordRepeat) return setPasswordCoincide(false);
		setLoadingType("squarify");

		const data = {
			uid,
			fids: filePick.customize ? filePick.files : [file.fid],
			fileName:
				name === file?.name.slice(0, file.name.lastIndexOf("."))
					? ""
					: `${name}${file?.fname.slice(file.name.lastIndexOf("."))}`,
			tag: tagOption.chosen === file.tag ? "" : `${tagOption.chosen}`,
			pass: password === passwordRepeat ? `${password}` : "",
			color: color?.color === file?.color ? "" : `${color?.color}`,
			symbol: sign === file.fig ? "" : `${sign}`,
			emoji: emoji === file.emo ? "" : `${emoji}`,
		};

		if (
			!data.fName &&
			!data.tag &&
			!data.color &&
			!data.symbol &&
			!data.emoji &&
			!data.pass
		)
			return close();

		const newFile = {
			...file,
			name: data.fileName
				? name + file?.fname.slice(file.name.lastIndexOf("."))
				: file.fname,
			tag: data.tag ? tagOption.chosen : file.tag,
			color: data.color ? color?.color : file.color,
			emo: data.emoji ? emoji : file.emo,
			fig: data.symbol ? sign : file.fig,
			is_pass: password && passwordRepeat ? 1 : 0,
		};
		if (filePick.customize) {
			console.log(menuItem)

			delete data.fName;
			if (data.pass === "") delete data.pass;
			api
				.post(`/ajax/${menuItem === "Safe" ? "safe_" : ""}file_edit.php`, data)
				.then((res) => {
					if (res.data.ok === 1) {
						if (menuItem === "Safe") {
							dispatch(onGetSafeFileList(authorizedSafeData.code, authorizedSafeData.id_safe, "","","",))
                        }
						else {
                            dispatch(onAddRecentFiles());
                            //TODO: add sort & filter params to dispatch
                            if (menuItem === "MyFolders") dispatch(onChooseFiles(path));
                            if (menuItem === "MyFiles")  dispatch(onChooseAllFiles(path));
                        }
					}
				})
				.catch((err) => {
					setError(true);
				})
				.finally(() => {
					close();
					setLoadingType("");
				});
		} else {
			api
				.post(`/ajax/${menuItem === "Safe" ? "safe_" : ""}file_edit.php`, data)
				.then((res) => {
					if (res.data.ok === 1) {
						if (menuItem !== "Safe") {
							dispatch(onAddRecentFiles());
							dispatch(onCustomizeFile(newFile));
						} else dispatch(onCustomizeSafeFile(newFile));
					} else {
						setError(true);
					}
				})
				.catch((err) => {
					setError(true);
				})
				.finally(() => {
					close();
					setLoadingType("");
				});
		}
	};

	const closeComponent = () => {
		close();
		setError(false);
	};

	const onChangeTag = (chosen) => {
		const count = 30 - chosen.length;
		if (count >= 0) setTagOption({ ...tagOption, chosen, count });
	};

	const getName = (val) => {
		const i = val.lastIndexOf(".");
		return {
			name: val.substring(0, i),
			format: val.substring(i + 1),
		};
	};

	const addToAwaitingFiles = () => {
		const options = {
			tag: tagOption.chosen === file?.tag ? "" : `${tagOption.chosen}`,
			pass: password === passwordRepeat ? `${password}` : "",
			color: color?.color === file?.color ? "" : `${color?.color}`,
			symbol: sign === file?.fig ? "" : `${sign}`,
			emoji: emoji === file?.emo ? "" : `${emoji}`,
		};
		saveCustomizeSeveralFiles(options);
	};

    return (
        <div style={{display: `block`}}>
            <PopUp set={close}>
                <div
                    className={styles.createFolderWrap}
                    //style={{height: filePick.customize ||  fileAddCustomization?.several ? '582px' : '720px'}}
                >
                    <span className={styles.cross} onClick={close} />
                    <span className={styles.title}>{title}</span>
                    {filePick.customize || fileAddCustomization?.several ? null :
                        <div className={styles.fileIconWrap}>
                            <div className={`${styles.fileWrap}`}>
                                <div className={styles.file}><File color={color?.light} format={file ? getName(file.name).format : ''} /></div>
                            </div>
                            <div className={styles.picPreview}>
                                <div className={styles.format}>{getName(file.name).format} {file.size_now}</div>
                                <div className={styles.name}>{getName(file.name).name}</div>
                                <div className={styles.fileOptions}>
                                    {tagOption.chosen && <div
                                        className={`${styles.minitagWrap} ${styles.redCross}`}
                                        onClick={() => setTagOption({...tagOption, chosen: ''})}
                                    >
                                        <div
                                            className={`${styles.minitag}`}
                                        >#{tagOption.chosen}</div>
                                    </div>}
                                    <div className={`${styles.colorWrap} ${color?.color !== 'grey' ? styles.colorWrapTap : undefined} ${styles.redCross}`} onClick={() => setColor(colors[0])}>
                                        <div className={styles.circle} style={{background: color?.light, border: `1px solid ${color?.dark}`}} />
                                    </div>
                                    {sign && <div className={styles.redCross} onClick={() => setSign('')}><img src={`./assets/PrivateCabinet/signs/${sign}.svg`} alt='emoji' /></div>}
                                    {emoji && <div className={styles.redCross} onClick={() => setEmoji('')}><img src={`./assets/PrivateCabinet/smiles/${emoji}.svg`} alt='emoji' /></div>}
                                    {file.is_pass ? <img className={styles.lock} src='./assets/PrivateCabinet/locked.svg' alt='lock' /> : null}
                                </div>
                            </div>
                        </div>}
                    <div className={`${styles.inputFieldsWrap}`}>
                        <div className={styles.inputWrap}>
                            {filePick.customize || fileAddCustomization.several ? null :
                                <InputField
                                    model='text'
                                    
                                    value={name}
                                    set={setName}
                                    placeholder='Имя файла'
                                />}
                        </div>
                        <div className={styles.tagPicker}>
                            <span>#</span>
                            <input
                                className={styles.inputField}
                                type='text'
                                placeholder='Добавте #Тег'
                                value={tagOption.chosen}
                                onChange={(e) => onChangeTag(e.target.value)}
                                onFocus={() => {setTagOption({...tagOption, show: true})}}
                            />
                            <span>{tagOption.count}/30</span>
                            <div className={styles.tagList} >
                                {renderTags()}
                            </div>
                        </div>
                        <div className={styles.inputWrap}>
                            <InputField
                                model='password'
                                switcher={true}
                                isPass={showRepeat}
                                value={password}
                                set={setPassword}
                                placeholder='Пароль'
                                onSwitch={onSwitch}
                                visibility={visibility}
                                setVisibility={setVisibility}
                                disabled={!showRepeat}
                            />
                        </div>
                        {showRepeat &&
                        <div className={styles.inputWrap}>
                            <InputField
                                model='password'
                                switcher={false}
                                
                                value={passwordRepeat}
                                set={setPasswordRepeat}
                                placeholder='Повторите пароль'
                                visibility={visibility}
                                setVisibility={setVisibility}
                                comparePass={comparePass}
                                mistake={!passwordCoincide}
                            />
                        </div>}
                    </div>
                    <Colors color={color} setColor={setColor} />
                    <Signs sign={sign} setSign={setSign} />
                    <Emoji emoji={emoji} setEmoji={setEmoji} />
                    <div className={styles.buttonsWrap}>
                        <div className={styles.cancel} onClick={close}>Отмена</div>
                        <div
                            className={`${file || fileAddCustomization.several ? styles.add : styles.buttonDisabled}`}
                            onClick={() => {
                                if(file) onAddFile();
                                if(fileAddCustomization.several) addToAwaitingFiles();
                            }}
                        >Сохранить</div>
                    </div>
                </div>
            </PopUp>
            {error && <Error error={error} set={closeComponent} message='Файл не изменен' />}
        </div>
    )
}

export default CustomizeFile;
