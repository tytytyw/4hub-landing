import React, {useRef} from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import styles from './FullCalendar.module.sass'

import './FullCalendar.css'
import {days} from '../helper'
import TableTaskItem from '../TableTaskItem'

const FullCalendarTable = () => {

    const calendarRef = useRef()

    const renderEventContent = (eventInfo) => {
        return <TableTaskItem task={eventInfo.event?.extendedProps}/>
    }

    const renderHeaderCell = eventInfo => {
        const day = days.find(item => item.id === eventInfo.date.getDay())
        const date = eventInfo.date.getDate()
        return (
            <div className={styles.dayItem}>
                <span className={styles.day}>{day?.day}</span>
                <h4 className={styles.dayNumber}>{date}</h4>
            </div>
        )
    }

    const events = [
        {
            name: 'Сдать задачу за 2020 год',
            term: 'С 12 августа По 16 августа 2020',
            tag: 'Отчет',
            sender: 'Недельская Алина Квиталина',
            avatar: 'a1',
            ctime: '14:45',
            date: '2021-07-23 10:00',
            type: 1
        },
        {
            name: 'Сдать задачу за 2020 год',
            term: 'С 12 августа По 16 августа 2020',
            tag: 'Отчет',
            sender: 'Недельская Алина Квиталина',
            avatar: 'a1',
            ctime: '14:45',
            date: '2021-07-22 02:00',
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
            date: '2021-07-20 13:00',
        },
    ]

    return (
        <div className={styles.wrapper}>
            <FullCalendar
                ref={calendarRef}
                events={events}
                plugins={[timeGridPlugin, interactionPlugin]}
                allDaySlot={false}
                headerToolbar={{
                    left: null,
                    center: null,
                    right: null
                }}
                dayHeaderContent={renderHeaderCell}
                slotDuration='01:00'
                slotLabelFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    omitZeroMinute: false,
                }}
                firstDay={1}
                locale='ru'
                //renderEventContent={renderEventContent}
                eventContent={renderEventContent}
            />
        </div>
    )

}

export default FullCalendarTable