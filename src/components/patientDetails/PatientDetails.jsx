"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useLanguage } from "../../contexts/LanguageContext"
import apiPatientId from "../../api/apiPatientsId"
import apiBranches from "../../api/apiBranches"
import apiPatientDetailReception from "../../api/apiPatientDetailReception"
import Pagination from "../pagination/Pagination"
import ConfirmModal from "../modal/ConfirmModal"
import SuccessModal from "../modal/SuccessModal"
import {
    FaArrowLeft,
    FaEdit,
    FaFilePdf,
    FaFileExcel,
    FaUser,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaStethoscope,
    FaUserMd,
    FaRulerVertical,
    FaWeight,
    FaTint,
    FaBirthdayCake,
    FaExclamationTriangle,
    FaSave,
    FaTimes,
    FaClinicMedical,
    FaMoneyBillWave,
    FaDoorOpen,
    FaCheckCircle,
    FaHourglass,
    FaTimesCircle,
    FaExternalLinkAlt,
    FaCommentMedical,
    FaHospital,
    FaCalendarCheck,
    FaIdCard,
    FaRegClock,
} from "react-icons/fa"

export default function PatientDetails() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { t } = useLanguage()
    const { selectedBranch } = useAuth()

    // State variables
    const [patient, setPatient] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editedPatient, setEditedPatient] = useState(null)
    const [branches, setBranches] = useState([])
    const [branchesLoading, setBranchesLoading] = useState(true)

    // Appointments state
    const [appointments, setAppointments] = useState([])
    const [appointmentsLoading, setAppointmentsLoading] = useState(true)
    const [appointmentsError, setAppointmentsError] = useState(null)
    const [appointmentsTotalCount, setAppointmentsTotalCount] = useState(0)
    const [appointmentsCurrentPage, setAppointmentsCurrentPage] = useState(0)
    const [appointmentsItemsPerPage, setAppointmentsItemsPerPage] = useState(6)

    // Modal states
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [confirmModalProps, setConfirmModalProps] = useState({
        title: "",
        message: "",
        confirmText: "",
        cancelText: "",
        type: "warning",
        onConfirm: () => { },
    })
    const [successModalProps, setSuccessModalProps] = useState({
        title: "",
        message: "",
    })

    // Fetch patient data
    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await apiPatientId.fetchPatientById(id)
                setPatient(data)
                setEditedPatient(data)
            } catch (err) {
                console.error("Error fetching patient:", err)
                setError(err.message || t("error_fetching_patient"))
            } finally {
                setLoading(false)
            }
        }

        fetchPatientData()
    }, [id, t])

    // Fetch branches
    useEffect(() => {
        const fetchBranches = async () => {
            try {
                setBranchesLoading(true)
                const branchesData = await apiBranches.fetchBranches()
                setBranches(branchesData.results || branchesData)
                setBranchesLoading(false)
            } catch (err) {
                console.error("Error fetching branches:", err)
                setBranchesLoading(false)
            }
        }

        fetchBranches()
    }, [])

    // Fetch patient appointments
    useEffect(() => {
        const fetchPatientAppointments = async () => {
            if (!id) return

            try {
                setAppointmentsLoading(true)
                setAppointmentsError(null)
                const data = await apiPatientDetailReception.fetchPatientAppointments(
                    id,
                    appointmentsCurrentPage + 1,
                    appointmentsItemsPerPage,
                )
                setAppointments(data.results || [])
                setAppointmentsTotalCount(data.count || 0)
                setAppointmentsLoading(false)
            } catch (err) {
                console.error("Error fetching patient appointments:", err)
                setAppointmentsError(err.message || t("error_fetching_appointments"))
                setAppointmentsLoading(false)
            }
        }

        fetchPatientAppointments()
    }, [id, appointmentsCurrentPage, appointmentsItemsPerPage, t])

    // Handle back button click
    const handleBack = () => {
        navigate("/dashboard/director/patients")
    }

    // Handle edit button click
    const handleEdit = () => {
        setIsEditing(true)
    }

    // Handle cancel edit
    const handleCancelEdit = () => {
        setEditedPatient(patient)
        setIsEditing(false)
    }

    // Handle input change in edit form
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedPatient({
            ...editedPatient,
            [name]: name === "age" || name === "branch" ? Number(value) : value,
        })
    }

    // Handle save changes
    const handleSaveChanges = async () => {
        try {
            setLoading(true)
            await apiPatientId.updatePatient(id, editedPatient)
            setPatient(editedPatient)
            setIsEditing(false)
            setSuccessModalProps({
                title: t("success"),
                message: t("patient_updated_successfully"),
            })
            setShowSuccessModal(true)
        } catch (err) {
            console.error("Error updating patient:", err)
            setError(err.message || t("error_updating_patient"))
        } finally {
            setLoading(false)
        }
    }

    // Handle export as PDF
    const handleExportPDF = async () => {
        try {
            setLoading(true)
            const pdfBlob = await apiPatientId.exportPatientAsPDF(id)

            // Create a download link for the PDF
            const url = window.URL.createObjectURL(new Blob([pdfBlob], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `patient_${id}_${patient?.full_name || "details"}.pdf`)
            document.body.appendChild(link)
            link.click()

            // Clean up
            window.URL.revokeObjectURL(url)
            link.remove()

            setLoading(false)
        } catch (err) {
            console.error("Error exporting PDF:", err)
            setError(err.message || t("error_exporting_pdf"))
            setLoading(false)

            // Show error modal
            setConfirmModalProps({
                title: t("export_error"),
                message: t("error_exporting_pdf"),
                confirmText: t("ok"),
                type: "error",
                onConfirm: () => setShowConfirmModal(false),
            })
            setShowConfirmModal(true)
        }
    }

    // Handle export as Excel
    const handleExportExcel = async () => {
        try {
            setLoading(true)
            const excelBlob = await apiPatientId.exportPatientAsExcel(id)

            // Create a download link for the Excel file
            const url = window.URL.createObjectURL(
                new Blob([excelBlob], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
            )
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `patient_${id}_${patient?.full_name || "details"}.xlsx`)
            document.body.appendChild(link)
            link.click()

            // Clean up
            window.URL.revokeObjectURL(url)
            link.remove()

            setLoading(false)
        } catch (err) {
            console.error("Error exporting Excel:", err)
            setError(err.message || t("error_exporting_excel"))
            setLoading(false)

            // Show error modal
            setConfirmModalProps({
                title: t("export_error"),
                message: t("error_exporting_excel"),
                confirmText: t("ok"),
                type: "error",
                onConfirm: () => setShowConfirmModal(false),
            })
            setShowConfirmModal(true)
        }
    }

    // Handle appointment page change
    const handleAppointmentPageChange = (selectedPage) => {
        setAppointmentsCurrentPage(selectedPage)
    }

    // Handle items per page change
    const handleAppointmentsItemsPerPageChange = (newItemsPerPage) => {
        setAppointmentsItemsPerPage(newItemsPerPage)
        setAppointmentsCurrentPage(0) // Reset to first page when changing items per page
    }

    // Handle appointment card click
    const handleAppointmentClick = (appointmentId) => {
        // Open in a new tab
        window.open(`/appointment-details/${appointmentId}`, "_blank")
    }

    // Get branch name by ID
    const getBranchName = (branchId) => {
        if (branchesLoading) return t("loading")
        const branch = branches.find((b) => b.id === branchId)
        return branch ? branch.name : t("unknown_branch")
    }

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return "-"
        return new Date(dateString).toLocaleDateString()
    }

    // Format time
    const formatTime = (dateString) => {
        if (!dateString) return "-"
        return new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    // Format datetime
    const formatDateTime = (dateString) => {
        if (!dateString) return "-"
        return `${formatDate(dateString)} ${formatTime(dateString)}`
    }

    // Get status badge class
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "completed":
                return "status-badge completed"
            case "scheduled":
                return "status-badge scheduled"
            case "cancelled":
                return "status-badge cancelled"
            default:
                return "status-badge"
        }
    }

    // Get status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case "completed":
                return <FaCheckCircle />
            case "scheduled":
                return <FaHourglass />
            case "cancelled":
                return <FaTimesCircle />
            default:
                return null
        }
    }

    // Translate status
    const translateStatus = (status) => {
        switch (status) {
            case "completed":
                return t("completed")
            case "scheduled":
                return t("scheduled")
            case "cancelled":
                return t("cancelled")
            default:
                return status
        }
    }

    // Loading state
    if (loading && !patient) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>{t("loading")}...</p>
            </div>
        )
    }

    // Error state
    if (error && !patient) {
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
        <div className="patient-details-container">
            <div className="patient-details-header">
                <button className="btn-back" onClick={handleBack}>
                    <FaArrowLeft /> {t("back_to_patients")}
                </button>
                <h1 className="patient-details-title">{t("patient_details")}</h1>
                <div className="patient-details-actions">
                    <button className="btn btn-outline btn-icon" onClick={handleExportPDF}>
                        <FaFilePdf /> PDF
                    </button>
                    <button className="btn btn-outline btn-icon" onClick={handleExportExcel}>
                        <FaFileExcel /> Excel
                    </button>
                    {!isEditing && (
                        <button className="btn btn-primary btn-icon" onClick={handleEdit}>
                            <FaEdit /> {t("edit")}
                        </button>
                    )}
                </div>
            </div>

            {patient && (
                <div className="patient-details-content">
                    {isEditing ? (
                        <div className="patient-edit-form">
                            <h2 className="section-title">{t("edit_patient_information")}</h2>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="full_name">{t("full_name")}</label>
                                    <input
                                        type="text"
                                        id="full_name"
                                        name="full_name"
                                        value={editedPatient.full_name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="age">{t("age")}</label>
                                    <input
                                        type="number"
                                        id="age"
                                        name="age"
                                        value={editedPatient.age}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="gender">{t("gender")}</label>
                                    <select id="gender" name="gender" value={editedPatient.gender} onChange={handleInputChange} required>
                                        <option value="male">{t("male")}</option>
                                        <option value="female">{t("female")}</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone_number">{t("phone")}</label>
                                    <input
                                        type="text"
                                        id="phone_number"
                                        name="phone_number"
                                        value={editedPatient.phone_number}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">{t("email")}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={editedPatient.email}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="status">{t("status")}</label>
                                    <select id="status" name="status" value={editedPatient.status} onChange={handleInputChange}>
                                        <option value="faol">{t("active")}</option>
                                        <option value="nofaol">{t("inactive")}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">{t("address")}</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={editedPatient.location}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="branch">{t("branch")}</label>
                                    <select id="branch" name="branch" value={editedPatient.branch} onChange={handleInputChange}>
                                        {branchesLoading ? (
                                            <option value="">{t("loading")}</option>
                                        ) : (
                                            branches.map((branch) => (
                                                <option key={branch.id} value={branch.id}>
                                                    {branch.name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="birth_date">{t("birth_date")}</label>
                                    <input
                                        type="date"
                                        id="birth_date"
                                        name="birth_date"
                                        value={editedPatient.birth_date || ""}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="height">{t("height")} (cm)</label>
                                    <input
                                        type="number"
                                        id="height"
                                        name="height"
                                        value={editedPatient.height || ""}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="weight">{t("weight")} (kg)</label>
                                    <input
                                        type="number"
                                        id="weight"
                                        name="weight"
                                        value={editedPatient.weight || ""}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="blood_type">{t("blood_type")}</label>
                                <select
                                    id="blood_type"
                                    name="blood_type"
                                    value={editedPatient.blood_type || ""}
                                    onChange={handleInputChange}
                                >
                                    <option value="">{t("select_blood_type")}</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                                    <FaTimes /> {t("cancel")}
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                                    <FaSave /> {t("save_changes")}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="patient-info-card">
                                <div className="patient-info-header">
                                    <div className="patient-avatar">
                                        <FaUser />
                                    </div>
                                    <div className="patient-basic-info">
                                        <h2 className="patient-name">{patient.full_name}</h2>
                                        <div className="patient-id">ID: {patient.id}</div>
                                        <div className={`patient-status ${patient.status}`}>
                                            {patient.status === "faol" ? t("active") : t("inactive")}
                                        </div>
                                    </div>
                                </div>

                                <div className="patient-info-body">
                                    <div className="info-section">
                                        <h3 className="section-title">{t("personal_information")}</h3>
                                        <div className="info-grid">
                                            <div className="info-item">
                                                <div className="info-label">
                                                    <FaUser /> {t("age")}
                                                </div>
                                                <div className="info-value">{patient.age}</div>
                                            </div>
                                            <div className="info-item">
                                                <div className="info-label">
                                                    <FaUser /> {t("gender")}
                                                </div>
                                                <div className="info-value">{t(patient.gender)}</div>
                                            </div>
                                            <div className="info-item">
                                                <div className="info-label">
                                                    <FaPhone /> {t("phone")}
                                                </div>
                                                <div className="info-value">{patient.phone_number}</div>
                                            </div>
                                            <div className="info-item">
                                                <div className="info-label">
                                                    <FaEnvelope /> {t("email")}
                                                </div>
                                                <div className="info-value">{patient.email || "-"}</div>
                                            </div>
                                            <div className="info-item">
                                                <div className="info-label">
                                                    <FaMapMarkerAlt /> {t("address")}
                                                </div>
                                                <div className="info-value">{patient.location || "-"}</div>
                                            </div>
                                            <div className="info-item">
                                                <div className="info-label">
                                                    <FaClinicMedical /> {t("branch")}
                                                </div>
                                                <div className="info-value">{getBranchName(patient.branch)}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="info-section">
                                        <h3 className="section-title">{t("medical_information")}</h3>
                                        <div className="info-grid">
                                            <div className="info-item">
                                                <div className="info-label">
                                                    <FaRulerVertical /> {t("height")}
                                                </div>
                                                <div className="info-value">{patient.height ? `${patient.height} cm` : "-"}</div>
                                            </div>
                                            <div className="info-item">
                                                <div className="info-label">
                                                    <FaWeight /> {t("weight")}
                                                </div>
                                                <div className="info-value">{patient.weight ? `${patient.weight} kg` : "-"}</div>
                                            </div>
                                            <div className="info-item">
                                                <div className="info-label">
                                                    <FaTint /> {t("blood_type")}
                                                </div>
                                                <div className="info-value">{patient.blood_type || "-"}</div>
                                            </div>
                                            <div className="info-item">
                                                <div className="info-label">
                                                    <FaBirthdayCake /> {t("birth_date")}
                                                </div>
                                                <div className="info-value">{patient.birth_date ? formatDate(patient.birth_date) : "-"}</div>
                                            </div>
                                            <div className="info-item">
                                                <div className="info-label">
                                                    <FaStethoscope /> {t("diagnosis")}
                                                </div>
                                                <div className="info-value">{patient.last_hospitalization_info?.diagnosis || "-"}</div>
                                            </div>
                                            <div className="info-item">
                                                <div className="info-label">
                                                    <FaUserMd /> {t("doctor")}
                                                </div>
                                                <div className="info-value">{patient.last_hospitalization_info?.doctor || "-"}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="info-section">
                                        <h3 className="section-title">{t("registration_information")}</h3>
                                        <div className="info-grid">
                                            <div className="info-item">
                                                <div className="info-label">
                                                    <FaCalendarAlt /> {t("created_at")}
                                                </div>
                                                <div className="info-value">{formatDate(patient.created_at)}</div>
                                            </div>
                                            <div className="info-item">
                                                <div className="info-label">
                                                    <FaCalendarAlt /> {t("updated_at")}
                                                </div>
                                                <div className="info-value">{formatDate(patient.updated_at)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Patient Appointments Section */}
                            <div className="patient-appointments-section">
                                <h3 className="section-title">{t("appointments")}</h3>

                                {appointmentsLoading ? (
                                    <div className="loading-container">
                                        <div className="loading-spinner"></div>
                                        <p>{t("loading_appointments")}...</p>
                                    </div>
                                ) : appointmentsError ? (
                                    <div className="error-container">
                                        <FaExclamationTriangle className="error-icon" />
                                        <p>{appointmentsError}</p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                setAppointmentsLoading(true)
                                                setAppointmentsError(null)
                                                apiPatientDetailReception
                                                    .fetchPatientAppointments(id, appointmentsCurrentPage + 1, appointmentsItemsPerPage)
                                                    .then((data) => {
                                                        setAppointments(data.results || [])
                                                        setAppointmentsTotalCount(data.count || 0)
                                                        setAppointmentsLoading(false)
                                                    })
                                                    .catch((err) => {
                                                        console.error("Error fetching patient appointments:", err)
                                                        setAppointmentsError(err.message || t("error_fetching_appointments"))
                                                        setAppointmentsLoading(false)
                                                    })
                                            }}
                                        >
                                            {t("try_again")}
                                        </button>
                                    </div>
                                ) : appointments.length === 0 ? (
                                    <div className="no-appointments">
                                        <p>{t("no_appointments_found")}</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="appointments-grid">
                                            {appointments.map((appointment) => (
                                                <div
                                                    key={appointment.id}
                                                    className={`appointment-card ${appointment.status}`}
                                                    onClick={() => handleAppointmentClick(appointment.id)}
                                                >
                                                    <div className="appointment-card-header">
                                                        <div className={getStatusBadgeClass(appointment.status)}>
                                                            {getStatusIcon(appointment.status)} {translateStatus(appointment.status)}
                                                        </div>
                                                        <div className="appointment-id">
                                                            <FaIdCard /> ID: {appointment.id}
                                                        </div>
                                                    </div>

                                                    <div className="appointment-card-body">
                                                        <div className="appointment-info-item">
                                                            <div className="appointment-info-label">
                                                                <FaCalendarCheck /> {t("date")}:
                                                            </div>
                                                            <div className="appointment-info-value">{formatDate(appointment.date)}</div>
                                                        </div>

                                                        <div className="appointment-info-item">
                                                            <div className="appointment-info-label">
                                                                <FaRegClock /> {t("time")}:
                                                            </div>
                                                            <div className="appointment-info-value">{formatTime(appointment.date)}</div>
                                                        </div>

                                                        <div className="appointment-info-item">
                                                            <div className="appointment-info-label">
                                                                <FaUserMd /> {t("doctor")}:
                                                            </div>
                                                            <div className="appointment-info-value">{appointment.doctor_name}</div>
                                                        </div>

                                                        <div className="appointment-info-item">
                                                            <div className="appointment-info-label">
                                                                <FaHospital /> {t("branch")}:
                                                            </div>
                                                            <div className="appointment-info-value">{getBranchName(appointment.branch)}</div>
                                                        </div>

                                                        <div className="appointment-info-item">
                                                            <div className="appointment-info-label">
                                                                <FaDoorOpen /> {t("room")}:
                                                            </div>
                                                            <div className="appointment-info-value">{appointment.room_name}</div>
                                                        </div>

                                                        <div className="appointment-info-item">
                                                            <div className="appointment-info-label">
                                                                <FaMoneyBillWave /> {t("payment")}:
                                                            </div>
                                                            <div className="appointment-info-value">
                                                                {appointment.payment_amount} {t("currency")}
                                                            </div>
                                                        </div>

                                                        {appointment.comment && (
                                                            <div className="appointment-info-item appointment-comment">
                                                                <div className="appointment-info-label">
                                                                    <FaCommentMedical /> {t("comment")}:
                                                                </div>
                                                                <div className="appointment-info-value">{appointment.comment}</div>
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="appointment-card-footer">
                                                        <span className="view-details">
                                                            {t("view_details")} <FaExternalLinkAlt />
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Pagination for appointments */}
                                        <Pagination
                                            pageCount={Math.ceil(appointmentsTotalCount / appointmentsItemsPerPage)}
                                            currentPage={appointmentsCurrentPage}
                                            onPageChange={handleAppointmentPageChange}
                                            itemsPerPage={appointmentsItemsPerPage}
                                            totalItems={appointmentsTotalCount}
                                            onItemsPerPageChange={handleAppointmentsItemsPerPageChange}
                                        />
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title={successModalProps.title}
                message={successModalProps.message}
                autoClose={true}
                autoCloseTime={3000}
            />

            {/* Confirm Modal */}
            <ConfirmModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={confirmModalProps.onConfirm}
                title={confirmModalProps.title}
                message={confirmModalProps.message}
                confirmText={confirmModalProps.confirmText}
                cancelText={confirmModalProps.cancelText}
                type={confirmModalProps.type}
                isLoading={loading}
            />
        </div>
    )
}
