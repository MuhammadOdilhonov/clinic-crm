"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useLanguage } from "../../contexts/LanguageContext"
import {
    FaArrowLeft,
    FaUserMd,
    FaCalendarAlt,
    FaEnvelope,
    FaIdCard,
    FaUserInjured,
    FaNotesMedical,
    FaHistory,
    FaExclamationTriangle,
    FaMale,
    FaFemale,
    FaBirthdayCake,
    FaWeight,
    FaRulerVertical,
    FaHospital,
    FaClipboardList,
} from "react-icons/fa"

const PatientDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { t } = useLanguage()
    const [patient, setPatient] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeTab, setActiveTab] = useState("info")

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                setLoading(true)
                // In a real app, we would fetch from API
                // const data = await getPatientById(id)

                // For demo purposes, using mock data
                setTimeout(() => {
                    const mockPatient = {
                        id: Number.parseInt(id),
                        name: "Alisher Karimov",
                        age: 45,
                        gender: "male",
                        birthDate: "1978-05-15",
                        address: "Tashkent, Chilanzar 7-54",
                        phone: "+998 90 123 45 67",
                        email: "alisher@example.com",
                        bloodGroup: "A+",
                        height: "175 cm",
                        weight: "78 kg",
                        registrationDate: "2022-01-10",
                        lastVisit: "2023-05-15",
                        status: "active",
                        doctorId: 1,
                        doctorName: "Dr. Azimov",
                        diagnoses: [
                            {
                                id: 1,
                                name: "Hypertension",
                                date: "2022-02-15",
                                description: "Stage 2 hypertension, requires regular monitoring",
                                status: "active",
                            },
                            {
                                id: 2,
                                name: "Type 2 Diabetes",
                                date: "2022-03-10",
                                description: "Early stage, diet controlled",
                                status: "active",
                            },
                            {
                                id: 3,
                                name: "Seasonal Allergies",
                                date: "2022-05-20",
                                description: "Pollen sensitivity, seasonal symptoms",
                                status: "inactive",
                            },
                        ],
                        appointments: [
                            {
                                id: 1,
                                date: "2023-05-15",
                                time: "10:30",
                                type: "Regular checkup",
                                doctorName: "Dr. Azimov",
                                status: "completed",
                                notes: "Blood pressure stable, medication continued",
                            },
                            {
                                id: 2,
                                date: "2023-06-20",
                                time: "11:00",
                                type: "Follow-up",
                                doctorName: "Dr. Azimov",
                                status: "scheduled",
                            },
                            {
                                id: 3,
                                date: "2023-04-10",
                                time: "09:15",
                                type: "Blood test",
                                doctorName: "Dr. Karimova",
                                status: "completed",
                                notes: "Blood sugar levels slightly elevated",
                            },
                        ],
                        medicalHistory: [
                            {
                                id: 1,
                                date: "2020-05-10",
                                condition: "Appendectomy",
                                description: "Surgical removal of appendix",
                                hospital: "Tashkent Medical Center",
                            },
                            {
                                id: 2,
                                date: "2018-11-15",
                                condition: "Pneumonia",
                                description: "Treated with antibiotics",
                                hospital: "City Hospital No. 1",
                            },
                        ],
                    }

                    setPatient(mockPatient)
                    setLoading(false)
                }, 800)
            } catch (err) {
                setError(err.message || "An error occurred while fetching patient data")
                setLoading(false)
            }
        }

        fetchPatientData()
    }, [id])

    // Check if nurse has access to this patient
    const hasAccess = () => {
        if (!patient) return false

        // Admin and Director have access to all patients
        if (user.role === "admin" || user.role === "director") return true

        // Doctor has access to their own patients
        if (user.role === "doctor") return user.id === patient.doctorId

        // Nurse has access to patients of the doctor they are assigned to
        if (user.role === "nurse") return user.assignedDoctorId === patient.doctorId

        return false
    }

    const handleBack = () => {
        navigate(-1)
    }

    const handleDiagnosisClick = (diagnosis) => {
        alert(`Diagnosis details: ${diagnosis.name} - ${diagnosis.description}`)
    }

    const handleViewAllDiagnoses = () => {
        alert(t("view_all_diagnoses"))
    }

    if (loading) {
        return (
            <div className="patient-details-loading">
                <div className="loading-spinner"></div>
                <p>{t("loading_patient_data")}...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="patient-details-error">
                <FaExclamationTriangle />
                <h2>{t("error_occurred")}</h2>
                <p>{error}</p>
                <button onClick={handleBack} className="btn-back">
                    <FaArrowLeft /> {t("go_back")}
                </button>
            </div>
        )
    }

    if (!patient) {
        return (
            <div className="patient-details-error">
                <FaExclamationTriangle />
                <h2>{t("patient_not_found")}</h2>
                <button onClick={handleBack} className="btn-back">
                    <FaArrowLeft /> {t("go_back")}
                </button>
            </div>
        )
    }

    if (!hasAccess()) {
        return (
            <div className="patient-details-error">
                <FaExclamationTriangle />
                <h2>{t("access_denied")}</h2>
                <p>{t("no_permission_view_patient")}</p>
                <button onClick={handleBack} className="btn-back">
                    <FaArrowLeft /> {t("go_back")}
                </button>
            </div>
        )
    }

    return (
        <div className="patient-details-container">
            <div className="patient-details-header">
                <button onClick={handleBack} className="btn-back">
                    <FaArrowLeft /> {t("go_back")}
                </button>
                <h1>{t("patient_details")}</h1>
            </div>

            <div className="patient-details-content">
                <div className="patient-profile-section">
                    <div className="patient-profile-card">
                        <div className="patient-avatar">
                            {patient.gender === "male" ? (
                                <div className="avatar male">
                                    <FaMale />
                                </div>
                            ) : (
                                <div className="avatar female">
                                    <FaFemale />
                                </div>
                            )}
                        </div>
                        <div className="patient-basic-info">
                            <h2>{patient.name}</h2>
                            <div className="patient-id">
                                <FaIdCard /> {t("patient_id")}: {patient.id}
                            </div>
                            <div className="patient-status">
                              <span className={`status-badge ${patient.status}`}>{t(patient.status)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="patient-quick-info">
                        <div className="info-card">
                            <div className="info-icon">
                                <FaUserMd />
                            </div>
                            <div className="info-content">
                                <div className="info-label">{t("doctor")}</div>
                                <div className="info-value">{patient.doctorName}</div>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">
                                <FaCalendarAlt />
                            </div>
                            <div className="info-content">
                                <div className="info-label">{t("last_visit")}</div>
                                <div className="info-value">{patient.lastVisit}</div>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">
                                <FaBirthdayCake />
                            </div>
                            <div className="info-content">
                                <div className="info-label">{t("age")}</div>
                                <div className="info-value">
                                    {patient.age} {t("years")}
                                </div>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">
                                <FaRulerVertical />
                            </div>
                            <div className="info-content">
                                <div className="info-label">{t("height")}</div>
                                <div className="info-value">{patient.height}</div>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">
                                <FaWeight />
                            </div>
                            <div className="info-content">
                                <div className="info-label">{t("weight")}</div>
                                <div className="info-value">{patient.weight}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="patient-tabs">
                    <button className={activeTab === "info" ? "active" : ""} onClick={() => setActiveTab("info")}>
                        <FaUserInjured /> {t("personal_info")}
                    </button>
                    <button className={activeTab === "diagnoses" ? "active" : ""} onClick={() => setActiveTab("diagnoses")}>
                        <FaNotesMedical /> {t("diagnoses")}
                    </button>
                    <button className={activeTab === "appointments" ? "active" : ""} onClick={() => setActiveTab("appointments")}>
                        <FaCalendarAlt /> {t("appointments")}
                    </button>
                    <button className={activeTab === "history" ? "active" : ""} onClick={() => setActiveTab("history")}>
                        <FaHistory /> {t("medical_history")}
                    </button>
                </div>

                <div className="patient-tab-content">
                    {activeTab === "info" && (
                        <div className="patient-info-tab">
                            <div className="info-section">
                                <h3>
                                    <FaUserInjured /> {t("personal_information")}
                                </h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <div className="info-label">{t("full_name")}</div>
                                        <div className="info-value">{patient.name}</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">{t("gender")}</div>
                                        <div className="info-value">{t(patient.gender)}</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">{t("birth_date")}</div>
                                        <div className="info-value">{patient.birthDate}</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">{t("blood_group")}</div>
                                        <div className="info-value">{patient.bloodGroup}</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">{t("registration_date")}</div>
                                        <div className="info-value">{patient.registrationDate}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="info-section">
                                <h3>
                                    <FaEnvelope /> {t("contact_information")}
                                </h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <div className="info-label">{t("phone")}</div>
                                        <div className="info-value">{patient.phone}</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">{t("email")}</div>
                                        <div className="info-value">{patient.email}</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">{t("address")}</div>
                                        <div className="info-value">{patient.address}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "diagnoses" && (
                        <div className="patient-diagnoses-tab">
                            <div className="diagnoses-header">
                                <h3>
                                    <FaNotesMedical /> {t("diagnoses")}
                                </h3>
                                <div className="diagnoses-actions">
                                    <button className="btn-view-all" onClick={handleViewAllDiagnoses}>
                                        {t("view_all")}
                                    </button>
                                </div>
                            </div>

                            <div className="diagnoses-list">
                                {patient.diagnoses && patient.diagnoses.length > 0 ? (
                                    patient.diagnoses.map((diagnosis) => (
                                        <div
                                            key={diagnosis.id}
                                            className={`diagnosis-card ${diagnosis.status}`}
                                            onClick={() => handleDiagnosisClick(diagnosis)}
                                        >
                                            <div className="diagnosis-header">
                                                <h4>{diagnosis.name}</h4>
                                                <span className={`status-badge ${diagnosis.status}`}>{t(diagnosis.status)}</span>
                                            </div>
                                            <div className="diagnosis-date">
                                                <FaCalendarAlt /> {t("diagnosed_on")}: {diagnosis.date}
                                            </div>
                                            <div className="diagnosis-description">{diagnosis.description}</div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-data">{t("no_diagnoses_found")}</div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "appointments" && (
                        <div className="patient-appointments-tab">
                            <div className="appointments-header">
                                <h3>
                                    <FaCalendarAlt /> {t("appointments")}
                                </h3>
                            </div>

                            <div className="appointments-list">
                                {patient.appointments && patient.appointments.length > 0 ? (
                                    patient.appointments.map((appointment) => (
                                        <div key={appointment.id} className={`appointment-card ${appointment.status}`}>
                                            <div className="appointment-header">
                                                <div className="appointment-date-time">
                                                    <div className="appointment-date">
                                                        <FaCalendarAlt /> {appointment.date}
                                                    </div>
                                                    <div className="appointment-time">{appointment.time}</div>
                                                </div>
                                                <span className={`status-badge ${appointment.status}`}>{t(appointment.status)}</span>
                                            </div>
                                            <div className="appointment-details">
                                                <div className="appointment-type">
                                                    <strong>{t("type")}:</strong> {appointment.type}
                                                </div>
                                                <div className="appointment-doctor">
                                                    <strong>{t("doctor")}:</strong> {appointment.doctorName}
                                                </div>
                                            </div>
                                            {appointment.notes && (
                                                <div className="appointment-notes">
                                                    <strong>{t("notes")}:</strong> {appointment.notes}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-data">{t("no_appointments_found")}</div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "history" && (
                        <div className="patient-history-tab">
                            <div className="history-header">
                                <h3>
                                    <FaHistory /> {t("medical_history")}
                                </h3>
                            </div>

                            <div className="medical-history-list">
                                {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
                                    patient.medicalHistory.map((history) => (
                                        <div key={history.id} className="medical-history-card">
                                            <div className="medical-history-header">
                                                <h4>{history.condition}</h4>
                                                <div className="medical-history-date">
                                                    <FaCalendarAlt /> {history.date}
                                                </div>
                                            </div>
                                            <div className="medical-history-details">
                                                <div className="medical-history-hospital">
                                                    <FaHospital /> <strong>{t("hospital")}:</strong> {history.hospital}
                                                </div>
                                                <div className="medical-history-description">
                                                    <FaClipboardList /> <strong>{t("description")}:</strong> {history.description}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-data">{t("no_medical_history_found")}</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PatientDetails

