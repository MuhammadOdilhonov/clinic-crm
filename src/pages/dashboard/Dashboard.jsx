"use client"

import { useState, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useLanguage } from "../../contexts/LanguageContext"
import Sidebar from "../../components/siderbar/Siderbar"
import Header from "../../components/header/Header"
import DirectorDashboard from "../../components/derector/overview/Overview"
import AdminDashboard from "../../components/admin/ADashboard/ADashboard"
import DoctorDashboard from "../../components/doctor/DocDoshboard/DocDoshboard"
import DirectorStaff from "../../components/derector/staff/Staff"
import StaffDoctors from "../../components/derector/staffDoctors/StaffDoctors"
import DirectorCabinets from "../../components/derector/cabinets/Cabinets"
import DirectorPatients from "../../components/derector/patients/Patients"
import DirectorAppointments from "../../components/derector/appointments/Appointments"
import DirectorReports from "../../components/derector/reports/Reports"
import DirectorSettings from "../../components/derector/settings/Settings"
import DirectorTasks from "../../components/derector/tasks/Tasks"
import DirectorRooms from "../../components/derector/Rooms/Rooms"
import APatients from "../../components/admin/APatients/APatients"
// import AdminSchedule from "./admin/AdminSchedule"
// import AdminCabinets from "./admin/AdminCabinets"
// import DoctorSchedule from "./doctor/DoctorSchedule"
// import DoctorPatients from "./doctor/DoctorPatients"
// import DoctorAvailability from "./doctor/DoctorAvailability"
import Profile from "../../components/profile/Profile"
import Notifications from "../../components/notifications/Notifications"
import { FaBuilding, FaCalendarDay, FaChartLine, FaExclamationTriangle } from "react-icons/fa"
import NurseDashboard from "../../components/nurse/nurseDashboard/NurseDashboard"
import NurseRooms from "../../components/nurse/nurseRooms/NurseRooms"
import ARooms from "../../components/admin/ARooms/ARooms"
import StaffNurses from "../../components/derector/staffNurses/StaffNurses"
import ATasks from "../../components/admin/ATasks/ATasks"
import DocTasks from "../../components/doctor/DocTasks/DocTasks"
import NurseTasks from "../../components/nurse/nurseTasks/NurseTasks"
import PatientDetails from "../../components/patientDetails/PatientDetails"
import ASchedule from "../../components/admin/ASchedule/ASchedule"
import ACabinets from "../../components/admin/ACabinet/ACabinets"
import DocSchedule from "../../components/doctor/DocSchedule/DocSchedule"
import NursePatientCare from "../../components/nurse/nursePatientCare/NursePatientCare"
import NurseVitalSigns from "../../components/nurse/nurseVitalSigns/NurseVitalSigns"
import NurseMedications from "../../components/nurse/nurseMedications/NurseMedications"
import NurseSchedule from "../../components/nurse/nurseSchedule/NurseSchedule"
import Lid from "../../components/derector/Lid/Lid"
// Import ApiBranches
import ApiBranches from "../../api/apiBranches"
import Help from "../help/Help"
import ProtectedRoute from "../../components/protectedRoute/ProtectedRoute"

