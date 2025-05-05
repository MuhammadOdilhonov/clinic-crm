"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FaUserMd, FaCalendarAlt, FaUserInjured, FaSearch, FaBell, FaEllipsisV, FaChevronRight } from "react-icons/fa"
import { MdMeetingRoom } from "react-icons/md"
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
import { Doughnut, Line, Bar } from "react-chartjs-2"

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

const ADashboard = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        patients: 1245,
        doctors: 48,
        rooms: 32,
        appointments: 156,
        tasks: 89,
    })

    const [recentPatients, setRecentPatients] = useState([
        { id: 1, name: "John Smith", age: 45, diagnosis: "Hypertension", date: "2023-05-01", avatar: "JS" },
        { id: 2, name: "Sarah Johnson", age: 32, diagnosis: "Diabetes Type 2", date: "2023-05-02", avatar: "SJ" },
        { id: 3, name: "Michael Brown", age: 58, diagnosis: "Arthritis", date: "2023-05-03", avatar: "MB" },
        { id: 4, name: "Emily Davis", age: 27, diagnosis: "Migraine", date: "2023-05-04", avatar: "ED" },
        { id: 5, name: "Robert Wilson", age: 63, diagnosis: "COPD", date: "2023-05-05", avatar: "RW" },
    ])

    const [pendingTasks, setPendingTasks] = useState([
        { id: 1, title: "Review lab results", priority: "High", assignee: "Dr. Johnson", dueDate: "2023-05-10" },
        { id: 2, title: "Update patient records", priority: "Medium", assignee: "Nurse Smith", dueDate: "2023-05-11" },
        { id: 3, title: "Order medical supplies", priority: "Low", assignee: "Admin Staff", dueDate: "2023-05-12" },
        { id: 4, title: "Schedule staff meeting", priority: "Medium", assignee: "Admin Staff", dueDate: "2023-05-13" },
    ])

    const [cabinetUtilization, setCabinetUtilization] = useState([
        { name: "Cabinet 1", utilization: 85 },
        { name: "Cabinet 2", utilization: 72 },
        { name: "Cabinet 3", utilization: 90 },
        { name: "Cabinet 4", utilization: 65 },
        { name: "Cabinet 5", utilization: 78 },
    ])

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    // Chart data
    const patientDistributionData = {
        labels: ["Male", "Female"],
        datasets: [
            {
                data: [650, 595],
                backgroundColor: ["#4F46E5", "#EC4899"],
                borderColor: ["#4338CA", "#DB2777"],
                borderWidth: 1,
                hoverOffset: 4,
            },
        ],
    }

    const appointmentData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
            {
                label: "Appointments",
                data: [28, 35, 42, 30, 21, 15, 5],
                backgroundColor: "#4F46E5",
                borderRadius: 6,
                barThickness: 12,
            },
        ],
    }

    const patientTrendData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "New Patients",
                data: [65, 78, 90, 81, 95, 110],
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

    const cabinetUtilizationData = {
        labels: cabinetUtilization.map((cabinet) => cabinet.name),
        datasets: [
            {
                label: "Utilization %",
                data: cabinetUtilization.map((cabinet) => cabinet.utilization),
                backgroundColor: cabinetUtilization.map((cabinet) =>
                    cabinet.utilization > 80 ? "#EF4444" : cabinet.utilization > 60 ? "#F59E0B" : "#10B981",
                ),
                borderRadius: 6,
                barThickness: 16,
            },
        ],
    }

    // Chart options
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

    const barOptions = {
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
                    display: true,
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

    // Get current date
    const currentDate = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    if (loading) {
        return (
            <div className="admin-dashboard">
                <div className="dashboard-loading">
                    <div className="spinner"></div>
                    <p>Loading dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="admin-dashboard">
            {/* Dashboard Header */}
            <div className="dashboard-header">
                <div className="header-left">
                    <h1>Admin Dashboard</h1>
                    <p className="date-display">{currentDate}</p>
                </div>
                <div className="header-right">
                    <div className="search-box">
                        <FaSearch />
                        <input type="text" placeholder="Search..." />
                    </div>
                    <button className="notification-btn">
                        <FaBell />
                        <span className="notification-badge">3</span>
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="stats-container">
                <div className="stat-card" onClick={() => navigate("/admin/patients")}>
                    <div className="stat-icon patients">
                        <FaUserInjured />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.patients}</h3>
                        <p>Total Patients</p>
                    </div>
                    <div className="stat-trend up">+5.2%</div>
                </div>

                <div className="stat-card" onClick={() => navigate("/admin/staff")}>
                    <div className="stat-icon doctors">
                        <FaUserMd />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.doctors}</h3>
                        <p>Doctors</p>
                    </div>
                    <div className="stat-trend up">+2.1%</div>
                </div>

                <div className="stat-card" onClick={() => navigate("/admin/rooms")}>
                    <div className="stat-icon rooms">
                        <MdMeetingRoom />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.rooms}</h3>
                        <p>Rooms</p>
                    </div>
                    <div className="stat-trend">0%</div>
                </div>

                <div className="stat-card" onClick={() => navigate("/admin/schedule")}>
                    <div className="stat-icon appointments">
                        <FaCalendarAlt />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.appointments}</h3>
                        <p>Appointments</p>
                    </div>
                    <div className="stat-trend up">+12.3%</div>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="dashboard-content">
                <div className="dashboard-row">
                    {/* Weekly Appointments Chart */}
                    <div className="dashboard-card appointments-chart">
                        <div className="card-header">
                            <h2>Weekly Appointments</h2>
                            <button className="card-menu-btn">
                                <FaEllipsisV />
                            </button>
                        </div>
                        <div className="chart-container">
                            <Bar data={appointmentData} options={barOptions} />
                        </div>
                    </div>

                    {/* Patient Distribution Chart */}
                    <div className="dashboard-card patient-distribution">
                        <div className="card-header">
                            <h2>Patient Distribution</h2>
                            <button className="card-menu-btn">
                                <FaEllipsisV />
                            </button>
                        </div>
                        <div className="chart-container">
                            <Doughnut data={patientDistributionData} options={doughnutOptions} />
                        </div>
                    </div>

                    {/* Patient Trend Chart */}
                    <div className="dashboard-card patient-trend">
                        <div className="card-header">
                            <h2>Patient Trend</h2>
                            <button className="card-menu-btn">
                                <FaEllipsisV />
                            </button>
                        </div>
                        <div className="chart-container">
                            <Line data={patientTrendData} options={lineOptions} />
                        </div>
                    </div>
                </div>

                <div className="dashboard-row">
                    {/* Recent Patients */}
                    <div className="dashboard-card recent-patients">
                        <div className="card-header">
                            <h2>Recent Patients</h2>
                            <button className="view-all-btn" onClick={() => navigate("/admin/patients")}>
                                View All <FaChevronRight />
                            </button>
                        </div>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Patient</th>
                                        <th>Age</th>
                                        <th>Diagnosis</th>
                                        <th>Date</th>
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
                                            <td>{patient.diagnosis}</td>
                                            <td>{patient.date}</td>
                                            <td>
                                                <button className="action-button view">View</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pending Tasks */}
                    <div className="dashboard-card pending-tasks">
                        <div className="card-header">
                            <h2>Pending Tasks</h2>
                            <button className="view-all-btn" onClick={() => navigate("/admin/tasks")}>
                                View All <FaChevronRight />
                            </button>
                        </div>
                        <div className="tasks-container">
                            {pendingTasks.map((task) => (
                                <div key={task.id} className="task-card">
                                    <div className={`priority-badge priority-${task.priority.toLowerCase()}`}>{task.priority}</div>
                                    <h3>{task.title}</h3>
                                    <div className="task-meta">
                                        <div className="assignee">
                                            <span>Assignee:</span> {task.assignee}
                                        </div>
                                        <div className="due-date">
                                            <span>Due:</span> {task.dueDate}
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
                </div>

                {/* Cabinet Utilization */}
                <div className="dashboard-row">
                    <div className="dashboard-card cabinet-utilization">
                        <div className="card-header">
                            <h2>Cabinet Utilization</h2>
                            <button className="card-menu-btn">
                                <FaEllipsisV />
                            </button>
                        </div>
                        <div className="chart-container">
                            <Bar data={cabinetUtilizationData} options={barOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ADashboard
