import React , { useState, useEffect } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import {
    FaSearch,
    FaFilter,
    FaUserInjured,
    FaUserNurse,
    FaBed,
    FaClipboardCheck,
    FaExclamationTriangle,
    FaThermometerHalf,
    FaHeartbeat,
    FaPills,
    FaHistory,
    FaCalendarDay,
    FaCheckCircle,
    FaTimesCircle,
} from "react-icons/fa"

export default function NurseRooms() {
    const { user, selectedBranch } = useAuth()
    const { t } = useLanguage()
    const [activeTab, setActiveTab] = useState("assigned")
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [showPatientModal, setShowPatientModal] = useState(false)
    const [showTaskModal, setShowTaskModal] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [selectedTask, setSelectedTask] = useState(null)
    const [rooms, setRooms] = useState([])
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch rooms and tasks data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                // In a real app, these would be API calls
                // Simulating API calls with setTimeout
                setTimeout(() => {
                    // Mock rooms data
                    const mockRooms = [
                        {
                            id: 1,
                            roomNumber: "101",
                            roomType: "standard",
                            floor: "1",
                            patients: [
                                {
                                    id: 101,
                                    name: "Alisher Karimov",
                                    age: 45,
                                    gender: "male",
                                    diagnosis: "Pneumonia",
                                    admissionDate: "2023-05-15",
                                    expectedDischargeDate: "2023-05-22",
                                    doctorId: 3,
                                    doctorName: "Dr. Aziz Yusupov",
                                    nurseId: user.id,
                                    nurseName: user.name,
                                    status: "stable",
                                    vitalSigns: {
                                        temperature: 37.2,
                                        bloodPressure: "125/85",
                                        heartRate: 78,
                                        respiratoryRate: 16,
                                        oxygenSaturation: 96,
                                    },
                                    medications: [
                                        { name: "Amoxicillin", dosage: "500mg", frequency: "3 times daily", time: "08:00, 14:00, 20:00" },
                                        { name: "Paracetamol", dosage: "500mg", frequency: "as needed", time: "if temperature > 38°C" },
                                    ],
                                    notes: "Patient is responding well to antibiotics. Continue monitoring temperature.",
                                },
                            ],
                        },
                        {
                            id: 2,
                            roomNumber: "102",
                            roomType: "premium",
                            floor: "1",
                            patients: [
                                {
                                    id: 102,
                                    name: "Dilnoza Saidova",
                                    age: 32,
                                    gender: "female",
                                    diagnosis: "Post-surgery recovery",
                                    admissionDate: "2023-05-16",
                                    expectedDischargeDate: "2023-05-23",
                                    doctorId: 4,
                                    doctorName: "Dr. Malika Umarova",
                                    nurseId: user.id,
                                    nurseName: user.name,
                                    status: "critical",
                                    vitalSigns: {
                                        temperature: 38.5,
                                        bloodPressure: "140/90",
                                        heartRate: 92,
                                        respiratoryRate: 20,
                                        oxygenSaturation: 94,
                                    },
                                    medications: [
                                        { name: "Morphine", dosage: "5mg", frequency: "every 6 hours", time: "06:00, 12:00, 18:00, 00:00" },
                                        { name: "Ceftriaxone", dosage: "1g", frequency: "twice daily", time: "08:00, 20:00" },
                                    ],
                                    notes: "Patient experiencing post-operative pain. Monitor vital signs closely.",
                                },
                            ],
                        },
                        {
                            id: 4,
                            roomNumber: "201",
                            roomType: "intensive",
                            floor: "2",
                            patients: [
                                {
                                    id: 103,
                                    name: "Rustam Khasanov",
                                    age: 58,
                                    gender: "male",
                                    diagnosis: "Cardiac monitoring",
                                    admissionDate: "2023-05-14",
                                    expectedDischargeDate: "2023-05-24",
                                    doctorId: 2,
                                    doctorName: "Dr. Kamil Rakhimov",
                                    nurseId: 7,
                                    nurseName: "Zarina Kamalova",
                                    status: "improving",
                                    vitalSigns: {
                                        temperature: 36.8,
                                        bloodPressure: "130/80",
                                        heartRate: 75,
                                        respiratoryRate: 15,
                                        oxygenSaturation: 97,
                                    },
                                    medications: [
                                        { name: "Atorvastatin", dosage: "20mg", frequency: "once daily", time: "20:00" },
                                        { name: "Aspirin", dosage: "81mg", frequency: "once daily", time: "08:00" },
                                    ],
                                    notes: "Cardiac function improving. Continue current treatment plan.",
                                },
                            ],
                        },
                    ]

                    // Mock tasks data
                    const mockTasks = [
                        {
                            id: 1,
                            patientId: 101,
                            patientName: "Alisher Karimov",
                            roomNumber: "101",
                            type: "medication",
                            description: "Administer Amoxicillin 500mg",
                            scheduledTime: "14:00",
                            status: "pending",
                            priority: "medium",
                        },
                        {
                            id: 2,
                            patientId: 102,
                            patientName: "Dilnoza Saidova",
                            roomNumber: "102",
                            type: "vitals",
                            description: "Check vital signs",
                            scheduledTime: "15:00",
                            status: "pending",
                            priority: "high",
                        },
                        {
                            id: 3,
                            patientId: 101,
                            patientName: "Alisher Karimov",
                            roomNumber: "101",
                            type: "medication",
                            description: "Administer Paracetamol 500mg if needed",
                            scheduledTime: "16:00",
                            status: "pending",
                            priority: "low",
                        },
                        {
                            id: 4,
                            patientId: 102,
                            patientName: "Dilnoza Saidova",
                            roomNumber: "102",
                            type: "medication",
                            description: "Administer Morphine 5mg",
                            scheduledTime: "12:00",
                            status: "completed",
                            priority: "high",
                            completedAt: "12:05",
                            completedBy: user.name,
                        },
                    ]

                    setRooms(mockRooms)
                    setTasks(mockTasks)
                    setLoading(false)
                }, 800)
            } catch (err) {
                setError(err.message || "An error occurred")
                setLoading(false)
            }
        }

        fetchData()
    }, [user.id, user.name])

    // Filter rooms based on search term and assigned nurse
    const filteredRooms = rooms.filter((room) => {
        // Filter by search term
        const matchesSearch =
            room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            room.patients.some(
                (patient) =>
                    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
            )

        // Filter by assigned nurse in "assigned" tab
        const isAssigned =
            activeTab === "all" || (activeTab === "assigned" && room.patients.some((patient) => patient.nurseId === user.id))

        // Filter by patient status if filter is applied
        const matchesFilter = filterStatus === "all" || room.patients.some((patient) => patient.status === filterStatus)

        return matchesSearch && isAssigned && matchesFilter
    })

    // Filter tasks based on status
    const pendingTasks = tasks.filter((task) => task.status === "pending")
    const completedTasks = tasks.filter((task) => task.status === "completed")

    // Open patient details modal
    const openPatientModal = (patient) => {
        setSelectedPatient(patient)
        setShowPatientModal(true)
    }

    // Open task details modal
    const openTaskModal = (task) => {
        setSelectedTask(task)
        setShowTaskModal(true)
    }

    // Complete a task
    const completeTask = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId
                    ? {
                        ...task,
                        status: "completed",
                        completedAt: new Date().toLocaleTimeString(),
                        completedBy: user.name,
                    }
                    : task,
            ),
        )

        if (showTaskModal && selectedTask?.id === taskId) {
            setSelectedTask({
                ...selectedTask,
                status: "completed",
                completedAt: new Date().toLocaleTimeString(),
                completedBy: user.name,
            })
        }
    }

    // Get patient status label and color
    const getPatientStatusInfo = (status) => {
        switch (status) {
            case "critical":
                return { label: t("critical"), color: "#e74c3c", icon: <FaExclamationTriangle /> }
            case "stable":
                return { label: t("stable"), color: "#2ecc71", icon: <FaHeartbeat /> }
            case "improving":
                return { label: t("improving"), color: "#3498db", icon: <FaCheckCircle /> }
            case "deteriorating":
                return { label: t("deteriorating"), color: "#e67e22", icon: <FaTimesCircle /> }
            default:
                return { label: status, color: "#7f8c8d", icon: null }
        }
    }

    // Get task type icon
    const getTaskTypeIcon = (type) => {
        switch (type) {
            case "medication":
                return <FaPills />
            case "vitals":
                return <FaHeartbeat />
            case "checkup":
                return <FaClipboardCheck />
            default:
                return null
        }
    }

    // Loading state
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>{t("loading")}...</p>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className="error-container">
                <FaExclamationTriangle className="error-icon" />
                <h2>{t("error_occurred")}</h2>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={() => window.location.reload()}>
                    {t("try_again")}
                </button>
            </div>
        )
    }

    return (
        <div className="nurse-rooms">
            <div className="page-header">
                <h1>
                    <FaBed /> {t("inpatient_rooms")}
                </h1>
                <div className="header-actions">
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder={t("search_rooms_patients")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-dropdown">
                        <FaFilter />
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                            <option value="all">{t("all_patients")}</option>
                            <option value="critical">{t("critical_patients")}</option>
                            <option value="stable">{t("stable_patients")}</option>
                            <option value="improving">{t("improving_patients")}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="content-tabs">
                <button className={`tab ${activeTab === "assigned" ? "active" : ""}`} onClick={() => setActiveTab("assigned")}>
                    <FaUserNurse /> {t("my_assigned_rooms")}
                </button>
                <button className={`tab ${activeTab === "all" ? "active" : ""}`} onClick={() => setActiveTab("all")}>
                    <FaBed /> {t("all_rooms")}
                </button>
                <button className={`tab ${activeTab === "tasks" ? "active" : ""}`} onClick={() => setActiveTab("tasks")}>
                    <FaClipboardCheck /> {t("tasks")}
                    {pendingTasks.length > 0 && <span className="badge">{pendingTasks.length}</span>}
                </button>
            </div>

            {/* Rooms View */}
            {(activeTab === "assigned" || activeTab === "all") && (
                <div className="rooms-grid">
                    {filteredRooms.length > 0 ? (
                        filteredRooms.map((room) => (
                            <div
                                key={room.id}
                                className={`room-card ${room.patients.some((p) => p.status === "critical") ? "critical" : ""}`}
                            >
                                <div className="room-header">
                                    <h3>
                                        {t("room")} {room.roomNumber}
                                    </h3>
                                    <span className="room-type">{t(room.roomType + "_room")}</span>
                                </div>

                                {room.patients.length > 0 ? (
                                    <div className="patients-list">
                                        {room.patients.map((patient) => {
                                            const statusInfo = getPatientStatusInfo(patient.status)

                                            return (
                                                <div key={patient.id} className="patient-card">
                                                    <div className="patient-header">
                                                        <h4>{patient.name}</h4>
                                                        <div
                                                            className="patient-status"
                                                            style={{ backgroundColor: statusInfo.color + "20", color: statusInfo.color }}
                                                        >
                                                            {statusInfo.icon} {statusInfo.label}
                                                        </div>
                                                    </div>

                                                    <div className="patient-info">
                                                        <div className="info-row">
                                                            <span className="info-label">{t("age")}:</span>
                                                            <span>{patient.age}</span>
                                                        </div>
                                                        <div className="info-row">
                                                            <span className="info-label">{t("diagnosis")}:</span>
                                                            <span>{patient.diagnosis}</span>
                                                        </div>
                                                        <div className="info-row">
                                                            <span className="info-label">{t("doctor")}:</span>
                                                            <span>{patient.doctorName}</span>
                                                        </div>

                                                        <div className="vital-signs">
                                                            <div className="vital-sign">
                                                                <FaThermometerHalf />
                                                                <span>{patient.vitalSigns.temperature}°C</span>
                                                            </div>
                                                            <div className="vital-sign">
                                                                <FaHeartbeat />
                                                                <span>{patient.vitalSigns.heartRate} bpm</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="patient-actions">
                                                        <button className="btn btn-primary" onClick={() => openPatientModal(patient)}>
                                                            {t("view_details")}
                                                        </button>

                                                        {patient.nurseId === user.id && (
                                                            <button className="btn btn-outline">{t("record_vitals")}</button>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                ) : (
                                    <div className="empty-room">
                                        <p>{t("no_patients_in_room")}</p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <FaBed className="no-results-icon" />
                            <h3>{t("no_rooms_found")}</h3>
                            <p>{t("try_different_search")}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Tasks View */}
            {activeTab === "tasks" && (
                <div className="tasks-container">
                    <div className="tasks-section">
                        <h2>
                            {t("pending_tasks")} ({pendingTasks.length})
                        </h2>

                        {pendingTasks.length > 0 ? (
                            <div className="tasks-list">
                                {pendingTasks.map((task) => (
                                    <div key={task.id} className={`task-card priority-${task.priority}`}>
                                        <div className="task-icon">{getTaskTypeIcon(task.type)}</div>

                                        <div className="task-content">
                                            <div className="task-header">
                                                <h4>{task.description}</h4>
                                                <span className="task-time">
                                                    <FaCalendarDay /> {task.scheduledTime}
                                                </span>
                                            </div>

                                            <div className="task-details">
                                                <span className="task-patient">
                                                    <FaUserInjured /> {task.patientName}
                                                </span>
                                                <span className="task-room">
                                                    <FaBed /> {t("room")} {task.roomNumber}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="task-actions">
                                            <button className="btn btn-sm btn-outline" onClick={() => openTaskModal(task)}>
                                                {t("details")}
                                            </button>
                                            <button className="btn btn-sm btn-primary" onClick={() => completeTask(task.id)}>
                                                {t("complete")}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-tasks">
                                <FaCheckCircle className="no-tasks-icon" />
                                <p>{t("no_pending_tasks")}</p>
                            </div>
                        )}
                    </div>

                    <div className="tasks-section">
                        <h2>
                            {t("completed_tasks")} ({completedTasks.length})
                        </h2>

                        {completedTasks.length > 0 ? (
                            <div className="tasks-list completed">
                                {completedTasks.map((task) => (
                                    <div key={task.id} className="task-card completed">
                                        <div className="task-icon">{getTaskTypeIcon(task.type)}</div>

                                        <div className="task-content">
                                            <div className="task-header">
                                                <h4>{task.description}</h4>
                                                <span className="task-time">
                                                    <FaHistory /> {task.completedAt}
                                                </span>
                                            </div>

                                            <div className="task-details">
                                                <span className="task-patient">
                                                    <FaUserInjured /> {task.patientName}
                                                </span>
                                                <span className="task-room">
                                                    <FaBed /> {t("room")} {task.roomNumber}
                                                </span>
                                            </div>

                                            <div className="task-completion">
                                                <FaCheckCircle /> {t("completed_by")} {task.completedBy}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-tasks">
                                <FaHistory className="no-tasks-icon" />
                                <p>{t("no_completed_tasks")}</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Patient Details Modal */}
            {showPatientModal && selectedPatient && (
                <div className="modal-overlay">
                    <div className="modal patient-modal">
                        <div className="modal-header">
                            <h3>{selectedPatient.name}</h3>
                            <button className="close-btn" onClick={() => setShowPatientModal(false)}>
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="patient-details">
                                <div className="details-section">
                                    <h4>{t("patient_information")}</h4>

                                    <div className="details-grid">
                                        <div className="detail-item">
                                            <span className="detail-label">{t("age")}:</span>
                                            <span>{selectedPatient.age}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">{t("gender")}:</span>
                                            <span>{t(selectedPatient.gender)}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">{t("diagnosis")}:</span>
                                            <span>{selectedPatient.diagnosis}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">{t("admission_date")}:</span>
                                            <span>{selectedPatient.admissionDate}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">{t("expected_discharge")}:</span>
                                            <span>{selectedPatient.expectedDischargeDate}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">{t("doctor")}:</span>
                                            <span>{selectedPatient.doctorName}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="details-section">
                                    <h4>{t("vital_signs")}</h4>

                                    <div className="vitals-grid">
                                        <div className="vital-item">
                                            <div className="vital-icon">
                                                <FaThermometerHalf />
                                            </div>
                                            <div className="vital-value">{selectedPatient.vitalSigns.temperature}°C</div>
                                            <div className="vital-label">{t("temperature")}</div>
                                        </div>
                                        <div className="vital-item">
                                            <div className="vital-icon">
                                                <FaHeartbeat />
                                            </div>
                                            <div className="vital-value">{selectedPatient.vitalSigns.heartRate}</div>
                                            <div className="vital-label">{t("heart_rate")}</div>
                                        </div>
                                        <div className="vital-item">
                                            <div className="vital-value">{selectedPatient.vitalSigns.bloodPressure}</div>
                                            <div className="vital-label">{t("blood_pressure")}</div>
                                        </div>
                                        <div className="vital-item">
                                            <div className="vital-value">{selectedPatient.vitalSigns.respiratoryRate}</div>
                                            <div className="vital-label">{t("respiratory_rate")}</div>
                                        </div>
                                        <div className="vital-item">
                                            <div className="vital-value">{selectedPatient.vitalSigns.oxygenSaturation}%</div>
                                            <div className="vital-label">{t("oxygen_saturation")}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="details-section">
                                    <h4>{t("medications")}</h4>

                                    <table className="medications-table">
                                        <thead>
                                            <tr>
                                                <th>{t("medication")}</th>
                                                <th>{t("dosage")}</th>
                                                <th>{t("frequency")}</th>
                                                <th>{t("time")}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedPatient.medications.map((med, index) => (
                                                <tr key={index}>
                                                    <td>{med.name}</td>
                                                    <td>{med.dosage}</td>
                                                    <td>{med.frequency}</td>
                                                    <td>{med.time}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="details-section">
                                    <h4>{t("notes")}</h4>
                                    <p className="patient-notes">{selectedPatient.notes}</p>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowPatientModal(false)}>
                                {t("close")}
                            </button>
                            <button className="btn btn-primary">{t("record_vitals")}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Task Details Modal */}
            {showTaskModal && selectedTask && (
                <div className="modal-overlay">
                    <div className="modal task-modal">
                        <div className="modal-header">
                            <h3>{t("task_details")}</h3>
                            <button className="close-btn" onClick={() => setShowTaskModal(false)}>
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="task-details">
                                <div className="details-section">
                                    <h4>{t("task_information")}</h4>

                                    <div className="details-grid">
                                        <div className="detail-item">
                                            <span className="detail-label">{t("description")}:</span>
                                            <span>{selectedTask.description}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">{t("type")}:</span>
                                            <span>{t(selectedTask.type)}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">{t("scheduled_time")}:</span>
                                            <span>{selectedTask.scheduledTime}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">{t("priority")}:</span>
                                            <span className={`priority-badge ${selectedTask.priority}`}>{t(selectedTask.priority)}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">{t("status")}:</span>
                                            <span className={`status-badge ${selectedTask.status}`}>{t(selectedTask.status)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="details-section">
                                    <h4>{t("patient_information")}</h4>

                                    <div className="details-grid">
                                        <div className="detail-item">
                                            <span className="detail-label">{t("patient")}:</span>
                                            <span>{selectedTask.patientName}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">{t("room")}:</span>
                                            <span>{selectedTask.roomNumber}</span>
                                        </div>
                                    </div>
                                </div>

                                {selectedTask.status === "completed" && (
                                    <div className="details-section">
                                        <h4>{t("completion_details")}</h4>

                                        <div className="details-grid">
                                            <div className="detail-item">
                                                <span className="detail-label">{t("completed_at")}:</span>
                                                <span>{selectedTask.completedAt}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span className="detail-label">{t("completed_by")}:</span>
                                                <span>{selectedTask.completedBy}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowTaskModal(false)}>
                                {t("close")}
                            </button>

                            {selectedTask.status === "pending" && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        completeTask(selectedTask.id)
                                        setTimeout(() => setShowTaskModal(false), 1000)
                                    }}
                                >
                                    {t("mark_as_completed")}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};