export default function Dashboard() {
    const { user, hasRole, selectedBranch, changeBranch, branchesData } = useAuth()
    const { t } = useLanguage()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [notifications, setNotifications] = useState([])
    const [showNotifications, setShowNotifications] = useState(false)
    const [showBranchSelector, setShowBranchSelector] = useState(false)
    const [stats, setStats] = useState({
        patientsToday: 0,
        appointmentsToday: 0,
        occupiedRooms: 0,
        totalIncome: 0,
    })
    const [weatherData, setWeatherData] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)

    // State for branches from API
    const [branches, setBranches] = useState([{ id: "all", name: t("allBranches") }])
    const [branchesLoading, setBranchesLoading] = useState(true)
    const [branchesError, setBranchesError] = useState(null)

    // Fetch branches from API
    useEffect(() => {
        const getBranches = async () => {
            try {
                setBranchesLoading(true)
                setBranchesError(null)

                // Call the fetchBranches method from ApiBranches class
                const branchesData = await ApiBranches.fetchBranches()

                // Add the "all" option to the beginning of the array
                setBranches([
                    { id: "all", name: t("allBranches") },
                    ...branchesData.map((branch) => ({
                        id: branch.id.toString(),
                        name: branch.name,
                        address: branch.address,
                        phone_number: branch.phone_number,
                        email: branch.email,
                        clinic: branch.clinic,
                    })),
                ])

                setBranchesLoading(false)
            } catch (err) {
                console.error("Failed to fetch branches:", err)
                setBranchesError(err.message || "Failed to load branches")
                setBranchesLoading(false)
            }
        }

        getBranches()
    }, [t])

    // Fetch initial data
    const fetchData = async () => {
        try {
            setLoading(true)

            // In a real app, these would be API calls with the selected branch ID
            // Example API call with branch ID:
            // const statsResponse = await fetch(`${BaseUrl}/stats?branchId=${selectedBranch === "all" ? "" : selectedBranch}`);

            // Simulating API calls with setTimeout
            setTimeout(() => {
                // Mock notifications data
                setNotifications([
                    {
                        id: 1,
                        type: "patient",
                        message: t("new_patient_added"),
                        time: "10 " + t("minutesAgo"),
                        read: false,
                        priority: "medium",
                    },
                    {
                        id: 2,
                        type: "appointment",
                        message: t("appointment_reminder"),
                        time: "30 " + t("minutesAgo"),
                        read: false,
                        priority: "high",
                    },
                    {
                        id: 3,
                        type: "system",
                        message: t("system_updated"),
                        time: "2 " + t("hoursAgo"),
                        read: true,
                        priority: "low",
                    },
                    {
                        id: 4,
                        type: "room",
                        message: t("room_maintenance_completed"),
                        time: "3 " + t("hoursAgo"),
                        read: true,
                        priority: "medium",
                    },
                ])

                // Mock stats data based on branch
                // In a real implementation, this would come from the API
                if (selectedBranch === "3") {
                    // 1-Filial
                    setStats({
                        patientsToday: 24,
                        appointmentsToday: 18,
                        occupiedRooms: 5,
                        totalIncome: 7500000,
                    })
                } else if (selectedBranch === "6") {
                    // 2-Filial
                    setStats({
                        patientsToday: 18,
                        appointmentsToday: 14,
                        occupiedRooms: 3,
                        totalIncome: 5200000,
                    })
                } else {
                    // All branches or any other branch
                    setStats({
                        patientsToday: 54,
                        appointmentsToday: 42,
                        occupiedRooms: 10,
                        totalIncome: 16500000,
                    })
                }

                // Mock weather data
                setWeatherData({
                    temperature: 28,
                    condition: "sunny",
                    humidity: 45,
                    location: "Tashkent",
                })

                setLoading(false)
            }, 800)
        } catch (err) {
            setError(err.message || "An error occurred")
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [selectedBranch, t])

    const getDashboardRoute = () => {
        if (!user) return "/dashboard"
        if (user.role === "director") return "/dashboard/director"
        if (user.role === "admin") return "/dashboard/admin"
        if (user.role === "doctor") return "/dashboard/doctor"
        if (user.role === "nurse") return "/dashboard/nurse"
        return "/dashboard"
    }

    // Toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    const toggleBranchSelector = () => {
        setShowBranchSelector(!showBranchSelector)
    }

    // Update the handleBranchChange function to work with API data
    const handleBranchChange = (branchId) => {
        changeBranch(branchId)
        setShowBranchSelector(false)
    }

    // Get branch name by ID
    const getBranchName = (branchId) => {
        if (branchId === "all") return t("allBranches")
        const branch = branches.find((b) => b.id === branchId)
        return branch ? branch.name : t("unknownBranch")
    }

    // Loading state
    if (loading && !user) {
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

    // No user state (should redirect to login)
    if (!user) {
        return <Navigate to="/login" />
    }

    return (
        <div className="dashboard-container">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

            <div className="dashboard-content">
                <Header
                    user={user}
                    notifications={notifications}
                    unreadCount={notifications.filter((notification) => !notification.read).length}
                    toggleNotifications={() => setShowNotifications(!showNotifications)}
                    showNotifications={showNotifications}
                    markAllAsRead={() => {
                        setNotifications(
                            notifications.map((notification) => ({
                                ...notification,
                                read: true,
                            })),
                        )
                    }}
                    weatherData={weatherData}
                    toggleSidebar={toggleSidebar}
                />
                <div className="dashboard-controls">
                    {/* Quick Stats */}
                    <div className="quick-stats">
                        <div className="stat-item">
                            <div className="stat-icon patients">
                                <FaChartLine />
                            </div>
                            <div className="stat-info">
                                <span className="stat-value">{stats.patientsToday}</span>
                                <span className="stat-label">{t("patients_today")}</span>
                            </div>
                        </div>

                        <div className="stat-item">
                            <div className="stat-icon appointments">
                                <FaCalendarDay />
                            </div>
                            <div className="stat-info">
                                <span className="stat-value">{stats.appointmentsToday}</span>
                                <span className="stat-label">{t("appointments_today")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Branch selector - only visible for Director and Admin */}
                    {(hasRole("director") || hasRole("admin")) && (
                        <div className="branch-selector-container">
                            <button className="branch-selector-button" onClick={toggleBranchSelector}>
                                <FaBuilding className="branch-icon" />
                                <span>{branchesLoading ? t("loading") : getBranchName(selectedBranch)}</span>
                            </button>

                            {showBranchSelector && (
                                <div className="branch-dropdown">
                                    {branchesLoading ? (
                                        <div className="branch-loading">{t("loading")}...</div>
                                    ) : branchesError ? (
                                        <div className="branch-error">{branchesError}</div>
                                    ) : (
                                        branches.map((branch) => (
                                            <button
                                                key={branch.id}
                                                className={`branch-option ${selectedBranch === branch.id ? "active" : ""}`}
                                                onClick={() => handleBranchChange(branch.id)}
                                                title={branch.id !== "all" ? branch.address : ""}
                                            >
                                                <span className="branch-name">{branch.name}</span>
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Navigate to={getDashboardRoute()} />} />

                        {/* Director Routes */}
                        <Route
                            path="/director"
                            element={
                                <ProtectedRoute allowedRoles={["director"]}>
                                    <DirectorDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/director/lid"
                            element={
                                <ProtectedRoute allowedRoles={["director"]}>
                                    <Lid />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/director/staff"
                            element={
                                <ProtectedRoute allowedRoles={["director"]}>
                                    <DirectorStaff />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/director/staff/doctors"
                            element={
                                <ProtectedRoute allowedRoles={["director"]}>
                                    <StaffDoctors />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/director/staff/nurses"
                            element={
                                <ProtectedRoute allowedRoles={["director"]}>
                                    <StaffNurses />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/director/cabinets"
                            element={
                                <ProtectedRoute allowedRoles={["director"]}>
                                    <DirectorCabinets />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/director/patients"
                            element={
                                <ProtectedRoute allowedRoles={["director"]}>
                                    <DirectorPatients />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/director/patients/:id"
                            element={
                                <ProtectedRoute allowedRoles={["director"]}>
                                    <PatientDetails />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/director/appointments"
                            element={
                                <ProtectedRoute allowedRoles={["director"]}>
                                    <DirectorAppointments />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/director/reports"
                            element={
                                <ProtectedRoute allowedRoles={["director"]}>
                                    <DirectorReports />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/director/settings"
                            element={
                                <ProtectedRoute allowedRoles={["director"]}>
                                    <DirectorSettings />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/director/rooms"
                            element={
                                <ProtectedRoute allowedRoles={["director"]}>
                                    <DirectorRooms />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/director/tasks"
                            element={
                                <ProtectedRoute allowedRoles={["director"]}>
                                    <DirectorTasks />
                                </ProtectedRoute>
                            }
                        />

                        {/* Admin Routes */}
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute allowedRoles={["admin"]}>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/patients"
                            element={
                                <ProtectedRoute allowedRoles={["admin"]}>
                                    <APatients />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/patients/:id"
                            element={
                                <ProtectedRoute allowedRoles={["admin"]}>
                                    <PatientDetails />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/schedule"
                            element={
                                <ProtectedRoute allowedRoles={["admin"]}>
                                    <ASchedule />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/cabinets"
                            element={
                                <ProtectedRoute allowedRoles={["admin"]}>
                                    <ACabinets />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/rooms"
                            element={
                                <ProtectedRoute allowedRoles={["admin"]}>
                                    <ARooms />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin/tasks"
                            element={
                                <ProtectedRoute allowedRoles={["admin"]}>
                                    <ATasks />
                                </ProtectedRoute>
                            }
                        />

                        {/* Doctor Routes */}
                        <Route
                            path="/doctor"
                            element={
                                <ProtectedRoute allowedRoles={["doctor"]}>
                                    <DoctorDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/doctor/tasks"
                            element={
                                <ProtectedRoute allowedRoles={["doctor"]}>
                                    <DocTasks />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/doctor/schedule"
                            element={
                                <ProtectedRoute allowedRoles={["doctor"]}>
                                    <DocSchedule />
                                </ProtectedRoute>
                            }
                        />

                        {/* Nurse Routes */}
                        <Route
                            path="/nurse"
                            element={
                                <ProtectedRoute allowedRoles={["nurse"]}>
                                    <NurseDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/nurse/tasks"
                            element={
                                <ProtectedRoute allowedRoles={["nurse"]}>
                                    <NurseTasks />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/nurse/rooms"
                            element={
                                <ProtectedRoute allowedRoles={["nurse"]}>
                                    <NurseRooms />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/nurse/patients"
                            element={
                                <ProtectedRoute allowedRoles={["nurse"]}>
                                    <NursePatientCare />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/nurse/vitals"
                            element={
                                <ProtectedRoute allowedRoles={["nurse"]}>
                                    <NurseVitalSigns />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/nurse/medications"
                            element={
                                <ProtectedRoute allowedRoles={["nurse"]}>
                                    <NurseMedications />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/nurse/schedule"
                            element={
                                <ProtectedRoute allowedRoles={["nurse"]}>
                                    <NurseSchedule />
                                </ProtectedRoute>
                            }
                        />

                        {/* Common Routes - barcha rollar uchun ruxsat etilgan */}
                        <Route
                            path="/notifications"
                            element={
                                <ProtectedRoute>
                                    <Notifications />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/help"
                            element={
                                <ProtectedRoute>
                                    <Help />
                                </ProtectedRoute>
                            }
                        />

                        {/* Redirect to role-specific dashboard */}
                        <Route path="*" element={<Navigate to={getDashboardRoute()} />} />
                    </Routes>
                </main>

                <footer className="dashboard-footer">
                    <div className="footer-content">
                        <p>
                            &copy; {new Date().getFullYear()} Klinika CRM. {t("all_rights_reserved")}
                        </p>
                        <div className="footer-links">
                            <a href="#">{t("privacy_policy")}</a>
                            <a href="#">{t("terms_of_service")}</a>
                            <a href="#">{t("help_center")}</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
