import React, { useState, useEffect } from "react"
import {
    FaSearch,
    FaEdit,
    FaTrash,
    FaTimes,
    FaFilter,
    FaFilePdf,
    FaFileExcel,
    FaUserPlus,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaStethoscope,
    FaUserMd,
} from "react-icons/fa"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"

export default function Patients() {
    const { selectedBranch } = useAuth()
    const { t } = useLanguage()

    // Mock data for patients
    const initialPatientsData = {
        all: [
            {
                id: 1,
                name: "Alisher Karimov",
                age: 45,
                gender: "male",
                phone: "+998 90 123 45 67",
                email: "alisher@example.com",
                address: "Toshkent sh., Chilonzor tumani",
                lastVisit: "2023-05-15",
                diagnosis: "Yurak kasalligi",
                doctor: "Dr. Aziz Karimov",
                branch: "branch1",
                status: "active",
            },
            {
                id: 2,
                name: "Nilufar Rahimova",
                age: 32,
                gender: "female",
                phone: "+998 90 234 56 78",
                email: "nilufar@example.com",
                address: "Toshkent sh., Yunusobod tumani",
                lastVisit: "2023-05-14",
                diagnosis: "Bosh og'rig'i",
                doctor: "Dr. Jasur Toshmatov",
                branch: "branch1",
                status: "active",
            },
            {
                id: 3,
                name: "Sardor Aliyev",
                age: 28,
                gender: "male",
                phone: "+998 90 345 67 89",
                email: "sardor@example.com",
                address: "Toshkent sh., Mirzo Ulug'bek tumani",
                lastVisit: "2023-05-13",
                diagnosis: "Yurak ritmi buzilishi",
                doctor: "Dr. Aziz Karimov",
                branch: "branch2",
                status: "inactive",
            },
            {
                id: 4,
                name: "Malika Umarova",
                age: 35,
                gender: "female",
                phone: "+998 90 456 78 90",
                email: "malika@example.com",
                address: "Toshkent sh., Shayxontohur tumani",
                lastVisit: "2023-05-12",
                diagnosis: "Allergiya",
                doctor: "Dr. Nilufar Rahimova",
                branch: "branch2",
                status: "active",
            },
            {
                id: 5,
                name: "Jasur Toshmatov",
                age: 50,
                gender: "male",
                phone: "+998 90 567 89 01",
                email: "jasur@example.com",
                address: "Toshkent sh., Olmazor tumani",
                lastVisit: "2023-05-11",
                diagnosis: "Qon bosimi",
                doctor: "Dr. Sardor Aliyev",
                branch: "branch3",
                status: "active",
            },
            {
                id: 6,
                name: "Kamola Yusupova",
                age: 27,
                gender: "female",
                phone: "+998 90 678 90 12",
                email: "kamola@example.com",
                address: "Toshkent sh., Bektemir tumani",
                lastVisit: "2023-05-10",
                diagnosis: "Gripp",
                doctor: "Dr. Malika Umarova",
                branch: "branch3",
                status: "inactive",
            },
        ],
        branch1: [
            {
                id: 1,
                name: "Alisher Karimov",
                age: 45,
                gender: "male",
                phone: "+998 90 123 45 67",
                email: "alisher@example.com",
                address: "Toshkent sh., Chilonzor tumani",
                lastVisit: "2023-05-15",
                diagnosis: "Yurak kasalligi",
                doctor: "Dr. Aziz Karimov",
                branch: "branch1",
                status: "active",
            },
            {
                id: 2,
                name: "Nilufar Rahimova",
                age: 32,
                gender: "female",
                phone: "+998 90 234 56 78",
                email: "nilufar@example.com",
                address: "Toshkent sh., Yunusobod tumani",
                lastVisit: "2023-05-14",
                diagnosis: "Bosh og'rig'i",
                doctor: "Dr. Jasur Toshmatov",
                branch: "branch1",
                status: "active",
            },
        ],
        branch2: [
            {
                id: 3,
                name: "Sardor Aliyev",
                age: 28,
                gender: "male",
                phone: "+998 90 345 67 89",
                email: "sardor@example.com",
                address: "Toshkent sh., Mirzo Ulug'bek tumani",
                lastVisit: "2023-05-13",
                diagnosis: "Yurak ritmi buzilishi",
                doctor: "Dr. Aziz Karimov",
                branch: "branch2",
                status: "inactive",
            },
            {
                id: 4,
                name: "Malika Umarova",
                age: 35,
                gender: "female",
                phone: "+998 90 456 78 90",
                email: "malika@example.com",
                address: "Toshkent sh., Shayxontohur tumani",
                lastVisit: "2023-05-12",
                diagnosis: "Allergiya",
                doctor: "Dr. Nilufar Rahimova",
                branch: "branch2",
                status: "active",
            },
        ],
        branch3: [
            {
                id: 5,
                name: "Jasur Toshmatov",
                age: 50,
                gender: "male",
                phone: "+998 90 567 89 01",
                email: "jasur@example.com",
                address: "Toshkent sh., Olmazor tumani",
                lastVisit: "2023-05-11",
                diagnosis: "Qon bosimi",
                doctor: "Dr. Sardor Aliyev",
                branch: "branch3",
                status: "active",
            },
            {
                id: 6,
                name: "Kamola Yusupova",
                age: 27,
                gender: "female",
                phone: "+998 90 678 90 12",
                email: "kamola@example.com",
                address: "Toshkent sh., Bektemir tumani",
                lastVisit: "2023-05-10",
                diagnosis: "Gripp",
                doctor: "Dr. Malika Umarova",
                branch: "branch3",
                status: "inactive",
            },
        ],
    }

    const [initialPatients, setInitialPatients] = useState(
        selectedBranch === "all" ? initialPatientsData.all : initialPatientsData[selectedBranch],
    )
    const [patients, setPatients] = useState(initialPatients)
    const [searchTerm, setSearchTerm] = useState("")
    const [showSidebar, setShowSidebar] = useState(false)
    const [showEditSidebar, setShowEditSidebar] = useState(false)
    const [currentPatient, setCurrentPatient] = useState(null)
    const [newPatient, setNewPatient] = useState({
        name: "",
        age: "",
        gender: "male",
        phone: "",
        email: "",
        address: "",
        diagnosis: "",
        doctor: "",
        branch: selectedBranch === "all" ? "branch1" : selectedBranch,
        status: "active",
    })
    const [filterGender, setFilterGender] = useState("all")
    const [filterAge, setFilterAge] = useState("all")
    const [filterBranch, setFilterBranch] = useState(selectedBranch)
    const [filterStatus, setFilterStatus] = useState("all")
    const [showFilters, setShowFilters] = useState(false)
    const [viewMode, setViewMode] = useState("table") // table or grid

    // Update patients when branch changes
    useEffect(() => {
        if (selectedBranch === "all") {
            setInitialPatients(initialPatientsData.all)
            setPatients(initialPatientsData.all)
        } else {
            setInitialPatients(initialPatientsData[selectedBranch])
            setPatients(initialPatientsData[selectedBranch])
        }

        setNewPatient({
            ...newPatient,
            branch: selectedBranch === "all" ? "branch1" : selectedBranch,
        })

        setFilterBranch(selectedBranch)
    }, [selectedBranch])

    // Filter patients based on search term, gender, age, status and branch
    useEffect(() => {
        let filteredPatients = [...initialPatients]

        // Filter by search term
        if (searchTerm) {
            filteredPatients = filteredPatients.filter(
                (patient) =>
                    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    patient.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    patient.email.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        // Filter by gender
        if (filterGender !== "all") {
            filteredPatients = filteredPatients.filter((patient) => patient.gender === filterGender)
        }

        // Filter by age
        if (filterAge !== "all") {
            if (filterAge === "0-18") {
                filteredPatients = filteredPatients.filter((patient) => patient.age <= 18)
            } else if (filterAge === "19-35") {
                filteredPatients = filteredPatients.filter((patient) => patient.age > 18 && patient.age <= 35)
            } else if (filterAge === "36-50") {
                filteredPatients = filteredPatients.filter((patient) => patient.age > 35 && patient.age <= 50)
            } else if (filterAge === "51+") {
                filteredPatients = filteredPatients.filter((patient) => patient.age > 50)
            }
        }

        // Filter by status
        if (filterStatus !== "all") {
            filteredPatients = filteredPatients.filter((patient) => patient.status === filterStatus)
        }

        // Filter by branch (if viewing all branches)
        if (selectedBranch === "all" && filterBranch !== "all") {
            filteredPatients = filteredPatients.filter((patient) => patient.branch === filterBranch)
        }

        setPatients(filteredPatients)
    }, [searchTerm, filterGender, filterAge, filterStatus, filterBranch, initialPatients])

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    // Handle new patient input change
    const handleNewPatientChange = (e) => {
        const { name, value } = e.target
        setNewPatient({
            ...newPatient,
            [name]: name === "age" ? (value === "" ? "" : Number.parseInt(value)) : value,
        })
    }

    // Handle edit patient input change
    const handleEditPatientChange = (e) => {
        const { name, value } = e.target
        setCurrentPatient({
            ...currentPatient,
            [name]: name === "age" ? Number.parseInt(value) : value,
        })
    }

    // Open add sidebar
    const openAddSidebar = () => {
        setShowSidebar(true)
    }

    // Close add sidebar
    const closeAddSidebar = () => {
        setShowSidebar(false)
        setNewPatient({
            name: "",
            age: "",
            gender: "male",
            phone: "",
            email: "",
            address: "",
            diagnosis: "",
            doctor: "",
            branch: selectedBranch === "all" ? "branch1" : selectedBranch,
            status: "active",
        })
    }

    // Open edit sidebar
    const openEditSidebar = (patient) => {
        setCurrentPatient({ ...patient, _prevBranch: patient.branch })
        setShowEditSidebar(true)
    }

    // Close edit sidebar
    const closeEditSidebar = () => {
        setShowEditSidebar(false)
        setCurrentPatient(null)
    }

    // Toggle filters
    const toggleFilters = () => {
        setShowFilters(!showFilters)
    }

    // Toggle view mode
    const toggleViewMode = () => {
        setViewMode(viewMode === "table" ? "grid" : "table")
    }

    // Add new patient
    const addPatient = (e) => {
        e.preventDefault()
        const id = Math.max(...initialPatientsData.all.map((p) => p.id)) + 1
        const today = new Date().toISOString().split("T")[0]
        const newPatientItem = {
            ...newPatient,
            id,
            lastVisit: today,
        }

        // Update all patients data
        const updatedAllPatients = [...initialPatientsData.all, newPatientItem]
        initialPatientsData.all = updatedAllPatients

        // Update branch-specific patients data
        initialPatientsData[newPatientItem.branch] = [...initialPatientsData[newPatientItem.branch], newPatientItem]

        // Update current view
        if (selectedBranch === "all" || selectedBranch === newPatientItem.branch) {
            setInitialPatients((prev) => [...prev, newPatientItem])
        }

        closeAddSidebar()
    }

    // Update patient
    const updatePatient = (e) => {
        e.preventDefault()

        // Update in all patients data
        const updatedAllPatients = initialPatientsData.all.map((patient) =>
            patient.id === currentPatient.id ? currentPatient : patient,
        )
        initialPatientsData.all = updatedAllPatients

        // Update in branch-specific data
        // First remove from old branch if branch changed
        if (currentPatient.branch !== currentPatient._prevBranch && currentPatient._prevBranch) {
            initialPatientsData[currentPatient._prevBranch] = initialPatientsData[currentPatient._prevBranch].filter(
                (patient) => patient.id !== currentPatient.id,
            )
        }

        // Then add to new branch
        if (initialPatientsData[currentPatient.branch]) {
            initialPatientsData[currentPatient.branch] = initialPatientsData[currentPatient.branch].filter(
                (patient) => patient.id !== currentPatient.id,
            )
            initialPatientsData[currentPatient.branch].push(currentPatient)
        }

        // Update current view
        if (selectedBranch === "all") {
            setInitialPatients(updatedAllPatients)
        } else if (selectedBranch === currentPatient.branch) {
            setInitialPatients(initialPatientsData[selectedBranch])
        } else {
            setInitialPatients(initialPatients.filter((patient) => patient.id !== currentPatient.id))
        }

        closeEditSidebar()
    }

    // Delete patient
    const deletePatient = (id) => {
        if (window.confirm(t("confirm_delete_patient"))) {
            // Find the patient to get their branch
            const patientToDelete = initialPatientsData.all.find((patient) => patient.id === id)

            // Remove from all patients data
            initialPatientsData.all = initialPatientsData.all.filter((patient) => patient.id !== id)

            // Remove from branch-specific data
            if (patientToDelete && patientToDelete.branch) {
                initialPatientsData[patientToDelete.branch] = initialPatientsData[patientToDelete.branch].filter(
                    (patient) => patient.id !== id,
                )
            }

            // Update current view
            setInitialPatients((prev) => prev.filter((patient) => patient.id !== id))
        }
    }

    // Export to PDF
    const exportToPDF = () => {
        alert(t("export_to_pdf"))
    }

    // Export to Excel
    const exportToExcel = () => {
        alert(t("export_to_excel"))
    }

    // Get patient initials for avatar
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
    }

    return (
        <div className="mijoz-container">
            <div className="mijoz-header">
                <h1 className="mijoz-title">{t("patients")}</h1>
                <div className="mijoz-actions">
                    <button className="mijoz-btn mijoz-btn-outline mijoz-btn-icon" onClick={exportToPDF}>
                        <FaFilePdf /> PDF
                    </button>
                    <button className="mijoz-btn mijoz-btn-outline mijoz-btn-icon" onClick={exportToExcel}>
                        <FaFileExcel /> Excel
                    </button>
                    <button className="mijoz-btn mijoz-btn-outline mijoz-btn-icon" onClick={toggleViewMode}>
                        {viewMode === "table" ? "Grid View" : "Table View"}
                    </button>
                    <button className="mijoz-btn mijoz-btn-primary mijoz-btn-icon" onClick={openAddSidebar}>
                        <FaUserPlus /> {t("add_new_patient")}
                    </button>
                </div>
            </div>

            <div className="mijoz-filters-container">
                <div className="mijoz-search-filter">
                    <div className="mijoz-search-input">
                        <FaSearch className="mijoz-search-icon" />
                        <input type="text" placeholder={t("search")} value={searchTerm} onChange={handleSearchChange} />
                    </div>
                    <button className={`mijoz-filter-toggle-btn ${showFilters ? "active" : ""}`} onClick={toggleFilters}>
                        <FaFilter /> {t("filters")}
                    </button>
                </div>

                {showFilters && (
                    <div className="mijoz-advanced-filters">
                        <div className="mijoz-filter-group">
                            <label>{t("gender")}:</label>
                            <select value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                <option value="male">{t("male")}</option>
                                <option value="female">{t("female")}</option>
                            </select>
                        </div>

                        <div className="mijoz-filter-group">
                            <label>{t("age")}:</label>
                            <select value={filterAge} onChange={(e) => setFilterAge(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                <option value="0-18">0-18</option>
                                <option value="19-35">19-35</option>
                                <option value="36-50">36-50</option>
                                <option value="51+">51+</option>
                            </select>
                        </div>

                        <div className="mijoz-filter-group">
                            <label>{t("status")}:</label>
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                <option value="active">{t("active")}</option>
                                <option value="inactive">{t("inactive")}</option>
                            </select>
                        </div>

                        {selectedBranch === "all" && (
                            <div className="mijoz-filter-group">
                                <label>{t("branch")}:</label>
                                <select value={filterBranch} onChange={(e) => setFilterBranch(e.target.value)}>
                                    <option value="all">{t("all")}</option>
                                    <option value="branch1">{t("branch1")}</option>
                                    <option value="branch2">{t("branch2")}</option>
                                    <option value="branch3">{t("branch3")}</option>
                                </select>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {viewMode === "table" ? (
                <div className="mijoz-card">
                    <div className="mijoz-table-responsive">
                        <table className="mijoz-data-table">
                            <thead>
                                <tr>
                                    <th>{t("name")}</th>
                                    <th>{t("age")}</th>
                                    <th>{t("gender")}</th>
                                    <th>{t("phone")}</th>
                                    <th>{t("diagnosis")}</th>
                                    <th>{t("doctor")}</th>
                                    <th>{t("last_visit")}</th>
                                    <th>{t("status")}</th>
                                    <th>{t("actions")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.length > 0 ? (
                                    patients.map((patient) => (
                                        <tr key={patient.id}>
                                            <td>{patient.name}</td>
                                            <td>{patient.age}</td>
                                            <td>{patient.gender === "male" ? t("male") : t("female")}</td>
                                            <td>{patient.phone}</td>
                                            <td>{patient.diagnosis}</td>
                                            <td>{patient.doctor}</td>
                                            <td>{patient.lastVisit}</td>
                                            <td>
                                                <span className={`mijoz-status-badge ${patient.status}`}>
                                                    {patient.status === "active" ? t("active") : t("inactive")}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="mijoz-action-buttons">
                                                    <button className="mijoz-btn-icon edit" onClick={() => openEditSidebar(patient)}>
                                                        <FaEdit />
                                                    </button>
                                                    <button className="mijoz-btn-icon delete" onClick={() => deletePatient(patient.id)}>
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="mijoz-no-data">
                                            {t("no_data_found")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="mijoz-grid">
                    {patients.length > 0 ? (
                        patients.map((patient) => (
                            <div className="mijoz-patient-card" key={patient.id}>
                                <div className="mijoz-patient-header">
                                    <div className="mijoz-patient-avatar">{getInitials(patient.name)}</div>
                                    <div className="mijoz-patient-info">
                                        <h3 className="mijoz-patient-name">{patient.name}</h3>
                                        <p className="mijoz-patient-id">ID: {patient.id}</p>
                                        <span className={`mijoz-status-badge ${patient.status}`}>
                                            {patient.status === "active" ? t("active") : t("inactive")}
                                        </span>
                                    </div>
                                </div>
                                <div className="mijoz-patient-body">
                                    <div className="mijoz-patient-detail">
                                        <div className="mijoz-detail-icon">
                                            <FaPhone />
                                        </div>
                                        <div className="mijoz-detail-content">
                                            <div className="mijoz-detail-label">{t("phone")}</div>
                                            <div className="mijoz-detail-value">{patient.phone}</div>
                                        </div>
                                    </div>
                                    <div className="mijoz-patient-detail">
                                        <div className="mijoz-detail-icon">
                                            <FaEnvelope />
                                        </div>
                                        <div className="mijoz-detail-content">
                                            <div className="mijoz-detail-label">{t("email")}</div>
                                            <div className="mijoz-detail-value">{patient.email}</div>
                                        </div>
                                    </div>
                                    <div className="mijoz-patient-detail">
                                        <div className="mijoz-detail-icon">
                                            <FaMapMarkerAlt />
                                        </div>
                                        <div className="mijoz-detail-content">
                                            <div className="mijoz-detail-label">{t("address")}</div>
                                            <div className="mijoz-detail-value">{patient.address}</div>
                                        </div>
                                    </div>
                                    <div className="mijoz-patient-detail">
                                        <div className="mijoz-detail-icon">
                                            <FaCalendarAlt />
                                        </div>
                                        <div className="mijoz-detail-content">
                                            <div className="mijoz-detail-label">{t("last_visit")}</div>
                                            <div className="mijoz-detail-value">{patient.lastVisit}</div>
                                        </div>
                                    </div>
                                    <div className="mijoz-patient-detail">
                                        <div className="mijoz-detail-icon">
                                            <FaStethoscope />
                                        </div>
                                        <div className="mijoz-detail-content">
                                            <div className="mijoz-detail-label">{t("diagnosis")}</div>
                                            <div className="mijoz-detail-value">{patient.diagnosis}</div>
                                        </div>
                                    </div>
                                    <div className="mijoz-patient-detail">
                                        <div className="mijoz-detail-icon">
                                            <FaUserMd />
                                        </div>
                                        <div className="mijoz-detail-content">
                                            <div className="mijoz-detail-label">{t("doctor")}</div>
                                            <div className="mijoz-detail-value">{patient.doctor}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mijoz-patient-footer">
                                    <div className="mijoz-action-buttons">
                                        <button className="mijoz-btn-icon edit" onClick={() => openEditSidebar(patient)}>
                                            <FaEdit />
                                        </button>
                                        <button className="mijoz-btn-icon delete" onClick={() => deletePatient(patient.id)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="mijoz-no-data-grid">{t("no_data_found")}</div>
                    )}
                </div>
            )}

            {/* Add Patient Sidebar */}
            <div className={`mijoz-panel-overlay ${showSidebar ? "active" : ""}`} onClick={closeAddSidebar}></div>
            <div className={`mijoz-panel ${showSidebar ? "active" : ""}`}>
                <div className="mijoz-panel-header">
                    <h2>{t("add_new_patient")}</h2>
                    <button className="mijoz-panel-close-button" onClick={closeAddSidebar}>
                        <FaTimes />
                    </button>
                </div>
                <div className="mijoz-panel-content">
                    <form onSubmit={addPatient}>
                        <div className="mijoz-form-group">
                            <label>{t("full_name")}</label>
                            <input type="text" name="name" value={newPatient.name} onChange={handleNewPatientChange} required />
                        </div>

                        <div className="mijoz-form-row">
                            <div className="mijoz-form-group">
                                <label>{t("age")}</label>
                                <input type="number" name="age" value={newPatient.age} onChange={handleNewPatientChange} required />
                            </div>

                            <div className="mijoz-form-group">
                                <label>{t("gender")}</label>
                                <select name="gender" value={newPatient.gender} onChange={handleNewPatientChange} required>
                                    <option value="male">{t("male")}</option>
                                    <option value="female">{t("female")}</option>
                                </select>
                            </div>
                        </div>

                        <div className="mijoz-form-group">
                            <label>{t("phone")}</label>
                            <input type="text" name="phone" value={newPatient.phone} onChange={handleNewPatientChange} required />
                        </div>

                        <div className="mijoz-form-group">
                            <label>{t("email")}</label>
                            <input type="email" name="email" value={newPatient.email} onChange={handleNewPatientChange} />
                        </div>

                        <div className="mijoz-form-group">
                            <label>{t("address")}</label>
                            <input type="text" name="address" value={newPatient.address} onChange={handleNewPatientChange} />
                        </div>

                        <div className="mijoz-form-group">
                            <label>{t("diagnosis")}</label>
                            <input
                                type="text"
                                name="diagnosis"
                                value={newPatient.diagnosis}
                                onChange={handleNewPatientChange}
                                required
                            />
                        </div>

                        <div className="mijoz-form-group">
                            <label>{t("doctor")}</label>
                            <input type="text" name="doctor" value={newPatient.doctor} onChange={handleNewPatientChange} required />
                        </div>

                        <div className="mijoz-form-row">
                            {selectedBranch === "all" && (
                                <div className="mijoz-form-group">
                                    <label>{t("branch")}</label>
                                    <select name="branch" value={newPatient.branch} onChange={handleNewPatientChange}>
                                        <option value="branch1">{t("branch1")}</option>
                                        <option value="branch2">{t("branch2")}</option>
                                        <option value="branch3">{t("branch3")}</option>
                                    </select>
                                </div>
                            )}

                            <div className="mijoz-form-group">
                                <label>{t("status")}</label>
                                <select name="status" value={newPatient.status} onChange={handleNewPatientChange}>
                                    <option value="active">{t("active")}</option>
                                    <option value="inactive">{t("inactive")}</option>
                                </select>
                            </div>
                        </div>

                        <div className="mijoz-form-actions">
                            <button type="submit" className="mijoz-btn mijoz-btn-primary">
                                {t("add")}
                            </button>
                            <button type="button" className="mijoz-btn mijoz-btn-secondary" onClick={closeAddSidebar}>
                                {t("cancel")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Edit Patient Sidebar */}
            <div className={`mijoz-panel-overlay ${showEditSidebar ? "active" : ""}`} onClick={closeEditSidebar}></div>
            <div className={`mijoz-panel ${showEditSidebar ? "active" : ""}`}>
                {currentPatient && (
                    <>
                        <div className="mijoz-panel-header">
                            <h2>{t("edit_patient")}</h2>
                            <button className="mijoz-panel-close-button" onClick={closeEditSidebar}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="mijoz-panel-content">
                            <form onSubmit={updatePatient}>
                                <div className="mijoz-form-group">
                                    <label>{t("full_name")}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={currentPatient.name}
                                        onChange={handleEditPatientChange}
                                        required
                                    />
                                </div>

                                <div className="mijoz-form-row">
                                    <div className="mijoz-form-group">
                                        <label>{t("age")}</label>
                                        <input
                                            type="number"
                                            name="age"
                                            value={currentPatient.age}
                                            onChange={handleEditPatientChange}
                                            required
                                        />
                                    </div>

                                    <div className="mijoz-form-group">
                                        <label>{t("gender")}</label>
                                        <select name="gender" value={currentPatient.gender} onChange={handleEditPatientChange} required>
                                            <option value="male">{t("male")}</option>
                                            <option value="female">{t("female")}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mijoz-form-group">
                                    <label>{t("phone")}</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={currentPatient.phone}
                                        onChange={handleEditPatientChange}
                                        required
                                    />
                                </div>

                                <div className="mijoz-form-group">
                                    <label>{t("email")}</label>
                                    <input type="email" name="email" value={currentPatient.email} onChange={handleEditPatientChange} />
                                </div>

                                <div className="mijoz-form-group">
                                    <label>{t("address")}</label>
                                    <input type="text" name="address" value={currentPatient.address} onChange={handleEditPatientChange} />
                                </div>

                                <div className="mijoz-form-group">
                                    <label>{t("diagnosis")}</label>
                                    <input
                                        type="text"
                                        name="diagnosis"
                                        value={currentPatient.diagnosis}
                                        onChange={handleEditPatientChange}
                                        required
                                    />
                                </div>

                                <div className="mijoz-form-group">
                                    <label>{t("doctor")}</label>
                                    <input
                                        type="text"
                                        name="doctor"
                                        value={currentPatient.doctor}
                                        onChange={handleEditPatientChange}
                                        required
                                    />
                                </div>

                                <div className="mijoz-form-row">
                                    {selectedBranch === "all" && (
                                        <div className="mijoz-form-group">
                                            <label>{t("branch")}</label>
                                            <select
                                                name="branch"
                                                value={currentPatient.branch}
                                                onChange={(e) => {
                                                    const newValue = e.target.value
                                                    setCurrentPatient((prev) => ({
                                                        ...prev,
                                                        _prevBranch: prev.branch,
                                                        branch: newValue,
                                                    }))
                                                }}
                                            >
                                                <option value="branch1">{t("branch1")}</option>
                                                <option value="branch2">{t("branch2")}</option>
                                                <option value="branch3">{t("branch3")}</option>
                                            </select>
                                        </div>
                                    )}

                                    <div className="mijoz-form-group">
                                        <label>{t("status")}</label>
                                        <select name="status" value={currentPatient.status} onChange={handleEditPatientChange}>
                                            <option value="active">{t("active")}</option>
                                            <option value="inactive">{t("inactive")}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mijoz-form-actions">
                                    <button type="submit" className="mijoz-btn mijoz-btn-primary">
                                        {t("save")}
                                    </button>
                                    <button type="button" className="mijoz-btn mijoz-btn-secondary" onClick={closeEditSidebar}>
                                        {t("cancel")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
};