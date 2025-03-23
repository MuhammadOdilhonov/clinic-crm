import { useState, useEffect } from "react"
import { FaCalendarAlt, FaUserClock, FaClipboardList, FaUserCheck } from "react-icons/fa"
import { useAuth } from "../../contexts/AuthContext"

export default function DocDashboard() {
    const { selectedBranch } = useAuth()
    const [stats, setStats] = useState({
        appointmentsToday: 8,
        pendingAppointments: 3,
        completedAppointments: 5,
        totalPatients: 45,
    })

    // Update stats based on selected branch
    useEffect(() => {
        if (selectedBranch === "branch1") {
            setStats({
                appointmentsToday: 8,
                pendingAppointments: 3,
                completedAppointments: 5,
                totalPatients: 45,
            })
        } else if (selectedBranch === "branch2") {
            setStats({
                appointmentsToday: 6,
                pendingAppointments: 2,
                completedAppointments: 4,
                totalPatients: 38,
            })
        } else if (selectedBranch === "branch3") {
            setStats({
                appointmentsToday: 4,
                pendingAppointments: 1,
                completedAppointments: 3,
                totalPatients: 30,
            })
        } else {
            // All branches (show branch1 data for doctor)
            setStats({
                appointmentsToday: 8,
                pendingAppointments: 3,
                completedAppointments: 5,
                totalPatients: 45,
            })
        }
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

    return (
        <div className="doctor-dashboard">
            <h1 className="page-title">Shifokor Dashboard</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <FaCalendarAlt className="stat-icon doctor" />
                    <div className="stat-value">{stats.appointmentsToday}</div>
                    <div className="stat-label">Bugungi qabullar</div>
                </div>

                <div className="stat-card">
                    <FaUserClock className="stat-icon doctor" />
                    <div className="stat-value">{stats.pendingAppointments}</div>
                    <div className="stat-label">Kutilayotgan</div>
                </div>

                <div className="stat-card">
                    <FaUserCheck className="stat-icon doctor" />
                    <div className="stat-value">{stats.completedAppointments}</div>
                    <div className="stat-label">Yakunlangan</div>
                </div>

                <div className="stat-card">
                    <FaClipboardList className="stat-icon doctor" />
                    <div className="stat-value">{stats.totalPatients}</div>
                    <div className="stat-label">Jami mijozlar</div>
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
                                <th>Sabab</th>
                                <th>Holat</th>
                                <th>Amallar</th>
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
                                            {appointment.status === "completed" && "Yakunlangan"}
                                            {appointment.status === "in-progress" && "Jarayonda"}
                                            {appointment.status === "pending" && "Kutilmoqda"}
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
                        <h2>Ish jadvali</h2>
                    </div>
                    <div className="schedule-summary">
                        <div className="schedule-day">
                            <h3>Bugun</h3>
                            <p>09:00 - 17:00</p>
                            <div className="appointment-count">
                                <FaCalendarAlt />
                                <span>{stats.appointmentsToday} qabul</span>
                            </div>
                        </div>
                        <div className="schedule-day">
                            <h3>Ertaga</h3>
                            <p>09:00 - 17:00</p>
                            <div className="appointment-count">
                                <FaCalendarAlt />
                                <span>6 qabul</span>
                            </div>
                        </div>
                        <div className="schedule-day">
                            <h3>Keyingi kun</h3>
                            <p>09:00 - 15:00</p>
                            <div className="appointment-count">
                                <FaCalendarAlt />
                                <span>4 qabul</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-card">
                <div className="card-header">
                    <h2>Oxirgi mijozlar</h2>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Ism</th>
                            <th>Yosh</th>
                            <th>Oxirgi tashrif</th>
                            <th>Tashxis</th>
                            <th>Izohlar</th>
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
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};