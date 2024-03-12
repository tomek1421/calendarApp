import React from 'react'
import data from "../data/sem4.json"
import { DayTail } from './DaySquare'

interface Data {
  month: string,
  firstDay: string,
  days: number
}

export const Calendar: React.FC = () => {
    const daysOfWeek: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const d = new Date();
    const currMonth: number = d.getMonth();
    const [monthIndex, setMonthIndex] = React.useState<number>(currMonth)
    const [showPrev, setShowPrev] = React.useState<Boolean>(true)
    const [showNext, setShowNext] = React.useState<Boolean>(true)

    const calendarData: Data[] = data
    const offset: number = daysOfWeek.findIndex((day) => day === calendarData[monthIndex].firstDay)

    function showPrevMonth() {
        if (monthIndex === 2) {
            setShowPrev(false)
        } else if (monthIndex === calendarData.length - 2) {
            setShowNext(true)
        }
        setMonthIndex(prev => prev - 1)
    }

    function showNextMonth() {
        if (monthIndex === calendarData.length - 3) {
            setShowNext(false)
        } else if (monthIndex === 1) {
            setShowPrev(true)
        }
        setMonthIndex(prev => prev + 1)
    }

    return (
        <div className="grid mt-[2rem]">
            {showPrev && <div className="btn1 flex justify-center items-center zoom" onClick={() => showPrevMonth()}><i className="fa fa-chevron-left text-[2rem]"></i></div>}
            <div style={{border: "1px solid"}} className="calendar" >
                <div>{calendarData[monthIndex].month}</div>
                <div className="calendar-head">
                    {
                        daysOfWeek.map(day => {
                            const styles = day === "Sunday" || day === "Saturday" ? { color: "red"} : {} 
                            return <div className="flex justify-center" style={styles}>{day}</div>
                        })
                    }
                </div>
                <div className="calendar-days">
                    {
                        Array.from(Array(calendarData[monthIndex - 1].days).keys()).slice(offset > 0 ? -offset : 999).map((day, index) => {
                            return (
                                <DayTail day={day} opacity={true} tests={["Go"]} homework={["Ang", "Mat"]} />
                            )
                        })
                    }
                    {
                        Array.from(Array(calendarData[monthIndex].days).keys()).map((day, index) => {
                            return (
                                <DayTail day={day} opacity={false} tests={["Go", "Py"]} homework={["Ang", "Mat", "Ang", "Mat"]}/>
                            )
                        })
                    }
                    {
                        Array.from(Array(calendarData[monthIndex + 1].days).keys()).slice(0, 7 * 5 - calendarData[monthIndex].days - offset).map((day, index) => {
                            return (
                                <DayTail day={day} opacity={true} tests={["Go", "Py"]} homework={["Ang"]}/>
                            )
                        })
                    }
                </div>
            </div>
            {showNext && <div className="btn2 flex justify-center items-center zoom" onClick={() => showNextMonth()}><i className="fa fa-chevron-right text-[2rem]"></i></div>}
        </div>
    )
}