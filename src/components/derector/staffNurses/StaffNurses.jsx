import React , { useState, useEffect } from "react"
import {
    FaUserPlus,
    FaSearch,
    FaEdit,
    FaTrash,
    FaTimes,
    FaCheck,
    FaUserNurse,
    FaFilter,
    FaMoneyBillWave,
    FaPlane,
    FaFilePdf,
    FaFileExcel,
} from "react-icons/fa"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"

export default function StaffNurses() {
    const { selectedBranch } = useAuth()
    const { t } = useLanguage()

    // Nurse specialties
    const nurseSpecialties = [
        { value: "general", label: t("general_nurse") },
        { value: "pediatric", label: t("pediatric_nurse") },
        { value: "surgical", label: t("surgical_nurse") },
        { value: "icu", label: t("icu_nurse") },
        { value: "emergency", label: t("emergency_nurse") },
        { value: "psychiatric", label: t("psychiatric_nurse") },
        { value: "geriatric", label: t("geriatric_nurse") },
        { value: "obstetric", label: t("obstetric_nurse") },
        { value: "oncology", label: t("oncology_nurse") },
        { value: "anesthetic", label: t("anesthetic_nurse") },
    ]

    // Mock data for nurses
    const initialNursesData = {
        all: [
            {
                id: 1,
                name: "Nilufar Rahimova",
                specialty: "pediatric",
                department: "Pediatriya",
                phone: "+998 90 456 78 90",
                email: "nilufar@example.com",
                status: "active",
                branch: "branch2",
                salary: 2800000,
                onVacation: false,
                vacationDates: null,
                experience: 5,
                patients: 80,
                rating: 4.7,
                education: "Toshkent Tibbiyot Kolleji",
                certifications: ["Pediatriya hamshiraligi", "Bolalar reanimatsiyasi"],
                schedule: "Dushanba-Juma: 08:00-16:00",
                shift: "morning",
            },
            {
                id: 2,
                name: "Zarina Umarova",
                specialty: "surgical",
                department: "Jarrohlik",
                phone: "+998 90 567 89 01",
                email: "zarina@example.com",
                status: "active",
                branch: "branch1",
                salary: 3000000,
                onVacation: false,
                vacationDates: null,
                experience: 7,
                patients: 65,
                rating: 4.5,
                education: "Samarqand Tibbiyot Kolleji",
                certifications: ["Jarrohlik hamshiraligi", "Sterilizatsiya"],
                schedule: "Dushanba-Juma: 09:00-17:00",
                shift: "morning",
            },
            {
                id: 3,
                name: "Gulnora Karimova",
                specialty: "icu",
                department: "Reanimatsiya",
                phone: "+998 90 678 90 12",
                email: "gulnora@example.com",
                status: "active",
                branch: "branch3",
                salary: 3200000,
                onVacation: true,
                vacationDates: "2023-06-10 - 2023-06-25",
                experience: 9,
                patients: 45,
                rating: 4.9,
                education: "Toshkent Tibbiyot Kolleji",
                certifications: ["Reanimatsiya hamshiraligi", "Yurak-o'pka reanimatsiyasi"],
                schedule: "Dushanba-Juma: 08:00-20:00",
                shift: "night",
            },
            {
                id: 4,
                name: "Malika Azimova",
                specialty: "general",
                department: "Terapiya",
                phone: "+998 90 789 01 23",
                email: "malika@example.com",
                status: "inactive",
                branch: "branch1",
                salary: 2600000,
                onVacation: false,
                vacationDates: null,
                experience: 3,
                patients: 90,
                rating: 4.2,
                education: "Andijon Tibbiyot Kolleji",
                certifications: ["Umumiy hamshiralik"],
                schedule: "Dushanba-Juma: 09:00-17:00",
                shift: "morning",
            },
            {
                id: 5,
                name: "Dilfuza Yusupova",
                specialty: "emergency",
                department: "Shoshilinch",
                phone: "+998 90 890 12 34",
                email: "dilfuza@example.com",
                status: "active",
                branch: "branch2",
                salary: 3100000,
                onVacation: false,
                vacationDates: null,
                experience: 6,
                patients: 110,
                rating: 4.6,
                education: "Toshkent Tibbiyot Kolleji",
                certifications: ["Shoshilinch tibbiy yordam", "Travmatologiya"],
                schedule: "Seshanba-Shanba: 08:00-20:00",
                shift: "evening",
            },
            {
                id: 6,
                name: "Nargiza Toshmatova",
                specialty: "obstetric",
                department: "Ginekologiya",
                phone: "+998 90 901 23 45",
                email: "nargiza@example.com",
                status: "active",
                branch: "branch3",
                salary: 2900000,
                onVacation: false,
                vacationDates: null,
                experience: 4,
                patients: 75,
                rating: 4.4,
                education: "Farg'ona Tibbiyot Kolleji",
                certifications: ["Akusherlik", "Chaqaloq parvarishi"],
                schedule: "Dushanba-Juma: 09:00-17:00",
                shift: "morning",
            },
        ],
        branch1: [
            {
                id: 2,
                name: "Zarina Umarova",
                specialty: "surgical",
                department: "Jarrohlik",
                phone: "+998 90 567 89 01",
                email: "zarina@example.com",
                status: "active",
                branch: "branch1",
                salary: 3000000,
                onVacation: false,
                vacationDates: null,
                experience: 7,
                patients: 65,
                rating: 4.5,
                education: "Samarqand Tibbiyot Kolleji",
                certifications: ["Jarrohlik hamshiraligi", "Sterilizatsiya"],
                schedule: "Dushanba-Juma: 09:00-17:00",
                shift: "morning",
            },
            {
                id: 4,
                name: "Malika Azimova",
                specialty: "general",
                department: "Terapiya",
                phone: "+998 90 789 01 23",
                email: "malika@example.com",
                status: "inactive",
                branch: "branch1",
                salary: 2600000,
                onVacation: false,
                vacationDates: null,
                experience: 3,
                patients: 90,
                rating: 4.2,
                education: "Andijon Tibbiyot Kolleji",
                certifications: ["Umumiy hamshiralik"],
                schedule: "Dushanba-Juma: 09:00-17:00",
                shift: "morning",
            },
        ],
        branch2: [
            {
                id: 1,
                name: "Nilufar Rahimova",
                specialty: "pediatric",
                department: "Pediatriya",
                phone: "+998 90 456 78 90",
                email: "nilufar@example.com",
                status: "active",
                branch: "branch2",
                salary: 2800000,
                onVacation: false,
                vacationDates: null,
                experience: 5,
                patients: 80,
                rating: 4.7,
                education: "Toshkent Tibbiyot Kolleji",
                certifications: ["Pediatriya hamshiraligi", "Bolalar reanimatsiyasi"],
                schedule: "Dushanba-Juma: 08:00-16:00",
                shift: "morning",
            },
            {
                id: 5,
                name: "Dilfuza Yusupova",
                specialty: "emergency",
                department: "Shoshilinch",
                phone: "+998 90 890 12 34",
                email: "dilfuza@example.com",
                status: "active",
                branch: "branch2",
                salary: 3100000,
                onVacation: false,
                vacationDates: null,
                experience: 6,
                patients: 110,
                rating: 4.6,
                education: "Toshkent Tibbiyot Kolleji",
                certifications: ["Shoshilinch tibbiy yordam", "Travmatologiya"],
                schedule: "Seshanba-Shanba: 08:00-20:00",
                shift: "evening",
            },
        ],
        branch3: [
            {
                id: 3,
                name: "Gulnora Karimova",
                specialty: "icu",
                department: "Reanimatsiya",
                phone: "+998 90 678 90 12",
                email: "gulnora@example.com",
                status: "active",
                branch: "branch3",
                salary: 3200000,
                onVacation: true,
                vacationDates: "2023-06-10 - 2023-06-25",
                experience: 9,
                patients: 45,
                rating: 4.9,
                education: "Toshkent Tibbiyot Kolleji",
                certifications: ["Reanimatsiya hamshiraligi", "Yurak-o'pka reanimatsiyasi"],
                schedule: "Dushanba-Juma: 08:00-20:00",
                shift: "night",
            },
            {
                id: 6,
                name: "Nargiza Toshmatova",
                specialty: "obstetric",
                department: "Ginekologiya",
                phone: "+998 90 901 23 45",
                email: "nargiza@example.com",
                status: "active",
                branch: "branch3",
                salary: 2900000,
                onVacation: false,
                vacationDates: null,
                experience: 4,
                patients: 75,
                rating: 4.4,
                education: "Farg'ona Tibbiyot Kolleji",
                certifications: ["Akusherlik", "Chaqaloq parvarishi"],
                schedule: "Dushanba-Juma: 09:00-17:00",
                shift: "morning",
            },
        ],
    }

    const [initialNurses, setInitialNurses] = useState(
        selectedBranch === "all" ? initialNursesData.all : initialNursesData[selectedBranch],
    )
    const [nurses, setNurses] = useState(initialNurses)
    const [searchTerm, setSearchTerm] = useState("")
    const [showSidebar, setShowSidebar] = useState(false)
    const [showEditSidebar, setShowEditSidebar] = useState(false)
    const [currentNurse, setCurrentNurse] = useState(null)
    const [newNurse, setNewNurse] = useState({
        name: "",
        specialty: "general",
        department: "",
        phone: "",
        email: "",
        status: "active",
        branch: selectedBranch === "all" ? "branch1" : selectedBranch,
        salary: 0,
        onVacation: false,
        vacationDates: null,
        experience: 0,
        patients: 0,
        rating: 0,
        education: "",
        certifications: [],
        schedule: "",
        shift: "morning",
    })
    const [filterSpecialty, setFilterSpecialty] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")
    const [filterBranch, setFilterBranch] = useState(selectedBranch)
    const [filterVacation, setFilterVacation] = useState("all")
    const [filterShift, setFilterShift] = useState("all")
    const [showFilters, setShowFilters] = useState(false)
    const [showStats, setShowStats] = useState(true)
    const [showNurseDetails, setShowNurseDetails] = useState(false)
    const [selectedNurse, setSelectedNurse] = useState(null)
    const [newCertification, setNewCertification] = useState("")

    // Stats calculation
    const [stats, setStats] = useState({
        totalNurses: 0,
        activeNurses: 0,
        onVacation: 0,
        totalSalaries: 0,
        bySpecialty: {},
        byShift: {},
        averageExperience: 0,
        totalPatients: 0,
        averageRating: 0,
    })

    // Calculate stats
    useEffect(() => {
        const calculateStats = () => {
            const totalNurses = initialNurses.length
            const activeNurses = initialNurses.filter((n) => n.status === "active").length
            const onVacation = initialNurses.filter((n) => n.onVacation).length
            const totalSalaries = initialNurses.reduce((sum, n) => sum + n.salary, 0)
            const totalExperience = initialNurses.reduce((sum, n) => sum + n.experience, 0)
            const totalPatients = initialNurses.reduce((sum, n) => sum + n.patients, 0)
            const totalRating = initialNurses.reduce((sum, n) => sum + n.rating, 0)

            // Count by specialty
            const bySpecialty = {}
            initialNurses.forEach((n) => {
                if (!bySpecialty[n.specialty]) bySpecialty[n.specialty] = 0
                bySpecialty[n.specialty]++
            })

            // Count by shift
            const byShift = {
                morning: 0,
                evening: 0,
                night: 0,
            }
            initialNurses.forEach((n) => {
                if (n.shift) byShift[n.shift]++
            })

            setStats({
                totalNurses,
                activeNurses,
                onVacation,
                totalSalaries,
                bySpecialty,
                byShift,
                averageExperience: totalNurses ? (totalExperience / totalNurses).toFixed(1) : 0,
                totalPatients,
                averageRating: totalNurses ? (totalRating / totalNurses).toFixed(1) : 0,
            })
        }

        calculateStats()
    }, [initialNurses])

    // Update nurses when branch changes
    useEffect(() => {
        if (selectedBranch === "all") {
            setInitialNurses(initialNursesData.all)
            setNurses(initialNursesData.all)
        } else {
            setInitialNurses(initialNursesData[selectedBranch])
            setNurses(initialNursesData[selectedBranch])
        }

        setNewNurse({
            ...newNurse,
            branch: selectedBranch === "all" ? "branch1" : selectedBranch,
        })

        setFilterBranch(selectedBranch)
    }, [selectedBranch])

    // Filter nurses based on search term, specialty, status, branch, vacation and shift
    useEffect(() => {
        let filteredNurses = [...initialNurses]

        // Filter by search term
        if (searchTerm) {
            filteredNurses = filteredNurses.filter(
                (nurse) =>
                    nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    nurse.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    nurse.email.toLowerCase().includes(searchTerm.toLowerCase()),
            )
        }

        // Filter by specialty
        if (filterSpecialty !== "all") {
            filteredNurses = filteredNurses.filter((nurse) => nurse.specialty === filterSpecialty)
        }

        // Filter by status
        if (filterStatus !== "all") {
            filteredNurses = filteredNurses.filter((nurse) => nurse.status === filterStatus)
        }

        // Filter by branch (if viewing all branches)
        if (selectedBranch === "all" && filterBranch !== "all") {
            filteredNurses = filteredNurses.filter((nurse) => nurse.branch === filterBranch)
        }

        // Filter by vacation status
        if (filterVacation !== "all") {
            filteredNurses = filteredNurses.filter((nurse) =>
                filterVacation === "on_vacation" ? nurse.onVacation : !nurse.onVacation,
            )
        }

        // Filter by shift
        if (filterShift !== "all") {
            filteredNurses = filteredNurses.filter((nurse) => nurse.shift === filterShift)
        }

        setNurses(filteredNurses)
    }, [searchTerm, filterSpecialty, filterStatus, filterBranch, filterVacation, filterShift, initialNurses])

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value)
    }

    // Handle new nurse input change
    const handleNewNurseChange = (e) => {
        const { name, value, type, checked } = e.target
        setNewNurse({
            ...newNurse,
            [name]:
                type === "checkbox"
                    ? checked
                    : name === "salary" || name === "experience" || name === "patients" || name === "rating"
                        ? value === ""
                            ? 0
                            : Number(value)
                        : value,
        })
    }

    // Handle edit nurse input change
    const handleEditNurseChange = (e) => {
        const { name, value, type, checked } = e.target
        setCurrentNurse({
            ...currentNurse,
            [name]:
                type === "checkbox"
                    ? checked
                    : name === "salary" || name === "experience" || name === "patients" || name === "rating"
                        ? Number(value)
                        : value,
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
        setNewNurse({
            name: "",
            specialty: "general",
            department: "",
            phone: "",
            email: "",
            status: "active",
            branch: selectedBranch === "all" ? "branch1" : selectedBranch,
            salary: 0,
            onVacation: false,
            vacationDates: null,
            experience: 0,
            patients: 0,
            rating: 0,
            education: "",
            certifications: [],
            schedule: "",
            shift: "morning",
        })
        setNewCertification("")
    }

    // Open edit sidebar
    const openEditSidebar = (nurse) => {
        setCurrentNurse(nurse)
        setShowEditSidebar(true)
    }

    // Close edit sidebar
    const closeEditSidebar = () => {
        setShowEditSidebar(false)
        setCurrentNurse(null)
    }

    // Add new nurse
    const addNurse = (e) => {
        e.preventDefault()
        const id = Math.max(...initialNursesData.all.map((n) => n.id)) + 1
        const newNurseMember = { ...newNurse, id }

        // Update all nurses data
        const updatedAllNurses = [...initialNursesData.all, newNurseMember]
        initialNursesData.all = updatedAllNurses

        // Update branch-specific nurses data
        initialNursesData[newNurseMember.branch] = [...initialNursesData[newNurseMember.branch], newNurseMember]

        // Update current view
        if (selectedBranch === "all" || selectedBranch === newNurseMember.branch) {
            setInitialNurses((prev) => [...prev, newNurseMember])
        }

        closeAddSidebar()
    }

    // Update nurse
    const updateNurse = (e) => {
        e.preventDefault()

        // Update in all nurses data
        const updatedAllNurses = initialNursesData.all.map((nurse) => (nurse.id === currentNurse.id ? currentNurse : nurse))
        initialNursesData.all = updatedAllNurses

        // Update in branch-specific data
        // First remove from old branch if branch changed
        if (currentNurse.branch !== currentNurse._prevBranch && currentNurse._prevBranch) {
            initialNursesData[currentNurse._prevBranch] = initialNursesData[currentNurse._prevBranch].filter(
                (nurse) => nurse.id !== currentNurse.id,
            )
        }

        // Then add to new branch
        if (initialNursesData[currentNurse.branch]) {
            initialNursesData[currentNurse.branch] = initialNursesData[currentNurse.branch].filter(
                (nurse) => nurse.id !== currentNurse.id,
            )
            initialNursesData[currentNurse.branch].push(currentNurse)
        }

        // Update current view
        if (selectedBranch === "all") {
            setInitialNurses(updatedAllNurses)
        } else if (selectedBranch === currentNurse.branch) {
            setInitialNurses(initialNursesData[selectedBranch])
        }

        closeEditSidebar()
    }

    // Delete nurse
    const deleteNurse = (id) => {
        if (window.confirm(t("confirm_delete_nurse"))) {
            // Find the nurse to get their branch
            const nurseToDelete = initialNursesData.all.find((nurse) => nurse.id === id)

            // Remove from all nurses data
            initialNursesData.all = initialNursesData.all.filter((nurse) => nurse.id !== id)

            // Remove from branch-specific data
            if (nurseToDelete && nurseToDelete.branch) {
                initialNursesData[nurseToDelete.branch] = initialNursesData[nurseToDelete.branch].filter(
                    (nurse) => nurse.id !== id,
                )
            }

            // Update current view
            setInitialNurses((prev) => prev.filter((nurse) => nurse.id !== id))
        }
    }

    // Get specialty label
    const getSpecialtyLabel = (specialtyValue) => {
        const specialty = nurseSpecialties.find((spec) => spec.value === specialtyValue)
        return specialty ? specialty.label : specialtyValue
    }

    // Get shift label
    const getShiftLabel = (shift) => {
        switch (shift) {
            case "morning":
                return t("morning_shift")
            case "evening":
                return t("evening_shift")
            case "night":
                return t("night_shift")
            default:
                return shift
        }
    }

    // View nurse details
    const viewNurseDetails = (nurse) => {
        setSelectedNurse(nurse)
        setShowNurseDetails(true)
    }

    // Close nurse details
    const closeNurseDetails = () => {
        setShowNurseDetails(false)
        setSelectedNurse(null)
    }

    // Add certification to new nurse
    const addCertification = () => {
        if (newCertification.trim()) {
            setNewNurse({
                ...newNurse,
                certifications: [...newNurse.certifications, newCertification.trim()],
            })
            setNewCertification("")
        }
    }

    // Remove certification from new nurse
    const removeCertification = (index) => {
        const updatedCertifications = [...newNurse.certifications]
        updatedCertifications.splice(index, 1)
        setNewNurse({
            ...newNurse,
            certifications: updatedCertifications,
        })
    }

    // Add certification to current nurse
    const addCertificationToCurrentNurse = () => {
        if (newCertification.trim() && currentNurse) {
            setCurrentNurse({
                ...currentNurse,
                certifications: [...currentNurse.certifications, newCertification.trim()],
            })
            setNewCertification("")
        }
    }

    // Remove certification from current nurse
    const removeCertificationFromCurrentNurse = (index) => {
        if (currentNurse) {
            const updatedCertifications = [...currentNurse.certifications]
            updatedCertifications.splice(index, 1)
            setCurrentNurse({
                ...currentNurse,
                certifications: updatedCertifications,
            })
        }
    }

    // Export to PDF
    const exportToPDF = () => {
        alert(t("export_to_pdf_function"))
    }

    // Export to Excel
    const exportToExcel = () => {
        alert(t("export_to_excel_function"))
    }

    return (
        <div className="nurse-container">
            <div className="nurse-header">
                <h1 className="nurse-title">{t("nurses")}</h1>
                <div className="nurse-actions">
                    <button className="nurse-btn nurse-btn-outline nurse-btn-icon" onClick={toggleStats}>
                        {showStats ? <FaTimes /> : <FaMoneyBillWave />} {showStats ? t("close_stats") : t("statistics")}
                    </button>
                    <button className="nurse-btn nurse-btn-outline nurse-btn-icon" onClick={exportToPDF}>
                        <FaFilePdf /> {t("export_to_pdf")}
                    </button>
                    <button className="nurse-btn nurse-btn-outline nurse-btn-icon" onClick={exportToExcel}>
                        <FaFileExcel /> {t("export_to_excel")}
                    </button>
                    <button className="nurse-btn nurse-btn-primary nurse-btn-icon" onClick={openAddSidebar}>
                        <FaUserPlus /> {t("add_new_nurse")}
                    </button>
                </div>
            </div>

            {showStats && (
                <div className="nurse-stats-container">
                    <div className="nurse-stats-grid">
                        <div className="nurse-stat-card">
                            <div className="nurse-stat-icon-wrapper">
                                <FaUserNurse className="nurse-stat-icon" />
                            </div>
                            <div className="nurse-stat-content">
                                <div className="nurse-stat-value">{stats.totalNurses}</div>
                                <div className="nurse-stat-label">{t("total_nurses")}</div>
                            </div>
                        </div>

                        <div className="nurse-stat-card">
                            <div className="nurse-stat-icon-wrapper">
                                <FaCheck className="nurse-stat-icon" />
                            </div>
                            <div className="nurse-stat-content">
                                <div className="nurse-stat-value">{stats.activeNurses}</div>
                                <div className="nurse-stat-label">{t("active_nurses")}</div>
                            </div>
                        </div>

                        <div className="nurse-stat-card">
                            <div className="nurse-stat-icon-wrapper">
                                <FaPlane className="nurse-stat-icon" />
                            </div>
                            <div className="nurse-stat-content">
                                <div className="nurse-stat-value">{stats.onVacation}</div>
                                <div className="nurse-stat-label">{t("nurses_on_vacation")}</div>
                            </div>
                        </div>

                        <div className="nurse-stat-card">
                            <div className="nurse-stat-icon-wrapper">
                                <FaMoneyBillWave className="nurse-stat-icon" />
                            </div>
                            <div className="nurse-stat-content">
                                <div className="nurse-stat-value">
                                    {stats.totalSalaries.toLocaleString()} {t("currency")}
                                </div>
                                <div className="nurse-stat-label">{t("total_salary")}</div>
                            </div>
                        </div>
                    </div>

                    <div className="nurse-stats-grid">
                        <div className="nurse-stat-card">
                            <div className="nurse-stat-content">
                                <div className="nurse-stat-value">{stats.averageExperience}</div>
                                <div className="nurse-stat-label">{t("average_experience")}</div>
                            </div>
                        </div>

                        <div className="nurse-stat-card">
                            <div className="nurse-stat-content">
                                <div className="nurse-stat-value">{stats.totalPatients}</div>
                                <div className="nurse-stat-label">{t("total_patients")}</div>
                            </div>
                        </div>

                        <div className="nurse-stat-card">
                            <div className="nurse-stat-content">
                                <div className="nurse-stat-value">{stats.averageRating}</div>
                                <div className="nurse-stat-label">{t("average_rating")}</div>
                            </div>
                        </div>
                    </div>

                    <div className="nurse-specialty-distribution">
                        <h3>{t("specialty_distribution")}</h3>
                        <div className="nurse-specialty-bars">
                            {Object.entries(stats.bySpecialty).map(([specialty, count]) => (
                                <div className="nurse-specialty-bar-item" key={specialty}>
                                    <div className="nurse-specialty-info">
                                        <span className="nurse-specialty-name">{getSpecialtyLabel(specialty)}</span>
                                        <span className="nurse-specialty-count">{count}</span>
                                    </div>
                                    <div className="nurse-specialty-bar-container">
                                        <div
                                            className="nurse-specialty-bar-fill"
                                            style={{ width: `${(count / stats.totalNurses) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="nurse-shift-distribution">
                        <h3>{t("shift_distribution")}</h3>
                        <div className="nurse-shift-grid">
                            <div className="nurse-shift-card">
                                <div className="nurse-shift-title">{t("morning_shift")}</div>
                                <div className="nurse-shift-count">{stats.byShift.morning}</div>
                            </div>
                            <div className="nurse-shift-card">
                                <div className="nurse-shift-title">{t("evening_shift")}</div>
                                <div className="nurse-shift-count">{stats.byShift.evening}</div>
                            </div>
                            <div className="nurse-shift-card">
                                <div className="nurse-shift-title">{t("night_shift")}</div>
                                <div className="nurse-shift-count">{stats.byShift.night}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="nurse-filters-container">
                <div className="nurse-search-filter">
                    <div className="nurse-search-input">
                        <FaSearch className="nurse-search-icon" />
                        <input type="text" placeholder={t("search")} value={searchTerm} onChange={handleSearchChange} />
                    </div>
                    <button className={`nurse-filter-toggle-btn ${showFilters ? "active" : ""}`} onClick={toggleFilters}>
                        <FaFilter /> {t("filters")}
                    </button>
                </div>

                {showFilters && (
                    <div className="nurse-advanced-filters">
                        <div className="nurse-filter-group">
                            <label>{t("specialty")}:</label>
                            <select value={filterSpecialty} onChange={(e) => setFilterSpecialty(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                {nurseSpecialties.map((specialty) => (
                                    <option key={specialty.value} value={specialty.value}>
                                        {specialty.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="nurse-filter-group">
                            <label>{t("status")}:</label>
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                <option value="active">{t("active")}</option>
                                <option value="inactive">{t("inactive")}</option>
                            </select>
                        </div>

                        {selectedBranch === "all" && (
                            <div className="nurse-filter-group">
                                <label>{t("branch")}:</label>
                                <select value={filterBranch} onChange={(e) => setFilterBranch(e.target.value)}>
                                    <option value="all">{t("all")}</option>
                                    <option value="branch1">{t("branch1")}</option>
                                    <option value="branch2">{t("branch2")}</option>
                                    <option value="branch3">{t("branch3")}</option>
                                </select>
                            </div>
                        )}

                        <div className="nurse-filter-group">
                            <label>{t("vacation_status")}:</label>
                            <select value={filterVacation} onChange={(e) => setFilterVacation(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                <option value="on_vacation">{t("on_vacation")}</option>
                                <option value="not_on_vacation">{t("at_work")}</option>
                            </select>
                        </div>

                        <div className="nurse-filter-group">
                            <label>{t("shift")}:</label>
                            <select value={filterShift} onChange={(e) => setFilterShift(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                <option value="morning">{t("morning_shift")}</option>
                                <option value="evening">{t("evening_shift")}</option>
                                <option value="night">{t("night_shift")}</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            <div className="nurse-dashboard-card">
                <div className="nurse-table-responsive">
                    <table className="nurse-data-table">
                        <thead>
                            <tr>
                                <th>{t("name")}</th>
                                <th>{t("specialty")}</th>
                                <th>{t("department")}</th>
                                <th>{t("phone")}</th>
                                <th>{t("monthly_salary")}</th>
                                <th>{t("experience")}</th>
                                <th>{t("patients_count")}</th>
                                <th>{t("rating")}</th>
                                <th>{t("shift")}</th>
                                <th>{t("vacation_status")}</th>
                                <th>{t("status")}</th>
                                <th>{t("actions")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nurses.map((nurse) => (
                                <tr key={nurse.id}>
                                    <td>
                                        <div className="nurse-name-cell" onClick={() => viewNurseDetails(nurse)}>
                                            {nurse.name}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`nurse-specialty-badge ${nurse.specialty}`}>
                                            {getSpecialtyLabel(nurse.specialty)}
                                        </div>
                                    </td>
                                    <td>{nurse.department}</td>
                                    <td>{nurse.phone}</td>
                                    <td>
                                        {nurse.salary.toLocaleString()} {t("currency")}
                                    </td>
                                    <td>
                                        {nurse.experience} {t("years")}
                                    </td>
                                    <td>{nurse.patients}</td>
                                    <td>
                                        <div className="nurse-rating">
                                            <span className="nurse-rating-value">{nurse.rating}</span>
                                            <span className="nurse-rating-star">★</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={`nurse-shift-badge ${nurse.shift}`}>{getShiftLabel(nurse.shift)}</div>
                                    </td>
                                    <td>
                                        <div className={`nurse-vacation-badge ${nurse.onVacation ? "on-vacation" : "working"}`}>
                                            {nurse.onVacation ? (
                                                <>
                                                    <FaPlane /> {t("on_vacation")}
                                                </>
                                            ) : (
                                                <>
                                                    <FaCheck /> {t("at_work")}
                                                </>
                                            )}
                                        </div>
                                        {nurse.onVacation && nurse.vacationDates && (
                                            <div className="nurse-vacation-dates">{nurse.vacationDates}</div>
                                        )}
                                    </td>
                                    <td>
                                        <div className={`nurse-status-badge ${nurse.status}`}>
                                            {nurse.status === "active" ? (
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
                                        <div className="nurse-action-buttons">
                                            <button className="nurse-btn-icon nurse-edit" onClick={() => openEditSidebar(nurse)}>
                                                <FaEdit />
                                            </button>
                                            <button className="nurse-btn-icon nurse-delete" onClick={() => deleteNurse(nurse.id)}>
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {nurses.length === 0 && (
                                <tr>
                                    <td colSpan="12" className="nurse-no-data">
                                        {t("no_data_found")}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Nurse Sidebar */}
            <div className={`nurse-sidebar-overlay ${showSidebar ? "active" : ""}`} onClick={closeAddSidebar}></div>
            <div className={`nurse-sidebar ${showSidebar ? "active" : ""}`}>
                <div className="nurse-sidebar-header">
                    <h2>{t("add_new_nurse")}</h2>
                    <button className="nurse-close-button" onClick={closeAddSidebar}>
                        <FaTimes />
                    </button>
                </div>
                <div className="nurse-sidebar-content">
                    <form onSubmit={addNurse}>
                        <div className="nurse-form-group">
                            <label>{t("full_name")}</label>
                            <input type="text" name="name" value={newNurse.name} onChange={handleNewNurseChange} required />
                        </div>

                        <div className="nurse-form-group">
                            <label>{t("specialty")}</label>
                            <select name="specialty" value={newNurse.specialty} onChange={handleNewNurseChange} required>
                                {nurseSpecialties.map((specialty) => (
                                    <option key={specialty.value} value={specialty.value}>
                                        {specialty.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="nurse-form-group">
                            <label>{t("department")}</label>
                            <input
                                type="text"
                                name="department"
                                value={newNurse.department}
                                onChange={handleNewNurseChange}
                                required
                            />
                        </div>

                        <div className="nurse-form-row">
                            <div className="nurse-form-group">
                                <label>{t("phone")}</label>
                                <input type="text" name="phone" value={newNurse.phone} onChange={handleNewNurseChange} required />
                            </div>

                            <div className="nurse-form-group">
                                <label>{t("email")}</label>
                                <input type="email" name="email" value={newNurse.email} onChange={handleNewNurseChange} required />
                            </div>
                        </div>

                        <div className="nurse-form-row">
                            <div className="nurse-form-group">
                                <label>
                                    {t("monthly_salary")} ({t("currency")})
                                </label>
                                <input type="number" name="salary" value={newNurse.salary} onChange={handleNewNurseChange} required />
                            </div>

                            <div className="nurse-form-group">
                                <label>
                                    {t("experience")} ({t("years")})
                                </label>
                                <input
                                    type="number"
                                    name="experience"
                                    value={newNurse.experience}
                                    onChange={handleNewNurseChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="nurse-form-row">
                            <div className="nurse-form-group">
                                <label>{t("patients_count")}</label>
                                <input
                                    type="number"
                                    name="patients"
                                    value={newNurse.patients}
                                    onChange={handleNewNurseChange}
                                    required
                                />
                            </div>

                            <div className="nurse-form-group">
                                <label>{t("rating")} (1-5)</label>
                                <input
                                    type="number"
                                    name="rating"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                    value={newNurse.rating}
                                    onChange={handleNewNurseChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="nurse-form-group">
                            <label>{t("education")}</label>
                            <input type="text" name="education" value={newNurse.education} onChange={handleNewNurseChange} required />
                        </div>

                        <div className="nurse-form-group">
                            <label>{t("schedule")}</label>
                            <input
                                type="text"
                                name="schedule"
                                value={newNurse.schedule}
                                onChange={handleNewNurseChange}
                                placeholder={t("schedule_example")}
                                required
                            />
                        </div>

                        <div className="nurse-form-group">
                            <label>{t("shift")}</label>
                            <select name="shift" value={newNurse.shift} onChange={handleNewNurseChange} required>
                                <option value="morning">{t("morning_shift")}</option>
                                <option value="evening">{t("evening_shift")}</option>
                                <option value="night">{t("night_shift")}</option>
                            </select>
                        </div>

                        <div className="nurse-form-group">
                            <label>{t("certifications")}</label>
                            <div className="nurse-certification-input">
                                <input
                                    type="text"
                                    value={newCertification}
                                    onChange={(e) => setNewCertification(e.target.value)}
                                    placeholder={t("add_certification")}
                                />
                                <button type="button" className="nurse-btn nurse-btn-sm" onClick={addCertification}>
                                    {t("add")}
                                </button>
                            </div>
                            {newNurse.certifications.length > 0 && (
                                <div className="nurse-certifications-list">
                                    {newNurse.certifications.map((cert, index) => (
                                        <div className="nurse-certification-item" key={index}>
                                            <span>{cert}</span>
                                            <button
                                                type="button"
                                                className="nurse-btn-icon nurse-delete-sm"
                                                onClick={() => removeCertification(index)}
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="nurse-form-group">
                            <label>{t("status")}</label>
                            <select name="status" value={newNurse.status} onChange={handleNewNurseChange}>
                                <option value="active">{t("active")}</option>
                                <option value="inactive">{t("inactive")}</option>
                            </select>
                        </div>

                        <div className="nurse-form-group nurse-checkbox-group">
                            <input
                                type="checkbox"
                                id="onVacation"
                                name="onVacation"
                                checked={newNurse.onVacation}
                                onChange={handleNewNurseChange}
                            />
                            <label htmlFor="onVacation">{t("on_vacation")}</label>
                        </div>

                        {newNurse.onVacation && (
                            <div className="nurse-form-group">
                                <label>{t("vacation_period")}</label>
                                <input
                                    type="text"
                                    name="vacationDates"
                                    value={newNurse.vacationDates || ""}
                                    onChange={handleNewNurseChange}
                                    placeholder={t("vacation_period_example")}
                                />
                            </div>
                        )}

                        {selectedBranch === "all" && (
                            <div className="nurse-form-group">
                                <label>{t("branch")}</label>
                                <select name="branch" value={newNurse.branch} onChange={handleNewNurseChange}>
                                    <option value="branch1">{t("branch1")}</option>
                                    <option value="branch2">{t("branch2")}</option>
                                    <option value="branch3">{t("branch3")}</option>
                                </select>
                            </div>
                        )}

                        <div className="nurse-form-actions">
                            <button type="submit" className="nurse-btn nurse-btn-primary">
                                {t("add")}
                            </button>
                            <button type="button" className="nurse-btn nurse-btn-secondary" onClick={closeAddSidebar}>
                                {t("cancel")}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Edit Nurse Sidebar */}
            <div className={`nurse-sidebar-overlay ${showEditSidebar ? "active" : ""}`} onClick={closeEditSidebar}></div>
            <div className={`nurse-sidebar ${showEditSidebar ? "active" : ""}`}>
                {currentNurse && (
                    <>
                        <div className="nurse-sidebar-header">
                            <h2>{t("edit_nurse")}</h2>
                            <button className="nurse-close-button" onClick={closeEditSidebar}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="nurse-sidebar-content">
                            <form onSubmit={updateNurse}>
                                <div className="nurse-form-group">
                                    <label>{t("full_name")}</label>
                                    <input type="text" name="name" value={currentNurse.name} onChange={handleEditNurseChange} required />
                                </div>

                                <div className="nurse-form-group">
                                    <label>{t("specialty")}</label>
                                    <select name="specialty" value={currentNurse.specialty} onChange={handleEditNurseChange} required>
                                        {nurseSpecialties.map((specialty) => (
                                            <option key={specialty.value} value={specialty.value}>
                                                {specialty.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="nurse-form-group">
                                    <label>{t("department")}</label>
                                    <input
                                        type="text"
                                        name="department"
                                        value={currentNurse.department}
                                        onChange={handleEditNurseChange}
                                        required
                                    />
                                </div>

                                <div className="nurse-form-row">
                                    <div className="nurse-form-group">
                                        <label>{t("phone")}</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={currentNurse.phone}
                                            onChange={handleEditNurseChange}
                                            required
                                        />
                                    </div>

                                    <div className="nurse-form-group">
                                        <label>{t("email")}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={currentNurse.email}
                                            onChange={handleEditNurseChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="nurse-form-row">
                                    <div className="nurse-form-group">
                                        <label>
                                            {t("monthly_salary")} ({t("currency")})
                                        </label>
                                        <input
                                            type="number"
                                            name="salary"
                                            value={currentNurse.salary}
                                            onChange={handleEditNurseChange}
                                            required
                                        />
                                    </div>

                                    <div className="nurse-form-group">
                                        <label>
                                            {t("experience")} ({t("years")})
                                        </label>
                                        <input
                                            type="number"
                                            name="experience"
                                            value={currentNurse.experience}
                                            onChange={handleEditNurseChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="nurse-form-row">
                                    <div className="nurse-form-group">
                                        <label>{t("patients_count")}</label>
                                        <input
                                            type="number"
                                            name="patients"
                                            value={currentNurse.patients}
                                            onChange={handleEditNurseChange}
                                            required
                                        />
                                    </div>

                                    <div className="nurse-form-group">
                                        <label>{t("rating")} (1-5)</label>
                                        <input
                                            type="number"
                                            name="rating"
                                            min="1"
                                            max="5"
                                            step="0.1"
                                            value={currentNurse.rating}
                                            onChange={handleEditNurseChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="nurse-form-group">
                                    <label>{t("education")}</label>
                                    <input
                                        type="text"
                                        name="education"
                                        value={currentNurse.education}
                                        onChange={handleEditNurseChange}
                                        required
                                    />
                                </div>

                                <div className="nurse-form-group">
                                    <label>{t("schedule")}</label>
                                    <input
                                        type="text"
                                        name="schedule"
                                        value={currentNurse.schedule}
                                        onChange={handleEditNurseChange}
                                        placeholder={t("schedule_example")}
                                        required
                                    />
                                </div>

                                <div className="nurse-form-group">
                                    <label>{t("shift")}</label>
                                    <select name="shift" value={currentNurse.shift} onChange={handleEditNurseChange} required>
                                        <option value="morning">{t("morning_shift")}</option>
                                        <option value="evening">{t("evening_shift")}</option>
                                        <option value="night">{t("night_shift")}</option>
                                    </select>
                                </div>

                                <div className="nurse-form-group">
                                    <label>{t("certifications")}</label>
                                    <div className="nurse-certification-input">
                                        <input
                                            type="text"
                                            value={newCertification}
                                            onChange={(e) => setNewCertification(e.target.value)}
                                            placeholder={t("add_certification")}
                                        />
                                        <button type="button" className="nurse-btn nurse-btn-sm" onClick={addCertificationToCurrentNurse}>
                                            {t("add")}
                                        </button>
                                    </div>
                                    {currentNurse.certifications.length > 0 && (
                                        <div className="nurse-certifications-list">
                                            {currentNurse.certifications.map((cert, index) => (
                                                <div className="nurse-certification-item" key={index}>
                                                    <span>{cert}</span>
                                                    <button
                                                        type="button"
                                                        className="nurse-btn-icon nurse-delete-sm"
                                                        onClick={() => removeCertificationFromCurrentNurse(index)}
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="nurse-form-group">
                                    <label>{t("status")}</label>
                                    <select name="status" value={currentNurse.status} onChange={handleEditNurseChange}>
                                        <option value="active">{t("active")}</option>
                                        <option value="inactive">{t("inactive")}</option>
                                    </select>
                                </div>

                                <div className="nurse-form-group nurse-checkbox-group">
                                    <input
                                        type="checkbox"
                                        id="editOnVacation"
                                        name="onVacation"
                                        checked={currentNurse.onVacation}
                                        onChange={handleEditNurseChange}
                                    />
                                    <label htmlFor="editOnVacation">{t("on_vacation")}</label>
                                </div>

                                {currentNurse.onVacation && (
                                    <div className="nurse-form-group">
                                        <label>{t("vacation_period")}</label>
                                        <input
                                            type="text"
                                            name="vacationDates"
                                            value={currentNurse.vacationDates || ""}
                                            onChange={handleEditNurseChange}
                                            placeholder={t("vacation_period_example")}
                                        />
                                    </div>
                                )}

                                {selectedBranch === "all" && (
                                    <div className="nurse-form-group">
                                        <label>{t("branch")}</label>
                                        <select
                                            name="branch"
                                            value={currentNurse.branch}
                                            onChange={(e) => {
                                                const newValue = e.target.value
                                                setCurrentNurse((prev) => ({
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

                                <div className="nurse-form-actions">
                                    <button type="submit" className="nurse-btn nurse-btn-primary">
                                        {t("save")}
                                    </button>
                                    <button type="button" className="nurse-btn nurse-btn-secondary" onClick={closeEditSidebar}>
                                        {t("cancel")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </div>

            {/* Nurse Details Modal */}
            <div className={`nurse-modal-overlay ${showNurseDetails ? "active" : ""}`} onClick={closeNurseDetails}></div>
            <div className={`nurse-modal ${showNurseDetails ? "active" : ""}`}>
                {selectedNurse && (
                    <>
                        <div className="nurse-modal-header">
                            <h2>{selectedNurse.name}</h2>
                            <button className="nurse-close-button" onClick={closeNurseDetails}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="nurse-modal-content">
                            <div className="nurse-details-grid">
                                <div className="nurse-details-section">
                                    <h3>{t("personal_info")}</h3>
                                    <div className="nurse-details-item">
                                        <span className="nurse-details-label">{t("specialty")}:</span>
                                        <span className="nurse-details-value">{getSpecialtyLabel(selectedNurse.specialty)}</span>
                                    </div>
                                    <div className="nurse-details-item">
                                        <span className="nurse-details-label">{t("department")}:</span>
                                        <span className="nurse-details-value">{selectedNurse.department}</span>
                                    </div>
                                    <div className="nurse-details-item">
                                        <span className="nurse-details-label">{t("phone")}:</span>
                                        <span className="nurse-details-value">{selectedNurse.phone}</span>
                                    </div>
                                    <div className="nurse-details-item">
                                        <span className="nurse-details-label">{t("email")}:</span>
                                        <span className="nurse-details-value">{selectedNurse.email}</span>
                                    </div>
                                    <div className="nurse-details-item">
                                        <span className="nurse-details-label">{t("status")}:</span>
                                        <span className={`nurse-details-status ${selectedNurse.status}`}>
                                            {selectedNurse.status === "active" ? t("active") : t("inactive")}
                                        </span>
                                    </div>
                                    <div className="nurse-details-item">
                                        <span className="nurse-details-label">{t("vacation_status")}:</span>
                                        <span className={`nurse-details-status ${selectedNurse.onVacation ? "on-vacation" : "working"}`}>
                                            {selectedNurse.onVacation ? t("on_vacation") : t("at_work")}
                                        </span>
                                    </div>
                                    {selectedNurse.onVacation && selectedNurse.vacationDates && (
                                        <div className="nurse-details-item">
                                            <span className="nurse-details-label">{t("vacation_period")}:</span>
                                            <span className="nurse-details-value">{selectedNurse.vacationDates}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="nurse-details-section">
                                    <h3>{t("professional_info")}</h3>
                                    <div className="nurse-details-item">
                                        <span className="nurse-details-label">{t("education")}:</span>
                                        <span className="nurse-details-value">{selectedNurse.education}</span>
                                    </div>
                                    <div className="nurse-details-item">
                                        <span className="nurse-details-label">{t("experience")}:</span>
                                        <span className="nurse-details-value">
                                            {selectedNurse.experience} {t("years")}
                                        </span>
                                    </div>
                                    <div className="nurse-details-item">
                                        <span className="nurse-details-label">{t("patients_count")}:</span>
                                        <span className="nurse-details-value">{selectedNurse.patients}</span>
                                    </div>
                                    <div className="nurse-details-item">
                                        <span className="nurse-details-label">{t("rating")}:</span>
                                        <span className="nurse-details-value">
                                            {selectedNurse.rating} <span className="nurse-rating-star">★</span>
                                        </span>
                                    </div>
                                    <div className="nurse-details-item">
                                        <span className="nurse-details-label">{t("monthly_salary")}:</span>
                                        <span className="nurse-details-value">
                                            {selectedNurse.salary.toLocaleString()} {t("currency")}
                                        </span>
                                    </div>
                                </div>

                                <div className="nurse-details-section">
                                    <h3>{t("work_info")}</h3>
                                    <div className="nurse-details-item">
                                        <span className="nurse-details-label">{t("schedule")}:</span>
                                        <span className="nurse-details-value">{selectedNurse.schedule}</span>
                                    </div>
                                    <div className="nurse-details-item">
                                        <span className="nurse-details-label">{t("shift")}:</span>
                                        <span className="nurse-details-value">{getShiftLabel(selectedNurse.shift)}</span>
                                    </div>
                                    {selectedBranch === "all" && (
                                        <div className="nurse-details-item">
                                            <span className="nurse-details-label">{t("branch")}:</span>
                                            <span className="nurse-details-value">{t(selectedNurse.branch)}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="nurse-details-section">
                                    <h3>{t("certifications")}</h3>
                                    {selectedNurse.certifications.length > 0 ? (
                                        <ul className="nurse-details-certifications">
                                            {selectedNurse.certifications.map((cert, index) => (
                                                <li key={index}>{cert}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>{t("no_certifications")}</p>
                                    )}
                                </div>
                            </div>

                            <div className="nurse-details-actions">
                                <button className="nurse-btn nurse-btn-primary" onClick={() => openEditSidebar(selectedNurse)}>
                                    <FaEdit /> {t("edit")}
                                </button>
                                <button className="nurse-btn nurse-btn-secondary" onClick={closeNurseDetails}>
                                    {t("close")}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

