import React , { useState, useEffect } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useLanguage } from "../../contexts/LanguageContext"
import {
    FaChartLine,
    FaUsers,
    FaDoorOpen,
    FaClipboardList,
    FaCalendarAlt,
    FaCog,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaUserMd,
    FaUserCog,
    FaChartBar,
    FaBell,
} from "react-icons/fa"

export default function Sidebar() {
    const { user, logout, hasRole } = useAuth()
    const { t } = useLanguage()
    const navigate = useNavigate()
    const location = useLocation()
    const [isMobileOpen, setIsMobileOpen] = useState(false)

    // Close sidebar on route change in mobile view
    useEffect(() => {
        if (isMobileOpen) {
            setIsMobileOpen(false)
        }
    }, [location.pathname])

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileOpen && !event.target.closest(".sidebar") && !event.target.closest(".mobile-toggle")) {
                setIsMobileOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isMobileOpen])

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    const toggleMobileSidebar = () => {
        setIsMobileOpen(!isMobileOpen)
    }

    return (
        <>
            <button className="mobile-toggle" onClick={toggleMobileSidebar} aria-label="Toggle menu">
                {isMobileOpen ? <FaTimes /> : <FaBars />}
            </button>

            <aside className={`sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
                <div className="sidebar-header">
                    <h1>Klinika CRM</h1>
                </div>

                <div className="user-info">
                    <div className="user-avatar">{user?.name?.charAt(0) || "U"}</div>
                    <div className="user-details">
                        <h3>{user?.name || "User"}</h3>
                        <div className={`user-role ${user?.role || "user"}`}>{t(user?.role || "user")}</div>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        {/* Director Menu Items */}
                        {hasRole("director") && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/director" className={({ isActive }) => (isActive ? "active" : "")} end>
                                        <FaChartLine /> <span>{t("dashboard")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/director/staff" className={({ isActive }) => (isActive ? "active" : "")}>
                                        <FaUsers /> <span>{t("staff")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/director/cabinets" className={({ isActive }) => (isActive ? "active" : "")}>
                                        <FaDoorOpen /> <span>{t("cabinets")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/director/patients" className={({ isActive }) => (isActive ? "active" : "")}>
                                        <FaUsers /> <span>{t("patients")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/dashboard/director/appointments"
                                        className={({ isActive }) => (isActive ? "active" : "")}
                                    >
                                        <FaCalendarAlt /> <span>{t("appointments")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/director/reports" className={({ isActive }) => (isActive ? "active" : "")}>
                                        <FaChartBar /> <span>{t("reports")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/director/settings" className={({ isActive }) => (isActive ? "active" : "")}>
                                        <FaCog /> <span>{t("settings")}</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Admin Menu Items */}
                        {hasRole("admin") && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/admin" className={({ isActive }) => (isActive ? "active" : "")} end>
                                        <FaChartLine /> <span>{t("dashboard")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/admin/patients" className={({ isActive }) => (isActive ? "active" : "")}>
                                        <FaUsers /> <span>{t("patients")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/admin/schedule" className={({ isActive }) => (isActive ? "active" : "")}>
                                        <FaCalendarAlt /> <span>{t("schedule")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/admin/cabinets" className={({ isActive }) => (isActive ? "active" : "")}>
                                        <FaDoorOpen /> <span>{t("cabinets")}</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Doctor Menu Items */}
                        {hasRole("doctor") && (
                            <>
                                <li>
                                    <NavLink to="/dashboard/doctor" className={({ isActive }) => (isActive ? "active" : "")} end>
                                        <FaChartLine /> <span>{t("dashboard")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/doctor/schedule" className={({ isActive }) => (isActive ? "active" : "")}>
                                        <FaCalendarAlt /> <span>{t("schedule")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/doctor/patients" className={({ isActive }) => (isActive ? "active" : "")}>
                                        <FaClipboardList /> <span>{t("patients")}</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/doctor/availability" className={({ isActive }) => (isActive ? "active" : "")}>
                                        <FaUserMd /> <span>{t("availability")}</span>
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* Common Menu Items */}
                        <li className="divider"></li>
                        <li>
                            <NavLink to="/dashboard/notifications" className={({ isActive }) => (isActive ? "active" : "")}>
                                <FaBell /> <span>{t("notifications")}</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/profile" className={({ isActive }) => (isActive ? "active" : "")}>
                                <FaUserCog /> <span>{t("profile")}</span>
                            </NavLink>
                        </li>
                        <li>
                            <button className="logout-button" onClick={handleLogout}>
                                <FaSignOutAlt /> <span>{t("logout")}</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {isMobileOpen && <div className="sidebar-backdrop" onClick={() => setIsMobileOpen(false)}></div>}
        </>
    )
};