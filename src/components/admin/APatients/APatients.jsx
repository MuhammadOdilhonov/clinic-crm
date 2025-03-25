import React, { useState, useEffect } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import {
    FaSearch,
    FaFilter,
    FaPlus,
    FaEdit,
    FaTrash,
    FaFileMedical,
    FaCalendarPlus,
    FaUserInjured,
    FaExclamationTriangle,
    FaFileExport,
    FaFileImport,
} from "react-icons/fa"

export default function APatients() {
    const { selectedBranch } = useAuth()
    const { t } = useLanguage()
    const [patients, setPatients] = useState([])
    const [filteredPatients, setFilteredPatients] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filterGender, setFilterGender] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")
    const [sortBy, setSortBy] = useState("name")
    const [sortOrder, setSortOrder] = useState("asc")
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [newPatient, setNewPatient] = useState({
        name: "",
        age: "",
        gender: "male",
        phone: "",
        email: "",
        address: "",
        bloodGroup: "",
        allergies: "",
        medicalHistory: "",
        emergencyContact: "",
        registrationDate: new Date().toISOString().split("T")[0],
    })

    // Fetch patients data
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                setLoading(true)

                // Simulate API call
                setTimeout(() => {
                    // Mock patients data
                    const mockPatients = [
                        {
                            id: 1,
                            name: "Alisher Karimov",
                            age: 45,
                            gender: "male",
                            phone: "+998 90 123 45 67",
                            email: "alisher@example.com",
                            address: "Tashkent, Chilanzar district",
                            bloodGroup: "A+",
                            allergies: "Penicillin",
                            medicalHistory: "Hypertension, Diabetes",
                            emergencyContact: "+998 90 987 65 43",
                            registrationDate: "2023-01-15",
                            lastVisit: "2023-05-15",
                            status: "active",
                            branch: "branch1",
                        },
                        {
                            id: 2,
                            name: "Nilufar Rahimova",
                            age: 32,
                            gender: "female",
                            phone: "+998 90 234 56 78",
                            email: "nilufar@example.com",
                            address: "Tashkent, Yunusabad district",
                            bloodGroup: "B-",
                            allergies: "None",
                            medicalHistory: "Migraine",
                            emergencyContact: "+998 90 876 54 32",
                            registrationDate: "2023-02-20",
                            lastVisit: "2023-05-14",
                            status: "active",
                            branch: "branch1",
                        },
                        {
                            id: 3,
                            name: "Sardor Aliyev",
                            age: 28,
                            gender: "male",
                            phone: "+998 90 345 67 89",
                            email: "sardor@example.com",
                            address: "Tashkent, Mirabad district",
                            bloodGroup: "O+",
                            allergies: "Sulfa drugs",
                            medicalHistory: "Asthma",
                            emergencyContact: "+998 90 765 43 21",
                            registrationDate: "2023-03-10",
                            lastVisit: "2023-05-13",
                            status: "active",
                            branch: "branch2",
                        },
                        {
                            id: 4,
                            name: "Malika Umarova",
                            age: 50,
                            gender: "female",
                            phone: "+998 90 456 78 90",
                            email: "malika@example.com",
                            address: "Tashkent, Shaykhantaur district",
                            bloodGroup: "AB+",
                            allergies: "Latex",
                            medicalHistory: "Arthritis",
                            emergencyContact: "+998 90 654 32 10",
                            registrationDate: "2023-04-05",
                            lastVisit: "2023-05-12",
                            status: "inactive",
                            branch: "branch3",
                        },
                        {
                            id: 5,
                            name: "Jasur Toshmatov",
                            age: 35,
                            gender: "male",
                            phone: "+998 90 567 89 01",
                            email: "jasur@example.com",
                            address: "Tashkent, Almazar district",
                            bloodGroup: "A-",
                            allergies: "None",
                            medicalHistory: "None",
                            emergencyContact: "+998 90 543 21 09",
                            registrationDate: "2023-05-01",
                            lastVisit: "2023-05-11",
                            status: "active",
                            branch: "branch2",
                        },
                    ]

                    // Filter by branch if needed
                    let branchFilteredPatients = mockPatients
                    if (selectedBranch !== "all") {
                        branchFilteredPatients = mockPatients.filter((patient) => patient.branch === selectedBranch)
                    }

                    setPatients(branchFilteredPatients)
                    setFilteredPatients(branchFilteredPatients)
                    setLoading(false)
                }, 500)
            } catch (err) {
                setError(err.message || "An error occurred")
                setLoading(false)
            }
        }

        fetchPatients()
    }, [selectedBranch])

    // Filter and sort patients
    useEffect(() => {
        let result = [...patients]

        // Apply search filter
        if (searchTerm) {
            result = result.filter(
                (patient) =>
                    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    patient.phone.includes(searchTerm) ||
                    patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        // Apply gender filter
        if (filterGender !== "all") {
            result = result.filter((patient) => patient.gender === filterGender)
        }

        // Apply status filter
        if (filterStatus !== "all") {
            result = result.filter((patient) => patient.status === filterStatus)
        }

        // Apply sorting
        result.sort((a, b) => {
            let comparison = 0

            switch (sortBy) {
                case "name":
                    comparison = a.name.localeCompare(b.name)
                    break
                case "age":
                    comparison = a.age - b.age
                    break
                case "registrationDate":
                    comparison = new Date(a.registrationDate) - new Date(b.registrationDate)
                    break
                case "lastVisit":
                    comparison = new Date(a.lastVisit) - new Date(b.lastVisit)
                    break
                default:
                    comparison = 0
            }

            return sortOrder === "asc" ? comparison : -comparison
        })

        setFilteredPatients(result)
    }, [patients, searchTerm, filterGender, filterStatus, sortBy, sortOrder])

    // Handle search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    // Handle filter changes
    const handleFilterGender = (e) => {
        setFilterGender(e.target.value)
    }

    const handleFilterStatus = (e) => {
        setFilterStatus(e.target.value)
    }

    // Handle sort changes
    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        } else {
            setSortBy(field)
            setSortOrder("asc")
        }
    }

    // Open add patient modal
    const openAddModal = () => {
        setNewPatient({
            name: "",
            age: "",
            gender: "male",
            phone: "",
            email: "",
            address: "",
            bloodGroup: "",
            allergies: "",
            medicalHistory: "",
            emergencyContact: "",
            registrationDate: new Date().toISOString().split("T")[0],
        })
        setShowAddModal(true)
    }

    // Open edit patient modal
    const openEditModal = (patient) => {
        setSelectedPatient(patient)
        setShowEditModal(true)
    }

    // Handle new patient form input changes
    const handleNewPatientChange = (e) => {
        const { name, value } = e.target
        setNewPatient({
            ...newPatient,
            [name]: value,
        })
    }

    // Handle add patient form submission
    const handleAddPatient = (e) => {
        e.preventDefault()

        const newPatientWithId = {
            ...newPatient,
            id: patients.length + 1,
            lastVisit: newPatient.registrationDate,
            status: "active",
            branch: selectedBranch === "all" ? "branch1" : selectedBranch,
        }

        setPatients([...patients, newPatientWithId])
        setShowAddModal(false)
    }

    // Handle edit patient form submission
    const handleEditPatient = (e) => {
        e.preventDefault()

        const updatedPatients = patients.map((patient) => (patient.id === selectedPatient.id ? selectedPatient : patient))

        setPatients(updatedPatients)
        setShowEditModal(false)
    }

    // Handle delete patient
    const handleDeletePatient = (id) => {
        if (window.confirm(t("confirm_delete_patient"))) {
            const updatedPatients = patients.filter((patient) => patient.id !== id)
            setPatients(updatedPatients)
        }
    }

    // Handle selected patient form input changes
    const handleSelectedPatientChange = (e) => {
        const { name, value } = e.target
        setSelectedPatient({
            ...selectedPatient,
            [name]: value,
        })
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
        <div className="admin-patients">
            <div className="page-header">
                <h1>
                    <FaUserInjured /> {t("patients_management")}
                </h1>
                <div className="header-actions">
                    <button className="btn btn-primary" onClick={openAddModal}>
                        <FaPlus /> {t("add_patient")}
                    </button>
                    <button className="btn btn-outline">
                        <FaFileExport /> {t("export")}
                    </button>
                    <button className="btn btn-outline">
                        <FaFileImport /> {t("import")}
                    </button>
                </div>
            </div>

            <div className="filters-bar">
                <div className="search-box">
                    <FaSearch />
                    <input type="text" placeholder={t("search_patients")} value={searchTerm} onChange={handleSearch} />
                </div>

                <div className="filters">
                    <div className="filter-group">
                        <FaFilter />
                        <select value={filterGender} onChange={handleFilterGender}>
                            <option value="all">{t("all_genders")}</option>
                            <option value="male">{t("male")}</option>
                            <option value="female">{t("female")}</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <select value={filterStatus} onChange={handleFilterStatus}>
                            <option value="all">{t("all_statuses")}</option>
                            <option value="active">{t("active")}</option>
                            <option value="inactive">{t("inactive")}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="patients-table-container">
                <table className="patients-table">
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("name")} className={sortBy === "name" ? `sort-${sortOrder}` : ""}>
                                {t("name")}
                            </th>
                            <th onClick={() => handleSort("age")} className={sortBy === "age" ? `sort-${sortOrder}` : ""}>
                                {t("age")}
                            </th>
                            <th>{t("gender")}</th>
                            <th>{t("phone")}</th>
                            <th>{t("email")}</th>
                            <th
                                onClick={() => handleSort("registrationDate")}
                                className={sortBy === "registrationDate" ? `sort-${sortOrder}` : ""}
                            >
                                {t("registration_date")}
                            </th>
                            <th onClick={() => handleSort("lastVisit")} className={sortBy === "lastVisit" ? `sort-${sortOrder}` : ""}>
                                {t("last_visit")}
                            </th>
                            <th>{t("status")}</th>
                            <th>{t("actions")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.length > 0 ? (
                            filteredPatients.map((patient) => (
                                <tr key={patient.id}>
                                    <td>{patient.name}</td>
                                    <td>{patient.age}</td>
                                    <td>{t(patient.gender)}</td>
                                    <td>{patient.phone}</td>
                                    <td>{patient.email}</td>
                                    <td>{patient.registrationDate}</td>
                                    <td>{patient.lastVisit}</td>
                                    <td>
                                        <span className={`status-badge ${patient.status}`}>{t(patient.status)}</span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="btn-icon view" title={t("view_details")}>
                                                <FaFileMedical />
                                            </button>
                                            <button className="btn-icon edit" title={t("edit")} onClick={() => openEditModal(patient)}>
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="btn-icon delete"
                                                title={t("delete")}
                                                onClick={() => handleDeletePatient(patient.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                            <button className="btn-icon appointment" title={t("schedule_appointment")}>
                                                <FaCalendarPlus />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="no-data">
                                    <p>{t("no_patients_found")}</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Patient Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>{t("add_new_patient")}</h3>
                            <button className="close-btn" onClick={() => setShowAddModal(false)}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleAddPatient}>
                            <div className="modal-body">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">{t("full_name")}</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={newPatient.name}
                                            onChange={handleNewPatientChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="age">{t("age")}</label>
                                        <input
                                            type="number"
                                            id="age"
                                            name="age"
                                            value={newPatient.age}
                                            onChange={handleNewPatientChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="gender">{t("gender")}</label>
                                        <select id="gender" name="gender" value={newPatient.gender} onChange={handleNewPatientChange}>
                                            <option value="male">{t("male")}</option>
                                            <option value="female">{t("female")}</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">{t("phone")}</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            name="phone"
                                            value={newPatient.phone}
                                            onChange={handleNewPatientChange}
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
                                            value={newPatient.email}
                                            onChange={handleNewPatientChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="bloodGroup">{t("blood_group")}</label>
                                        <select
                                            id="bloodGroup"
                                            name="bloodGroup"
                                            value={newPatient.bloodGroup}
                                            onChange={handleNewPatientChange}
                                        >
                                            <option value="">{t("select_blood_group")}</option>
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
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address">{t("address")}</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={newPatient.address}
                                        onChange={handleNewPatientChange}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="allergies">{t("allergies")}</label>
                                        <input
                                            type="text"
                                            id="allergies"
                                            name="allergies"
                                            value={newPatient.allergies}
                                            onChange={handleNewPatientChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="emergencyContact">{t("emergency_contact")}</label>
                                        <input
                                            type="text"
                                            id="emergencyContact"
                                            name="emergencyContact"
                                            value={newPatient.emergencyContact}
                                            onChange={handleNewPatientChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="medicalHistory">{t("medical_history")}</label>
                                    <textarea
                                        id="medicalHistory"
                                        name="medicalHistory"
                                        value={newPatient.medicalHistory}
                                        onChange={handleNewPatientChange}
                                        rows="3"
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="registrationDate">{t("registration_date")}</label>
                                    <input
                                        type="date"
                                        id="registrationDate"
                                        name="registrationDate"
                                        value={newPatient.registrationDate}
                                        onChange={handleNewPatientChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                                    {t("cancel")}
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {t("add_patient")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Patient Modal */}
            {showEditModal && selectedPatient && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>{t("edit_patient")}</h3>
                            <button className="close-btn" onClick={() => setShowEditModal(false)}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleEditPatient}>
                            <div className="modal-body">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="edit-name">{t("full_name")}</label>
                                        <input
                                            type="text"
                                            id="edit-name"
                                            name="name"
                                            value={selectedPatient.name}
                                            onChange={handleSelectedPatientChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="edit-age">{t("age")}</label>
                                        <input
                                            type="number"
                                            id="edit-age"
                                            name="age"
                                            value={selectedPatient.age}
                                            onChange={handleSelectedPatientChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="edit-gender">{t("gender")}</label>
                                        <select
                                            id="edit-gender"
                                            name="gender"
                                            value={selectedPatient.gender}
                                            onChange={handleSelectedPatientChange}
                                        >
                                            <option value="male">{t("male")}</option>
                                            <option value="female">{t("female")}</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="edit-phone">{t("phone")}</label>
                                        <input
                                            type="text"
                                            id="edit-phone"
                                            name="phone"
                                            value={selectedPatient.phone}
                                            onChange={handleSelectedPatientChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="edit-email">{t("email")}</label>
                                        <input
                                            type="email"
                                            id="edit-email"
                                            name="email"
                                            value={selectedPatient.email}
                                            onChange={handleSelectedPatientChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="edit-bloodGroup">{t("blood_group")}</label>
                                        <select
                                            id="edit-bloodGroup"
                                            name="bloodGroup"
                                            value={selectedPatient.bloodGroup}
                                            onChange={handleSelectedPatientChange}
                                        >
                                            <option value="">{t("select_blood_group")}</option>
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
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-address">{t("address")}</label>
                                    <input
                                        type="text"
                                        id="edit-address"
                                        name="address"
                                        value={selectedPatient.address}
                                        onChange={handleSelectedPatientChange}
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="edit-allergies">{t("allergies")}</label>
                                        <input
                                            type="text"
                                            id="edit-allergies"
                                            name="allergies"
                                            value={selectedPatient.allergies}
                                            onChange={handleSelectedPatientChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="edit-emergencyContact">{t("emergency_contact")}</label>
                                        <input
                                            type="text"
                                            id="edit-emergencyContact"
                                            name="emergencyContact"
                                            value={selectedPatient.emergencyContact}
                                            onChange={handleSelectedPatientChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="edit-medicalHistory">{t("medical_history")}</label>
                                    <textarea
                                        id="edit-medicalHistory"
                                        name="medicalHistory"
                                        value={selectedPatient.medicalHistory}
                                        onChange={handleSelectedPatientChange}
                                        rows="3"
                                    ></textarea>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="edit-status">{t("status")}</label>
                                        <select
                                            id="edit-status"
                                            name="status"
                                            value={selectedPatient.status}
                                            onChange={handleSelectedPatientChange}
                                        >
                                            <option value="active">{t("active")}</option>
                                            <option value="inactive">{t("inactive")}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                                    {t("cancel")}
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {t("save_changes")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
};