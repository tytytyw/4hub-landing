import React, {useEffect, useState} from 'react'

import styles from './CalendarPage.module.sass'
import SearchField from '../SearchField'
import StorageSize from '../StorageSize'
import Notifications from '../Notifications'
import Profile from '../Profile'
import DateBlock from './DateBlock'
import List from './List'
import ListTaskItem from './ListTaskItem'
import WorkSpaceTable from './WorkSpaceTable'
import WorkSpaceList from './WorkSpaceList'
import ListCalendar from './ListCalendar'
import CreateTask from './CreateTask'
import SuccessCreated from './CreateTask/SuccessCreated'

const CalendarPage = () => {

    const [search, setSearch] = useState(null)
    const [viewType, setViewType] = useState('list')
    const [createTask, setCreateTask] = useState(false)

    const [event, setEvent] = useState({})
    const [success, setSuccess] = useState(false)

    const date = new Date()

    const [year, setYear] = useState(date.getFullYear())
    const [day, setDay] = useState(date.getDay())
    const [month, setMonth] = useState(date.getMonth())

    useEffect(() => setViewType('list'), [day])
    useEffect(() => setViewType('table'), [month])

    const taskList = [
        {
            name: 'Сдать задачу за 2020 год',
            term: 'С 12 августа По 16 августа 2020',
            tag: 'Отчет',
            sender: 'Недельская Алина Квиталина',
            avatar: 'a1',
            ctime: '14:45',
            weekDay: 2,
            hour: '12:00',
            type: 1
        },
        {
            name: 'Сдать задачу за 2020 год',
            term: 'С 12 августа По 16 августа 2020',
            tag: 'Отчет',
            sender: 'Недельская Алина Квиталина',
            avatar: 'a1',
            ctime: '14:45',
            weekDay: 5,
            hour: '19:00',
            type: 2
        },
        {
            name: 'Сдать задачу за 2020 год',
            term: 'С 12 августа По 16 августа 2020',
            tag: 'Отчет',
            sender: 'Недельская Алина Квиталина',
            avatar: 'a1',
            ctime: '14:45',
            type: 3,
            weekDay: 4,
            hour: '10:00',
        },
    ]

    return (
        <div className={styles.parentWrapper}>

            <div className={styles.header}>
                <SearchField/>
                <div className={styles.infoHeader}>
                    <StorageSize/>
                    <Notifications/>
                    <Profile/>
                </div>
            </div>

            <div className={styles.contentRight}>

                <List
                    title='Мой календарь'
                    src='add-folder.svg'
                >
                    <div className={styles.addTaskBlock}>
                        <p>Создать задачу</p>
                        <img
                            onClick={() => setCreateTask(true)}
                            className={styles.addTaskIcon}
                            src="./assets/PrivateCabinet/folders/add.svg"
                            alt="Add Task Icon"
                        />
                    </div>
                    <ListCalendar
                        day={day}
                        setDay={setDay}
                        month={month}
                        year={year}
                    />
                    <div className={styles.myTasksBlock}>
                        <p className={styles.title}>Мои задачи <span>12.04.2020</span></p>
                    </div>
                    {taskList?.map((task, i) => (
                        <ListTaskItem
                            key={i}
                            task={task}
                        />
                    ))}
                </List>

                <div className={styles.wrapper}>

                    <DateBlock
                        search={search}
                        setSearch={setSearch}
                        month={month}
                        setMonth={setMonth}
                        setYear={setYear}
                        setDay={setDay}
                    />

                    {viewType === 'table' &&
                    <WorkSpaceTable
                        taskList={taskList}
                        month={month}
                        year={year}
                        day={day}
                    />}

                    {viewType === 'list' &&
                    <WorkSpaceList
                        taskList={taskList}
                        month={month}
                        year={year}
                        day={day}
                    />}

                </div>

            </div>


            {createTask &&
            <CreateTask
                title='Создание проекта'
                onCreate={setCreateTask}
                setSuccess={setSuccess}
                setEvent={setEvent}
            />}

            {success &&
            <SuccessCreated
                event={event}
                set={setSuccess}
            />}

        </div>
    )
}

export default CalendarPage