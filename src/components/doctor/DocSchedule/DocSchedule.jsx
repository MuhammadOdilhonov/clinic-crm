
import { useState, useEffect } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Modal, Button, Badge } from "react-bootstrap"
import { FaCalendarAlt, FaList, FaCheckCircle, FaTimesCircle } from "react-icons/fa"

// Local ma'lumotlar (API o'rniga)
const mockAppointments = [
    {
        id: 1,
        patientId: 101,
        patientName: "Aziz Karimov",
        doctorId: 201,
        doctorName: "Dr. Alisher Zokirov",
        date: new Date(2023, 5, 15, 10, 0),
        endTime: new Date(2023, 5, 15, 11, 0),
        status: "confirmed",
        notes: "Regular check-up",
        roomId: 3,
        roomName: "Room 303",
        branchId: 1,
        diagnosis: "Healthy, regular check-up",
        symptoms: "None",
        treatment: "No treatment required",
        phone: "+998901234567",
    },
    {
        id: 2,
        patientId: 102,
        patientName: "Malika Umarova",
        doctorId: 201,
        doctorName: "Dr. Alisher Zokirov",
        date: new Date(2023, 5, 15, 14, 0),
        endTime: new Date(2023, 5, 15, 15, 0),
        status: "pending",
        notes: "First consultation",
        roomId: 3,
        roomName: "Room 303",
        branchId: 1,
        diagnosis: "",
        symptoms: "Headache, fever",
        treatment: "",
        phone: "+998901234568",
    },
    {
        id: 3,
        patientId: 103,
        patientName: "Jasur Toshmatov",
        doctorId: 201,
        doctorName: "Dr. Alisher Zokirov",
        date: new Date(2023, 5, 16, 9, 0),
        endTime: new Date(2023, 5, 16, 10, 0),
        status: "completed",
        notes: "Follow-up after treatment",
        roomId: 4,
        roomName: "Room 304",
        branchId: 1,
        diagnosis: "Recovering from flu",
        symptoms: "Mild cough",
        treatment: "Continue medication for 3 more days",
        phone: "+998901234569",
    },
    {
        id: 4,
        patientId: 104,
        patientName: "Nilufar Rahimova",
        doctorId: 201,
        doctorName: "Dr. Alisher Zokirov",
        date: new Date(2023, 5, 17, 11, 0),
        endTime: new Date(2023, 5, 17, 12, 0),
        status: "cancelled",
        notes: "Annual check-up",
        roomId: 3,
        roomName: "Room 303",
        branchId: 1,
        diagnosis: "",
        symptoms: "",
        treatment: "",
        phone: "+998901234570",
    },
    {
        id: 5,
        patientId: 105,
        patientName: "Bobur Aliyev",
        doctorId: 201,
        doctorName: "Dr. Alisher Zokirov",
        date: new Date(2023, 5, 18, 15, 0),
        endTime: new Date(2023, 5, 18, 16, 0),
        status: "confirmed",
        notes: "Consultation for chronic condition",
        roomId: 5,
        roomName: "Room 305",
        branchId: 1,
        diagnosis: "Hypertension",
        symptoms: "Occasional dizziness",
        treatment: "Prescribed medication and lifestyle changes",
        phone: "+998901234571",
    },
]

// Joriy sana uchun qabullarni qo'shish
const today = new Date()
const todayStr = today.toISOString().split("T")[0]
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)
const tomorrowStr = tomorrow.toISOString().split("T")[0]

// Bugungi va ertangi qabullar
for (let i = 9; i < 18; i += 2) {
    if (i !== 13) {
        // Tushlik vaqti
        mockAppointments.push({
            id: 100 + mockAppointments.length,
            patientId: 120 + i,
            patientName: `Patient ${i}`,
            doctorId: 201,
            doctorName: "Dr. Alisher Zokirov",
            date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), i, 0),
            endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), i + 1, 0),
            status: i < 12 ? "completed" : i < 15 ? "confirmed" : "pending",
            notes: `Appointment at ${i}:00`,
            roomId: 3,
            roomName: "Room 303",
            branchId: 1,
            diagnosis: i < 12 ? "Diagnosis for patient" : "",
            symptoms: "Various symptoms",
            treatment: i < 12 ? "Prescribed treatment" : "",
            phone: `+99890${1000000 + i}`,
        })

        mockAppointments.push({
            id: 200 + mockAppointments.length,
            patientId: 150 + i,
            patientName: `Patient T${i}`,
            doctorId: 201,
            doctorName: "Dr. Alisher Zokirov",
            date: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), i, 0),
            endTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), i + 1, 0),
            status: "pending",
            notes: `Tomorrow's appointment at ${i}:00`,
            roomId: 4,
            roomName: "Room 304",
            branchId: 1,
            diagnosis: "",
            symptoms: "Various symptoms",
            treatment: "",
            phone: `+99890${2000000 + i}`,
        })
    }
}

