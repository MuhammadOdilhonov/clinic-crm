"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import {
    FaCalendarAlt,
    FaDoorOpen,
    FaClock,
    FaClipboardList,
    FaSearch,
    FaFilter,
    FaCalendarDay,
    FaCalendarWeek,
    FaTable,
    FaChevronLeft,
    FaChevronRight,
    FaRegCalendarAlt,
    FaStethoscope,
    FaCheckCircle,
    FaTimesCircle,
    FaSpinner,
    FaExclamationTriangle,
    FaRegClock,
    FaRegHospital,
    FaRegUser,
    FaRegClipboard,
    FaRegCalendarCheck,
    FaInfoCircle,
    FaQuestionCircle,
    FaExternalLinkAlt,
} from "react-icons/fa"

export default function DocSchedule() {
    const { user } = useAuth()
    const { t } = useLanguage()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [showStatusLegend, setShowStatusLegend] = useState(false)
    const [showActionLegend, setShowActionLegend] = useState(false)
    const [redirecting, setRedirecting] = useState(false)
    const [resultWindowOpened, setResultWindowOpened] = useState(false)
    const [appointmentCompleted, setAppointmentCompleted] = useState(false)

    // Data states
    const [branches, setBranches] = useState([])
    const [patients, setPatients] = useState([])
    const [doctors, setDoctors] = useState([])
    const [rooms, setRooms] = useState([])
    const [appointments, setAppointments] = useState([])
    const [bookedTimeSlots, setBookedTimeSlots] = useState({})

    // Selection states
    const [selectedBranchId, setSelectedBranchId] = useState("")
    const [selectedPatientId, setSelectedPatientId] = useState("")
    const [selectedRoomId, setSelectedRoomId] = useState("")
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("")
    const [diagnosis, setDiagnosis] = useState("")

    // UI states
    const [showEditModal, setShowEditModal] = useState(false)
    const [currentAppointment, setCurrentAppointment] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [viewMode, setViewMode] = useState("table") // table, day, week
    const [currentWeekStart, setCurrentWeekStart] = useState(getWeekStartDate(new Date()))
    const [isUpdating, setIsUpdating] = useState(false)

    // Reference to track if window was opened
    const resultWindowRef = useRef(null)
    const checkWindowIntervalRef = useRef(null)

    // Status definitions for legend
    const statusDefinitions = [
        { status: "waiting", icon: <FaRegClock />, label: t("waiting"), description: t("patient_not_arrived_yet") },
        {
            status: "confirmed",
            icon: <FaCheckCircle />,
            label: t("confirmed"),
            description: t("appointment_confirmed_ready"),
        },
        {
            status: "in_progress",
            icon: <FaStethoscope />,
            label: t("in_progress"),
            description: t("appointment_currently_active"),
        },
        {
            status: "completed",
            icon: <FaRegCalendarCheck />,
            label: t("completed"),
            description: t("appointment_finished"),
        },
        { status: "cancelled", icon: <FaTimesCircle />, label: t("cancelled"), description: t("appointment_cancelled") },
    ]

    // Action definitions for legend
    const actionDefinitions = [
        {
            action: "start",
            icon: <FaStethoscope />,
            label: t("start_appointment"),
            description: t("begin_patient_examination"),
        },
        {
            action: "complete",
            icon: <FaCheckCircle />,
            label: t("complete_appointment"),
            description: t("mark_appointment_as_completed"),
        },
        {
            action: "view_details",
            icon: <FaInfoCircle />,
            label: t("view_details"),
            description: t("see_appointment_details"),
        },
        {
            action: "redirect",
            icon: <FaExternalLinkAlt />,
            label: t("patient_record"),
            description: t("go_to_patient_record"),
        },
        {
            action: "waiting",
            icon: <FaRegClock />,
            label: t("waiting"),
            description: t("appointment_waiting"),
        },
    ]

    // Check if the result window is closed
    useEffect(() => {
        if (resultWindowOpened && resultWindowRef.current) {
            checkWindowIntervalRef.current = setInterval(() => {
                if (resultWindowRef.current && resultWindowRef.current.closed) {
                    clearInterval(checkWindowIntervalRef.current)
                    setResultWindowOpened(false)
                    setAppointmentCompleted(true)

                    // Update appointment status and close modal
                    if (currentAppointment) {
                        completeAppointment()
                    }
                }
            }, 1000)
        }

        return () => {
            if (checkWindowIntervalRef.current) {
                clearInterval(checkWindowIntervalRef.current)
            }
        }
    }, [resultWindowOpened])

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

                    // Mock patients data
                    const mockPatients = [
                        { id: 101, name: "Alisher Karimov", age: 45, gender: "male", phone: "+998901234567" },
                        { id: 102, name: "Dilnoza Saidova", age: 32, gender: "female", phone: "+998901234568" },
                        { id: 103, name: "Rustam Khasanov", age: 58, gender: "male", phone: "+998901234569" },
                        { id: 104, name: "Nodira Azimova", age: 27, gender: "female", phone: "+998901234570" },
                        { id: 105, name: "Jahongir Tursunov", age: 42, gender: "male", phone: "+998901234571" },
                    ]

                    // Mock doctors data
                    const mockDoctors = [
                        { id: 1, name: "Dr. Sardor Alimov", specialization: "General Practitioner", branchId: 1 },
                        { id: 2, name: "Dr. Kamil Rakhimov", specialization: "Cardiologist", branchId: 1 },
                        { id: 3, name: "Dr. Aziz Yusupov", specialization: "Pulmonologist", branchId: 2 },
                        { id: 4, name: "Dr. Malika Umarova", specialization: "Surgeon", branchId: 3 },
                    ]

                    // Mock rooms data
                    const mockRooms = [
                        { id: 1, roomNumber: "101", roomType: "examination", branchId: 1 },
                        { id: 2, roomNumber: "102", roomType: "procedure", branchId: 1 },
                        { id: 3, roomNumber: "201", roomType: "examination", branchId: 2 },
                        { id: 4, roomNumber: "202", roomType: "procedure", branchId: 2 },
                        { id: 5, roomNumber: "301", roomType: "examination", branchId: 3 },
                        { id: 6, roomNumber: "302", roomType: "procedure", branchId: 3 },
                    ]

                    // Mock appointments data - assuming current doctor ID is 1
                    const currentDoctorId = 1
                    const mockAppointments = [
                        {
                            id: 1001,
                            patientId: 101,
                            patientName: "Alisher Karimov",
                            doctorId: currentDoctorId,
                            doctorName: "Dr. Sardor Alimov",
                            roomId: 1,
                            roomNumber: "101",
                            branchId: 1,
                            branchName: "Main Branch",
                            date: "2023-05-20",
                            timeSlot: "09:00",
                            duration: 60, // minutes
                            status: "confirmed",
                            diagnosis: "Regular check-up",
                            createdAt: "2023-05-15T10:30:00Z",
                        },
                        {
                            id: 1002,
                            patientId: 102,
                            patientName: "Dilnoza Saidova",
                            doctorId: currentDoctorId,
                            doctorName: "Dr. Sardor Alimov",
                            roomId: 2,
                            roomNumber: "102",
                            branchId: 1,
                            branchName: "Main Branch",
                            date: "2023-05-20",
                            timeSlot: "10:00",
                            duration: 60,
                            status: "waiting",
                            diagnosis: "Heart examination",
                            createdAt: "2023-05-16T09:15:00Z",
                        },
                        {
                            id: 1003,
                            patientId: 103,
                            patientName: "Rustam Khasanov",
                            doctorId: currentDoctorId,
                            doctorName: "Dr. Sardor Alimov",
                            roomId: 3,
                            roomNumber: "201",
                            branchId: 2,
                            branchName: "Secondary Branch",
                            date: "2023-05-21",
                            timeSlot: "11:00",
                            duration: 60,
                            status: "in_progress",
                            diagnosis: "Respiratory issues",
                            createdAt: "2023-05-17T14:20:00Z",
                        },
                        {
                            id: 1004,
                            patientId: 104,
                            patientName: "Nodira Azimova",
                            doctorId: currentDoctorId,
                            doctorName: "Dr. Sardor Alimov",
                            roomId: 4,
                            roomNumber: "202",
                            branchId: 2,
                            branchName: "Secondary Branch",
                            date: "2023-05-22",
                            timeSlot: "14:00",
                            duration: 60,
                            status: "completed",
                            diagnosis: "Annual checkup",
                            createdAt: "2023-05-18T11:30:00Z",
                        },
                        {
                            id: 1005,
                            patientId: 105,
                            patientName: "Jahongir Tursunov",
                            doctorId: currentDoctorId,
                            doctorName: "Dr. Sardor Alimov",
                            roomId: 5,
                            roomNumber: "301",
                            branchId: 3,
                            branchName: "Tertiary Branch",
                            date: "2023-05-23",
                            timeSlot: "15:00",
                            duration: 60,
                            status: "cancelled",
                            diagnosis: "Follow-up consultation",
                            createdAt: "2023-05-19T09:45:00Z",
                        },
                    ]

                    // Add today's appointments
                    const today = new Date().toISOString().split("T")[0]
                    mockAppointments.push(
                        {
                            id: 1006,
                            patientId: 101,
                            patientName: "Alisher Karimov",
                            doctorId: currentDoctorId,
                            doctorName: "Dr. Sardor Alimov",
                            roomId: 1,
                            roomNumber: "101",
                            branchId: 1,
                            branchName: "Main Branch",
                            date: today,
                            timeSlot: "09:00",
                            duration: 60,
                            status: "confirmed",
                            diagnosis: "Follow-up check",
                            createdAt: "2023-05-19T09:45:00Z",
                        },
                        {
                            id: 1007,
                            patientId: 102,
                            patientName: "Dilnoza Saidova",
                            doctorId: currentDoctorId,
                            doctorName: "Dr. Sardor Alimov",
                            roomId: 2,
                            roomNumber: "102",
                            branchId: 1,
                            branchName: "Main Branch",
                            date: today,
                            timeSlot: "11:00",
                            duration: 60,
                            status: "in_progress",
                            diagnosis: "Blood pressure check",
                            createdAt: "2023-05-19T09:45:00Z",
                        },
                    )

                    // Calculate booked time slots
                    const bookedSlots = {}
                    mockAppointments.forEach((appointment) => {
                        const key = `${appointment.date}-${appointment.roomId}`
                        if (!bookedSlots[key]) {
                            bookedSlots[key] = []
                        }
                        bookedSlots[key].push(appointment.timeSlot)
                    })

                    setBranches(mockBranches)
                    setPatients(mockPatients)
                    setDoctors(mockDoctors)
                    setRooms(mockRooms)
                    setAppointments(mockAppointments)
                    setBookedTimeSlots(bookedSlots)
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
        for (let hour = 9; hour < 18; hour++) {
            slots.push(`${hour.toString().padStart(2, "0")}:00`)
        }
        return slots
    }

    const timeSlots = generateTimeSlots()

    // Check if a time slot is booked
    const isTimeSlotBooked = (date, roomId, timeSlot) => {
        const key = `${date}-${roomId}`
        return bookedTimeSlots[key] && bookedTimeSlots[key].includes(timeSlot)
    }

    // Filter appointments based on search and filter
    const filteredAppointments = appointments.filter((appointment) => {
        const matchesSearch =
            appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesFilter = filterStatus === "all" || appointment.status === filterStatus

        return matchesSearch && matchesFilter
    })

    // Handle branch selection
    const handleBranchChange = (e) => {
        const branchId = e.target.value
        setSelectedBranchId(branchId)
        setSelectedPatientId("")
        setSelectedRoomId("")
        setSelectedTimeSlot("")
    }

    // Handle patient selection
    const handlePatientChange = (e) => {
        setSelectedPatientId(e.target.value)
        setSelectedRoomId("")
        setSelectedTimeSlot("")
    }

    // Handle room selection
    const handleRoomChange = (e) => {
        setSelectedRoomId(e.target.value)
        setSelectedTimeSlot("")
    }

    // Handle date selection
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value)
        setSelectedTimeSlot("")
    }

    // Handle time slot selection
    const handleTimeSlotChange = (timeSlot) => {
        setSelectedTimeSlot(timeSlot)
    }

    // Handle diagnosis input
    const handleDiagnosisChange = (e) => {
        setDiagnosis(e.target.value)
    }

    // Open edit appointment modal
    const openEditModal = (appointment) => {
        setCurrentAppointment(appointment)
        setSelectedBranchId(appointment.branchId.toString())
        setSelectedPatientId(appointment.patientId.toString())
        setSelectedRoomId(appointment.roomId.toString())
        setSelectedDate(appointment.date)
        setSelectedTimeSlot(appointment.timeSlot)
        setDiagnosis(appointment.diagnosis)
        setShowEditModal(true)
        setAppointmentCompleted(false)
    }

    // Handle edit appointment
    const handleEditAppointment = () => {
        setIsUpdating(true)

        // Simulate API call with timeout
        setTimeout(() => {
            // Update appointment status based on current status
            let newStatus = currentAppointment.status

            if (currentAppointment.status === "confirmed") {
                newStatus = "in_progress"

                // Update the appointment status
                const updatedAppointment = {
                    ...currentAppointment,
                    status: newStatus,
                    diagnosis: diagnosis,
                }

                const updatedAppointments = appointments.map((appointment) =>
                    appointment.id === currentAppointment.id ? updatedAppointment : appointment,
                )

                setAppointments(updatedAppointments)
                setIsUpdating(false)
                setShowEditModal(false)

                // Reset form
                setCurrentAppointment(null)
                setSelectedBranchId("")
                setSelectedPatientId("")
                setSelectedRoomId("")
                setSelectedTimeSlot("")
                setDiagnosis("")
            } else if (currentAppointment.status === "in_progress") {
                // For in_progress appointments, open the details page in a new tab
                // and keep the modal open with loading state
                openAppointmentDetailsPage(currentAppointment.id)
            }
        }, 800)
    }

    // Complete appointment after returning from details page
    const completeAppointment = () => {
        // Update the appointment to completed status
        const updatedAppointment = {
            ...currentAppointment,
            status: "completed",
            diagnosis: diagnosis,
        }

        const updatedAppointments = appointments.map((appointment) =>
            appointment.id === currentAppointment.id ? updatedAppointment : appointment,
        )

        setAppointments(updatedAppointments)
        setIsUpdating(false)

        // Reset form and close modal
        setCurrentAppointment(null)
        setSelectedBranchId("")
        setSelectedPatientId("")
        setSelectedRoomId("")
        setSelectedTimeSlot("")
        setDiagnosis("")
        setShowEditModal(false)
    }

    // Open appointment details page in a new tab
    const openAppointmentDetailsPage = (appointmentId) => {
        resultWindowRef.current = window.open(`/appointment-details-result/${appointmentId}`, "_blank")
        setResultWindowOpened(true)
    }

    // Redirect to patient record
    const redirectToPatientRecord = (patientId) => {
        setRedirecting(true)
        // Simulate redirection to another page
        setTimeout(() => {
            // In a real app, you would use router.push or window.location
            alert(`Redirecting to patient record for patient ID: ${patientId}`)
            setRedirecting(false)
        }, 1500)
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

    // Navigate to previous week
    const goToPreviousWeek = () => {
        const prevWeek = new Date(currentWeekStart)
        prevWeek.setDate(prevWeek.getDate() - 7)
        setCurrentWeekStart(prevWeek)
    }

    // Navigate to next week
    const goToNextWeek = () => {
        const nextWeek = new Date(currentWeekStart)
        nextWeek.setDate(nextWeek.getDate() + 7)
        setCurrentWeekStart(nextWeek)
    }

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
            })
        }

        return days
    }

    const weekDays = generateWeekDays()

    // Get appointments for a specific day
    const getAppointmentsForDay = (date) => {
        return appointments.filter((appointment) => appointment.date === date)
    }

    // Format time
    const formatTime = (timeSlot) => {
        const [hours, minutes] = timeSlot.split(":")
        return `${hours}:${minutes}`
    }

    // Get status badge class
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "waiting":
                return "status-waiting"
            case "confirmed":
                return "status-confirmed"
            case "in_progress":
                return "status-in-progress"
            case "completed":
                return "status-completed"
            case "cancelled":
                return "status-cancelled"
            default:
                return ""
        }
    }

    // Check if status can be changed
    const canChangeStatus = (status) => {
        return status === "confirmed" || status === "in_progress"
    }

    // Get next status label
    const getNextStatusLabel = (status) => {
        if (status === "confirmed") {
            return t("start_appointment")
        } else if (status === "in_progress") {
            return t("complete_appointment")
        }
        return ""
    }

    // Get status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case "waiting":
                return <FaRegClock className={`status-icon ${getStatusBadgeClass(status)}`} />
            case "confirmed":
                return <FaCheckCircle className={`status-icon ${getStatusBadgeClass(status)}`} />
            case "in_progress":
                return <FaStethoscope className={`status-icon ${getStatusBadgeClass(status)}`} />
            case "completed":
                return <FaRegCalendarCheck className={`status-icon ${getStatusBadgeClass(status)}`} />
            case "cancelled":
                return <FaTimesCircle className={`status-icon ${getStatusBadgeClass(status)}`} />
            default:
                return null
        }
    }

    // Toggle status legend
    const toggleStatusLegend = () => {
        setShowStatusLegend(!showStatusLegend)
        if (showActionLegend) setShowActionLegend(false)
    }

    // Toggle action legend
    const toggleActionLegend = () => {
        setShowActionLegend(!showActionLegend)
        if (showStatusLegend) setShowStatusLegend(false)
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

    // Redirecting state
    if (redirecting) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>{t("redirecting_to_patient_record")}...</p>
            </div>
        )
    }

    return (
        <div className="doctor-schedule">
            <div className="page-header">
                <div className="header-title">
                    <FaCalendarAlt className="header-icon" />
                    <h1>{t("appointment_schedule")}</h1>
                </div>
                <div className="header-actions">
                    <div className="view-toggle">
                        <button
                            className={`btn ${viewMode === "table" ? "btn-primary" : "btn-outline"}`}
                            onClick={() => handleViewModeChange("table")}
                        >
                            <FaTable /> {t("table_view")}
                        </button>
                        <button
                            className={`btn ${viewMode === "day" ? "btn-primary" : "btn-outline"}`}
                            onClick={() => handleViewModeChange("day")}
                        >
                            <FaCalendarDay /> {t("day_view")}
                        </button>
                        <button
                            className={`btn ${viewMode === "week" ? "btn-primary" : "btn-outline"}`}
                            onClick={() => handleViewModeChange("week")}
                        >
                            <FaCalendarWeek /> {t("week_view")}
                        </button>
                    </div>

                    <button className="btn btn-today" onClick={goToToday}>
                        <FaRegCalendarAlt /> {t("today")}
                    </button>

                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder={t("search_appointments")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="filter-dropdown">
                        <FaFilter className="filter-icon" />
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="all">{t("all_statuses")}</option>
                            <option value="waiting">{t("waiting")}</option>
                            <option value="confirmed">{t("confirmed")}</option>
                            <option value="in_progress">{t("in_progress")}</option>
                            <option value="completed">{t("completed")}</option>
                            <option value="cancelled">{t("cancelled")}</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Legend Buttons */}
            <div className="legend-buttons">
                <button className="btn btn-legend" onClick={toggleStatusLegend}>
                    <FaQuestionCircle /> {t("status_legend")}
                </button>
                <button className="btn btn-legend" onClick={toggleActionLegend}>
                    <FaQuestionCircle /> {t("action_legend")}
                </button>
            </div>

            {/* Status Legend */}
            {showStatusLegend && (
                <div className="legend-container status-legend">
                    <div className="legend-header">
                        <h3>{t("status_legend")}</h3>
                        <button className="close-btn" onClick={toggleStatusLegend}>
                            ×
                        </button>
                    </div>
                    <div className="legend-content">
                        {statusDefinitions.map((item) => (
                            <div key={item.status} className="legend-item">
                                <div className={`legend-icon ${getStatusBadgeClass(item.status)}`}>{item.icon}</div>
                                <div className="legend-text">
                                    <span className="legend-label">{item.label}</span>
                                    <span className="legend-description">{item.description}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Action Legend */}
            {showActionLegend && (
                <div className="legend-container action-legend">
                    <div className="legend-header">
                        <h3>{t("action_legend")}</h3>
                        <button className="close-btn" onClick={toggleActionLegend}>
                            ×
                        </button>
                    </div>
                    <div className="legend-content">
                        {actionDefinitions.map((item) => (
                            <div key={item.action} className="legend-item">
                                <div
                                    className={`legend-icon action-icon ${item.action === "waiting" ? "action-waiting" : item.action === "start" ? "action-start" : item.action === "complete" ? "action-complete" : item.action === "redirect" ? "action-redirect" : ""}`}
                                >
                                    {item.icon}
                                </div>
                                <div className="legend-text">
                                    <span className="legend-label">{item.label}</span>
                                    <span className="legend-description">{item.description}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Table View */}
            {viewMode === "table" && (
                <div className="appointments-table-container">
                    <table className="appointments-table">
                        <thead>
                            <tr>
                                <th>{t("date")}</th>
                                <th>{t("time")}</th>
                                <th>{t("branch")}</th>
                                <th>{t("patient")}</th>
                                <th>{t("room")}</th>
                                <th>{t("diagnosis")}</th>
                                <th>{t("status")}</th>
                                <th>{t("actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAppointments.length > 0 ? (
                                filteredAppointments.map((appointment) => (
                                    <tr key={appointment.id} className={`appointment-row ${getStatusBadgeClass(appointment.status)}`}>
                                        <td>{appointment.date}</td>
                                        <td>{formatTime(appointment.timeSlot)}</td>
                                        <td>
                                            <div className="cell-with-icon">
                                                <FaRegHospital className="cell-icon" />
                                                {appointment.branchName}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="cell-with-icon">
                                                <FaRegUser className="cell-icon" />
                                                {appointment.patientName}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="cell-with-icon">
                                                <FaDoorOpen className="cell-icon" />
                                                {appointment.roomNumber}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="cell-with-icon">
                                                <FaRegClipboard className="cell-icon" />
                                                {appointment.diagnosis}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="status-badge-container">{getStatusIcon(appointment.status)}</div>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                {canChangeStatus(appointment.status) && (
                                                    <button
                                                        className="btn btn-action"
                                                        onClick={() => openEditModal(appointment)}
                                                        title={getNextStatusLabel(appointment.status)}
                                                    >
                                                        {appointment.status === "confirmed" ? (
                                                            <FaStethoscope className="action-icon action-start" />
                                                        ) : (
                                                            <FaCheckCircle className="action-icon action-complete" />
                                                        )}
                                                    </button>
                                                )}
                                                {appointment.status === "completed" && (
                                                    <button
                                                        className="btn btn-action btn-redirect"
                                                        onClick={() => window.open(`/appointment-details/${appointment.id}`, "_blank")}
                                                        title={t("go_to_patient_record")}
                                                    >
                                                        <FaExternalLinkAlt className="action-icon action-redirect" />
                                                    </button>
                                                )}
                                                {appointment.status !== "confirmed" &&
                                                    appointment.status !== "in_progress" &&
                                                    appointment.status !== "completed" && (
                                                        <button className="btn btn-action btn-waiting" disabled title={t("no_actions_available")}>
                                                            <FaRegClock className="action-icon action-waiting" />
                                                        </button>
                                                    )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="no-data">
                                        <div className="no-data-content">
                                            <FaCalendarAlt className="no-data-icon" />
                                            <p>{t("no_appointments_found")}</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Day View */}
            {viewMode === "day" && (
                <div className="day-view">
                    <div className="day-header">
                        <div className="date-navigation">
                            <button
                                className="btn btn-icon"
                                onClick={() => {
                                    const prevDay = new Date(selectedDate)
                                    prevDay.setDate(prevDay.getDate() - 1)
                                    setSelectedDate(prevDay.toISOString().split("T")[0])
                                }}
                            >
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
                            <button
                                className="btn btn-icon"
                                onClick={() => {
                                    const nextDay = new Date(selectedDate)
                                    nextDay.setDate(nextDay.getDate() + 1)
                                    setSelectedDate(nextDay.toISOString().split("T")[0])
                                }}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>

                    <div className="time-slots-container">
                        {timeSlots.map((timeSlot) => {
                            const appointmentsAtTime = appointments.filter(
                                (appointment) => appointment.date === selectedDate && appointment.timeSlot === timeSlot,
                            )

                            return (
                                <div key={timeSlot} className="time-slot-row">
                                    <div className="time-label">
                                        <FaClock className="time-icon" />
                                        <span>{formatTime(timeSlot)}</span>
                                    </div>
                                    <div className="appointments-at-time">
                                        {appointmentsAtTime.length > 0 ? (
                                            appointmentsAtTime.map((appointment) => (
                                                <div
                                                    key={appointment.id}
                                                    className={`appointment-card ${getStatusBadgeClass(appointment.status)}`}
                                                    onClick={() => canChangeStatus(appointment.status) && openEditModal(appointment)}
                                                >
                                                    <div className="appointment-header">
                                                        <div className="appointment-time">
                                                            <FaClock className="appointment-icon" />
                                                            {formatTime(appointment.timeSlot)}
                                                        </div>
                                                        <div className={`appointment-status ${getStatusBadgeClass(appointment.status)}`}>
                                                            {getStatusIcon(appointment.status)}
                                                            <span>{t(appointment.status)}</span>
                                                        </div>
                                                    </div>
                                                    <div className="appointment-details">
                                                        <div className="appointment-patient">
                                                            <FaRegUser className="appointment-icon" />
                                                            {appointment.patientName}
                                                        </div>
                                                        <div className="appointment-room">
                                                            <FaDoorOpen className="appointment-icon" />
                                                            {t("room")}: {appointment.roomNumber}
                                                        </div>
                                                        <div className="appointment-branch">
                                                            <FaRegHospital className="appointment-icon" />
                                                            {appointment.branchName}
                                                        </div>
                                                        <div className="appointment-diagnosis">
                                                            <FaRegClipboard className="appointment-icon" />
                                                            {appointment.diagnosis || t("no_diagnosis")}
                                                        </div>
                                                    </div>
                                                    {canChangeStatus(appointment.status) && (
                                                        <div className="appointment-actions">
                                                            <button className="btn btn-action-card">
                                                                {appointment.status === "confirmed" ? (
                                                                    <FaStethoscope className="action-icon action-start" />
                                                                ) : (
                                                                    <FaCheckCircle className="action-icon action-complete" />
                                                                )}
                                                                <span>{getNextStatusLabel(appointment.status)}</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                    {appointment.status === "completed" && (
                                                        <div className="appointment-actions">
                                                            <button
                                                                className="btn btn-action-card btn-redirect"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    window.open(`/appointment-details-result/${appointment.id}`, "_blank")
                                                                }}
                                                            >
                                                                <FaExternalLinkAlt className="action-icon action-redirect" />
                                                                <span>{t("patient_record")}</span>
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="empty-slot">
                                                <span className="no-appointment">{t("no_appointments")}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Week View */}
            {viewMode === "week" && (
                <div className="week-view">
                    <div className="week-header">
                        <div className="date-navigation">
                            <button className="btn btn-icon" onClick={goToPreviousWeek}>
                                <FaChevronLeft />
                            </button>
                            <h3>
                                {currentWeekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} -
                                {new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </h3>
                            <button className="btn btn-icon" onClick={goToNextWeek}>
                                <FaChevronRight />
                            </button>
                        </div>
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
                                <div className={`day-label ${day.date === new Date().toISOString().split("T")[0] ? "today" : ""}`}>
                                    <div className="day-name">{day.dayName}</div>
                                    <div className="day-number">{day.dayNumber}</div>
                                </div>

                                {timeSlots.map((timeSlot) => {
                                    const appointmentsAtTime = appointments.filter(
                                        (appointment) => appointment.date === day.date && appointment.timeSlot === timeSlot,
                                    )

                                    return (
                                        <div
                                            key={`${day.date}-${timeSlot}`}
                                            className={`time-cell ${appointmentsAtTime.length > 0 ? "has-appointments" : ""} ${day.date === new Date().toISOString().split("T")[0] ? "today-cell" : ""}`}
                                        >
                                            {appointmentsAtTime.length > 0 && (
                                                <div className="appointment-indicators">
                                                    {appointmentsAtTime.map((appointment) => (
                                                        <div
                                                            key={appointment.id}
                                                            className={`appointment-indicator ${getStatusBadgeClass(appointment.status)}`}
                                                            onClick={() => canChangeStatus(appointment.status) && openEditModal(appointment)}
                                                            title={`${appointment.patientName} - ${appointment.roomNumber}`}
                                                        >
                                                            <div className="indicator-content">
                                                                {getStatusIcon(appointment.status)}
                                                                <span className="patient-name">{appointment.patientName}</span>
                                                            </div>
                                                        </div>
                                                    ))}
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

            {/* Edit Appointment Modal */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>{t("update_appointment_status")}</h3>
                            <button className="close-btn" onClick={() => setShowEditModal(false)}>
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="appointment-form">
                                <div className="appointment-details">
                                    <div className="detail-section">
                                        <h4 className="section-title">
                                            <FaRegUser className="section-icon" />
                                            {t("patient_information")}
                                        </h4>
                                        <div className="detail-row">
                                            <span className="detail-label">{t("patient")}:</span>
                                            <span className="detail-value">{currentAppointment.patientName}</span>
                                        </div>
                                    </div>

                                    <div className="detail-section">
                                        <h4 className="section-title">
                                            <FaRegCalendarAlt className="section-icon" />
                                            {t("appointment_information")}
                                        </h4>
                                        <div className="detail-row">
                                            <span className="detail-label">{t("date")}:</span>
                                            <span className="detail-value">{currentAppointment.date}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">{t("time")}:</span>
                                            <span className="detail-value">{formatTime(currentAppointment.timeSlot)}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">{t("branch")}:</span>
                                            <span className="detail-value">{currentAppointment.branchName}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">{t("room")}:</span>
                                            <span className="detail-value">{currentAppointment.roomNumber}</span>
                                        </div>
                                    </div>

                                    <div className="detail-section">
                                        <h4 className="section-title">
                                            <FaStethoscope className="section-icon" />
                                            {t("status_information")}
                                        </h4>
                                        <div className="detail-row">
                                            <span className="detail-label">{t("current_status")}:</span>
                                            <span className={`detail-value status-badge ${getStatusBadgeClass(currentAppointment.status)}`}>
                                                {getStatusIcon(currentAppointment.status)}
                                                {t(currentAppointment.status)}
                                            </span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">{t("new_status")}:</span>
                                            <span
                                                className={`detail-value status-badge ${currentAppointment.status === "confirmed" ? "status-in-progress" : "status-completed"
                                                    }`}
                                            >
                                                {currentAppointment.status === "confirmed" ? (
                                                    <FaStethoscope className="status-icon" />
                                                ) : (
                                                    <FaCheckCircle className="status-icon" />
                                                )}
                                                {currentAppointment.status === "confirmed" ? t("in_progress") : t("completed")}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="diagnosis">
                                        <FaClipboardList className="form-icon" /> {t("diagnosis")}
                                    </label>
                                    <textarea
                                        id="diagnosis"
                                        value={diagnosis}
                                        onChange={handleDiagnosisChange}
                                        rows="3"
                                        placeholder={t("enter_diagnosis")}
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                                {t("cancel")}
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleEditAppointment}
                                disabled={isUpdating || resultWindowOpened}
                            >
                                {isUpdating || resultWindowOpened ? (
                                    <>
                                        <FaSpinner className="spinner-icon" />
                                        {t("updating")}...
                                    </>
                                ) : appointmentCompleted ? (
                                    <>
                                        <FaCheckCircle className="action-icon action-complete" />
                                        {t("appointment_completed")}
                                    </>
                                ) : (
                                    <>
                                        {currentAppointment.status === "confirmed" ? (
                                            <FaStethoscope className="action-icon action-start" />
                                        ) : (
                                            <FaCheckCircle className="action-icon action-complete" />
                                        )}
                                        {getNextStatusLabel(currentAppointment.status)}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
