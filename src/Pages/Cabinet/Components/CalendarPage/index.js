import React, {useEffect, useState} from 'react'

import styles from './CalendarPage.module.sass'
import SearchField from '../SearchField'
import StorageSize from '../StorageSize'
import Notifications from '../Notifications'
import Profile from '../Profile'
import DateBlock from './DateBlock'
import List from './List'
import WorkSpaceList from './WorkSpaceList'
import ListCalendar from './ListCalendar'
import CreateTask from './CreateTask'
import SuccessCreated from './CreateTask/SuccessCreated'
import BottomPanel from '../BottomPanel'
import FullCalendarTable from './FullCalendar'
import {useDispatch, useSelector} from 'react-redux'
import {setCalendarEvents} from '../../../../Store/actions/CabinetActions'
import SidebarTasks from "./SidebarTasks";
import {imageSrc} from '../../../../generalComponents/globalVariables';

const CalendarPage = () => {

    const dispatch = useDispatch()
    const events = useSelector(state => state.Cabinet.calendarEvents)

    const [viewType, setViewType] = useState('list')
    const [createTask, setCreateTask] = useState(false)

    const [event, setEvent] = useState({})
    const [success, setSuccess] = useState(false)
    const [listCollapsed, setListCollapsed] = useState(false)

    useEffect(() => {
        dispatch(setCalendarEvents())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    listCollapsed={listCollapsed}
                    setListCollapsed={setListCollapsed}
                >
                    <div className={styles.addTaskBlock}>
                        <p>Создать задачу</p>
                        <img
                            onClick={() => setCreateTask(true)}
                            className={styles.addTaskIcon}
                            src={imageSrc + './assets/PrivateCabinet/folders/add.svg'}
                            alt='Add Task Icon'
                        />
                    </div>
                    <ListCalendar setViewType={setViewType} collapsed={listCollapsed}/>
                    <SidebarTasks data={events} listCollapsed={listCollapsed}/>
                </List>

                <div className={styles.wrapper}>
                    <DateBlock setViewType={setViewType}/>
                    {viewType === 'full' && <FullCalendarTable events={events}/>}
                    {viewType === 'list' && <WorkSpaceList events={events}/>}
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

            <BottomPanel/>

        </div>
    )
}

export default CalendarPage