"use client"

import { useState, useEffect } from "react"
import { FaUsers, FaCalendarAlt, FaClipboardList, FaUserClock } from "react-icons/fa"
import { useAuth } from "../../contexts/AuthContext"

export default function ADashboard() {
    const { selectedBranch } = useAuth()
    const [stats, setStats] = useState({
        totalPatients: 156,
        appointmentsToday: 42,
        pendingAppointments: 12,
        completedAppointments: 30,
    })

    // Update stats based on selected branch
    useEffect(() => {
        if (selectedBranch === "branch1") {
            setStats({
                totalPatients: 68,
                appointmentsToday: 18,
                pendingAppointments: 5,
                completedAppointments: 13,
            })
        } else if (selectedBranch === "branch2") {
            setStats({
                totalPatients: 52,
                appointmentsToday: 14,
                pendingAppointments: 4,
                completedAppointments: 10,
            })
        } else if (selectedBranch === "branch3") {
            setStats({
                totalPatients: 36,
                appointmentsToday: 10,
                pendingAppointments: 3,
                completedAppointments: 7,
            })
        } else {
            // All branches
            setStats({
                totalPatients: 156,
                appointmentsToday: 42,
                pendingAppointments: 12,
                completedAppointments: 30,
            })
        }
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

    return (
        <div className="admin-dashboard">
            <h1 className="page-title">Admin Dashboard</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <FaUsers className="stat-icon admin" />
                    <div className="stat-value">{stats.totalPatients}</div>
                    <div className="stat-label">Jami mijozlar</div>
                </div>

                <div className="stat-card">
                    <FaCalendarAlt className="stat-icon admin" />
                    <div className="stat-value">{stats.appointmentsToday}</div>
                    <div className="stat-label">Bugungi qabullar</div>
                </div>

                <div className="stat-card">
                    <FaUserClock className="stat-icon admin" />
                    <div className="stat-value">{stats.pendingAppointments}</div>
                    <div className="stat-label">Kutilayotgan</div>
                </div>

                <div className="stat-card">
                    <FaClipboardList className="stat-icon admin" />
                    <div className="stat-value">{stats.completedAppointments}</div>
                    <div className="stat-label">Yakunlangan</div>
                </div>
            </div>

            <div className="dashboard-row">
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2>Bugungi qabullar</h2>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Mijoz</th>
                                <th>Vaqt</th>
                                <th>Shifokor</th>
                                <th>Bo'lim</th>
                                <th>Holat</th>
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
                                            {appointment.status === "completed" && "Yakunlangan"}
                                            {appointment.status === "in-progress" && "Jarayonda"}
                                            {appointment.status === "pending" && "Kutilmoqda"}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="dashboard-card">
                    <div className="card-header">
                        <h2>Tezkor amallar</h2>
                    </div>
                    <div className="quick-actions">
                        <button className="btn btn-primary btn-icon">
                            <FaUsers /> Yangi mijoz qo'shish
                        </button>
                        <button className="btn btn-primary btn-icon">
                            <FaCalendarAlt /> Qabul belgilash
                        </button>
                        <button className="btn btn-primary btn-icon">
                            <FaClipboardList /> Hisobot yaratish
                        </button>
                    </div>
                </div>
            </div>

            <div className="dashboard-card">
                <div className="card-header">
                    <h2>Yangi mijozlar</h2>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Ism</th>
                            <th>Yosh</th>
                            <th>Telefon</th>
                            <th>Oxirgi tashrif</th>
                            <th>Tashxis</th>
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
    )
};