"use client"

import { useState, useEffect } from "react"
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
    FaBed,
    FaUserNurse,
    FaHome,
    FaQuestionCircle,
    FaAngleDown,
    FaAngleRight,
    FaThermometerHalf,
    FaPills,
    FaMoneyBillWave,
    FaLanguage,
    FaTasks,
} from "react-icons/fa"

export default function Sidebar() {
    const { user, logout, hasRole } = useAuth()
    const { t, language, languages, changeLanguage } = useLanguage()
    const navigate = useNavigate()
    const location = useLocation()
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [expandedMenus, setExpandedMenus] = useState({})
    const [showLanguageSelector, setShowLanguageSelector] = useState(false)

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
            if (showLanguageSelector && !event.target.closest(".language-selector")) {
                setShowLanguageSelector(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isMobileOpen, showLanguageSelector])

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    const toggleMobileSidebar = () => {
        setIsMobileOpen(!isMobileOpen)
    }

    const toggleSubmenu = (menuKey) => {
        setExpandedMenus((prev) => ({
            ...prev,
            [menuKey]: !prev[menuKey],
        }))
    }

    const toggleLanguageSelector = () => {
        setShowLanguageSelector(!showLanguageSelector)
    }

    // Check if a menu item should be active
    const isMenuActive = (path) => {
        return location.pathname.startsWith(path)
    }

    return (
        <>
            <button className="mobile-toggle" onClick={toggleMobileSidebar} aria-label="Toggle menu">
                {isMobileOpen ? <FaTimes /> : <FaBars />}
            </button>

            <aside className={`sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
                <div className="sidebar-header">
                    <div className="logo">
                        <FaUserMd className="logo-icon" />
                        <h1>Klinika CRM</h1>
                    </div>
                    <button className="sidebar-close" onClick={() => setIsMobileOpen(false)}>
                        <FaTimes />
                    </button>
                </div>

                <div className="user-info">
                    <div className="user-avatar">{user?.name?.charAt(0) || "U"}</div>
                    <div className="user-details">
                        <h3>{user?.name || "User"}</h3>
                        <div className={`user-role ${user?.role || "user"}`}>{t(user?.role || "user")}</div>
                    </div>
                </div>

                <div className="language-selector">
                    <button className="language-button" onClick={toggleLanguageSelector}>
                        <FaLanguage />
                        <span>{languages[language]}</span>
                        {showLanguageSelector ? <FaAngleDown /> : <FaAngleRight />}
                    </button>

                    {showLanguageSelector && (
                        <div className="language-dropdown">
                            {Object.keys(languages).map((langCode) => (
                                <button
                                    key={langCode}
                                    className={`language-option ${language === langCode ? "active" : ""}`}
                                    onClick={() => {
                                        changeLanguage(langCode)
                                        setShowLanguageSelector(false)
                                    }}
                                >
                                    {languages[langCode]}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section">
                        <div className="nav-section-title">{t("main_menu")}</div>
                        <ul>
                            <li>
                                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <FaHome /> <span>{t("home")}</span>
                                </NavLink>
                            </li>

                            {/* Director Menu Items */}
                            {hasRole("director") && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/director" className={({ isActive }) => (isActive ? "active" : "")} end>
                                            <FaChartLine /> <span>{t("dashboard")}</span>
                                        </NavLink>
                                    </li>

                                    <li className={isMenuActive("/dashboard/director/staff") ? "active" : ""}>
                                        <button className="submenu-toggle" onClick={() => toggleSubmenu("staff")}>
                                            <FaUsers />
                                            <span>{t("staff")}</span>
                                            {expandedMenus.staff ? <FaAngleDown /> : <FaAngleRight />}
                                        </button>

                                        {expandedMenus.staff && (
                                            <ul className="submenu">
                                                <li>
                                                    <NavLink to="/dashboard/director/staff" end>
                                                        <span>{t("all_staff")}</span>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/dashboard/director/staff/doctors">
                                                        <span>{t("doctors")}</span>
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/dashboard/director/staff/nurses">
                                                        <span>{t("nurses")}</span>
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        )}
                                    </li>

                                    <li>
                                        <NavLink to="/dashboard/director/tasks" className={({ isActive }) => (isActive ? "active" : "")}>
                                            <FaTasks /> <span>{t("tasks")}</span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/dashboard/director/cabinets" className={({ isActive }) => (isActive ? "active" : "")}>
                                            <FaDoorOpen /> <span>{t("cabinets")}</span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/dashboard/director/rooms" className={({ isActive }) => (isActive ? "active" : "")}>
                                            <FaBed /> <span>{t("inpatient_rooms")}</span>
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
                                        <NavLink to="/dashboard/director/finance" className={({ isActive }) => (isActive ? "active" : "")}>
                                            <FaMoneyBillWave /> <span>{t("finance")}</span>
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
                                        <NavLink to="/dashboard/admin/tasks" className={({ isActive }) => (isActive ? "active" : "")}>
                                            <FaTasks /> <span>{t("tasks")}</span>
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

                                    <li>
                                        <NavLink to="/dashboard/admin/rooms" className={({ isActive }) => (isActive ? "active" : "")}>
                                            <FaBed /> <span>{t("inpatient_rooms")}</span>
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
                                        <NavLink to="/dashboard/doctor/tasks" className={({ isActive }) => (isActive ? "active" : "")}>
                                            <FaTasks /> <span>{t("tasks")}</span>
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
                                        <NavLink
                                            to="/dashboard/doctor/availability"
                                            className={({ isActive }) => (isActive ? "active" : "")}
                                        >
                                            <FaUserMd /> <span>{t("availability")}</span>
                                        </NavLink>
                                    </li>
                                </>
                            )}

                            {/* Nurse Menu Items */}
                            {hasRole("nurse") && (
                                <>
                                    <li>
                                        <NavLink to="/dashboard/nurse" className={({ isActive }) => (isActive ? "active" : "")} end>
                                            <FaChartLine /> <span>{t("dashboard")}</span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/dashboard/nurse/tasks" className={({ isActive }) => (isActive ? "active" : "")}>
                                            <FaTasks /> <span>{t("tasks")}</span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/dashboard/nurse/rooms" className={({ isActive }) => (isActive ? "active" : "")}>
                                            <FaBed /> <span>{t("inpatient_rooms")}</span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/dashboard/nurse/patients" className={({ isActive }) => (isActive ? "active" : "")}>
                                            <FaUserNurse /> <span>{t("patient_care")}</span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/dashboard/nurse/vitals" className={({ isActive }) => (isActive ? "active" : "")}>
                                            <FaThermometerHalf /> <span>{t("vital_signs")}</span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/dashboard/nurse/medications" className={({ isActive }) => (isActive ? "active" : "")}>
                                            <FaPills /> <span>{t("medications")}</span>
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/dashboard/nurse/schedule" className={({ isActive }) => (isActive ? "active" : "")}>
                                            <FaCalendarAlt /> <span>{t("schedule")}</span>
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>

                    {/* Common Menu Items */}
                    <div className="nav-section">
                        <div className="nav-section-title">{t("account")}</div>
                        <ul>
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
                                <NavLink to="/dashboard/settings" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <FaCog /> <span>{t("settings")}</span>
                                </NavLink>
                            </li>

                            <li>
                                <button className="logout-button" onClick={handleLogout}>
                                    <FaSignOutAlt /> <span>{t("logout")}</span>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="nav-section">
                        <div className="nav-section-title">{t("help")}</div>
                        <ul>
                            <li>
                                <NavLink to="/dashboard/help" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <FaQuestionCircle /> <span>{t("help_center")}</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <p>© {new Date().getFullYear()} Klinika CRM</p>
                    <p className="version">v2.0.1</p>
                </div>
            </aside>

            {isMobileOpen && <div className="sidebar-backdrop" onClick={() => setIsMobileOpen(false)}></div>}
        </>
    )
}

