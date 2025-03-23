import { useState, useEffect } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useLanguage } from "../../contexts/LanguageContext"
import Sidebar from "../../components/siderbar/Siderbar"
import Header from "../../components/header/Header"
import DirectorDashboard from "../../components/derector/overview/Overview"
import AdminDashboard from "../../components/admin/ADashboard"
import DoctorDashboard from "../../components/doctor/DocDoshboard"
import DirectorStaff from "../../components/derector/staff/Staff"
import DirectorCabinets from "../../components/derector/cabinets/Cabinets"
import DirectorPatients from "../../components/derector/clients/Clients"
import DirectorAppointments from "../../components/derector/appointments/Appointments"
import DirectorReports from "../../components/derector/reports/Reports"
import DirectorSettings from "../../components/derector/settings/Settings"
// import AdminPatients from "./admin/AdminPatients"
// import AdminSchedule from "./admin/AdminSchedule"
// import AdminCabinets from "./admin/AdminCabinets"
// import DoctorSchedule from "./doctor/DoctorSchedule"
// import DoctorPatients from "./doctor/DoctorPatients"
// import DoctorAvailability from "./doctor/DoctorAvailability"
import Profile from "../../components/profile/Profile"
import Notifications from "../../components/notifications/Notifications"
import { FaBell, FaBuilding  , FaCheckDouble  } from "react-icons/fa"

export default function Dashboard() {
    const { user, hasRole, selectedBranch, changeBranch } = useAuth()
    const location = useLocation()
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            message: "Yangi mijoz qo'shildi",
            time: "10 daqiqa oldin",
            read: false,
        },
        {
            id: 2,
            message: "Jadval yangilandi",
            time: "1 soat oldin",
            read: false,
        },
        {
            id: 3,
            message: "Tizim yangilandi",
            time: "2 soat oldin",
            read: true,
        },
    ])
    const [showNotifications, setShowNotifications] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    // Branches data
    const branches = [
        { id: "all", name: "Barcha filiallar" },
        { id: "branch1", name: "1-Filial" },
        { id: "branch2", name: "2-Filial" },
        { id: "branch3", name: "3-Filial" },
    ]

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [location.pathname])

    // Redirect to role-specific dashboard
    const getDashboardRoute = () => {
        if (!user) return "/dashboard"
        if (user.role === "director") return "/dashboard/director"
        if (user.role === "admin") return "/dashboard/admin"
        if (user.role === "doctor") return "/dashboard/doctor"
        return "/dashboard"
    }

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications)
    }

    const markAllAsRead = () => {
        setNotifications(
            notifications.map((notification) => ({
                ...notification,
                read: true,
            })),
        )
    }

    const handleBranchChange = (e) => {
        changeBranch(e.target.value)
    }

    const unreadCount = notifications.filter((notification) => !notification.read).length

    // Close notifications dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showNotifications) {
                if (!event.target.closest(".notification-container") && !event.target.closest(".notification-button")) {
                    setShowNotifications(false)
                }
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [showNotifications])

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-content">
                <Header />

                <div className="dashboard-controls">
                    {/* Branch selector - only visible for Director and Admin */}
                    {(hasRole("director") || hasRole("admin")) && (
                        <div className="branch-selector">
                            <FaBuilding className="branch-icon" />
                            <select value={selectedBranch} onChange={handleBranchChange}>
                                {branches.map((branch) => (
                                    <option key={branch.id} value={branch.id}>
                                        {branch.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="notification-container">
                        <button className="notification-button" onClick={toggleNotifications}>
                            <FaBell />
                            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                        </button>

                        {showNotifications && (
                            <div className="notification-dropdown">
                                <div className="notification-header">
                                    <h3>Bildirishnomalar</h3>
                                    {unreadCount > 0 && (
                                        <button className="mark-read-button" onClick={markAllAsRead}>
                                            o`qidim <FaCheckDouble />
                                        </button>
                                    )}
                                </div>

                                <div className="notification-list">
                                    {notifications.length > 0 ? (
                                        notifications.map((notification) => (
                                            <div key={notification.id} className={`notification-item ${!notification.read ? "unread" : ""}`}>
                                                <p className="notification-message">{notification.message}</p>
                                                <span className="notification-time">{notification.time}</span>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="no-notifications">Bildirishnomalar yo'q</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
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

                        {/* Admin Routes */}
                        <Route path="/admin" element={<AdminDashboard />} />
                        {/* <Route path="/admin/patients" element={<AdminPatients />} />
                        <Route path="/admin/schedule" element={<AdminSchedule />} />
                        <Route path="/admin/cabinets" element={<AdminCabinets />} /> */}

                        {/* Doctor Routes */}
                        <Route path="/doctor" element={<DoctorDashboard />} />
                        {/* <Route path="/doctor/schedule" element={<DoctorSchedule />} />
                        <Route path="/doctor/patients" element={<DoctorPatients />} />
                        <Route path="/doctor/availability" element={<DoctorAvailability />} /> */}

                        {/* Common Routes */}
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/notifications" element={<Notifications />} />

                        {/* Fallback */}
                        <Route path="*" element={<Navigate to={getDashboardRoute()} />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}