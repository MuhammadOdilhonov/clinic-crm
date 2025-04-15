"use client"

import { useState, useEffect, useCallback } from "react"
import {
    FaUserMd,
    FaUserNurse,
    FaUserCog,
    FaEdit,
    FaTrash,
    FaSync,
    FaFilter,
    FaSearch,
    FaPlus,
    FaEye,
    FaTimes,
    FaCheck,
    FaCalendarAlt,
    FaSpinner,
    FaUserTie,
    FaChevronDown,
    FaChevronUp,
    FaMoneyBillWave,
    FaUserAlt,
} from "react-icons/fa"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import apiUsers from "../../../api/apiUsers"
import apiBranches from "../../../api/apiBranches"
import apiUsersStatistics from "../../../api/apiUsersStatistics"
import Pagination from "../../pagination/Pagination"
import ConfirmModal from "../../modal/ConfirmModal"
import SuccessModal from "../../modal/SuccessModal"
import StaffDetailsModal from "./StaffDetailsModal"

export default function Staff() {
    const { selectedBranch } = useAuth()
    const { t } = useLanguage()

    // Staff positions
    const staffPositions = [
        { value: "doctor", label: t("doctor") },
        { value: "admin", label: t("admin") },
        { value: "nurse", label: t("nurse") },
        { value: "director", label: t("director") },
    ]

    // Specialization options
    const specializationOptions = [
        { value: "general", label: t("general") },
        { value: "cardiology", label: t("cardiology") },
        { value: "dermatology", label: t("dermatology") },
        { value: "pediatrics", label: t("pediatrics") },
        { value: "neurology", label: t("neurology") },
        { value: "other", label: t("other") },
    ]

    // Status options
    const statusOptions = [
        { value: "faol", label: t("active") },
        { value: "nofaol", label: t("inactive") },
        { value: "tatilda", label: t("on_vacation") },
    ]

    // State for branches
    const [branches, setBranches] = useState([])
    const [isLoadingBranches, setIsLoadingBranches] = useState(true)
    const [branchError, setBranchError] = useState(null)

    // State for staff data
    const [staff, setStaff] = useState([])
    const [isLoadingStaff, setIsLoadingStaff] = useState(true)
    const [staffError, setStaffError] = useState(null)
    const [totalStaff, setTotalStaff] = useState(0)
    const [refreshTrigger, setRefreshTrigger] = useState(0)

    // State for staff statistics
    const [staffStats, setStaffStats] = useState({
        total_users: 0,
        active_users: 0,
        on_leave_users: 0,
        total_salary: 0,
        inactive_users:0,
        role_distribution: [],
    })
    const [isLoadingStats, setIsLoadingStats] = useState(true)
    const [showStats, setShowStats] = useState(true)

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0) // 0-based for react-paginate
    const [itemsPerPage, setItemsPerPage] = useState(10)

    // State for filters
    const [showFilters, setShowFilters] = useState(false)
    const [filterRole, setFilterRole] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterBranch, setFilterBranch] = useState(selectedBranch)
    const [searchTerm, setSearchTerm] = useState("")

    // State for user form
    const [showSidebar, setShowSidebar] = useState(false)
    const [formMode, setFormMode] = useState("add") // 'add' or 'edit'
    const [currentStaffMember, setCurrentStaffMember] = useState(null)
    const [formErrors, setFormErrors] = useState({})

    // State for new staff
    const [newStaff, setNewStaff] = useState({
        email: "",
        first_name: "",
        last_name: "",
        role: "doctor",
        phone_number: "",
        specialization: "general",
        status: "faol",
        branch: selectedBranch === "all" ? "" : selectedBranch,
        salary: "",
        reason_holiday: "",
        start_holiday: "",
        end_holiday: "",
    })

    // Modal states
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: "",
        message: "",
        onConfirm: () => { },
        type: "warning",
    })

    const [successModal, setSuccessModal] = useState({
        isOpen: false,
        title: "",
        message: "",
    })

    // User details modal state
    const [userDetailsModal, setUserDetailsModal] = useState({
        isOpen: false,
        user: null,
    })

    // Fetch branches from API
    useEffect(() => {
        const fetchBranchData = async () => {
            setIsLoadingBranches(true)
            setBranchError(null)
            try {
                const branchData = await apiBranches.fetchBranches()
                // Ensure branchData is an array
                setBranches(Array.isArray(branchData) ? branchData : [])
            } catch (error) {
                console.error("Error fetching branches:", error)
                setBranchError(t("error_fetching_branches"))
                setBranches([]) // Set to empty array on error
            } finally {
                setIsLoadingBranches(false)
            }
        }

        fetchBranchData()
    }, [t])

    // Fetch staff statistics
    useEffect(() => {
        const fetchStaffStatistics = async () => {
            if (!showStats) return

            setIsLoadingStats(true)
            try {
                const stats = await apiUsersStatistics.fetchUsersStatistics(filterBranch !== "all" ? filterBranch : null)

                // Set the statistics data directly from the API response
                setStaffStats(stats)
            } catch (error) {
                console.error("Error fetching staff statistics:", error)
                setStaffStats({
                    total_users: 0,
                    active_users: 0,
                    on_leave_users: 0,
                    total_salary: 0,
                    inactive_users:0,
                    role_distribution: [],
                })
            } finally {
                setIsLoadingStats(false)
            }
        }

        fetchStaffStatistics()
    }, [filterBranch, refreshTrigger, showStats])

    // Fetch staff data with pagination and filters
    const fetchStaffData = useCallback(async () => {
        setIsLoadingStaff(true)
        setStaffError(null)
        try {
            // Create filters object
            const filters = {
                branch: filterBranch !== "all" ? filterBranch : null,
                role: filterRole !== "all" ? filterRole : null,
                status: filterStatus !== "all" ? filterStatus : null,
                search: searchTerm || null,
            }

            // API uses 1-based pagination, but react-paginate uses 0-based
            const response = await apiUsers.fetchUsers(currentPage + 1, itemsPerPage, filters)

            setStaff(response.results || [])
            setTotalStaff(response.count || 0)
        } catch (error) {
            console.error("Error fetching staff data:", error)
            setStaffError(t("error_fetching_staff"))
            setStaff([])
            setTotalStaff(0)
        } finally {
            setIsLoadingStaff(false)
        }
    }, [currentPage, itemsPerPage, filterRole, filterStatus, filterBranch, searchTerm, t])

    useEffect(() => {
        fetchStaffData()
    }, [fetchStaffData, refreshTrigger])

    // Update filter branch when selected branch changes
    useEffect(() => {
        setFilterBranch(selectedBranch)
        setCurrentPage(0) // Reset to first page when branch changes
        // Trigger a refresh
        setRefreshTrigger((prev) => prev + 1)
    }, [selectedBranch])

    // Handle page change
    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage)
    }

    // Handle items per page change
    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage)
        setCurrentPage(0) // Reset to first page when items per page changes
    }

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(0) // Reset to first page when search term changes
    }

    // Toggle filters
    const toggleFilters = () => {
        setShowFilters(!showFilters)
    }

    // Toggle statistics
    const toggleStats = () => {
        setShowStats(!showStats)
    }

    // Reset filters
    const resetFilters = () => {
        setFilterRole("all")
        setFilterStatus("all")
        setFilterBranch(selectedBranch)
        setSearchTerm("")
        setCurrentPage(0)
    }

    // Handle new staff input change
    const handleNewStaffChange = (e) => {
        const { name, value } = e.target
        setNewStaff({
            ...newStaff,
            [name]: value,
        })

        // Clear form errors when field is changed
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: null,
            })
        }
    }

    // Handle edit staff input change
    const handleEditStaffChange = (e) => {
        const { name, value } = e.target
        setCurrentStaffMember({
            ...currentStaffMember,
            [name]: value,
        })

        // Clear form errors when field is changed
        if (formErrors[name]) {
            setFormErrors({
                ...formErrors,
                [name]: null,
            })
        }
    }

    // Validate form
    const validateForm = (data) => {
        const errors = {}

        // Required fields
        if (!data.email) errors.email = t("email_required")
        if (!data.first_name) errors.first_name = t("first_name_required")
        if (!data.last_name) errors.last_name = t("last_name_required")
        if (!data.phone_number) errors.phone_number = t("phone_required")
        if (!data.salary) errors.salary = t("salary_required")

        // Status-specific validations
        if (data.status === "nofaol" && !data.reason_holiday) {
            errors.reason_holiday = t("reason_required_for_inactive")
        }

        if (data.status === "tatilda") {
            if (!data.start_holiday) errors.start_holiday = t("start_date_required")
            if (!data.end_holiday) errors.end_holiday = t("end_date_required")
            if (!data.reason_holiday) errors.reason_holiday = t("reason_required_for_vacation")
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    // Open add sidebar
    const openAddSidebar = () => {
        setFormMode("add")
        setShowSidebar(true)
        setFormErrors({})
        setNewStaff({
            email: "",
            first_name: "",
            last_name: "",
            role: "doctor",
            phone_number: "",
            specialization: "general",
            status: "faol",
            branch: selectedBranch === "all" ? (branches.length > 0 ? branches[0].id.toString() : "") : selectedBranch,
            salary: "",
            reason_holiday: "",
            start_holiday: "",
            end_holiday: "",
        })
    }

    // Close add sidebar
    const closeAddSidebar = () => {
        setShowSidebar(false)
        setFormErrors({})
    }

    // Open edit sidebar
    const openEditSidebar = async (staffId) => {
        try {
            setIsLoadingStaff(true)
            setFormMode("edit")
            setFormErrors({})
            const staffMember = await apiUsers.fetchUserById(staffId)
            setCurrentStaffMember({
                ...staffMember,
                _prevBranch: staffMember.branch, // Store previous branch for comparison
            })
            setShowSidebar(true)
        } catch (error) {
            console.error("Error fetching staff member details:", error)
            showErrorModal(t("error"), t("error_fetching_staff_details"))
        } finally {
            setIsLoadingStaff(false)
        }
    }

    // Close edit sidebar
    const closeEditSidebar = () => {
        setShowSidebar(false)
        setCurrentStaffMember(null)
        setFormErrors({})
    }

    // Show confirm modal
    const showConfirmModal = (title, message, onConfirm, type = "warning") => {
        setConfirmModal({
            isOpen: true,
            title,
            message,
            onConfirm,
            type,
        })
    }

    // Close confirm modal
    const closeConfirmModal = () => {
        setConfirmModal({
            ...confirmModal,
            isOpen: false,
        })
    }

    // Show success modal
    const showSuccessModal = (title, message) => {
        setSuccessModal({
            isOpen: true,
            title,
            message,
        })
    }

    // Close success modal
    const closeSuccessModal = () => {
        setSuccessModal({
            ...successModal,
            isOpen: false,
        })
    }

    // Show error modal
    const showErrorModal = (title, message) => {
        setConfirmModal({
            isOpen: true,
            title,
            message,
            onConfirm: closeConfirmModal,
            type: "danger",
        })
    }

    // Open user details modal
    const openUserDetailsModal = (user) => {
        setUserDetailsModal({
            isOpen: true,
            user,
        })
    }

    // Close user details modal
    const closeUserDetailsModal = () => {
        setUserDetailsModal({
            isOpen: false,
            user: null,
        })
    }

    // Add new staff
    const addStaff = async (e) => {
        e.preventDefault()

        if (!validateForm(newStaff)) {
            return
        }

        try {
            setIsLoadingStaff(true)

            // Prepare data for API
            const staffData = { ...newStaff }

            // Handle conditional fields based on status
            if (staffData.status !== "tatilda") {
                // Remove vacation-related fields if status is not "tatilda"
                delete staffData.start_holiday
                delete staffData.end_holiday
            } else {
                // Ensure dates are in YYYY-MM-DD format for "tatilda" status
                if (staffData.start_holiday) {
                    // Make sure the date is in YYYY-MM-DD format
                    const startDate = new Date(staffData.start_holiday)
                    if (!isNaN(startDate.getTime())) {
                        staffData.start_holiday = startDate.toISOString().split("T")[0]
                    }
                }

                if (staffData.end_holiday) {
                    // Make sure the date is in YYYY-MM-DD format
                    const endDate = new Date(staffData.end_holiday)
                    if (!isNaN(endDate.getTime())) {
                        staffData.end_holiday = endDate.toISOString().split("T")[0]
                    }
                }
            }

            // Remove reason_holiday if status is "faol" (active)
            if (staffData.status === "faol") {
                delete staffData.reason_holiday
            }

            await apiUsers.createUser(staffData)

            // Refresh staff list
            setRefreshTrigger((prev) => prev + 1)
            closeAddSidebar()
            showSuccessModal(t("success"), t("staff_added_successfully"))
        } catch (error) {
            console.error("Error adding staff member:", error)
            showErrorModal(t("error"), t("error_adding_staff"))
        } finally {
            setIsLoadingStaff(false)
        }
    }

    // Update staff
    const updateStaff = async (e) => {
        e.preventDefault()

        if (!currentStaffMember || !currentStaffMember.id) {
            console.error("No staff member selected for update")
            return
        }

        if (!validateForm(currentStaffMember)) {
            return
        }

        try {
            setIsLoadingStaff(true)

            // Prepare data for API
            const staffData = { ...currentStaffMember }

            // Remove fields that shouldn't be sent to the API
            delete staffData._prevBranch

            // Handle conditional fields based on status
            if (staffData.status !== "tatilda") {
                // Remove vacation-related fields if status is not "tatilda"
                delete staffData.start_holiday
                delete staffData.end_holiday
            } else {
                // Ensure dates are in YYYY-MM-DD format for "tatilda" status
                if (staffData.start_holiday) {
                    // Make sure the date is in YYYY-MM-DD format
                    const startDate = new Date(staffData.start_holiday)
                    if (!isNaN(startDate.getTime())) {
                        staffData.start_holiday = startDate.toISOString().split("T")[0]
                    }
                }

                if (staffData.end_holiday) {
                    // Make sure the date is in YYYY-MM-DD format
                    const endDate = new Date(staffData.end_holiday)
                    if (!isNaN(endDate.getTime())) {
                        staffData.end_holiday = endDate.toISOString().split("T")[0]
                    }
                }
            }

            // Remove reason_holiday if status is "faol" (active)
            if (staffData.status === "faol") {
                delete staffData.reason_holiday
            }

            await apiUsers.updateUser(currentStaffMember.id, staffData)

            // Refresh staff list
            setRefreshTrigger((prev) => prev + 1)
            closeEditSidebar()
            showSuccessModal(t("success"), t("staff_updated_successfully"))
        } catch (error) {
            console.error("Error updating staff member:", error)
            showErrorModal(t("error"), t("error_updating_staff"))
        } finally {
            setIsLoadingStaff(false)
        }
    }

    // Confirm delete staff
    const confirmDeleteStaff = (staffId, staffName) => {
        showConfirmModal(
            t("confirm_delete"),
            t("confirm_delete_staff_message", { name: staffName }),
            () => deleteStaff(staffId),
            "danger",
        )
    }

    // Delete staff
    const deleteStaff = async (staffId) => {
        try {
            setIsLoadingStaff(true)
            await apiUsers.deleteUser(staffId)

            // Refresh staff list
            setRefreshTrigger((prev) => prev + 1)
            closeConfirmModal()
            showSuccessModal(t("success"), t("staff_deleted_successfully"))
        } catch (error) {
            console.error("Error deleting staff member:", error)
            showErrorModal(t("error"), t("error_deleting_staff"))
        } finally {
            setIsLoadingStaff(false)
        }
    }

    // Manual refresh data
    const handleRefreshData = () => {
        setRefreshTrigger((prev) => prev + 1)
    }

    // Get role label
    const getRoleLabel = (roleValue) => {
        const role = staffPositions.find((pos) => pos.value === roleValue)
        return role ? role.label : roleValue
    }

    // Get specialization label
    const getSpecializationLabel = (specValue) => {
        const spec = specializationOptions.find((s) => s.value === specValue)
        return spec ? spec.label : specValue
    }

    // Get branch name by ID
    const getBranchName = (branchId) => {
        if (isLoadingBranches) return t("loading")
        if (branchError) return t("unknown")

        const branch = branches.find((b) => b.id.toString() === branchId?.toString())
        return branch ? branch.name : t("unknown_branch")
    }

    // Format full name
    const formatFullName = (firstName, lastName) => {
        return `${firstName || ""} ${lastName || ""}`.trim()
    }

    // Format currency
    const formatCurrency = (amount) => {
        if (!amount) return "0"
        return new Intl.NumberFormat("uz-UZ", {
            style: "decimal",
            maximumFractionDigits: 0,
        }).format(amount)
    }

    // Calculate page count for pagination
    const pageCount = Math.ceil(totalStaff / itemsPerPage)

    // Calculate progress percentage for position stats
    const getProgressPercentage = (count) => {
        if (!staffStats.totalStaff || staffStats.totalStaff === 0) return 0
        return (count / staffStats.totalStaff) * 100
    }

    return (
        <div className="xodim-container">
            <div className="xodim-header">
                <h1 className="xodim-title">{t("staff")}</h1>
                <div className="xodim-actions">
                    <button className="xodim-btn xodim-btn-outline " onClick={handleRefreshData} title={t("refresh_data")}>
                        <FaSync className={isLoadingStaff ? "xodim-spinner" : ""} />
                    </button>
                    <button className="xodim-btn xodim-btn-primary " onClick={openAddSidebar}>
                        <FaPlus /> {t("add_new_staff")}
                    </button>
                </div>
            </div>

            {/* Statistics Toggle Section */}
            <div className="xodim-stats-toggle" onClick={toggleStats}>
                <h2>
                    {t("statistics")} {showStats ? <FaChevronUp /> : <FaChevronDown />}
                </h2>
            </div>

            {/* Statistics Section */}
            {showStats && (
                <div className="xodim-stats-container">
                    <div className="xodim-stats-grid">
                        <div className="xodim-stat-card">
                            <div className="xodim-stat-icon-wrapper">
                                <FaUserAlt className="xodim-stat-icon" />
                            </div>
                            <div className="xodim-stat-content">
                                <div className="xodim-stat-value">
                                    {isLoadingStats ? <FaSpinner className="xodim-spinner" /> : staffStats.total_users}
                                </div>
                                <div className="xodim-stat-label">{t("total_staff")}</div>
                            </div>
                        </div>
                        <div className="xodim-stat-card">
                            <div className="xodim-stat-icon-wrapper">
                                <FaCheck className="xodim-stat-icon" />
                            </div>
                            <div className="xodim-stat-content">
                                <div className="xodim-stat-value">
                                    {isLoadingStats ? <FaSpinner className="xodim-spinner" /> : staffStats.active_users}
                                </div>
                                <div className="xodim-stat-label">{t("active_staff")}</div>
                            </div>
                        </div>
                        <div className="xodim-stat-card">
                            <div className="xodim-stat-icon-wrapper">
                                <FaCalendarAlt className="xodim-stat-icon" />
                            </div>
                            <div className="xodim-stat-content">
                                <div className="xodim-stat-value">
                                    {isLoadingStats ? <FaSpinner className="xodim-spinner" /> : staffStats.on_leave_users}
                                </div>
                                <div className="xodim-stat-label">{t("staff_on_leave")}</div>
                            </div>
                        </div>
                        <div className="xodim-stat-card">
                            <div className="xodim-stat-icon-wrapper">
                                <FaCalendarAlt className="xodim-stat-icon" />
                            </div>
                            <div className="xodim-stat-content">
                                <div className="xodim-stat-value">
                                    {isLoadingStats ? <FaSpinner className="xodim-spinner" /> : staffStats.inactive_users}
                                </div>
                                <div className="xodim-stat-label">{t("inactive_employee")}</div>
                            </div>
                        </div>
                        <div className="xodim-stat-card">
                            <div className="xodim-stat-icon-wrapper">
                                <FaMoneyBillWave className="xodim-stat-icon" />
                            </div>
                            <div className="xodim-stat-content">
                                <div className="xodim-stat-value">
                                    {isLoadingStats ? (
                                        <FaSpinner className="xodim-spinner" />
                                    ) : (
                                        `${formatCurrency(staffStats.total_salary)} ${t("so'm")}`
                                    )}
                                </div>
                                <div className="xodim-stat-label">{t("total_salary")}</div>
                            </div>
                        </div>
                    </div>

                    {/* Position Distribution */}
                    {!isLoadingStats && staffStats.role_distribution && staffStats.role_distribution.length > 0 && (
                        <div className="xodim-position-stats">
                            <h3>{t("position_distribution")}</h3>
                            <div className="xodim-position-stats-list">
                                {staffStats.role_distribution.map((position, index) => (
                                    <div key={index} className="xodim-position-stat-item">
                                        <div className="xodim-position-stat-header">
                                            <span className="xodim-position-name">{getRoleLabel(position.role)}</span>
                                            <span className="xodim-position-count">{position.count}</span>
                                        </div>
                                        <div className="xodim-position-progress-bar">
                                            <div
                                                className="xodim-position-progress"
                                                style={{ width: `${getProgressPercentage(position.count)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <div className="xodim-filters-container">
                <div className="xodim-search-filter">
                    <div className="xodim-search-input">
                        <FaSearch className="xodim-search-icon" />
                        <input type="text" placeholder={t("search")} value={searchTerm} onChange={handleSearchChange} />
                    </div>
                    <button className={`xodim-filter-toggle-btn ${showFilters ? "active" : ""}`} onClick={toggleFilters}>
                        <FaFilter /> {t("filters")}
                    </button>
                </div>

                {showFilters && (
                    <div className="xodim-advanced-filters">
                        <div className="xodim-filter-group">
                            <label>{t("position")}:</label>
                            <select
                                value={filterRole}
                                onChange={(e) => {
                                    setFilterRole(e.target.value)
                                    setCurrentPage(0) // Reset to first page when filter changes
                                }}
                            >
                                <option value="all">{t("all")}</option>
                                {staffPositions.map((position) => (
                                    <option key={position.value} value={position.value}>
                                        {position.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="xodim-filter-group">
                            <label>{t("status")}:</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => {
                                    setFilterStatus(e.target.value)
                                    setCurrentPage(0) // Reset to first page when filter changes
                                }}
                            >
                                <option value="all">{t("all")}</option>
                                {statusOptions.map((status) => (
                                    <option key={status.value} value={status.value}>
                                        {status.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedBranch === "all" && (
                            <div className="xodim-filter-group">
                                <label>{t("branch")}:</label>
                                <select
                                    value={filterBranch}
                                    onChange={(e) => {
                                        setFilterBranch(e.target.value)
                                        setCurrentPage(0) // Reset to first page when filter changes
                                    }}
                                >
                                    <option value="all">{t("all")}</option>
                                    {Array.isArray(branches) &&
                                        branches.map((branch) => (
                                            <option key={branch.id} value={branch.id.toString()}>
                                                {branch.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}

                        <div className="xodim-filter-group">
                            <button className="xodim-btn xodim-btn-outline" onClick={resetFilters}>
                                {t("reset_filters")}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {isLoadingStaff && (
                <div className="xodim-loading-container">
                    <div className="xodim-loading">
                        <FaSpinner className="xodim-spinner" /> {t("loading_staff")}
                    </div>
                </div>
            )}

            {staffError && !isLoadingStaff && (
                <div className="xodim-error-container">
                    <div className="xodim-error">
                        {staffError}
                        <button className="xodim-btn xodim-btn-outline xodim-btn-sm" onClick={handleRefreshData}>
                            <FaSync /> {t("try_again")}
                        </button>
                    </div>
                </div>
            )}

            {!isLoadingStaff && !staffError && (
                <div className="xodim-dashboard-card">
                    <div className="xodim-table-responsive">
                        <table className="xodim-data-table">
                            <thead>
                                <tr>
                                    <th></th> {/* Eye button column */}
                                    <th>{t("name")}</th>
                                    <th>{t("position")}</th>
                                    <th>{t("specialization")}</th>
                                    <th>{t("phone")}</th>
                                    <th>{t("status")}</th>
                                    <th>{t("actions")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staff.length > 0 ? (
                                    staff.map((person) => (
                                        <tr key={person.id}>
                                            <td>
                                                <button
                                                    className="xodim-btn-icon xodim-view"
                                                    onClick={() => openUserDetailsModal(person)}
                                                    title={t("view_details")}
                                                >
                                                    <FaEye />
                                                </button>
                                            </td>
                                            <td>{formatFullName(person.first_name, person.last_name)}</td>
                                            <td>
                                                <div className={`xodim-role-badge ${person.role}`}>
                                                    {person.role === "doctor" ? (
                                                        <FaUserMd />
                                                    ) : person.role === "nurse" ? (
                                                        <FaUserNurse />
                                                    ) : person.role === "director" ? (
                                                        <FaUserTie />
                                                    ) : (
                                                        <FaUserCog />
                                                    )}
                                                    {getRoleLabel(person.role)}
                                                </div>
                                            </td>
                                            <td>{person.specialization_name || getSpecializationLabel(person.specialization)}</td>
                                            <td>{person.phone_number}</td>
                                            <td>
                                                <div
                                                    className={`xodim-status-badge ${person.status === "faol" ? "active" : person.status === "nofaol" ? "inactive" : "vacation"
                                                        }`}
                                                >
                                                    {person.status === "faol" ? (
                                                        <>
                                                            <FaCheck /> {t("active")}
                                                        </>
                                                    ) : person.status === "nofaol" ? (
                                                        <>
                                                            <FaTimes /> {t("inactive")}
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaCalendarAlt /> {t("on_vacation")}
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="xodim-action-buttons">
                                                    <button
                                                        className="xodim-btn-icon xodim-edit"
                                                        onClick={() => openEditSidebar(person.id)}
                                                        title={t("edit")}
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        className="xodim-btn-icon xodim-delete"
                                                        onClick={() =>
                                                            confirmDeleteStaff(person.id, formatFullName(person.first_name, person.last_name))
                                                        }
                                                        title={t("delete")}
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="xodim-no-data">
                                            {t("no_data_found")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Pagination */}
            {!isLoadingStaff && !staffError && staff.length > 0 && (
                <Pagination
                    pageCount={pageCount}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    itemsPerPage={itemsPerPage}
                    totalItems={totalStaff}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
            )}

            {/* Add/Edit Staff Sidebar */}
            {showSidebar && (
                <>
                    <div className="xodim-sidebar-overlay active" onClick={closeAddSidebar}></div>
                    <div className="xodim-sidebar active">
                        <div className="xodim-sidebar-header">
                            <h2>{formMode === "add" ? t("add_new_staff") : t("edit_staff")}</h2>
                            <button className="xodim-close-button" onClick={closeAddSidebar}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="xodim-sidebar-content">
                            <form onSubmit={formMode === "add" ? addStaff : updateStaff}>
                                <div className="xodim-form-group">
                                    <label>{t("email")} *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formMode === "add" ? newStaff.email : currentStaffMember?.email || ""}
                                        onChange={formMode === "add" ? handleNewStaffChange : handleEditStaffChange}
                                        required
                                        className={formErrors.email ? "error" : ""}
                                    />
                                    {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                                </div>

                                <div className="xodim-form-group">
                                    <label>{t("first_name")} *</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formMode === "add" ? newStaff.first_name : currentStaffMember?.first_name || ""}
                                        onChange={formMode === "add" ? handleNewStaffChange : handleEditStaffChange}
                                        required
                                        className={formErrors.first_name ? "error" : ""}
                                    />
                                    {formErrors.first_name && <div className="error-message">{formErrors.first_name}</div>}
                                </div>

                                <div className="xodim-form-group">
                                    <label>{t("last_name")} *</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formMode === "add" ? newStaff.last_name : currentStaffMember?.last_name || ""}
                                        onChange={formMode === "add" ? handleNewStaffChange : handleEditStaffChange}
                                        required
                                        className={formErrors.last_name ? "error" : ""}
                                    />
                                    {formErrors.last_name && <div className="error-message">{formErrors.last_name}</div>}
                                </div>

                                <div className="xodim-form-group">
                                    <label>{t("salary")} (UZS) *</label>
                                    <input
                                        type="text"
                                        name="salary"
                                        value={formMode === "add" ? newStaff.salary : currentStaffMember?.salary || ""}
                                        onChange={formMode === "add" ? handleNewStaffChange : handleEditStaffChange}
                                        required
                                        className={formErrors.salary ? "error" : ""}
                                    />
                                    {formErrors.salary && <div className="error-message">{formErrors.salary}</div>}
                                </div>

                                <div className="xodim-form-group">
                                    <label>{t("role")}</label>
                                    <select
                                        name="role"
                                        value={formMode === "add" ? newStaff.role : currentStaffMember?.role || "doctor"}
                                        onChange={formMode === "add" ? handleNewStaffChange : handleEditStaffChange}
                                    >
                                        {staffPositions.map((position) => (
                                            <option key={position.value} value={position.value}>
                                                {position.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="xodim-form-group">
                                    <label>{t("specialization")}</label>
                                    <select
                                        name="specialization"
                                        value={
                                            formMode === "add" ? newStaff.specialization : currentStaffMember?.specialization || "general"
                                        }
                                        onChange={formMode === "add" ? handleNewStaffChange : handleEditStaffChange}
                                    >
                                        {specializationOptions.map((spec) => (
                                            <option key={spec.value} value={spec.value}>
                                                {spec.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="xodim-form-group">
                                    <label>{t("phone")} *</label>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        value={formMode === "add" ? newStaff.phone_number : currentStaffMember?.phone_number || ""}
                                        onChange={formMode === "add" ? handleNewStaffChange : handleEditStaffChange}
                                        required
                                        className={formErrors.phone_number ? "error" : ""}
                                    />
                                    {formErrors.phone_number && <div className="error-message">{formErrors.phone_number}</div>}
                                </div>

                                <div className="xodim-form-group">
                                    <label>{t("status")}</label>
                                    <select
                                        name="status"
                                        value={formMode === "add" ? newStaff.status : currentStaffMember?.status || "faol"}
                                        onChange={formMode === "add" ? handleNewStaffChange : handleEditStaffChange}
                                    >
                                        {statusOptions.map((status) => (
                                            <option key={status.value} value={status.value}>
                                                {status.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Conditional fields based on status */}
                                {(formMode === "add" ? newStaff.status : currentStaffMember?.status) === "nofaol" && (
                                    <div className="xodim-form-group">
                                        <label>{t("reason_for_inactive")} *</label>
                                        <input
                                            type="text"
                                            name="reason_holiday"
                                            value={formMode === "add" ? newStaff.reason_holiday : currentStaffMember?.reason_holiday || ""}
                                            onChange={formMode === "add" ? handleNewStaffChange : handleEditStaffChange}
                                            required
                                            className={formErrors.reason_holiday ? "error" : ""}
                                        />
                                        {formErrors.reason_holiday && <div className="error-message">{formErrors.reason_holiday}</div>}
                                    </div>
                                )}

                                {(formMode === "add" ? newStaff.status : currentStaffMember?.status) === "tatilda" && (
                                    <>
                                        <div className="xodim-form-group">
                                            <label>{t("vacation_start_date")} *</label>
                                            <input
                                                type="date"
                                                name="start_holiday"
                                                value={formMode === "add" ? newStaff.start_holiday : currentStaffMember?.start_holiday || ""}
                                                onChange={formMode === "add" ? handleNewStaffChange : handleEditStaffChange}
                                                required
                                                className={formErrors.start_holiday ? "error" : ""}
                                            />
                                            {formErrors.start_holiday && <div className="error-message">{formErrors.start_holiday}</div>}
                                        </div>

                                        <div className="xodim-form-group">
                                            <label>{t("vacation_end_date")} *</label>
                                            <input
                                                type="date"
                                                name="end_holiday"
                                                value={formMode === "add" ? newStaff.end_holiday : currentStaffMember?.end_holiday || ""}
                                                onChange={formMode === "add" ? handleNewStaffChange : handleEditStaffChange}
                                                required
                                                className={formErrors.end_holiday ? "error" : ""}
                                            />
                                            {formErrors.end_holiday && <div className="error-message">{formErrors.end_holiday}</div>}
                                        </div>

                                        <div className="xodim-form-group">
                                            <label>{t("vacation_reason")} *</label>
                                            <input
                                                type="text"
                                                name="reason_holiday"
                                                value={formMode === "add" ? newStaff.reason_holiday : currentStaffMember?.reason_holiday || ""}
                                                onChange={formMode === "add" ? handleNewStaffChange : handleEditStaffChange}
                                                required
                                                className={formErrors.reason_holiday ? "error" : ""}
                                            />
                                            {formErrors.reason_holiday && <div className="error-message">{formErrors.reason_holiday}</div>}
                                        </div>
                                    </>
                                )}

                                {selectedBranch === "all" && (
                                    <div className="xodim-form-group">
                                        <label>{t("branch")}</label>
                                        <select
                                            name="branch"
                                            value={formMode === "add" ? newStaff.branch : currentStaffMember?.branch || ""}
                                            onChange={formMode === "add" ? handleNewStaffChange : handleEditStaffChange}
                                            required
                                        >
                                            {isLoadingBranches ? (
                                                <option value="">{t("loading")}</option>
                                            ) : branchError ? (
                                                <option value="">{t("error_loading_branches")}</option>
                                            ) : Array.isArray(branches) && branches.length > 0 ? (
                                                branches.map((branch) => (
                                                    <option key={branch.id} value={branch.id.toString()}>
                                                        {branch.name}
                                                    </option>
                                                ))
                                            ) : (
                                                <option value="">{t("no_branches_available")}</option>
                                            )}
                                        </select>
                                    </div>
                                )}

                                <div className="xodim-form-actions">
                                    <button type="submit" className="xodim-btn xodim-btn-primary" disabled={isLoadingStaff}>
                                        {isLoadingStaff ? <FaSpinner className="xodim-spinner" /> : null}{" "}
                                        {formMode === "add" ? t("add") : t("save")}
                                    </button>
                                    <button type="button" className="xodim-btn xodim-btn-secondary" onClick={closeAddSidebar}>
                                        {t("cancel")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}

            {/* Staff Details Modal */}
            {userDetailsModal.isOpen && (
                <StaffDetailsModal
                    isOpen={userDetailsModal.isOpen}
                    onClose={closeUserDetailsModal}
                    user={userDetailsModal.user}
                    staffPositions={staffPositions}
                    specializationOptions={specializationOptions}
                    getBranchName={getBranchName}
                />
            )}

            {/* Confirm Modal */}
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={closeConfirmModal}
                onConfirm={confirmModal.onConfirm}
                title={confirmModal.title}
                message={confirmModal.message}
                confirmText={t("confirm")}
                cancelText={t("cancel")}
                type={confirmModal.type}
            />

            {/* Success Modal */}
            <SuccessModal
                isOpen={successModal.isOpen}
                onClose={closeSuccessModal}
                title={successModal.title}
                message={successModal.message}
            />
        </div>
    )
}
