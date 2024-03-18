import React from 'react'
import data from "../data/sem4.json"
import { DaySquare } from './DaySquare'
import { ChevronLeft, ChevronRight, Circle, CircleDot } from "lucide-react"

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
        <div className="grid">
            {showPrev && <div className="btn1 flex justify-center items-center zoom" onClick={() => showPrevMonth()}><ChevronLeft size={48} strokeWidth={2} /></div>}
            <div className="calendar" >
                <div className="text-[2rem] font-[500] mt-[0.7rem] mb-[0.7rem]">{calendarData[monthIndex].month}</div>
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
                                <DaySquare day={day} opacity={true} tests={["Go"]} homework={["Ang", "Mat"]} />
                            )
                        })
                    }
                    {
                        Array.from(Array(calendarData[monthIndex].days).keys()).map((day, index) => {
                            return (
                                <DaySquare day={day} opacity={false} tests={["Go", "Py"]} homework={["Ang", "Mat", "Ang", "Mat"]}/>
                            )
                        })
                    }
                    {
                        Array.from(Array(calendarData[monthIndex + 1].days).keys()).slice(0, 7 * 5 - calendarData[monthIndex].days - offset).map((day, index) => {
                            return (
                                <DaySquare day={day} opacity={true} tests={["Go", "Py"]} homework={["Ang"]}/>
                            )
                        })
                    }
                </div>
            </div>
            {showNext && <div className="btn2 flex justify-center items-center zoom" onClick={() => showNextMonth()}><ChevronRight size={48} strokeWidth={2} /></div>}
            <div className="dots-box">
                <div className="dots">
                    {
                        calendarData.map((_, index) => (
                            index > 0 && index < calendarData.length-1 ? index === monthIndex ? 
                            <div className="dot-curr" ><Circle size={16} strokeWidth={1.5}/></div> : 
                            <div className="dot" ><Circle size={16} strokeWidth={1.5}/></div> : null
                        ))
                    }
                </div>
            </div>
        </div>
    )
}