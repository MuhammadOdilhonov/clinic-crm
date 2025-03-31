import { useState, useEffect } from "react"
import { useLanguage } from "../../../contexts/LanguageContext"

export default function TaskCalendar({ tasks, currentDate, view, onTaskClick, onDayClick, onMonthClick }) {
    const { t } = useLanguage()
    const [calendarDays, setCalendarDays] = useState([])

    useEffect(() => {
        if (view === "month") {
            generateMonthCalendar()
        } else if (view === "week") {
            generateWeekCalendar()
        } else if (view === "day") {
            generateDayCalendar()
        } else if (view === "year") {
            generateYearCalendar()
        }
    }, [currentDate, tasks, view])

    // Generate calendar days for the current month
    const generateMonthCalendar = () => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()

        // First day of the month
        const firstDay = new Date(year, month, 1)
        // Last day of the month
        const lastDay = new Date(year, month + 1, 0)

        // Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
        const firstDayOfWeek = firstDay.getDay()

        // Calculate days from previous month to show
        const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1

        // Calculate total days to show (including days from previous and next months)
        const totalDays = 42 // Always show 6 weeks (6 * 7 = 42 days)

        // Generate calendar days
        const days = []

        // Add days from previous month
        const prevMonth = new Date(year, month - 1, 0)
        const prevMonthLastDay = prevMonth.getDate()

        for (let i = 0; i < daysFromPrevMonth; i++) {
            const day = prevMonthLastDay - daysFromPrevMonth + i + 1
            days.push({
                date: new Date(year, month - 1, day),
                isCurrentMonth: false,
                tasks: getTasksForDay(new Date(year, month - 1, day)),
            })
        }

        // Add days from current month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push({
                date: new Date(year, month, i),
                isCurrentMonth: true,
                isToday: isToday(new Date(year, month, i)),
                tasks: getTasksForDay(new Date(year, month, i)),
            })
        }

        // Add days from next month
        const remainingDays = totalDays - days.length
        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: new Date(year, month + 1, i),
                isCurrentMonth: false,
                tasks: getTasksForDay(new Date(year, month + 1, i)),
            })
        }

        setCalendarDays(days)
    }

    // Generate calendar for week view
    const generateWeekCalendar = () => {
        const days = []
        const startOfWeek = new Date(currentDate)

        // Adjust to start from Monday
        const dayOfWeek = currentDate.getDay()
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
        startOfWeek.setDate(currentDate.getDate() + diff)

        // Generate 7 days starting from Monday
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek)
            day.setDate(startOfWeek.getDate() + i)

            days.push({
                date: day,
                isCurrentMonth: day.getMonth() === currentDate.getMonth(),
                isToday: isToday(day),
                tasks: getTasksForDay(day),
            })
        }

        setCalendarDays(days)
    }

    // Generate calendar for day view
    const generateDayCalendar = () => {
        const days = [
            {
                date: new Date(currentDate),
                isCurrentMonth: true,
                isToday: isToday(currentDate),
                tasks: getTasksForDay(currentDate),
            },
        ]

        setCalendarDays(days)
    }

    // Generate calendar for year view
    const generateYearCalendar = () => {
        const days = []
        const year = currentDate.getFullYear()

        // Generate first day of each month
        for (let month = 0; month < 12; month++) {
            const date = new Date(year, month, 1)
            const monthTasks = getTasksForMonth(year, month)

            days.push({
                date,
                isCurrentMonth: month === new Date().getMonth() && year === new Date().getFullYear(),
                isToday: false,
                tasks: monthTasks,
                monthName: date.toLocaleString("default", { month: "long" }),
            })
        }

        setCalendarDays(days)
    }

    // Check if a date is today
    const isToday = (date) => {
        const today = new Date()
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        )
    }

    // Get tasks for a specific day
    const getTasksForDay = (date) => {
        if (!tasks || !Array.isArray(tasks)) return []

        return tasks.filter((task) => {
            if (!task || !task.startDate) return false

            const taskDate = new Date(task.startDate)
            return (
                taskDate.getDate() === date.getDate() &&
                taskDate.getMonth() === date.getMonth() &&
                taskDate.getFullYear() === date.getFullYear()
            )
        })
    }

    // Get tasks for a specific month
    const getTasksForMonth = (year, month) => {
        if (!tasks || !Array.isArray(tasks)) return []

        return tasks.filter((task) => {
            if (!task || !task.startDate) return false

            const taskDate = new Date(task.startDate)
            return taskDate.getMonth() === month && taskDate.getFullYear() === year
        })
    }

    // Format date for display
    const formatDate = (date) => {
        return date.getDate()
    }

    // Get short day of week names
    const getShortDayNames = () => {
        const days = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"]
        return days
    }

    // Handle task click safely
    const handleTaskClick = (e, task) => {
        e.stopPropagation()
        if (task && onTaskClick) {
            onTaskClick(task)
        }
    }

    // Handle day click safely
    const handleDayClick = (day) => {
        if (day && onDayClick) {
            onDayClick(day)
        }
    }

    // Handle month click safely
    const handleMonthClick = (month) => {
        if (month && onMonthClick) {
            onMonthClick(month)
        }
    }

    // Render month view
    const renderMonthView = () => {
        return (
            <>
                <div className="calendar-header">
                    {getShortDayNames().map((day, index) => (
                        <div key={index} className="day-name">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="calendar-grid month-grid">
                    {calendarDays.map((day, index) => (
                        <div
                            key={index}
                            className={`calendar-day ${!day.isCurrentMonth ? "other-month" : ""} ${day.isToday ? "today" : ""}`}
                            onClick={() => handleDayClick(day)}
                        >
                            <div className="day-header">
                                <span className="day-number">{formatDate(day.date)}</span>
                            </div>

                            <div className="day-content">
                                {day.tasks &&
                                    day.tasks.slice(0, 3).map((task) => (
                                        <div
                                            key={task.id}
                                            className={`calendar-task ${task.priority}-priority ${task.status}`}
                                            onClick={(e) => handleTaskClick(e, task)}
                                        >
                                            <div className="task-time">
                                                {task.startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                            </div>
                                            <div className="task-title">{task.title}</div>
                                        </div>
                                    ))}

                                {day.tasks && day.tasks.length > 3 && (
                                    <div className="more-tasks">
                                        +{day.tasks.length - 3} {t("more")}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    }

    // Render week view
    const renderWeekView = () => {
        return (
            <>
                <div className="calendar-header">
                    {calendarDays.map((day, index) => (
                        <div key={index} className={`day-name ${day.isToday ? "today" : ""}`}>
                            <div>{getShortDayNames()[index]}</div>
                            <div className="day-number-header">{formatDate(day.date)}</div>
                        </div>
                    ))}
                </div>

                <div className="calendar-grid week-grid">
                    {calendarDays.map((day, index) => (
                        <div
                            key={index}
                            className={`calendar-day ${!day.isCurrentMonth ? "other-month" : ""} ${day.isToday ? "today" : ""}`}
                            onClick={() => handleDayClick(day)}
                        >
                            <div className="day-content">
                                {day.tasks &&
                                    day.tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className={`calendar-task ${task.priority}-priority ${task.status}`}
                                            onClick={(e) => handleTaskClick(e, task)}
                                        >
                                            <div className="task-time">
                                                {task.startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                            </div>
                                            <div className="task-title">{task.title}</div>
                                        </div>
                                    ))}

                                {(!day.tasks || day.tasks.length === 0) && (
                                    <div className="no-tasks">
                                        <span>{t("no_tasks")}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    }

    // Render day view
    const renderDayView = () => {
        const day = calendarDays[0]
        if (!day) return null

        const hours = []

        // Generate hours from 8 AM to 8 PM
        for (let i = 8; i <= 20; i++) {
            hours.push({
                hour: i,
                tasks: day.tasks ? day.tasks.filter((task) => new Date(task.startDate).getHours() === i) : [],
            })
        }

        return (
            <div className="day-view">
                <div className="day-header">
                    <div className="day-title">
                        {day.date.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}
                    </div>
                </div>

                <div className="day-hours">
                    {hours.map((hourData, index) => (
                        <div key={index} className="hour-row">
                            <div className="hour-label">{hourData.hour}:00</div>
                            <div className="hour-content" onClick={() => handleDayClick(day)}>
                                {hourData.tasks &&
                                    hourData.tasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className={`calendar-task ${task.priority}-priority ${task.status}`}
                                            onClick={(e) => handleTaskClick(e, task)}
                                        >
                                            <div className="task-time">
                                                {task.startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                {" - "}
                                                {task.endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                            </div>
                                            <div className="task-title">{task.title}</div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // Render year view
    const renderYearView = () => {
        return (
            <div className="year-view">
                <div className="months-grid">
                    {calendarDays.map((month, index) => (
                        <div
                            key={index}
                            className={`month-card ${month.isCurrentMonth ? "current-month" : ""}`}
                            onClick={() => handleMonthClick(month)}
                        >
                            <div className="month-header">
                                <h3>{month.monthName}</h3>
                            </div>
                            <div className="month-content">
                                <div className="task-count">
                                    {month.tasks ? month.tasks.length : 0} {t("tasks")}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="task-calendar">
            {view === "month" && renderMonthView()}
            {view === "week" && renderWeekView()}
            {view === "day" && renderDayView()}
            {view === "year" && renderYearView()}
        </div>
    )
}

