import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'
import {formatDate} from '@fullcalendar/react' // a plugin!

const FullCalendarTable = () => {

    let str = formatDate(new Date(), {
        month: 'long',
        year: 'numeric',
        day: 'numeric'
    })

    console.log(str)

    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            events={[
                { title: 'event 1', date: '2021-07-01' },
                { title: 'event 2', date: '2019-04-02' }
            ]}
        />
    )

}

export default FullCalendarTable