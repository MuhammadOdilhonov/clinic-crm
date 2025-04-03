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
} from "react-icons/fa"
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

    // Mock data for rooms
    const roomsData = {
        all: [
            { id: 1, name: "Xona 101", type: "Qabul", branch: "branch1" },
            { id: 2, name: "Xona 102", type: "Qabul", branch: "branch1" },
            { id: 3, name: "Xona 201", type: "Qabul", branch: "branch2" },
            { id: 4, name: "Xona 202", type: "Qabul", branch: "branch2" },
            { id: 5, name: "Xona 301", type: "Qabul", branch: "branch3" },
            { id: 6, name: "Xona 302", type: "Qabul", branch: "branch3" },
        ],
        branch1: [
            { id: 1, name: "Xona 101", type: "Qabul", branch: "branch1" },
            { id: 2, name: "Xona 102", type: "Qabul", branch: "branch1" },
        ],
        branch2: [
            { id: 3, name: "Xona 201", type: "Qabul", branch: "branch2" },
            { id: 4, name: "Xona 202", type: "Qabul", branch: "branch2" },
        ],
        branch3: [
            { id: 5, name: "Xona 301", type: "Qabul", branch: "branch3" },
            { id: 6, name: "Xona 302", type: "Qabul", branch: "branch3" },
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
                roomId: 1,
                room: "Xona 101",
                date: "2023-05-20",
                time: "09:00",
                status: "pending",
                diagnosis: "Yurak tekshiruvi",
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
                roomId: 2,
                room: "Xona 102",
                date: "2023-05-20",
                time: "10:30",
                status: "confirmed",
                diagnosis: "Bosh og'rig'i",
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
                roomId: 3,
                room: "Xona 201",
                date: "2023-05-21",
                time: "11:45",
                status: "completed",
                diagnosis: "Yurak ritmi buzilishi",
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
                roomId: 4,
                room: "Xona 202",
                date: "2023-05-21",
                time: "13:15",
                status: "cancelled",
                diagnosis: "Allergiya",
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
                roomId: 5,
                room: "Xona 301",
                date: "2023-05-22",
                time: "09:30",
                status: "pending",
                diagnosis: "Qon bosimi",
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
                roomId: 6,
                room: "Xona 302",
                date: "2023-05-22",
                time: "11:00",
                status: "confirmed",
                diagnosis: "Gripp",
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
                roomId: 1,
                room: "Xona 101",
                date: "2023-05-20",
                time: "09:00",
                status: "pending",
                diagnosis: "Yurak tekshiruvi",
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
                roomId: 2,
                room: "Xona 102",
                date: "2023-05-20",
                time: "10:30",
                status: "confirmed",
                diagnosis: "Bosh og'rig'i",
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
                roomId: 3,
                room: "Xona 201",
                date: "2023-05-21",
                time: "11:45",
                status: "completed",
                diagnosis: "Yurak ritmi buzilishi",
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
                roomId: 4,
                room: "Xona 202",
                date: "2023-05-21",
                time: "13:15",
                status: "cancelled",
                diagnosis: "Allergiya",
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
                roomId: 5,
                room: "Xona 301",
                date: "2023-05-22",
                time: "09:30",
                status: "pending",
                diagnosis: "Qon bosimi",
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
                roomId: 6,
                room: "Xona 302",
                date: "2023-05-22",
                time: "11:00",
                status: "confirmed",
                diagnosis: "Gripp",
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
        roomId: "",
        room: "",
        date: "",
        time: "",
        status: "pending",
        diagnosis: "",
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
    const [availableRooms, setAvailableRooms] = useState(
        selectedBranch === "all" ? roomsData.all : roomsData[selectedBranch],
    )
    const [selectedDate, setSelectedDate] = useState("")
    const [availableTimes, setAvailableTimes] = useState([])
    const [step, setStep] = useState(1)
    const [currentView, setCurrentView] = useState("table") // table, calendar
    const [timeError, setTimeError] = useState("")
    const [startDate, setStartDate] = useState(new Date())

    // Generate time slots from 8:00 to 18:00 with 1 hour intervals
    const generateTimeSlots = () => {
        const slots = []
        for (let hour = 8; hour <= 17; hour++) {
            const formattedHour = hour.toString().padStart(2, "0")
            slots.push(`${formattedHour}:00`)
        }
        return slots
    }

    // Update appointments when branch changes
    useEffect(() => {
        if (selectedBranch === "all") {
            setInitialAppointments(initialAppointmentsData.all)
            setAppointments(initialAppointmentsData.all)
            setAvailableDoctors(doctorsData.all)
            setAvailablePatients(patientsData.all)
            setAvailableRooms(roomsData.all)
        } else {
            setInitialAppointments(initialAppointmentsData[selectedBranch])
            setAppointments(initialAppointmentsData[selectedBranch])
            setAvailableDoctors(doctorsData[selectedBranch])
            setAvailablePatients(patientsData[selectedBranch])
            setAvailableRooms(roomsData[selectedBranch])
        }

        setNewAppointment({
            ...newAppointment,
            branch: selectedBranch === "all" ? "branch1" : selectedBranch,
            doctorId: "",
            doctor: "",
            department: "",
            patientId: "",
            patientName: "",
            roomId: "",
            room: "",
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
                    appointment.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

    // Update available times when date or room changes
    useEffect(() => {
        if (newAppointment.date && newAppointment.roomId) {
            const allTimeSlots = generateTimeSlots()
            const bookedTimes = initialAppointments
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
    }, [newAppointment.date, newAppointment.roomId, initialAppointments])

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    // Handle new appointment input change
    const handleNewAppointmentChange = (e) => {
        const { name, value } = e.target
        setTimeError("")

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
        } else if (name === "roomId" && value) {
            const selectedRoom = availableRooms.find((room) => room.id === Number.parseInt(value))
            setNewAppointment({
                ...newAppointment,
                roomId: Number.parseInt(value),
                room: selectedRoom.name,
            })
        } else if (name === "branch" && value) {
            const branchDoctors = doctorsData[value] || []
            const branchPatients = patientsData[value] || []
            const branchRooms = roomsData[value] || []

            setNewAppointment({
                ...newAppointment,
                branch: value,
                doctorId: "",
                doctor: "",
                department: "",
                patientId: "",
                patientName: "",
                roomId: "",
                room: "",
            })

            setAvailableDoctors(branchDoctors)
            setAvailablePatients(branchPatients)
            setAvailableRooms(branchRooms)
        } else if (name === "time") {
            // Check if time is already booked
            if (newAppointment.date && newAppointment.roomId) {
                const isTimeBooked = initialAppointments.some(
                    (appointment) =>
                        appointment.date === newAppointment.date &&
                        appointment.roomId === newAppointment.roomId &&
                        appointment.time === value,
                )

                if (isTimeBooked) {
                    setTimeError(t("time_already_booked"))
                } else {
                    setNewAppointment({
                        ...newAppointment,
                        time: value,
                    })
                }
            } else {
                setNewAppointment({
                    ...newAppointment,
                    time: value,
                })
            }
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

        // Check if time is already booked
        if (newAppointment.date && newAppointment.roomId) {
            const isTimeBooked = initialAppointments.some(
                (appointment) =>
                    appointment.date === newAppointment.date &&
                    appointment.roomId === newAppointment.roomId &&
                    appointment.time === time,
            )

            if (isTimeBooked) {
                setTimeError(t("time_already_booked"))
            } else {
                setNewAppointment({
                    ...newAppointment,
                    time,
                })
            }
        } else {
            setNewAppointment({
                ...newAppointment,
                time,
            })
        }
    }

    // Handle edit appointment input change
    const handleEditAppointmentChange = (e) => {
        const { name, value } = e.target
        setTimeError("")

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
        } else if (name === "roomId" && value) {
            const selectedRoom = availableRooms.find((room) => room.id === Number.parseInt(value))
            setCurrentAppointment({
                ...currentAppointment,
                roomId: Number.parseInt(value),
                room: selectedRoom.name,
            })
        } else if (name === "time") {
            // Check if time is already booked
            if (currentAppointment.date && currentAppointment.roomId) {
                const isTimeBooked = initialAppointments.some(
                    (appointment) =>
                        appointment.date === currentAppointment.date &&
                        appointment.roomId === currentAppointment.roomId &&
                        appointment.time === value &&
                        appointment.id !== currentAppointment.id, // Exclude current appointment
                )

                if (isTimeBooked) {
                    setTimeError(t("time_already_booked"))
                } else {
                    setCurrentAppointment({
                        ...currentAppointment,
                        time: value,
                    })
                }
            } else {
                setCurrentAppointment({
                    ...currentAppointment,
                    time: value,
                })
            }
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
        setStep(1)
        setTimeError("")
        setNewAppointment({
            patientId: "",
            patientName: "",
            doctorId: "",
            doctor: "",
            department: "",
            roomId: "",
            room: "",
            date: "",
            time: "",
            status: "pending",
            diagnosis: "",
            notes: "",
            branch: selectedBranch === "all" ? "branch1" : selectedBranch,
        })
    }

    // Close add sidebar
    const closeAddSidebar = () => {
        setShowSidebar(false)
        setStep(1)
        setTimeError("")
        setNewAppointment({
            patientId: "",
            patientName: "",
            doctorId: "",
            doctor: "",
            department: "",
            roomId: "",
            room: "",
            date: "",
            time: "",
            status: "pending",
            diagnosis: "",
            notes: "",
            branch: selectedBranch === "all" ? "branch1" : selectedBranch,
        })
    }

    // Open edit sidebar
    const openEditSidebar = (appointment) => {
        setCurrentAppointment(appointment)
        setTimeError("")
        setShowEditSidebar(true)
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
    const addAppointment = (e) => {
        e.preventDefault()

        // Check if time is already booked
        if (newAppointment.date && newAppointment.roomId && newAppointment.time) {
            const isTimeBooked = initialAppointments.some(
                (appointment) =>
                    appointment.date === newAppointment.date &&
                    appointment.roomId === newAppointment.roomId &&
                    appointment.time === newAppointment.time,
            )

            if (isTimeBooked) {
                setTimeError(t("time_already_booked"))
                return
            }
        }

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

        // Check if time is already booked
        if (currentAppointment.date && currentAppointment.roomId && currentAppointment.time) {
            const isTimeBooked = initialAppointments.some(
                (appointment) =>
                    appointment.date === currentAppointment.date &&
                    appointment.roomId === currentAppointment.roomId &&
                    appointment.time === currentAppointment.time &&
                    appointment.id !== currentAppointment.id, // Exclude current appointment
            )

            if (isTimeBooked) {
                setTimeError(t("time_already_booked"))
                return
            }
        }

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

    // Get week dates
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
        const date = new Date(dateString)
        return date.toLocaleDateString("uz-UZ", { day: "numeric", month: "long", year: "numeric" })
    }

    // Set view to today
    const goToToday = () => {
        setStartDate(new Date())
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
                                        <option value="branch1">{t("branch1")}</option>
                                        <option value="branch2">{t("branch2")}</option>
                                        <option value="branch3">{t("branch3")}</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        <div className="appointments-form-group">
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
                                    {availablePatients.map((patient) => (
                                        <option key={patient.id} value={patient.id}>
                                            {patient.name}
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
                                disabled={!newAppointment.branch || !newAppointment.patientId}
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
                                <select name="doctorId" value={newAppointment.doctorId} onChange={handleNewAppointmentChange} required>
                                    <option value="">{t("select_doctor")}</option>
                                    {availableDoctors.map((doctor) => (
                                        <option key={doctor.id} value={doctor.id}>
                                            {doctor.name} - {doctor.department}
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
                                disabled={!newAppointment.doctorId}
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
                                <select name="roomId" value={newAppointment.roomId} onChange={handleNewAppointmentChange} required>
                                    <option value="">{t("select_room")}</option>
                                    {availableRooms.map((room) => (
                                        <option key={room.id} value={room.id}>
                                            {room.name} - {room.type}
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
                                disabled={!newAppointment.roomId}
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
                                name="diagnosis"
                                value={newAppointment.diagnosis}
                                onChange={handleNewAppointmentChange}
                                rows={3}
                                placeholder={t("enter_diagnosis")}
                            ></textarea>
                        </div>

                        <div className="appointments-form-group">
                            <label>{t("notes")}</label>
                            <textarea
                                name="notes"
                                value={newAppointment.notes}
                                onChange={handleNewAppointmentChange}
                                rows={3}
                                placeholder={t("enter_notes")}
                            ></textarea>
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
                                    <th>{t("department")}</th>
                                    <th>{t("room")}</th>
                                    <th>{t("date")}</th>
                                    <th>{t("time")}</th>
                                    <th>{t("status")}</th>
                                    <th>{t("diagnosis")}</th>
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
                                        <td>{appointment.room}</td>
                                        <td>{formatDateForDisplay(appointment.date)}</td>
                                        <td>{appointment.time}</td>
                                        <td>
                                            <div className={`appointments-status-badge ${appointment.status}`}>
                                                {appointment.status === "pending" && t("pending")}
                                                {appointment.status === "confirmed" && t("confirmed")}
                                                {appointment.status === "completed" && t("completed")}
                                                {appointment.status === "cancelled" && t("cancelled")}
                                            </div>
                                        </td>
                                        <td>{appointment.diagnosis}</td>
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
                                        <td colSpan={selectedBranch === "all" ? "10" : "9"} className="appointments-no-data">
                                            {t("no_data_found")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
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
                            const dayAppointments = appointments.filter((appointment) => appointment.date === dateString)

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
                                                onClick={() => openEditSidebar(appointment)}
                                            >
                                                <div className="appointments-calendar-time">{appointment.time}</div>
                                                <div className="appointments-calendar-patient">{appointment.patientName}</div>
                                                <div className="appointments-calendar-doctor">{appointment.doctor}</div>
                                                <div className="appointments-calendar-room">{appointment.room}</div>
                                                <div className="appointments-calendar-status">
                                                    <span className={`appointments-status-badge ${appointment.status}`}>
                                                        {appointment.status === "pending" && t("pending")}
                                                        {appointment.status === "confirmed" && t("confirmed")}
                                                        {appointment.status === "completed" && t("completed")}
                                                        {appointment.status === "cancelled" && t("cancelled")}
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
                                        <div className="input-icon-wrapper">
                                            <FaBuilding className="input-icon" />
                                            <select
                                                name="branch"
                                                value={currentAppointment.branch}
                                                onChange={(e) => {
                                                    const newBranch = e.target.value
                                                    setCurrentAppointment((prev) => ({
                                                        ...prev,
                                                        _prevBranch: prev.branch,
                                                        branch: newBranch,
                                                    }))
                                                }}
                                            >
                                                <option value="branch1">{t("branch1")}</option>
                                                <option value="branch2">{t("branch2")}</option>
                                                <option value="branch3">{t("branch3")}</option>
                                            </select>
                                        </div>
                                    </div>
                                )}

                                <div className="appointments-form-group">
                                    <label>{t("patient")}</label>
                                    <div className="input-icon-wrapper">
                                        <FaUser className="input-icon" />
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
                                </div>

                                <div className="appointments-form-group">
                                    <label>{t("doctor")}</label>
                                    <div className="input-icon-wrapper">
                                        <FaUserMd className="input-icon" />
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
                                </div>

                                <div className="appointments-form-group">
                                    <label>{t("room")}</label>
                                    <div className="input-icon-wrapper">
                                        <FaDoorOpen className="input-icon" />
                                        <select
                                            name="roomId"
                                            value={currentAppointment.roomId}
                                            onChange={handleEditAppointmentChange}
                                            required
                                        >
                                            <option value="">{t("select_room")}</option>
                                            {availableRooms.map((room) => (
                                                <option key={room.id} value={room.id}>
                                                    {room.name} - {room.type}
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
                                                value={currentAppointment.date}
                                                onChange={handleEditAppointmentChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="appointments-form-group">
                                        <label>{t("time")}</label>
                                        <div className="input-icon-wrapper">
                                            <FaClock className="input-icon" />
                                            <input
                                                type="time"
                                                name="time"
                                                value={currentAppointment.time}
                                                onChange={handleEditAppointmentChange}
                                                required
                                            />
                                        </div>
                                        {timeError && (
                                            <div className="time-error">
                                                <FaExclamationCircle /> {timeError}
                                            </div>
                                        )}
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
                                    <label>{t("diagnosis")}</label>
                                    <textarea
                                        name="diagnosis"
                                        value={currentAppointment.diagnosis}
                                        onChange={handleEditAppointmentChange}
                                        rows={3}
                                    ></textarea>
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
}

