"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import {
    FaCalendarAlt,
    FaPlus,
    FaEdit,
    FaTrash,
    FaUserMd,
    FaExclamationTriangle,
    FaFilter,
    FaSearch,
    FaChevronLeft,
    FaChevronRight,
    FaUser,
    FaDoorOpen,
    FaClock,
    FaBuilding,
} from "react-icons/fa"

export default function ASchedule() {
    const { selectedBranch } = useAuth()
    const { t } = useLanguage()
    const [currentDate, setCurrentDate] = useState(new Date())
    const [currentView, setCurrentView] = useState("week") // week, day
    const [appointments, setAppointments] = useState([])
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const [rooms, setRooms] = useState([])
    const [filteredAppointments, setFilteredAppointments] = useState([])
    const [filterDoctor, setFilterDoctor] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")
    const [searchTerm, setSearchTerm] = useState("")
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [newAppointment, setNewAppointment] = useState({
        patientId: "",
        doctorId: "",
        roomId: "",
        date: "",
        time: "",
        status: "pending",
        diagnosis: "",
        notes: "",
        branch: selectedBranch === "all" ? "branch1" : selectedBranch,
    })
    const [step, setStep] = useState(1)
    const [availableTimes, setAvailableTimes] = useState([])

    // Fetch appointments, doctors, patients, and rooms data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                // Simulate API call
                setTimeout(() => {
                    // Mock doctors data
                    const mockDoctors = [
                        {
                            id: 1,
                            name: "Dr. Sardor Alimov",
                            specialization: "General Practitioner",
                            branch: "branch1",
                        },
                        {
                            id: 2,
                            name: "Dr. Kamil Rakhimov",
                            specialization: "Cardiologist",
                            branch: "branch2",
                        },
                        {
                            id: 3,
                            name: "Dr. Aziz Yusupov",
                            specialization: "Pulmonologist",
                            branch: "branch1",
                        },
                        {
                            id: 4,
                            name: "Dr. Malika Umarova",
                            specialization: "Surgeon",
                            branch: "branch3",
                        },
                    ]

                    // Mock patients data
                    const mockPatients = [
                        {
                            id: 1,
                            name: "Alisher Karimov",
                            age: 45,
                            gender: "male",
                            phone: "+998 90 123 45 67",
                        },
                        {
                            id: 2,
                            name: "Nilufar Rahimova",
                            age: 32,
                            gender: "female",
                            phone: "+998 90 234 56 78",
                        },
                        {
                            id: 3,
                            name: "Sardor Aliyev",
                            age: 28,
                            gender: "male",
                            phone: "+998 90 345 67 89",
                        },
                        {
                            id: 4,
                            name: "Malika Umarova",
                            age: 50,
                            gender: "female",
                            phone: "+998 90 456 78 90",
                        },
                        {
                            id: 5,
                            name: "Jasur Toshmatov",
                            age: 35,
                            gender: "male",
                            phone: "+998 90 567 89 01",
                        },
                    ]

                    // Mock rooms data
                    const mockRooms = [
                        {
                            id: 1,
                            name: "Xona 101",
                            type: "Qabul",
                            branch: "branch1",
                        },
                        {
                            id: 2,
                            name: "Xona 102",
                            type: "Qabul",
                            branch: "branch1",
                        },
                        {
                            id: 3,
                            name: "Xona 201",
                            type: "Qabul",
                            branch: "branch2",
                        },
                        {
                            id: 4,
                            name: "Xona 202",
                            type: "Qabul",
                            branch: "branch2",
                        },
                        {
                            id: 5,
                            name: "Xona 301",
                            type: "Qabul",
                            branch: "branch3",
                        },
                        {
                            id: 6,
                            name: "Xona 302",
                            type: "Qabul",
                            branch: "branch3",
                        },
                    ]

                    // Mock appointments data
                    const today = new Date()
                    const mockAppointments = [
                        {
                            id: 1,
                            patientId: 1,
                            patientName: "Alisher Karimov",
                            doctorId: 3,
                            doctorName: "Dr. Aziz Yusupov",
                            roomId: 1,
                            roomName: "Xona 101",
                            date: formatDate(today),
                            time: "09:00",
                            status: "completed",
                            diagnosis: "Yurak tekshiruvi",
                            notes: "Dori-darmonlar belgilandi",
                            branch: "branch1",
                        },
                        {
                            id: 2,
                            patientId: 2,
                            patientName: "Nilufar Rahimova",
                            doctorId: 1,
                            doctorName: "Dr. Sardor Alimov",
                            roomId: 2,
                            roomName: "Xona 102",
                            date: formatDate(today),
                            time: "10:30",
                            status: "completed",
                            diagnosis: "Bosh og'rig'i",
                            notes: "Qo'shimcha tekshiruvlar talab qilinadi",
                            branch: "branch1",
                        },
                        {
                            id: 3,
                            patientId: 3,
                            patientName: "Sardor Aliyev",
                            doctorId: 3,
                            doctorName: "Dr. Aziz Yusupov",
                            roomId: 1,
                            roomName: "Xona 101",
                            date: formatDate(today),
                            time: "11:45",
                            status: "in-progress",
                            diagnosis: "Yurak ritmi buzilishi",
                            notes: "",
                            branch: "branch1",
                        },
                        {
                            id: 4,
                            patientId: 4,
                            patientName: "Malika Umarova",
                            doctorId: 4,
                            doctorName: "Dr. Malika Umarova",
                            roomId: 5,
                            roomName: "Xona 301",
                            date: formatDate(today),
                            time: "13:15",
                            status: "pending",
                            diagnosis: "Profilaktik tekshiruv",
                            notes: "",
                            branch: "branch3",
                        },
                        {
                            id: 5,
                            patientId: 5,
                            patientName: "Jasur Toshmatov",
                            doctorId: 2,
                            doctorName: "Dr. Kamil Rakhimov",
                            roomId: 3,
                            roomName: "Xona 201",
                            date: formatDate(today),
                            time: "14:30",
                            status: "pending",
                            diagnosis: "Qon bosimi",
                            notes: "",
                            branch: "branch2",
                        },
                        {
                            id: 6,
                            patientId: 1,
                            patientName: "Alisher Karimov",
                            doctorId: 1,
                            doctorName: "Dr. Sardor Alimov",
                            roomId: 1,
                            roomName: "Xona 101",
                            date: formatDate(addDays(today, 1)),
                            time: "09:30",
                            status: "pending",
                            diagnosis: "Nazorat tekshiruvi",
                            notes: "",
                            branch: "branch1",
                        },
                        {
                            id: 7,
                            patientId: 3,
                            patientName: "Sardor Aliyev",
                            doctorId: 2,
                            doctorName: "Dr. Kamil Rakhimov",
                            roomId: 3,
                            roomName: "Xona 201",
                            date: formatDate(addDays(today, 1)),
                            time: "11:00",
                            status: "pending",
                            diagnosis: "EKG tekshiruvi",
                            notes: "",
                            branch: "branch2",
                        },
                    ]

                    // Filter by branch if needed
                    let branchFilteredDoctors = mockDoctors
                    const branchFilteredPatients = mockPatients
                    let branchFilteredRooms = mockRooms
                    let branchFilteredAppointments = mockAppointments

                    if (selectedBranch !== "all") {
                        branchFilteredDoctors = mockDoctors.filter((doctor) => doctor.branch === selectedBranch)
                        branchFilteredRooms = mockRooms.filter((room) => room.branch === selectedBranch)
                        branchFilteredAppointments = mockAppointments.filter((appointment) => appointment.branch === selectedBranch)
                    }

                    setDoctors(branchFilteredDoctors)
                    setPatients(mockPatients)
                    setRooms(branchFilteredRooms)
                    setAppointments(branchFilteredAppointments)
                    setFilteredAppointments(branchFilteredAppointments)
                    setLoading(false)
                }, 500)
            } catch (err) {
                setError(err.message || "An error occurred")
                setLoading(false)
            }
        }

        fetchData()
    }, [selectedBranch])

    // Generate time slots from 8:00 to 18:00 with 1 hour intervals
    const generateTimeSlots = () => {
        const slots = []
        for (let hour = 8; hour <= 17; hour++) {
            const formattedHour = hour.toString().padStart(2, "0")
            slots.push(`${formattedHour}:00`)
        }
        return slots
    }

    // Update available times when date or room changes
    useEffect(() => {
        if (newAppointment.date && newAppointment.roomId) {
            const allTimeSlots = generateTimeSlots()
            const bookedTimes = appointments
                .filter(
                    (appointment) =>
                        appointment.date === newAppointment.date && appointment.roomId === Number.parseInt(newAppointment.roomId),
                )
                .map((appointment) => appointment.time)

            setAvailableTimes(
                allTimeSlots.map((time) => ({
                    time,
                    isBooked: bookedTimes.includes(time),
                })),
            )
        } else {
            setAvailableTimes([])
        }
    }, [newAppointment.date, newAppointment.roomId, appointments])

    // Filter appointments based on filters and search
    useEffect(() => {
        let result = [...appointments]

        // Filter by doctor
        if (filterDoctor !== "all") {
            result = result.filter((appointment) => appointment.doctorId === Number.parseInt(filterDoctor))
        }

        // Filter by status
        if (filterStatus !== "all") {
            result = result.filter((appointment) => appointment.status === filterStatus)
        }

        // Filter by search term
        if (searchTerm) {
            result = result.filter(
                (appointment) =>
                    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    appointment.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        setFilteredAppointments(result)
    }, [appointments, filterDoctor, filterStatus, searchTerm])

    // Helper function to format date
    function formatDate(date) {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, "0")
        const day = String(date.getDate()).padStart(2, "0")
        return `${year}-${month}-${day}`
    }

    // Helper function to add days to a date
    function addDays(date, days) {
        const result = new Date(date)
        result.setDate(result.getDate() + days)
        return result
    }

    // Get week dates
    const getWeekDates = () => {
        const dates = []
        const startOfWeek = new Date(currentDate)
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()) // Start from Sunday

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek)
            date.setDate(startOfWeek.getDate() + i)
            dates.push(date)
        }

        return dates
    }

    // Get appointments for a specific date
    const getAppointmentsForDate = (date) => {
        const dateString = formatDate(date)
        return filteredAppointments.filter((appointment) => appointment.date === dateString)
    }

    // Navigate to previous week/day
    const navigatePrevious = () => {
        const newDate = new Date(currentDate)
        if (currentView === "week") {
            newDate.setDate(currentDate.getDate() - 7)
        } else {
            newDate.setDate(currentDate.getDate() - 1)
        }
        setCurrentDate(newDate)
    }

    // Navigate to next week/day
    const navigateNext = () => {
        const newDate = new Date(currentDate)
        if (currentView === "week") {
            newDate.setDate(currentDate.getDate() + 7)
        } else {
            newDate.setDate(currentDate.getDate() + 1)
        }
        setCurrentDate(newDate)
    }

    // Navigate to today
    const navigateToday = () => {
        setCurrentDate(new Date())
    }

    // Handle search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    // Handle filter changes
    const handleFilterDoctor = (e) => {
        setFilterDoctor(e.target.value)
    }

    const handleFilterStatus = (e) => {
        setFilterStatus(e.target.value)
    }

    // Open add appointment modal
    const openAddModal = () => {
        const today = new Date()
        setNewAppointment({
            patientId: "",
            doctorId: "",
            roomId: "",
            date: formatDate(today),
            time: "",
            status: "pending",
            diagnosis: "",
            notes: "",
            branch: selectedBranch === "all" ? "branch1" : selectedBranch,
        })
        setStep(1)
        setShowAddModal(true)
    }

    // Open edit appointment modal
    const openEditModal = (appointment) => {
        setSelectedAppointment({
            ...appointment,
            patientId: appointment.patientId.toString(),
            doctorId: appointment.doctorId.toString(),
            roomId: appointment.roomId.toString(),
        })
        setShowEditModal(true)
    }

    // Handle new appointment form input changes
    const handleNewAppointmentChange = (e) => {
        const { name, value } = e.target

        if (name === "doctorId" && value) {
            const selectedDoctor = doctors.find((d) => d.id === Number.parseInt(value))
            setNewAppointment({
                ...newAppointment,
                doctorId: value,
                doctorName: selectedDoctor.name,
                specialization: selectedDoctor.specialization,
            })
        } else if (name === "patientId" && value) {
            const selectedPatient = patients.find((p) => p.id === Number.parseInt(value))
            setNewAppointment({
                ...newAppointment,
                patientId: value,
                patientName: selectedPatient.name,
            })
        } else if (name === "roomId" && value) {
            const selectedRoom = rooms.find((r) => r.id === Number.parseInt(value))
            setNewAppointment({
                ...newAppointment,
                roomId: value,
                roomName: selectedRoom.name,
            })
        } else if (name === "branch" && value) {
            setNewAppointment({
                ...newAppointment,
                branch: value,
                doctorId: "",
                doctorName: "",
                roomId: "",
                roomName: "",
            })
        } else {
            setNewAppointment({
                ...newAppointment,
                [name]: value,
            })
        }
    }

    // Handle time selection
    const handleTimeSelect = (time) => {
        setNewAppointment({
            ...newAppointment,
            time,
        })
    }

    // Next step in appointment creation
    const nextStep = () => {
        setStep(step + 1)
    }

    // Previous step in appointment creation
    const prevStep = () => {
        setStep(step - 1)
    }

    // Handle add appointment form submission
    const handleAddAppointment = (e) => {
        e.preventDefault()

        const selectedPatient = patients.find((p) => p.id === Number.parseInt(newAppointment.patientId))
        const selectedDoctor = doctors.find((d) => d.id === Number.parseInt(newAppointment.doctorId))
        const selectedRoom = rooms.find((r) => r.id === Number.parseInt(newAppointment.roomId))

        const newAppointmentWithId = {
            ...newAppointment,
            id: appointments.length + 1,
            patientId: Number.parseInt(newAppointment.patientId),
            patientName: selectedPatient.name,
            doctorId: Number.parseInt(newAppointment.doctorId),
            doctorName: selectedDoctor.name,
            roomId: Number.parseInt(newAppointment.roomId),
            roomName: selectedRoom.name,
            status: "pending",
            branch: selectedDoctor.branch,
        }

        setAppointments([...appointments, newAppointmentWithId])
        setShowAddModal(false)
    }

    // Handle edit appointment form submission
    const handleEditAppointment = (e) => {
        e.preventDefault()

        const updatedAppointments = appointments.map((appointment) =>
            appointment.id === selectedAppointment.id
                ? {
                    ...selectedAppointment,
                    patientId: Number.parseInt(selectedAppointment.patientId),
                    doctorId: Number.parseInt(selectedAppointment.doctorId),
                    roomId: Number.parseInt(selectedAppointment.roomId),
                }
                : appointment,
        )

        setAppointments(updatedAppointments)
        setShowEditModal(false)
    }

    // Handle delete appointment
    const handleDeleteAppointment = (id) => {
        if (window.confirm(t("confirm_delete_appointment"))) {
            const updatedAppointments = appointments.filter((appointment) => appointment.id !== id)
            setAppointments(updatedAppointments)
        }
    }

    // Handle selected appointment form input changes
    const handleSelectedAppointmentChange = (e) => {
        const { name, value } = e.target
        setSelectedAppointment({
            ...selectedAppointment,
            [name]: value,
        })
    }

    // Format time for display
    const formatTime = (time) => {
        return time
    }

    // Get status badge class
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "completed":
                return "completed"
            case "in-progress":
                return "in-progress"
            case "pending":
                return "pending"
            case "cancelled":
                return "cancelled"
            default:
                return ""
        }
    }

    // Render step content
    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <h3 className="step-title">
                            {t("step")} 1: {t("select_branch_and_patient")}
                        </h3>

                        {selectedBranch === "all" && (
                            <div className="form-group">
                                <label>{t("branch")}</label>
                                <div className="input-icon-wrapper">
                                    <FaBuilding className="input-icon" />
                                    <select name="branch" value={newAppointment.branch} onChange={handleNewAppointmentChange} required>
                                        <option value="">{t("select_branch")}</option>
                                        <option value="branch1">{t("branch1")}</option>
                                        <option value="branch2">{t("branch2")}</option>
                                        <option value="branch3">{t("branch3")}</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label>{t("patient")}</label>
                            <div className="input-icon-wrapper">
                                <FaUser className="input-icon" />
                                <select
                                    name="patientId"
                                    value={newAppointment.patientId}
                                    onChange={handleNewAppointmentChange}
                                    required
                                >
                                    <option value="">{t("select_patient")}</option>
                                    {patients.map((patient) => (
                                        <option key={patient.id} value={patient.id}>
                                            {patient.name} ({patient.age}, {t(patient.gender)})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                                {t("cancel")}
                            </button>
                            <button type="button" className="btn btn-primary" onClick={nextStep} disabled={!newAppointment.patientId}>
                                {t("next")}
                            </button>
                        </div>
                    </>
                )
            case 2:
                return (
                    <>
                        <h3 className="step-title">
                            {t("step")} 2: {t("select_doctor")}
                        </h3>

                        <div className="form-group">
                            <label>{t("doctor")}</label>
                            <div className="input-icon-wrapper">
                                <FaUserMd className="input-icon" />
                                <select name="doctorId" value={newAppointment.doctorId} onChange={handleNewAppointmentChange} required>
                                    <option value="">{t("select_doctor")}</option>
                                    {doctors
                                        .filter((doctor) =>
                                            selectedBranch === "all"
                                                ? doctor.branch === newAppointment.branch
                                                : doctor.branch === selectedBranch,
                                        )
                                        .map((doctor) => (
                                            <option key={doctor.id} value={doctor.id}>
                                                {doctor.name} ({doctor.specialization})
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                {t("back")}
                            </button>
                            <button type="button" className="btn btn-primary" onClick={nextStep} disabled={!newAppointment.doctorId}>
                                {t("next")}
                            </button>
                        </div>
                    </>
                )
            case 3:
                return (
                    <>
                        <h3 className="step-title">
                            {t("step")} 3: {t("select_room")}
                        </h3>

                        <div className="form-group">
                            <label>{t("room")}</label>
                            <div className="input-icon-wrapper">
                                <FaDoorOpen className="input-icon" />
                                <select name="roomId" value={newAppointment.roomId} onChange={handleNewAppointmentChange} required>
                                    <option value="">{t("select_room")}</option>
                                    {rooms
                                        .filter((room) =>
                                            selectedBranch === "all" ? room.branch === newAppointment.branch : room.branch === selectedBranch,
                                        )
                                        .map((room) => (
                                            <option key={room.id} value={room.id}>
                                                {room.name} ({room.type})
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                {t("back")}
                            </button>
                            <button type="button" className="btn btn-primary" onClick={nextStep} disabled={!newAppointment.roomId}>
                                {t("next")}
                            </button>
                        </div>
                    </>
                )
            case 4:
                return (
                    <>
                        <h3 className="step-title">
                            {t("step")} 4: {t("select_date")}
                        </h3>

                        <div className="form-group">
                            <label>{t("date")}</label>
                            <div className="input-icon-wrapper">
                                <FaCalendarAlt className="input-icon" />
                                <input
                                    type="date"
                                    name="date"
                                    value={newAppointment.date}
                                    onChange={handleNewAppointmentChange}
                                    min={new Date().toISOString().split("T")[0]}
                                    required
                                />
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                {t("back")}
                            </button>
                            <button type="button" className="btn btn-primary" onClick={nextStep} disabled={!newAppointment.date}>
                                {t("next")}
                            </button>
                        </div>
                    </>
                )
            case 5:
                return (
                    <>
                        <h3 className="step-title">
                            {t("step")} 5: {t("select_time")}
                        </h3>

                        <div className="form-group">
                            <label>{t("time")}</label>
                            <div className="time-slots-container">
                                {availableTimes.map((slot, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        className={`time-slot ${slot.isBooked ? "booked" : ""} ${newAppointment.time === slot.time ? "selected" : ""}`}
                                        onClick={() => !slot.isBooked && handleTimeSelect(slot.time)}
                                        disabled={slot.isBooked}
                                    >
                                        <FaClock className="time-icon" />
                                        {slot.time}
                                    </button>
                                ))}
                                {availableTimes.length === 0 && (
                                    <div className="no-times-message">{t("please_select_date_and_room_first")}</div>
                                )}
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                {t("back")}
                            </button>
                            <button type="button" className="btn btn-primary" onClick={nextStep} disabled={!newAppointment.time}>
                                {t("next")}
                            </button>
                        </div>
                    </>
                )
            case 6:
                return (
                    <>
                        <h3 className="step-title">
                            {t("step")} 6: {t("add_diagnosis_and_notes")}
                        </h3>

                        <div className="form-group">
                            <label>{t("diagnosis")}</label>
                            <textarea
                                name="diagnosis"
                                value={newAppointment.diagnosis}
                                onChange={handleNewAppointmentChange}
                                rows={3}
                                placeholder={t("enter_diagnosis")}
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label>{t("notes")}</label>
                            <textarea
                                name="notes"
                                value={newAppointment.notes}
                                onChange={handleNewAppointmentChange}
                                rows={3}
                                placeholder={t("enter_notes")}
                            ></textarea>
                        </div>

                        <div className="modal-actions">
                            <button type="button" className="btn btn-secondary" onClick={prevStep}>
                                {t("back")}
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {t("add_appointment")}
                            </button>
                        </div>
                    </>
                )
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
        <div className="admin-schedule">
            <div className="page-header">
                <h1>
                    <FaCalendarAlt /> {t("appointment_schedule")}
                </h1>
                <div className="header-actions">
                    <button className="btn btn-primary" onClick={openAddModal}>
                        <FaPlus /> {t("add_appointment")}
                    </button>
                </div>
            </div>

            <div className="schedule-controls">
                <div className="view-controls">
                    <button
                        className={`btn ${currentView === "week" ? "btn-primary" : "btn-outline"}`}
                        onClick={() => setCurrentView("week")}
                    >
                        {t("week_view")}
                    </button>
                    <button
                        className={`btn ${currentView === "day" ? "btn-primary" : "btn-outline"}`}
                        onClick={() => setCurrentView("day")}
                    >
                        {t("day_view")}
                    </button>
                </div>

                <div className="navigation-controls">
                    <button className="btn btn-outline" onClick={navigatePrevious}>
                        <FaChevronLeft />
                    </button>
                    <button className="btn btn-outline" onClick={navigateToday}>
                        {t("today")}
                    </button>
                    <button className="btn btn-outline" onClick={navigateNext}>
                        <FaChevronRight />
                    </button>
                </div>

                <div className="filters">
                    <div className="filter-group">
                        <FaUserMd />
                        <select value={filterDoctor} onChange={handleFilterDoctor}>
                            <option value="all">{t("all_doctors")}</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>
                                    {doctor.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <FaFilter />
                        <select value={filterStatus} onChange={handleFilterStatus}>
                            <option value="all">{t("all_statuses")}</option>
                            <option value="pending">{t("pending")}</option>
                            <option value="in-progress">{t("in_progress")}</option>
                            <option value="completed">{t("completed")}</option>
                            <option value="cancelled">{t("cancelled")}</option>
                        </select>
                    </div>

                    <div className="search-box">
                        <FaSearch />
                        <input type="text" placeholder={t("search_appointments")} value={searchTerm} onChange={handleSearch} />
                    </div>
                </div>
            </div>

            {/* Week View */}
            {currentView === "week" && (
                <div className="week-view">
                    <div className="week-header">
                        {getWeekDates().map((date, index) => (
                            <div
                                key={index}
                                className={`day-header ${date.toDateString() === new Date().toDateString() ? "today" : ""}`}
                            >
                                <div className="day-name">{date.toLocaleDateString(undefined, { weekday: "short" })}</div>
                                <div className="day-date">{date.getDate()}</div>
                            </div>
                        ))}
                    </div>

                    <div className="week-body">
                        {getWeekDates().map((date, index) => {
                            const dateAppointments = getAppointmentsForDate(date)

                            return (
                                <div
                                    key={index}
                                    className={`day-column ${date.toDateString() === new Date().toDateString() ? "today" : ""}`}
                                >
                                    {dateAppointments.length > 0 ? (
                                        dateAppointments.map((appointment) => (
                                            <div
                                                key={appointment.id}
                                                className={`appointment-card ${getStatusBadgeClass(appointment.status)}`}
                                                onClick={() => openEditModal(appointment)}
                                            >
                                                <div className="appointment-time">{formatTime(appointment.time)}</div>
                                                <div className="appointment-patient">{appointment.patientName}</div>
                                                <div className="appointment-doctor">{appointment.doctorName}</div>
                                                <div className="appointment-room">{appointment.roomName}</div>
                                                <div className="appointment-diagnosis">{appointment.diagnosis}</div>
                                                <div className="appointment-status">
                                                    <span className={`status-badge ${appointment.status}`}>{t(appointment.status)}</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-appointments">
                                            <p>{t("no_appointments")}</p>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Day View */}
            {currentView === "day" && (
                <div className="day-view">
                    <div className="day-header">
                        <h2>
                            {currentDate.toLocaleDateString(undefined, {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </h2>
                    </div>

                    <div className="day-body">
                        {getAppointmentsForDate(currentDate).length > 0 ? (
                            <table className="appointments-table">
                                <thead>
                                    <tr>
                                        <th>{t("time")}</th>
                                        <th>{t("patient")}</th>
                                        <th>{t("doctor")}</th>
                                        <th>{t("room")}</th>
                                        <th>{t("diagnosis")}</th>
                                        <th>{t("status")}</th>
                                        <th>{t("actions")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getAppointmentsForDate(currentDate)
                                        .sort((a, b) => a.time.localeCompare(b.time))
                                        .map((appointment) => (
                                            <tr key={appointment.id}>
                                                <td>{formatTime(appointment.time)}</td>
                                                <td>{appointment.patientName}</td>
                                                <td>{appointment.doctorName}</td>
                                                <td>{appointment.roomName}</td>
                                                <td>{appointment.diagnosis}</td>
                                                <td>
                                                    <span className={`status-badge ${appointment.status}`}>{t(appointment.status)}</span>
                                                </td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button
                                                            className="btn-icon edit"
                                                            title={t("edit")}
                                                            onClick={() => openEditModal(appointment)}
                                                        >
                                                            <FaEdit />
                                                        </button>
                                                        <button
                                                            className="btn-icon delete"
                                                            title={t("delete")}
                                                            onClick={() => handleDeleteAppointment(appointment.id)}
                                                        >
                                                            <FaTrash />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="no-appointments-day">
                                <FaCalendarAlt className="no-appointments-icon" />
                                <h3>{t("no_appointments_for_day")}</h3>
                                <button className="btn btn-primary" onClick={openAddModal}>
                                    <FaPlus /> {t("add_appointment")}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Add Appointment Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>{t("add_new_appointment")}</h3>
                            <button className="close-btn" onClick={() => setShowAddModal(false)}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleAddAppointment}>
                            <div className="modal-body">
                                <div className="step-indicator">
                                    {[1, 2, 3, 4, 5, 6].map((stepNumber) => (
                                        <div
                                            key={stepNumber}
                                            className={`step ${step === stepNumber ? "active" : ""} ${step > stepNumber ? "completed" : ""}`}
                                        >
                                            {stepNumber}
                                        </div>
                                    ))}
                                </div>

                                {renderStepContent()}
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Appointment Modal */}
            {showEditModal && selectedAppointment && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>{t("edit_appointment")}</h3>
                            <button className="close-btn" onClick={() => setShowEditModal(false)}>
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleEditAppointment}>
                            <div className="modal-body">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="patientId">{t("patient")}</label>
                                        <div className="input-icon-wrapper">
                                            <FaUser className="input-icon" />
                                            <select
                                                id="patientId"
                                                name="patientId"
                                                value={selectedAppointment.patientId}
                                                onChange={handleSelectedAppointmentChange}
                                                required
                                            >
                                                <option value="">{t("select_patient")}</option>
                                                {patients.map((patient) => (
                                                    <option key={patient.id} value={patient.id}>
                                                        {patient.name} ({patient.age}, {t(patient.gender)})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="doctorId">{t("doctor")}</label>
                                        <div className="input-icon-wrapper">
                                            <FaUserMd className="input-icon" />
                                            <select
                                                id="doctorId"
                                                name="doctorId"
                                                value={selectedAppointment.doctorId}
                                                onChange={handleSelectedAppointmentChange}
                                                required
                                            >
                                                <option value="">{t("select_doctor")}</option>
                                                {doctors.map((doctor) => (
                                                    <option key={doctor.id} value={doctor.id}>
                                                        {doctor.name} ({doctor.specialization})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="roomId">{t("room")}</label>
                                        <div className="input-icon-wrapper">
                                            <FaDoorOpen className="input-icon" />
                                            <select
                                                id="roomId"
                                                name="roomId"
                                                value={selectedAppointment.roomId}
                                                onChange={handleSelectedAppointmentChange}
                                                required
                                            >
                                                <option value="">{t("select_room")}</option>
                                                {rooms.map((room) => (
                                                    <option key={room.id} value={room.id}>
                                                        {room.name} ({room.type})
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="status">{t("status")}</label>
                                        <select
                                            id="status"
                                            name="status"
                                            value={selectedAppointment.status}
                                            onChange={handleSelectedAppointmentChange}
                                            required
                                        >
                                            <option value="pending">{t("pending")}</option>
                                            <option value="in-progress">{t("in_progress")}</option>
                                            <option value="completed">{t("completed")}</option>
                                            <option value="cancelled">{t("cancelled")}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="date">{t("date")}</label>
                                        <div className="input-icon-wrapper">
                                            <FaCalendarAlt className="input-icon" />
                                            <input
                                                type="date"
                                                id="date"
                                                name="date"
                                                value={selectedAppointment.date}
                                                onChange={handleSelectedAppointmentChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="time">{t("time")}</label>
                                        <div className="input-icon-wrapper">
                                            <FaClock className="input-icon" />
                                            <input
                                                type="time"
                                                id="time"
                                                name="time"
                                                value={selectedAppointment.time}
                                                onChange={handleSelectedAppointmentChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="diagnosis">{t("diagnosis")}</label>
                                    <textarea
                                        id="diagnosis"
                                        name="diagnosis"
                                        value={selectedAppointment.diagnosis}
                                        onChange={handleSelectedAppointmentChange}
                                        rows={3}
                                        placeholder={t("enter_diagnosis")}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="notes">{t("notes")}</label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        value={selectedAppointment.notes}
                                        onChange={handleSelectedAppointmentChange}
                                        rows={3}
                                        placeholder={t("enter_notes")}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">
                                    {t("save_changes")}
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                                    {t("cancel")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