// Local funksiyalar (API o'rniga)
const getDoctorSchedule = async (doctorId, startDate, endDate) => {
    // Filter appointments by doctor and date range
    return mockAppointments.filter((appointment) => {
        const appointmentDate = new Date(appointment.date)
        return (
            appointment.doctorId === doctorId &&
            appointmentDate >= new Date(startDate) &&
            appointmentDate <= new Date(endDate)
        )
    })
}

const getAppointmentById = async (appointmentId) => {
    return mockAppointments.find((appointment) => appointment.id === appointmentId)
}

const changeAppointmentStatus = async (appointmentId, newStatus) => {
    const appointmentIndex = mockAppointments.findIndex((appointment) => appointment.id === appointmentId)
    if (appointmentIndex !== -1) {
        mockAppointments[appointmentIndex].status = newStatus
        return { success: true, appointment: mockAppointments[appointmentIndex] }
    }
    return { success: false, error: "Appointment not found" }
}

const localizer = momentLocalizer(moment)

const DocSchedule = () => {
    const { user } = useAuth()
    const { t } = useLanguage()
    const [appointments, setAppointments] = useState([])
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [view, setView] = useState("month")
    const [date, setDate] = useState(new Date())
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeTab, setActiveTab] = useState("calendar")
    const [statusFilter, setStatusFilter] = useState("all")
    const [dateFilter, setDateFilter] = useState("all")

    useEffect(() => {
        fetchAppointments()
    }, [date, view])

    const fetchAppointments = async () => {
        try {
            setLoading(true)

            // Calculate date range based on current view
            let startDate, endDate

            if (view === "day") {
                startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
                endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)
            } else if (view === "week") {
                const start = new Date(date)
                start.setDate(date.getDate() - date.getDay())
                startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate())

                const end = new Date(start)
                end.setDate(start.getDate() + 6)
                endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59)
            } else {
                startDate = new Date(date.getFullYear(), date.getMonth(), 1)
                endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59)
            }

            // Fetch appointments using the mock function
            const doctorId = user?.id || 201 // Default to 201 if user ID is not available
            const result = await getDoctorSchedule(doctorId, startDate, endDate)

            // Transform appointments for the calendar
            const formattedAppointments = result.map((appointment) => ({
                ...appointment,
                title: `${appointment.patientName} - ${getStatusText(appointment.status)}`,
                start: new Date(appointment.date),
                end: new Date(appointment.endTime),
                resource: appointment,
            }))

            setAppointments(formattedAppointments)
            setError(null)
        } catch (err) {
            console.error("Error fetching appointments:", err)
            setError("Failed to load appointments. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleSelectEvent = (event) => {
        setSelectedAppointment(event.resource)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
        setSelectedAppointment(null)
    }

    const handleViewChange = (newView) => {
        setView(newView)
    }

    const handleNavigate = (newDate) => {
        setDate(newDate)
    }

    const handleStatusChange = async (newStatus) => {
        if (!selectedAppointment) return

        try {
            const result = await changeAppointmentStatus(selectedAppointment.id, newStatus)

            if (result.success) {
                // Update the appointment in the local state
                setAppointments((prevAppointments) =>
                    prevAppointments.map((appointment) =>
                        appointment.id === selectedAppointment.id
                            ? {
                                ...appointment,
                                status: newStatus,
                                title: `${appointment.resource.patientName} - ${getStatusText(newStatus)}`,
                                resource: {
                                    ...appointment.resource,
                                    status: newStatus,
                                },
                            }
                            : appointment,
                    ),
                )

                // Update the selected appointment
                setSelectedAppointment({
                    ...selectedAppointment,
                    status: newStatus,
                })

                // Show success message (you can implement a toast notification here)
                console.log(`Appointment status changed to ${newStatus}`)
            } else {
                console.error("Failed to change appointment status:", result.error)
            }
        } catch (err) {
            console.error("Error changing appointment status:", err)
        }
    }

    const getStatusText = (status) => {
        switch (status) {
            case "confirmed":
                return t("confirmed")
            case "pending":
                return t("pending")
            case "completed":
                return t("completed")
            case "cancelled":
                return t("cancelled")
            default:
                return status
        }
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case "confirmed":
                return <Badge bg="primary">{t("confirmed")}</Badge>
            case "pending":
                return <Badge bg="warning">{t("pending")}</Badge>
            case "completed":
                return <Badge bg="success">{t("completed")}</Badge>
            case "cancelled":
                return <Badge bg="danger">{t("cancelled")}</Badge>
            default:
                return <Badge bg="secondary">{status}</Badge>
        }
    }

    const getEventStyle = (event) => {
        const status = event.resource.status
        switch (status) {
            case "confirmed":
                return { backgroundColor: "#0d6efd" }
            case "pending":
                return { backgroundColor: "#ffc107", color: "#212529" }
            case "completed":
                return { backgroundColor: "#198754" }
            case "cancelled":
                return { backgroundColor: "#dc3545" }
            default:
                return { backgroundColor: "#6c757d" }
        }
    }

    const filteredAppointments = appointments.filter((appointment) => {
        // Filter by status
        if (statusFilter !== "all" && appointment.resource.status !== statusFilter) {
            return false
        }

        // Filter by date
        if (dateFilter === "today") {
            const today = new Date()
            const appointmentDate = new Date(appointment.start)
            return (
                appointmentDate.getDate() === today.getDate() &&
                appointmentDate.getMonth() === today.getMonth() &&
                appointmentDate.getFullYear() === today.getFullYear()
            )
        } else if (dateFilter === "tomorrow") {
            const tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() + 1)
            const appointmentDate = new Date(appointment.start)
            return (
                appointmentDate.getDate() === tomorrow.getDate() &&
                appointmentDate.getMonth() === tomorrow.getMonth() &&
                appointmentDate.getFullYear() === tomorrow.getFullYear()
            )
        } else if (dateFilter === "week") {
            const today = new Date()
            const nextWeek = new Date()
            nextWeek.setDate(today.getDate() + 7)
            const appointmentDate = new Date(appointment.start)
            return appointmentDate >= today && appointmentDate <= nextWeek
        }

        return true
    })

    const sortedAppointments = [...filteredAppointments].sort((a, b) => {
        return new Date(a.start) - new Date(b.start)
    })

    const renderAppointmentsList = () => {
        if (sortedAppointments.length === 0) {
            return (
                <div className="no-appointments">
                    <FaCalendarAlt className="icon" />
                    <p>{t("no_appointments_found")}</p>
                </div>
            )
        }

        return (
            <div className="appointments-list">
                {sortedAppointments.map((appointment) => (
                    <div
                        key={appointment.resource.id}
                        className={`appointment-item ${appointment.resource.status}`}
                        onClick={() => handleSelectEvent(appointment)}
                    >
                        <div className="appointment-time">
                            {moment(appointment.start).format("HH:mm")} - {moment(appointment.end).format("HH:mm")}
                        </div>
                        <div className="appointment-date">{moment(appointment.start).format("DD.MM.YYYY")}</div>
                        <div className="appointment-details">
                            <div className="patient-name">{appointment.resource.patientName}</div>
                            <div className="appointment-room">{appointment.resource.roomName}</div>
                            <div className="appointment-status">{getStatusBadge(appointment.resource.status)}</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className="doctor-schedule">
            <div className="schedule-header">
                <h2>{t("appointments")}</h2>
                <div className="view-toggle">
                    <Button
                        variant={activeTab === "calendar" ? "primary" : "outline-primary"}
                        onClick={() => setActiveTab("calendar")}
                    >
                        <FaCalendarAlt /> {t("calendar_view")}
                    </Button>
                    <Button variant={activeTab === "list" ? "primary" : "outline-primary"} onClick={() => setActiveTab("list")}>
                        <FaList /> {t("list_view")}
                    </Button>
                </div>
            </div>

            {error && (
                <div className="alert alert-danger">
                    <FaTimesCircle /> {error}
                </div>
            )}

            {activeTab === "list" && (
                <div className="filters-container">
                    <div className="filter-group">
                        <label>{t("status")}:</label>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="form-select">
                            <option value="all">{t("all")}</option>
                            <option value="pending">{t("pending")}</option>
                            <option value="confirmed">{t("confirmed")}</option>
                            <option value="completed">{t("completed")}</option>
                            <option value="cancelled">{t("cancelled")}</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>{t("date")}:</label>
                        <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="form-select">
                            <option value="all">{t("all")}</option>
                            <option value="today">{t("today")}</option>
                            <option value="tomorrow">{t("tomorrow")}</option>
                            <option value="week">{t("next_7_days")}</option>
                        </select>
                    </div>
                </div>
            )}

            <div className="schedule-content">
                {loading ? (
                    <div className="loading-spinner">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">{t("loading")}</span>
                        </div>
                        <p>{t("loading")}</p>
                    </div>
                ) : (
                    <>
                        {activeTab === "calendar" ? (
                            <div className="calendar-container">
                                <div className="calendar-toolbar">
                                    <div className="view-buttons">
                                        <Button
                                            variant={view === "month" ? "primary" : "outline-primary"}
                                            onClick={() => handleViewChange("month")}
                                        >
                                            {t("month")}
                                        </Button>
                                        <Button
                                            variant={view === "week" ? "primary" : "outline-primary"}
                                            onClick={() => handleViewChange("week")}
                                        >
                                            {t("week")}
                                        </Button>
                                        <Button
                                            variant={view === "day" ? "primary" : "outline-primary"}
                                            onClick={() => handleViewChange("day")}
                                        >
                                            {t("day")}
                                        </Button>
                                    </div>
                                </div>
                                <Calendar
                                    localizer={localizer}
                                    events={appointments}
                                    startAccessor="start"
                                    endAccessor="end"
                                    style={{ height: 600 }}
                                    onSelectEvent={handleSelectEvent}
                                    onNavigate={handleNavigate}
                                    view={view}
                                    onView={handleViewChange}
                                    date={date}
                                    eventPropGetter={getEventStyle}
                                    formats={{
                                        timeGutterFormat: (date, culture, localizer) => localizer.format(date, "HH:mm", culture),
                                        dayFormat: (date, culture, localizer) => localizer.format(date, "ddd DD", culture),
                                    }}
                                    messages={{
                                        month: t("month"),
                                        week: t("week"),
                                        day: t("day"),
                                        today: t("today"),
                                        previous: t("previous"),
                                        next: t("next"),
                                        agenda: t("agenda"),
                                        noEventsInRange: t("no_appointments_in_range"),
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="list-container">{renderAppointmentsList()}</div>
                        )}
                    </>
                )}
            </div>

            {/* Appointment Details Modal */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{t("appointment_details")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedAppointment && (
                        <div className="appointment-details-modal">
                            <div className="row">
                                <div className="col-md-6">
                                    <h4>{t("patient_information")}</h4>
                                    <div className="detail-item">
                                        <strong>{t("name")}:</strong> {selectedAppointment.patientName}
                                    </div>
                                    <div className="detail-item">
                                        <strong>{t("phone")}:</strong> {selectedAppointment.phone}
                                    </div>
                                    <div className="detail-item">
                                        <strong>{t("status")}:</strong> {getStatusBadge(selectedAppointment.status)}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h4>{t("appointment_information")}</h4>
                                    <div className="detail-item">
                                        <strong>{t("date")}:</strong> {moment(selectedAppointment.date).format("DD.MM.YYYY")}
                                    </div>
                                    <div className="detail-item">
                                        <strong>{t("time")}:</strong> {moment(selectedAppointment.date).format("HH:mm")} -{" "}
                                        {moment(selectedAppointment.endTime).format("HH:mm")}
                                    </div>
                                    <div className="detail-item">
                                        <strong>{t("room")}:</strong> {selectedAppointment.roomName}
                                    </div>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col-12">
                                    <h4>{t("medical_information")}</h4>
                                    <div className="detail-item">
                                        <strong>{t("symptoms")}:</strong> {selectedAppointment.symptoms || t("not_specified")}
                                    </div>
                                    <div className="detail-item">
                                        <strong>{t("notes")}:</strong> {selectedAppointment.notes || t("not_specified")}
                                    </div>
                                    <div className="detail-item">
                                        <strong>{t("diagnosis")}:</strong> {selectedAppointment.diagnosis || t("not_specified")}
                                    </div>
                                    <div className="detail-item">
                                        <strong>{t("treatment")}:</strong> {selectedAppointment.treatment || t("not_specified")}
                                    </div>
                                </div>
                            </div>

                            {/* Status change buttons */}
                            <div className="status-actions mt-4">
                                <h4>{t("change_status")}</h4>
                                <div className="btn-group">
                                    {selectedAppointment.status !== "confirmed" && (
                                        <Button
                                            variant="primary"
                                            onClick={() => handleStatusChange("confirmed")}
                                            disabled={selectedAppointment.status === "completed"}
                                        >
                                            <FaCheckCircle /> {t("confirm")}
                                        </Button>
                                    )}

                                    {selectedAppointment.status !== "completed" && (
                                        <Button
                                            variant="success"
                                            onClick={() => handleStatusChange("completed")}
                                            disabled={selectedAppointment.status === "cancelled"}
                                        >
                                            <FaCheckCircle /> {t("complete")}
                                        </Button>
                                    )}

                                    {selectedAppointment.status !== "cancelled" && (
                                        <Button
                                            variant="danger"
                                            onClick={() => handleStatusChange("cancelled")}
                                            disabled={selectedAppointment.status === "completed"}
                                        >
                                            <FaTimesCircle /> {t("cancel")}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        {t("close")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DocSchedule;