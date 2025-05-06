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
import {
    getDashboardStats,
    getTodayAppointments,
    getPatientTrend,
    getWeeklyTasks,
    getMonthlyMeetingsStatus,
    getWeeklyCustomers,
} from "../../../api/apiDoctorDashboard"

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
    const [error, setError] = useState(null)

    // State variables for dashboard data
    const [stats, setStats] = useState({
        todayAppointments: 0,
        pendingTasks: 0,
        totalPatients: 0,
        completedAppointments: 0,
    })
    const [upcomingAppointments, setUpcomingAppointments] = useState([])
    const [pendingTasks, setPendingTasks] = useState([])
    const [recentPatients, setRecentPatients] = useState([])
    const [patientTrendData, setPatientTrendData] = useState({})
    const [appointmentTypeData, setAppointmentTypeData] = useState({})

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

    // Fetch all dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true)
                setError(null)

                // Fetch all data in parallel
                const [statsData, appointmentsData, patientTrend, tasksData, meetingsStatus, customersData] = await Promise.all(
                    [
                        getDashboardStats(),
                        getTodayAppointments(),
                        getPatientTrend(),
                        getWeeklyTasks(),
                        getMonthlyMeetingsStatus(),
                        getWeeklyCustomers(),
                    ],
                )

                // Process dashboard stats
                setStats({
                    todayAppointments: statsData.todays_meetings.count,
                    pendingTasks: statsData.todays_tasks.count,
                    totalPatients: statsData.weekly_customers.count,
                    completedAppointments: statsData.completed_tasks_today.count,
                })

                // Process appointments data
                const formattedAppointments = appointmentsData.appointments.map((appointment, index) => {
                    // Extract time from ISO date string
                    const appointmentDate = new Date(appointment.date);
                    const hours = appointmentDate.getUTCHours().toString().padStart(2, '0');
                    const minutes = appointmentDate.getUTCMinutes().toString().padStart(2, '0');
                    const time = `${hours}:${minutes}`;

                    console.log(time); // 09:00



                    // Get initials from full name
                    const nameParts = appointment.customer__full_name.split(" ")
                    const initials = nameParts.map((part) => part[0]).join("")

                    return {
                        id: index + 1,
                        patientName: appointment.customer__full_name,
                        avatar: initials,
                        time: time,
                        type: appointment.branch__name,
                        status: appointment.status,
                    }
                })
                setUpcomingAppointments(formattedAppointments)

                // Process patient trend data
                const trendData = patientTrend.patient_trend
                setPatientTrendData({
                    labels: Object.keys(trendData).slice(0, 6), // Take first 6 months
                    datasets: [
                        {
                            label: "Patients Treated",
                            data: Object.values(trendData).slice(0, 6), // Take first 6 months
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
                })

                // Process tasks data
                const formattedTasks = tasksData.weekly_tasks.map((task, index) => {
                    return {
                        id: index + 1,
                        title: task.title,
                        description: task.description,
                        priority: task.priority === "high" ? "High" : task.priority === "medium" ? "Medium" : "Low",
                        dueDate: new Date(task.end_date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                        status:
                            task.status === "in_progress"
                                ? "In Progress"
                                : task.status === "pending"
                                    ? "Pending"
                                    : task.status === "completed"
                                        ? "Completed"
                                        : "Not Started",
                    }
                })
                setPendingTasks(formattedTasks)

                // Process appointment types data
                const meetingsData = meetingsStatus.monthly_meetings_status
                setAppointmentTypeData({
                    labels: ["Accepted", "Finished", "Cancelled"],
                    datasets: [
                        {
                            data: [meetingsData.accepted, meetingsData.finished, meetingsData.cancelled],
                            backgroundColor: ["#4F46E5", "#10B981", "#EF4444"],
                            borderWidth: 0,
                            hoverOffset: 4,
                        },
                    ],
                })

                // Process recent patients data
                const formattedPatients = customersData.weekly_customers.map((patient, index) => {
                    // Get initials from full name
                    const nameParts = patient.full_name.split(" ")
                    const initials = nameParts.map((part) => part[0]).join("")

                    return {
                        id: index + 1,
                        name: patient.full_name,
                        avatar: initials,
                        age: patient.age,
                        lastVisit: patient.last_visit,
                        condition: patient.status === "faol" ? "Stable" : patient.status,
                    }
                })
                setRecentPatients(formattedPatients)

                setLoading(false)
            } catch (err) {
                console.error("Error fetching dashboard data:", err)
                setError("Ma'lumotlarni yuklashda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.")
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

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
                    <p>Ma'lumotlar yuklanmoqda...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="doctor-dashboard">
                <div className="dashboard-error">
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="retry-btn">
                        Qayta urinish
                    </button>
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
                    <div className="stat-trend up">+{stats.todayAppointments > 0 ? stats.todayAppointments : 0} today</div>
                </div>

                <div className="stat-card" onClick={() => navigate("/doctor/tasks")}>
                    <div className="stat-icon tasks">
                        <FaTasks />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.pendingTasks}</h3>
                        <p>Pending Tasks</p>
                    </div>
                    <div className="stat-trend down">+{stats.pendingTasks > 0 ? stats.pendingTasks : 0} today</div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon patients">
                        <FaUserInjured />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.totalPatients}</h3>
                        <p>Total Patients</p>
                    </div>
                    <div className="stat-trend up">
                        +{stats.totalPatients > 0 ? Math.floor(stats.totalPatients / 30) : 0} this week
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon completed">
                        <FaClipboardList />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.completedAppointments}</h3>
                        <p>Completed Today</p>
                    </div>
                    <div className="stat-trend">+{stats.completedAppointments} today</div>
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
                            {upcomingAppointments.length > 0 ? (
                                upcomingAppointments.map((appointment) => (
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
                                ))
                            ) : (
                                <div className="no-data-message">
                                    <p>No appointments scheduled for today</p>
                                </div>
                            )}
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
                            {patientTrendData.labels && patientTrendData.datasets ? (
                                <Line data={patientTrendData} options={lineOptions} />
                            ) : (
                                <div className="no-data-message">
                                    <p>No trend data available</p>
                                </div>
                            )}
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
                            {pendingTasks.length > 0 ? (
                                pendingTasks.map((task) => (
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
                                ))
                            ) : (
                                <div className="no-data-message">
                                    <p>No pending tasks</p>
                                </div>
                            )}
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
                            {appointmentTypeData.labels && appointmentTypeData.datasets ? (
                                <Doughnut data={appointmentTypeData} options={doughnutOptions} />
                            ) : (
                                <div className="no-data-message">
                                    <p>No appointment type data available</p>
                                </div>
                            )}
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
                            {recentPatients.length > 0 ? (
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
                                                <td>{new Date(patient.lastVisit).toLocaleDateString()}</td>
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
                            ) : (
                                <div className="no-data-message">
                                    <p>No recent patients</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DocDoshboard
