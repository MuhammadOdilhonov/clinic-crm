import React , { useState, useEffect } from "react"
import {
    FaCalendarAlt,
    FaUserClock,
    FaClipboardList,
    FaUserCheck,
    FaUserInjured,
    FaHeartbeat,
    FaFileMedical,
} from "react-icons/fa"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"

export default function DocDashboard() {
    const { selectedBranch } = useAuth()
    const { t } = useLanguage()
    const [stats, setStats] = useState({
        appointmentsToday: 8,
        pendingAppointments: 3,
        completedAppointments: 5,
        totalPatients: 45,
        inpatientCount: 3,
    })
    const [loading, setLoading] = useState(true)

    // Update stats based on selected branch
    useEffect(() => {
        setLoading(true)

        // Simulate API call
        setTimeout(() => {
            if (selectedBranch === "branch1") {
                setStats({
                    appointmentsToday: 8,
                    pendingAppointments: 3,
                    completedAppointments: 5,
                    totalPatients: 45,
                    inpatientCount: 3,
                })
            } else if (selectedBranch === "branch2") {
                setStats({
                    appointmentsToday: 6,
                    pendingAppointments: 2,
                    completedAppointments: 4,
                    totalPatients: 38,
                    inpatientCount: 2,
                })
            } else if (selectedBranch === "branch3") {
                setStats({
                    appointmentsToday: 4,
                    pendingAppointments: 1,
                    completedAppointments: 3,
                    totalPatients: 30,
                    inpatientCount: 1,
                })
            } else {
                // All branches (show branch1 data for doctor)
                setStats({
                    appointmentsToday: 8,
                    pendingAppointments: 3,
                    completedAppointments: 5,
                    totalPatients: 45,
                    inpatientCount: 3,
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
            reason: "Yurak tekshiruvi",
            status: "completed",
        },
        {
            id: 2,
            patientName: "Nilufar Rahimova",
            time: "10:30",
            reason: "Bosh og'rig'i",
            status: "completed",
        },
        {
            id: 3,
            patientName: "Sardor Aliyev",
            time: "11:45",
            reason: "Yurak ritmi buzilishi",
            status: "in-progress",
        },
        {
            id: 4,
            patientName: "Malika Umarova",
            time: "13:15",
            reason: "Profilaktik tekshiruv",
            status: "pending",
        },
        {
            id: 5,
            patientName: "Jasur Toshmatov",
            time: "14:30",
            reason: "Qon bosimi",
            status: "pending",
        },
    ]

    // Recent patients
    const recentPatients = [
        {
            id: 1,
            name: "Alisher Karimov",
            age: 45,
            lastVisit: "2023-05-15",
            diagnosis: "Yurak kasalligi",
            notes: "Dori-darmonlar belgilandi",
        },
        {
            id: 2,
            name: "Nilufar Rahimova",
            age: 32,
            lastVisit: "2023-05-14",
            diagnosis: "Bosh og'rig'i",
            notes: "Qo'shimcha tekshiruvlar talab qilinadi",
        },
        {
            id: 3,
            name: "Sardor Aliyev",
            age: 28,
            lastVisit: "2023-05-13",
            diagnosis: "Yurak ritmi buzilishi",
            notes: "Holati yaxshilanmoqda",
        },
    ]

    // Inpatient patients
    const inpatientPatients = [
        {
            id: 101,
            name: "Alisher Karimov",
            age: 45,
            roomNumber: "101",
            admissionDate: "2023-05-15",
            diagnosis: "Pneumonia",
            status: "stable",
        },
        {
            id: 102,
            name: "Dilnoza Saidova",
            age: 32,
            roomNumber: "102",
            admissionDate: "2023-05-16",
            diagnosis: "Post-surgery recovery",
            status: "critical",
        },
        {
            id: 103,
            name: "Rustam Khasanov",
            age: 58,
            roomNumber: "201",
            admissionDate: "2023-05-14",
            diagnosis: "Cardiac monitoring",
            status: "improving",
        },
    ]

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>{t("loading")}...</p>
            </div>
        )
    }

    return (
        <div className="doctor-dashboard">
            <h1 className="page-title">{t("doctor_dashboard")}</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <FaCalendarAlt className="stat-icon doctor" />
                    <div className="stat-value">{stats.appointmentsToday}</div>
                    <div className="stat-label">{t("appointments_today")}</div>
                </div>

                <div className="stat-card">
                    <FaUserClock className="stat-icon doctor" />
                    <div className="stat-value">{stats.pendingAppointments}</div>
                    <div className="stat-label">{t("pending_appointments")}</div>
                </div>

                <div className="stat-card">
                    <FaUserCheck className="stat-icon doctor" />
                    <div className="stat-value">{stats.completedAppointments}</div>
                    <div className="stat-label">{t("completed_appointments")}</div>
                </div>

                <div className="stat-card">
                    <FaClipboardList className="stat-icon doctor" />
                    <div className="stat-value">{stats.totalPatients}</div>
                    <div className="stat-label">{t("total_patients")}</div>
                </div>

                <div className="stat-card">
                    <FaUserInjured className="stat-icon doctor" />
                    <div className="stat-value">{stats.inpatientCount}</div>
                    <div className="stat-label">{t("inpatient_patients")}</div>
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
                                <th>{t("reason")}</th>
                                <th>{t("status")}</th>
                                <th>{t("actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todayAppointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.patientName}</td>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.reason}</td>
                                    <td>
                                        <div className={`status-badge ${appointment.status}`}>
                                            {appointment.status === "completed" && t("completed")}
                                            {appointment.status === "in-progress" && t("in_progress")}
                                            {appointment.status === "pending" && t("pending")}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-icon view">
                                                <FaClipboardList />
                                            </button>
                                            {appointment.status === "pending" && (
                                                <button className="btn-icon start">
                                                    <FaUserCheck />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="dashboard-card">
                    <div className="card-header">
                        <h2>{t("schedule")}</h2>
                    </div>
                    <div className="schedule-summary">
                        <div className="schedule-day">
                            <h3>{t("today")}</h3>
                            <p>09:00 - 17:00</p>
                            <div className="appointment-count">
                                <FaCalendarAlt />
                                <span>
                                    {stats.appointmentsToday} {t("appointments")}
                                </span>
                            </div>
                        </div>
                        <div className="schedule-day">
                            <h3>{t("tomorrow")}</h3>
                            <p>09:00 - 17:00</p>
                            <div className="appointment-count">
                                <FaCalendarAlt />
                                <span>6 {t("appointments")}</span>
                            </div>
                        </div>
                        <div className="schedule-day">
                            <h3>{t("day_after_tomorrow")}</h3>
                            <p>09:00 - 15:00</p>
                            <div className="appointment-count">
                                <FaCalendarAlt />
                                <span>4 {t("appointments")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-row">
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
                                <th>{t("last_visit")}</th>
                                <th>{t("diagnosis")}</th>
                                <th>{t("notes")}</th>
                                <th>{t("actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentPatients.map((patient) => (
                                <tr key={patient.id}>
                                    <td>{patient.name}</td>
                                    <td>{patient.age}</td>
                                    <td>{patient.lastVisit}</td>
                                    <td>{patient.diagnosis}</td>
                                    <td>{patient.notes}</td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-icon view">
                                                <FaFileMedical />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="dashboard-card">
                <div className="card-header">
                    <h2>{t("inpatient_patients")}</h2>
                    <button className="btn btn-sm btn-outline">{t("view_all")}</button>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>{t("name")}</th>
                            <th>{t("age")}</th>
                            <th>{t("room")}</th>
                            <th>{t("admission_date")}</th>
                            <th>{t("diagnosis")}</th>
                            <th>{t("status")}</th>
                            <th>{t("actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inpatientPatients.map((patient) => (
                            <tr key={patient.id}>
                                <td>{patient.name}</td>
                                <td>{patient.age}</td>
                                <td>{patient.roomNumber}</td>
                                <td>{patient.admissionDate}</td>
                                <td>{patient.diagnosis}</td>
                                <td>
                                    <div className={`status-badge ${patient.status}`}>{t(patient.status)}</div>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button className="btn-icon view">
                                            <FaHeartbeat />
                                        </button>
                                        <button className="btn-icon edit">
                                            <FaFileMedical />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};