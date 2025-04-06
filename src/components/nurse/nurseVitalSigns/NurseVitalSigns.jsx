"use client"

import { useState, useEffect } from "react"
import { FaHeartbeat, FaSearch, FaChartLine, FaHistory, FaPlus, FaTimes } from "react-icons/fa"
import { TbTemperature } from "react-icons/tb"
import { BsDroplet } from "react-icons/bs"
import { MdOutlineWaterDrop, MdLocalHospital } from "react-icons/md"
import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const NurseVitalSigns = () => {
    const [patients, setPatients] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [activeTab, setActiveTab] = useState("current")
    const [loading, setLoading] = useState(true)
    const [newVitals, setNewVitals] = useState({
        temperature: "",
        bloodPressure: "",
        heartRate: "",
        respiratoryRate: "",
        oxygenSaturation: "",
    })
    const [showAddForm, setShowAddForm] = useState(false)
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
                    currentVitals: {
                        temperature: "37.2°C",
                        bloodPressure: "125/85",
                        heartRate: "78",
                        respiratoryRate: "16",
                        oxygenSaturation: "97%",
                        lastUpdated: "2023-05-15 14:30",
                    },
                    vitalHistory: [
                        {
                            date: "2023-05-15",
                            readings: [
                                {
                                    time: "08:30",
                                    temperature: "37.5°C",
                                    bloodPressure: "130/90",
                                    heartRate: "82",
                                    respiratoryRate: "18",
                                    oxygenSaturation: "96%",
                                },
                                {
                                    time: "14:30",
                                    temperature: "37.2°C",
                                    bloodPressure: "125/85",
                                    heartRate: "78",
                                    respiratoryRate: "16",
                                    oxygenSaturation: "97%",
                                },
                            ],
                        },
                        {
                            date: "2023-05-14",
                            readings: [
                                {
                                    time: "09:00",
                                    temperature: "37.8°C",
                                    bloodPressure: "135/95",
                                    heartRate: "85",
                                    respiratoryRate: "20",
                                    oxygenSaturation: "95%",
                                },
                                {
                                    time: "15:00",
                                    temperature: "37.6°C",
                                    bloodPressure: "130/90",
                                    heartRate: "80",
                                    respiratoryRate: "18",
                                    oxygenSaturation: "96%",
                                },
                                {
                                    time: "21:00",
                                    temperature: "37.4°C",
                                    bloodPressure: "128/88",
                                    heartRate: "79",
                                    respiratoryRate: "17",
                                    oxygenSaturation: "96%",
                                },
                            ],
                        },
                    ],
                    chartData: {
                        labels: ["14/05 09:00", "14/05 15:00", "14/05 21:00", "15/05 08:30", "15/05 14:30"],
                        temperature: [37.8, 37.6, 37.4, 37.5, 37.2],
                        heartRate: [85, 80, 79, 82, 78],
                        bloodPressureSystolic: [135, 130, 128, 130, 125],
                        bloodPressureDiastolic: [95, 90, 88, 90, 85],
                        respiratoryRate: [20, 18, 17, 18, 16],
                        oxygenSaturation: [95, 96, 96, 96, 97],
                    },
                },
                {
                    id: 2,
                    name: "Bobur Rasulov",
                    age: 32,
                    room: "105-B",
                    diagnosis: "Appenditsit operatsiyasidan keyin",
                    doctor: "Dr. Karimov",
                    currentVitals: {
                        temperature: "36.8°C",
                        bloodPressure: "130/80",
                        heartRate: "82",
                        respiratoryRate: "18",
                        oxygenSaturation: "98%",
                        lastUpdated: "2023-05-15 10:00",
                    },
                    vitalHistory: [
                        {
                            date: "2023-05-15",
                            readings: [
                                {
                                    time: "10:00",
                                    temperature: "36.8°C",
                                    bloodPressure: "130/80",
                                    heartRate: "82",
                                    respiratoryRate: "18",
                                    oxygenSaturation: "98%",
                                },
                            ],
                        },
                        {
                            date: "2023-05-14",
                            readings: [
                                {
                                    time: "10:00",
                                    temperature: "37.0°C",
                                    bloodPressure: "135/85",
                                    heartRate: "88",
                                    respiratoryRate: "20",
                                    oxygenSaturation: "97%",
                                },
                                {
                                    time: "16:00",
                                    temperature: "36.9°C",
                                    bloodPressure: "132/82",
                                    heartRate: "85",
                                    respiratoryRate: "19",
                                    oxygenSaturation: "97%",
                                },
                                {
                                    time: "22:00",
                                    temperature: "36.8°C",
                                    bloodPressure: "130/80",
                                    heartRate: "83",
                                    respiratoryRate: "18",
                                    oxygenSaturation: "98%",
                                },
                            ],
                        },
                    ],
                    chartData: {
                        labels: ["14/05 10:00", "14/05 16:00", "14/05 22:00", "15/05 10:00"],
                        temperature: [37.0, 36.9, 36.8, 36.8],
                        heartRate: [88, 85, 83, 82],
                        bloodPressureSystolic: [135, 132, 130, 130],
                        bloodPressureDiastolic: [85, 82, 80, 80],
                        respiratoryRate: [20, 19, 18, 18],
                        oxygenSaturation: [97, 97, 98, 98],
                    },
                },
                {
                    id: 3,
                    name: "Gulnora Saidova",
                    age: 68,
                    room: "301-C",
                    diagnosis: "Yurak ishemik kasalligi",
                    doctor: "Dr. Mahmudov",
                    currentVitals: {
                        temperature: "36.6°C",
                        bloodPressure: "145/90",
                        heartRate: "75",
                        respiratoryRate: "17",
                        oxygenSaturation: "95%",
                        lastUpdated: "2023-05-15 12:00",
                    },
                    vitalHistory: [
                        {
                            date: "2023-05-15",
                            readings: [
                                {
                                    time: "06:00",
                                    temperature: "36.7°C",
                                    bloodPressure: "150/95",
                                    heartRate: "78",
                                    respiratoryRate: "18",
                                    oxygenSaturation: "94%",
                                },
                                {
                                    time: "12:00",
                                    temperature: "36.6°C",
                                    bloodPressure: "145/90",
                                    heartRate: "75",
                                    respiratoryRate: "17",
                                    oxygenSaturation: "95%",
                                },
                            ],
                        },
                        {
                            date: "2023-05-14",
                            readings: [
                                {
                                    time: "06:00",
                                    temperature: "36.8°C",
                                    bloodPressure: "155/100",
                                    heartRate: "80",
                                    respiratoryRate: "19",
                                    oxygenSaturation: "93%",
                                },
                                {
                                    time: "12:00",
                                    temperature: "36.7°C",
                                    bloodPressure: "150/95",
                                    heartRate: "78",
                                    respiratoryRate: "18",
                                    oxygenSaturation: "94%",
                                },
                                {
                                    time: "18:00",
                                    temperature: "36.7°C",
                                    bloodPressure: "148/92",
                                    heartRate: "76",
                                    respiratoryRate: "18",
                                    oxygenSaturation: "94%",
                                },
                            ],
                        },
                    ],
                    chartData: {
                        labels: ["14/05 06:00", "14/05 12:00", "14/05 18:00", "15/05 06:00", "15/05 12:00"],
                        temperature: [36.8, 36.7, 36.7, 36.7, 36.6],
                        heartRate: [80, 78, 76, 78, 75],
                        bloodPressureSystolic: [155, 150, 148, 150, 145],
                        bloodPressureDiastolic: [100, 95, 92, 95, 90],
                        respiratoryRate: [19, 18, 18, 18, 17],
                        oxygenSaturation: [93, 94, 94, 94, 95],
                    },
                },
            ])
            setLoading(false)
        }, 1000)
    }, [])

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient)
        setShowAddForm(false)
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewVitals((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleAddVitals = (e) => {
        e.preventDefault()

        // In a real app, you would send this to an API
        // For now, we'll just update the local state
        const now = new Date()
        const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        const dateString = now.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })

        // Update current vitals
        const updatedPatient = {
            ...selectedPatient,
            currentVitals: {
                temperature: `${newVitals.temperature}°C`,
                bloodPressure: newVitals.bloodPressure,
                heartRate: newVitals.heartRate,
                respiratoryRate: newVitals.respiratoryRate,
                oxygenSaturation: `${newVitals.oxygenSaturation}%`,
                lastUpdated: `${now.toISOString().split("T")[0]} ${timeString}`,
            },
        }

        // Add to history
        const todayHistory = updatedPatient.vitalHistory.find((h) => h.date === now.toISOString().split("T")[0])

        if (todayHistory) {
            todayHistory.readings.push({
                time: timeString,
                temperature: `${newVitals.temperature}°C`,
                bloodPressure: newVitals.bloodPressure,
                heartRate: newVitals.heartRate,
                respiratoryRate: newVitals.respiratoryRate,
                oxygenSaturation: `${newVitals.oxygenSaturation}%`,
            })
        } else {
            updatedPatient.vitalHistory.unshift({
                date: now.toISOString().split("T")[0],
                readings: [
                    {
                        time: timeString,
                        temperature: `${newVitals.temperature}°C`,
                        bloodPressure: newVitals.bloodPressure,
                        heartRate: newVitals.heartRate,
                        respiratoryRate: newVitals.respiratoryRate,
                        oxygenSaturation: `${newVitals.oxygenSaturation}%`,
                    },
                ],
            })
        }

        // Update chart data
        updatedPatient.chartData.labels.push(`${dateString} ${timeString}`)
        updatedPatient.chartData.temperature.push(Number.parseFloat(newVitals.temperature))
        updatedPatient.chartData.heartRate.push(Number.parseInt(newVitals.heartRate))

        const bpParts = newVitals.bloodPressure.split("/")
        updatedPatient.chartData.bloodPressureSystolic.push(Number.parseInt(bpParts[0]))
        updatedPatient.chartData.bloodPressureDiastolic.push(Number.parseInt(bpParts[1]))

        updatedPatient.chartData.respiratoryRate.push(Number.parseInt(newVitals.respiratoryRate))
        updatedPatient.chartData.oxygenSaturation.push(Number.parseInt(newVitals.oxygenSaturation))

        // Update the patient in the patients array
        const updatedPatients = patients.map((p) => (p.id === selectedPatient.id ? updatedPatient : p))

        setPatients(updatedPatients)
        setSelectedPatient(updatedPatient)
        setShowAddForm(false)
        setNewVitals({
            temperature: "",
            bloodPressure: "",
            heartRate: "",
            respiratoryRate: "",
            oxygenSaturation: "",
        })
    }

    const filteredPatients = patients.filter(
        (patient) =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    // Chart options
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Hayotiy ko'rsatkichlar dinamikasi",
            },
        },
        scales: {
            y: {
                beginAtZero: false,
            },
        },
    }

    return (
        <div className="nurse-vital-signs">
            <div className="vital-signs-header">
                <div className="vital-signs-title">
                    <FaHeartbeat />
                    <h1>Hayotiy ko'rsatkichlar</h1>
                </div>
                <div className="vital-signs-search">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Bemor nomi, xona yoki tashxis bo'yicha qidirish..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="vital-signs-content">
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
                                                        <strong>Xona:</strong> {patient.room}
                                                    </span>
                                                    <span>
                                                        <strong>Tashxis:</strong> {patient.diagnosis}
                                                    </span>
                                                    <span>
                                                        <strong>So'nggi yangilanish:</strong> {patient.currentVitals.lastUpdated}
                                                    </span>
                                                </div>
                                                <div className="vital-preview">
                                                    <div className="vital-preview-item">
                                                        <TbTemperature />
                                                        <span>{patient.currentVitals.temperature}</span>
                                                    </div>
                                                    <div className="vital-preview-item">
                                                        <BsDroplet />
                                                        <span>{patient.currentVitals.bloodPressure}</span>
                                                    </div>
                                                    <div className="vital-preview-item">
                                                        <FaHeartbeat />
                                                        <span>{patient.currentVitals.heartRate}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="patient-card-action">
                                                <button className="view-details-btn">
                                                    <FaHeartbeat />
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

            {/* Vital Signs Modal */}
            {showModal && selectedPatient && (
                <div className="modal-overlay">
                    <div className="vital-signs-modal">
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
                                </div>
                            </div>

                            <div className="vital-signs-tabs">
                                <button className={activeTab === "current" ? "active" : ""} onClick={() => setActiveTab("current")}>
                                    <FaHeartbeat />
                                    Joriy ko'rsatkichlar
                                </button>
                                <button className={activeTab === "history" ? "active" : ""} onClick={() => setActiveTab("history")}>
                                    <FaHistory />
                                    Ko'rsatkichlar tarixi
                                </button>
                                <button className={activeTab === "charts" ? "active" : ""} onClick={() => setActiveTab("charts")}>
                                    <FaChartLine />
                                    Grafiklar
                                </button>
                            </div>

                            <div className="tab-content">
                                {activeTab === "current" && (
                                    <div className="current-tab">
                                        <div className="current-vitals">
                                            <div className="vital-card temperature">
                                                <div className="vital-icon">
                                                    <TbTemperature />
                                                </div>
                                                <div className="vital-data">
                                                    <h3>Harorat</h3>
                                                    <p className="vital-value">{selectedPatient.currentVitals.temperature}</p>
                                                    <p className="vital-time">
                                                        <small>So'nggi yangilanish: {selectedPatient.currentVitals.lastUpdated}</small>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="vital-card blood-pressure">
                                                <div className="vital-icon">
                                                    <BsDroplet />
                                                </div>
                                                <div className="vital-data">
                                                    <h3>Qon bosimi</h3>
                                                    <p className="vital-value">{selectedPatient.currentVitals.bloodPressure}</p>
                                                    <p className="vital-time">
                                                        <small>So'nggi yangilanish: {selectedPatient.currentVitals.lastUpdated}</small>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="vital-card heart-rate">
                                                <div className="vital-icon">
                                                    <FaHeartbeat />
                                                </div>
                                                <div className="vital-data">
                                                    <h3>Yurak urishi</h3>
                                                    <p className="vital-value">{selectedPatient.currentVitals.heartRate} urishlar/daqiqa</p>
                                                    <p className="vital-time">
                                                        <small>So'nggi yangilanish: {selectedPatient.currentVitals.lastUpdated}</small>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="vital-card respiratory-rate">
                                                <div className="vital-icon">
                                                    <MdOutlineWaterDrop />
                                                </div>
                                                <div className="vital-data">
                                                    <h3>Nafas olish tezligi</h3>
                                                    <p className="vital-value">{selectedPatient.currentVitals.respiratoryRate} nafas/daqiqa</p>
                                                    <p className="vital-time">
                                                        <small>So'nggi yangilanish: {selectedPatient.currentVitals.lastUpdated}</small>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="vital-card oxygen">
                                                <div className="vital-icon">
                                                    <MdLocalHospital />
                                                </div>
                                                <div className="vital-data">
                                                    <h3>Kislorod saturatsiyasi</h3>
                                                    <p className="vital-value">{selectedPatient.currentVitals.oxygenSaturation}</p>
                                                    <p className="vital-time">
                                                        <small>So'nggi yangilanish: {selectedPatient.currentVitals.lastUpdated}</small>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {!showAddForm ? (
                                            <div className="add-vitals-button">
                                                <button onClick={() => setShowAddForm(true)}>
                                                    <FaPlus />
                                                    Yangi ko'rsatkichlarni kiritish
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="add-vitals-form">
                                                <h3>Yangi ko'rsatkichlarni kiritish</h3>
                                                <form onSubmit={handleAddVitals}>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label htmlFor="temperature">Harorat (°C)</label>
                                                            <input
                                                                type="number"
                                                                id="temperature"
                                                                name="temperature"
                                                                step="0.1"
                                                                min="35"
                                                                max="42"
                                                                value={newVitals.temperature}
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="bloodPressure">Qon bosimi (mmHg)</label>
                                                            <input
                                                                type="text"
                                                                id="bloodPressure"
                                                                name="bloodPressure"
                                                                placeholder="120/80"
                                                                pattern="\d{2,3}\/\d{2,3}"
                                                                value={newVitals.bloodPressure}
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label htmlFor="heartRate">Yurak urishi (urishlar/daqiqa)</label>
                                                            <input
                                                                type="number"
                                                                id="heartRate"
                                                                name="heartRate"
                                                                min="40"
                                                                max="200"
                                                                value={newVitals.heartRate}
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="respiratoryRate">Nafas olish tezligi (nafas/daqiqa)</label>
                                                            <input
                                                                type="number"
                                                                id="respiratoryRate"
                                                                name="respiratoryRate"
                                                                min="8"
                                                                max="40"
                                                                value={newVitals.respiratoryRate}
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group">
                                                            <label htmlFor="oxygenSaturation">Kislorod saturatsiyasi (%)</label>
                                                            <input
                                                                type="number"
                                                                id="oxygenSaturation"
                                                                name="oxygenSaturation"
                                                                min="70"
                                                                max="100"
                                                                value={newVitals.oxygenSaturation}
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                        </div>
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
                                        )}
                                    </div>
                                )}

                                {activeTab === "history" && (
                                    <div className="history-tab">
                                        <h3>Ko'rsatkichlar tarixi</h3>
                                        <div className="vital-history">
                                            {selectedPatient.vitalHistory.map((day, dayIndex) => (
                                                <div key={dayIndex} className="history-day">
                                                    <div className="history-date">
                                                        <h4>{day.date}</h4>
                                                    </div>
                                                    <div className="history-readings">
                                                        <table>
                                                            <thead>
                                                                <tr>
                                                                    <th>Vaqt</th>
                                                                    <th>Harorat</th>
                                                                    <th>Qon bosimi</th>
                                                                    <th>Yurak urishi</th>
                                                                    <th>Nafas olish</th>
                                                                    <th>O₂ saturatsiyasi</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {day.readings.map((reading, readingIndex) => (
                                                                    <tr key={readingIndex}>
                                                                        <td>{reading.time}</td>
                                                                        <td>{reading.temperature}</td>
                                                                        <td>{reading.bloodPressure}</td>
                                                                        <td>{reading.heartRate}</td>
                                                                        <td>{reading.respiratoryRate}</td>
                                                                        <td>{reading.oxygenSaturation}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "charts" && (
                                    <div className="charts-tab">
                                        <h3>Ko'rsatkichlar dinamikasi</h3>
                                        <div className="chart-container">
                                            <div className="chart-card">
                                                <h4>Harorat</h4>
                                                <Line
                                                    options={chartOptions}
                                                    data={{
                                                        labels: selectedPatient.chartData.labels,
                                                        datasets: [
                                                            {
                                                                label: "Harorat (°C)",
                                                                data: selectedPatient.chartData.temperature,
                                                                borderColor: "rgb(255, 99, 132)",
                                                                backgroundColor: "rgba(255, 99, 132, 0.5)",
                                                            },
                                                        ],
                                                    }}
                                                />
                                            </div>
                                            <div className="chart-card">
                                                <h4>Yurak urishi</h4>
                                                <Line
                                                    options={chartOptions}
                                                    data={{
                                                        labels: selectedPatient.chartData.labels,
                                                        datasets: [
                                                            {
                                                                label: "Yurak urishi (urishlar/daqiqa)",
                                                                data: selectedPatient.chartData.heartRate,
                                                                borderColor: "rgb(255, 159, 64)",
                                                                backgroundColor: "rgba(255, 159, 64, 0.5)",
                                                            },
                                                        ],
                                                    }}
                                                />
                                            </div>
                                            <div className="chart-card">
                                                <h4>Qon bosimi</h4>
                                                <Line
                                                    options={chartOptions}
                                                    data={{
                                                        labels: selectedPatient.chartData.labels,
                                                        datasets: [
                                                            {
                                                                label: "Sistola (mmHg)",
                                                                data: selectedPatient.chartData.bloodPressureSystolic,
                                                                borderColor: "rgb(54, 162, 235)",
                                                                backgroundColor: "rgba(54, 162, 235, 0.5)",
                                                            },
                                                            {
                                                                label: "Diastola (mmHg)",
                                                                data: selectedPatient.chartData.bloodPressureDiastolic,
                                                                borderColor: "rgb(75, 192, 192)",
                                                                backgroundColor: "rgba(75, 192, 192, 0.5)",
                                                            },
                                                        ],
                                                    }}
                                                />
                                            </div>
                                            <div className="chart-card">
                                                <h4>Nafas olish tezligi va Kislorod saturatsiyasi</h4>
                                                <Line
                                                    options={chartOptions}
                                                    data={{
                                                        labels: selectedPatient.chartData.labels,
                                                        datasets: [
                                                            {
                                                                label: "Nafas olish tezligi (nafas/daqiqa)",
                                                                data: selectedPatient.chartData.respiratoryRate,
                                                                borderColor: "rgb(153, 102, 255)",
                                                                backgroundColor: "rgba(153, 102, 255, 0.5)",
                                                                yAxisID: "y",
                                                            },
                                                            {
                                                                label: "Kislorod saturatsiyasi (%)",
                                                                data: selectedPatient.chartData.oxygenSaturation,
                                                                borderColor: "rgb(75, 192, 192)",
                                                                backgroundColor: "rgba(75, 192, 192, 0.5)",
                                                                yAxisID: "y1",
                                                            },
                                                        ],
                                                    }}
                                                />
                                            </div>
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

export default NurseVitalSigns;