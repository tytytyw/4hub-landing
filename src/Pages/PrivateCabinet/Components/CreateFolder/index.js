import React, {useState} from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import styles from './CreateFolder.module.sass';
import api from '../../../../api';
import PopUp from '../../../../generalComponents/PopUp';
import {ReactComponent as FolderIcon} from '../../../../assets/PrivateCabinet/folder-2.svg';
import InputField from '../../../../generalComponents/InputField';
import {tags, colors} from '../../../../generalComponents/collections';
import Error from '../../../../generalComponents/Error';
import { onGetFolders } from '../../../../Store/actions/PrivateCabinetActions';
import Colors from '../../../../generalComponents/Elements/Colors';
import '../../../../generalComponents/colors.sass';
import Signs from '../../../../generalComponents/Elements/Signs';
import Emoji from '../../../../generalComponents/Elements/Emoji';

const CreateFolder = ({onCreate, title, info}) => {

    const uid = useSelector(state => state.user.uid);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [showRepeat, setShowRepeat] = useState(true);
    const [tagOption, setTagOption] = useState({show: false, chosen: 'Добавьте #Тег'});
    const [color, setColor] = useState(colors[0]);
    const [sign, setSign] = useState('');
    const [emoji, setEmoji] = useState('');
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const onSwitch = (boolean) => setShowRepeat(boolean);

    const renderTags = () => {
        return tags.map((tag, i) => {
            return <div
                key={i}
                onClick={() => setTagOption({show: false, chosen: tag})}
            >{tag}</div>;
        })
    };

    const width = window.innerWidth;
    const generateInputWrap = () => {
        if(width >= 1440) {
            return {
              height: `${showRepeat ? '190px' : '140px'}`,
              marginBottom: `${showRepeat ? '10px' : '35px'}`
          }
      } else {
          return {
              height: `${showRepeat ? '140px' : '140px'}`,
              marginBottom: `${showRepeat ? '10px' : '35px'}`
          }
      }
    };

    const onAddFolder = () => {
        const params = `uid=${uid}&dir_name=${name}&parent=${info.path ? info.path : 'other'}`;
      api.post(`/ajax/dir_add.php?${params}`)
          .then(res => {if(res.data.ok === 1) {
              onCreate(false);
          } else {setError(true)}
          })
          .catch(err => {setError(true)})
          .finally(() => {dispatch(onGetFolders())}); //! NEED TO REVIEW AFTER CHANGED FOLDERS STRUCTURE
    };

    const closeComponent = () => {
        onCreate(false);
        setError(false);
    }

    return (
        <>
        <PopUp set={onCreate}>
            <div className={styles.createFolderWrap}>
                <span className={styles.cross} onClick={() => onCreate(false)} />
                <span className={styles.title}>{title}</span>
                <div className={styles.folderIconWrap}><FolderIcon className={`${styles.folderIcon} ${color.color}`} /></div>
                <div style={generateInputWrap()}
                     className={styles.inputFieldsWrap}>
                    <InputField
                        model='text'
                        height={width >= 1440 ? '40px' : '25px'}
                        value={name}
                        set={setName}
                        placeholder='Имя папки'
                    />
                    <div className={styles.tagPicker} onClick={() => {!tagOption.show && setTagOption({...tagOption, show: !tagOption.show})}}>
                        {tagOption.chosen}
                        <div className={classnames({
                            [styles.tagList]: true,
                            [styles.showTagList]: tagOption.show
                        })}>
                            {renderTags()}
                        </div>
                    </div>
                    <InputField
                        model='password'
                        switcher={true}
                        height={width >= 1440 ? '40px' : '25px'}
                        value={password}
                        set={setPassword}
                        placeholder='Пароль'
                        onSwitch={onSwitch}
                    />
                    {showRepeat && <InputField
                        model='password'
                        switcher={false}
                        height={width >= 1440 ? '40px' : '25px'}
                        value={passwordRepeat}
                        set={setPasswordRepeat}
                        placeholder='Повторите пароль'
                    />}
                </div>
                <Colors color={color} setColor={setColor} />
                <Signs sign={sign} setSign={setSign} />
                <Emoji emoji={emoji} setEmoji={setEmoji} />
                <div className={styles.buttonsWrap}>
                    <div className={styles.cancel} onClick={() => onCreate(false)}>Отмена</div>
                    <div className={styles.add} onClick={() => onAddFolder()}>Добавить</div>
                </div>
            </div>
        </PopUp>
        {error && <Error error={error} set={closeComponent} message='Папка не добавлена' />}
        </>
    )
}

export default CreateFolder;
