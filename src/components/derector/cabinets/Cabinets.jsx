import React , { useState, useEffect } from "react"
import { FaPlus, FaSearch, FaTimes, FaDoorOpen, FaEdit, FaTrash, FaFilter } from "react-icons/fa"
import { useLanguage } from "../../../contexts/LanguageContext"

export default function Cabinets() {
    const { t } = useLanguage()
    const [cabinetsData, setCabinetsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [showAddModal, setShowAddModal] = useState(false)
    const [showEditModal, setShowEditModal] = useState(false)
    const [showStatsModal, setShowStatsModal] = useState(true)
    const [showFilters, setShowFilters] = useState(false)
    const [filterType, setFilterType] = useState("all")
    const [filterFloor, setFilterFloor] = useState("all")
    const [filterStatus, setFilterStatus] = useState("all")
    const [currentCabinet, setCurrentCabinet] = useState(null)
    const [newCabinet, setNewCabinet] = useState({
        name: "",
        type: "examination",
        floor: "1",
        status: "available",
        equipment: "",
    })

    // Stats data
    const stats = {
        totalCabinets: 12,
        availableCabinets: 8,
        occupiedCabinets: 3,
        maintenanceCabinets: 1,
    }

    // Cabinet types distribution
    const typeDistribution = [
        { type: "Examination", count: 5 },
        { type: "Procedure", count: 3 },
        { type: "Surgery", count: 2 },
        { type: "Laboratory", count: 1 },
        { type: "X-ray", count: 1 },
    ]

    // Fetch cabinets data
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setCabinetsData([
                {
                    id: 1,
                    name: "Cabinet 101",
                    type: "examination",
                    floor: "1",
                    status: "available",
                    equipment: "Basic examination equipment",
                },
                {
                    id: 2,
                    name: "Cabinet 102",
                    type: "procedure",
                    floor: "1",
                    status: "occupied",
                    equipment: "Procedure tools, medical supplies",
                },
                {
                    id: 3,
                    name: "Cabinet 201",
                    type: "surgery",
                    floor: "2",
                    status: "available",
                    equipment: "Surgical equipment, anesthesia machine",
                },
                {
                    id: 4,
                    name: "Cabinet 202",
                    type: "examination",
                    floor: "2",
                    status: "occupied",
                    equipment: "Basic examination equipment",
                },
                {
                    id: 5,
                    name: "Cabinet 301",
                    type: "laboratory",
                    floor: "3",
                    status: "available",
                    equipment: "Lab equipment, microscopes, centrifuge",
                },
                {
                    id: 6,
                    name: "Cabinet 302",
                    type: "x-ray",
                    floor: "3",
                    status: "maintenance",
                    equipment: "X-ray machine, protective gear",
                },
            ])
            setIsLoading(false)
        }, 1000)
    }, [])

    // Handle search
    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    // Toggle filters
    const toggleFilters = () => {
        setShowFilters(!showFilters)
    }

    // Filter cabinets based on search term and filters
    const filteredCabinets = cabinetsData.filter((cabinet) => {
        // Search term filter
        const matchesSearch =
            cabinet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cabinet.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cabinet.floor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cabinet.equipment.toLowerCase().includes(searchTerm.toLowerCase())

        // Type filter
        const matchesType = filterType === "all" || cabinet.type === filterType

        // Floor filter
        const matchesFloor = filterFloor === "all" || cabinet.floor === filterFloor

        // Status filter
        const matchesStatus = filterStatus === "all" || cabinet.status === filterStatus

        return matchesSearch && matchesType && matchesFloor && matchesStatus
    })

    // Handle input change for new cabinet
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewCabinet({
            ...newCabinet,
            [name]: value,
        })
    }

    // Handle edit input change
    const handleEditInputChange = (e) => {
        const { name, value } = e.target
        setCurrentCabinet({
            ...currentCabinet,
            [name]: value,
        })
    }

    // Handle add cabinet
    const handleAddCabinet = (e) => {
        e.preventDefault()
        const newCabinetItem = {
            id: cabinetsData.length + 1,
            ...newCabinet,
        }
        setCabinetsData([...cabinetsData, newCabinetItem])
        setNewCabinet({
            name: "",
            type: "examination",
            floor: "1",
            status: "available",
            equipment: "",
        })
        setShowAddModal(false)
    }

    // Open edit modal
    const openEditModal = (cabinet) => {
        setCurrentCabinet({ ...cabinet })
        setShowEditModal(true)
    }

    // Handle update cabinet
    const handleUpdateCabinet = (e) => {
        e.preventDefault()
        const updatedCabinets = cabinetsData.map((cabinet) => (cabinet.id === currentCabinet.id ? currentCabinet : cabinet))
        setCabinetsData(updatedCabinets)
        setShowEditModal(false)
        setCurrentCabinet(null)
    }

    // Handle delete cabinet
    const handleDeleteCabinet = (id) => {
        if (window.confirm(t("confirm_delete_cabinet"))) {
            const updatedCabinets = cabinetsData.filter((cabinet) => cabinet.id !== id)
            setCabinetsData(updatedCabinets)
        }
    }

    return (
        <div className="cab-page">
            <div className="cab-page-header">
                <h1 className="cab-page-title">{t("cabinets")}</h1>
                <div className="cab-page-actions">
                    <button className="cab-action-button close-stats" onClick={() => setShowStatsModal(!showStatsModal)}>
                        {showStatsModal ? <FaTimes /> : t("show_stats")}
                    </button>
                    <button className="cab-action-button add-cabinet" onClick={() => setShowAddModal(true)}>
                        <FaPlus /> {t("add_new_cabinet")}
                    </button>
                </div>
            </div>

            {showStatsModal && (
                <div className="cab-stats-container">
                    <div className="cab-stats-grid">
                        <div className="cab-stat-card">
                            <div className="cab-stat-icon total">
                                <FaDoorOpen />
                            </div>
                            <div className="cab-stat-content">
                                <h3 className="cab-stat-value">{stats.totalCabinets}</h3>
                                <p className="cab-stat-label">{t("total_cabinets")}</p>
                            </div>
                        </div>

                        <div className="cab-stat-card">
                            <div className="cab-stat-icon available">
                                <FaDoorOpen />
                            </div>
                            <div className="cab-stat-content">
                                <h3 className="cab-stat-value">{stats.availableCabinets}</h3>
                                <p className="cab-stat-label">{t("available_cabinets")}</p>
                            </div>
                        </div>

                        <div className="cab-stat-card">
                            <div className="cab-stat-icon occupied">
                                <FaDoorOpen />
                            </div>
                            <div className="cab-stat-content">
                                <h3 className="cab-stat-value">{stats.occupiedCabinets}</h3>
                                <p className="cab-stat-label">{t("occupied_cabinets")}</p>
                            </div>
                        </div>

                        <div className="cab-stat-card">
                            <div className="cab-stat-icon maintenance">
                                <FaDoorOpen />
                            </div>
                            <div className="cab-stat-content">
                                <h3 className="cab-stat-value">{stats.maintenanceCabinets}</h3>
                                <p className="cab-stat-label">{t("maintenance_cabinets")}</p>
                            </div>
                        </div>
                    </div>

                    <div className="cab-type-distribution">
                        <h3 className="cab-section-title">{t("type_distribution")}</h3>
                        <div className="cab-type-bars">
                            {typeDistribution.map((type, index) => (
                                <div className="cab-type-bar-container" key={index}>
                                    <div className="cab-type-bar-header">
                                        <span className="cab-type-name">{type.type}</span>
                                        <span className="cab-type-count">{type.count}</span>
                                    </div>
                                    <div className="cab-type-bar-wrapper">
                                        <div
                                            className="cab-type-bar"
                                            style={{
                                                width: `${(type.count / stats.totalCabinets) * 100}%`,
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="cab-content">
                <div className="cab-search-container">
                    <div className="cab-search-input-wrapper">
                        <FaSearch className="cab-search-icon" />
                        <input
                            type="text"
                            className="cab-search-input"
                            placeholder={t("search_cabinets")}
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                    <button className={`cab-filter-toggle ${showFilters ? "active" : ""}`} onClick={toggleFilters}>
                        <FaFilter /> {t("filters")}
                    </button>
                </div>

                {showFilters && (
                    <div className="cab-filters">
                        <div className="cab-filter-group">
                            <label>{t("type")}:</label>
                            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                <option value="examination">{t("examination")}</option>
                                <option value="procedure">{t("procedure")}</option>
                                <option value="surgery">{t("surgery")}</option>
                                <option value="laboratory">{t("laboratory")}</option>
                                <option value="x-ray">{t("x-ray")}</option>
                            </select>
                        </div>
                        <div className="cab-filter-group">
                            <label>{t("floor")}:</label>
                            <select value={filterFloor} onChange={(e) => setFilterFloor(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div className="cab-filter-group">
                            <label>{t("status")}:</label>
                            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                <option value="available">{t("available")}</option>
                                <option value="occupied">{t("occupied")}</option>
                                <option value="maintenance">{t("maintenance")}</option>
                            </select>
                        </div>
                    </div>
                )}

                <div className="cab-table-container">
                    {isLoading ? (
                        <div className="cab-loading">{t("loading")}</div>
                    ) : (
                        <table className="cab-table">
                            <thead>
                                <tr>
                                    <th>{t("name")}</th>
                                    <th>{t("type")}</th>
                                    <th>{t("floor")}</th>
                                    <th>{t("status")}</th>
                                    <th>{t("equipment")}</th>
                                    <th>{t("actions")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCabinets.length > 0 ? (
                                    filteredCabinets.map((cabinet) => (
                                        <tr key={cabinet.id}>
                                            <td>{cabinet.name}</td>
                                            <td>{t(cabinet.type)}</td>
                                            <td>{cabinet.floor}</td>
                                            <td>
                                                <span className={`cab-status-badge ${cabinet.status}`}>{t(cabinet.status)}</span>
                                            </td>
                                            <td>{cabinet.equipment}</td>
                                            <td>
                                                <div className="cab-actions">
                                                    <button className="cab-action-btn edit" onClick={() => openEditModal(cabinet)}>
                                                        <FaEdit />
                                                    </button>
                                                    <button className="cab-action-btn delete" onClick={() => handleDeleteCabinet(cabinet.id)}>
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="cab-no-data">
                                            {t("no_data_found")}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Add Cabinet Modal */}
            {showAddModal && (
                <div className="cab-modal-backdrop">
                    <div className="cab-modal">
                        <div className="cab-modal-header">
                            <h2>{t("add_cabinet")}</h2>
                            <button className="cab-modal-close" onClick={() => setShowAddModal(false)}>
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleAddCabinet} className="cab-form">
                            <div className="cab-form-group">
                                <label htmlFor="name">{t("name")}</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={newCabinet.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="cab-form-group">
                                <label htmlFor="type">{t("type")}</label>
                                <select id="type" name="type" value={newCabinet.type} onChange={handleInputChange} required>
                                    <option value="examination">{t("examination")}</option>
                                    <option value="procedure">{t("procedure")}</option>
                                    <option value="surgery">{t("surgery")}</option>
                                    <option value="laboratory">{t("laboratory")}</option>
                                    <option value="x-ray">{t("x-ray")}</option>
                                </select>
                            </div>
                            <div className="cab-form-group">
                                <label htmlFor="floor">{t("floor")}</label>
                                <select id="floor" name="floor" value={newCabinet.floor} onChange={handleInputChange} required>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div className="cab-form-group">
                                <label htmlFor="status">{t("status")}</label>
                                <select id="status" name="status" value={newCabinet.status} onChange={handleInputChange} required>
                                    <option value="available">{t("available")}</option>
                                    <option value="occupied">{t("occupied")}</option>
                                    <option value="maintenance">{t("maintenance")}</option>
                                </select>
                            </div>
                            <div className="cab-form-group">
                                <label htmlFor="equipment">{t("equipment")}</label>
                                <textarea
                                    id="equipment"
                                    name="equipment"
                                    value={newCabinet.equipment}
                                    onChange={handleInputChange}
                                    rows={3}
                                ></textarea>
                            </div>
                            <div className="cab-form-actions">
                                <button type="button" className="cab-form-cancel" onClick={() => setShowAddModal(false)}>
                                    {t("cancel")}
                                </button>
                                <button type="submit" className="cab-form-submit">
                                    {t("add")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Cabinet Modal */}
            {showEditModal && currentCabinet && (
                <div className="cab-modal-backdrop">
                    <div className="cab-modal">
                        <div className="cab-modal-header">
                            <h2>{t("edit_cabinet")}</h2>
                            <button className="cab-modal-close" onClick={() => setShowEditModal(false)}>
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleUpdateCabinet} className="cab-form">
                            <div className="cab-form-group">
                                <label htmlFor="edit-name">{t("name")}</label>
                                <input
                                    type="text"
                                    id="edit-name"
                                    name="name"
                                    value={currentCabinet.name}
                                    onChange={handleEditInputChange}
                                    required
                                />
                            </div>
                            <div className="cab-form-group">
                                <label htmlFor="edit-type">{t("type")}</label>
                                <select
                                    id="edit-type"
                                    name="type"
                                    value={currentCabinet.type}
                                    onChange={handleEditInputChange}
                                    required
                                >
                                    <option value="examination">{t("examination")}</option>
                                    <option value="procedure">{t("procedure")}</option>
                                    <option value="surgery">{t("surgery")}</option>
                                    <option value="laboratory">{t("laboratory")}</option>
                                    <option value="x-ray">{t("x-ray")}</option>
                                </select>
                            </div>
                            <div className="cab-form-group">
                                <label htmlFor="edit-floor">{t("floor")}</label>
                                <select
                                    id="edit-floor"
                                    name="floor"
                                    value={currentCabinet.floor}
                                    onChange={handleEditInputChange}
                                    required
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>
                            <div className="cab-form-group">
                                <label htmlFor="edit-status">{t("status")}</label>
                                <select
                                    id="edit-status"
                                    name="status"
                                    value={currentCabinet.status}
                                    onChange={handleEditInputChange}
                                    required
                                >
                                    <option value="available">{t("available")}</option>
                                    <option value="occupied">{t("occupied")}</option>
                                    <option value="maintenance">{t("maintenance")}</option>
                                </select>
                            </div>
                            <div className="cab-form-group">
                                <label htmlFor="edit-equipment">{t("equipment")}</label>
                                <textarea
                                    id="edit-equipment"
                                    name="equipment"
                                    value={currentCabinet.equipment}
                                    onChange={handleEditInputChange}
                                    rows={3}
                                ></textarea>
                            </div>
                            <div className="cab-form-actions">
                                <button type="button" className="cab-form-cancel" onClick={() => setShowEditModal(false)}>
                                    {t("cancel")}
                                </button>
                                <button type="submit" className="cab-form-submit">
                                    {t("save")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
};