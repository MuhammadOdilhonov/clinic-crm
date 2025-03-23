import React, { useState, useEffect } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useLanguage } from "../../contexts/LanguageContext"
import {
    FaBell,
    FaGlobe,
    FaBriefcase,
    FaCheck,
    FaCheckDouble,
    FaTrash,
    FaFilter,
    FaSearch,
    FaBuilding,
} from "react-icons/fa"

export default function Notifications() {
    const { selectedBranch } = useAuth()
    const { t } = useLanguage()
    const [activeTab, setActiveTab] = useState("site") // "site" or "work"
    const [searchTerm, setSearchTerm] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [filterRead, setFilterRead] = useState("all") // "all", "read", "unread"
    const [filterBranch, setFilterBranch] = useState(selectedBranch)
    const [filterPriority, setFilterPriority] = useState("all") // "all", "high", "medium", "low"

    // Mock data for site notifications
    const initialSiteNotificationsData = {
        all: [
            {
                id: 1,
                title: "Yangi versiya chiqdi",
                message: "Klinika CRM tizimining yangi versiyasi chiqdi. Yangi imkoniyatlar bilan tanishing!",
                date: "2023-05-20T10:30:00",
                read: false,
                priority: "high",
                branch: "all",
            },
            {
                id: 2,
                title: "Texnik ishlar",
                message:
                    "Ertaga soat 02:00 dan 04:00 gacha tizimda texnik ishlar olib boriladi. Noqulayliklar uchun uzr so'raymiz.",
                date: "2023-05-18T15:45:00",
                read: true,
                priority: "medium",
                branch: "all",
            },
            {
                id: 3,
                title: "Yangi funksiya qo'shildi",
                message:
                    "Hisobotlar bo'limiga yangi funksiyalar qo'shildi. Batafsil ma'lumot uchun qo'llanmaga murojaat qiling.",
                date: "2023-05-15T09:20:00",
                read: false,
                priority: "medium",
                branch: "all",
            },
            {
                id: 4,
                title: "Xavfsizlik yangilanishi",
                message: "Tizim xavfsizligi yangilandi. Barcha foydalanuvchilar parollarini yangilashni tavsiya qilamiz.",
                date: "2023-05-10T14:15:00",
                read: true,
                priority: "high",
                branch: "all",
            },
            {
                id: 5,
                title: "Mobil ilova chiqdi",
                message:
                    "Klinika CRM tizimining mobil ilovasi chiqdi. App Store va Google Play orqali yuklab olishingiz mumkin.",
                date: "2023-05-05T11:30:00",
                read: true,
                priority: "low",
                branch: "all",
            },
        ],
        branch1: [],
        branch2: [],
        branch3: [],
    }

    // Mock data for work notifications
    const initialWorkNotificationsData = {
        all: [
            {
                id: 1,
                title: "Yangi mijoz qo'shildi",
                message: "Alisher Karimov ismli yangi mijoz qo'shildi. Mijoz ma'lumotlarini tekshirib chiqing.",
                date: "2023-05-20T09:15:00",
                read: false,
                priority: "medium",
                branch: "branch1",
            },
            {
                id: 2,
                title: "Shifokor bandligi o'zgartirildi",
                message: "Dr. Aziz Karimov bandligi 2023-05-25 sanasida o'zgartirildi.",
                date: "2023-05-19T14:30:00",
                read: false,
                priority: "high",
                branch: "branch1",
            },
            {
                id: 3,
                title: "Kabinet ta'mirga yopildi",
                message: "202-kabinet ta'mirga yopildi. Iltimos, mijozlarni boshqa kabinetlarga yo'naltiring.",
                date: "2023-05-18T11:45:00",
                read: true,
                priority: "high",
                branch: "branch2",
            },
            {
                id: 4,
                title: "Hisobot tayyorlandi",
                message: "Oylik hisobot tayyorlandi. Hisobotni ko'rish uchun hisobotlar bo'limiga o'ting.",
                date: "2023-05-15T16:20:00",
                read: true,
                priority: "medium",
                branch: "branch3",
            },
            {
                id: 5,
                title: "Yangi shifokor qo'shildi",
                message: "Dr. Malika Umarova ismli yangi shifokor qo'shildi. Shifokor ma'lumotlarini tekshirib chiqing.",
                date: "2023-05-12T10:10:00",
                read: false,
                priority: "medium",
                branch: "branch2",
            },
            {
                id: 6,
                title: "Mijoz qabuli bekor qilindi",
                message: "Sardor Aliyev ismli mijozning 2023-05-22 sanasidagi qabuli bekor qilindi.",
                date: "2023-05-10T13:45:00",
                read: true,
                priority: "low",
                branch: "branch1",
            },
        ],
        branch1: [
            {
                id: 1,
                title: "Yangi mijoz qo'shildi",
                message: "Alisher Karimov ismli yangi mijoz qo'shildi. Mijoz ma'lumotlarini tekshirib chiqing.",
                date: "2023-05-20T09:15:00",
                read: false,
                priority: "medium",
                branch: "branch1",
            },
            {
                id: 2,
                title: "Shifokor bandligi o'zgartirildi",
                message: "Dr. Aziz Karimov bandligi 2023-05-25 sanasida o'zgartirildi.",
                date: "2023-05-19T14:30:00",
                read: false,
                priority: "high",
                branch: "branch1",
            },
            {
                id: 6,
                title: "Mijoz qabuli bekor qilindi",
                message: "Sardor Aliyev ismli mijozning 2023-05-22 sanasidagi qabuli bekor qilindi.",
                date: "2023-05-10T13:45:00",
                read: true,
                priority: "low",
                branch: "branch1",
            },
        ],
        branch2: [
            {
                id: 3,
                title: "Kabinet ta'mirga yopildi",
                message: "202-kabinet ta'mirga yopildi. Iltimos, mijozlarni boshqa kabinetlarga yo'naltiring.",
                date: "2023-05-18T11:45:00",
                read: true,
                priority: "high",
                branch: "branch2",
            },
            {
                id: 5,
                title: "Yangi shifokor qo'shildi",
                message: "Dr. Malika Umarova ismli yangi shifokor qo'shildi. Shifokor ma'lumotlarini tekshirib chiqing.",
                date: "2023-05-12T10:10:00",
                read: false,
                priority: "medium",
                branch: "branch2",
            },
        ],
        branch3: [
            {
                id: 4,
                title: "Hisobot tayyorlandi",
                message: "Oylik hisobot tayyorlandi. Hisobotni ko'rish uchun hisobotlar bo'limiga o'ting.",
                date: "2023-05-15T16:20:00",
                read: true,
                priority: "medium",
                branch: "branch3",
            },
        ],
    }

    const [siteNotifications, setSiteNotifications] = useState(
        selectedBranch === "all" ? initialSiteNotificationsData.all : initialSiteNotificationsData[selectedBranch],
    )

    const [workNotifications, setWorkNotifications] = useState(
        selectedBranch === "all" ? initialWorkNotificationsData.all : initialWorkNotificationsData[selectedBranch],
    )

    const [filteredNotifications, setFilteredNotifications] = useState(
        activeTab === "site" ? siteNotifications : workNotifications,
    )

    // Update notifications when branch changes
    useEffect(() => {
        if (selectedBranch === "all") {
            setSiteNotifications(initialSiteNotificationsData.all)
            setWorkNotifications(initialWorkNotificationsData.all)
        } else {
            // For site notifications, we still show all since they're global
            setSiteNotifications(initialSiteNotificationsData.all)
            setWorkNotifications(initialWorkNotificationsData[selectedBranch])
        }

        setFilterBranch(selectedBranch)
    }, [selectedBranch])

    // Update filtered notifications when tab, search, or filters change
    useEffect(() => {
        let notifications = activeTab === "site" ? siteNotifications : workNotifications

        // Filter by search term
        if (searchTerm) {
            notifications = notifications.filter(
                (notification) =>
                    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    notification.message.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        // Filter by read status
        if (filterRead !== "all") {
            const isRead = filterRead === "read"
            notifications = notifications.filter((notification) => notification.read === isRead)
        }

        // Filter by branch (for work notifications)
        if (activeTab === "work" && selectedBranch === "all" && filterBranch !== "all") {
            notifications = notifications.filter(
                (notification) => notification.branch === filterBranch || notification.branch === "all",
            )
        }

        // Filter by priority
        if (filterPriority !== "all") {
            notifications = notifications.filter((notification) => notification.priority === filterPriority)
        }

        setFilteredNotifications(notifications)
    }, [
        activeTab,
        searchTerm,
        filterRead,
        filterBranch,
        filterPriority,
        siteNotifications,
        workNotifications,
        selectedBranch,
    ])

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffTime = Math.abs(now - date)
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 0) {
            // Today - show time
            return `${t("today")}, ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
        } else if (diffDays === 1) {
            // Yesterday
            return t("yesterday")
        } else if (diffDays < 7) {
            // Within a week
            return `${diffDays} ${t("daysAgo")}`
        } else {
            // More than a week
            return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear()}`
        }
    }

    // Mark notification as read
    const markAsRead = (id) => {
        if (activeTab === "site") {
            const updatedNotifications = siteNotifications.map((notification) =>
                notification.id === id ? { ...notification, read: true } : notification,
            )
            setSiteNotifications(updatedNotifications)

            // Update in all data
            initialSiteNotificationsData.all = initialSiteNotificationsData.all.map((notification) =>
                notification.id === id ? { ...notification, read: true } : notification,
            )
        } else {
            const updatedNotifications = workNotifications.map((notification) =>
                notification.id === id ? { ...notification, read: true } : notification,
            )
            setWorkNotifications(updatedNotifications)

            // Update in all data
            initialWorkNotificationsData.all = initialWorkNotificationsData.all.map((notification) =>
                notification.id === id ? { ...notification, read: true } : notification,
            )

            // Update in branch-specific data
            const notification = initialWorkNotificationsData.all.find((n) => n.id === id)
            if (notification && notification.branch !== "all") {
                initialWorkNotificationsData[notification.branch] = initialWorkNotificationsData[notification.branch].map(
                    (n) => (n.id === id ? { ...n, read: true } : n),
                )
            }
        }
    }

    // Mark all as read
    const markAllAsRead = () => {
        if (activeTab === "site") {
            const updatedNotifications = siteNotifications.map((notification) => ({
                ...notification,
                read: true,
            }))
            setSiteNotifications(updatedNotifications)

            // Update in all data
            initialSiteNotificationsData.all = initialSiteNotificationsData.all.map((notification) => ({
                ...notification,
                read: true,
            }))
        } else {
            const updatedNotifications = workNotifications.map((notification) => ({
                ...notification,
                read: true,
            }))
            setWorkNotifications(updatedNotifications)

            // Update in all data
            initialWorkNotificationsData.all = initialWorkNotificationsData.all.map((notification) => ({
                ...notification,
                read: true,
            }))

            // Update in branch-specific data
            Object.keys(initialWorkNotificationsData).forEach((branch) => {
                if (branch !== "all") {
                    initialWorkNotificationsData[branch] = initialWorkNotificationsData[branch].map((notification) => ({
                        ...notification,
                        read: true,
                    }))
                }
            })
        }
    }

    // Delete notification
    const deleteNotification = (id) => {
        if (activeTab === "site") {
            const updatedNotifications = siteNotifications.filter((notification) => notification.id !== id)
            setSiteNotifications(updatedNotifications)

            // Update in all data
            initialSiteNotificationsData.all = initialSiteNotificationsData.all.filter(
                (notification) => notification.id !== id,
            )
        } else {
            const updatedNotifications = workNotifications.filter((notification) => notification.id !== id)
            setWorkNotifications(updatedNotifications)

            // Update in all data
            initialWorkNotificationsData.all = initialWorkNotificationsData.all.filter(
                (notification) => notification.id !== id,
            )

            // Update in branch-specific data
            const notification = initialWorkNotificationsData.all.find((n) => n.id === id)
            if (notification && notification.branch !== "all") {
                initialWorkNotificationsData[notification.branch] = initialWorkNotificationsData[notification.branch].filter(
                    (n) => n.id !== id,
                )
            }
        }
    }

    // Toggle filters
    const toggleFilters = () => {
        setShowFilters(!showFilters)
    }

    // Get unread count
    const getUnreadCount = (notifications) => {
        return notifications.filter((notification) => !notification.read).length
    }

    const siteUnreadCount = getUnreadCount(siteNotifications)
    const workUnreadCount = getUnreadCount(workNotifications)

    return (
        <div className="notifications-page">
            <div className="page-header">
                <h1 className="page-title">{t("notifications")}</h1>
                <div className="header-actions">
                    <button className="btn btn-primary btn-icon" onClick={markAllAsRead}>
                        <FaCheckDouble /> {t("markAllAsRead")}
                    </button>
                </div>
            </div>

            <div className="notifications-tabs">
                <button className={`tab-button ${activeTab === "site" ? "active" : ""}`} onClick={() => setActiveTab("site")}>
                    <FaGlobe /> {t("siteNews")}
                    {siteUnreadCount > 0 && <span className="badge">{siteUnreadCount}</span>}
                </button>
                <button className={`tab-button ${activeTab === "work" ? "active" : ""}`} onClick={() => setActiveTab("work")}>
                    <FaBriefcase /> {t("workNotifications")}
                    {workUnreadCount > 0 && <span className="badge">{workUnreadCount}</span>}
                </button>
            </div>

            <div className="filters-container">
                <div className="search-filter">
                    <div className="search-input">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder={t("search")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className={`filter-toggle-btn ${showFilters ? "active" : ""}`} onClick={toggleFilters}>
                        <FaFilter /> {t("filters")}
                    </button>
                </div>

                {showFilters && (
                    <div className="advanced-filters">
                        <div className="filter-group">
                            <label>{t("status")}:</label>
                            <select value={filterRead} onChange={(e) => setFilterRead(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                <option value="read">{t("read")}</option>
                                <option value="unread">{t("unread")}</option>
                            </select>
                        </div>

                        {activeTab === "work" && selectedBranch === "all" && (
                            <div className="filter-group">
                                <label>{t("branch")}:</label>
                                <select value={filterBranch} onChange={(e) => setFilterBranch(e.target.value)}>
                                    <option value="all">{t("all")}</option>
                                    <option value="branch1">{t("branch1")}</option>
                                    <option value="branch2">{t("branch2")}</option>
                                    <option value="branch3">{t("branch3")}</option>
                                </select>
                            </div>
                        )}

                        <div className="filter-group">
                            <label>{t("priority")}:</label>
                            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                <option value="high">{t("high")}</option>
                                <option value="medium">{t("medium")}</option>
                                <option value="low">{t("low")}</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="notifications-list">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`notification-item ${!notification.read ? "unread" : ""}`}
                            onClick={() => markAsRead(notification.id)}
                        >
                            <div className="notification-icon">
                                {activeTab === "site" ? (
                                    <FaGlobe className={`icon priority-${notification.priority}`} />
                                ) : (
                                    <FaBriefcase className={`icon priority-${notification.priority}`} />
                                )}
                            </div>
                            <div className="notification-content">
                                <div className="notification-header">
                                    <h3 className="notification-title">{notification.title}</h3>
                                    <div className="notification-date">{formatDate(notification.date)}</div>
                                </div>
                                <div className="notification-message">{notification.message}</div>
                                {activeTab === "work" && notification.branch !== "all" && (
                                    <div className="notification-branch">
                                        <FaBuilding />{" "}
                                        {notification.branch === "branch1"
                                            ? t("branch1")
                                            : notification.branch === "branch2"
                                                ? t("branch2")
                                                : notification.branch === "branch3"
                                                    ? t("branch3")
                                                    : ""}
                                    </div>
                                )}
                                <div className="notification-actions">
                                    {!notification.read ? (
                                        <button
                                            className="action-btn mark-read"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                markAsRead(notification.id)
                                            }}
                                        >
                                            <FaCheck /> {t("markAsRead")}
                                        </button>
                                    ) : (
                                        <div className="read-status">
                                            <FaCheckDouble /> {t("read")}
                                        </div>
                                    )}
                                    <button
                                        className="action-btn delete"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            deleteNotification(notification.id)
                                        }}
                                    >
                                        <FaTrash /> {t("delete")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-notifications">
                        <FaBell className="empty-icon" />
                        <p>{t("noNotifications")}</p>
                    </div>
                )}
            </div>
        </div>
    )
};