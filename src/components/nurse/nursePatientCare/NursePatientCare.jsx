"use client"

import { useState, useEffect } from "react"
import {
    FaUserNurse,
    FaSearch,
    FaHeartbeat,
    FaNotesMedical,
    FaProcedures,
    FaClipboardList,
    FaFileMedical,
    FaTimes,
} from "react-icons/fa"
import { MdLocalHospital, MdOutlineWaterDrop } from "react-icons/md"
import { TbTemperature } from "react-icons/tb"
import { BsDroplet } from "react-icons/bs"

const NursePatientCare = () => {
    const [patients, setPatients] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [careNotes, setCareNotes] = useState("")
    const [activeTab, setActiveTab] = useState("care")
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)

    // Mock data for demonstration
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setPatients([
                {
                    id: 1,
                    name: "Aziza Karimova",
                    age: 45,
                    room: "203-A",
                    diagnosis: "Pnevmoniya",
                    doctor: "Dr. Aliyev",
                    admissionDate: "2023-05-15",
                    careNeeds: "Har 4 soatda haroratni o'lchash, kuniga 3 mahal dori berish",
                    vitalSigns: {
                        temperature: "37.2°C",
                        bloodPressure: "125/85",
                        heartRate: "78",
                        respiratoryRate: "16",
                        oxygenSaturation: "97%",
                    },
                    careHistory: [
                        { date: "2023-05-15 08:30", action: "Dori berildi: Amoksitsillin 500mg", nurse: "Hamshira Sobirova" },
                        { date: "2023-05-15 12:00", action: "Harorat o'lchandi: 37.5°C", nurse: "Hamshira Sobirova" },
                        { date: "2023-05-15 16:30", action: "Dori berildi: Paratsetamol 500mg", nurse: "Hamshira Rahimova" },
                    ],
                },
                {
                    id: 2,
                    name: "Bobur Rasulov",
                    age: 32,
                    room: "105-B",
                    diagnosis: "Appenditsit operatsiyasidan keyin",
                    doctor: "Dr. Karimov",
                    admissionDate: "2023-05-14",
                    careNeeds: "Jarohatni har kuni tozalash, og'riq darajasini kuzatish",
                    vitalSigns: {
                        temperature: "36.8°C",
                        bloodPressure: "130/80",
                        heartRate: "82",
                        respiratoryRate: "18",
                        oxygenSaturation: "98%",
                    },
                    careHistory: [
                        { date: "2023-05-14 10:00", action: "Jarohat tozalandi va bog'landi", nurse: "Hamshira Karimova" },
                        { date: "2023-05-14 14:00", action: "Dori berildi: Tramadol 50mg", nurse: "Hamshira Karimova" },
                        { date: "2023-05-15 09:00", action: "Jarohat tozalandi va bog'landi", nurse: "Hamshira Sobirova" },
                    ],
                },
                {
                    id: 3,
                    name: "Gulnora Saidova",
                    age: 68,
                    room: "301-C",
                    diagnosis: "Yurak ishemik kasalligi",
                    doctor: "Dr. Mahmudov",
                    admissionDate: "2023-05-13",
                    careNeeds: "Qon bosimini har 2 soatda o'lchash, jismoniy faollikni cheklash",
                    vitalSigns: {
                        temperature: "36.6°C",
                        bloodPressure: "145/90",
                        heartRate: "75",
                        respiratoryRate: "17",
                        oxygenSaturation: "95%",
                    },
                    careHistory: [
                        { date: "2023-05-13 08:00", action: "Dori berildi: Enalapril 10mg", nurse: "Hamshira Rahimova" },
                        { date: "2023-05-13 10:00", action: "Qon bosimi o'lchandi: 150/95", nurse: "Hamshira Rahimova" },
                        { date: "2023-05-13 14:00", action: "EKG tekshiruvi o'tkazildi", nurse: "Hamshira Karimova" },
                    ],
                },
            ])
            setLoading(false)
        }, 1000)
    }, [])

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient)
        setCareNotes("")
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleCareNotesSubmit = (e) => {
        e.preventDefault()
        if (!careNotes.trim()) return

        // In a real app, you would send this to an API
        const newCareHistory = {
            date: new Date().toLocaleString(),
            action: careNotes,
            nurse: "Hamshira Sobirova", // This would come from the logged-in user
        }

        setSelectedPatient((prev) => ({
            ...prev,
            careHistory: [newCareHistory, ...prev.careHistory],
        }))

        setCareNotes("")
    }

    const filteredPatients = patients.filter(
        (patient) =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
        <div className="nurse-patient-care">
            <div className="care-header">
                <div className="care-title">
                    <FaUserNurse />
                    <h1>Bemorlarni parvarishlash</h1>
                </div>
                <div className="care-search">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Bemor nomi, xona yoki tashxis bo'yicha qidirish..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="care-content">
                <div className="patients-list-full">
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
                                <ul className="patients-grid">
                                    {filteredPatients.map((patient) => (
                                        <li key={patient.id} className="patient-card" onClick={() => handlePatientSelect(patient)}>
                                            <div className="patient-card-info">
                                                <h3>{patient.name}</h3>
                                                <div className="patient-card-details">
                                                    <span>
                                                        <strong>Yosh:</strong> {patient.age}
                                                    </span>
                                                    <span>
                                                        <strong>Xona:</strong> {patient.room}
                                                    </span>
                                                    <span>
                                                        <strong>Tashxis:</strong> {patient.diagnosis}
                                                    </span>
                                                    <span>
                                                        <strong>Shifokor:</strong> {patient.doctor}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="patient-card-action">
                                                <button className="view-details-btn">
                                                    <FaNotesMedical />
                                                    Batafsil ko'rish
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Patient Care Modal */}
            {showModal && selectedPatient && (
                <div className="modal-overlay">
                    <div className="patient-care-modal">
                        <div className="modal-header">
                            <h2>{selectedPatient.name}</h2>
                            <button className="close-modal" onClick={handleCloseModal}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="modal-content">
                            <div className="patient-header">
                                <div className="patient-header-details">
                                    <span>
                                        <strong>Xona:</strong> {selectedPatient.room}
                                    </span>
                                    <span>
                                        <strong>Yosh:</strong> {selectedPatient.age}
                                    </span>
                                    <span>
                                        <strong>Shifokor:</strong> {selectedPatient.doctor}
                                    </span>
                                    <span>
                                        <strong>Qabul qilingan sana:</strong> {selectedPatient.admissionDate}
                                    </span>
                                </div>
                            </div>

                            <div className="care-tabs">
                                <button className={activeTab === "care" ? "active" : ""} onClick={() => setActiveTab("care")}>
                                    <FaNotesMedical />
                                    Parvarish
                                </button>
                                <button className={activeTab === "vitals" ? "active" : ""} onClick={() => setActiveTab("vitals")}>
                                    <FaHeartbeat />
                                    Hayotiy ko'rsatkichlar
                                </button>
                                <button className={activeTab === "history" ? "active" : ""} onClick={() => setActiveTab("history")}>
                                    <FaClipboardList />
                                    Parvarish tarixi
                                </button>
                            </div>

                            <div className="tab-content">
                                {activeTab === "care" && (
                                    <div className="care-tab">
                                        <div className="care-needs">
                                            <h3>Parvarish talablari</h3>
                                            <p>{selectedPatient.careNeeds}</p>
                                        </div>
                                        <div className="care-form">
                                            <h3>Yangi parvarish qaydini qo'shish</h3>
                                            <form onSubmit={handleCareNotesSubmit}>
                                                <textarea
                                                    value={careNotes}
                                                    onChange={(e) => setCareNotes(e.target.value)}
                                                    placeholder="Bajarilgan parvarish haqida ma'lumot kiriting..."
                                                    required
                                                ></textarea>
                                                <button type="submit">
                                                    <FaFileMedical />
                                                    Qaydni saqlash
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "vitals" && (
                                    <div className="vitals-tab">
                                        <h3>Joriy hayotiy ko'rsatkichlar</h3>
                                        <div className="vital-signs">
                                            <div className="vital-sign">
                                                <TbTemperature className="icon temperature" />
                                                <div className="vital-info">
                                                    <span className="vital-label">Harorat</span>
                                                    <span className="vital-value">{selectedPatient.vitalSigns.temperature}</span>
                                                </div>
                                            </div>
                                            <div className="vital-sign">
                                                <BsDroplet className="icon blood-pressure" />
                                                <div className="vital-info">
                                                    <span className="vital-label">Qon bosimi</span>
                                                    <span className="vital-value">{selectedPatient.vitalSigns.bloodPressure}</span>
                                                </div>
                                            </div>
                                            <div className="vital-sign">
                                                <FaHeartbeat className="icon heart-rate" />
                                                <div className="vital-info">
                                                    <span className="vital-label">Yurak urishi</span>
                                                    <span className="vital-value">{selectedPatient.vitalSigns.heartRate} urishlar/daqiqa</span>
                                                </div>
                                            </div>
                                            <div className="vital-sign">
                                                <MdOutlineWaterDrop className="icon respiratory" />
                                                <div className="vital-info">
                                                    <span className="vital-label">Nafas olish tezligi</span>
                                                    <span className="vital-value">{selectedPatient.vitalSigns.respiratoryRate} nafas/daqiqa</span>
                                                </div>
                                            </div>
                                            <div className="vital-sign">
                                                <MdLocalHospital className="icon oxygen" />
                                                <div className="vital-info">
                                                    <span className="vital-label">Kislorod saturatsiyasi</span>
                                                    <span className="vital-value">{selectedPatient.vitalSigns.oxygenSaturation}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="update-vitals">
                                            <button>
                                                <FaHeartbeat />
                                                Yangi ko'rsatkichlarni kiritish
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "history" && (
                                    <div className="history-tab">
                                        <h3>Parvarish tarixi</h3>
                                        <div className="care-history">
                                            {selectedPatient.careHistory.map((record, index) => (
                                                <div key={index} className="care-record">
                                                    <div className="care-record-header">
                                                        <span className="care-date">{record.date}</span>
                                                        <span className="care-nurse">{record.nurse}</span>
                                                    </div>
                                                    <div className="care-record-content">
                                                        <FaProcedures className="icon" />
                                                        <p>{record.action}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NursePatientCare;