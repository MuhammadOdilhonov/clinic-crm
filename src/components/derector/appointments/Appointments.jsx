"use client"

import { useState, useEffect } from "react"
import {
    FaSearch,
    FaEdit,
    FaTrash,
    FaTimes,
    FaFilter,
    FaCalendarAlt,
    FaCalendarPlus,
    FaBuilding,
    FaClock,
    FaUserMd,
    FaUser,
    FaDoorOpen,
    FaTable,
    FaExclamationCircle,
    FaCalendarDay,
    FaEye,
    FaMoneyBillWave,
    FaSpinner,
    FaNotesMedical,
    FaEllipsisV,
    FaCheck,
} from "react-icons/fa"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import Pagination from "../../pagination/Pagination"
import apiAppointments from "../../../api/apiAppointments"

export default function Appointments() {
    const { selectedBranch } = useAuth()
    const { t } = useLanguage()

    // State for appointments data
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [totalItems, setTotalItems] = useState(0)

    // State for pagination
    const [currentPage, setCurrentPage] = useState(0)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    // State for search and filters
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterDate, setFilterDate] = useState("")
    const [filterDoctor, setFilterDoctor] = useState("all")
    const [filterBranch, setFilterBranch] = useState(selectedBranch)
    const [showFilters, setShowFilters] = useState(false)

    // State for sidebars
    const [showSidebar, setShowSidebar] = useState(false)
    const [showEditSidebar, setShowEditSidebar] = useState(false)
    const [showViewSidebar, setShowViewSidebar] = useState(false)
    const [currentAppointment, setCurrentAppointment] = useState(null)
    const [editLoading, setEditLoading] = useState(false)

    // State for new appointment
    const [newAppointment, setNewAppointment] = useState({
        branch: selectedBranch === "all" ? "" : selectedBranch,
        customer: "",
        doctor: "",
        room: "",
        date: "",
        time: "",
        status: "expected",
        comment: "",
        diognosis: "",
        payment_amount: "",
    })

    // State for filter data
    const [filterData, setFilterData] = useState({
        branches: [],
        customers: [],
        doctors: [],
        cabinets: [],
    })

    // State for busy times
    const [busyTimes, setBusyTimes] = useState([])
    const [availableTimes, setAvailableTimes] = useState([])

    // State for form steps
    const [step, setStep] = useState(1)
    const [timeError, setTimeError] = useState("")

    // State for view mode
    const [currentView, setCurrentView] = useState("table") // table, calendar
    const [startDate, setStartDate] = useState(new Date())

    // Add the time change modal functionality
    // First, add a new state for the time change modal
    const [showTimeChangeModal, setShowTimeChangeModal] = useState(false)
    const [timeChangeAppointment, setTimeChangeAppointment] = useState(null)
    const [newTime, setNewTime] = useState("")

    // Load appointments when component mounts or when branch/filters change
    useEffect(() => {
        fetchAppointments()
    }, [selectedBranch, currentPage, itemsPerPage, filterStatus, filterDate, filterDoctor, filterBranch])

    // Load filter data when branch changes
    useEffect(() => {
        if (selectedBranch !== "all") {
            fetchFilterData(selectedBranch)
        } else if (filterBranch !== "all") {
            fetchFilterData(filterBranch)
        } else {
            // If all branches selected, fetch data for the first branch or default
            fetchFilterData(1) // Default to first branch
        }
    }, [selectedBranch, filterBranch])

    // Update available times when date, doctor, or room changes
    useEffect(() => {
        if (newAppointment.date && newAppointment.doctor && newAppointment.room) {
            fetchBusyTimes()
        }
    }, [newAppointment.date, newAppointment.doctor, newAppointment.room])

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
            if (filterDate) params.date = filterDate
            if (filterDoctor !== "all") params.doctor = filterDoctor
            if (selectedBranch === "all" && filterBranch !== "all") params.branch = filterBranch
            if (selectedBranch !== "all") params.branch = selectedBranch
            if (searchTerm) params.search = searchTerm

            const data = await apiAppointments.fetchAppointments(params)
            console.log("Qabullar ma'lumotlari:", data)
            setAppointments(data.results || [])
            setTotalItems(data.count || 0)
            setError(null)
        } catch (err) {
            console.error("Qabullarni yuklashda xatolik:", err)
            setError("Qabullarni yuklashda xatolik yuz berdi")
            setAppointments([])
        } finally {
            setLoading(false)
        }
    }

    // Fetch a single appointment by ID
    const fetchAppointmentById = async (id) => {
        setEditLoading(true)
        try {
            const data = await apiAppointments.fetchAppointmentById(id)
            console.log("Qabul ma'lumotlari:", data)

            // Format the date and time for display and form
            let formattedDate = ""
            let formattedTime = ""

            if (data.date) {
                try {
                    const dateObj = new Date(data.date)
                    if (!isNaN(dateObj.getTime())) {
                        formattedDate = dateObj.toISOString().split("T")[0]
                        formattedTime = dateObj.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })
                    }
                } catch (error) {
                    console.error("Error formatting date/time:", error)
                }
            }

            // Prepare the appointment data with formatted values
            const appointmentData = {
                ...data,
                formattedDate,
                formattedTime,
            }

            setCurrentAppointment(appointmentData)
            return appointmentData
        } catch (err) {
            console.error("Qabulni yuklashda xatolik:", err)
            alert("Qabulni yuklashda xatolik yuz berdi")
            return null
        } finally {
            setEditLoading(false)
        }
    }

    // Fetch filter data (branches, customers, doctors, cabinets)
    const fetchFilterData = async (branchId) => {
        try {
            const data = await apiAppointments.fetchFilterData(branchId)
            console.log("Filtr ma'lumotlari:", data)
            setFilterData(data)
        } catch (err) {
            console.error("Filtr ma'lumotlarini yuklashda xatolik:", err)
        }
    }

    // Fetch busy times for selected date, doctor, and room
    const fetchBusyTimes = async () => {
        try {
            const params = {
                branchId: newAppointment.branch,
                doctorId: newAppointment.doctor,
                cabinetId: newAppointment.room,
                date: newAppointment.date,
            }

            const busyTimesData = await apiAppointments.fetchBusyTimes(params)
            console.log("Band vaqtlar:", busyTimesData)
            setBusyTimes(busyTimesData)

            // Generate available time slots
            generateTimeSlots(busyTimesData)
        } catch (err) {
            console.error("Band vaqtlarni yuklashda xatolik:", err)
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

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    // Handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        fetchAppointments()
    }

    // Handle new appointment input change
    const handleNewAppointmentChange = (e) => {
        const { name, value } = e.target
        setTimeError("")

        setNewAppointment({
            ...newAppointment,
            [name]: value,
        })

        // If branch changes, reset dependent fields
        if (name === "branch") {
            setNewAppointment({
                ...newAppointment,
                branch: value,
                customer: "",
                doctor: "",
                room: "",
                date: "",
                time: "",
            })

            // Fetch new filter data for the selected branch
            fetchFilterData(value)
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

    // Handle edit appointment input change
    const handleEditAppointmentChange = async (e) => {
        const { name, value } = e.target
        setTimeError("")

        // Create updated appointment data
        const updatedAppointment = {
            ...currentAppointment,
            [name]: value,
        }

        // Handle branch change - reset dependent fields
        if (name === "branch") {
            updatedAppointment.customer = ""
            updatedAppointment.doctor = ""
            updatedAppointment.room = ""

            // Fetch new filter data for the selected branch
            await fetchFilterData(value)
        }

        // Handle doctor or room change - update busy times
        if (name === "doctor" || name === "room") {
            if (updatedAppointment.formattedDate && updatedAppointment.doctor && updatedAppointment.room) {
                const params = {
                    branchId: updatedAppointment.branch,
                    doctorId: updatedAppointment.doctor,
                    cabinetId: updatedAppointment.room,
                    date: updatedAppointment.formattedDate,
                }

                const busyTimesData = await apiAppointments.fetchBusyTimes(params)
                setBusyTimes(busyTimesData)

                // Generate available time slots
                generateTimeSlots(busyTimesData)
            }
        }

        // Handle date change - update busy times and reset time
        if (name === "date") {
            updatedAppointment.time = ""
            updatedAppointment.formattedDate = value

            if (updatedAppointment.doctor && updatedAppointment.room) {
                const params = {
                    branchId: updatedAppointment.branch,
                    doctorId: updatedAppointment.doctor,
                    cabinetId: updatedAppointment.room,
                    date: value,
                }

                const busyTimesData = await apiAppointments.fetchBusyTimes(params)
                setBusyTimes(busyTimesData)

                // Generate available time slots
                generateTimeSlots(busyTimesData)
            }
        }

        setCurrentAppointment(updatedAppointment)
    }

    // Add a function to handle time selection in edit mode
    const handleEditTimeSelect = (time) => {
        setTimeError("")
        setCurrentAppointment({
            ...currentAppointment,
            time: time,
        })
    }

    // Add this function after the handleEditTimeSelect function
    const openTimeChangeModal = async (appointment) => {
        if (!appointment || !appointment.id) return

        try {
            // Fetch the latest appointment data
            const latestAppointmentData = await fetchAppointmentById(appointment.id)

            if (latestAppointmentData) {
                setTimeChangeAppointment(latestAppointmentData)
                setNewTime(latestAppointmentData.time || "")

                // Fetch busy times for the selected date, doctor, and room
                if (latestAppointmentData.formattedDate && latestAppointmentData.doctor && latestAppointmentData.room) {
                    const params = {
                        branchId: latestAppointmentData.branch,
                        doctorId: latestAppointmentData.doctor,
                        cabinetId: latestAppointmentData.room,
                        date: latestAppointmentData.formattedDate,
                    }

                    const busyTimesData = await apiAppointments.fetchBusyTimes(params)
                    setBusyTimes(busyTimesData)

                    // Generate available time slots
                    generateTimeSlots(busyTimesData)
                }

                setShowTimeChangeModal(true)
            }
        } catch (error) {
            console.error("Error opening time change modal:", error)
            alert("Qabulni vaqtini o'zgartirishda xatolik yuz berdi")
        }
    }

    // Add this function to handle time selection in the time change modal
    const handleTimeChangeSelect = (time) => {
        setTimeError("")
        setNewTime(time)
    }

    // Add this function to save the time change
    const saveTimeChange = async () => {
        if (!timeChangeAppointment || !newTime) return

        try {
            // Format date and time for API
            const formattedDate = `${timeChangeAppointment.formattedDate}T${newTime}:00Z`

            const appointmentData = {
                branch: Number.parseInt(timeChangeAppointment.branch),
                customer: Number.parseInt(timeChangeAppointment.customer),
                doctor: Number.parseInt(timeChangeAppointment.doctor),
                room: Number.parseInt(timeChangeAppointment.room),
                full_date: formattedDate,
                status: timeChangeAppointment.status,
                comment: timeChangeAppointment.comment || "",
                diognosis: timeChangeAppointment.diognosis || "",
                payment_amount: timeChangeAppointment.payment_amount || "",
                organs: timeChangeAppointment.organs || {},
            }

            console.log("Yangilangan vaqt ma'lumotlari:", appointmentData)
            await apiAppointments.updateAppointment(timeChangeAppointment.id, appointmentData)

            // Refresh appointments list
            fetchAppointments()

            // Close modal
            closeTimeChangeModal()

            // Show success message
            alert("Qabul vaqti muvaffaqiyatli o'zgartirildi")
        } catch (err) {
            console.error("Qabul vaqtini o'zgartirishda xatolik:", err)
            alert("Qabul vaqtini o'zgartirishda xatolik yuz berdi")
        }
    }

    // Add this function to close the time change modal
    const closeTimeChangeModal = () => {
        setShowTimeChangeModal(false)
        setTimeChangeAppointment(null)
        setNewTime("")
        setTimeError("")
    }

    // Open add sidebar
    const openAddSidebar = () => {
        setShowSidebar(true)
        setStep(1)
        setTimeError("")
        setNewAppointment({
            branch: selectedBranch === "all" ? "" : selectedBranch,
            customer: "",
            doctor: "",
            room: "",
            date: "",
            time: "",
            status: "expected",
            comment: "",
            diognosis: "",
            payment_amount: "",
        })
    }

    // Close add sidebar
    const closeAddSidebar = () => {
        setShowSidebar(false)
        setStep(1)
        setTimeError("")
    }

    // Open view sidebar
    const openViewSidebar = (appointment) => {
        // Create a copy of the appointment to avoid reference issues
        const appointmentCopy = { ...appointment }

        // Ensure date is properly formatted for display
        if (appointmentCopy.date) {
            try {
                const dateObj = new Date(appointmentCopy.date)
                if (!isNaN(dateObj.getTime())) {
                    appointmentCopy.formattedDate = dateObj.toLocaleDateString("uz-UZ", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })
                    appointmentCopy.formattedTime = dateObj.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })
                } else {
                    appointmentCopy.formattedDate = ""
                    appointmentCopy.formattedTime = ""
                }
            } catch (error) {
                console.error("Error formatting date/time:", error)
                appointmentCopy.formattedDate = ""
                appointmentCopy.formattedTime = ""
            }
        }

        setCurrentAppointment(appointmentCopy)
        setShowViewSidebar(true)
    }

    // Close view sidebar
    const closeViewSidebar = () => {
        setShowViewSidebar(false)
        setCurrentAppointment(null)
    }

    // Open edit sidebar
    const openEditSidebar = async (appointment) => {
        if (!appointment || !appointment.id) return

        setEditLoading(true)
        try {
            // Fetch the latest appointment data from the server
            const latestAppointmentData = await fetchAppointmentById(appointment.id)

            if (latestAppointmentData) {
                // Set the current appointment data
                setCurrentAppointment(latestAppointmentData)

                // Fetch filter data for the branch
                await fetchFilterData(latestAppointmentData.branch)

                // Fetch busy times for the selected date, doctor, and room
                if (latestAppointmentData.formattedDate && latestAppointmentData.doctor && latestAppointmentData.room) {
                    const params = {
                        branchId: latestAppointmentData.branch,
                        doctorId: latestAppointmentData.doctor,
                        cabinetId: latestAppointmentData.room,
                        date: latestAppointmentData.formattedDate,
                    }

                    const busyTimesData = await apiAppointments.fetchBusyTimes(params)
                    setBusyTimes(busyTimesData)

                    // Generate available time slots
                    generateTimeSlots(busyTimesData)
                }

                setShowEditSidebar(true)
            }
        } catch (error) {
            console.error("Error opening edit sidebar:", error)
            alert("Qabulni tahrirlashda xatolik yuz berdi")
        } finally {
            setEditLoading(false)
        }
    }

    // Close edit sidebar
    const closeEditSidebar = () => {
        setShowEditSidebar(false)
        setTimeError("")
        setCurrentAppointment(null)
    }

    // Toggle filters
    const toggleFilters = () => {
        setShowFilters(!showFilters)
    }

    // Next step in appointment creation
    const nextStep = () => {
        setStep(step + 1)
    }

    // Previous step in appointment creation
    const prevStep = () => {
        setStep(step - 1)
    }

    // Add new appointment
    const addAppointment = async (e) => {
        e.preventDefault()

        try {
            // Format date and time for API
            const formattedDate = `${newAppointment.date}T${newAppointment.time}:00Z`

            const appointmentData = {
                branch: Number.parseInt(newAppointment.branch),
                customer: Number.parseInt(newAppointment.customer),
                doctor: Number.parseInt(newAppointment.doctor),
                room: Number.parseInt(newAppointment.room),
                full_date: formattedDate, // Changed from date to full_date
                status: newAppointment.status,
                comment: newAppointment.comment,
                diognosis: newAppointment.diognosis,
                payment_amount: newAppointment.payment_amount,
                organs: {},
            }

            console.log("Yangi qabul ma'lumotlari:", appointmentData)
            await apiAppointments.createAppointment(appointmentData)

            // Refresh appointments list
            fetchAppointments()

            // Close sidebar
            closeAddSidebar()
        } catch (err) {
            console.error("Qabul yaratishda xatolik:", err)
            alert("Qabul yaratishda xatolik yuz berdi")
        }
    }

    // Update appointment
    const updateAppointment = async (e) => {
        e.preventDefault()

        try {
            // Extract date and time from the current appointment
            let date = ""
            let time = ""

            // Use the formatted date if available
            if (currentAppointment.formattedDate) {
                date = currentAppointment.formattedDate
            } else if (currentAppointment.date) {
                if (typeof currentAppointment.date === "string" && currentAppointment.date.includes("T")) {
                    date = currentAppointment.date.split("T")[0]
                } else {
                    date = new Date(currentAppointment.date).toISOString().split("T")[0]
                }
            } else {
                date = new Date().toISOString().split("T")[0]
            }

            // Use the time input value or extract from date
            if (currentAppointment.time) {
                time = currentAppointment.time
            } else if (currentAppointment.formattedTime) {
                time = currentAppointment.formattedTime
            } else if (
                currentAppointment.date &&
                typeof currentAppointment.date === "string" &&
                currentAppointment.date.includes("T")
            ) {
                const timePart = currentAppointment.date.split("T")[1]
                if (timePart && timePart.length >= 5) {
                    time = timePart.substring(0, 5)
                } else {
                    time = "00:00"
                }
            } else {
                time = "00:00"
            }

            // Format date and time for API
            const formattedDate = `${date}T${time}:00Z`

            const appointmentData = {
                branch: Number.parseInt(currentAppointment.branch),
                customer: Number.parseInt(currentAppointment.customer),
                doctor: Number.parseInt(currentAppointment.doctor),
                room: Number.parseInt(currentAppointment.room),
                full_date: formattedDate, // Changed from date to full_date
                status: currentAppointment.status,
                comment: currentAppointment.comment || "",
                diognosis: currentAppointment.diognosis || "",
                payment_amount: currentAppointment.payment_amount || "",
                organs: currentAppointment.organs || {},
            }

            console.log("Yangilangan qabul ma'lumotlari:", appointmentData)
            await apiAppointments.updateAppointment(currentAppointment.id, appointmentData)

            // Refresh appointments list
            fetchAppointments()

            // Close sidebar
            closeEditSidebar()
        } catch (err) {
            console.error("Qabulni yangilashda xatolik:", err)
            alert("Qabulni yangilashda xatolik yuz berdi")
        }
    }

    // Delete appointment
    const deleteAppointment = async (id) => {
        if (window.confirm(t("confirm_delete_appointment"))) {
            try {
                await apiAppointments.deleteAppointment(id)

                // Refresh appointments list
                fetchAppointments()
            } catch (err) {
                console.error("Qabulni o'chirishda xatolik:", err)
                alert("Qabulni o'chirishda xatolik yuz berdi")
            }
        }
    }

    // Handle status change
    const handleStatusChange = async (id, status) => {
        try {
            await apiAppointments.updateAppointmentStatus(id, status)

            // Show success message
            const statusText = status === "accepted" ? t("accepted") : t("cancelled")
            alert(`${t("appointment_status_updated_to")} ${statusText}`)

            // Refresh appointments list
            fetchAppointments()
        } catch (err) {
            console.error("Qabul holatini yangilashda xatolik:", err)
            alert("Qabul holatini yangilashda xatolik yuz berdi")
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

    // Handle items per page change
    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage)
        setCurrentPage(0) // Reset to first page
        // Explicitly fetch appointments when items per page changes
        setTimeout(() => {
            fetchAppointments()
        }, 0)
    }

    // Get week dates for calendar view
    const getWeekDates = () => {
        const dates = []
        const startOfWeek = new Date(startDate)
        startOfWeek.setDate(startDate.getDate() - startDate.getDay()) // Start from Sunday

        for (let i = 0; i < 7; i++) {
            const date = new Date(startOfWeek)
            date.setDate(startOfWeek.getDate() + i)
            dates.push(date)
        }

        return dates
    }

    // Format date for display
    const formatDateForDisplay = (dateString) => {
        if (!dateString) return ""

        let date
        if (typeof dateString === "string" && dateString.includes("T")) {
            date = new Date(dateString)
        } else {
            date = new Date(dateString)
        }

        return date.toLocaleDateString("uz-UZ", { day: "numeric", month: "long", year: "numeric" })
    }

    // Format time for display
    const formatTimeForDisplay = (dateString) => {
        if (!dateString) return ""

        let date
        try {
            if (typeof dateString === "string" && dateString.includes("T")) {
                date = new Date(dateString)
            } else {
                date = new Date(dateString)
            }
            return date.toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" })
        } catch (error) {
            console.error("Error formatting time:", error)
            return ""
        }
    }

    // Set view to today
    const goToToday = () => {
        setStartDate(new Date())
    }

    // Get branch name by ID
    const getBranchName = (branchId) => {
        const branch = filterData.branches.find((b) => b.id === branchId)
        return branch ? branch.name : branchId
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
                            <div className="appointments-form-group">
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

                        <div className="appointments-form-group">
                            <label>{t("patient")}</label>
                            <div className="input-icon-wrapper">
                                <FaUser className="input-icon" />
                                <select name="customer" value={newAppointment.customer} onChange={handleNewAppointmentChange} required>
                                    <option value="">{t("select_patient")}</option>
                                    {filterData.customers &&
                                        filterData.customers.map((customer) => (
                                            <option key={customer.id} value={customer.id}>
                                                {customer.full_name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="appointments-form-actions">
                            <button type="button" className="appointments-btn appointments-btn-secondary" onClick={closeAddSidebar}>
                                {t("cancel")}
                            </button>
                            <button
                                type="button"
                                className="appointments-btn appointments-btn-primary"
                                onClick={nextStep}
                                disabled={!newAppointment.branch || !newAppointment.customer}
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

                        <div className="appointments-form-group">
                            <label>{t("doctor")}</label>
                            <div className="input-icon-wrapper">
                                <FaUserMd className="input-icon" />
                                <select name="doctor" value={newAppointment.doctor} onChange={handleNewAppointmentChange} required>
                                    <option value="">{t("select_doctor")}</option>
                                    {filterData.doctors &&
                                        filterData.doctors.map((doctor) => (
                                            <option key={doctor.id} value={doctor.id}>
                                                {doctor.first_name} {doctor.last_name} - {doctor.specialization}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="appointments-form-actions">
                            <button type="button" className="appointments-btn appointments-btn-secondary" onClick={prevStep}>
                                {t("back")}
                            </button>
                            <button
                                type="button"
                                className="appointments-btn appointments-btn-primary"
                                onClick={nextStep}
                                disabled={!newAppointment.doctor}
                            >
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

                        <div className="appointments-form-group">
                            <label>{t("room")}</label>
                            <div className="input-icon-wrapper">
                                <FaDoorOpen className="input-icon" />
                                <select name="room" value={newAppointment.room} onChange={handleNewAppointmentChange} required>
                                    <option value="">{t("select_room")}</option>
                                    {filterData.cabinets &&
                                        filterData.cabinets.map((cabinet) => (
                                            <option key={cabinet.id} value={cabinet.id}>
                                                {cabinet.name} - {cabinet.type}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="appointments-form-actions">
                            <button type="button" className="appointments-btn appointments-btn-secondary" onClick={prevStep}>
                                {t("back")}
                            </button>
                            <button
                                type="button"
                                className="appointments-btn appointments-btn-primary"
                                onClick={nextStep}
                                disabled={!newAppointment.room}
                            >
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

                        <div className="appointments-form-group">
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

                        <div className="appointments-form-actions">
                            <button type="button" className="appointments-btn appointments-btn-secondary" onClick={prevStep}>
                                {t("back")}
                            </button>
                            <button
                                type="button"
                                className="appointments-btn appointments-btn-primary"
                                onClick={nextStep}
                                disabled={!newAppointment.date}
                            >
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

                        <div className="appointments-form-group">
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

                        <div className="appointments-form-actions">
                            <button type="button" className="appointments-btn appointments-btn-secondary" onClick={prevStep}>
                                {t("back")}
                            </button>
                            <button
                                type="button"
                                className="appointments-btn appointments-btn-primary"
                                onClick={nextStep}
                                disabled={!newAppointment.time}
                            >
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

                        <div className="appointments-form-group">
                            <label>{t("diagnosis")}</label>
                            <textarea
                                name="diognosis"
                                value={newAppointment.diognosis}
                                onChange={handleNewAppointmentChange}
                                rows={3}
                                placeholder={t("enter_diagnosis")}
                            ></textarea>
                        </div>

                        <div className="appointments-form-group">
                            <label>{t("notes")}</label>
                            <textarea
                                name="comment"
                                value={newAppointment.comment}
                                onChange={handleNewAppointmentChange}
                                rows={3}
                                placeholder={t("enter_notes")}
                            ></textarea>
                        </div>

                        <div className="appointments-form-group">
                            <label>{t("payment_amount")}</label>
                            <div className="input-icon-wrapper">
                                <FaMoneyBillWave className="input-icon" />
                                <input
                                    type="number"
                                    name="payment_amount"
                                    value={newAppointment.payment_amount}
                                    onChange={handleNewAppointmentChange}
                                    placeholder={t("enter_payment_amount")}
                                />
                            </div>
                        </div>

                        <div className="appointments-form-actions">
                            <button type="button" className="appointments-btn appointments-btn-secondary" onClick={prevStep}>
                                {t("back")}
                            </button>
                            <button type="submit" className="appointments-btn appointments-btn-primary">
                                {t("add_appointment")}
                            </button>
                        </div>
                    </>
                )
            default:
                return null
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
            default:
                return status
        }
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
                    <form onSubmit={handleSearchSubmit} className="appointments-search-input">
                        <FaSearch className="appointments-search-icon" />
                        <input type="text" placeholder={t("search")} value={searchTerm} onChange={handleSearchChange} />
                        <button type="submit" className="appointments-search-button">
                            <FaSearch />
                        </button>
                    </form>
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
                                <option value="expected">{t("expected")}</option>
                                <option value="accepted">{t("accepted")}</option>
                                <option value="progress">{t("progress")}</option>
                                <option value="finished">{t("finished")}</option>
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
                                {filterData.doctors &&
                                    filterData.doctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.first_name} {doctor.last_name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        {selectedBranch === "all" && (
                            <div className="appointments-filter-group">
                                <label>{t("branch")}:</label>
                                <select value={filterBranch} onChange={(e) => setFilterBranch(e.target.value)}>
                                    <option value="all">{t("all")}</option>
                                    {filterData.branches &&
                                        filterData.branches.map((branch) => (
                                            <option key={branch.id} value={branch.id}>
                                                {branch.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="appointments-view-controls">
                <button
                    className={`appointments-view-btn ${currentView === "table" ? "active" : ""}`}
                    onClick={() => setCurrentView("table")}
                >
                    <FaTable /> {t("table_view")}
                </button>
                <button
                    className={`appointments-view-btn ${currentView === "calendar" ? "active" : ""}`}
                    onClick={() => setCurrentView("calendar")}
                >
                    <FaCalendarAlt /> {t("calendar_view")}
                </button>
                {currentView === "calendar" && (
                    <button className="appointments-view-btn" onClick={goToToday}>
                        <FaCalendarDay /> {t("today")}
                    </button>
                )}
            </div>

            {currentView === "table" ? (
                <div className="appointments-dashboard-card">
                    <div className="appointments-table-responsive">
                        <table className="appointments-data-table">
                            <thead>
                                <tr>
                                    <th>{t("patient")}</th>
                                    <th>{t("doctor")}</th>
                                    <th>{t("room")}</th>
                                    <th>{t("date")}</th>
                                    <th>{t("time")}</th>
                                    <th>{t("status")}</th>
                                    <th>{t("diagnosis")}</th>
                                    <th>{t("payment_amount")}</th>
                                    {selectedBranch === "all" && <th>{t("branch")}</th>}
                                    <th>{t("actions")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="10" className="appointments-loading">
                                            <FaSpinner className="appointments-spinner" /> {t("loading")}
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="10" className="appointments-error">
                                            <FaExclamationCircle className="appointments-error-icon" /> {error}
                                        </td>
                                    </tr>
                                ) : appointments.length === 0 ? (
                                    <tr>
                                        <td colSpan="10" className="appointments-no-data">
                                            <FaExclamationCircle className="appointments-no-data-icon" /> {t("no_data_found")}
                                        </td>
                                    </tr>
                                ) : (
                                    appointments.map((appointment) => (
                                        <tr key={appointment.id} onClick={() => openViewSidebar(appointment)} style={{ cursor: "pointer" }}>
                                            <td>{appointment.customer_name}</td>
                                            <td>{appointment.doctor_name}</td>
                                            <td>{appointment.room_name}</td>
                                            <td>{formatDateForDisplay(appointment.date)}</td>
                                            <td>{formatTimeForDisplay(appointment.date)}</td>
                                            <td>
                                                <div className={`appointments-status-badge ${appointment.status}`}>
                                                    {getStatusTranslation(appointment.status)}
                                                </div>
                                            </td>
                                            <td>{appointment.diognosis}</td>
                                            <td>{appointment.payment_amount}</td>
                                            {selectedBranch === "all" && (
                                                <td>
                                                    <div className="appointments-branch-badge">
                                                        <FaBuilding className="appointments-branch-icon" />
                                                        {getBranchName(appointment.branch)}
                                                    </div>
                                                </td>
                                            )}
                                            <td onClick={(e) => e.stopPropagation()}>
                                                <div className="appointments-action-dropdown">
                                                    <button className="appointments-action-dropdown-toggle">
                                                        <FaEllipsisV />
                                                    </button>
                                                    <div className="appointments-action-dropdown-menu">
                                                        <button
                                                            className="appointments-action-item"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                openViewSidebar(appointment)
                                                            }}
                                                        >
                                                            <FaEye /> {t("view")}
                                                        </button>
                                                        <button
                                                            className="appointments-action-item"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                openEditSidebar(appointment)
                                                            }}
                                                        >
                                                            <FaEdit /> {t("edit")}
                                                        </button>
                                                        <button
                                                            className="appointments-action-item"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                openTimeChangeModal(appointment)
                                                            }}
                                                        >
                                                            <FaClock /> {t("change_time")}
                                                        </button>
                                                        {appointment.status === "expected" && (
                                                            <button
                                                                className="appointments-action-item status-accept"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    handleStatusChange(appointment.id, "accepted")
                                                                }}
                                                            >
                                                                <FaCheck /> {t("accept")}
                                                            </button>
                                                        )}
                                                        {appointment.status === "expected" && (
                                                            <button
                                                                className="appointments-action-item status-cancel"
                                                                onClick={(e) => {
                                                                    e.stopPropagation()
                                                                    handleStatusChange(appointment.id, "cancelled")
                                                                }}
                                                            >
                                                                <FaTimes /> {t("cancel")}
                                                            </button>
                                                        )}
                                                        <button
                                                            className="appointments-action-item delete"
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                deleteAppointment(appointment.id)
                                                            }}
                                                        >
                                                            <FaTrash /> {t("delete")}
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                    <Pagination
                        pageCount={Math.ceil(totalItems / itemsPerPage)}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        onItemsPerPageChange={handleItemsPerPageChange}
                    />
                </div>
            ) : (
                <div className="appointments-calendar-view">
                    <div className="appointments-calendar-header">
                        <div className="appointments-calendar-days">
                            {getWeekDates().map((date, index) => (
                                <div
                                    key={index}
                                    className={`appointments-calendar-day ${date.toDateString() === new Date().toDateString() ? "today" : ""
                                        }`}
                                >
                                    <div className="appointments-day-name">{date.toLocaleDateString("uz-UZ", { weekday: "short" })}</div>
                                    <div className="appointments-day-date">{date.getDate()}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="appointments-calendar-body">
                        {getWeekDates().map((date, index) => {
                            const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
                                date.getDate(),
                            ).padStart(2, "0")}`
                            const dayAppointments = appointments.filter(
                                (appointment) => appointment.date && appointment.date.startsWith(dateString),
                            )

                            return (
                                <div
                                    key={index}
                                    className={`appointments-calendar-column ${date.toDateString() === new Date().toDateString() ? "today" : ""
                                        }`}
                                >
                                    {dayAppointments.length > 0 ? (
                                        dayAppointments.map((appointment) => (
                                            <div
                                                key={appointment.id}
                                                className={`appointments-calendar-item ${appointment.status}`}
                                                onClick={() => openViewSidebar(appointment)}
                                            >
                                                <div className="appointments-calendar-time">{formatTimeForDisplay(appointment.date)}</div>
                                                <div className="appointments-calendar-patient">{appointment.customer_name}</div>
                                                <div className="appointments-calendar-doctor">{appointment.doctor_name}</div>
                                                <div className="appointments-calendar-room">{appointment.room_name}</div>
                                                <div className="appointments-calendar-status">
                                                    <span className={`appointments-status-badge ${appointment.status}`}>
                                                        {getStatusTranslation(appointment.status)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="appointments-no-appointments">
                                            <p>{t("no_appointments")}</p>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}

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
                    </form>
                </div>
            </div>

            {/* View Appointment Sidebar */}
            <div
                className={`appointments-sidebar-overlay ${showViewSidebar ? "active" : ""}`}
                onClick={closeViewSidebar}
            ></div>
            <div className={`appointments-sidebar ${showViewSidebar ? "active" : ""}`}>
                {currentAppointment && (
                    <>
                        <div className="appointments-sidebar-header">
                            <h2>{t("view_appointment")}</h2>
                            <button className="appointments-close-button" onClick={closeViewSidebar}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="appointments-sidebar-content">
                            <div className="appointment-view-card">
                                <div className={`appointment-status-indicator ${currentAppointment.status}`}>
                                    {getStatusTranslation(currentAppointment.status)}
                                </div>

                                <div className="appointment-view-header">
                                    <div className="appointment-view-avatar">
                                        <FaUser />
                                    </div>
                                    <div className="appointment-view-title">
                                        <h3>{currentAppointment.customer_name}</h3>
                                        <p className="appointment-view-subtitle">
                                            <FaCalendarAlt />
                                            {currentAppointment.formattedDate || formatDateForDisplay(currentAppointment.date)}
                                            <span className="appointment-time">
                                                <FaClock />
                                                {currentAppointment.formattedTime || formatTimeForDisplay(currentAppointment.date)}
                                            </span>
                                        </p>
                                    </div>
                                </div>

                                <div className="appointment-view-details">
                                    <div className="appointment-view-section">
                                        <h4>
                                            <FaUserMd />
                                            {t("doctor_information")}
                                        </h4>
                                        <div className="appointment-view-info">
                                            <span className="info-label">{t("doctor")}:</span>
                                            <span className="info-value">{currentAppointment.doctor_name}</span>
                                        </div>
                                        <div className="appointment-view-info">
                                            <span className="info-label">{t("specialization")}:</span>
                                            <span className="info-value">
                                                {currentAppointment.doctor_specialization || t("not_specified")}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="appointment-view-section">
                                        <h4>
                                            <FaBuilding />
                                            {t("location_information")}
                                        </h4>
                                        <div className="appointment-view-info">
                                            <span className="info-label">{t("branch")}:</span>
                                            <span className="info-value">{currentAppointment.branch_name}</span>
                                        </div>
                                        <div className="appointment-view-info">
                                            <span className="info-label">{t("room")}:</span>
                                            <span className="info-value">{currentAppointment.room_name}</span>
                                        </div>
                                    </div>

                                    <div className="appointment-view-section">
                                        <h4>
                                            <FaNotesMedical />
                                            {t("medical_information")}
                                        </h4>
                                        <div className="appointment-view-info">
                                            <span className="info-label">{t("diagnosis")}:</span>
                                            <span className="info-value">{currentAppointment.diognosis || t("no_diagnosis")}</span>
                                        </div>
                                        <div className="appointment-view-info">
                                            <span className="info-label">{t("notes")}:</span>
                                            <span className="info-value">{currentAppointment.comment || t("no_notes")}</span>
                                        </div>
                                    </div>

                                    <div className="appointment-view-section">
                                        <h4>
                                            <FaMoneyBillWave />
                                            {t("payment_information")}
                                        </h4>
                                        <div className="appointment-view-info">
                                            <span className="info-label">{t("payment_amount")}:</span>
                                            <span className="info-value">
                                                {currentAppointment.payment_amount || "0"} {t("currency")}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="appointment-view-actions">
                                    <button
                                        type="button"
                                        className="appointments-btn appointments-btn-primary"
                                        onClick={() => {
                                            closeViewSidebar()
                                            openEditSidebar(currentAppointment)
                                        }}
                                    >
                                        <FaEdit /> {t("edit")}
                                    </button>
                                    <button
                                        type="button"
                                        className="appointments-btn appointments-btn-secondary"
                                        onClick={closeViewSidebar}
                                    >
                                        {t("close")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Edit Appointment Sidebar */}
            <div
                className={`appointments-sidebar-overlay ${showEditSidebar ? "active" : ""}`}
                onClick={closeEditSidebar}
            ></div>
            <div className={`appointments-sidebar ${showEditSidebar ? "active" : ""}`}>
                {editLoading ? (
                    <div className="appointments-loading-container">
                        <FaSpinner className="appointments-spinner" /> {t("loading")}
                    </div>
                ) : currentAppointment ? (
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
                                        <div className="input-icon-wrapper">
                                            <FaBuilding className="input-icon" />
                                            <select name="branch" value={currentAppointment.branch} onChange={handleEditAppointmentChange}>
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

                                <div className="appointments-form-group">
                                    <label>{t("patient")}</label>
                                    <div className="input-icon-wrapper">
                                        <FaUser className="input-icon" />
                                        <select
                                            name="customer"
                                            value={currentAppointment.customer}
                                            onChange={handleEditAppointmentChange}
                                            required
                                        >
                                            <option value="">{t("select_patient")}</option>
                                            {filterData.customers &&
                                                filterData.customers.map((customer) => (
                                                    <option key={customer.id} value={customer.id}>
                                                        {customer.full_name}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="appointments-form-group">
                                    <label>{t("doctor")}</label>
                                    <div className="input-icon-wrapper">
                                        <FaUserMd className="input-icon" />
                                        <select
                                            name="doctor"
                                            value={currentAppointment.doctor}
                                            onChange={handleEditAppointmentChange}
                                            required
                                        >
                                            <option value="">{t("select_doctor")}</option>
                                            {filterData.doctors &&
                                                filterData.doctors.map((doctor) => (
                                                    <option key={doctor.id} value={doctor.id}>
                                                        {doctor.first_name} {doctor.last_name} - {doctor.specialization}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="appointments-form-group">
                                    <label>{t("room")}</label>
                                    <div className="input-icon-wrapper">
                                        <FaDoorOpen className="input-icon" />
                                        <select name="room" value={currentAppointment.room} onChange={handleEditAppointmentChange} required>
                                            <option value="">{t("select_room")}</option>
                                            {filterData.cabinets &&
                                                filterData.cabinets.map((cabinet) => (
                                                    <option key={cabinet.id} value={cabinet.id}>
                                                        {cabinet.name} - {cabinet.type}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="appointments-form-row">
                                    <div className="appointments-form-group">
                                        <label>{t("date")}</label>
                                        <div className="input-icon-wrapper">
                                            <FaCalendarAlt className="input-icon" />
                                            <input
                                                type="date"
                                                name="date"
                                                value={
                                                    currentAppointment.formattedDate ||
                                                    (currentAppointment.date ? currentAppointment.date.split("T")[0] : "")
                                                }
                                                onChange={handleEditAppointmentChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="appointments-form-group">
                                    <label>{t("time")}</label>
                                    {timeError && (
                                        <div className="time-error">
                                            <FaExclamationCircle /> {timeError}
                                        </div>
                                    )}
                                    <div className="time-slots-container">
                                        {availableTimes.length > 0 ? (
                                            availableTimes.map((slot, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    className={`time-slot ${slot.isBooked ? "booked" : ""} ${currentAppointment.time === slot.time ? "selected" : ""
                                                        }`}
                                                    onClick={() => !slot.isBooked && handleEditTimeSelect(slot.time)}
                                                    disabled={slot.isBooked}
                                                >
                                                    <FaClock className="time-icon" />
                                                    {slot.time}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="no-times-message">{t("please_select_date_and_room_first")}</div>
                                        )}
                                    </div>
                                </div>

                                <div className="appointments-form-group">
                                    <label>{t("status")}</label>
                                    <select name="status" value={currentAppointment.status} onChange={handleEditAppointmentChange}>
                                        <option value="expected">{t("expected")}</option>
                                        <option value="accepted">{t("accepted")}</option>
                                        <option value="progress">{t("progress")}</option>
                                        <option value="finished">{t("finished")}</option>
                                        <option value="cancelled">{t("cancelled")}</option>
                                    </select>
                                </div>

                                <div className="appointments-form-group">
                                    <label>{t("diagnosis")}</label>
                                    <textarea
                                        name="diognosis"
                                        value={currentAppointment.diognosis || ""}
                                        onChange={handleEditAppointmentChange}
                                        rows={3}
                                        placeholder={t("enter_diagnosis")}
                                    ></textarea>
                                </div>

                                <div className="appointments-form-group">
                                    <label>{t("notes")}</label>
                                    <textarea
                                        name="comment"
                                        value={currentAppointment.comment || ""}
                                        onChange={handleEditAppointmentChange}
                                        rows={3}
                                        placeholder={t("enter_notes")}
                                    ></textarea>
                                </div>

                                <div className="appointments-form-group">
                                    <label>{t("payment_amount")}</label>
                                    <div className="input-icon-wrapper">
                                        <FaMoneyBillWave className="input-icon" />
                                        <input
                                            type="number"
                                            name="payment_amount"
                                            value={currentAppointment.payment_amount || ""}
                                            onChange={handleEditAppointmentChange}
                                            placeholder={t("enter_payment_amount")}
                                        />
                                    </div>
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
                ) : null}
            </div>

            {/* Time Change Modal */}
            {showTimeChangeModal && timeChangeAppointment && (
                <div className="time-change-modal-overlay">
                    <div className="time-change-modal">
                        <div className="time-change-modal-header">
                            <h3>{t("change_appointment_time")}</h3>
                            <button className="close-btn" onClick={closeTimeChangeModal}>
                                ×
                            </button>
                        </div>
                        <div className="time-change-modal-body">
                            <div className="appointment-info">
                                <div className="info-row">
                                    <div className="info-label">{t("patient")}:</div>
                                    <div className="info-value">{timeChangeAppointment.customer_name}</div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">{t("doctor")}:</div>
                                    <div className="info-value">{timeChangeAppointment.doctor_name}</div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">{t("room")}:</div>
                                    <div className="info-value">{timeChangeAppointment.room_name}</div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">{t("date")}:</div>
                                    <div className="info-value">
                                        {timeChangeAppointment.formattedDate || formatDateForDisplay(timeChangeAppointment.date)}
                                    </div>
                                </div>
                                <div className="info-row">
                                    <div className="info-label">{t("current_time")}:</div>
                                    <div className="info-value">
                                        {timeChangeAppointment.time || formatTimeForDisplay(timeChangeAppointment.date)}
                                    </div>
                                </div>
                            </div>

                            <div className="time-selection">
                                <h4>{t("select_new_time")}</h4>
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
                                            className={`time-slot ${slot.isBooked && timeChangeAppointment.time !== slot.time ? "booked" : ""
                                                } ${newTime === slot.time ? "selected" : ""}`}
                                            onClick={() =>
                                                (!slot.isBooked || timeChangeAppointment.time === slot.time) &&
                                                handleTimeChangeSelect(slot.time)
                                            }
                                            disabled={slot.isBooked && timeChangeAppointment.time !== slot.time}
                                        >
                                            <FaClock className="time-icon" />
                                            {slot.time}
                                        </button>
                                    ))}
                                    {availableTimes.length === 0 && <div className="no-times-message">{t("no_available_times")}</div>}
                                </div>
                            </div>
                        </div>
                        <div className="time-change-modal-footer">
                            <button className="appointments-btn appointments-btn-secondary" onClick={closeTimeChangeModal}>
                                {t("cancel")}
                            </button>
                            <button
                                className="appointments-btn appointments-btn-primary"
                                onClick={saveTimeChange}
                                disabled={!newTime}
                            >
                                {t("save_changes")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
