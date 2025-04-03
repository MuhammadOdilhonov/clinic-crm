"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import {
    FaDoorOpen,
    FaHospital,
    FaUserMd,
    FaSearch,
    FaFilter,
    FaPlus,
    FaEdit,
    FaTrash,
    FaInfoCircle,
    FaExclamationTriangle,
    FaCheckCircle,
    FaRegHospital,
    FaRegCalendarCheck,
    FaRegClock,
    FaRegClipboard,
} from "react-icons/fa"

export default function ACabinets() {
    const { user, selectedBranch } = useAuth()
    const { t } = useLanguage()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Data states
    const [cabinets, setCabinets] = useState([])
    const [branches, setBranches] = useState([])
    const [doctors, setDoctors] = useState([])
    const [equipments, setEquipments] = useState([])

    // UI states
    const [searchTerm, setSearchTerm] = useState("")
    const [filterBranchId, setFilterBranchId] = useState("")
    const [filterType, setFilterType] = useState("")
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [currentCabinet, setCurrentCabinet] = useState(null)
    const [selectedEquipments, setSelectedEquipments] = useState([])

    // Form data
    const [formData, setFormData] = useState({
        cabinetNumber: "",
        cabinetType: "",
        branchId: "",
        doctorId: "",
        floor: "",
        capacity: "",
        status: "available",
        description: "",
    })

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                // In a real app, these would be API calls
                // Simulating API calls with setTimeout
                setTimeout(() => {
                    // Mock branches data
                    const mockBranches = [
                        { id: 1, name: "Main Branch", address: "Tashkent, Chilanzar district" },
                        { id: 2, name: "Secondary Branch", address: "Tashkent, Yunusabad district" },
                        { id: 3, name: "Tertiary Branch", address: "Tashkent, Mirzo Ulugbek district" },
                    ]

                    // Mock doctors data
                    const mockDoctors = [
                        { id: 1, name: "Dr. Sardor Alimov", specialization: "General Practitioner", branchId: 1 },
                        { id: 2, name: "Dr. Kamil Rakhimov", specialization: "Cardiologist", branchId: 1 },
                        { id: 3, name: "Dr. Aziz Yusupov", specialization: "Pulmonologist", branchId: 2 },
                        { id: 4, name: "Dr. Malika Umarova", specialization: "Surgeon", branchId: 3 },
                    ]

                    // Mock equipment data
                    const mockEquipments = [
                        { id: 1, name: "X-Ray Machine", type: "diagnostic" },
                        { id: 2, name: "ECG Machine", type: "diagnostic" },
                        { id: 3, name: "Ultrasound Machine", type: "diagnostic" },
                        { id: 4, name: "Ultrasound Machine", type: "diagnostic" },
                        { id: 5, name: "Surgical Tools Set", type: "surgical" },
                        { id: 6, name: "Dental Chair", type: "dental" },
                        { id: 7, name: "Ophthalmoscope", type: "diagnostic" },
                        { id: 8, name: "Defibrillator", type: "emergency" },
                        { id: 9, name: "Sterilization Equipment", type: "general" },
                    ]

                    // Mock cabinets data
                    const mockCabinets = [
                        {
                            id: 101,
                            cabinetNumber: "101",
                            cabinetType: "examination",
                            branchId: 1,
                            branchName: "Main Branch",
                            doctorId: 1,
                            doctorName: "Dr. Sardor Alimov",
                            floor: "1",
                            capacity: "3",
                            status: "available",
                            description: "General examination room",
                            equipments: [1, 6],
                            lastMaintenance: "2023-04-15",
                            nextMaintenance: "2023-07-15",
                        },
                        {
                            id: 102,
                            cabinetNumber: "102",
                            cabinetType: "procedure",
                            branchId: 1,
                            branchName: "Main Branch",
                            doctorId: 2,
                            doctorName: "Dr. Kamil Rakhimov",
                            floor: "1",
                            capacity: "2",
                            status: "occupied",
                            description: "Cardiology procedure room",
                            equipments: [2, 7],
                            lastMaintenance: "2023-03-20",
                            nextMaintenance: "2023-06-20",
                        },
                        {
                            id: 201,
                            cabinetNumber: "201",
                            cabinetType: "examination",
                            branchId: 2,
                            branchName: "Secondary Branch",
                            doctorId: 3,
                            doctorName: "Dr. Aziz Yusupov",
                            floor: "2",
                            capacity: "3",
                            status: "available",
                            description: "Pulmonology examination room",
                            equipments: [3],
                            lastMaintenance: "2023-05-10",
                            nextMaintenance: "2023-08-10",
                        },
                        {
                            id: 301,
                            cabinetNumber: "301",
                            cabinetType: "surgery",
                            branchId: 3,
                            branchName: "Tertiary Branch",
                            doctorId: 4,
                            doctorName: "Dr. Malika Umarova",
                            floor: "3",
                            capacity: "5",
                            status: "maintenance",
                            description: "Surgery room",
                            equipments: [4, 7, 8],
                            lastMaintenance: "2023-05-25",
                            nextMaintenance: "2023-08-25",
                        },
                    ]

                    setBranches(mockBranches)
                    setDoctors(mockDoctors)
                    setEquipments(mockEquipments)
                    setCabinets(mockCabinets)
                    setLoading(false)
                }, 800)
            } catch (err) {
                setError(err.message || "An error occurred")
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // Filter cabinets based on search and filters
    const filteredCabinets = cabinets.filter((cabinet) => {
        const matchesSearch =
            cabinet.cabinetNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cabinet.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cabinet.description.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesBranch = !filterBranchId || cabinet.branchId === Number.parseInt(filterBranchId)
        const matchesType = !filterType || cabinet.cabinetType === filterType

        return matchesSearch && matchesBranch && matchesType
    })

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    // Handle equipment selection
    const handleEquipmentChange = (equipmentId) => {
        if (selectedEquipments.includes(equipmentId)) {
            setSelectedEquipments(selectedEquipments.filter((id) => id !== equipmentId))
        } else {
            setSelectedEquipments([...selectedEquipments, equipmentId])
        }
    }

    // Open add cabinet modal
    const openAddModal = () => {
        setFormData({
            cabinetNumber: "",
            cabinetType: "",
            branchId: selectedBranch?.id?.toString() || "",
            doctorId: "",
            floor: "",
            capacity: "",
            status: "available",
            description: "",
        })
        setSelectedEquipments([])
        setShowAddModal(true)
    }

    // Open edit cabinet modal
    const openEditModal = (cabinet) => {
        setCurrentCabinet(cabinet)
        setFormData({
            cabinetNumber: cabinet.cabinetNumber,
            cabinetType: cabinet.cabinetType,
            branchId: cabinet.branchId.toString(),
            doctorId: cabinet.doctorId.toString(),
            floor: cabinet.floor,
            capacity: cabinet.capacity,
            status: cabinet.status,
            description: cabinet.description,
        })
        setSelectedEquipments(cabinet.equipments || [])
        setShowEditModal(true)
    }

    // Open cabinet details modal
    const openDetailsModal = (cabinet) => {
        setCurrentCabinet(cabinet)
        setShowDetailsModal(true)
    }

    // Handle add cabinet
    const handleAddCabinet = () => {
        const selectedBranch = branches.find((branch) => branch.id === Number.parseInt(formData.branchId))
        const selectedDoctor = doctors.find((doctor) => doctor.id === Number.parseInt(formData.doctorId))

        const newCabinet = {
            id: Math.floor(Math.random() * 10000),
            cabinetNumber: formData.cabinetNumber,
            cabinetType: formData.cabinetType,
            branchId: Number.parseInt(formData.branchId),
            branchName: selectedBranch.name,
            doctorId: Number.parseInt(formData.doctorId),
            doctorName: selectedDoctor.name,
            floor: formData.floor,
            capacity: formData.capacity,
            status: formData.status,
            description: formData.description,
            equipments: selectedEquipments,
            lastMaintenance: new Date().toISOString().split("T")[0],
            nextMaintenance: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split("T")[0],
        }

        setCabinets([...cabinets, newCabinet])
        setShowAddModal(false)
    }

    // Handle edit cabinet
    const handleEditCabinet = () => {
        const selectedBranch = branches.find((branch) => branch.id === Number.parseInt(formData.branchId))
        const selectedDoctor = doctors.find((doctor) => doctor.id === Number.parseInt(formData.doctorId))

        const updatedCabinet = {
            ...currentCabinet,
            cabinetNumber: formData.cabinetNumber,
            cabinetType: formData.cabinetType,
            branchId: Number.parseInt(formData.branchId),
            branchName: selectedBranch.name,
            doctorId: Number.parseInt(formData.doctorId),
            doctorName: selectedDoctor.name,
            floor: formData.floor,
            capacity: formData.capacity,
            status: formData.status,
            description: formData.description,
            equipments: selectedEquipments,
        }

        const updatedCabinets = cabinets.map((cabinet) => (cabinet.id === currentCabinet.id ? updatedCabinet : cabinet))

        setCabinets(updatedCabinets)
        setShowEditModal(false)
        setCurrentCabinet(null)
    }

    // Handle delete cabinet
    const handleDeleteCabinet = (cabinetId) => {
        if (window.confirm(t("confirm_delete_cabinet"))) {
            const updatedCabinets = cabinets.filter((cabinet) => cabinet.id !== cabinetId)
            setCabinets(updatedCabinets)
        }
    }

    // Get cabinet type label
    const getCabinetTypeLabel = (type) => {
        switch (type) {
            case "examination":
                return t("examination_room")
            case "procedure":
                return t("procedure_room")
            case "surgery":
                return t("surgery_room")
            case "laboratory":
                return t("laboratory")
            case "dental":
                return t("dental_room")
            default:
                return type
        }
    }

    // Get status label
    const getStatusLabel = (status) => {
        switch (status) {
            case "available":
                return t("available")
            case "occupied":
                return t("occupied")
            case "maintenance":
                return t("maintenance")
            default:
                return status
        }
    }

    // Get equipment names by IDs
    const getEquipmentNames = (equipmentIds) => {
        return equipmentIds
            .map((id) => {
                const equipment = equipments.find((eq) => eq.id === id)
                return equipment ? equipment.name : ""
            })
            .filter(Boolean)
            .join(", ")
    }

    // Filter doctors by selected branch
    const getFilteredDoctors = () => {
        if (!formData.branchId) return []
        return doctors.filter((doctor) => doctor.branchId === Number.parseInt(formData.branchId))
    }

    // Loading state
    if (loading) {
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

    return (
        <div className="admin-cabinet">
            <div className="page-header">
                <h1>
                    <FaDoorOpen /> {t("cabinets_management")}
                </h1>
                <div className="header-actions">
                    <button className="btn btn-primary" onClick={openAddModal}>
                        <FaPlus /> {t("add_cabinet")}
                    </button>
                    <div className="search-box">
                        <FaSearch />
                        <input
                            type="text"
                            placeholder={t("search_cabinets")}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-dropdown">
                        <FaHospital />
                        <select value={filterBranchId} onChange={(e) => setFilterBranchId(e.target.value)}>
                            <option value="">{t("all_branches")}</option>
                            {branches.map((branch) => (
                                <option key={branch.id} value={branch.id}>
                                    {branch.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-dropdown">
                        <FaFilter />
                        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                            <option value="">{t("all_types")}</option>
                            <option value="examination">{t("examination_room")}</option>
                            <option value="procedure">{t("procedure_room")}</option>
                            <option value="surgery">{t("surgery_room")}</option>
                            <option value="laboratory">{t("laboratory")}</option>
                            <option value="dental">{t("dental_room")}</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="cabinets-stats">
                <div className="stat-card">
                    <div className="stat-icon">
                        <FaDoorOpen />
                    </div>
                    <div className="stat-content">
                        <h3>{cabinets.length}</h3>
                        <p>{t("total_cabinets")}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon available">
                        <FaCheckCircle />
                    </div>
                    <div className="stat-content">
                        <h3>{cabinets.filter((cabinet) => cabinet.status === "available").length}</h3>
                        <p>{t("available_cabinets")}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon occupied">
                        <FaUserMd />
                    </div>
                    <div className="stat-content">
                        <h3>{cabinets.filter((cabinet) => cabinet.status === "occupied").length}</h3>
                        <p>{t("occupied_cabinets")}</p>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon maintenance">
                        <FaExclamationTriangle />
                    </div>
                    <div className="stat-content">
                        <h3>{cabinets.filter((cabinet) => cabinet.status === "maintenance").length}</h3>
                        <p>{t("maintenance_cabinets")}</p>
                    </div>
                </div>
            </div>

            <div className="cabinets-grid">
                {filteredCabinets.length > 0 ? (
                    filteredCabinets.map((cabinet) => (
                        <div key={cabinet.id} className={`cabinet-card status-${cabinet.status}`}>
                            <div className="cabinet-header">
                                <h3>
                                    {t("cabinet")} {cabinet.cabinetNumber}
                                </h3>
                                <span className={`status-badge ${cabinet.status}`}>{getStatusLabel(cabinet.status)}</span>
                            </div>
                            <div className="cabinet-body">
                                <div className="cabinet-info">
                                    <p>
                                        <FaRegHospital /> {cabinet.branchName}
                                    </p>
                                    <p>
                                        <FaUserMd /> {cabinet.doctorName}
                                    </p>
                                    <p>
                                        <FaRegClipboard /> {getCabinetTypeLabel(cabinet.cabinetType)}
                                    </p>
                                </div>
                                <div className="cabinet-description">{cabinet.description}</div>
                                <div className="cabinet-maintenance">
                                    <p>
                                        <FaRegCalendarCheck /> {t("last_maintenance")}: {cabinet.lastMaintenance}
                                    </p>
                                    <p>
                                        <FaRegClock /> {t("next_maintenance")}: {cabinet.nextMaintenance}
                                    </p>
                                </div>
                            </div>
                            <div className="cabinet-actions">
                                <button className="btn btn-sm btn-outline" onClick={() => openDetailsModal(cabinet)}>
                                    <FaInfoCircle /> {t("details")}
                                </button>
                                <button className="btn btn-sm btn-primary" onClick={() => openEditModal(cabinet)}>
                                    <FaEdit /> {t("edit")}
                                </button>
                                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteCabinet(cabinet.id)}>
                                    <FaTrash /> {t("delete")}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <FaExclamationTriangle />
                        <p>{t("no_cabinets_found")}</p>
                    </div>
                )}
            </div>

            {/* Add Cabinet Modal */}
            {showAddModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>{t("add_new_cabinet")}</h3>
                            <button className="close-btn" onClick={() => setShowAddModal(false)}>
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="cabinetNumber">{t("cabinet_number")}</label>
                                    <input
                                        type="text"
                                        id="cabinetNumber"
                                        name="cabinetNumber"
                                        value={formData.cabinetNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="floor">{t("floor")}</label>
                                    <input
                                        type="text"
                                        id="floor"
                                        name="floor"
                                        value={formData.floor}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="branchId">{t("branch")}</label>
                                    <select id="branchId" name="branchId" value={formData.branchId} onChange={handleInputChange} required>
                                        <option value="">{t("select_branch")}</option>
                                        {branches.map((branch) => (
                                            <option key={branch.id} value={branch.id}>
                                                {branch.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="doctorId">{t("doctor")}</label>
                                    <select
                                        id="doctorId"
                                        name="doctorId"
                                        value={formData.doctorId}
                                        onChange={handleInputChange}
                                        required
                                        disabled={!formData.branchId}
                                    >
                                        <option value="">{t("select_doctor")}</option>
                                        {getFilteredDoctors().map((doctor) => (
                                            <option key={doctor.id} value={doctor.id}>
                                                {doctor.name} ({doctor.specialization})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="cabinetType">{t("cabinet_type")}</label>
                                    <select
                                        id="cabinetType"
                                        name="cabinetType"
                                        value={formData.cabinetType}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">{t("select_type")}</option>
                                        <option value="examination">{t("examination_room")}</option>
                                        <option value="procedure">{t("procedure_room")}</option>
                                        <option value="surgery">{t("surgery_room")}</option>
                                        <option value="laboratory">{t("laboratory")}</option>
                                        <option value="dental">{t("dental_room")}</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="capacity">{t("capacity")}</label>
                                    <input
                                        type="number"
                                        id="capacity"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleInputChange}
                                        min="1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">{t("status")}</label>
                                <select id="status" name="status" value={formData.status} onChange={handleInputChange} required>
                                    <option value="available">{t("available")}</option>
                                    <option value="occupied">{t("occupied")}</option>
                                    <option value="maintenance">{t("maintenance")}</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">{t("description")}</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>{t("equipment")}</label>
                                <div className="equipment-checkboxes">
                                    {equipments.map((equipment) => (
                                        <div key={equipment.id} className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                id={`equipment-${equipment.id}`}
                                                checked={selectedEquipments.includes(equipment.id)}
                                                onChange={() => handleEquipmentChange(equipment.id)}
                                            />
                                            <label htmlFor={`equipment-${equipment.id}`}>
                                                {equipment.name} ({equipment.type})
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                                {t("cancel")}
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleAddCabinet}
                                disabled={
                                    !formData.cabinetNumber ||
                                    !formData.cabinetType ||
                                    !formData.branchId ||
                                    !formData.doctorId ||
                                    !formData.floor ||
                                    !formData.capacity
                                }
                            >
                                {t("add_cabinet")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Cabinet Modal */}
            {showEditModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>{t("edit_cabinet")}</h3>
                            <button className="close-btn" onClick={() => setShowEditModal(false)}>
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="edit-cabinetNumber">{t("cabinet_number")}</label>
                                    <input
                                        type="text"
                                        id="edit-cabinetNumber"
                                        name="cabinetNumber"
                                        value={formData.cabinetNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-floor">{t("floor")}</label>
                                    <input
                                        type="text"
                                        id="edit-floor"
                                        name="floor"
                                        value={formData.floor}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="edit-branchId">{t("branch")}</label>
                                    <select
                                        id="edit-branchId"
                                        name="branchId"
                                        value={formData.branchId}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">{t("select_branch")}</option>
                                        {branches.map((branch) => (
                                            <option key={branch.id} value={branch.id}>
                                                {branch.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-doctorId">{t("doctor")}</label>
                                    <select
                                        id="edit-doctorId"
                                        name="doctorId"
                                        value={formData.doctorId}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">{t("select_doctor")}</option>
                                        {doctors.map((doctor) => (
                                            <option key={doctor.id} value={doctor.id}>
                                                {doctor.name} ({doctor.specialization})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="edit-cabinetType">{t("cabinet_type")}</label>
                                    <select
                                        id="edit-cabinetType"
                                        name="cabinetType"
                                        value={formData.cabinetType}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">{t("select_type")}</option>
                                        <option value="examination">{t("examination_room")}</option>
                                        <option value="procedure">{t("procedure_room")}</option>
                                        <option value="surgery">{t("surgery_room")}</option>
                                        <option value="laboratory">{t("laboratory")}</option>
                                        <option value="dental">{t("dental_room")}</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edit-capacity">{t("capacity")}</label>
                                    <input
                                        type="number"
                                        id="edit-capacity"
                                        name="capacity"
                                        value={formData.capacity}
                                        onChange={handleInputChange}
                                        min="1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-status">{t("status")}</label>
                                <select id="edit-status" name="status" value={formData.status} onChange={handleInputChange} required>
                                    <option value="available">{t("available")}</option>
                                    <option value="occupied">{t("occupied")}</option>
                                    <option value="maintenance">{t("maintenance")}</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="edit-description">{t("description")}</label>
                                <textarea
                                    id="edit-description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="3"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>{t("equipment")}</label>
                                <div className="equipment-checkboxes">
                                    {equipments.map((equipment) => (
                                        <div key={equipment.id} className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                id={`edit-equipment-${equipment.id}`}
                                                checked={selectedEquipments.includes(equipment.id)}
                                                onChange={() => handleEquipmentChange(equipment.id)}
                                            />
                                            <label htmlFor={`edit-equipment-${equipment.id}`}>
                                                {equipment.name} ({equipment.type})
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                                {t("cancel")}
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleEditCabinet}
                                disabled={
                                    !formData.cabinetNumber ||
                                    !formData.cabinetType ||
                                    !formData.branchId ||
                                    !formData.doctorId ||
                                    !formData.floor ||
                                    !formData.capacity
                                }
                            >
                                {t("save")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cabinet Details Modal */}
            {showDetailsModal && currentCabinet && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>
                                {t("cabinet")} {currentCabinet.cabinetNumber} {t("details")}
                            </h3>
                            <button className="close-btn" onClick={() => setShowDetailsModal(false)}>
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="cabinet-details">
                                <div className="detail-row">
                                    <div className="detail-label">{t("cabinet_number")}:</div>
                                    <div className="detail-value">{currentCabinet.cabinetNumber}</div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">{t("cabinet_type")}:</div>
                                    <div className="detail-value">{getCabinetTypeLabel(currentCabinet.cabinetType)}</div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">{t("branch")}:</div>
                                    <div className="detail-value">{currentCabinet.branchName}</div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">{t("doctor")}:</div>
                                    <div className="detail-value">{currentCabinet.doctorName}</div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">{t("floor")}:</div>
                                    <div className="detail-value">{currentCabinet.floor}</div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">{t("capacity")}:</div>
                                    <div className="detail-value">{currentCabinet.capacity}</div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">{t("status")}:</div>
                                    <div className="detail-value">
                                        <span className={`status-badge ${currentCabinet.status}`}>
                                            {getStatusLabel(currentCabinet.status)}
                                        </span>
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">{t("description")}:</div>
                                    <div className="detail-value">{currentCabinet.description}</div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">{t("equipment")}:</div>
                                    <div className="detail-value">
                                        {currentCabinet.equipments && currentCabinet.equipments.length > 0
                                            ? getEquipmentNames(currentCabinet.equipments)
                                            : t("no_equipment")}
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">{t("last_maintenance")}:</div>
                                    <div className="detail-value">{currentCabinet.lastMaintenance}</div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">{t("next_maintenance")}:</div>
                                    <div className="detail-value">{currentCabinet.nextMaintenance}</div>
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={() => setShowDetailsModal(false)}>
                                {t("close")}
                            </button>
                            <button className="btn btn-outline" onClick={() => openEditModal(currentCabinet)}>
                                <FaEdit /> {t("edit")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

