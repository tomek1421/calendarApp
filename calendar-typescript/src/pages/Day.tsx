import React from 'react'
import { useParams } from 'react-router-dom'

export const Day: React.FC = () => {
    const { dayId, dayOfWeekId, monthId } = useParams();
    return (
        <div>
            <div>{dayId}</div>
            <div>{dayOfWeekId}</div>
            <div>{monthId}</div>
        </div>
    )
}