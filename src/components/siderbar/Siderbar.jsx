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
    FaPhoneAlt,
} from "react-icons/fa"

export default function Sidebar(isOpen, toggleSidebar) {
    const { user, logout, hasRole } = useAuth()
    const { t, language, languages, changeLanguage } = useLanguage()
    const navigate = useNavigate()
    const location = useLocation()
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const [expandedMenus, setExpandedMenus] = useState({})
    const [showLanguageSelector, setShowLanguageSelector] = useState(false)
    const [showPartnershipInfo, setShowPartnershipInfo] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

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

    // Hamkorlik ma'lumotlari
    const partnershipInfo = {
        ourCompany: "Clinic Crm",
        partnerCompany: "Dental Academy",
        description: "Rasmiy hamkorlik shartnomasi asosida biz bilan ish yuritmoqda",
        year: "2023-2026",
    }

    return (
        <>
            <button className="mobile-toggle" onClick={toggleMobileSidebar} aria-label="Toggle menu">
                {isMobileOpen ? <FaTimes /> : <FaBars />}
            </button>

            <aside className={`sidebar ${isMobileOpen ? "mobile-open" : ""}`}>
                <div className="sidebar-header">
                    <div
                        className="logo"
                        onMouseEnter={() => setShowPartnershipInfo(true)}
                        onMouseLeave={() => setShowPartnershipInfo(false)}
                    >
                        <div className="partnership-logos">
                            <div className="company-logo our-company">
                                <img className="logo-icon" src="/images/clinic-logo.jpg" alt="clinic-logo" />
                            </div>
                            <div className="partnership-animation">
                                {/* Bu joyga GIF qo'yiladi */}
                                <div className="handshake-placeholder">
                                    <img style={{marginLeft:"10px"}} src="/images/contract-icon.gif" alt="clinic-logo" />
                                </div>
                            </div>
                            <div className="company-logo partner-company">
                                <img className="logo-icon" src="/images/dental-logo.jpg" alt="your-logo" />
                            </div>
                        </div>

                        {/* Hamkorlik haqida ma'lumot (hover bo'lganda ko'rinadi) */}
                        {showPartnershipInfo && (
                            <div className="partnership-info">
                                <p className="partnership-title">
                                    {partnershipInfo.ourCompany} va {partnershipInfo.partnerCompany}
                                </p>
                                <p className="partnership-description">{partnershipInfo.description}</p>
                                <p className="partnership-year">{partnershipInfo.year}</p>
                            </div>
                        )}
                    </div>
                    {isMobile && (
                        <button className="sidebar-close" onClick={toggleSidebar}>
                            <FaTimes />
                        </button>
                    )}
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
                                     <li>
                                        <NavLink to="/dashboard/director/lid" className={({ isActive }) => (isActive ? "active" : "")} end>
                                            <FaPhoneAlt /> <span>Lidlar</span>
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
                                        <NavLink to="/dashboard/admin/schedule" className={({ isActive }) => (isActive ? "active" : "")}>
                                            <FaCalendarAlt /> <span>{t("schedule")}</span>
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
                                <NavLink to="/dashboard/director/settings" className={({ isActive }) => (isActive ? "active" : "")}>
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

