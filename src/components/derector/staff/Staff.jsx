import React , { useState, useEffect } from "react"
import {
    FaUserPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaTimes,
    FaCheck,
    FaUserMd,
    FaFilter,
    FaMoneyBillWave,
    FaPlane,
} from "react-icons/fa"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"

export default function Staff() {
    const { selectedBranch } = useAuth()
    const { t } = useLanguage()

    // Staff positions
    const staffPositions = [
        { value: "doctor", label: t("doctor") },
        { value: "admin", label: t("admin") },
        { value: "nurse", label: t("nurse") },
        { value: "lab_technician", label: t("lab_technician") },
        { value: "pharmacist", label: t("pharmacist") },
        { value: "receptionist", label: t("receptionist") },
        { value: "accountant", label: t("accountant") },
        { value: "cleaner", label: t("cleaner") },
        { value: "security", label: t("security") },
        { value: "buyer", label: t("buyer") },
        { value: "manager", label: t("manager") },
    ]

    // Mock data for staff
    const initialStaffData = {
        all: [
            {
                id: 1,
                name: "Aziz Karimov",
                role: "doctor",
                department: "Kardiologiya",
                phone: "+998 90 123 45 67",
                email: "aziz@example.com",
                status: "active",
                branch: "branch1",
                salary: 5000000,
                onVacation: false,
                vacationDates: null,
            },
            {
                id: 2,
                name: "Malika Umarova",
                role: "admin",
                department: "Qabul bo'limi",
                phone: "+998 90 234 56 78",
                email: "malika@example.com",
                status: "active",
                branch: "branch1",
                salary: 3500000,
                onVacation: false,
                vacationDates: null,
            },
            {
                id: 3,
                name: "Jasur Toshmatov",
                role: "doctor",
                department: "Nevrologiya",
                phone: "+998 90 345 67 89",
                email: "jasur@example.com",
                status: "active",
                branch: "branch2",
                salary: 4800000,
                onVacation: true,
                vacationDates: "2023-05-20 - 2023-06-05",
            },
            {
                id: 4,
                name: "Nilufar Rahimova",
                role: "nurse",
                department: "Pediatriya",
                phone: "+998 90 456 78 90",
                email: "nilufar@example.com",
                status: "inactive",
                branch: "branch2",
                salary: 2800000,
                onVacation: false,
                vacationDates: null,
            },
            {
                id: 5,
                name: "Sardor Aliyev",
                role: "buyer",
                department: "Xarid bo'limi",
                phone: "+998 90 567 89 01",
                email: "sardor@example.com",
                status: "active",
                branch: "branch3",
                salary: 3200000,
                onVacation: false,
                vacationDates: null,
            },
            {
                id: 6,
                name: "Kamola Yusupova",
                role: "pharmacist",
                department: "Dorixona",
                phone: "+998 90 678 90 12",
                email: "kamola@example.com",
                status: "active",
                branch: "branch3",
                salary: 3000000,
                onVacation: false,
                vacationDates: null,
            },
        ],
        branch1: [
            {
                id: 1,
                name: "Aziz Karimov",
                role: "doctor",
                department: "Kardiologiya",
                phone: "+998 90 123 45 67",
                email: "aziz@example.com",
                status: "active",
                branch: "branch1",
                salary: 5000000,
                onVacation: false,
                vacationDates: null,
            },
            {
                id: 2,
                name: "Malika Umarova",
                role: "admin",
                department: "Qabul bo'limi",
                phone: "+998 90 234 56 78",
                email: "malika@example.com",
                status: "active",
                branch: "branch1",
                salary: 3500000,
                onVacation: false,
                vacationDates: null,
            },
        ],
        branch2: [
            {
                id: 3,
                name: "Jasur Toshmatov",
                role: "doctor",
                department: "Nevrologiya",
                phone: "+998 90 345 67 89",
                email: "jasur@example.com",
                status: "active",
                branch: "branch2",
                salary: 4800000,
                onVacation: true,
                vacationDates: "2023-05-20 - 2023-06-05",
            },
            {
                id: 4,
                name: "Nilufar Rahimova",
                role: "nurse",
                department: "Pediatriya",
                phone: "+998 90 456 78 90",
                email: "nilufar@example.com",
                status: "inactive",
                branch: "branch2",
                salary: 2800000,
                onVacation: false,
                vacationDates: null,
            },
        ],
        branch3: [
            {
                id: 5,
                name: "Sardor Aliyev",
                role: "buyer",
                department: "Xarid bo'limi",
                phone: "+998 90 567 89 01",
                email: "sardor@example.com",
                status: "active",
                branch: "branch3",
                salary: 3200000,
                onVacation: false,
                vacationDates: null,
            },
            {
                id: 6,
                name: "Kamola Yusupova",
                role: "pharmacist",
                department: "Dorixona",
                phone: "+998 90 678 90 12",
                email: "kamola@example.com",
                status: "active",
                branch: "branch3",
                salary: 3000000,
                onVacation: false,
                vacationDates: null,
            },
        ],
    }

    const [initialStaff, setInitialStaff] = useState(
        selectedBranch === "all" ? initialStaffData.all : initialStaffData[selectedBranch],
    )
    const [staff, setStaff] = useState(initialStaff)
    const [searchTerm, setSearchTerm] = useState("")
    const [showSidebar, setShowSidebar] = useState(false)
    const [showEditSidebar, setShowEditSidebar] = useState(false)
    const [currentStaff, setCurrentStaff] = useState(null)
    const [newStaff, setNewStaff] = useState({
        name: "",
        role: "doctor",
        department: "",
        phone: "",
        email: "",
        status: "active",
        branch: selectedBranch === "all" ? "branch1" : selectedBranch,
        salary: 0,
        onVacation: false,
        vacationDates: null,
    })
    const [filterRole, setFilterRole] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterBranch, setFilterBranch] = useState(selectedBranch)
    const [filterVacation, setFilterVacation] = useState("all")
    const [showFilters, setShowFilters] = useState(false)
    const [showStats, setShowStats] = useState(true)

    // Stats calculation
    const [stats, setStats] = useState({
        totalStaff: 0,
        activeStaff: 0,
        onVacation: 0,
        totalSalaries: 0,
        byRole: {},
    })

    // Calculate stats
    useEffect(() => {
        const calculateStats = () => {
            const totalStaff = initialStaff.length
            const activeStaff = initialStaff.filter((s) => s.status === "active").length
            const onVacation = initialStaff.filter((s) => s.onVacation).length
            const totalSalaries = initialStaff.reduce((sum, s) => sum + s.salary, 0)

            // Count by role
            const byRole = {}
            initialStaff.forEach((s) => {
                if (!byRole[s.role]) byRole[s.role] = 0
                byRole[s.role]++
            })

            setStats({
                totalStaff,
                activeStaff,
                onVacation,
                totalSalaries,
                byRole,
            })
        }

        calculateStats()
    }, [initialStaff])

    // Update staff when branch changes
    useEffect(() => {
        if (selectedBranch === "all") {
            setInitialStaff(initialStaffData.all)
            setStaff(initialStaffData.all)
        } else {
            setInitialStaff(initialStaffData[selectedBranch])
            setStaff(initialStaffData[selectedBranch])
        }

        setNewStaff({
            ...newStaff,
            branch: selectedBranch === "all" ? "branch1" : selectedBranch,
        })

        setFilterBranch(selectedBranch)
    }, [selectedBranch])

    // Filter staff based on search term, role, status, branch and vacation
    useEffect(() => {
        let filteredStaff = [...initialStaff]

        // Filter by search term
        if (searchTerm) {
            filteredStaff = filteredStaff.filter(
                (person) =>
                    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    person.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    person.email.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        // Filter by role
        if (filterRole !== "all") {
            filteredStaff = filteredStaff.filter((person) => person.role === filterRole)
        }

        // Filter by status
        if (filterStatus !== "all") {
            filteredStaff = filteredStaff.filter((person) => person.status === filterStatus)
        }

        // Filter by branch (if viewing all branches)
        if (selectedBranch === "all" && filterBranch !== "all") {
            filteredStaff = filteredStaff.filter((person) => person.branch === filterBranch)
        }

        // Filter by vacation status
        if (filterVacation !== "all") {
            filteredStaff = filteredStaff.filter((person) =>
                filterVacation === "on_vacation" ? person.onVacation : !person.onVacation,
            )
        }

        setStaff(filteredStaff)
    }, [searchTerm, filterRole, filterStatus, filterBranch, filterVacation, initialStaff])

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    // Handle new staff input change
    const handleNewStaffChange = (e) => {
        const { name, value, type, checked } = e.target
        setNewStaff({
            ...newStaff,
            [name]: type === "checkbox" ? checked : name === "salary" ? (value === "" ? 0 : Number.parseInt(value)) : value,
        })
    }

    // Handle edit staff input change
    const handleEditStaffChange = (e) => {
        const { name, value, type, checked } = e.target
        setCurrentStaff({
            ...currentStaff,
            [name]: type === "checkbox" ? checked : name === "salary" ? Number.parseInt(value) : value,
        })
    }

    // Toggle filters
    const toggleFilters = () => {
        setShowFilters(!showFilters)
    }

    // Toggle stats
    const toggleStats = () => {
        setShowStats(!showStats)
    }

    // Open add sidebar
    const openAddSidebar = () => {
        setShowSidebar(true)
    }

    // Close add sidebar
    const closeAddSidebar = () => {
        setShowSidebar(false)
        setNewStaff({
            name: "",
            role: "doctor",
            department: "",
            phone: "",
            email: "",
            status: "active",
            branch: selectedBranch === "all" ? "branch1" : selectedBranch,
            salary: 0,
            onVacation: false,
            vacationDates: null,
        })
    }

    // Open edit sidebar
    const openEditSidebar = (person) => {
        setCurrentStaff(person)
        setShowEditSidebar(true)
    }

    // Close edit sidebar
    const closeEditSidebar = () => {
        setShowEditSidebar(false)
        setCurrentStaff(null)
    }

    // Add new staff
    const addStaff = (e) => {
        e.preventDefault()
        const id = Math.max(...initialStaffData.all.map((p) => p.id)) + 1
        const newStaffMember = { ...newStaff, id }

        // Update all staff data
        const updatedAllStaff = [...initialStaffData.all, newStaffMember]
        initialStaffData.all = updatedAllStaff

        // Update branch-specific staff data
        initialStaffData[newStaffMember.branch] = [...initialStaffData[newStaffMember.branch], newStaffMember]

        // Update current view
        if (selectedBranch === "all" || selectedBranch === newStaffMember.branch) {
            setInitialStaff((prev) => [...prev, newStaffMember])
        }

        closeAddSidebar()
    }

    // Update staff
    const updateStaff = (e) => {
        e.preventDefault()

        // Update in all staff data
        const updatedAllStaff = initialStaffData.all.map((person) =>
            person.id === currentStaff.id ? currentStaff : person,
        )
        initialStaffData.all = updatedAllStaff

        // Update in branch-specific data
        // First remove from old branch if branch changed
        if (currentStaff.branch !== currentStaff._prevBranch && currentStaff._prevBranch) {
            initialStaffData[currentStaff._prevBranch] = initialStaffData[currentStaff._prevBranch].filter(
                (person) => person.id !== currentStaff.id,
            )
        }

        // Then add to new branch
        if (initialStaffData[currentStaff.branch]) {
            initialStaffData[currentStaff.branch] = initialStaffData[currentStaff.branch].filter(
                (person) => person.id !== currentStaff.id,
            )
            initialStaffData[currentStaff.branch].push(currentStaff)
        }

        // Update current view
        if (selectedBranch === "all") {
            setInitialStaff(updatedAllStaff)
        } else if (selectedBranch === currentStaff.branch) {
            setInitialStaff(initialStaffData[selectedBranch])
        }

        closeEditSidebar()
    }

    // Delete staff
    const deleteStaff = (id) => {
        if (window.confirm(t("confirm_delete_staff"))) {
            // Find the staff member to get their branch
            const staffToDelete = initialStaffData.all.find((person) => person.id === id)

            // Remove from all staff data
            initialStaffData.all = initialStaffData.all.filter((person) => person.id !== id)

            // Remove from branch-specific data
            if (staffToDelete && staffToDelete.branch) {
                initialStaffData[staffToDelete.branch] = initialStaffData[staffToDelete.branch].filter(
                    (person) => person.id !== id,
                )
            }

            // Update current view
            setInitialStaff((prev) => prev.filter((person) => person.id !== id))
        }
    }

    // Get role label
    const getRoleLabel = (roleValue) => {
        const role = staffPositions.find((pos) => pos.value === roleValue)
        return role ? role.label : roleValue
    }

    // Fetch staff data
    // useEffect(() => {
    //   // Simulate API call
    //   setTimeout(() => {
    //     setStaffData([
    //       {
    //         id: 1,
    //         name: "Dr. Alisher Karimov",
    //         role: "doctor",
    //         specialty: "Cardiologist",
    //         phone: "+998 90 123 45 67",
    //         email: "alisher@clinic.uz",
    //         status: "active",
    //       },
    //       {
    //         id: 2,
    //         name: "Dr. Nodira Azimova",
    //         role: "doctor",
    //         specialty: "Neurologist",
    //         phone: "+998 90 765 43 21",
    //         email: "nodira@clinic.uz",
    //         status: "active",
    //       },
    //       {
    //         id: 3,
    //         name: "Kamola Rakhimova",
    //         role: "admin",
    //         specialty: "",
    //         phone: "+998 90 555 55 55",
    //         email: "kamola@clinic.uz",
    //         status: "active",
    //       },
    //       {
    //         id: 4,
    //         name: "Dilshod Umarov",
    //         role: "nurse",
    //         specialty: "",
    //         phone: "+998 90 333 33 33",
    //         email: "dilshod@clinic.uz",
    //         status: "vacation",
    //       },
    //       {
    //         id: 5,
    //         name: "Gulnora Karimova",
    //         role: "pharmacist",
    //         specialty: "",
    //         phone: "+998 90 222 22 22",
    //         email: "gulnora@clinic.uz",
    //         status: "active",
    //       },
    //       {
    //         id: 6,
    //         name: "Rustam Khasanov",
    //         role: "buyer",
    //         specialty: "",
    //         phone: "+998 90 111 11 11",
    //         email: "rustam@clinic.uz",
    //         status: "active",
    //       },
    //     ])
    //     setIsLoading(false)
    //   }, 1000)
    // }, [])

    // Handle search
    // const handleSearch = (e) => {
    //   setSearchTerm(e.target.value)
    // }

    // Filter staff based on search term
    // const filteredStaff = staffData.filter(
    //   (staff) =>
    //     staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     staff.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     staff.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     staff.email.toLowerCase().includes(searchTerm.toLowerCase()),
    // )

    // Handle input change for new staff
    // const handleInputChange = (e) => {
    //   const { name, value } = e.target
    //   setNewStaff({
    //     ...newStaff,
    //     [name]: value,
    //   })
    // }

    // Handle add staff
    // const handleAddStaff = (e) => {
    //   e.preventDefault()
    //   const newStaffMember = {
    //     id: staffData.length + 1,
    //     ...newStaff,
    //   }
    //   setStaffData([...staffData, newStaffMember])
    //   setNewStaff({
    //     name: "",
    //     role: "doctor",
    //     specialty: "",
    //     phone: "",
    //     email: "",
    //     status: "active",
    //   })
    //   setShowAddModal(false)
    // }

    // Get role icon
    // const getRoleIcon = (role) => {
    //   switch (role) {
    //     case "doctor":
    //       return <FaUserMd className="staff-role-icon doctor" />
    //     case "admin":
    //       return <FaUserTie className="staff-role-icon admin" />
    //     case "nurse":
    //       return <FaUserNurse className="staff-role-icon nurse" />
    //     default:
    //       return <FaUser className="staff-role-icon" />
    //   }
    // }

    return (
        <div className="xodim-container">
            <div className="xodim-header">
                <h1 className="xodim-title">{t("staff")}</h1>
                <div className="xodim-actions">
                    <button className="xodim-btn xodim-btn-outline xodim-btn-icon" onClick={toggleStats}>
                        {showStats ? <FaTimes /> : <FaMoneyBillWave />} {showStats ? t("close_stats") : t("statistics")}
                    </button>
                    <button className="xodim-btn xodim-btn-primary xodim-btn-icon" onClick={openAddSidebar}>
                        <FaUserPlus /> {t("add_new_staff")}
                    </button>
                </div>
            </div>

            {showStats && (
                <div className="xodim-stats-container">
                    <div className="xodim-stats-grid">
                        <div className="xodim-stat-card">
                            <div className="xodim-stat-icon-wrapper">
                                <FaUserMd className="xodim-stat-icon" />
                            </div>
                            <div className="xodim-stat-content">
                                <div className="xodim-stat-value">{stats.totalStaff}</div>
                                <div className="xodim-stat-label">{t("total_staff")}</div>
                            </div>
                        </div>

                        <div className="xodim-stat-card">
                            <div className="xodim-stat-icon-wrapper">
                                <FaCheck className="xodim-stat-icon" />
                            </div>
                            <div className="xodim-stat-content">
                                <div className="xodim-stat-value">{stats.activeStaff}</div>
                                <div className="xodim-stat-label">{t("active_staff")}</div>
                            </div>
                        </div>

                        <div className="xodim-stat-card">
                            <div className="xodim-stat-icon-wrapper">
                                <FaPlane className="xodim-stat-icon" />
                            </div>
                            <div className="xodim-stat-content">
                                <div className="xodim-stat-value">{stats.onVacation}</div>
                                <div className="xodim-stat-label">{t("staff_on_vacation")}</div>
                            </div>
                        </div>

                        <div className="xodim-stat-card">
                            <div className="xodim-stat-icon-wrapper">
                                <FaMoneyBillWave className="xodim-stat-icon" />
                            </div>
                            <div className="xodim-stat-content">
                                <div className="xodim-stat-value">
                                    {stats.totalSalaries.toLocaleString()} {t("currency")}
                                </div>
                                <div className="xodim-stat-label">{t("total_salary")}</div>
                            </div>
                        </div>
                    </div>

                    <div className="xodim-role-distribution">
                        <h3>{t("role_distribution")}</h3>
                        <div className="xodim-role-bars">
                            {Object.entries(stats.byRole).map(([role, count]) => (
                                <div className="xodim-role-bar-item" key={role}>
                                    <div className="xodim-role-info">
                                        <span className="xodim-role-name">{getRoleLabel(role)}</span>
                                        <span className="xodim-role-count">{count}</span>
                                    </div>
                                    <div className="xodim-role-bar-container">
                                        <div
                                            className="xodim-role-bar-fill"
                                            style={{ width: `${(count / stats.totalStaff) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
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
                            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
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
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                <option value="active">{t("active")}</option>
                                <option value="inactive">{t("inactive")}</option>
                            </select>
                        </div>

                        {selectedBranch === "all" && (
                            <div className="xodim-filter-group">
                                <label>{t("branch")}:</label>
                                <select value={filterBranch} onChange={(e) => setFilterBranch(e.target.value)}>
                                    <option value="all">{t("all")}</option>
                                    <option value="branch1">{t("branch1")}</option>
                                    <option value="branch2">{t("branch2")}</option>
                                    <option value="branch3">{t("branch3")}</option>
                                </select>
                            </div>
                        )}

                        <div className="xodim-filter-group">
                            <label>{t("vacation_status")}:</label>
                            <select value={filterVacation} onChange={(e) => setFilterVacation(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                <option value="on_vacation">{t("on_vacation")}</option>
                                <option value="not_on_vacation">{t("at_work")}</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="xodim-dashboard-card">
                <div className="xodim-table-responsive">
                    <table className="xodim-data-table">
                        <thead>
                            <tr>
                                <th>{t("name")}</th>
                                <th>{t("position")}</th>
                                <th>{t("department")}</th>
                                <th>{t("phone")}</th>
                                <th>{t("monthly_salary")}</th>
                                <th>{t("vacation_status")}</th>
                                <th>{t("status")}</th>
                                <th>{t("actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staff.map((person) => (
                                <tr key={person.id}>
                                    <td>{person.name}</td>
                                    <td>
                                        <div className={`xodim-role-badge ${person.role}`}>{getRoleLabel(person.role)}</div>
                                    </td>
                                    <td>{person.department}</td>
                                    <td>{person.phone}</td>
                                    <td>
                                        {person.salary.toLocaleString()} {t("currency")}
                                    </td>
                                    <td>
                                        <div className={`xodim-vacation-badge ${person.onVacation ? "on-vacation" : "working"}`}>
                                            {person.onVacation ? (
                                                <>
                                                    <FaPlane /> {t("on_vacation")}
                                                </>
                                            ) : (
                                                <>
                                                    <FaCheck /> {t("at_work")}
                                                </>
                                            )}
                                        </div>
                                        {person.onVacation && person.vacationDates && (
                                            <div className="xodim-vacation-dates">{person.vacationDates}</div>
                                        )}
                                    </td>
                                    <td>
                                        <div className={`xodim-status-badge ${person.status}`}>
                                            {person.status === "active" ? (
                                                <>
                                                    <FaCheck /> {t("active")}
                                                </>
                                            ) : (
                                                <>
                                                    <FaTimes /> {t("inactive")}
                                                </>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="xodim-action-buttons">
                                            <button className="xodim-btn-icon xodim-edit" onClick={() => openEditSidebar(person)}>
                                                <FaEdit />
                                            </button>
                                            <button className="xodim-btn-icon xodim-delete" onClick={() => deleteStaff(person.id)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {staff.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="xodim-no-data">
                                        {t("no_data_found")}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Staff Sidebar */}
            <div className={`xodim-sidebar-overlay ${showSidebar ? "active" : ""}`} onClick={closeAddSidebar}></div>
            <div className={`xodim-sidebar ${showSidebar ? "active" : ""}`}>
                <div className="xodim-sidebar-header">
                    <h2>{t("add_new_staff")}</h2>
                    <button className="xodim-close-button" onClick={closeAddSidebar}>
                        <FaTimes />
                    </button>
                </div>
                <div className="xodim-sidebar-content">
                    <form onSubmit={addStaff}>
                        <div className="xodim-form-group">
                            <label>{t("full_name")}</label>
                            <input type="text" name="name" value={newStaff.name} onChange={handleNewStaffChange} required />
                        </div>

                        <div className="xodim-form-group">
                            <label>{t("position")}</label>
                            <select name="role" value={newStaff.role} onChange={handleNewStaffChange} required>
                                {staffPositions.map((position) => (
                                    <option key={position.value} value={position.value}>
                                        {position.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="xodim-form-group">
                            <label>{t("department")}</label>
                            <input
                                type="text"
                                name="department"
                                value={newStaff.department}
                                onChange={handleNewStaffChange}
                                required
                            />
                        </div>

                        <div className="xodim-form-group">
                            <label>{t("phone")}</label>
                            <input type="text" name="phone" value={newStaff.phone} onChange={handleNewStaffChange} required />
                        </div>

                        <div className="xodim-form-group">
                            <label>{t("email")}</label>
                            <input type="email" name="email" value={newStaff.email} onChange={handleNewStaffChange} required />
                        </div>

                        <div className="xodim-form-group">
                            <label>
                                {t("monthly_salary")} ({t("currency")})
                            </label>
                            <input type="number" name="salary" value={newStaff.salary} onChange={handleNewStaffChange} required />
                        </div>

                        <div className="xodim-form-group">
                            <label>{t("status")}</label>
                            <select name="status" value={newStaff.status} onChange={handleNewStaffChange}>
                                <option value="active">{t("active")}</option>
                                <option value="inactive">{t("inactive")}</option>
                            </select>
                        </div>

                        <div className="xodim-form-group xodim-checkbox-group">
                            <input
                                type="checkbox"
                                id="onVacation"
                                name="onVacation"
                                checked={newStaff.onVacation}
                                onChange={handleNewStaffChange}
                            />
                            <label htmlFor="onVacation">{t("on_vacation")}</label>
                        </div>

                        {newStaff.onVacation && (
                            <div className="xodim-form-group">
                                <label>{t("vacation_period")}</label>
                                <input
                                    type="text"
                                    name="vacationDates"
                                    value={newStaff.vacationDates || ""}
                                    onChange={handleNewStaffChange}
                                    placeholder={t("vacation_period_example")}
                                />
                            </div>
                        )}

                        {selectedBranch === "all" && (
                            <div className="xodim-form-group">
                                <label>{t("branch")}</label>
                                <select name="branch" value={newStaff.branch} onChange={handleNewStaffChange}>
                                    <option value="branch1">{t("branch1")}</option>
                                    <option value="branch2">{t("branch2")}</option>
                                    <option value="branch3">{t("branch3")}</option>
                                </select>
                            </div>
                        )}

                        <div className="xodim-form-actions">
                            <button type="submit" className="xodim-btn xodim-btn-primary">
                                {t("add")}
                            </button>
                            <button type="button" className="xodim-btn xodim-btn-secondary" onClick={closeAddSidebar}>
                                {t("cancel")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Edit Staff Sidebar */}
            <div className={`xodim-sidebar-overlay ${showEditSidebar ? "active" : ""}`} onClick={closeEditSidebar}></div>
            <div className={`xodim-sidebar ${showEditSidebar ? "active" : ""}`}>
                {currentStaff && (
                    <>
                        <div className="xodim-sidebar-header">
                            <h2>{t("edit_staff")}</h2>
                            <button className="xodim-close-button" onClick={closeEditSidebar}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="xodim-sidebar-content">
                            <form onSubmit={updateStaff}>
                                <div className="xodim-form-group">
                                    <label>{t("full_name")}</label>
                                    <input type="text" name="name" value={currentStaff.name} onChange={handleEditStaffChange} required />
                                </div>

                                <div className="xodim-form-group">
                                    <label>{t("position")}</label>
                                    <select name="role" value={currentStaff.role} onChange={handleEditStaffChange} required>
                                        {staffPositions.map((position) => (
                                            <option key={position.value} value={position.value}>
                                                {position.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="xodim-form-group">
                                    <label>{t("department")}</label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={currentStaff.department}
                                        onChange={handleEditStaffChange}
                                        required
                                    />
                                </div>

                                <div className="xodim-form-group">
                                    <label>{t("phone")}</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={currentStaff.phone}
                                        onChange={handleEditStaffChange}
                                        required
                                    />
                                </div>

                                <div className="xodim-form-group">
                                    <label>{t("email")}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={currentStaff.email}
                                        onChange={handleEditStaffChange}
                                        required
                                    />
                                </div>

                                <div className="xodim-form-group">
                                    <label>
                                        {t("monthly_salary")} ({t("currency")})
                                    </label>
                                    <input
                                        type="number"
                                        name="salary"
                                        value={currentStaff.salary}
                                        onChange={handleEditStaffChange}
                                        required
                                    />
                                </div>

                                <div className="xodim-form-group">
                                    <label>{t("status")}</label>
                                    <select name="status" value={currentStaff.status} onChange={handleEditStaffChange}>
                                        <option value="active">{t("active")}</option>
                                        <option value="inactive">{t("inactive")}</option>
                                    </select>
                                </div>

                                <div className="xodim-form-group xodim-checkbox-group">
                                    <input
                                        type="checkbox"
                                        id="editOnVacation"
                                        name="onVacation"
                                        checked={currentStaff.onVacation}
                                        onChange={handleEditStaffChange}
                                    />
                                    <label htmlFor="editOnVacation">{t("on_vacation")}</label>
                                </div>

                                {currentStaff.onVacation && (
                                    <div className="xodim-form-group">
                                        <label>{t("vacation_period")}</label>
                                        <input
                                            type="text"
                                            name="vacationDates"
                                            value={currentStaff.vacationDates || ""}
                                            onChange={handleEditStaffChange}
                                            placeholder={t("vacation_period_example")}
                                        />
                                    </div>
                                )}

                                {selectedBranch === "all" && (
                                    <div className="xodim-form-group">
                                        <label>{t("branch")}</label>
                                        <select
                                            name="branch"
                                            value={currentStaff.branch}
                                            onChange={(e) => {
                                                const newValue = e.target.value
                                                setCurrentStaff((prev) => ({
                                                    ...prev,
                                                    _prevBranch: prev.branch,
                                                    branch: newValue,
                                                }))
                                            }}
                                        >
                                            <option value="branch1">{t("branch1")}</option>
                                            <option value="branch2">{t("branch2")}</option>
                                            <option value="branch3">{t("branch3")}</option>
                                        </select>
                                    </div>
                                )}

                                <div className="xodim-form-actions">
                                    <button type="submit" className="xodim-btn xodim-btn-primary">
                                        {t("save")}
                                    </button>
                                    <button type="button" className="xodim-btn xodim-btn-secondary" onClick={closeEditSidebar}>
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
};