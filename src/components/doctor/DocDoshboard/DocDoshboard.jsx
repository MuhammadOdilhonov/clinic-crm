"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
    FaUserInjured,
    FaTasks,
    FaCalendarAlt,
    FaClipboardList,
    FaSearch,
    FaBell,
    FaEllipsisV,
    FaChevronRight,
    FaClock,
} from "react-icons/fa"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Filler,
} from "chart.js"
import { Doughnut, Line } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Filler,
)

const DocDoshboard = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        todayAppointments: 12,
        pendingTasks: 8,
        totalPatients: 156,
        completedAppointments: 4,
    })

    const [upcomingAppointments, setUpcomingAppointments] = useState([
        { id: 1, patientName: "John Smith", avatar: "JS", time: "10:00 AM", type: "Check-up", status: "Confirmed" },
        { id: 2, patientName: "Sarah Johnson", avatar: "SJ", time: "11:30 AM", type: "Follow-up", status: "Confirmed" },
        { id: 3, patientName: "Michael Brown", avatar: "MB", time: "1:15 PM", type: "Consultation", status: "Pending" },
        { id: 4, patientName: "Emily Davis", avatar: "ED", time: "2:45 PM", type: "Check-up", status: "Confirmed" },
        { id: 5, patientName: "Robert Wilson", avatar: "RW", time: "4:00 PM", type: "Emergency", status: "Confirmed" },
    ])

    const [pendingTasks, setPendingTasks] = useState([
        { id: 1, title: "Review lab results for Patient #1245", priority: "High", dueDate: "Today", status: "Pending" },
        {
            id: 2,
            title: "Complete medical report for Sarah Johnson",
            priority: "Medium",
            dueDate: "Tomorrow",
            status: "In Progress",
        },
        {
            id: 3,
            title: "Follow up with Michael Brown about medication",
            priority: "Medium",
            dueDate: "Today",
            status: "Pending",
        },
        {
            id: 4,
            title: "Update treatment plan for Emily Davis",
            priority: "Low",
            dueDate: "May 15",
            status: "Not Started",
        },
    ])

    const [recentPatients, setRecentPatients] = useState([
        { id: 1, name: "John Smith", avatar: "JS", age: 45, lastVisit: "2023-05-01", condition: "Stable" },
        { id: 2, name: "Sarah Johnson", avatar: "SJ", age: 32, lastVisit: "2023-05-02", condition: "Improving" },
        { id: 3, name: "Michael Brown", avatar: "MB", age: 58, lastVisit: "2023-05-03", condition: "Critical" },
        { id: 4, name: "Emily Davis", avatar: "ED", age: 27, lastVisit: "2023-05-04", condition: "Stable" },
    ])

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    // Get current time
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
    )

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }))
        }, 60000)

        return () => clearInterval(timer)
    }, [])

    // Chart data
    const patientTreatmentData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Patients Treated",
                data: [28, 35, 42, 30, 38, 32],
                borderColor: "#10B981",
                backgroundColor: "rgba(16, 185, 129, 0.1)",
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "#10B981",
                pointBorderColor: "#fff",
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    }

    const appointmentTypeData = {
        labels: ["Check-up", "Follow-up", "Consultation", "Emergency", "Surgery"],
        datasets: [
            {
                data: [35, 25, 20, 10, 10],
                backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"],
                borderWidth: 0,
                hoverOffset: 4,
            },
        ],
    }

    // Chart options
    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "#1E293B",
                titleFont: {
                    size: 14,
                    weight: "bold",
                },
                bodyFont: {
                    size: 13,
                },
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
    }

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                backgroundColor: "#1E293B",
                titleFont: {
                    size: 14,
                    weight: "bold",
                },
                bodyFont: {
                    size: 13,
                },
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
            },
        },
    }

    if (loading) {
        return (
            <div className="doctor-dashboard">
                <div className="dashboard-loading">
                    <div className="spinner"></div>
                    <p>Loading dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="doctor-dashboard">
            {/* Dashboard Header */}
            <div className="dashboard-header">
                <div className="header-left">
                    <h1>Doctor Dashboard</h1>
                    <p className="welcome-message">Welcome back, Dr. Johnson</p>
                </div>
                <div className="header-right">
                    <div className="time-display">
                        <FaClock /> {currentTime}
                    </div>
                    <div className="search-box">
                        <FaSearch />
                        <input type="text" placeholder="Search..." />
                    </div>
                    <button className="notification-btn">
                        <FaBell />
                        <span className="notification-badge">2</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-container">
                <div className="stat-card" onClick={() => navigate("/doctor/schedule")}>
                    <div className="stat-icon appointments">
                        <FaCalendarAlt />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.todayAppointments}</h3>
                        <p>Today's Appointments</p>
                    </div>
                    <div className="stat-trend up">+2 today</div>
                </div>

                <div className="stat-card" onClick={() => navigate("/doctor/tasks")}>
                    <div className="stat-icon tasks">
                        <FaTasks />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.pendingTasks}</h3>
                        <p>Pending Tasks</p>
                    </div>
                    <div className="stat-trend down">+3 today</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon patients">
                        <FaUserInjured />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.totalPatients}</h3>
                        <p>Total Patients</p>
                    </div>
                    <div className="stat-trend up">+5 this week</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon completed">
                        <FaClipboardList />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.completedAppointments}</h3>
                        <p>Completed Today</p>
                    </div>
                    <div className="stat-trend">+0 today</div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="dashboard-content">
                <div className="dashboard-row">
                    {/* Today's Appointments */}
                    <div className="dashboard-card today-appointments">
                        <div className="card-header">
                            <h2>Today's Appointments</h2>
                            <button className="view-all-btn" onClick={() => navigate("/doctor/schedule")}>
                                View All <FaChevronRight />
                            </button>
                        </div>
                        <div className="appointments-container">
                            {upcomingAppointments.map((appointment) => (
                                <div key={appointment.id} className="appointment-card">
                                    <div className="appointment-time">
                                        <span>{appointment.time}</span>
                                        <div className={`status-indicator status-${appointment.status.toLowerCase()}`}></div>
                                    </div>
                                    <div className="appointment-details">
                                        <div className="patient-info">
                                            <div className="patient-avatar">{appointment.avatar}</div>
                                            <div className="patient-name-type">
                                                <h4>{appointment.patientName}</h4>
                                                <span className="appointment-type">{appointment.type}</span>
                                            </div>
                                        </div>
                                        <div className="appointment-actions">
                                            <button className="appointment-btn start">Start</button>
                                            <button className="appointment-btn view">View</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Patient Treatment Trend */}
                    <div className="dashboard-card patient-treatment">
                        <div className="card-header">
                            <h2>Patient Treatment Trend</h2>
                            <button className="card-menu-btn">
                                <FaEllipsisV />
                            </button>
                        </div>
                        <div className="chart-container">
                            <Line data={patientTreatmentData} options={lineOptions} />
                        </div>
                    </div>
                </div>

                <div className="dashboard-row">
                    {/* Pending Tasks */}
                    <div className="dashboard-card pending-tasks">
                        <div className="card-header">
                            <h2>Pending Tasks</h2>
                            <button className="view-all-btn" onClick={() => navigate("/doctor/tasks")}>
                                View All <FaChevronRight />
                            </button>
                        </div>
                        <div className="tasks-container">
                            {pendingTasks.map((task) => (
                                <div key={task.id} className="task-card">
                                    <div className={`priority-badge priority-${task.priority.toLowerCase()}`}>{task.priority}</div>
                                    <h3>{task.title}</h3>
                                    <div className="task-meta">
                                        <div className="due-date">
                                            <span>Due:</span> {task.dueDate}
                                        </div>
                                        <div className={`task-status status-${task.status.toLowerCase().replace(" ", "-")}`}>
                                            {task.status}
                                        </div>
                                    </div>
                                    <div className="task-actions">
                                        <button className="task-btn complete">Complete</button>
                                        <button className="task-btn view">View</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Appointment Types */}
                    <div className="dashboard-card appointment-types">
                        <div className="card-header">
                            <h2>Appointment Types</h2>
                            <button className="card-menu-btn">
                                <FaEllipsisV />
                            </button>
                        </div>
                        <div className="chart-container">
                            <Doughnut data={appointmentTypeData} options={doughnutOptions} />
                        </div>
                    </div>
                </div>

                <div className="dashboard-row">
                    {/* Recent Patients */}
                    <div className="dashboard-card recent-patients">
                        <div className="card-header">
                            <h2>Recent Patients</h2>
                            <button className="view-all-btn" onClick={() => navigate("/doctor/patients")}>
                                View All <FaChevronRight />
                            </button>
                        </div>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Patient</th>
                                        <th>Age</th>
                                        <th>Last Visit</th>
                                        <th>Condition</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentPatients.map((patient) => (
                                        <tr key={patient.id}>
                                            <td>
                                                <div className="patient-info">
                                                    <div className="patient-avatar">{patient.avatar}</div>
                                                    <span>{patient.name}</span>
                                                </div>
                                            </td>
                                            <td>{patient.age}</td>
                                            <td>{patient.lastVisit}</td>
                                            <td>
                                                <span className={`condition condition-${patient.condition.toLowerCase()}`}>
                                                    {patient.condition}
                                                </span>
                                            </td>
                                            <td>
                                                <button className="action-button view">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocDoshboard
