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
    FaExclamationCircle,
    FaMoneyBillWave, // Fixed: Added missing import
} from "react-icons/fa"
import apiAppointments from "../../../api/apiAppointments"

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
        status: "expected",
        diagnosis: "",
        notes: "",
        branch: selectedBranch === "all" ? "" : selectedBranch,
    })
    const [step, setStep] = useState(1)
    const [availableTimes, setAvailableTimes] = useState([])
    const [busyTimes, setBusyTimes] = useState([])
    const [filterData, setFilterData] = useState({
        branches: [],
        customers: [],
        doctors: [],
        cabinets: [],
    })
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [timeError, setTimeError] = useState("")

    // Fetch appointments, doctors, patients, and rooms data
    useEffect(() => {
        fetchAppointments()
    }, [selectedBranch, currentPage, itemsPerPage, filterStatus, filterDoctor])

    // Load filter data when branch changes
    useEffect(() => {
        if (selectedBranch !== "all") {
            fetchFilterData(selectedBranch)
        } else if (newAppointment.branch) {
            fetchFilterData(newAppointment.branch)
        } else {
            // If all branches selected, fetch data for the first branch or default
            fetchFilterData(1) // Default to first branch
        }
    }, [selectedBranch, newAppointment.branch])

    // Update available times when date, doctor, or room changes
    useEffect(() => {
        if (newAppointment.date && newAppointment.doctorId && newAppointment.roomId) {
            fetchBusyTimes()
        }
    }, [newAppointment.date, newAppointment.doctorId, newAppointment.roomId])

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

    // Fetch appointments from API
    const fetchAppointments = async () => {
        setLoading(true)
        try {
            const params = {
                page: currentPage + 1,
                page_size: itemsPerPage,
            }

            // Add filters if they are set
            if (filterStatus !== "all") params.status = filterStatus
            if (filterDoctor !== "all") params.doctor = filterDoctor
            if (selectedBranch !== "all") params.branch = selectedBranch
            if (searchTerm) params.search = searchTerm

            const data = await apiAppointments.fetchAppointments(params)
            console.log("Appointments data:", data)

            // Transform API data to match component structure
            const transformedAppointments = (data.results || []).map((appointment) => ({
                id: appointment.id,
                patientId: appointment.customer,
                patientName: appointment.customer_name,
                doctorId: appointment.doctor,
                doctorName: appointment.doctor_name,
                roomId: appointment.room,
                roomName: appointment.room_name,
                date: appointment.date ? new Date(appointment.date).toISOString().split("T")[0] : "",
                time: appointment.date
                    ? new Date(appointment.date).toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })
                    : "",
                status: appointment.status,
                diagnosis: appointment.diognosis || "",
                notes: appointment.comment || "",
                branch: appointment.branch,
                branch_name: appointment.branch_name,
                payment_amount: appointment.payment_amount || "",
            }))

            setAppointments(transformedAppointments)
            setFilteredAppointments(transformedAppointments)
            setTotalItems(data.count || 0)
            setError(null)
        } catch (err) {
            console.error("Error loading appointments:", err)
            setError("Error loading appointments")
            setAppointments([])
            setFilteredAppointments([])
        } finally {
            setLoading(false)
        }
    }

    // Fetch filter data (branches, customers, doctors, cabinets)
    const fetchFilterData = async (branchId) => {
        try {
            const data = await apiAppointments.fetchFilterData(branchId)
            console.log("Filter data:", data)
            setFilterData(data)

            // Set doctors, patients, and rooms from the filter data
            setDoctors(data.doctors || [])
            setPatients(data.customers || [])
            setRooms(data.cabinets || [])
        } catch (err) {
            console.error("Error loading filter data:", err)
        }
    }

    // Fetch busy times for selected date, doctor, and room
    const fetchBusyTimes = async () => {
        try {
            const params = {
                branchId: newAppointment.branch || selectedBranch,
                doctorId: newAppointment.doctorId,
                cabinetId: newAppointment.roomId,
                date: newAppointment.date,
            }

            const busyTimesData = await apiAppointments.fetchBusyTimes(params)
            console.log("Busy times:", busyTimesData)
            setBusyTimes(busyTimesData)

            // Generate available time slots
            generateTimeSlots(busyTimesData)
        } catch (err) {
            console.error("Error loading busy times:", err)
        }
    }

    // Generate time slots from 8:00 to 18:00 with 1 hour intervals
    const generateTimeSlots = (busyTimesData = []) => {
        const slots = []
        const busyTimesList = busyTimesData.map((item) => item.time)

        for (let hour = 8; hour <= 17; hour++) {
            const formattedHour = hour.toString().padStart(2, "0")
            const timeSlot = `${formattedHour}:00`

            slots.push({
                time: timeSlot,
                isBooked: busyTimesList.includes(timeSlot),
            })
        }

        setAvailableTimes(slots)
    }

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

    // Handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        fetchAppointments()
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
            status: "expected",
            diagnosis: "",
            notes: "",
            branch: selectedBranch === "all" ? "" : selectedBranch,
        })
        setStep(1)
        setShowAddModal(true)
        setTimeError("")
    }

    // Open edit appointment modal
    const openEditModal = async (appointment) => {
        try {
            // Fetch the latest appointment data from the server
            const latestAppointmentData = await apiAppointments.fetchAppointmentById(appointment.id)

            // Format date and time for the form
            let formattedDate = ""
            let formattedTime = ""

            if (latestAppointmentData.date) {
                try {
                    const dateObj = new Date(latestAppointmentData.date)
                    if (!isNaN(dateObj.getTime())) {
                        formattedDate = dateObj.toISOString().split("T")[0]
                        formattedTime = dateObj.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })
                    }
                } catch (error) {
                    console.error("Error formatting date/time:", error)
                }
            }

            // Transform API data to match component structure
            const transformedAppointment = {
                id: latestAppointmentData.id,
                patientId: latestAppointmentData.customer.toString(),
                patientName: latestAppointmentData.customer_name,
                doctorId: latestAppointmentData.doctor.toString(),
                doctorName: latestAppointmentData.doctor_name,
                roomId: latestAppointmentData.room.toString(),
                roomName: latestAppointmentData.room_name,
                date: formattedDate,
                time: formattedTime,
                status: latestAppointmentData.status,
                diagnosis: latestAppointmentData.diognosis || "",
                notes: latestAppointmentData.comment || "",
                branch: latestAppointmentData.branch.toString(),
                payment_amount: latestAppointmentData.payment_amount || "",
            }

            setSelectedAppointment(transformedAppointment)

            // Fetch busy times for the selected date, doctor, and room
            if (formattedDate && transformedAppointment.doctorId && transformedAppointment.roomId) {
                const params = {
                    branchId: transformedAppointment.branch,
                    doctorId: transformedAppointment.doctorId,
                    cabinetId: transformedAppointment.roomId,
                    date: formattedDate,
                }

                const busyTimesData = await apiAppointments.fetchBusyTimes(params)
                setBusyTimes(busyTimesData)

                // Generate available time slots
                generateTimeSlots(busyTimesData)
            }

            setShowEditModal(true)
        } catch (error) {
            console.error("Error opening edit modal:", error)
            alert("Error loading appointment details")
        }
    }

    // Handle new appointment form input changes
    const handleNewAppointmentChange = (e) => {
        const { name, value } = e.target
        setTimeError("")

        if (name === "doctorId" && value) {
            const selectedDoctor = doctors.find((d) => d.id === Number.parseInt(value))
            setNewAppointment({
                ...newAppointment,
                doctorId: value,
                doctorName: selectedDoctor ? `${selectedDoctor.first_name} ${selectedDoctor.last_name}` : "",
                specialization: selectedDoctor ? selectedDoctor.specialization : "",
            })
        } else if (name === "patientId" && value) {
            const selectedPatient = patients.find((p) => p.id === Number.parseInt(value))
            setNewAppointment({
                ...newAppointment,
                patientId: value,
                patientName: selectedPatient ? selectedPatient.full_name : "",
            })
        } else if (name === "roomId" && value) {
            const selectedRoom = rooms.find((r) => r.id === Number.parseInt(value))
            setNewAppointment({
                ...newAppointment,
                roomId: value,
                roomName: selectedRoom ? selectedRoom.name : "",
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

            // Fetch new filter data for the selected branch
            fetchFilterData(value)
        } else {
            setNewAppointment({
                ...newAppointment,
                [name]: value,
            })
        }
    }

    // Handle time selection
    const handleTimeSelect = (time) => {
        setTimeError("")
        setNewAppointment({
            ...newAppointment,
            time,
        })
    }

    // Handle selected appointment form input changes
    const handleSelectedAppointmentChange = async (e) => {
        const { name, value } = e.target
        setTimeError("")

        // Create updated appointment data
        const updatedAppointment = {
            ...selectedAppointment,
            [name]: value,
        }

        // Handle branch change - reset dependent fields
        if (name === "branch") {
            updatedAppointment.doctorId = ""
            updatedAppointment.doctorName = ""
            updatedAppointment.roomId = ""
            updatedAppointment.roomName = ""

            // Fetch new filter data for the selected branch
            await fetchFilterData(value)
        }

        // Handle doctor change
        if (name === "doctorId" && value) {
            const selectedDoctor = doctors.find((d) => d.id === Number.parseInt(value))
            updatedAppointment.doctorName = selectedDoctor ? `${selectedDoctor.first_name} ${selectedDoctor.last_name}` : ""
        }

        // Handle patient change
        if (name === "patientId" && value) {
            const selectedPatient = patients.find((p) => p.id === Number.parseInt(value))
            updatedAppointment.patientName = selectedPatient ? selectedPatient.full_name : ""
        }

        // Handle room change
        if (name === "roomId" && value) {
            const selectedRoom = rooms.find((r) => r.id === Number.parseInt(value))
            updatedAppointment.roomName = selectedRoom ? selectedRoom.name : ""
        }

        // Handle doctor or room change - update busy times
        if (
            (name === "doctorId" || name === "roomId") &&
            updatedAppointment.date &&
            updatedAppointment.doctorId &&
            updatedAppointment.roomId
        ) {
            const params = {
                branchId: updatedAppointment.branch,
                doctorId: updatedAppointment.doctorId,
                cabinetId: updatedAppointment.roomId,
                date: updatedAppointment.date,
            }

            const busyTimesData = await apiAppointments.fetchBusyTimes(params)
            setBusyTimes(busyTimesData)

            // Generate available time slots
            generateTimeSlots(busyTimesData)
        }

        // Handle date change - update busy times and reset time
        if (name === "date") {
            updatedAppointment.time = ""

            if (updatedAppointment.doctorId && updatedAppointment.roomId) {
                const params = {
                    branchId: updatedAppointment.branch,
                    doctorId: updatedAppointment.doctorId,
                    cabinetId: updatedAppointment.roomId,
                    date: value,
                }

                const busyTimesData = await apiAppointments.fetchBusyTimes(params)
                setBusyTimes(busyTimesData)

                // Generate available time slots
                generateTimeSlots(busyTimesData)
            }
        }

        setSelectedAppointment(updatedAppointment)
    }

    // Handle edit time selection
    const handleEditTimeSelect = (time) => {
        setTimeError("")
        setSelectedAppointment({
            ...selectedAppointment,
            time: time,
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
    const handleAddAppointment = async (e) => {
        e.preventDefault()
        // Format date and time for API
        const formattedDate = `${newAppointment.date}T${newAppointment.time}:00Z`

        const appointmentData = {
            branch: Number.parseInt(newAppointment.branch),
            customer: Number.parseInt(newAppointment.patientId),
            doctor: Number.parseInt(newAppointment.doctorId),
            room: Number.parseInt(newAppointment.roomId),
            full_date: formattedDate,
            status: newAppointment.status,
            comment: newAppointment.notes,
            diognosis: newAppointment.diagnosis,
            payment_amount: newAppointment.payment_amount || "",
            organs: {},
        }
        console.log(appointmentData);
        
        try {
            // Format date and time for API
            const formattedDate = `${newAppointment.date}T${newAppointment.time}:00Z`

            const appointmentData = {
                branch: Number.parseInt(newAppointment.branch),
                customer: Number.parseInt(newAppointment.patientId),
                doctor: Number.parseInt(newAppointment.doctorId),
                room: Number.parseInt(newAppointment.roomId),
                full_date: formattedDate,
                status: newAppointment.status,
                comment: newAppointment.notes,
                diognosis: newAppointment.diagnosis,
                payment_amount: newAppointment.payment_amount || "",
                organs: {},
            }

            console.log("New appointment data:", appointmentData)
            await apiAppointments.createAppointment(appointmentData)

            // Refresh appointments list
            fetchAppointments()

            // Close modal
            setShowAddModal(false)
        } catch (err) {
            console.error("Error creating appointment:", err)
            alert("Error creating appointment")
        }
    }

    // Handle edit appointment form submission
    const handleEditAppointment = async (e) => {
        e.preventDefault()

        try {
            // Format date and time for API
            const formattedDate = `${selectedAppointment.date}T${selectedAppointment.time}:00Z`

            const appointmentData = {
                branch: Number.parseInt(selectedAppointment.branch),
                customer: Number.parseInt(selectedAppointment.patientId),
                doctor: Number.parseInt(selectedAppointment.doctorId),
                room: Number.parseInt(selectedAppointment.roomId),
                full_date: formattedDate,
                status: selectedAppointment.status,
                comment: selectedAppointment.notes || "",
                diognosis: selectedAppointment.diagnosis || "",
                payment_amount: selectedAppointment.payment_amount || "",
                organs: {},
            }

            console.log("Updated appointment data:", appointmentData)
            await apiAppointments.updateAppointment(selectedAppointment.id, appointmentData)

            // Refresh appointments list
            fetchAppointments()

            // Close modal
            setShowEditModal(false)
        } catch (err) {
            console.error("Error updating appointment:", err)
            alert("Error updating appointment")
        }
    }

    // Handle delete appointment
    const handleDeleteAppointment = async (id) => {
        if (window.confirm(t("confirm_delete_appointment"))) {
            try {
                await apiAppointments.deleteAppointment(id)

                // Refresh appointments list
                fetchAppointments()
            } catch (err) {
                console.error("Error deleting appointment:", err)
                alert("Error deleting appointment")
            }
        }
    }

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page)
        // Explicitly fetch appointments when page changes
        setTimeout(() => {
            fetchAppointments()
        }, 0)
    }

    // Format time for display
    const formatTime = (time) => {
        return time
    }

    // Get status badge class
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "finished":
            case "completed":
                return "completed"
            case "progress":
            case "in-progress":
                return "in-progress"
            case "expected":
            case "pending":
                return "pending"
            case "cancelled":
                return "cancelled"
            default:
                return ""
        }
    }

    // Get status translation
    const getStatusTranslation = (status) => {
        switch (status) {
            case "expected":
                return t("expected")
            case "accepted":
                return t("accepted")
            case "progress":
                return t("progress")
            case "finished":
                return t("finished")
            case "cancelled":
                return t("cancelled")
            case "pending":
                return t("pending")
            case "in-progress":
                return t("in_progress")
            case "completed":
                return t("completed")
            default:
                return status
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
                                        {filterData.branches &&
                                            filterData.branches.map((branch) => (
                                                <option key={branch.id} value={branch.id}>
                                                    {branch.name}
                                                </option>
                                            ))}
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
                                            {patient.full_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                                {t("cancel")}
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={nextStep}
                                disabled={!newAppointment.patientId || (selectedBranch === "all" && !newAppointment.branch)}
                            >
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
                                    {doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.first_name} {doctor.last_name} - {doctor.specialization}
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
                                    {rooms.map((room) => (
                                        <option key={room.id} value={room.id}>
                                            {room.name} - {room.type}
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
                            {timeError && (
                                <div className="time-error">
                                    <FaExclamationCircle /> {timeError}
                                </div>
                            )}
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

                        <div className="form-group">
                            <label>{t("payment_amount")}</label>
                            <div className="input-icon-wrapper">
                                <FaMoneyBillWave className="input-icon" />
                                <input
                                    type="number"
                                    name="payment_amount"
                                    value={newAppointment.payment_amount || ""}
                                    onChange={handleNewAppointmentChange}
                                    placeholder={t("enter_payment_amount")}
                                />
                            </div>
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
                                    {doctor.first_name} {doctor.last_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <FaFilter />
                        <select value={filterStatus} onChange={handleFilterStatus}>
                            <option value="all">{t("all_statuses")}</option>
                            <option value="expected">{t("expected")}</option>
                            <option value="accepted">{t("accepted")}</option>
                            <option value="progress">{t("progress")}</option>
                            <option value="finished">{t("finished")}</option>
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
                                                    <span className={`status-badge ${appointment.status}`}>
                                                        {getStatusTranslation(appointment.status)}
                                                    </span>
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
                                                <td>{appointment.time}</td>
                                                <td>{appointment.patientName}</td>
                                                <td>{appointment.doctorName}</td>
                                                <td>{appointment.roomName}</td>
                                                <td>{appointment.diagnosis}</td>
                                                <td>
                                                    <span className={`status-badge ${appointment.status}`}>
                                                        {getStatusTranslation(appointment.status)}
                                                    </span>
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
                                                        {patient.full_name}
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
                                                        {doctor.first_name} {doctor.last_name} - {doctor.specialization}
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
                                                        {room.name} - {room.type}
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
                                            <option value="expected">{t("expected")}</option>
                                            <option value="accepted">{t("accepted")}</option>
                                            <option value="progress">{t("progress")}</option>
                                            <option value="finished">{t("finished")}</option>
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
                                </div>

                                <div className="form-group">
                                    <label>{t("time")}</label>
                                    {timeError && (
                                        <div className="time-error">
                                            <FaExclamationCircle /> {timeError}
                                        </div>
                                    )}
                                    <div className="time-slots-container">
                                        {availableTimes.map((slot, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                className={`time-slot ${slot.isBooked && selectedAppointment.time !== slot.time ? "booked" : ""} ${selectedAppointment.time === slot.time ? "selected" : ""
                                                    }`}
                                                onClick={() =>
                                                    (!slot.isBooked || selectedAppointment.time === slot.time) && handleEditTimeSelect(slot.time)
                                                }
                                                disabled={slot.isBooked && selectedAppointment.time !== slot.time}
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

                                <div className="form-group">
                                    <label htmlFor="payment_amount">{t("payment_amount")}</label>
                                    <div className="input-icon-wrapper">
                                        <FaMoneyBillWave className="input-icon" />
                                        <input
                                            type="number"
                                            id="payment_amount"
                                            name="payment_amount"
                                            value={selectedAppointment.payment_amount || ""}
                                            onChange={handleSelectedAppointmentChange}
                                            placeholder={t("enter_payment_amount")}
                                        />
                                    </div>
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
