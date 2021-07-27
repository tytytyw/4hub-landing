import React, {useEffect, useRef} from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

import styles from './FullCalendar.module.sass'

import './FullCalendar.css'
import {days} from '../helper'
import TableTaskItem from '../TableTaskItem'
import {useSelector} from 'react-redux'

const FullCalendarTable = ({events}) => {

    const calendarRef = useRef()
    const calendarDate = useSelector(state => state.PrivateCabinet.calendarDate)

    const renderEventContent = eventInfo => {
        return (
            <TableTaskItem
                date={eventInfo?.event.start}
                task={eventInfo.event?.extendedProps}
            />
        )
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

    useEffect(() => {
        const calendarApi = calendarRef.current.getApi()
        calendarApi.gotoDate(calendarDate)
    }, [calendarDate])

    return (
        <div className={styles.wrapper}>

            <FullCalendar
                initialDate={calendarDate}
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
                eventContent={renderEventContent}
            />
        </div>
    )
}

export default FullCalendarTable