import { useState, useEffect } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useLanguage } from "../../contexts/LanguageContext"
import Sidebar from "../../components/siderbar/Siderbar"
import Header from "../../components/header/Header"
import DirectorDashboard from "../../components/derector/overview/Overview"
import AdminDashboard from "../../components/admin/ADashboard/ADashboard"
import DoctorDashboard from "../../components/doctor/DocDoshboard/DocDoshboard"
import DirectorStaff from "../../components/derector/staff/Staff"
import DirectorCabinets from "../../components/derector/cabinets/Cabinets"
import DirectorPatients from "../../components/derector/clients/Clients"
import DirectorAppointments from "../../components/derector/appointments/Appointments"
import DirectorReports from "../../components/derector/reports/Reports"
import DirectorSettings from "../../components/derector/settings/Settings"
import DirectorRooms from "../../components/derector/Rooms/Rooms"
import AdminPatients from "../../components/admin/APatients/APatients"
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

export default function Dashboard() {
    const { user, hasRole, selectedBranch, changeBranch } = useAuth()
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

    // Branches data
    const branches = [
        { id: "all", name: t("allBranches") },
        { id: "branch1", name: t("branch1") },
        { id: "branch2", name: t("branch2") },
        { id: "branch3", name: t("branch3") },
    ]

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                // In a real app, these would be API calls
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
                    if (selectedBranch === "branch1") {
                        setStats({
                            patientsToday: 24,
                            appointmentsToday: 18,
                            occupiedRooms: 5,
                            totalIncome: 7500000,
                        })
                    } else if (selectedBranch === "branch2") {
                        setStats({
                            patientsToday: 18,
                            appointmentsToday: 14,
                            occupiedRooms: 3,
                            totalIncome: 5200000,
                        })
                    } else if (selectedBranch === "branch3") {
                        setStats({
                            patientsToday: 12,
                            appointmentsToday: 10,
                            occupiedRooms: 2,
                            totalIncome: 3800000,
                        })
                    } else {
                        // All branches
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

        fetchData()
    }, [selectedBranch, t])

    // Redirect to role-specific dashboard
    const getDashboardRoute = () => {
        if (!user) return "/dashboard"
        if (user.role === "director") return "/dashboard/director"
        if (user.role === "admin") return "/dashboard/admin"
        if (user.role === "doctor") return "/dashboard/doctor"
        if (user.role === "nurse") return "/dashboard/nurse"
        return "/dashboard"
    }

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications)
    }

    const toggleBranchSelector = () => {
        setShowBranchSelector(!showBranchSelector)
    }

    const markAllAsRead = () => {
        setNotifications(
            notifications.map((notification) => ({
                ...notification,
                read: true,
            })),
        )
    }

    const handleBranchChange = (branchId) => {
        changeBranch(branchId)
        setShowBranchSelector(false)
    }

    const unreadCount = notifications.filter((notification) => !notification.read).length

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showNotifications && !event.target.closest(".notification-container")) {
                setShowNotifications(false)
            }
            if (showBranchSelector && !event.target.closest(".branch-selector-container")) {
                setShowBranchSelector(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [showNotifications, showBranchSelector])

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
            <Sidebar />

            <div className="dashboard-content">
                <Header
                    user={user}
                    notifications={notifications}
                    unreadCount={unreadCount}
                    toggleNotifications={toggleNotifications}
                    showNotifications={showNotifications}
                    markAllAsRead={markAllAsRead}
                    weatherData={weatherData}
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
                                <span>{branches.find((b) => b.id === selectedBranch)?.name || t("allBranches")}</span>
                            </button>

                            {showBranchSelector && (
                                <div className="branch-dropdown">
                                    {branches.map((branch) => (
                                        <button
                                            key={branch.id}
                                            className={`branch-option ${selectedBranch === branch.id ? "active" : ""}`}
                                            onClick={() => handleBranchChange(branch.id)}
                                        >
                                            {branch.name}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Navigate to={getDashboardRoute()} />} />

                        {/* Director Routes */}
                        <Route path="/director" element={<DirectorDashboard />} />
                        <Route path="/director/staff" element={<DirectorStaff />} />
                        <Route path="/director/cabinets" element={<DirectorCabinets />} />
                        <Route path="/director/patients" element={<DirectorPatients />} />
                        <Route path="/director/appointments" element={<DirectorAppointments />} />
                        <Route path="/director/reports" element={<DirectorReports />} />
                        <Route path="/director/settings" element={<DirectorSettings />} />
                        <Route path="/director/rooms" element={<DirectorRooms />} />

                        {/* Admin Routes */}
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/patients" element={<AdminPatients />} />
                        {/* <Route path="/admin/schedule" element={<AdminSchedule />} />
                        <Route path="/admin/cabinets" element={<AdminCabinets />} /> */}
                        <Route path="/admin/rooms" element={<ARooms />} />

                        {/* Doctor Routes */}
                        <Route path="/doctor" element={<DoctorDashboard />} />
                        {/* <Route path="/doctor/schedule" element={<DoctorSchedule />} />
                        <Route path="/doctor/patients" element={<DoctorPatients />} />
                        <Route path="/doctor/availability" element={<DoctorAvailability />} /> */}

                        {/* Nurse Routes */}
                        <Route path="/nurse" element={<NurseDashboard />} />
                        <Route path="/nurse/rooms" element={<NurseRooms />} />
                        {/* <Route path="/nurse/patients" element={<NursePatients />} />
                        <Route path="/nurse/vitals" element={<NurseVitals />} />
                        <Route path="/nurse/medications" element={<NurseMedications />} />
                        <Route path="/nurse/schedule" element={<NurseSchedule />} /> */}

                        {/* Common Routes */}
                        <Route path="/notifications" element={<Notifications />} />
                        <Route path="/profile" element={<Profile />} />

                        {/* Fallback */}
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