"use client"
import { useState, useEffect } from "react"
import {
    FaUsers,
    FaDoorOpen,
    FaCalendarAlt,
    FaUserMd,
    FaChartLine,
    FaChartBar,
    FaChartPie,
    FaMoneyBillWave,
    FaArrowUp,
} from "react-icons/fa"
import { useAuth } from "../../../contexts/AuthContext"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
} from "chart.js"
import { Pie, Bar, Line } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement)

export default function Dashboard() {
    const { selectedBranch } = useAuth()
    const [stats, setStats] = useState({
        totalStaff: 24,
        totalDoctors: 15,
        totalAdmins: 8,
        totalCabinets: 12,
        totalPatients: 156,
        appointmentsToday: 42,
        totalIncome: 12500000,
        totalExpenses: 8750000,
        incomeChange: 8.5,
        expenseChange: 5.2,
        patientChange: 12.3,
        appointmentChange: 7.8,
    })

    // Update stats based on selected branch
    useEffect(() => {
        if (selectedBranch === "branch1") {
            setStats({
                totalStaff: 10,
                totalDoctors: 6,
                totalAdmins: 3,
                totalCabinets: 5,
                totalPatients: 68,
                appointmentsToday: 18,
                totalIncome: 5200000,
                totalExpenses: 3600000,
                incomeChange: 9.2,
                expenseChange: 4.8,
                patientChange: 14.5,
                appointmentChange: 8.3,
            })
        } else if (selectedBranch === "branch2") {
            setStats({
                totalStaff: 8,
                totalDoctors: 5,
                totalAdmins: 2,
                totalCabinets: 4,
                totalPatients: 52,
                appointmentsToday: 14,
                totalIncome: 4100000,
                totalExpenses: 2900000,
                incomeChange: 7.8,
                expenseChange: 5.5,
                patientChange: 10.2,
                appointmentChange: 6.7,
            })
        } else if (selectedBranch === "branch3") {
            setStats({
                totalStaff: 6,
                totalDoctors: 4,
                totalAdmins: 2,
                totalCabinets: 3,
                totalPatients: 36,
                appointmentsToday: 10,
                totalIncome: 3200000,
                totalExpenses: 2250000,
                incomeChange: 6.5,
                expenseChange: 4.2,
                patientChange: 9.8,
                appointmentChange: 5.4,
            })
        } else {
            // All branches
            setStats({
                totalStaff: 24,
                totalDoctors: 15,
                totalAdmins: 8,
                totalCabinets: 12,
                totalPatients: 156,
                appointmentsToday: 42,
                totalIncome: 12500000,
                totalExpenses: 8750000,
                incomeChange: 8.5,
                expenseChange: 5.2,
                patientChange: 12.3,
                appointmentChange: 7.8,
            })
        }
    }, [selectedBranch])

    const recentStaff = [
        { id: 1, name: "Aziz Karimov", role: "Shifokor", department: "Kardiologiya", date: "2023-05-15" },
        { id: 2, name: "Malika Umarova", role: "Admin", department: "Qabul bo'limi", date: "2023-05-10" },
        { id: 3, name: "Jasur Toshmatov", role: "Shifokor", department: "Nevrologiya", date: "2023-05-05" },
    ]

    const performanceData = [
        { id: 1, name: "Kardiologiya", patients: 45, satisfaction: 92 },
        { id: 2, name: "Nevrologiya", patients: 38, satisfaction: 88 },
        { id: 3, name: "Pediatriya", patients: 52, satisfaction: 95 },
        { id: 4, name: "Terapiya", patients: 30, satisfaction: 90 },
    ]

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
    ]

    // Chart data
    const departmentDistributionData = {
        labels: ["Kardiologiya", "Nevrologiya", "Pediatriya", "Terapiya", "Stomatologiya"],
        datasets: [
            {
                label: "Mijozlar soni",
                data: [45, 38, 52, 30, 25],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(255, 206, 86, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
            },
        ],
    }

    const monthlyPatientsData = {
        labels: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun"],
        datasets: [
            {
                label: "Mijozlar soni",
                data: [65, 59, 80, 81, 56, 55],
                backgroundColor: "rgba(54, 162, 235, 0.5)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 2,
                tension: 0.4,
                fill: true,
            },
        ],
    }

    const financialData = {
        labels: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun"],
        datasets: [
            {
                label: "Daromad",
                data: [1800000, 2100000, 1950000, 2300000, 2150000, 2200000],
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 2,
            },
            {
                label: "Xarajat",
                data: [1200000, 1350000, 1400000, 1550000, 1500000, 1750000],
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 2,
            },
        ],
    }

    const doctorPerformanceData = {
        labels: ["Dr. Aziz", "Dr. Jasur", "Dr. Nilufar", "Dr. Sardor", "Dr. Malika"],
        datasets: [
            {
                label: "Mijozlar soni",
                data: [28, 32, 19, 24, 22],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(255, 206, 86, 0.8)",
                    "rgba(75, 192, 192, 0.8)",
                    "rgba(153, 102, 255, 0.8)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <div className="director-dashboard">
            <h1 className="page-title">Direktor Dashboard</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon-wrapper">
                        <FaUsers className="stat-icon director" />
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.totalStaff}</div>
                        <div className="stat-label">Jami xodimlar</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-wrapper">
                        <FaUserMd className="stat-icon director" />
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.totalDoctors}</div>
                        <div className="stat-label">Shifokorlar</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-wrapper">
                        <FaDoorOpen className="stat-icon director" />
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.totalCabinets}</div>
                        <div className="stat-label">Kabinetlar</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon-wrapper">
                        <FaCalendarAlt className="stat-icon director" />
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.appointmentsToday}</div>
                        <div className="stat-label">Bugungi qabullar</div>
                        <div className="stat-change positive">
                            <FaArrowUp /> {stats.appointmentChange}%
                        </div>
                    </div>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card income">
                    <div className="stat-icon-wrapper">
                        <FaMoneyBillWave className="stat-icon" />
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.totalIncome.toLocaleString()} so'm</div>
                        <div className="stat-label">Jami daromad</div>
                        <div className="stat-change positive">
                            <FaArrowUp /> {stats.incomeChange}%
                        </div>
                    </div>
                </div>

                <div className="stat-card expense">
                    <div className="stat-icon-wrapper">
                        <FaMoneyBillWave className="stat-icon" />
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.totalExpenses.toLocaleString()} so'm</div>
                        <div className="stat-label">Jami xarajat</div>
                        <div className="stat-change negative">
                            <FaArrowUp /> {stats.expenseChange}%
                        </div>
                    </div>
                </div>

                <div className="stat-card profit">
                    <div className="stat-icon-wrapper">
                        <FaMoneyBillWave className="stat-icon" />
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{(stats.totalIncome - stats.totalExpenses).toLocaleString()} so'm</div>
                        <div className="stat-label">Sof foyda</div>
                    </div>
                </div>

                <div className="stat-card patients">
                    <div className="stat-icon-wrapper">
                        <FaUsers className="stat-icon" />
                    </div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.totalPatients}</div>
                        <div className="stat-label">Jami mijozlar</div>
                        <div className="stat-change positive">
                            <FaArrowUp /> {stats.patientChange}%
                        </div>
                    </div>
                </div>
            </div>

            <div className="dashboard-row">
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2>Bugungi qabullar</h2>
                        <button className="btn btn-text">Barchasini ko'rish</button>
                    </div>
                    <div className="table-responsive">
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
                </div>

                <div className="dashboard-card">
                    <div className="card-header">
                        <h2>Yangi qo'shilgan xodimlar</h2>
                        <button className="btn btn-text">Barchasini ko'rish</button>
                    </div>
                    <div className="table-responsive">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Ism</th>
                                    <th>Lavozim</th>
                                    <th>Bo'lim</th>
                                    <th>Sana</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentStaff.map((staff) => (
                                    <tr key={staff.id}>
                                        <td>{staff.name}</td>
                                        <td>{staff.role}</td>
                                        <td>{staff.department}</td>
                                        <td>{staff.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="dashboard-card">
                <div className="card-header">
                    <h2>Bo'limlar samaradorligi</h2>
                    <button className="btn btn-text">Batafsil ma'lumot</button>
                </div>
                <div className="table-responsive">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Bo'lim</th>
                                <th>Mijozlar soni</th>
                                <th>Mijoz mamnuniyati</th>
                                <th>Holat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {performanceData.map((dept) => (
                                <tr key={dept.id}>
                                    <td>{dept.name}</td>
                                    <td>{dept.patients}</td>
                                    <td>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: `${dept.satisfaction}%` }}></div>
                                            <span>{dept.satisfaction}%</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`status-badge ${dept.satisfaction >= 90 ? "high" : "medium"}`}>
                                            {dept.satisfaction >= 90 ? "A'lo" : "Yaxshi"}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Charts Section */}
            <div className="charts-section">
                <div className="dashboard-row">
                    <div className="dashboard-card chart-card">
                        <div className="card-header">
                            <h2>
                                <FaChartPie /> Bo'limlar bo'yicha mijozlar
                            </h2>
                        </div>
                        <div className="chart-container">
                            <Pie
                                data={departmentDistributionData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: "right",
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    <div className="dashboard-card chart-card">
                        <div className="card-header">
                            <h2>
                                <FaChartLine /> Oylik mijozlar dinamikasi
                            </h2>
                        </div>
                        <div className="chart-container">
                            <Line
                                data={monthlyPatientsData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="dashboard-row">
                    <div className="dashboard-card chart-card">
                        <div className="card-header">
                            <h2>
                                <FaChartBar /> Moliyaviy ko'rsatkichlar
                            </h2>
                        </div>
                        <div className="chart-container">
                            <Bar
                                data={financialData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    <div className="dashboard-card chart-card">
                        <div className="card-header">
                            <h2>
                                <FaChartBar /> Shifokorlar samaradorligi
                            </h2>
                        </div>
                        <div className="chart-container">
                            <Bar
                                data={doctorPerformanceData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    indexAxis: "y",
                                    scales: {
                                        x: {
                                            beginAtZero: true,
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};