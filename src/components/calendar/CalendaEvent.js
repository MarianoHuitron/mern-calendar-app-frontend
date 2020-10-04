import React from 'react'

export const CalendaEvent = ({ event }) => {

    const { title, user } = event;

    return (
        <div>
            <span> { title } </span>
            <strong>- { user.name } </strong>
        </div>
    )
}
