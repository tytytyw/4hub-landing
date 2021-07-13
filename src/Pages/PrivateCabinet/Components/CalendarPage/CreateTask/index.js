import React, {useState} from 'react'

import styles from './CreateTask.module.sass'
import PopUp from '../../../../../generalComponents/PopUp'
import InputField from '../../../../../generalComponents/InputField'
import {colors, tags} from '../../../../../generalComponents/collections'
import Colors from '../../../../../generalComponents/Elements/Colors'
import Signs from '../../../../../generalComponents/Elements/Signs'
import Emoji from '../../../../../generalComponents/Elements/Emoji'
import Select from './Select/Select'

const events = [
    {id: 1, name: 'Задача', icon: 'task'},
    {id: 2, name: 'День рождение', icon: 'birthday'},
    {id: 3, name: 'Встреча online', icon: 'online-meeting'},
    {id: 4, name: 'Встреча offline', icon: 'offline-meeting'},
    {id: 5, name: 'Напоминание', icon: 'reminder'},
    {id: 6, name: 'Другое', icon: 'other'},
]

const CreateTask = ({onCreate, setSuccess, setEvent}) => {

    const [eventType, setEventType] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [members, setMembers] = useState('');
    const [tagOption, setTagOption] = useState({chosen: '', count: 30});
    const [desc, setDesc] = useState('');
    const [color, setColor] = useState(colors[0]);
    const [sign, setSign] = useState('');
    const [emoji, setEmoji] = useState('');

    const renderTags = () => {
        return tags.map((tag, i) => {
            return <div
                key={i}
                onClick={() => onChangeTag(tag)}
            >{tag}</div>;
        })
    };

    const width = window.innerWidth

    const onChangeTag = (chosen) => {
        const count = 30 - chosen.length;
        if (count >= 0) setTagOption({...tagOption, chosen, count});
    }

    const getEventName = id => {
        const event = events.find(item => item.id === id)
        return event?.name
    }

    return (
        <>
            <PopUp set={onCreate}>
                <div className={styles.createFolderWrap}>
                    <span className={styles.cross} onClick={() => onCreate(false)}/>

                    <div className={styles.content}>
                        <span className={styles.title}>Добавить событие</span>

                        <div className={styles.inputFieldsWrap}>

                            <div className={styles.selectWrap}>
                                <Select
                                    placeholder='Выбрать'
                                    data={events}
                                    value={getEventName(eventType)}
                                >
                                    <ul className={styles.eventsList}>
                                        {events.map((event, index) => (
                                            <li
                                                key={index}
                                                onClick={() => setEventType(event?.id)}
                                                className={styles.eventItem}
                                            >
                                                <div className={styles.eventIconWrap}>
                                                    <img
                                                        className={styles.eventIcon}
                                                        src={`./assets/PrivateCabinet/events/${event.icon}.svg`}
                                                        alt="Event Icon"
                                                    />
                                                </div>
                                                <p className={styles.eventName}>{event.name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </Select>
                            </div>

                            <div className={styles.rangeDateWrap}>
                                <div className={styles.rangeDateBlock}>
                                    <span>С:</span>
                                    <input
                                        type="text"
                                        className={styles.rangeInput}
                                        placeholder='_ _ . _ _ . _ _ _ _'
                                        value={dateFrom}
                                        onChange={event => setDateFrom(event.target.value)}
                                    />
                                </div>
                                &nbsp;&nbsp;
                                <div className={styles.rangeDateBlock}>
                                    <span>До:</span>
                                    <input
                                        type="text"
                                        className={styles.rangeInput}
                                        placeholder='_ _ . _ _ . _ _ _ _'
                                        value={dateTo}
                                        onChange={event => setDateTo(event.target.value)}
                                    />
                                </div>
                            </div>

                            <div className={styles.inputWrap}>
                                <InputField
                                    model='text'
                                    height={width >= 1440 ? '40px' : '30px'}
                                    value={members}
                                    set={setMembers}
                                    placeholder='Участники (введите email или выбирите из списка)'
                                />
                                <img
                                    src={'./assets/PrivateCabinet/input-arrow.svg'}
                                    className={styles.arrowInput}
                                    alt='Arrow Input'
                                />
                            </div>

                            <div className={styles.tagPicker}>
                                <span>#</span>
                                <input
                                    className={styles.inputField}
                                    type='text'
                                    placeholder='Добавте #Тег'
                                    value={tagOption.chosen}
                                    onChange={(e) => onChangeTag(e.target.value)}
                                    onFocus={() => {
                                        setTagOption({...tagOption, show: true})
                                    }}
                                />
                                <span>{tagOption.count}/30</span>
                                <div className={styles.tagList}>
                                    {renderTags()}
                                </div>
                            </div>

                            <div className={styles.inputWrap}>
                                <textarea
                                    placeholder='Опишите задачу'
                                    className={styles.description}
                                    onChange={event => setDesc(event.target.value)}
                                    value={desc}
                                >
                                    {desc}
                                </textarea>
                            </div>

                        </div>

                        <Colors color={color} setColor={setColor}/>
                        <Signs sign={sign} setSign={setSign}/>
                        <Emoji emoji={emoji} setEmoji={setEmoji}/>
                    </div>

                    <div className={styles.buttonsWrap}>
                        <div className={styles.cancel} onClick={() => onCreate(false)}>Отмена</div>
                        <div
                            className={styles.add}
                            onClick={() => {
                                setEvent({
                                    name: getEventName(eventType),
                                    emoji,
                                    sign,
                                    color,
                                    dateFrom,
                                    dateTo,
                                    tagOption,
                                    desc
                                })
                                onCreate(false)
                                setSuccess(true)
                            }}
                        >
                            Создать
                        </div>
                    </div>

                </div>
            </PopUp>

        </>
    )
}

export default CreateTask
