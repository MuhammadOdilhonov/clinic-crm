import { useState, useEffect } from "react"
import { FaCalendarAlt, FaRegClock, FaExchangeAlt, FaPlus } from "react-icons/fa"

const NurseSchedule = () => {
    const [shifts, setShifts] = useState([])
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [activeTab, setActiveTab] = useState("calendar")
    const [loading, setLoading] = useState(true)
    const [showAddForm, setShowAddForm] = useState(false)
    const [newShiftRequest, setNewShiftRequest] = useState({
        date: "",
        shiftType: "",
        reason: "",
    })
    const [upcomingShifts, setUpcomingShifts] = useState([])
    const [currentTime, setCurrentTime] = useState(new Date())
    const [shiftRequests, setShiftRequests] = useState([])
    const [shiftExchanges, setShiftExchanges] = useState([])

    // Mock data for demonstration
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const today = new Date()
            const year = today.getFullYear()
            const month = today.getMonth()

            // Generate shifts for the current month
            const mockShifts = []
            const daysInMonth = new Date(year, month + 1, 0).getDate()

            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(year, month, day)
                const dayOfWeek = date.getDay()

                // Skip past days
                if (date < new Date(today.setHours(0, 0, 0, 0)) && day !== today.getDate()) {
                    continue
                }

                // Assign shifts based on day of week
                if (dayOfWeek === 0 || dayOfWeek === 6) {
                    // Weekend
                    if (Math.random() > 0.7) {
                        mockShifts.push({
                            id: `shift-${day}-1`,
                            date: new Date(year, month, day),
                            shiftType: Math.random() > 0.5 ? "morning" : "evening",
                            startTime: Math.random() > 0.5 ? "08:00" : "14:00",
                            endTime: Math.random() > 0.5 ? "14:00" : "20:00",
                            department: Math.random() > 0.5 ? "Terapiya" : "Jarrohlik",
                            status: "confirmed",
                        })
                    }
                } else {
                    // Weekday
                    if (Math.random() > 0.3) {
                        mockShifts.push({
                            id: `shift-${day}-1`,
                            date: new Date(year, month, day),
                            shiftType: Math.random() > 0.5 ? "morning" : "evening",
                            startTime: Math.random() > 0.5 ? "08:00" : "14:00",
                            endTime: Math.random() > 0.5 ? "14:00" : "20:00",
                            department: Math.random() > 0.5 ? "Terapiya" : "Jarrohlik",
                            status: "confirmed",
                        })
                    }
                }

                // Add some night shifts
                if (Math.random() > 0.8) {
                    mockShifts.push({
                        id: `shift-${day}-2`,
                        date: new Date(year, month, day),
                        shiftType: "night",
                        startTime: "20:00",
                        endTime: "08:00",
                        department: Math.random() > 0.5 ? "Terapiya" : "Jarrohlik",
                        status: "confirmed",
                    })
                }
            }

            // Add some pending shifts
            mockShifts.push({
                id: "shift-pending-1",
                date: new Date(year, month, today.getDate() + 5),
                shiftType: "morning",
                startTime: "08:00",
                endTime: "14:00",
                department: "Terapiya",
                status: "pending",
            })

            mockShifts.push({
                id: "shift-pending-2",
                date: new Date(year, month, today.getDate() + 7),
                shiftType: "evening",
                startTime: "14:00",
                endTime: "20:00",
                department: "Jarrohlik",
                status: "pending",
            })

            // Sort shifts by date
            mockShifts.sort((a, b) => a.date - b.date)

            setShifts(mockShifts)

            // Set upcoming shifts
            const upcoming = mockShifts
                .filter((shift) => {
                    const shiftDate = new Date(shift.date)
                    const todayDate = new Date()
                    todayDate.setHours(0, 0, 0, 0)

                    // Get shifts for today and future
                    return shiftDate >= todayDate && shift.status === "confirmed"
                })
                .slice(0, 5) // Get only the next 5 shifts

            setUpcomingShifts(upcoming)

            // Set shift requests
            setShiftRequests([
                {
                    id: "request-1",
                    date: new Date(year, month, today.getDate() + 3),
                    shiftType: "morning",
                    reason: "Oilaviy sabablarga ko'ra",
                    status: "pending",
                    requestedAt: "2023-05-12 14:30",
                },
                {
                    id: "request-2",
                    date: new Date(year, month, today.getDate() + 10),
                    shiftType: "evening",
                    reason: "Shaxsiy sabablarga ko'ra",
                    status: "approved",
                    requestedAt: "2023-05-10 09:15",
                    approvedAt: "2023-05-11 11:20",
                },
                {
                    id: "request-3",
                    date: new Date(year, month, today.getDate() - 5),
                    shiftType: "night",
                    reason: "Sog'lik sabablarga ko'ra",
                    status: "rejected",
                    requestedAt: "2023-05-05 16:45",
                    rejectedAt: "2023-05-06 10:30",
                    rejectionReason: "Hamshiralar yetishmasligi sababli",
                },
            ])

            // Set shift exchanges
            setShiftExchanges([
                {
                    id: "exchange-1",
                    myShift: {
                        date: new Date(year, month, today.getDate() + 2),
                        shiftType: "morning",
                        startTime: "08:00",
                        endTime: "14:00",
                        department: "Terapiya",
                    },
                    requestedShift: {
                        date: new Date(year, month, today.getDate() + 4),
                        shiftType: "evening",
                        startTime: "14:00",
                        endTime: "20:00",
                        department: "Terapiya",
                    },
                    withNurse: "Hamshira Karimova",
                    status: "pending",
                    requestedAt: "2023-05-13 11:30",
                },
                {
                    id: "exchange-2",
                    myShift: {
                        date: new Date(year, month, today.getDate() + 7),
                        shiftType: "evening",
                        startTime: "14:00",
                        endTime: "20:00",
                        department: "Jarrohlik",
                    },
                    requestedShift: {
                        date: new Date(year, month, today.getDate() + 8),
                        shiftType: "morning",
                        startTime: "08:00",
                        endTime: "14:00",
                        department: "Jarrohlik",
                    },
                    withNurse: "Hamshira Rahimova",
                    status: "approved",
                    requestedAt: "2023-05-09 15:45",
                    approvedAt: "2023-05-10 09:20",
                },
            ])

            setLoading(false)
        }, 1000)

        // Update current time every minute
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 60000)

        return () => clearInterval(timer)
    }, [])

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewShiftRequest((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleAddShiftRequest = (e) => {
        e.preventDefault()

        // In a real app, you would send this to an API
        // For now, we'll just update the local state
        const newRequest = {
            id: `request-${Date.now()}`,
            date: new Date(newShiftRequest.date),
            shiftType: newShiftRequest.shiftType,
            reason: newShiftRequest.reason,
            status: "pending",
            requestedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
        }

        setShiftRequests([newRequest, ...shiftRequests])
        setShowAddForm(false)
        setNewShiftRequest({
            date: "",
            shiftType: "",
            reason: "",
        })
    }

    // Format date for display
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("uz-UZ", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    }

    // Get shifts for selected date
    const getShiftsForSelectedDate = () => {
        return shifts.filter((shift) => {
            const shiftDate = new Date(shift.date)
            return (
                shiftDate.getDate() === selectedDate.getDate() &&
                shiftDate.getMonth() === selectedDate.getMonth() &&
                shiftDate.getFullYear() === selectedDate.getFullYear()
            )
        })
    }

    // Get days in current month
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate()
    }

    // Get calendar days
    const getCalendarDays = () => {
        const year = selectedDate.getFullYear()
        const month = selectedDate.getMonth()

        const daysInMonth = getDaysInMonth(year, month)
        const firstDayOfMonth = new Date(year, month, 1).getDay()

        // Adjust for Sunday as first day of week
        const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1

        const days = []

        // Add days from previous month
        const prevMonth = month === 0 ? 11 : month - 1
        const prevMonthYear = month === 0 ? year - 1 : year
        const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth)

        for (let i = adjustedFirstDay - 1; i >= 0; i--) {
            days.push({
                date: new Date(prevMonthYear, prevMonth, daysInPrevMonth - i),
                isCurrentMonth: false,
            })
        }

        // Add days from current month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({
                date: new Date(year, month, i),
                isCurrentMonth: true,
            })
        }

        // Add days from next month
        const nextMonth = month === 11 ? 0 : month + 1
        const nextMonthYear = month === 11 ? year + 1 : year

        const totalDaysNeeded = 42 // 6 rows of 7 days
        const remainingDays = totalDaysNeeded - days.length

        for (let i = 1; i <= remainingDays; i++) {
            days.push({
                date: new Date(nextMonthYear, nextMonth, i),
                isCurrentMonth: false,
            })
        }

        return days
    }

    // Check if a day has shifts
    const hasShifts = (date) => {
        return shifts.some((shift) => {
            const shiftDate = new Date(shift.date)
            return (
                shiftDate.getDate() === date.getDate() &&
                shiftDate.getMonth() === date.getMonth() &&
                shiftDate.getFullYear() === date.getFullYear()
            )
        })
    }

    // Get shift type class
    const getShiftTypeClass = (date) => {
        const dayShifts = shifts.filter((shift) => {
            const shiftDate = new Date(shift.date)
            return (
                shiftDate.getDate() === date.getDate() &&
                shiftDate.getMonth() === date.getMonth() &&
                shiftDate.getFullYear() === date.getFullYear() &&
                shift.status === "confirmed"
            )
        })

        if (dayShifts.length === 0) return ""

        const shiftTypes = dayShifts.map((shift) => shift.shiftType)

        if (shiftTypes.includes("morning") && shiftTypes.includes("evening")) {
            return "full-day"
        } else if (shiftTypes.includes("morning")) {
            return "morning-shift"
        } else if (shiftTypes.includes("evening")) {
            return "evening-shift"
        } else if (shiftTypes.includes("night")) {
            return "night-shift"
        }

        return ""
    }

    // Check if a day has pending shifts
    const hasPendingShifts = (date) => {
        return shifts.some((shift) => {
            const shiftDate = new Date(shift.date)
            return (
                shiftDate.getDate() === date.getDate() &&
                shiftDate.getMonth() === date.getMonth() &&
                shiftDate.getFullYear() === date.getFullYear() &&
                shift.status === "pending"
            )
        })
    }

    // Navigate to previous month
    const goToPrevMonth = () => {
        const prevMonth = new Date(selectedDate)
        prevMonth.setMonth(prevMonth.getMonth() - 1)
        setSelectedDate(prevMonth)
    }

    // Navigate to next month
    const goToNextMonth = () => {
        const nextMonth = new Date(selectedDate)
        nextMonth.setMonth(nextMonth.getMonth() + 1)
        setSelectedDate(nextMonth)
    }

    // Navigate to today
    const goToToday = () => {
        setSelectedDate(new Date())
    }

    return (
        <div className="nurse-schedule">
            <div className="schedule-header">
                <div className="schedule-title">
                    <FaCalendarAlt />
                    <h1>Ish jadvali</h1>
                </div>
                <div className="schedule-actions">
                    <button className="add-request-button" onClick={() => setShowAddForm(true)}>
                        <FaPlus />
                        Yangi so'rov
                    </button>
                </div>
            </div>

            <div className="schedule-content">
                <div className="schedule-sidebar">
                    <div className="upcoming-shifts">
                        <h2>Keyingi smenalar</h2>
                        {loading ? (
                            <div className="loading-spinner">
                                <div className="spinner"></div>
                                <p>Ma'lumotlar yuklanmoqda...</p>
                            </div>
                        ) : (
                            <>
                                {upcomingShifts.length === 0 ? (
                                    <div className="no-shifts">
                                        <p>Keyingi smenalar yo'q</p>
                                    </div>
                                ) : (
                                    <ul className="shifts-list">
                                        {upcomingShifts.map((shift) => {
                                            const isToday = new Date(shift.date).toDateString() === new Date().toDateString()
                                            return (
                                                <li
                                                    key={shift.id}
                                                    className={`shift-item ${shift.shiftType} ${isToday ? "today" : ""}`}
                                                    onClick={() => handleDateChange(new Date(shift.date))}
                                                >
                                                    <div className="shift-date">
                                                        <span className="day">{new Date(shift.date).getDate()}</span>
                                                        <span className="month">
                                                            {new Date(shift.date).toLocaleDateString("uz-UZ", { month: "short" })}
                                                        </span>
                                                    </div>
                                                    <div className="shift-details">
                                                        <h4 className="shift-type">
                                                            {shift.shiftType === "morning"
                                                                ? "Ertalabki smena"
                                                                : shift.shiftType === "evening"
                                                                    ? "Kechki smena"
                                                                    : "Tungi smena"}
                                                        </h4>
                                                        <p className="shift-time">
                                                            {shift.startTime} - {shift.endTime}
                                                        </p>
                                                        <p className="shift-department">{shift.department}</p>
                                                    </div>
                                                    {isToday && (
                                                        <div className="today-badge">
                                                            <span>Bugun</span>
                                                        </div>
                                                    )}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
                            </>
                        )}
                    </div>

                    <div className="shift-legend">
                        <h3>Smenalar belgilari</h3>
                        <div className="legend-items">
                            <div className="legend-item">
                                <span className="legend-color morning-shift"></span>
                                <span className="legend-label">Ertalabki smena (08:00 - 14:00)</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-color evening-shift"></span>
                                <span className="legend-label">Kechki smena (14:00 - 20:00)</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-color night-shift"></span>
                                <span className="legend-label">Tungi smena (20:00 - 08:00)</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-color full-day"></span>
                                <span className="legend-label">To'liq kun</span>
                            </div>
                            <div className="legend-item">
                                <span className="legend-color pending-shift"></span>
                                <span className="legend-label">Kutilayotgan smena</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="schedule-main">
                    <div className="schedule-tabs">
                        <button className={activeTab === "calendar" ? "active" : ""} onClick={() => setActiveTab("calendar")}>
                            <FaCalendarAlt />
                            Kalendar
                        </button>
                        <button className={activeTab === "requests" ? "active" : ""} onClick={() => setActiveTab("requests")}>
                            <FaRegClock />
                            So'rovlar
                        </button>
                        <button className={activeTab === "exchanges" ? "active" : ""} onClick={() => setActiveTab("exchanges")}>
                            <FaExchangeAlt />
                            Almashinuvlar
                        </button>
                    </div>

                    <div className="tab-content">
                        {activeTab === "calendar" && (
                            <div className="calendar-tab">
                                <div className="calendar-header">
                                    <div className="month-navigation">
                                        <button onClick={goToPrevMonth}>&lt;</button>
                                        <h2>{selectedDate.toLocaleDateString("uz-UZ", { month: "long", year: "numeric" })}</h2>
                                        <button onClick={goToNextMonth}>&gt;</button>
                                    </div>
                                    <button className="today-button" onClick={goToToday}>
                                        Bugun
                                    </button>
                                </div>

                                <div className="calendar">
                                    <div className="calendar-weekdays">
                                        <div>Du</div>
                                        <div>Se</div>
                                        <div>Ch</div>
                                        <div>Pa</div>
                                        <div>Ju</div>
                                        <div>Sh</div>
                                        <div>Ya</div>
                                    </div>
                                    <div className="calendar-days">
                                        {getCalendarDays().map((day, index) => {
                                            const isToday = day.date.toDateString() === new Date().toDateString()
                                            const isSelected = day.date.toDateString() === selectedDate.toDateString()

                                            return (
                                                <div
                                                    key={index}
                                                    className={`calendar-day ${!day.isCurrentMonth ? "other-month" : ""} ${isToday ? "today" : ""} ${isSelected ? "selected" : ""} ${getShiftTypeClass(day.date)}`}
                                                    onClick={() => handleDateChange(day.date)}
                                                >
                                                    <span className="day-number">{day.date.getDate()}</span>
                                                    {hasPendingShifts(day.date) && <span className="pending-indicator"></span>}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="day-shifts">
                                    <h3>{formatDate(selectedDate)}</h3>
                                    <div className="shifts-for-day">
                                        {getShiftsForSelectedDate().length === 0 ? (
                                            <div className="no-shifts-for-day">
                                                <p>Bu kun uchun smenalar yo'q</p>
                                            </div>
                                        ) : (
                                            <ul>
                                                {getShiftsForSelectedDate().map((shift) => (
                                                    <li
                                                        key={shift.id}
                                                        className={`day-shift-item ${shift.shiftType} ${shift.status === "pending" ? "pending" : ""}`}
                                                    >
                                                        <div className="shift-time-range">
                                                            <span>
                                                                {shift.startTime} - {shift.endTime}
                                                            </span>
                                                            {shift.status === "pending" && <span className="pending-badge">Kutilmoqda</span>}
                                                        </div>
                                                        <div className="shift-info">
                                                            <h4>
                                                                {shift.shiftType === "morning"
                                                                    ? "Ertalabki smena"
                                                                    : shift.shiftType === "evening"
                                                                        ? "Kechki smena"
                                                                        : "Tungi smena"}
                                                            </h4>
                                                            <p>{shift.department}</p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "requests" && (
                            <div className="requests-tab">
                                {showAddForm ? (
                                    <div className="add-request-form">
                                        <h3>Yangi so'rov yaratish</h3>
                                        <form onSubmit={handleAddShiftRequest}>
                                            <div className="form-group">
                                                <label htmlFor="date">Sana</label>
                                                <input
                                                    type="date"
                                                    id="date"
                                                    name="date"
                                                    value={newShiftRequest.date}
                                                    onChange={handleInputChange}
                                                    min={new Date().toISOString().split("T")[0]}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="shiftType">Smena turi</label>
                                                <select
                                                    id="shiftType"
                                                    name="shiftType"
                                                    value={newShiftRequest.shiftType}
                                                    onChange={handleInputChange}
                                                    required
                                                >
                                                    <option value="">Tanlang</option>
                                                    <option value="morning">Ertalabki smena (08:00 - 14:00)</option>
                                                    <option value="evening">Kechki smena (14:00 - 20:00)</option>
                                                    <option value="night">Tungi smena (20:00 - 08:00)</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="reason">Sabab</label>
                                                <textarea
                                                    id="reason"
                                                    name="reason"
                                                    value={newShiftRequest.reason}
                                                    onChange={handleInputChange}
                                                    rows="3"
                                                    required
                                                ></textarea>
                                            </div>
                                            <div className="form-buttons">
                                                <button type="button" className="cancel-button" onClick={() => setShowAddForm(false)}>
                                                    Bekor qilish
                                                </button>
                                                <button type="submit" className="submit-button">
                                                    So'rovni yuborish
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                ) : (
                                    <>
                                        <div className="requests-header">
                                            <h3>Smena so'rovlari</h3>
                                            <button className="add-request-button" onClick={() => setShowAddForm(true)}>
                                                <FaPlus />
                                                Yangi so'rov
                                            </button>
                                        </div>
                                        <div className="requests-list">
                                            {shiftRequests.length === 0 ? (
                                                <div className="no-requests">
                                                    <p>Smena so'rovlari yo'q</p>
                                                </div>
                                            ) : (
                                                <ul>
                                                    {shiftRequests.map((request) => (
                                                        <li key={request.id} className={`request-item ${request.status}`}>
                                                            <div className="request-status">
                                                                {request.status === "pending" && (
                                                                    <span className="status-badge pending">Kutilmoqda</span>
                                                                )}
                                                                {request.status === "approved" && (
                                                                    <span className="status-badge approved">Tasdiqlangan</span>
                                                                )}
                                                                {request.status === "rejected" && (
                                                                    <span className="status-badge rejected">Rad etilgan</span>
                                                                )}
                                                            </div>
                                                            <div className="request-details">
                                                                <div className="request-date">
                                                                    <h4>{formatDate(request.date)}</h4>
                                                                    <p className="shift-type">
                                                                        {request.shiftType === "morning"
                                                                            ? "Ertalabki smena (08:00 - 14:00)"
                                                                            : request.shiftType === "evening"
                                                                                ? "Kechki smena (14:00 - 20:00)"
                                                                                : "Tungi smena (20:00 - 08:00)"}
                                                                    </p>
                                                                </div>
                                                                <div className="request-reason">
                                                                    <p>
                                                                        <strong>Sabab:</strong> {request.reason}
                                                                    </p>
                                                                </div>
                                                                <div className="request-timestamps">
                                                                    <p>
                                                                        <small>So'rov yuborilgan: {request.requestedAt}</small>
                                                                    </p>
                                                                    {request.status === "approved" && (
                                                                        <p>
                                                                            <small>Tasdiqlangan: {request.approvedAt}</small>
                                                                        </p>
                                                                    )}
                                                                    {request.status === "rejected" && (
                                                                        <>
                                                                            <p>
                                                                                <small>Rad etilgan: {request.rejectedAt}</small>
                                                                            </p>
                                                                            <p>
                                                                                <small>Rad etish sababi: {request.rejectionReason}</small>
                                                                            </p>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {activeTab === "exchanges" && (
                            <div className="exchanges-tab">
                                <h3>Smena almashinuvlari</h3>
                                <div className="exchanges-list">
                                    {shiftExchanges.length === 0 ? (
                                        <div className="no-exchanges">
                                            <p>Smena almashinuvlari yo'q</p>
                                        </div>
                                    ) : (
                                        <ul>
                                            {shiftExchanges.map((exchange) => (
                                                <li key={exchange.id} className={`exchange-item ${exchange.status}`}>
                                                    <div className="exchange-status">
                                                        {exchange.status === "pending" && <span className="status-badge pending">Kutilmoqda</span>}
                                                        {exchange.status === "approved" && (
                                                            <span className="status-badge approved">Tasdiqlangan</span>
                                                        )}
                                                        {exchange.status === "rejected" && (
                                                            <span className="status-badge rejected">Rad etilgan</span>
                                                        )}
                                                    </div>
                                                    <div className="exchange-details">
                                                        <div className="exchange-shifts">
                                                            <div className="my-shift">
                                                                <h4>Mening smenam</h4>
                                                                <p className="shift-date">{formatDate(exchange.myShift.date)}</p>
                                                                <p className="shift-type">
                                                                    {exchange.myShift.shiftType === "morning"
                                                                        ? "Ertalabki smena"
                                                                        : exchange.myShift.shiftType === "evening"
                                                                            ? "Kechki smena"
                                                                            : "Tungi smena"}
                                                                </p>
                                                                <p className="shift-time">
                                                                    {exchange.myShift.startTime} - {exchange.myShift.endTime}
                                                                </p>
                                                                <p className="shift-department">{exchange.myShift.department}</p>
                                                            </div>
                                                            <div className="exchange-arrow">
                                                                <FaExchangeAlt />
                                                            </div>
                                                            <div className="requested-shift">
                                                                <h4>So'ralgan smena</h4>
                                                                <p className="shift-date">{formatDate(exchange.requestedShift.date)}</p>
                                                                <p className="shift-type">
                                                                    {exchange.requestedShift.shiftType === "morning"
                                                                        ? "Ertalabki smena"
                                                                        : exchange.requestedShift.shiftType === "evening"
                                                                            ? "Kechki smena"
                                                                            : "Tungi smena"}
                                                                </p>
                                                                <p className="shift-time">
                                                                    {exchange.requestedShift.startTime} - {exchange.requestedShift.endTime}
                                                                </p>
                                                                <p className="shift-department">{exchange.requestedShift.department}</p>
                                                            </div>
                                                        </div>
                                                        <div className="exchange-info">
                                                            <p>
                                                                <strong>Hamshira:</strong> {exchange.withNurse}
                                                            </p>
                                                            <p>
                                                                <small>So'rov yuborilgan: {exchange.requestedAt}</small>
                                                            </p>
                                                            {exchange.status === "approved" && (
                                                                <p>
                                                                    <small>Tasdiqlangan: {exchange.approvedAt}</small>
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NurseSchedule;