import { useState, useEffect } from "react"
import { FaUsers, FaCalendarAlt, FaClipboardList, FaUserClock, FaBed, FaChartLine } from "react-icons/fa"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"

export default function ADashboard() {
    const { selectedBranch } = useAuth()
    const { t } = useLanguage()
    const [stats, setStats] = useState({
        totalPatients: 156,
        appointmentsToday: 42,
        pendingAppointments: 12,
        completedAppointments: 30,
        occupiedRooms: 8,
        availableRooms: 4,
    })
    const [loading, setLoading] = useState(true)

    // Update stats based on selected branch
    useEffect(() => {
        setLoading(true)

        // Simulate API call
        setTimeout(() => {
            if (selectedBranch === "branch1") {
                setStats({
                    totalPatients: 68,
                    appointmentsToday: 18,
                    pendingAppointments: 5,
                    completedAppointments: 13,
                    occupiedRooms: 4,
                    availableRooms: 2,
                })
            } else if (selectedBranch === "branch2") {
                setStats({
                    totalPatients: 52,
                    appointmentsToday: 14,
                    pendingAppointments: 4,
                    completedAppointments: 10,
                    occupiedRooms: 3,
                    availableRooms: 1,
                })
            } else if (selectedBranch === "branch3") {
                setStats({
                    totalPatients: 36,
                    appointmentsToday: 10,
                    pendingAppointments: 3,
                    completedAppointments: 7,
                    occupiedRooms: 1,
                    availableRooms: 1,
                })
            } else {
                // All branches
                setStats({
                    totalPatients: 156,
                    appointmentsToday: 42,
                    pendingAppointments: 12,
                    completedAppointments: 30,
                    occupiedRooms: 8,
                    availableRooms: 4,
                })
            }
            setLoading(false)
        }, 500)
    }, [selectedBranch])

    // Today's appointments
    const todayAppointments = [
        {
            id: 1,
            patientName: "Alisher Karimov",
            time: "09:00",
            doctor: "Dr. Aziz Karimov",
            department: "Kardiologiya",
            status: "completed",
        },
        {
            id: 2,
            patientName: "Nilufar Rahimova",
            time: "10:30",
            doctor: "Dr. Jasur Toshmatov",
            department: "Nevrologiya",
            status: "completed",
        },
        {
            id: 3,
            patientName: "Sardor Aliyev",
            time: "11:45",
            doctor: "Dr. Aziz Karimov",
            department: "Kardiologiya",
            status: "in-progress",
        },
        {
            id: 4,
            patientName: "Malika Umarova",
            time: "13:15",
            doctor: "Dr. Nilufar Rahimova",
            department: "Pediatriya",
            status: "pending",
        },
        {
            id: 5,
            patientName: "Jasur Toshmatov",
            time: "14:30",
            doctor: "Dr. Jasur Toshmatov",
            department: "Nevrologiya",
            status: "pending",
        },
    ]

    // Recent patients
    const recentPatients = [
        {
            id: 1,
            name: "Alisher Karimov",
            age: 45,
            phone: "+998 90 123 45 67",
            lastVisit: "2023-05-15",
            diagnosis: "Yurak kasalligi",
        },
        {
            id: 2,
            name: "Nilufar Rahimova",
            age: 32,
            phone: "+998 90 234 56 78",
            lastVisit: "2023-05-14",
            diagnosis: "Bosh og'rig'i",
        },
        {
            id: 3,
            name: "Sardor Aliyev",
            age: 28,
            phone: "+998 90 345 67 89",
            lastVisit: "2023-05-13",
            diagnosis: "Yurak ritmi buzilishi",
        },
    ]

    // Inpatient rooms status with prices
    const roomsStatus = [
        {
            id: 1,
            roomNumber: "101",
            type: "standard",
            status: "occupied",
            patient: "Alisher Karimov",
            admissionDate: "2023-05-15",
            pricePerDay: 500000,
        },
        {
            id: 2,
            roomNumber: "102",
            type: "premium",
            status: "occupied",
            patient: "Nilufar Rahimova",
            admissionDate: "2023-05-14",
            pricePerDay: 800000,
        },
        {
            id: 3,
            roomNumber: "103",
            type: "standard",
            status: "available",
            patient: null,
            admissionDate: null,
            pricePerDay: 500000,
        },
        {
            id: 4,
            roomNumber: "201",
            type: "intensive",
            status: "occupied",
            patient: "Sardor Aliyev",
            admissionDate: "2023-05-13",
            pricePerDay: 1200000,
        },
    ]

    // Appointment prices
    const appointmentPrices = [
        {
            id: 1,
            department: "Kardiologiya",
            initialPrice: 200000,
            followUpPrice: 150000,
        },
        {
            id: 2,
            department: "Nevrologiya",
            initialPrice: 250000,
            followUpPrice: 180000,
        },
        {
            id: 3,
            department: "Pediatriya",
            initialPrice: 180000,
            followUpPrice: 120000,
        },
        {
            id: 4,
            department: "Ortopediya",
            initialPrice: 220000,
            followUpPrice: 160000,
        },
    ]

    // Format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("uz-UZ", { style: "currency", currency: "UZS" }).format(amount)
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>{t("loading")}...</p>
            </div>
        )
    }

    return (
        <div className="admin-dashboard">
            <h1 className="page-title">{t("admin_dashboard")}</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <FaUsers className="stat-icon admin" />
                    <div className="stat-value">{stats.totalPatients}</div>
                    <div className="stat-label">{t("total_patients")}</div>
                </div>

                <div className="stat-card">
                    <FaCalendarAlt className="stat-icon admin" />
                    <div className="stat-value">{stats.appointmentsToday}</div>
                    <div className="stat-label">{t("appointments_today")}</div>
                </div>

                <div className="stat-card">
                    <FaUserClock className="stat-icon admin" />
                    <div className="stat-value">{stats.pendingAppointments}</div>
                    <div className="stat-label">{t("pending_appointments")}</div>
                </div>

                <div className="stat-card">
                    <FaClipboardList className="stat-icon admin" />
                    <div className="stat-value">{stats.completedAppointments}</div>
                    <div className="stat-label">{t("completed_appointments")}</div>
                </div>

                <div className="stat-card">
                    <FaBed className="stat-icon admin" />
                    <div className="stat-value">
                        {stats.occupiedRooms}/{stats.occupiedRooms + stats.availableRooms}
                    </div>
                    <div className="stat-label">{t("occupied_rooms")}</div>
                </div>
            </div>

            <div className="dashboard-row">
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2>{t("todays_appointments")}</h2>
                        <button className="btn btn-sm btn-outline">{t("view_all")}</button>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>{t("patient")}</th>
                                <th>{t("time")}</th>
                                <th>{t("doctor")}</th>
                                <th>{t("department")}</th>
                                <th>{t("status")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todayAppointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.patientName}</td>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.doctor}</td>
                                    <td>{appointment.department}</td>
                                    <td>
                                        <div className={`status-badge ${appointment.status}`}>
                                            {appointment.status === "completed" && t("completed")}
                                            {appointment.status === "in-progress" && t("in_progress")}
                                            {appointment.status === "pending" && t("pending")}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="dashboard-card">
                    <div className="card-header">
                        <h2>{t("inpatient_rooms_status")}</h2>
                        <button className="btn btn-sm btn-outline">{t("view_all")}</button>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>{t("room")}</th>
                                <th>{t("type")}</th>
                                <th>{t("status")}</th>
                                <th>{t("patient")}</th>
                                <th>{t("price_per_day")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roomsStatus.map((room) => (
                                <tr key={room.id}>
                                    <td>{room.roomNumber}</td>
                                    <td>{t(room.type + "_room")}</td>
                                    <td>
                                        <div className={`status-badge ${room.status}`}>{t(room.status)}</div>
                                    </td>
                                    <td>{room.patient || "-"}</td>
                                    <td>{formatCurrency(room.pricePerDay).replace("UZS", "so'm")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="dashboard-row">
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2>{t("quick_actions")}</h2>
                    </div>
                    <div className="quick-actions">
                        <button className="btn btn-primary btn-icon">
                            <FaUsers /> {t("add_new_patient")}
                        </button>
                        <button className="btn btn-primary btn-icon">
                            <FaCalendarAlt /> {t("schedule_appointment")}
                        </button>
                        <button className="btn btn-primary btn-icon">
                            <FaBed /> {t("assign_room")}
                        </button>
                        <button className="btn btn-primary btn-icon">
                            <FaChartLine /> {t("generate_report")}
                        </button>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header">
                        <h2>{t("appointment_prices")}</h2>
                        <button className="btn btn-sm btn-outline">{t("view_all")}</button>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>{t("department")}</th>
                                <th>{t("initial_consultation")}</th>
                                <th>{t("follow_up_visit")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointmentPrices.map((price) => (
                                <tr key={price.id}>
                                    <td>{price.department}</td>
                                    <td>{formatCurrency(price.initialPrice).replace("UZS", "so'm")}</td>
                                    <td>{formatCurrency(price.followUpPrice).replace("UZS", "so'm")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

