import React , { useState, useEffect } from "react"
import {
    FaUsers,
    FaCalendarAlt,
    FaClipboardList,
    FaUserClock,
    FaBed,
    FaMoneyBillWave,
    FaChartLine,
} from "react-icons/fa"
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
        totalIncome: 15600000,
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
                    totalIncome: 7800000,
                })
            } else if (selectedBranch === "branch2") {
                setStats({
                    totalPatients: 52,
                    appointmentsToday: 14,
                    pendingAppointments: 4,
                    completedAppointments: 10,
                    occupiedRooms: 3,
                    availableRooms: 1,
                    totalIncome: 5200000,
                })
            } else if (selectedBranch === "branch3") {
                setStats({
                    totalPatients: 36,
                    appointmentsToday: 10,
                    pendingAppointments: 3,
                    completedAppointments: 7,
                    occupiedRooms: 1,
                    availableRooms: 1,
                    totalIncome: 2600000,
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
                    totalIncome: 15600000,
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

    // Inpatient rooms status
    const roomsStatus = [
        {
            id: 1,
            roomNumber: "101",
            type: "standard",
            status: "occupied",
            patient: "Alisher Karimov",
            admissionDate: "2023-05-15",
        },
        {
            id: 2,
            roomNumber: "102",
            type: "premium",
            status: "occupied",
            patient: "Nilufar Rahimova",
            admissionDate: "2023-05-14",
        },
        {
            id: 3,
            roomNumber: "103",
            type: "standard",
            status: "available",
            patient: null,
            admissionDate: null,
        },
        {
            id: 4,
            roomNumber: "201",
            type: "intensive",
            status: "occupied",
            patient: "Sardor Aliyev",
            admissionDate: "2023-05-13",
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

                <div className="stat-card">
                    <FaMoneyBillWave className="stat-icon admin" />
                    <div className="stat-value">{formatCurrency(stats.totalIncome).replace("UZS", "so'm")}</div>
                    <div className="stat-label">{t("total_income")}</div>
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
                                <th>{t("admission_date")}</th>
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
                                    <td>{room.admissionDate || "-"}</td>
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
                            <FaMoneyBillWave /> {t("record_payment")}
                        </button>
                        <button className="btn btn-primary btn-icon">
                            <FaChartLine /> {t("generate_report")}
                        </button>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header">
                        <h2>{t("recent_patients")}</h2>
                        <button className="btn btn-sm btn-outline">{t("view_all")}</button>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>{t("name")}</th>
                                <th>{t("age")}</th>
                                <th>{t("phone")}</th>
                                <th>{t("last_visit")}</th>
                                <th>{t("diagnosis")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentPatients.map((patient) => (
                                <tr key={patient.id}>
                                    <td>{patient.name}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.phone}</td>
                                    <td>{patient.lastVisit}</td>
                                    <td>{patient.diagnosis}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
};