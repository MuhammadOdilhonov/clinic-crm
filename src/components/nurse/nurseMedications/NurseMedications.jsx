"use client"

import { useState, useEffect } from "react"
import {
    FaPills,
    FaSearch,
    FaUserNurse,
    FaCalendarAlt,
    FaClipboardCheck,
    FaHistory,
    FaPlus,
    FaCheck,
    FaTimes,
    FaInfoCircle,
    FaUser,
    FaHospital,
    FaUserMd,
    FaExclamationTriangle,
    FaEye,
} from "react-icons/fa"
import { MdMedication, MdOutlineNotifications } from "react-icons/md"
import { TbPill } from "react-icons/tb"

const NurseMedications = () => {
    const [patients, setPatients] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [activeTab, setActiveTab] = useState("schedule")
    const [loading, setLoading] = useState(true)
    const [showAddForm, setShowAddForm] = useState(false)
    const [showPatientModal, setShowPatientModal] = useState(false)
    const [showMedicationModal, setShowMedicationModal] = useState(false)
    const [selectedMedication, setSelectedMedication] = useState(null)
    const [newMedication, setNewMedication] = useState({
        name: "",
        dosage: "",
        frequency: "",
        route: "",
        startDate: "",
        endDate: "",
        instructions: "",
    })
    const [upcomingMedications, setUpcomingMedications] = useState([])
    const [currentTime, setCurrentTime] = useState(new Date())

    // Mock data for demonstration
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            const mockPatients = [
                {
                    id: 1,
                    name: "Aziza Karimova",
                    age: 45,
                    room: "203-A",
                    diagnosis: "Pnevmoniya",
                    doctor: "Dr. Aliyev",
                    medications: [
                        {
                            id: 1,
                            name: "Amoksitsillin",
                            dosage: "500mg",
                            frequency: "Kuniga 3 mahal",
                            route: "Og'iz orqali",
                            startDate: "2023-05-15",
                            endDate: "2023-05-22",
                            instructions: "Ovqatdan keyin qabul qilish",
                            schedule: [
                                { time: "08:00", status: "completed", givenAt: "2023-05-15 08:05", nurse: "Hamshira Sobirova" },
                                { time: "14:00", status: "completed", givenAt: "2023-05-15 14:10", nurse: "Hamshira Sobirova" },
                                { time: "20:00", status: "scheduled" },
                            ],
                        },
                        {
                            id: 2,
                            name: "Paratsetamol",
                            dosage: "500mg",
                            frequency: "Harorat ko'tarilganda",
                            route: "Og'iz orqali",
                            startDate: "2023-05-15",
                            endDate: "2023-05-20",
                            instructions: "Harorat 38°C dan oshganda berish",
                            schedule: [
                                { time: "10:30", status: "completed", givenAt: "2023-05-15 10:35", nurse: "Hamshira Sobirova" },
                            ],
                        },
                    ],
                    medicationHistory: [
                        {
                            date: "2023-05-15 08:05",
                            medication: "Amoksitsillin 500mg",
                            nurse: "Hamshira Sobirova",
                            notes: "Bemorga berildi, muammosiz qabul qildi",
                        },
                        {
                            date: "2023-05-15 10:35",
                            medication: "Paratsetamol 500mg",
                            nurse: "Hamshira Sobirova",
                            notes: "Harorat 38.2°C bo'lgani uchun berildi",
                        },
                        {
                            date: "2023-05-15 14:10",
                            medication: "Amoksitsillin 500mg",
                            nurse: "Hamshira Sobirova",
                            notes: "Bemorga berildi",
                        },
                    ],
                },
                {
                    id: 2,
                    name: "Bobur Rasulov",
                    age: 32,
                    room: "105-B",
                    diagnosis: "Appenditsit operatsiyasidan keyin",
                    doctor: "Dr. Karimov",
                    medications: [
                        {
                            id: 1,
                            name: "Tramadol",
                            dosage: "50mg",
                            frequency: "Har 6 soatda",
                            route: "Og'iz orqali",
                            startDate: "2023-05-14",
                            endDate: "2023-05-16",
                            instructions: "Og'riq kuchli bo'lganda berish",
                            schedule: [
                                { time: "06:00", status: "completed", givenAt: "2023-05-15 06:05", nurse: "Hamshira Rahimova" },
                                { time: "12:00", status: "completed", givenAt: "2023-05-15 12:10", nurse: "Hamshira Karimova" },
                                { time: "18:00", status: "scheduled" },
                                { time: "00:00", status: "scheduled" },
                            ],
                        },
                        {
                            id: 2,
                            name: "Sefazolin",
                            dosage: "1g",
                            frequency: "Kuniga 2 mahal",
                            route: "Vena ichiga",
                            startDate: "2023-05-14",
                            endDate: "2023-05-17",
                            instructions: "Sekin yuborish",
                            schedule: [
                                { time: "09:00", status: "completed", givenAt: "2023-05-15 09:05", nurse: "Hamshira Karimova" },
                                { time: "21:00", status: "scheduled" },
                            ],
                        },
                    ],
                    medicationHistory: [
                        {
                            date: "2023-05-14 09:05",
                            medication: "Sefazolin 1g",
                            nurse: "Hamshira Rahimova",
                            notes: "Vena ichiga yuborildi",
                        },
                        {
                            date: "2023-05-14 12:10",
                            medication: "Tramadol 50mg",
                            nurse: "Hamshira Rahimova",
                            notes: "Og'riq shikoyati bo'lgani uchun berildi",
                        },
                        {
                            date: "2023-05-14 18:05",
                            medication: "Tramadol 50mg",
                            nurse: "Hamshira Karimova",
                            notes: "Bemorga berildi",
                        },
                        {
                            date: "2023-05-14 21:05",
                            medication: "Sefazolin 1g",
                            nurse: "Hamshira Karimova",
                            notes: "Vena ichiga yuborildi",
                        },
                        {
                            date: "2023-05-15 06:05",
                            medication: "Tramadol 50mg",
                            nurse: "Hamshira Rahimova",
                            notes: "Bemorga berildi",
                        },
                        {
                            date: "2023-05-15 09:05",
                            medication: "Sefazolin 1g",
                            nurse: "Hamshira Karimova",
                            notes: "Vena ichiga yuborildi",
                        },
                        {
                            date: "2023-05-15 12:10",
                            medication: "Tramadol 50mg",
                            nurse: "Hamshira Karimova",
                            notes: "Bemorga berildi",
                        },
                    ],
                },
                {
                    id: 3,
                    name: "Gulnora Saidova",
                    age: 68,
                    room: "301-C",
                    diagnosis: "Yurak ishemik kasalligi",
                    doctor: "Dr. Mahmudov",
                    medications: [
                        {
                            id: 1,
                            name: "Enalapril",
                            dosage: "10mg",
                            frequency: "Kuniga 2 mahal",
                            route: "Og'iz orqali",
                            startDate: "2023-05-13",
                            endDate: "2023-05-20",
                            instructions: "Ertalab va kechqurun berish",
                            schedule: [
                                { time: "08:00", status: "completed", givenAt: "2023-05-15 08:05", nurse: "Hamshira Rahimova" },
                                { time: "20:00", status: "scheduled" },
                            ],
                        },
                        {
                            id: 2,
                            name: "Aspirin",
                            dosage: "100mg",
                            frequency: "Kuniga 1 mahal",
                            route: "Og'iz orqali",
                            startDate: "2023-05-13",
                            endDate: "2023-05-30",
                            instructions: "Ertalab nonushtadan keyin berish",
                            schedule: [
                                { time: "09:00", status: "completed", givenAt: "2023-05-15 09:05", nurse: "Hamshira Rahimova" },
                            ],
                        },
                        {
                            id: 3,
                            name: "Furosemid",
                            dosage: "40mg",
                            frequency: "Kuniga 1 mahal",
                            route: "Og'iz orqali",
                            startDate: "2023-05-13",
                            endDate: "2023-05-18",
                            instructions: "Ertalab berish",
                            schedule: [
                                { time: "07:00", status: "completed", givenAt: "2023-05-15 07:05", nurse: "Hamshira Rahimova" },
                            ],
                        },
                    ],
                    medicationHistory: [
                        {
                            date: "2023-05-13 07:05",
                            medication: "Furosemid 40mg",
                            nurse: "Hamshira Karimova",
                            notes: "Bemorga berildi",
                        },
                        {
                            date: "2023-05-13 08:05",
                            medication: "Enalapril 10mg",
                            nurse: "Hamshira Karimova",
                            notes: "Bemorga berildi",
                        },
                        {
                            date: "2023-05-13 09:05",
                            medication: "Aspirin 100mg",
                            nurse: "Hamshira Karimova",
                            notes: "Bemorga berildi",
                        },
                        {
                            date: "2023-05-13 20:05",
                            medication: "Enalapril 10mg",
                            nurse: "Hamshira Sobirova",
                            notes: "Bemorga berildi",
                        },
                        {
                            date: "2023-05-14 07:05",
                            medication: "Furosemid 40mg",
                            nurse: "Hamshira Rahimova",
                            notes: "Bemorga berildi",
                        },
                        {
                            date: "2023-05-14 08:05",
                            medication: "Enalapril 10mg",
                            nurse: "Hamshira Rahimova",
                            notes: "Bemorga berildi",
                        },
                        {
                            date: "2023-05-14 09:05",
                            medication: "Aspirin 100mg",
                            nurse: "Hamshira Rahimova",
                            notes: "Bemorga berildi",
                        },
                        {
                            date: "2023-05-14 20:05",
                            medication: "Enalapril 10mg",
                            nurse: "Hamshira Sobirova",
                            notes: "Bemorga berildi",
                        },
                        {
                            date: "2023-05-15 07:05",
                            medication: "Furosemid 40mg",
                            nurse: "Hamshira Rahimova",
                            notes: "Bemorga berildi",
                        },
                        {
                            date: "2023-05-15 08:05",
                            medication: "Enalapril 10mg",
                            nurse: "Hamshira Rahimova",
                            notes: "Bemorga berildi",
                        },
                        {
                            date: "2023-05-15 09:05",
                            medication: "Aspirin 100mg",
                            nurse: "Hamshira Rahimova",
                            notes: "Bemorga berildi",
                        },
                    ],
                },
            ]

            setPatients(mockPatients)
            setLoading(false)

            // Calculate upcoming medications
            const upcoming = []
            mockPatients.forEach((patient) => {
                patient.medications.forEach((medication) => {
                    medication.schedule.forEach((schedule) => {
                        if (schedule.status === "scheduled") {
                            upcoming.push({
                                patientId: patient.id,
                                patientName: patient.name,
                                room: patient.room,
                                medicationId: medication.id,
                                medicationName: medication.name,
                                dosage: medication.dosage,
                                time: schedule.time,
                                instructions: medication.instructions,
                            })
                        }
                    })
                })
            })

            // Sort by time
            upcoming.sort((a, b) => {
                const timeA = new Date()
                const [hoursA, minutesA] = a.time.split(":")
                timeA.setHours(Number.parseInt(hoursA, 10), Number.parseInt(minutesA, 10), 0, 0)

                const timeB = new Date()
                const [hoursB, minutesB] = b.time.split(":")
                timeB.setHours(Number.parseInt(hoursB, 10), Number.parseInt(minutesB, 10), 0, 0)

                return timeA - timeB
            })

            setUpcomingMedications(upcoming)
        }, 1000)

        // Update current time every minute
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 60000)

        return () => clearInterval(timer)
    }, [])

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient)
        setShowPatientModal(true)
        setActiveTab("schedule")
        setShowAddForm(false)
    }

    const handleMedicationSelect = (medication) => {
        setSelectedMedication(medication)
        setShowMedicationModal(true)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewMedication((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleAddMedication = (e) => {
        e.preventDefault()

        // In a real app, you would send this to an API
        // For now, we'll just update the local state
        const newMedicationObj = {
            id: Date.now(),
            ...newMedication,
            schedule: [],
        }

        // Update the patient's medications
        const updatedPatient = {
            ...selectedPatient,
            medications: [...selectedPatient.medications, newMedicationObj],
        }

        // Update the patients array
        const updatedPatients = patients.map((p) => (p.id === selectedPatient.id ? updatedPatient : p))

        setPatients(updatedPatients)
        setSelectedPatient(updatedPatient)
        setShowAddForm(false)
        setNewMedication({
            name: "",
            dosage: "",
            frequency: "",
            route: "",
            startDate: "",
            endDate: "",
            instructions: "",
        })
    }

    const handleMedicationGiven = (patientId, medicationId, scheduleTime) => {
        // Find the patient
        const patient = patients.find((p) => p.id === patientId)
        if (!patient) return

        // Find the medication
        const medication = patient.medications.find((m) => m.id === medicationId)
        if (!medication) return

        // Find the schedule
        const scheduleIndex = medication.schedule.findIndex((s) => s.time === scheduleTime)
        if (scheduleIndex === -1) return

        // Update the schedule
        const now = new Date()
        const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        const currentDateString = now.toISOString().split("T")[0]

        medication.schedule[scheduleIndex] = {
            ...medication.schedule[scheduleIndex],
            status: "completed",
            givenAt: `${currentDateString} ${timeString}`,
            nurse: "Hamshira Sobirova", // This would come from the logged-in user
        }

        // Add to medication history
        const historyEntry = {
            date: `${currentDateString} ${timeString}`,
            medication: `${medication.name} ${medication.dosage}`,
            nurse: "Hamshira Sobirova",
            notes: "Bemorga berildi",
        }

        patient.medicationHistory.unshift(historyEntry)

        // Update the patients array
        const updatedPatients = patients.map((p) => (p.id === patientId ? { ...patient } : p))

        setPatients(updatedPatients)

        // If the selected patient is the one we updated, update that too
        if (selectedPatient && selectedPatient.id === patientId) {
            setSelectedPatient({ ...patient })
        }

        // Update upcoming medications
        const updatedUpcoming = upcomingMedications.filter(
            (um) => !(um.patientId === patientId && um.medicationId === medicationId && um.time === scheduleTime),
        )
        setUpcomingMedications(updatedUpcoming)
    }

    const filteredPatients = patients.filter(
        (patient) =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Format time for display
    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(":")
        return `${hours}:${minutes}`
    }

    // Check if a medication is due soon (within 30 minutes)
    const isDueSoon = (timeString) => {
        const [hours, minutes] = timeString.split(":")
        const medicationTime = new Date()
        medicationTime.setHours(Number.parseInt(hours, 10), Number.parseInt(minutes, 10), 0, 0)

        const timeDiff = medicationTime - currentTime
        return timeDiff > 0 && timeDiff <= 30 * 60 * 1000 // 30 minutes in milliseconds
    }

    return (
        <div className="nurse-medications">
            <div className="medications-header">
                <div className="medications-title">
                    <FaPills />
                    <h1>Dori-darmonlar</h1>
                </div>
                <div className="medications-search">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Bemor nomi, xona yoki tashxis bo'yicha qidirish..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="medications-content">
                <div className="patients-list">
                    <h2>Bemorlar ro'yxati</h2>
                    {loading ? (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                            <p>Ma'lumotlar yuklanmoqda...</p>
                        </div>
                    ) : (
                        <>
                            {filteredPatients.length === 0 ? (
                                <div className="no-patients">
                                    <p>Bemorlar topilmadi</p>
                                </div>
                            ) : (
                                <ul>
                                    {filteredPatients.map((patient) => (
                                        <li key={patient.id} onClick={() => handlePatientSelect(patient)}>
                                            <div className="patient-info">
                                                <h3>{patient.name}</h3>
                                                <div className="patient-details">
                                                    <span>
                                                        <strong>Xona:</strong> {patient.room}
                                                    </span>
                                                    <span>
                                                        <strong>Tashxis:</strong> {patient.diagnosis}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="medication-count">
                                                <span>{patient.medications.length} dori</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}
                </div>

                <div className="medications-details">
                    <div className="upcoming-medications">
                        <div className="upcoming-header">
                            <MdOutlineNotifications className="icon" />
                            <h2>Yaqinlashib kelayotgan dori berish vaqtlari</h2>
                        </div>

                        {upcomingMedications.length === 0 ? (
                            <div className="no-upcoming">
                                <p>Hozirda rejalashtirilgan dorilar yo'q</p>
                            </div>
                        ) : (
                            <div className="upcoming-list">
                                {upcomingMedications.map((medication, index) => (
                                    <div
                                        key={index}
                                        className={`upcoming-item ${isDueSoon(medication.time) ? "due-soon" : ""}`}
                                        onClick={() => {
                                            const patient = patients.find((p) => p.id === medication.patientId)
                                            if (patient) handlePatientSelect(patient)
                                        }}
                                    >
                                        <div className="upcoming-time">
                                            <FaClipboardCheck />
                                            <span>{formatTime(medication.time)}</span>
                                            {isDueSoon(medication.time) && <span className="due-badge">Tez orada</span>}
                                        </div>
                                        <div className="upcoming-details">
                                            <h4>
                                                {medication.medicationName} {medication.dosage}
                                            </h4>
                                            <p className="patient-info">
                                                <strong>Bemor:</strong> {medication.patientName} | <strong>Xona:</strong> {medication.room}
                                            </p>
                                            <p className="instructions">{medication.instructions}</p>
                                        </div>
                                        {isDueSoon(medication.time) && (
                                            <button
                                                className="give-button"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleMedicationGiven(medication.patientId, medication.medicationId, medication.time)
                                                }}
                                            >
                                                Berish
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="select-patient-message">
                        <FaUserNurse className="big-icon" />
                        <h3>Bemor tanlang</h3>
                        <p>Dori-darmonlar ma'lumotlarini ko'rish uchun chap tomondagi ro'yxatdan bemorni tanlang</p>
                    </div>
                </div>
            </div>

            {/* Patient Medications Modal */}
            {showPatientModal && selectedPatient && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>
                                <FaUser /> {selectedPatient.name} - Dori-darmonlar
                            </h2>
                            <button className="close-button" onClick={() => setShowPatientModal(false)}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="patient-header">
                                <div className="patient-info">
                                    <div className="info-item">
                                        <FaHospital />
                                        <span>
                                            <strong>Xona:</strong> {selectedPatient.room}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <FaUserMd />
                                        <span>
                                            <strong>Shifokor:</strong> {selectedPatient.doctor}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <FaInfoCircle />
                                        <span>
                                            <strong>Tashxis:</strong> {selectedPatient.diagnosis}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="medications-tabs">
                                <button className={activeTab === "schedule" ? "active" : ""} onClick={() => setActiveTab("schedule")}>
                                    <FaCalendarAlt />
                                    Dori berish jadvali
                                </button>
                                <button className={activeTab === "list" ? "active" : ""} onClick={() => setActiveTab("list")}>
                                    <MdMedication />
                                    Dorilar ro'yxati
                                </button>
                                <button className={activeTab === "history" ? "active" : ""} onClick={() => setActiveTab("history")}>
                                    <FaHistory />
                                    Dori berish tarixi
                                </button>
                            </div>

                            <div className="tab-content">
                                {activeTab === "schedule" && (
                                    <div className="schedule-tab">
                                        <h3>Bugungi dori berish jadvali</h3>
                                        <div className="medication-schedule">
                                            {selectedPatient.medications.length === 0 ? (
                                                <div className="no-medications">
                                                    <p>Bemorga dorilar belgilanmagan</p>
                                                </div>
                                            ) : (
                                                <div className="schedule-list">
                                                    {selectedPatient.medications.map((medication) => (
                                                        <div key={medication.id} className="medication-item">
                                                            <div className="medication-header">
                                                                <h4>
                                                                    {medication.name} {medication.dosage}
                                                                </h4>
                                                                <span className="medication-route">{medication.route}</span>
                                                            </div>
                                                            <div className="medication-details">
                                                                <p>
                                                                    <strong>Qabul qilish:</strong> {medication.frequency}
                                                                </p>
                                                                <p>
                                                                    <strong>Ko'rsatmalar:</strong> {medication.instructions}
                                                                </p>
                                                            </div>
                                                            <div className="medication-times">
                                                                {medication.schedule.map((schedule, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className={`time-slot ${schedule.status} ${isDueSoon(schedule.time) ? "due-soon" : ""}`}
                                                                    >
                                                                        <span className="time">{formatTime(schedule.time)}</span>
                                                                        {schedule.status === "completed" ? (
                                                                            <span className="status-icon completed">
                                                                                <FaCheck />
                                                                            </span>
                                                                        ) : isDueSoon(schedule.time) ? (
                                                                            <button
                                                                                className="give-button"
                                                                                onClick={() =>
                                                                                    handleMedicationGiven(selectedPatient.id, medication.id, schedule.time)
                                                                                }
                                                                            >
                                                                                Berish
                                                                            </button>
                                                                        ) : (
                                                                            <span className="status-icon scheduled"></span>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "list" && (
                                    <div className="list-tab">
                                        <div className="medications-list-header">
                                            <h3>Dorilar ro'yxati</h3>
                                            <button className="add-medication-button" onClick={() => setShowAddForm(true)}>
                                                <FaPlus />
                                                Yangi dori qo'shish
                                            </button>
                                        </div>

                                        {showAddForm ? (
                                            <div className="add-medication-form">
                                                <h3>Yangi dori qo'shish</h3>
                                                <form onSubmit={handleAddMedication}>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label htmlFor="name">Dori nomi</label>
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                                value={newMedication.name}
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="dosage">Dozasi</label>
                                                            <input
                                                                type="text"
                                                                id="dosage"
                                                                name="dosage"
                                                                value={newMedication.dosage}
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label htmlFor="frequency">Qabul qilish chastotasi</label>
                                                            <input
                                                                type="text"
                                                                id="frequency"
                                                                name="frequency"
                                                                value={newMedication.frequency}
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="route">Qabul qilish yo'li</label>
                                                            <select
                                                                id="route"
                                                                name="route"
                                                                value={newMedication.route}
                                                                onChange={handleInputChange}
                                                                required
                                                            >
                                                                <option value="">Tanlang</option>
                                                                <option value="Og'iz orqali">Og'iz orqali</option>
                                                                <option value="Vena ichiga">Vena ichiga</option>
                                                                <option value="Mushak ichiga">Mushak ichiga</option>
                                                                <option value="Teri ostiga">Teri ostiga</option>
                                                                <option value="Ingalyatsiya">Ingalyatsiya</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label htmlFor="startDate">Boshlash sanasi</label>
                                                            <input
                                                                type="date"
                                                                id="startDate"
                                                                name="startDate"
                                                                value={newMedication.startDate}
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="endDate">Tugatish sanasi</label>
                                                            <input
                                                                type="date"
                                                                id="endDate"
                                                                name="endDate"
                                                                value={newMedication.endDate}
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="instructions">Ko'rsatmalar</label>
                                                        <textarea
                                                            id="instructions"
                                                            name="instructions"
                                                            value={newMedication.instructions}
                                                            onChange={handleInputChange}
                                                            rows="3"
                                                        ></textarea>
                                                    </div>
                                                    <div className="form-buttons">
                                                        <button type="button" className="cancel-button" onClick={() => setShowAddForm(false)}>
                                                            Bekor qilish
                                                        </button>
                                                        <button type="submit" className="submit-button">
                                                            Saqlash
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        ) : (
                                            <div className="medications-list">
                                                {selectedPatient.medications.length === 0 ? (
                                                    <div className="no-medications">
                                                        <p>Bemorga dorilar belgilanmagan</p>
                                                    </div>
                                                ) : (
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Dori nomi</th>
                                                                <th>Dozasi</th>
                                                                <th>Qabul qilish</th>
                                                                <th>Yo'li</th>
                                                                <th>Boshlash</th>
                                                                <th>Tugatish</th>
                                                                <th>Ko'rsatmalar</th>
                                                                <th>Amallar</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {selectedPatient.medications.map((medication) => (
                                                                <tr key={medication.id}>
                                                                    <td>{medication.name}</td>
                                                                    <td>{medication.dosage}</td>
                                                                    <td>{medication.frequency}</td>
                                                                    <td>{medication.route}</td>
                                                                    <td>{medication.startDate}</td>
                                                                    <td>{medication.endDate}</td>
                                                                    <td>{medication.instructions}</td>
                                                                    <td>
                                                                        <button className="view-button" onClick={() => handleMedicationSelect(medication)}>
                                                                            <FaEye />
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === "history" && (
                                    <div className="history-tab">
                                        <h3>Dori berish tarixi</h3>
                                        <div className="medication-history">
                                            {selectedPatient.medicationHistory.length === 0 ? (
                                                <div className="no-history">
                                                    <p>Dori berish tarixi mavjud emas</p>
                                                </div>
                                            ) : (
                                                <div className="history-list">
                                                    {selectedPatient.medicationHistory.map((record, index) => (
                                                        <div key={index} className="history-record">
                                                            <div className="history-record-header">
                                                                <span className="history-date">{record.date}</span>
                                                                <span className="history-nurse">{record.nurse}</span>
                                                            </div>
                                                            <div className="history-record-content">
                                                                <TbPill className="icon" />
                                                                <div className="history-details">
                                                                    <p className="medication-name">{record.medication}</p>
                                                                    <p className="notes">{record.notes}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Medication Details Modal */}
            {showMedicationModal && selectedMedication && (
                <div className="modal-overlay">
                    <div className="modal-content medication-details-modal">
                        <div className="modal-header">
                            <h2>
                                <MdMedication /> Dori ma'lumotlari
                            </h2>
                            <button className="close-button" onClick={() => setShowMedicationModal(false)}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="medication-detail-header">
                                <div className="medication-icon">
                                    <TbPill />
                                </div>
                                <div className="medication-title">
                                    <h3>
                                        {selectedMedication.name} {selectedMedication.dosage}
                                    </h3>
                                    <p className="medication-route">{selectedMedication.route}</p>
                                </div>
                            </div>

                            <div className="medication-detail-info">
                                <div className="info-section">
                                    <h4>Asosiy ma'lumotlar</h4>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <span className="info-label">Dori nomi:</span>
                                            <span className="info-value">{selectedMedication.name}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Dozasi:</span>
                                            <span className="info-value">{selectedMedication.dosage}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Qabul qilish:</span>
                                            <span className="info-value">{selectedMedication.frequency}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Qabul qilish yo'li:</span>
                                            <span className="info-value">{selectedMedication.route}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Boshlash sanasi:</span>
                                            <span className="info-value">{selectedMedication.startDate}</span>
                                        </div>
                                        <div className="info-item">
                                            <span className="info-label">Tugatish sanasi:</span>
                                            <span className="info-value">{selectedMedication.endDate}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-section">
                                    <h4>Ko'rsatmalar</h4>
                                    <div className="instructions-box">
                                        <p>{selectedMedication.instructions}</p>
                                    </div>
                                </div>

                                <div className="info-section">
                                    <h4>Dori berish jadvali</h4>
                                    <div className="schedule-grid">
                                        {selectedMedication.schedule.map((schedule, index) => (
                                            <div
                                                key={index}
                                                className={`schedule-item ${schedule.status} ${isDueSoon(schedule.time) ? "due-soon" : ""}`}
                                            >
                                                <div className="schedule-time">{formatTime(schedule.time)}</div>
                                                <div className="schedule-status">
                                                    {schedule.status === "completed" ? (
                                                        <>
                                                            <FaCheck className="status-icon" />
                                                            <span>Berilgan</span>
                                                            <div className="given-info">
                                                                <span>{schedule.givenAt}</span>
                                                                <span>{schedule.nurse}</span>
                                                            </div>
                                                        </>
                                                    ) : isDueSoon(schedule.time) ? (
                                                        <>
                                                            <FaExclamationTriangle className="status-icon warning" />
                                                            <span>Tez orada</span>
                                                            <button
                                                                className="give-button"
                                                                onClick={() => {
                                                                    handleMedicationGiven(selectedPatient.id, selectedMedication.id, schedule.time)
                                                                    setShowMedicationModal(false)
                                                                }}
                                                            >
                                                                Berish
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="status-icon scheduled"></span>
                                                            <span>Rejalashtirilgan</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button className="close-button" onClick={() => setShowMedicationModal(false)}>
                                    Yopish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NurseMedications;