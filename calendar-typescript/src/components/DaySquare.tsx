import React from 'react'
import { useNavigate } from 'react-router-dom'

export const DaySquare = (props: {day: number, dayOfWeek: string, month: string, opacity: boolean, tests: string[], homework: string[]}) => {
  const styles = props.opacity ? { opacity: 0.3 } : {}
  const navigate = useNavigate()

  function handleClick() {
    navigate(`/calendar-day/${props.day + 1}/${props.dayOfWeek}/${props.month}`)
  }

  return (
    <div className="day-square" style={styles} onClick={() => handleClick()} >
      <div>{props.day + 1}</div>
      <div className="flex gap-[2px] mb-[2px]">
        {
          props.tests.map((t, index) => index < 3 && <div className="tag tests-tag">{t}</div>)
        }
        <div className="flex items-end ml-[0.3rem]">
          { props.tests.length > 3 && ". . ." }
        </div>
      </div>
      <div className="flex gap-[2px] mb-[2px]">
        {
          props.homework.map((h, index) => index < 3 && <div className="tag homework-tag">{h}</div>)
        }
        <div className="flex items-end ml-[0.3rem]">
          { props.homework.length > 3 && ". . ." }
        </div>
      </div>
    </div>
  )
}
