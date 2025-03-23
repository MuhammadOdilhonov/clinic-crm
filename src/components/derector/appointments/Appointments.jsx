import React, { useState, useEffect } from "react"
import { FaSearch, FaEdit, FaTrash, FaTimes, FaFilter, FaCalendarAlt, FaCalendarPlus, FaBuilding } from "react-icons/fa"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"

export default function Appointments() {
    const { selectedBranch } = useAuth()
    const { t } = useLanguage()

    // Mock data for doctors
    const doctorsData = {
        all: [
            { id: 1, name: "Dr. Aziz Karimov", department: "Kardiologiya", branch: "branch1" },
            { id: 2, name: "Dr. Jasur Toshmatov", department: "Nevrologiya", branch: "branch1" },
            { id: 3, name: "Dr. Nilufar Rahimova", department: "Pediatriya", branch: "branch2" },
            { id: 4, name: "Dr. Sardor Aliyev", department: "Terapiya", branch: "branch2" },
            { id: 5, name: "Dr. Malika Umarova", department: "Pediatriya", branch: "branch3" },
            { id: 6, name: "Dr. Kamola Yusupova", department: "Stomatologiya", branch: "branch3" },
        ],
        branch1: [
            { id: 1, name: "Dr. Aziz Karimov", department: "Kardiologiya", branch: "branch1" },
            { id: 2, name: "Dr. Jasur Toshmatov", department: "Nevrologiya", branch: "branch1" },
        ],
        branch2: [
            { id: 3, name: "Dr. Nilufar Rahimova", department: "Pediatriya", branch: "branch2" },
            { id: 4, name: "Dr. Sardor Aliyev", department: "Terapiya", branch: "branch2" },
        ],
        branch3: [
            { id: 5, name: "Dr. Malika Umarova", department: "Pediatriya", branch: "branch3" },
            { id: 6, name: "Dr. Kamola Yusupova", department: "Stomatologiya", branch: "branch3" },
        ],
    }

    // Mock data for patients
    const patientsData = {
        all: [
            { id: 1, name: "Alisher Karimov", branch: "branch1" },
            { id: 2, name: "Nilufar Rahimova", branch: "branch1" },
            { id: 3, name: "Sardor Aliyev", branch: "branch2" },
            { id: 4, name: "Malika Umarova", branch: "branch2" },
            { id: 5, name: "Jasur Toshmatov", branch: "branch3" },
            { id: 6, name: "Kamola Yusupova", branch: "branch3" },
        ],
        branch1: [
            { id: 1, name: "Alisher Karimov", branch: "branch1" },
            { id: 2, name: "Nilufar Rahimova", branch: "branch1" },
        ],
        branch2: [
            { id: 3, name: "Sardor Aliyev", branch: "branch2" },
            { id: 4, name: "Malika Umarova", branch: "branch2" },
        ],
        branch3: [
            { id: 5, name: "Jasur Toshmatov", branch: "branch3" },
            { id: 6, name: "Kamola Yusupova", branch: "branch3" },
        ],
    }

    // Mock data for appointments
    const initialAppointmentsData = {
        all: [
            {
                id: 1,
                patientId: 1,
                patientName: "Alisher Karimov",
                doctorId: 1,
                doctor: "Dr. Aziz Karimov",
                department: "Kardiologiya",
                date: "2023-05-20",
                time: "09:00",
                status: "pending",
                notes: "Yurak tekshiruvi",
                branch: "branch1",
            },
            {
                id: 2,
                patientId: 2,
                patientName: "Nilufar Rahimova",
                doctorId: 2,
                doctor: "Dr. Jasur Toshmatov",
                department: "Nevrologiya",
                date: "2023-05-20",
                time: "10:30",
                status: "confirmed",
                notes: "Bosh og'rig'i",
                branch: "branch1",
            },
            {
                id: 3,
                patientId: 3,
                patientName: "Sardor Aliyev",
                doctorId: 1,
                doctor: "Dr. Aziz Karimov",
                department: "Kardiologiya",
                date: "2023-05-21",
                time: "11:45",
                status: "completed",
                notes: "Yurak ritmi buzilishi",
                branch: "branch2",
            },
            {
                id: 4,
                patientId: 4,
                patientName: "Malika Umarova",
                doctorId: 3,
                doctor: "Dr. Nilufar Rahimova",
                department: "Pediatriya",
                date: "2023-05-21",
                time: "13:15",
                status: "cancelled",
                notes: "Allergiya",
                branch: "branch2",
            },
            {
                id: 5,
                patientId: 5,
                patientName: "Jasur Toshmatov",
                doctorId: 4,
                doctor: "Dr. Sardor Aliyev",
                department: "Terapiya",
                date: "2023-05-22",
                time: "09:30",
                status: "pending",
                notes: "Qon bosimi",
                branch: "branch3",
            },
            {
                id: 6,
                patientId: 6,
                patientName: "Kamola Yusupova",
                doctorId: 5,
                doctor: "Dr. Malika Umarova",
                department: "Pediatriya",
                date: "2023-05-22",
                time: "11:00",
                status: "confirmed",
                notes: "Gripp",
                branch: "branch3",
            },
        ],
        branch1: [
            {
                id: 1,
                patientId: 1,
                patientName: "Alisher Karimov",
                doctorId: 1,
                doctor: "Dr. Aziz Karimov",
                department: "Kardiologiya",
                date: "2023-05-20",
                time: "09:00",
                status: "pending",
                notes: "Yurak tekshiruvi",
                branch: "branch1",
            },
            {
                id: 2,
                patientId: 2,
                patientName: "Nilufar Rahimova",
                doctorId: 2,
                doctor: "Dr. Jasur Toshmatov",
                department: "Nevrologiya",
                date: "2023-05-20",
                time: "10:30",
                status: "confirmed",
                notes: "Bosh og'rig'i",
                branch: "branch1",
            },
        ],
        branch2: [
            {
                id: 3,
                patientId: 3,
                patientName: "Sardor Aliyev",
                doctorId: 1,
                doctor: "Dr. Aziz Karimov",
                department: "Kardiologiya",
                date: "2023-05-21",
                time: "11:45",
                status: "completed",
                notes: "Yurak ritmi buzilishi",
                branch: "branch2",
            },
            {
                id: 4,
                patientId: 4,
                patientName: "Malika Umarova",
                doctorId: 3,
                doctor: "Dr. Nilufar Rahimova",
                department: "Pediatriya",
                date: "2023-05-21",
                time: "13:15",
                status: "cancelled",
                notes: "Allergiya",
                branch: "branch2",
            },
        ],
        branch3: [
            {
                id: 5,
                patientId: 5,
                patientName: "Jasur Toshmatov",
                doctorId: 4,
                doctor: "Dr. Sardor Aliyev",
                department: "Terapiya",
                date: "2023-05-22",
                time: "09:30",
                status: "pending",
                notes: "Qon bosimi",
                branch: "branch3",
            },
            {
                id: 6,
                patientId: 6,
                patientName: "Kamola Yusupova",
                doctorId: 5,
                doctor: "Dr. Malika Umarova",
                department: "Pediatriya",
                date: "2023-05-22",
                time: "11:00",
                status: "confirmed",
                notes: "Gripp",
                branch: "branch3",
            },
        ],
    }

    const [initialAppointments, setInitialAppointments] = useState(
        selectedBranch === "all" ? initialAppointmentsData.all : initialAppointmentsData[selectedBranch],
    )
    const [appointments, setAppointments] = useState(initialAppointments)
    const [searchTerm, setSearchTerm] = useState("")
    const [showSidebar, setShowSidebar] = useState(false)
    const [showEditSidebar, setShowEditSidebar] = useState(false)
    const [currentAppointment, setCurrentAppointment] = useState(null)
    const [newAppointment, setNewAppointment] = useState({
        patientId: "",
        patientName: "",
        doctorId: "",
        doctor: "",
        department: "",
        date: "",
        time: "",
        status: "pending",
        notes: "",
        branch: selectedBranch === "all" ? "branch1" : selectedBranch,
    })
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterDate, setFilterDate] = useState("")
    const [filterDoctor, setFilterDoctor] = useState("all")
    const [filterBranch, setFilterBranch] = useState(selectedBranch)
    const [showFilters, setShowFilters] = useState(false)
    const [availableDoctors, setAvailableDoctors] = useState(
        selectedBranch === "all" ? doctorsData.all : doctorsData[selectedBranch],
    )
    const [availablePatients, setAvailablePatients] = useState(
        selectedBranch === "all" ? patientsData.all : patientsData[selectedBranch],
    )

    // Update appointments when branch changes
    useEffect(() => {
        if (selectedBranch === "all") {
            setInitialAppointments(initialAppointmentsData.all)
            setAppointments(initialAppointmentsData.all)
            setAvailableDoctors(doctorsData.all)
            setAvailablePatients(patientsData.all)
        } else {
            setInitialAppointments(initialAppointmentsData[selectedBranch])
            setAppointments(initialAppointmentsData[selectedBranch])
            setAvailableDoctors(doctorsData[selectedBranch])
            setAvailablePatients(patientsData[selectedBranch])
        }

        setNewAppointment({
            ...newAppointment,
            branch: selectedBranch === "all" ? "branch1" : selectedBranch,
            doctorId: "",
            doctor: "",
            department: "",
            patientId: "",
            patientName: "",
        })

        setFilterBranch(selectedBranch)
    }, [selectedBranch])

    // Filter appointments based on search term, status, date, doctor and branch
    useEffect(() => {
        let filteredAppointments = [...initialAppointments]

        // Filter by search term
        if (searchTerm) {
            filteredAppointments = filteredAppointments.filter(
                (appointment) =>
                    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    appointment.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    appointment.notes.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        // Filter by status
        if (filterStatus !== "all") {
            filteredAppointments = filteredAppointments.filter((appointment) => appointment.status === filterStatus)
        }

        // Filter by date
        if (filterDate) {
            filteredAppointments = filteredAppointments.filter((appointment) => appointment.date === filterDate)
        }

        // Filter by doctor
        if (filterDoctor !== "all") {
            filteredAppointments = filteredAppointments.filter(
                (appointment) => appointment.doctorId === Number.parseInt(filterDoctor),
            )
        }

        // Filter by branch (if viewing all branches)
        if (selectedBranch === "all" && filterBranch !== "all") {
            filteredAppointments = filteredAppointments.filter((appointment) => appointment.branch === filterBranch)
        }

        setAppointments(filteredAppointments)
    }, [searchTerm, filterStatus, filterDate, filterDoctor, filterBranch, initialAppointments])

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    // Handle new appointment input change
    const handleNewAppointmentChange = (e) => {
        const { name, value } = e.target

        if (name === "doctorId" && value) {
            const selectedDoctor = availableDoctors.find((doctor) => doctor.id === Number.parseInt(value))
            setNewAppointment({
                ...newAppointment,
                doctorId: Number.parseInt(value),
                doctor: selectedDoctor.name,
                department: selectedDoctor.department,
            })
        } else if (name === "patientId" && value) {
            const selectedPatient = availablePatients.find((patient) => patient.id === Number.parseInt(value))
            setNewAppointment({
                ...newAppointment,
                patientId: Number.parseInt(value),
                patientName: selectedPatient.name,
            })
        } else {
            setNewAppointment({
                ...newAppointment,
                [name]: value,
            })
        }
    }

    // Handle edit appointment input change
    const handleEditAppointmentChange = (e) => {
        const { name, value } = e.target

        if (name === "doctorId" && value) {
            const selectedDoctor = availableDoctors.find((doctor) => doctor.id === Number.parseInt(value))
            setCurrentAppointment({
                ...currentAppointment,
                doctorId: Number.parseInt(value),
                doctor: selectedDoctor.name,
                department: selectedDoctor.department,
            })
        } else if (name === "patientId" && value) {
            const selectedPatient = availablePatients.find((patient) => patient.id === Number.parseInt(value))
            setCurrentAppointment({
                ...currentAppointment,
                patientId: Number.parseInt(value),
                patientName: selectedPatient.name,
            })
        } else {
            setCurrentAppointment({
                ...currentAppointment,
                [name]: value,
            })
        }
    }

    // Open add sidebar
    const openAddSidebar = () => {
        setShowSidebar(true)
    }

    // Close add sidebar
    const closeAddSidebar = () => {
        setShowSidebar(false)
        setNewAppointment({
            patientId: "",
            patientName: "",
            doctorId: "",
            doctor: "",
            department: "",
            date: "",
            time: "",
            status: "pending",
            notes: "",
            branch: selectedBranch === "all" ? "branch1" : selectedBranch,
        })
    }

    // Open edit sidebar
    const openEditSidebar = (appointment) => {
        setCurrentAppointment(appointment)
        setShowEditSidebar(true)
    }

    // Close edit sidebar
    const closeEditSidebar = () => {
        setShowEditSidebar(false)
        setCurrentAppointment(null)
    }

    // Toggle filters
    const toggleFilters = () => {
        setShowFilters(!showFilters)
    }

    // Add new appointment
    const addAppointment = (e) => {
        e.preventDefault()
        const id = Math.max(...initialAppointmentsData.all.map((a) => a.id)) + 1
        const newAppointmentItem = {
            ...newAppointment,
            id,
        }

        // Update all appointments data
        const updatedAllAppointments = [...initialAppointmentsData.all, newAppointmentItem]
        initialAppointmentsData.all = updatedAllAppointments

        // Update branch-specific appointments data
        initialAppointmentsData[newAppointmentItem.branch] = [
            ...initialAppointmentsData[newAppointmentItem.branch],
            newAppointmentItem,
        ]

        // Update current view
        if (selectedBranch === "all" || selectedBranch === newAppointmentItem.branch) {
            setInitialAppointments((prev) => [...prev, newAppointmentItem])
        }

        closeAddSidebar()
    }

    // Update appointment
    const updateAppointment = (e) => {
        e.preventDefault()

        // Update in all appointments data
        const updatedAllAppointments = initialAppointmentsData.all.map((appointment) =>
            appointment.id === currentAppointment.id ? currentAppointment : appointment,
        )
        initialAppointmentsData.all = updatedAllAppointments

        // Update in branch-specific data
        // First remove from old branch if branch changed
        if (currentAppointment.branch !== currentAppointment._prevBranch && currentAppointment._prevBranch) {
            initialAppointmentsData[currentAppointment._prevBranch] = initialAppointmentsData[
                currentAppointment._prevBranch
            ].filter((appointment) => appointment.id !== currentAppointment.id)
        }

        // Then add to new branch
        if (initialAppointmentsData[currentAppointment.branch]) {
            initialAppointmentsData[currentAppointment.branch] = initialAppointmentsData[currentAppointment.branch].filter(
                (appointment) => appointment.id !== currentAppointment.id,
            )
            initialAppointmentsData[currentAppointment.branch].push(currentAppointment)
        }

        // Update current view
        if (selectedBranch === "all") {
            setInitialAppointments(updatedAllAppointments)
        } else if (selectedBranch === currentAppointment.branch) {
            setInitialAppointments(initialAppointmentsData[selectedBranch])
        }

        closeEditSidebar()
    }

    // Delete appointment
    const deleteAppointment = (id) => {
        if (window.confirm(t("confirm_delete_appointment"))) {
            // Find the appointment to get their branch
            const appointmentToDelete = initialAppointmentsData.all.find((appointment) => appointment.id === id)

            // Remove from all appointments data
            initialAppointmentsData.all = initialAppointmentsData.all.filter((appointment) => appointment.id !== id)

            // Remove from branch-specific data
            if (appointmentToDelete && appointmentToDelete.branch) {
                initialAppointmentsData[appointmentToDelete.branch] = initialAppointmentsData[
                    appointmentToDelete.branch
                ].filter((appointment) => appointment.id !== id)
            }

            // Update current view
            setInitialAppointments((prev) => prev.filter((appointment) => appointment.id !== id))
        }
    }

    // Update available doctors when branch changes in add/edit form
    const updateAvailableDoctorsForBranch = (branch) => {
        if (branch === "all") {
            return doctorsData.all
        }
        return doctorsData[branch]
    }

    // Update available patients when branch changes in add/edit form
    const updateAvailablePatientsForBranch = (branch) => {
        if (branch === "all") {
            return patientsData.all
        }
        return patientsData[branch]
    }

    return (
        <div className="appointments-container">
            <div className="appointments-page-header">
                <h1 className="appointments-page-title">{t("appointments")}</h1>
                <div className="appointments-header-actions">
                    <button className="appointments-btn appointments-btn-primary appointments-btn-icon" onClick={openAddSidebar}>
                        <FaCalendarPlus /> {t("add_new_appointment")}
                    </button>
                </div>
            </div>

            <div className="appointments-filters-container">
                <div className="appointments-search-filter">
                    <div className="appointments-search-input">
                        <FaSearch className="appointments-search-icon" />
                        <input type="text" placeholder={t("search")} value={searchTerm} onChange={handleSearchChange} />
                    </div>
                    <button className={`appointments-filter-toggle-btn ${showFilters ? "active" : ""}`} onClick={toggleFilters}>
                        <FaFilter /> {t("filters")}
                    </button>
                </div>

                {showFilters && (
                    <div className="appointments-advanced-filters">
                        <div className="appointments-filter-group">
                            <label>{t("status")}:</label>
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                <option value="pending">{t("pending")}</option>
                                <option value="confirmed">{t("confirmed")}</option>
                                <option value="completed">{t("completed")}</option>
                                <option value="cancelled">{t("cancelled")}</option>
                            </select>
                        </div>

                        <div className="appointments-filter-group">
                            <label>{t("date")}:</label>
                            <div className="appointments-date-input">
                                <FaCalendarAlt className="appointments-calendar-icon" />
                                <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
                            </div>
                        </div>

                        <div className="appointments-filter-group">
                            <label>{t("doctor")}:</label>
                            <select value={filterDoctor} onChange={(e) => setFilterDoctor(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                {availableDoctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedBranch === "all" && (
                            <div className="appointments-filter-group">
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

            <div className="appointments-dashboard-card">
                <div className="appointments-table-responsive">
                    <table className="appointments-data-table">
                        <thead>
                            <tr>
                                <th>{t("patient")}</th>
                                <th>{t("doctor")}</th>
                                <th>{t("department")}</th>
                                <th>{t("date")}</th>
                                <th>{t("time")}</th>
                                <th>{t("status")}</th>
                                <th>{t("notes")}</th>
                                {selectedBranch === "all" && <th>{t("branch")}</th>}
                                <th>{t("actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((appointment) => (
                                <tr key={appointment.id}>
                                    <td>{appointment.patientName}</td>
                                    <td>{appointment.doctor}</td>
                                    <td>{appointment.department}</td>
                                    <td>{appointment.date}</td>
                                    <td>{appointment.time}</td>
                                    <td>
                                        <div className={`appointments-status-badge ${appointment.status}`}>
                                            {appointment.status === "pending" && t("pending")}
                                            {appointment.status === "confirmed" && t("confirmed")}
                                            {appointment.status === "completed" && t("completed")}
                                            {appointment.status === "cancelled" && t("cancelled")}
                                        </div>
                                    </td>
                                    <td>{appointment.notes}</td>
                                    {selectedBranch === "all" && (
                                        <td>
                                            <div className="appointments-branch-badge">
                                                <FaBuilding className="appointments-branch-icon" />
                                                {appointment.branch === "branch1" && t("branch1")}
                                                {appointment.branch === "branch2" && t("branch2")}
                                                {appointment.branch === "branch3" && t("branch3")}
                                            </div>
                                        </td>
                                    )}
                                    <td>
                                        <div className="appointments-action-buttons">
                                            <button className="appointments-btn-icon edit" onClick={() => openEditSidebar(appointment)}>
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="appointments-btn-icon delete"
                                                onClick={() => deleteAppointment(appointment.id)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {appointments.length === 0 && (
                                <tr>
                                    <td colSpan={selectedBranch === "all" ? "9" : "8"} className="appointments-no-data">
                                        {t("no_data_found")}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Appointment Sidebar */}
            <div className={`appointments-sidebar-overlay ${showSidebar ? "active" : ""}`} onClick={closeAddSidebar}></div>
            <div className={`appointments-sidebar ${showSidebar ? "active" : ""}`}>
                <div className="appointments-sidebar-header">
                    <h2>{t("add_new_appointment")}</h2>
                    <button className="appointments-close-button" onClick={closeAddSidebar}>
                        <FaTimes />
                    </button>
                </div>
                <div className="appointments-sidebar-content">
                    <form onSubmit={addAppointment}>
                        {selectedBranch === "all" && (
                            <div className="appointments-form-group">
                                <label>{t("branch")}</label>
                                <select
                                    name="branch"
                                    value={newAppointment.branch}
                                    onChange={(e) => {
                                        const selectedBranch = e.target.value
                                        setNewAppointment({
                                            ...newAppointment,
                                            branch: selectedBranch,
                                            doctorId: "",
                                            doctor: "",
                                            department: "",
                                            patientId: "",
                                            patientName: "",
                                        })
                                        setAvailableDoctors(updateAvailableDoctorsForBranch(selectedBranch))
                                        setAvailablePatients(updateAvailablePatientsForBranch(selectedBranch))
                                    }}
                                >
                                    <option value="branch1">{t("branch1")}</option>
                                    <option value="branch2">{t("branch2")}</option>
                                    <option value="branch3">{t("branch3")}</option>
                                </select>
                            </div>
                        )}

                        <div className="appointments-form-group">
                            <label>{t("patient")}</label>
                            <select name="patientId" value={newAppointment.patientId} onChange={handleNewAppointmentChange} required>
                                <option value="">{t("select_patient")}</option>
                                {availablePatients.map((patient) => (
                                    <option key={patient.id} value={patient.id}>
                                        {patient.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="appointments-form-group">
                            <label>{t("doctor")}</label>
                            <select name="doctorId" value={newAppointment.doctorId} onChange={handleNewAppointmentChange} required>
                                <option value="">{t("select_doctor")}</option>
                                {availableDoctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.name} - {doctor.department}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="appointments-form-row">
                            <div className="appointments-form-group">
                                <label>{t("date")}</label>
                                <div className="appointments-date-input">
                                    <FaCalendarAlt className="appointments-calendar-icon" />
                                    <input
                                        type="date"
                                        name="date"
                                        value={newAppointment.date}
                                        onChange={handleNewAppointmentChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="appointments-form-group">
                                <label>{t("time")}</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={newAppointment.time}
                                    onChange={handleNewAppointmentChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="appointments-form-group">
                            <label>{t("status")}</label>
                            <select name="status" value={newAppointment.status} onChange={handleNewAppointmentChange}>
                                <option value="pending">{t("pending")}</option>
                                <option value="confirmed">{t("confirmed")}</option>
                                <option value="completed">{t("completed")}</option>
                                <option value="cancelled">{t("cancelled")}</option>
                            </select>
                        </div>

                        <div className="appointments-form-group">
                            <label>{t("notes")}</label>
                            <textarea
                                name="notes"
                                value={newAppointment.notes}
                                onChange={handleNewAppointmentChange}
                                rows={3}
                            ></textarea>
                        </div>

                        <div className="appointments-form-actions">
                            <button type="submit" className="appointments-btn appointments-btn-primary">
                                {t("add")}
                            </button>
                            <button type="button" className="appointments-btn appointments-btn-secondary" onClick={closeAddSidebar}>
                                {t("cancel")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Edit Appointment Sidebar */}
            <div
                className={`appointments-sidebar-overlay ${showEditSidebar ? "active" : ""}`}
                onClick={closeEditSidebar}
            ></div>
            <div className={`appointments-sidebar ${showEditSidebar ? "active" : ""}`}>
                {currentAppointment && (
                    <>
                        <div className="appointments-sidebar-header">
                            <h2>{t("edit_appointment")}</h2>
                            <button className="appointments-close-button" onClick={closeEditSidebar}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="appointments-sidebar-content">
                            <form onSubmit={updateAppointment}>
                                {selectedBranch === "all" && (
                                    <div className="appointments-form-group">
                                        <label>{t("branch")}</label>
                                        <select
                                            name="branch"
                                            value={currentAppointment.branch}
                                            onChange={(e) => {
                                                const newBranch = e.target.value
                                                setCurrentAppointment((prev) => ({
                                                    ...prev,
                                                    _prevBranch: prev.branch,
                                                    branch: newBranch,
                                                    doctorId: "",
                                                    doctor: "",
                                                    department: "",
                                                    patientId: "",
                                                    patientName: "",
                                                }))
                                                setAvailableDoctors(updateAvailableDoctorsForBranch(newBranch))
                                                setAvailablePatients(updateAvailablePatientsForBranch(newBranch))
                                            }}
                                        >
                                            <option value="branch1">{t("branch1")}</option>
                                            <option value="branch2">{t("branch2")}</option>
                                            <option value="branch3">{t("branch3")}</option>
                                        </select>
                                    </div>
                                )}

                                <div className="appointments-form-group">
                                    <label>{t("patient")}</label>
                                    <select
                                        name="patientId"
                                        value={currentAppointment.patientId}
                                        onChange={handleEditAppointmentChange}
                                        required
                                    >
                                        <option value="">{t("select_patient")}</option>
                                        {availablePatients.map((patient) => (
                                            <option key={patient.id} value={patient.id}>
                                                {patient.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="appointments-form-group">
                                    <label>{t("doctor")}</label>
                                    <select
                                        name="doctorId"
                                        value={currentAppointment.doctorId}
                                        onChange={handleEditAppointmentChange}
                                        required
                                    >
                                        <option value="">{t("select_doctor")}</option>
                                        {availableDoctors.map((doctor) => (
                                            <option key={doctor.id} value={doctor.id}>
                                                {doctor.name} - {doctor.department}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="appointments-form-row">
                                    <div className="appointments-form-group">
                                        <label>{t("date")}</label>
                                        <div className="appointments-date-input">
                                            <FaCalendarAlt className="appointments-calendar-icon" />
                                            <input
                                                type="date"
                                                name="date"
                                                value={currentAppointment.date}
                                                onChange={handleEditAppointmentChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="appointments-form-group">
                                        <label>{t("time")}</label>
                                        <input
                                            type="time"
                                            name="time"
                                            value={currentAppointment.time}
                                            onChange={handleEditAppointmentChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="appointments-form-group">
                                    <label>{t("status")}</label>
                                    <select name="status" value={currentAppointment.status} onChange={handleEditAppointmentChange}>
                                        <option value="pending">{t("pending")}</option>
                                        <option value="confirmed">{t("confirmed")}</option>
                                        <option value="completed">{t("completed")}</option>
                                        <option value="cancelled">{t("cancelled")}</option>
                                    </select>
                                </div>

                                <div className="appointments-form-group">
                                    <label>{t("notes")}</label>
                                    <textarea
                                        name="notes"
                                        value={currentAppointment.notes}
                                        onChange={handleEditAppointmentChange}
                                        rows={3}
                                    ></textarea>
                                </div>

                                <div className="appointments-form-actions">
                                    <button type="submit" className="appointments-btn appointments-btn-primary">
                                        {t("save")}
                                    </button>
                                    <button
                                        type="button"
                                        className="appointments-btn appointments-btn-secondary"
                                        onClick={closeEditSidebar}
                                    >
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