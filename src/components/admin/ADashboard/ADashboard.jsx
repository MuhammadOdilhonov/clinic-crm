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
import { getAllAdminDashboardData } from "../../../api/apiAdminDashboard"

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
    const [error, setError] = useState(null)
    const [selectedFilial, setSelectedFilial] = useState("all")
    const [dashboardData, setDashboardData] = useState({
        stats: {
            patients: 0,
            doctors: 0,
            rooms: 0,
            appointments: 0,
        },
        recentPatients: [],
        pendingTasks: [],
        cabinetUtilization: [],
        patientDistribution: { male: 0, female: 0 },
        weeklyAppointments: {},
        monthlyCustomerTrend: {},
    })

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true)
            try {
                const data = await getAllAdminDashboardData(selectedFilial)

                // Transform the data to match the component's expected structure
                setDashboardData({
                    stats: {
                        patients: data.dashboardMetrics.customers.total,
                        doctors: data.dashboardMetrics.doctors.total,
                        rooms: data.dashboardMetrics.cabinets.total,
                        appointments: data.dashboardMetrics.meetings.total,
                        patientsGrowth: data.dashboardMetrics.customers.growth,
                        doctorsGrowth: data.dashboardMetrics.doctors.growth,
                        roomsGrowth: data.dashboardMetrics.cabinets.growth,
                        appointmentsGrowth: data.dashboardMetrics.meetings.growth,
                    },
                    recentPatients: data.recentPatients.recent_patients.map((patient, index) => ({
                        id: index + 1,
                        name: patient.full_name,
                        age: patient.age,
                        diagnosis: patient.diagnosis,
                        date: patient.created_at,
                        avatar: patient.full_name
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                            .substring(0, 2),
                    })),
                    pendingTasks: data.pendingTasks.pending_tasks.map((task, index) => ({
                        id: index + 1,
                        title: task.title,
                        priority: task.priority,
                        assignee: task.assignee,
                        dueDate: task.due_date,
                    })),
                    cabinetUtilization: data.cabinetUtilization.cabinet_utilization.map((cabinet) => ({
                        name: cabinet.cabinet_name,
                        utilization: cabinet.utilization,
                    })),
                    patientDistribution: {
                        male: data.patientDistribution.male,
                        female: data.patientDistribution.female,
                    },
                    weeklyAppointments: data.weeklyAppointments.weekly_appointments,
                    monthlyCustomerTrend: data.monthlyCustomerTrend.monthly_customer_trend,
                })
                setError(null)
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err)
                setError("Failed to load dashboard data. Please try again later.")
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [selectedFilial])

    // Chart data
    const patientDistributionData = {
        labels: ["Male", "Female"],
        datasets: [
            {
                data: [dashboardData.patientDistribution.male, dashboardData.patientDistribution.female],
                backgroundColor: ["#4F46E5", "#EC4899"],
                borderColor: ["#4338CA", "#DB2777"],
                borderWidth: 1,
                hoverOffset: 4,
            },
        ],
    }

    const appointmentData = {
        labels: Object.keys(dashboardData.weeklyAppointments),
        datasets: [
            {
                label: "Appointments",
                data: Object.values(dashboardData.weeklyAppointments),
                backgroundColor: "#4F46E5",
                borderRadius: 6,
                barThickness: 12,
            },
        ],
    }

    const patientTrendData = {
        labels: Object.keys(dashboardData.monthlyCustomerTrend),
        datasets: [
            {
                label: "New Patients",
                data: Object.values(dashboardData.monthlyCustomerTrend),
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
        labels: dashboardData.cabinetUtilization.map((cabinet) => cabinet.name),
        datasets: [
            {
                label: "Utilization %",
                data: dashboardData.cabinetUtilization.map((cabinet) => cabinet.utilization),
                backgroundColor: dashboardData.cabinetUtilization.map((cabinet) =>
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

    // Handle filial change
   

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

    if (error) {
        return (
            <div className="admin-dashboard">
                <div className="dashboard-error">
                    <p>{error}</p>
                    <button onClick={() => window.location.reload()} className="retry-btn">
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="admin-dashboard">
            
            {/* Stats Cards */}
            <div className="stats-container">
                <div className="stat-card" onClick={() => navigate("/admin/patients")}>
                    <div className="stat-icon patients">
                        <FaUserInjured />
                    </div>
                    <div className="stat-content">
                        <h3>{dashboardData.stats.patients}</h3>
                        <p>Total Patients</p>
                    </div>
                    <div
                        className={`stat-trend ${dashboardData.stats.patientsGrowth > 0 ? "up" : dashboardData.stats.patientsGrowth < 0 ? "down" : ""}`}
                    >
                        {dashboardData.stats.patientsGrowth > 0 ? "+" : ""}
                        {dashboardData.stats.patientsGrowth}%
                    </div>
                </div>

                <div className="stat-card" onClick={() => navigate("/admin/staff")}>
                    <div className="stat-icon doctors">
                        <FaUserMd />
                    </div>
                    <div className="stat-content">
                        <h3>{dashboardData.stats.doctors}</h3>
                        <p>Doctors</p>
                    </div>
                    <div
                        className={`stat-trend ${dashboardData.stats.doctorsGrowth > 0 ? "up" : dashboardData.stats.doctorsGrowth < 0 ? "down" : ""}`}
                    >
                        {dashboardData.stats.doctorsGrowth > 0 ? "+" : ""}
                        {dashboardData.stats.doctorsGrowth}%
                    </div>
                </div>

                <div className="stat-card" onClick={() => navigate("/admin/rooms")}>
                    <div className="stat-icon rooms">
                        <MdMeetingRoom />
                    </div>
                    <div className="stat-content">
                        <h3>{dashboardData.stats.rooms}</h3>
                        <p>Rooms</p>
                    </div>
                    <div
                        className={`stat-trend ${dashboardData.stats.roomsGrowth > 0 ? "up" : dashboardData.stats.roomsGrowth < 0 ? "down" : ""}`}
                    >
                        {dashboardData.stats.roomsGrowth > 0 ? "+" : ""}
                        {dashboardData.stats.roomsGrowth}%
                    </div>
                </div>

                <div className="stat-card" onClick={() => navigate("/admin/schedule")}>
                    <div className="stat-icon appointments">
                        <FaCalendarAlt />
                    </div>
                    <div className="stat-content">
                        <h3>{dashboardData.stats.appointments}</h3>
                        <p>Appointments</p>
                    </div>
                    <div
                        className={`stat-trend ${dashboardData.stats.appointmentsGrowth > 0 ? "up" : dashboardData.stats.appointmentsGrowth < 0 ? "down" : ""}`}
                    >
                        {dashboardData.stats.appointmentsGrowth > 0 ? "+" : ""}
                        {dashboardData.stats.appointmentsGrowth}%
                    </div>
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
                                    {dashboardData.recentPatients.map((patient) => (
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
                            {dashboardData.pendingTasks.map((task) => (
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
