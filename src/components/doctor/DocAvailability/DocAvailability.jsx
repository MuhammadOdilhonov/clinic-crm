"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import {
    FaCalendarAlt,
    FaClock,
    FaRegClock,
    FaCalendarCheck,
    FaCalendarTimes,
    FaCalendarDay,
    FaCalendarWeek,
    FaChevronLeft,
    FaChevronRight,
    FaPlus,
    FaEdit,
    FaTrash,
    FaExclamationTriangle,
    FaSpinner,
    FaTimes,
    FaCheck,
    FaRegCalendarAlt,
    FaRegHospital,
    FaRegClipboard,
    FaInfoCircle,
} from "react-icons/fa"

export default function DocAvailability() {
    const { user } = useAuth()
    const { t } = useLanguage()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Data states
    const [schedule, setSchedule] = useState([])
    const [workingHours, setWorkingHours] = useState([])
    const [branches, setBranches] = useState([])
    const [appointments, setAppointments] = useState([])

    // UI states
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
    const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStartDate(new Date()))
    const [viewMode, setViewMode] = useState("week") // week, day
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [currentSlot, setCurrentSlot] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Form states
    const [formData, setFormData] = useState({
        date: new Date().toISOString().split("T")[0],
        startTime: "09:00",
        endTime: "17:00",
        branchId: "",
        status: "available",
        notes: "",
    })

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                // In a real app, these would be API calls
                // Simulating API calls with setTimeout
                setTimeout(() => {
                    // Mock branches data
                    const mockBranches = [
                        { id: 1, name: "Main Branch", address: "Tashkent, Chilanzar district" },
                        { id: 2, name: "Secondary Branch", address: "Tashkent, Yunusabad district" },
                        { id: 3, name: "Tertiary Branch", address: "Tashkent, Mirzo Ulugbek district" },
                    ]

                    // Mock working hours
                    const mockWorkingHours = [
                        { day: 1, name: "Monday", start: "08:00", end: "20:00" },
                        { day: 2, name: "Tuesday", start: "09:00", end: "17:00" },
                        { day: 3, name: "Wednesday", start: "07:00", end: "19:00" },
                        { day: 4, name: "Thursday", start: "05:00", end: "23:00" },
                        { day: 5, name: "Friday", start: "20:00", end: "10:00" },
                        { day: 6, name: "Saturday", start: "", end: "" },
                        { day: 0, name: "Sunday", start: "", end: "" },
                    ]

                    // Generate dates for the next 30 days
                    const today = new Date()
                    const dates = []
                    for (let i = 0; i < 30; i++) {
                        const date = new Date(today)
                        date.setDate(date.getDate() + i)
                        dates.push(date.toISOString().split("T")[0])
                    }

                    // Mock schedule data
                    const mockSchedule = []

                    // Regular working hours based on weekday
                    dates.forEach((date) => {
                        const dayOfWeek = new Date(date).getDay()
                        const workingHour = mockWorkingHours.find((wh) => wh.day === dayOfWeek)

                        if (workingHour && workingHour.start) {
                            mockSchedule.push({
                                id: `regular-${date}`,
                                date: date,
                                startTime: workingHour.start,
                                endTime: workingHour.end,
                                branchId: 1, // Default to main branch
                                status: "available",
                                type: "regular",
                                notes: "",
                            })
                        }
                    })

                    // Add some special schedule entries
                    mockSchedule.push(
                        {
                            id: "special-1",
                            date: dates[2],
                            startTime: "10:00",
                            endTime: "16:00",
                            branchId: 2,
                            status: "available",
                            type: "special",
                            notes: "Working at Secondary Branch",
                        },
                        {
                            id: "special-2",
                            date: dates[5],
                            startTime: "",
                            endTime: "",
                            branchId: null,
                            status: "unavailable",
                            type: "special",
                            notes: "Personal leave",
                        },
                        {
                            id: "special-3",
                            date: dates[10],
                            startTime: "14:00",
                            endTime: "18:00",
                            branchId: 3,
                            status: "available",
                            type: "special",
                            notes: "Evening shift at Tertiary Branch",
                        },
                    )

                    // Mock appointments data
                    const mockAppointments = [
                        {
                            id: 1001,
                            patientId: 101,
                            patientName: "Alisher Karimov",
                            doctorId: 1,
                            doctorName: "Dr. Sardor Alimov",
                            date: dates[0],
                            startTime: "09:00",
                            endTime: "09:30",
                            status: "confirmed",
                            branchId: 1,
                            branchName: "Main Branch",
                            notes: "Regular check-up",
                        },
                        {
                            id: 1002,
                            patientId: 102,
                            patientName: "Dilnoza Saidova",
                            doctorId: 1,
                            doctorName: "Dr. Sardor Alimov",
                            date: dates[0],
                            startTime: "10:00",
                            endTime: "10:30",
                            status: "confirmed",
                            branchId: 1,
                            branchName: "Main Branch",
                            notes: "Consultation",
                        },
                        {
                            id: 1003,
                            patientId: 103,
                            patientName: "Rustam Khasanov",
                            doctorId: 1,
                            doctorName: "Dr. Sardor Alimov",
                            date: dates[1],
                            startTime: "11:00",
                            endTime: "11:30",
                            status: "confirmed",
                            branchId: 1,
                            branchName: "Main Branch",
                            notes: "Follow-up",
                        },
                        {
                            id: 1004,
                            patientId: 104,
                            patientName: "Nodira Azimova",
                            doctorId: 1,
                            doctorName: "Dr. Sardor Alimov",
                            date: dates[2],
                            startTime: "14:00",
                            endTime: "14:30",
                            status: "confirmed",
                            branchId: 2,
                            branchName: "Secondary Branch",
                            notes: "Asthma review",
                        },
                        {
                            id: 1005,
                            patientId: 105,
                            patientName: "Jahongir Tursunov",
                            doctorId: 1,
                            doctorName: "Dr. Sardor Alimov",
                            date: dates[3],
                            startTime: "15:00",
                            endTime: "15:30",
                            status: "confirmed",
                            branchId: 1,
                            branchName: "Main Branch",
                            notes: "Migraine consultation",
                        },
                    ]

                    setBranches(mockBranches)
                    setWorkingHours(mockWorkingHours)
                    setSchedule(mockSchedule)
                    setAppointments(mockAppointments)
                    setLoading(false)
                }, 800)
            } catch (err) {
                setError(err.message || "An error occurred")
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // Helper function to get the start date of the week
    function getWeekStartDate(date) {
        const newDate = new Date(date)
        const day = newDate.getDay()
        const diff = newDate.getDate() - day + (day === 0 ? -6 : 1) // Adjust for Sunday
        return new Date(newDate.setDate(diff))
    }

    // Generate time slots from 9:00 to 17:00
    const generateTimeSlots = () => {
        const slots = []
        for (let hour = 0; hour < 23; hour++) {
            slots.push(`${hour.toString().padStart(2, "0")}:00`)
        }
        return slots
    }

    const timeSlots = generateTimeSlots()

    // Generate week days
    const generateWeekDays = () => {
        const days = []
        const startDate = new Date(currentWeekStart)

        for (let i = 0; i < 7; i++) {
            const date = new Date(startDate)
            date.setDate(date.getDate() + i)
            days.push({
                date: date.toISOString().split("T")[0],
                dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
                dayNumber: date.getDate(),
                month: date.toLocaleDateString("en-US", { month: "short" }),
            })
        }

        return days
    }

    const weekDays = generateWeekDays()

    // Get schedule for a specific day
    const getScheduleForDay = (date) => {
        return schedule.find((slot) => slot.date === date) || null
    }

    // Get appointments for a specific day
    const getAppointmentsForDay = (date) => {
        return appointments.filter((appointment) => appointment.date === date)
    }

    // Check if time slot has appointment
    const hasAppointmentAtTime = (date, time) => {
        return appointments.some(
            (appointment) => appointment.date === date && appointment.startTime <= time && appointment.endTime > time,
        )
    }

    // Get appointment at time
    const getAppointmentAtTime = (date, time) => {
        return appointments.find(
            (appointment) => appointment.date === date && appointment.startTime <= time && appointment.endTime > time,
        )
    }

    // Check if time is within working hours
    const isWithinWorkingHours = (date, time) => {
        const scheduleForDay = getScheduleForDay(date)

        if (!scheduleForDay || scheduleForDay.status === "unavailable") {
            return false
        }

        const [hour, minute] = time.split(":").map(Number)
        const [startHour, startMinute] = scheduleForDay.startTime.split(":").map(Number)
        const [endHour, endMinute] = scheduleForDay.endTime.split(":").map(Number)

        const timeValue = hour * 60 + minute
        const startValue = startHour * 60 + startMinute
        const endValue = endHour * 60 + endMinute

        return timeValue >= startValue && timeValue < endValue
    }

    // Handle view mode change
    const handleViewModeChange = (mode) => {
        setViewMode(mode)
    }

    // Navigate to today
    const goToToday = () => {
        setSelectedDate(new Date().toISOString().split("T")[0])
        setCurrentWeekStart(getWeekStartDate(new Date()))
    }

    // Navigate to previous week/day
    const goToPrevious = () => {
        if (viewMode === "week") {
            const prevWeek = new Date(currentWeekStart)
            prevWeek.setDate(prevWeek.getDate() - 7)
            setCurrentWeekStart(prevWeek)
        } else {
            const prevDay = new Date(selectedDate)
            prevDay.setDate(prevDay.getDate() - 1)
            setSelectedDate(prevDay.toISOString().split("T")[0])
        }
    }

    // Navigate to next week/day
    const goToNext = () => {
        if (viewMode === "week") {
            const nextWeek = new Date(currentWeekStart)
            nextWeek.setDate(nextWeek.getDate() + 7)
            setCurrentWeekStart(nextWeek)
        } else {
            const nextDay = new Date(selectedDate)
            nextDay.setDate(nextDay.getDate() + 1)
            setSelectedDate(nextDay.toISOString().split("T")[0])
        }
    }

    // Open add modal
    const openAddModal = () => {
        setFormData({
            date: selectedDate,
            startTime: "09:00",
            endTime: "17:00",
            branchId: "1",
            status: "available",
            notes: "",
        })
        setShowAddModal(true)
    }

    // Open edit modal
    const openEditModal = (slot) => {
        setCurrentSlot(slot)
        setFormData({
            date: slot.date,
            startTime: slot.startTime || "09:00",
            endTime: slot.endTime || "17:00",
            branchId: slot.branchId ? slot.branchId.toString() : "",
            status: slot.status,
            notes: slot.notes || "",
        })
        setShowEditModal(true)
    }

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Handle add schedule
    const handleAddSchedule = () => {
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            const newSchedule = {
                id: `special-${Date.now()}`,
                date: formData.date,
                startTime: formData.status === "available" ? formData.startTime : "",
                endTime: formData.status === "available" ? formData.endTime : "",
                branchId: formData.status === "available" ? Number.parseInt(formData.branchId) : null,
                status: formData.status,
                type: "special",
                notes: formData.notes,
            }

            // Remove any existing special schedule for this date
            const filteredSchedule = schedule.filter((slot) => !(slot.date === formData.date && slot.type === "special"))

            setSchedule([...filteredSchedule, newSchedule])
            setShowAddModal(false)
            setIsSubmitting(false)
        }, 800)
    }

    // Handle edit schedule
    const handleEditSchedule = () => {
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            const updatedSchedule = {
                ...currentSlot,
                startTime: formData.status === "available" ? formData.startTime : "",
                endTime: formData.status === "available" ? formData.endTime : "",
                branchId: formData.status === "available" ? Number.parseInt(formData.branchId) : null,
                status: formData.status,
                notes: formData.notes,
            }

            const updatedScheduleList = schedule.map((slot) => (slot.id === currentSlot.id ? updatedSchedule : slot))

            setSchedule(updatedScheduleList)
            setShowEditModal(false)
            setCurrentSlot(null)
            setIsSubmitting(false)
        }, 800)
    }

    // Handle delete schedule
    const handleDeleteSchedule = () => {
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            // If it's a special schedule, remove it
            // If it's a regular schedule, mark it as unavailable
            if (currentSlot.type === "special") {
                const filteredSchedule = schedule.filter((slot) => slot.id !== currentSlot.id)
                setSchedule(filteredSchedule)
            } else {
                const updatedSchedule = {
                    ...currentSlot,
                    status: "unavailable",
                    startTime: "",
                    endTime: "",
                    branchId: null,
                    notes: formData.notes || "Not available",
                }

                const updatedScheduleList = schedule.map((slot) => (slot.id === currentSlot.id ? updatedSchedule : slot))

                setSchedule(updatedScheduleList)
            }

            setShowEditModal(false)
            setCurrentSlot(null)
            setIsSubmitting(false)
        }, 800)
    }

    // Format time
    const formatTime = (timeString) => {
        if (!timeString) return ""

        const [hours, minutes] = timeString.split(":")
        return `${hours}:${minutes}`
    }

    // Get day status class
    const getDayStatusClass = (date) => {
        const scheduleForDay = getScheduleForDay(date)

        if (!scheduleForDay) {
            return "day-unavailable"
        }

        return scheduleForDay.status === "available" ? "day-available" : "day-unavailable"
    }

    // Get time slot class
    const getTimeSlotClass = (date, time) => {
        if (!isWithinWorkingHours(date, time)) {
            return "time-unavailable"
        }

        if (hasAppointmentAtTime(date, time)) {
            return "time-booked"
        }

        return "time-available"
    }

    // Loading state
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>{t("loading")}...</p>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="error-container">
                <FaExclamationTriangle className="error-icon" />
                <h2>{t("error_occurred")}</h2>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={() => window.location.reload()}>
                    {t("try_again")}
                </button>
            </div>
        )
    }

    return (
        <div className="doctor-availability">
            <div className="page-header">
                <div className="header-title">
                    <FaCalendarAlt className="header-icon" />
                    <h1>{t("my_availability")}</h1>
                </div>
                <div className="header-actions">
                    <div className="view-toggle">
                        <button
                            className={`btn ${viewMode === "week" ? "btn-primary" : "btn-outline"}`}
                            onClick={() => handleViewModeChange("week")}
                        >
                            <FaCalendarWeek /> {t("week_view")}
                        </button>
                        <button
                            className={`btn ${viewMode === "day" ? "btn-primary" : "btn-outline"}`}
                            onClick={() => handleViewModeChange("day")}
                        >
                            <FaCalendarDay /> {t("day_view")}
                        </button>
                    </div>

                    <button className="btn btn-today" onClick={goToToday}>
                        <FaRegCalendarAlt /> {t("today")}
                    </button>

                    <button className="btn btn-primary" onClick={openAddModal}>
                        <FaPlus /> {t("set_availability")}
                    </button>
                </div>
            </div>

            {/* Week View */}
            {viewMode === "week" && (
                <div className="week-view">
                    <div className="calendar-header">
                        <button className="btn btn-icon" onClick={goToPrevious}>
                            <FaChevronLeft />
                        </button>
                        <h3>
                            {weekDays[0].month} {weekDays[0].dayNumber} - {weekDays[6].month} {weekDays[6].dayNumber},{" "}
                            {new Date(weekDays[0].date).getFullYear()}
                        </h3>
                        <button className="btn btn-icon" onClick={goToNext}>
                            <FaChevronRight />
                        </button>
                    </div>

                    <div className="week-grid">
                        <div className="time-labels">
                            <div className="day-label"></div>
                            {timeSlots.map((timeSlot) => (
                                <div key={timeSlot} className="time-label">
                                    <FaClock className="time-icon" />
                                    <span>{formatTime(timeSlot)}</span>
                                </div>
                            ))}
                        </div>

                        {weekDays.map((day) => (
                            <div key={day.date} className="day-column">
                                <div
                                    className={`day-label ${day.date === new Date().toISOString().split("T")[0] ? "today" : ""} ${getDayStatusClass(day.date)}`}
                                    onClick={() => {
                                        const scheduleForDay = getScheduleForDay(day.date)
                                        if (scheduleForDay) {
                                            openEditModal(scheduleForDay)
                                        } else {
                                            setSelectedDate(day.date)
                                            openAddModal()
                                        }
                                    }}
                                >
                                    <div className="day-name">{day.dayName}</div>
                                    <div className="day-number">{day.dayNumber}</div>
                                    <div className="day-status">
                                        {(() => {
                                            const scheduleForDay = getScheduleForDay(day.date)
                                            if (!scheduleForDay || scheduleForDay.status === "unavailable") {
                                                return <FaCalendarTimes className="status-icon unavailable" />
                                            }

                                            const branch = branches.find((b) => b.id === scheduleForDay.branchId)
                                            return (
                                                <div className="branch-badge">
                                                    <FaRegHospital className="branch-icon" />
                                                    <span>{branch ? branch.name : t("unavailable")}</span>
                                                </div>
                                            )
                                        })()}
                                    </div>
                                </div>

                                {timeSlots.map((timeSlot) => {
                                    const timeSlotClass = getTimeSlotClass(day.date, timeSlot)
                                    const appointment = getAppointmentAtTime(day.date, timeSlot)

                                    return (
                                        <div
                                            key={`${day.date}-${timeSlot}`}
                                            className={`time-cell ${timeSlotClass} ${day.date === new Date().toISOString().split("T")[0] ? "today-cell" : ""}`}
                                        >
                                            {appointment && (
                                                <div className="appointment-indicator">
                                                    <div className="appointment-content">
                                                        <span className="patient-name">{appointment.patientName}</span>
                                                        <span className="appointment-time">
                                                            {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Day View */}
            {viewMode === "day" && (
                <div className="day-view">
                    <div className="calendar-header">
                        <button className="btn btn-icon" onClick={goToPrevious}>
                            <FaChevronLeft />
                        </button>
                        <h3>
                            {new Date(selectedDate).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </h3>
                        <button className="btn btn-icon" onClick={goToNext}>
                            <FaChevronRight />
                        </button>
                    </div>

                    <div className="day-schedule">
                        {(() => {
                            const scheduleForDay = getScheduleForDay(selectedDate)

                            if (!scheduleForDay || scheduleForDay.status === "unavailable") {
                                return (
                                    <div className="unavailable-day">
                                        <FaCalendarTimes className="unavailable-icon" />
                                        <h3>{t("not_available")}</h3>
                                        <p>{scheduleForDay?.notes || t("no_availability_set")}</p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => (scheduleForDay ? openEditModal(scheduleForDay) : openAddModal())}
                                        >
                                            <FaEdit /> {scheduleForDay ? t("edit_availability") : t("set_availability")}
                                        </button>
                                    </div>
                                )
                            }

                            const branch = branches.find((b) => b.id === scheduleForDay.branchId)

                            return (
                                <>
                                    <div className="day-info">
                                        <div className="info-card">
                                            <div className="info-header">
                                                <FaRegHospital className="info-icon" />
                                                <h3>{t("branch")}</h3>
                                            </div>
                                            <div className="info-content">
                                                <p>{branch ? branch.name : t("not_specified")}</p>
                                                <p className="info-address">{branch ? branch.address : ""}</p>
                                            </div>
                                        </div>

                                        <div className="info-card">
                                            <div className="info-header">
                                                <FaRegClock className="info-icon" />
                                                <h3>{t("working_hours")}</h3>
                                            </div>
                                            <div className="info-content">
                                                <p>
                                                    {formatTime(scheduleForDay.startTime)} - {formatTime(scheduleForDay.endTime)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="info-card">
                                            <div className="info-header">
                                                <FaRegClipboard className="info-icon" />
                                                <h3>{t("notes")}</h3>
                                            </div>
                                            <div className="info-content">
                                                <p>{scheduleForDay.notes || t("no_notes")}</p>
                                            </div>
                                        </div>

                                        <div className="info-actions">
                                            <button className="btn btn-primary" onClick={() => openEditModal(scheduleForDay)}>
                                                <FaEdit /> {t("edit_availability")}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="day-appointments">
                                        <h3 className="section-title">
                                            <FaCalendarCheck className="section-icon" />
                                            {t("appointments")}
                                        </h3>

                                        <div className="appointments-list">
                                            {getAppointmentsForDay(selectedDate).length > 0 ? (
                                                getAppointmentsForDay(selectedDate).map((appointment) => (
                                                    <div key={appointment.id} className="appointment-card">
                                                        <div className="appointment-time">
                                                            <FaRegClock className="time-icon" />
                                                            <span>
                                                                {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                                                            </span>
                                                        </div>
                                                        <div className="appointment-details">
                                                            <div className="patient-name">{appointment.patientName}</div>
                                                            <div className="appointment-notes">{appointment.notes}</div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="no-appointments">
                                                    <p>{t("no_appointments_scheduled")}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            )
                        })()}
                    </div>
                </div>
            )}

            {/* Add Availability Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>{t("set_availability")}</h3>
                            <button className="close-btn" onClick={() => setShowAddModal(false)}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="date">
                                    <FaCalendarAlt className="form-icon" /> {t("date")}
                                </label>
                                <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">
                                    <FaCalendarCheck className="form-icon" /> {t("availability_status")}
                                </label>
                                <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
                                    <option value="available">{t("available")}</option>
                                    <option value="unavailable">{t("unavailable")}</option>
                                </select>
                            </div>

                            {formData.status === "available" && (
                                <>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="startTime">
                                                <FaClock className="form-icon" /> {t("start_time")}
                                            </label>
                                            <input
                                                type="time"
                                                id="startTime"
                                                name="startTime"
                                                value={formData.startTime}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="endTime">
                                                <FaClock className="form-icon" /> {t("end_time")}
                                            </label>
                                            <input
                                                type="time"
                                                id="endTime"
                                                name="endTime"
                                                value={formData.endTime}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="branchId">
                                            <FaRegHospital className="form-icon" /> {t("branch")}
                                        </label>
                                        <select id="branchId" name="branchId" value={formData.branchId} onChange={handleInputChange}>
                                            <option value="">{t("select_branch")}</option>
                                            {branches.map((branch) => (
                                                <option key={branch.id} value={branch.id}>
                                                    {branch.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <label htmlFor="notes">
                                    <FaRegClipboard className="form-icon" /> {t("notes")}
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    rows="3"
                                    placeholder={t("enter_notes")}
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowAddModal(false)} disabled={isSubmitting}>
                                {t("cancel")}
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleAddSchedule}
                                disabled={
                                    (formData.status === "available" &&
                                        (!formData.startTime || !formData.endTime || !formData.branchId)) ||
                                    isSubmitting
                                }
                            >
                                {isSubmitting ? (
                                    <>
                                        <FaSpinner className="spinner-icon" />
                                        {t("saving")}...
                                    </>
                                ) : (
                                    <>
                                        <FaCheck />
                                        {t("save")}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Availability Modal */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>{t("edit_availability")}</h3>
                            <button className="close-btn" onClick={() => setShowEditModal(false)}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="date">
                                    <FaCalendarAlt className="form-icon" /> {t("date")}
                                </label>
                                <input type="date" id="date" name="date" value={formData.date} readOnly />
                                <small className="form-note">
                                    <FaInfoCircle /> {t("date_cannot_be_changed")}
                                </small>
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">
                                    <FaCalendarCheck className="form-icon" /> {t("availability_status")}
                                </label>
                                <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
                                    <option value="available">{t("available")}</option>
                                    <option value="unavailable">{t("unavailable")}</option>
                                </select>
                            </div>

                            {formData.status === "available" && (
                                <>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="startTime">
                                                <FaClock className="form-icon" /> {t("start_time")}
                                            </label>
                                            <input
                                                type="time"
                                                id="startTime"
                                                name="startTime"
                                                value={formData.startTime}
                                                onChange={handleInputChange}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="endTime">
                                                <FaClock className="form-icon" /> {t("end_time")}
                                            </label>
                                            <input
                                                type="time"
                                                id="endTime"
                                                name="endTime"
                                                value={formData.endTime}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="branchId">
                                            <FaRegHospital className="form-icon" /> {t("branch")}
                                        </label>
                                        <select id="branchId" name="branchId" value={formData.branchId} onChange={handleInputChange}>
                                            <option value="">{t("select_branch")}</option>
                                            {branches.map((branch) => (
                                                <option key={branch.id} value={branch.id}>
                                                    {branch.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </>
                            )}

                            <div className="form-group">
                                <label htmlFor="notes">
                                    <FaRegClipboard className="form-icon" /> {t("notes")}
                                </label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    rows="3"
                                    placeholder={t("enter_notes")}
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" onClick={handleDeleteSchedule} disabled={isSubmitting}>
                                {isSubmitting ? <FaSpinner className="spinner-icon" /> : <FaTrash />}
                                {currentSlot.type === "special" ? t("remove") : t("mark_unavailable")}
                            </button>
                            <div className="right-buttons">
                                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)} disabled={isSubmitting}>
                                    {t("cancel")}
                                </button>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleEditSchedule}
                                    disabled={
                                        (formData.status === "available" &&
                                            (!formData.startTime || !formData.endTime || !formData.branchId)) ||
                                        isSubmitting
                                    }
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FaSpinner className="spinner-icon" />
                                            {t("saving")}...
                                        </>
                                    ) : (
                                        <>
                                            <FaCheck />
                                            {t("save")}
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

