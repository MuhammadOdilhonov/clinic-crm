import React , { useState, useEffect } from "react"
import {
    FaUserInjured,
    FaClipboardList,
    FaCalendarAlt,
    FaUserNurse,
    FaBed,
    FaThermometerHalf,
    FaHeartbeat,
    FaStethoscope,
    FaPills,
} from "react-icons/fa"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"

export default function NurseDashboard() {
    const { user, selectedBranch } = useAuth()
    const { t } = useLanguage()
    const [loading, setLoading] = useState(true)
    const [stats, setStats] = useState({
        assignedRooms: 5,
        totalPatients: 8,
        criticalPatients: 2,
        tasksToday: 12,
        completedTasks: 5,
        pendingTasks: 7,
    })
    const [assignedRooms, setAssignedRooms] = useState([])
    const [upcomingTasks, setUpcomingTasks] = useState([])

    useEffect(() => {
        setLoading(true)

        // Simulate API call
        setTimeout(() => {
            // Mock assigned rooms data
            const mockRooms = [
                {
                    id: 1,
                    roomNumber: "101",
                    roomType: "standard",
                    patients: [
                        {
                            id: 101,
                            name: "Alisher Karimov",
                            age: 45,
                            gender: "male",
                            diagnosis: "Pneumonia",
                            status: "stable",
                            admissionDate: "2023-05-15",
                            expectedDischargeDate: "2023-05-22",
                            doctorName: "Dr. Aziz Yusupov",
                            vitalSigns: {
                                temperature: "37.2°C",
                                bloodPressure: "125/85",
                                heartRate: "78",
                                respiratoryRate: "16",
                                oxygenSaturation: "96%",
                            },
                            lastChecked: "2023-05-18 08:30",
                        },
                    ],
                },
                {
                    id: 2,
                    roomNumber: "102",
                    roomType: "premium",
                    patients: [
                        {
                            id: 102,
                            name: "Dilnoza Saidova",
                            age: 32,
                            gender: "female",
                            diagnosis: "Post-surgery recovery",
                            status: "critical",
                            admissionDate: "2023-05-16",
                            expectedDischargeDate: "2023-05-23",
                            doctorName: "Dr. Malika Umarova",
                            vitalSigns: {
                                temperature: "38.5°C",
                                bloodPressure: "140/90",
                                heartRate: "95",
                                respiratoryRate: "22",
                                oxygenSaturation: "92%",
                            },
                            lastChecked: "2023-05-18 09:15",
                        },
                    ],
                },
                {
                    id: 4,
                    roomNumber: "201",
                    roomType: "intensive",
                    patients: [
                        {
                            id: 103,
                            name: "Rustam Khasanov",
                            age: 58,
                            gender: "male",
                            diagnosis: "Cardiac monitoring",
                            status: "improving",
                            admissionDate: "2023-05-14",
                            expectedDischargeDate: "2023-05-24",
                            doctorName: "Dr. Kamil Rakhimov",
                            vitalSigns: {
                                temperature: "36.8°C",
                                bloodPressure: "130/80",
                                heartRate: "72",
                                respiratoryRate: "18",
                                oxygenSaturation: "97%",
                            },
                            lastChecked: "2023-05-18 07:45",
                        },
                    ],
                },
                {
                    id: 5,
                    roomNumber: "202",
                    roomType: "standard",
                    patients: [
                        {
                            id: 104,
                            name: "Nodira Azimova",
                            age: 27,
                            gender: "female",
                            diagnosis: "Appendectomy recovery",
                            status: "stable",
                            admissionDate: "2023-05-17",
                            expectedDischargeDate: "2023-05-20",
                            doctorName: "Dr. Jasur Toshmatov",
                            vitalSigns: {
                                temperature: "36.6°C",
                                bloodPressure: "118/75",
                                heartRate: "68",
                                respiratoryRate: "14",
                                oxygenSaturation: "99%",
                            },
                            lastChecked: "2023-05-18 08:00",
                        },
                        {
                            id: 105,
                            name: "Jahongir Tursunov",
                            age: 42,
                            gender: "male",
                            diagnosis: "Fractured leg",
                            status: "stable",
                            admissionDate: "2023-05-16",
                            expectedDischargeDate: "2023-05-26",
                            doctorName: "Dr. Sardor Alimov",
                            vitalSigns: {
                                temperature: "36.7°C",
                                bloodPressure: "122/82",
                                heartRate: "70",
                                respiratoryRate: "15",
                                oxygenSaturation: "98%",
                            },
                            lastChecked: "2023-05-18 08:15",
                        },
                    ],
                },
            ]

            // Mock upcoming tasks
            const mockTasks = [
                {
                    id: 1,
                    patientName: "Dilnoza Saidova",
                    roomNumber: "102",
                    taskType: "medication",
                    description: "Administer pain medication",
                    time: "10:30",
                    priority: "high",
                    status: "pending",
                },
                {
                    id: 2,
                    patientName: "Rustam Khasanov",
                    roomNumber: "201",
                    taskType: "vitals",
                    description: "Check vital signs",
                    time: "11:00",
                    priority: "medium",
                    status: "pending",
                },
                {
                    id: 3,
                    patientName: "Alisher Karimov",
                    roomNumber: "101",
                    taskType: "medication",
                    description: "Administer antibiotics",
                    time: "12:00",
                    priority: "medium",
                    status: "pending",
                },
                {
                    id: 4,
                    patientName: "Nodira Azimova",
                    roomNumber: "202",
                    taskType: "wound",
                    description: "Change wound dressing",
                    time: "13:30",
                    priority: "medium",
                    status: "pending",
                },
                {
                    id: 5,
                    patientName: "Jahongir Tursunov",
                    roomNumber: "202",
                    taskType: "assistance",
                    description: "Assist with physical therapy",
                    time: "14:00",
                    priority: "low",
                    status: "pending",
                },
            ]

            setAssignedRooms(mockRooms)
            setUpcomingTasks(mockTasks)

            // Update stats based on selected branch
            if (selectedBranch === "branch1") {
                setStats({
                    assignedRooms: 3,
                    totalPatients: 4,
                    criticalPatients: 1,
                    tasksToday: 8,
                    completedTasks: 3,
                    pendingTasks: 5,
                })
            } else if (selectedBranch === "branch2") {
                setStats({
                    assignedRooms: 2,
                    totalPatients: 3,
                    criticalPatients: 1,
                    tasksToday: 6,
                    completedTasks: 2,
                    pendingTasks: 4,
                })
            } else if (selectedBranch === "branch3") {
                setStats({
                    assignedRooms: 1,
                    totalPatients: 1,
                    criticalPatients: 0,
                    tasksToday: 3,
                    completedTasks: 1,
                    pendingTasks: 2,
                })
            } else {
                // All branches (default)
                setStats({
                    assignedRooms: 5,
                    totalPatients: 8,
                    criticalPatients: 2,
                    tasksToday: 12,
                    completedTasks: 5,
                    pendingTasks: 7,
                })
            }

            setLoading(false)
        }, 800)
    }, [selectedBranch])

    // Mark task as completed
    const handleCompleteTask = (taskId) => {
        setUpcomingTasks(upcomingTasks.map((task) => (task.id === taskId ? { ...task, status: "completed" } : task)))

        setStats({
            ...stats,
            completedTasks: stats.completedTasks + 1,
            pendingTasks: stats.pendingTasks - 1,
        })
    }

    // Get patient status class
    const getPatientStatusClass = (status) => {
        switch (status) {
            case "critical":
                return "critical"
            case "stable":
                return "stable"
            case "improving":
                return "improving"
            default:
                return ""
        }
    }

    // Get task priority class
    const getTaskPriorityClass = (priority) => {
        switch (priority) {
            case "high":
                return "high-priority"
            case "medium":
                return "medium-priority"
            case "low":
                return "low-priority"
            default:
                return ""
        }
    }

    // Get task icon
    const getTaskIcon = (taskType) => {
        switch (taskType) {
            case "medication":
                return <FaPills />
            case "vitals":
                return <FaHeartbeat />
            case "wound":
                return <FaStethoscope />
            case "assistance":
                return <FaUserNurse />
            default:
                return <FaClipboardList />
        }
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
        <div className="nurse-dashboard">
            <h1 className="page-title">{t("nurse_dashboard")}</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <FaBed className="stat-icon nurse" />
                    <div className="stat-value">{stats.assignedRooms}</div>
                    <div className="stat-label">{t("assigned_rooms")}</div>
                </div>

                <div className="stat-card">
                    <FaUserInjured className="stat-icon nurse" />
                    <div className="stat-value">{stats.totalPatients}</div>
                    <div className="stat-label">{t("total_patients")}</div>
                </div>

                <div className="stat-card">
                    <FaThermometerHalf className="stat-icon nurse critical" />
                    <div className="stat-value">{stats.criticalPatients}</div>
                    <div className="stat-label">{t("critical_patients")}</div>
                </div>

                <div className="stat-card">
                    <FaClipboardList className="stat-icon nurse" />
                    <div className="stat-value">{stats.tasksToday}</div>
                    <div className="stat-label">{t("tasks_today")}</div>
                </div>

                <div className="stat-card">
                    <FaCalendarAlt className="stat-icon nurse" />
                    <div className="stat-value">
                        {stats.completedTasks}/{stats.tasksToday}
                    </div>
                    <div className="stat-label">{t("completed_tasks")}</div>
                </div>
            </div>

            <div className="dashboard-row">
                <div className="dashboard-card">
                    <div className="card-header">
                        <h2>{t("upcoming_tasks")}</h2>
                        <button className="btn btn-sm btn-outline">{t("view_all")}</button>
                    </div>
                    <div className="tasks-list">
                        {upcomingTasks
                            .filter((task) => task.status === "pending")
                            .map((task) => (
                                <div key={task.id} className={`task-card ${getTaskPriorityClass(task.priority)}`}>
                                    <div className="task-header">
                                        <div className="task-time">{task.time}</div>
                                        <div className={`task-priority ${task.priority}-priority`}>{t(task.priority)}</div>
                                    </div>
                                    <div className="task-content">
                                        <div className="task-icon">{getTaskIcon(task.taskType)}</div>
                                        <div className="task-details">
                                            <h3 className="task-title">{task.description}</h3>
                                            <div className="task-patient">
                                                <span className="patient-name">{task.patientName}</span>
                                                <span className="room-number">Room {task.roomNumber}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="task-actions">
                                        <button className="btn btn-primary" onClick={() => handleCompleteTask(task.id)}>
                                            {t("mark_complete")}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        {upcomingTasks.filter((task) => task.status === "pending").length === 0 && (
                            <div className="no-tasks">
                                <p>{t("no_pending_tasks")}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-header">
                        <h2>{t("assigned_patients")}</h2>
                        <button className="btn btn-sm btn-outline">{t("view_all")}</button>
                    </div>
                    <div className="patients-list">
                        {assignedRooms.flatMap((room) =>
                            room.patients.map((patient) => (
                                <div key={patient.id} className={`patient-card ${getPatientStatusClass(patient.status)}`}>
                                    <div className="patient-header">
                                        <h3 className="patient-name">{patient.name}</h3>
                                        <div className={`patient-status ${patient.status}`}>{t(patient.status)}</div>
                                    </div>
                                    <div className="patient-details">
                                        <div className="detail-row">
                                            <span className="detail-label">{t("room")}:</span>
                                            <span>{room.roomNumber}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">{t("age")}:</span>
                                            <span>{patient.age}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">{t("diagnosis")}:</span>
                                            <span>{patient.diagnosis}</span>
                                        </div>
                                        <div className="detail-row">
                                            <span className="detail-label">{t("doctor")}:</span>
                                            <span>{patient.doctorName}</span>
                                        </div>
                                    </div>
                                    <div className="vital-signs">
                                        <h4>{t("vital_signs")}</h4>
                                        <div className="vitals-grid">
                                            <div className="vital-item">
                                                <div className="vital-label">{t("temperature")}</div>
                                                <div className="vital-value">{patient.vitalSigns.temperature}</div>
                                            </div>
                                            <div className="vital-item">
                                                <div className="vital-label">{t("blood_pressure")}</div>
                                                <div className="vital-value">{patient.vitalSigns.bloodPressure}</div>
                                            </div>
                                            <div className="vital-item">
                                                <div className="vital-label">{t("heart_rate")}</div>
                                                <div className="vital-value">{patient.vitalSigns.heartRate}</div>
                                            </div>
                                            <div className="vital-item">
                                                <div className="vital-label">{t("respiratory_rate")}</div>
                                                <div className="vital-value">{patient.vitalSigns.respiratoryRate}</div>
                                            </div>
                                            <div className="vital-item">
                                                <div className="vital-label">{t("oxygen_saturation")}</div>
                                                <div className="vital-value">{patient.vitalSigns.oxygenSaturation}</div>
                                            </div>
                                        </div>
                                        <div className="last-checked">
                                            {t("last_checked")}: {patient.lastChecked}
                                        </div>
                                    </div>
                                    <div className="patient-actions">
                                        <button className="btn btn-primary">{t("record_vitals")}</button>
                                        <button className="btn btn-secondary">{t("view_details")}</button>
                                    </div>
                                </div>
                            )),
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};