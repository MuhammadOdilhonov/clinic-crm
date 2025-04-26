"use client"

import { useState, useEffect } from "react"
import {
    FaSave,
    FaGlobe,
    FaBuilding,
    FaPlus,
    FaEdit,
    FaTrash,
    FaCheck,
    FaTimes,
    FaSpinner,
    FaHospital,
    FaMapMarkerAlt,
    FaPhone,
    FaEnvelope,
    FaIdCard,
} from "react-icons/fa"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import apiSettings from "../../../api/apiSettings"

export default function Settings() {
    const { selectedBranch } = useAuth()
    const { language, t } = useLanguage()

    const [activeTab, setActiveTab] = useState("general")
    const [isLoading, setIsLoading] = useState(false)
    const [saveLoading, setSaveLoading] = useState(false)
    const [message, setMessage] = useState({ type: "", text: "" })

    // General settings
    const [clinicData, setClinicData] = useState({
        id: null,
        name: "",
        phone_number: "",
        license_number: "",
        is_active: true,
    })

    // Branch settings
    const [branches, setBranches] = useState([])
    const [editingBranch, setEditingBranch] = useState(null)
    const [isAddingBranch, setIsAddingBranch] = useState(false)
    const [newBranch, setNewBranch] = useState({
        name: "",
        address: "",
        phone_number: "",
        email: "",
    })

    // Fetch clinic data
    useEffect(() => {
        const fetchClinicData = async () => {
            setIsLoading(true)
            try {
                const data = await apiSettings.fetchClinicSettings()
                setClinicData(data)
            } catch (error) {
                console.error("Klinika ma'lumotlarini olishda xatolik:", error)
                setMessage({ type: "error", text: "Klinika ma'lumotlarini olishda xatolik yuz berdi" })
            } finally {
                setIsLoading(false)
            }
        }

        fetchClinicData()
    }, [])

    // Fetch branches
    useEffect(() => {
        const fetchBranches = async () => {
            setIsLoading(true)
            try {
                const data = await apiSettings.fetchBranches()
                setBranches(data)
            } catch (error) {
                console.error("Filiallarni olishda xatolik:", error)
                setMessage({ type: "error", text: "Filiallarni olishda xatolik yuz berdi" })
            } finally {
                setIsLoading(false)
            }
        }

        if (activeTab === "branches") {
            fetchBranches()
        }
    }, [activeTab])

    // Handle clinic data change
    const handleClinicDataChange = (e) => {
        const { name, value, type, checked } = e.target
        setClinicData({
            ...clinicData,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    // Handle save clinic settings
    const handleSaveClinicSettings = async () => {
        if (!clinicData.id) {
            setMessage({ type: "error", text: "Klinika ID si topilmadi" })
            return
        }

        setSaveLoading(true)
        try {
            await apiSettings.updateClinicSettings(clinicData.id, clinicData)
            setMessage({ type: "success", text: "Klinika ma'lumotlari muvaffaqiyatli saqlandi" })

            // Clear message after 3 seconds
            setTimeout(() => {
                setMessage({ type: "", text: "" })
            }, 3000)
        } catch (error) {
            console.error("Klinika ma'lumotlarini saqlashda xatolik:", error)
            setMessage({ type: "error", text: "Klinika ma'lumotlarini saqlashda xatolik yuz berdi" })
        } finally {
            setSaveLoading(false)
        }
    }

    // Handle branch data change
    const handleBranchDataChange = (e) => {
        const { name, value } = e.target

        if (editingBranch !== null) {
            // Update existing branch
            const updatedBranches = branches.map((branch) => {
                if (branch.id === editingBranch) {
                    return { ...branch, [name]: value }
                }
                return branch
            })
            setBranches(updatedBranches)
        } else if (isAddingBranch) {
            // Update new branch
            setNewBranch({
                ...newBranch,
                [name]: value,
            })
        }
    }

    // Start editing branch
    const handleEditBranch = (branchId) => {
        setEditingBranch(branchId)
        setIsAddingBranch(false)
    }

    // Cancel editing branch
    const handleCancelEdit = () => {
        setEditingBranch(null)
        setIsAddingBranch(false)

        // Reset new branch form
        setNewBranch({
            name: "",
            address: "",
            phone_number: "",
            email: "",
        })

        // Refresh branches to get original data
        if (activeTab === "branches") {
            apiSettings
                .fetchBranches()
                .then((data) => {
                    setBranches(data)
                })
                .catch((error) => {
                    console.error("Filiallarni qayta olishda xatolik:", error)
                })
        }
    }

    // Save branch changes
    const handleSaveBranch = async (branchId) => {
        setSaveLoading(true)
        try {
            const branchToUpdate = branches.find((branch) => branch.id === branchId)
            await apiSettings.updateBranch(branchId, branchToUpdate)

            setMessage({ type: "success", text: "Filial ma'lumotlari muvaffaqiyatli saqlandi" })
            setEditingBranch(null)

            // Clear message after 3 seconds
            setTimeout(() => {
                setMessage({ type: "", text: "" })
            }, 3000)
        } catch (error) {
            console.error("Filial ma'lumotlarini saqlashda xatolik:", error)
            setMessage({ type: "error", text: "Filial ma'lumotlarini saqlashda xatolik yuz berdi" })
        } finally {
            setSaveLoading(false)
        }
    }

    // Delete branch
    const handleDeleteBranch = async (branchId) => {
        if (!window.confirm(t("confirmDelete"))) {
            return
        }

        setSaveLoading(true)
        try {
            await apiSettings.deleteBranch(branchId)

            // Remove from state
            const updatedBranches = branches.filter((branch) => branch.id !== branchId)
            setBranches(updatedBranches)

            setMessage({ type: "success", text: "Filial muvaffaqiyatli o'chirildi" })

            // Clear message after 3 seconds
            setTimeout(() => {
                setMessage({ type: "", text: "" })
            }, 3000)
        } catch (error) {
            console.error("Filialni o'chirishda xatolik:", error)
            setMessage({ type: "error", text: "Filialni o'chirishda xatolik yuz berdi" })
        } finally {
            setSaveLoading(false)
        }
    }

    // Start adding new branch
    const handleAddBranch = () => {
        setIsAddingBranch(true)
        setEditingBranch(null)
    }

    // Save new branch
    const handleSaveNewBranch = async () => {
        // Validate required fields
        if (!newBranch.name || !newBranch.address || !newBranch.phone_number) {
            setMessage({ type: "error", text: "Iltimos, barcha majburiy maydonlarni to'ldiring" })
            return
        }

        setSaveLoading(true)
        try {
            const createdBranch = await apiSettings.createBranch(newBranch)

            // Add to state
            setBranches([...branches, createdBranch])

            // Reset form
            setNewBranch({
                name: "",
                address: "",
                phone_number: "",
                email: "",
            })

            setIsAddingBranch(false)
            setMessage({ type: "success", text: "Yangi filial muvaffaqiyatli yaratildi" })

            // Clear message after 3 seconds
            setTimeout(() => {
                setMessage({ type: "", text: "" })
            }, 3000)
        } catch (error) {
            console.error("Yangi filial yaratishda xatolik:", error)
            setMessage({ type: "error", text: "Yangi filial yaratishda xatolik yuz berdi" })
        } finally {
            setSaveLoading(false)
        }
    }

    return (
        <div className="director-settings">
            <div className="page-header">
                <h1 className="page-title">{t("settings")}</h1>
            </div>

            {message.text && (
                <div className={`alert alert-${message.type}`}>
                    {message.type === "success" ? <FaCheck className="alert-icon" /> : <FaTimes className="alert-icon" />}
                    <span>{message.text}</span>
                </div>
            )}

            <div className="settings-container">
                <div className="settings-sidebar">
                    <button
                        className={`settings-tab ${activeTab === "general" ? "active" : ""}`}
                        onClick={() => setActiveTab("general")}
                    >
                        <FaGlobe /> {t("generalSettings")}
                    </button>
                    <button
                        className={`settings-tab ${activeTab === "branches" ? "active" : ""}`}
                        onClick={() => setActiveTab("branches")}
                    >
                        <FaBuilding /> {t("branchSettings")}
                    </button>
                </div>

                <div className="settings-content">
                    {isLoading ? (
                        <div className="loading-container">
                            <div className="loading-spinner">
                                <FaSpinner className="spinner-icon" />
                                <span>Ma'lumotlar yuklanmoqda...</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* General Settings */}
                            {activeTab === "general" && (
                                <div className="settings-panel">
                                    <div className="panel-header">
                                        <h2>{t("generalSettings")}</h2>
                                        <button
                                            className={`btn btn-primary ${saveLoading ? "btn-loading" : ""}`}
                                            onClick={handleSaveClinicSettings}
                                            disabled={saveLoading}
                                        >
                                            {saveLoading ? (
                                                <>
                                                    <FaSpinner className="spinner-icon" />
                                                    <span>Saqlanmoqda...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <FaSave />
                                                    <span>{t("save")}</span>
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <div className="settings-card">
                                        <div className="card-header">
                                            <FaHospital className="card-icon" />
                                            <h3>Klinika ma'lumotlari</h3>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="clinic-name">{t("clinicName")}</label>
                                            <div className="input-with-icon">
                                                <FaHospital className="input-icon" />
                                                <input
                                                    id="clinic-name"
                                                    type="text"
                                                    name="name"
                                                    value={clinicData.name}
                                                    onChange={handleClinicDataChange}
                                                    placeholder="Klinika nomini kiriting"
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="clinic-phone">{t("phone")}</label>
                                                <div className="input-with-icon">
                                                    <FaPhone className="input-icon" />
                                                    <input
                                                        id="clinic-phone"
                                                        type="text"
                                                        name="phone_number"
                                                        value={clinicData.phone_number}
                                                        onChange={handleClinicDataChange}
                                                        placeholder="+998 XX XXX XX XX"
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="clinic-license">{t("licenseNumber")}</label>
                                                <div className="input-with-icon">
                                                    <FaIdCard className="input-icon" />
                                                    <input
                                                        id="clinic-license"
                                                        type="text"
                                                        name="license_number"
                                                        value={clinicData.license_number}
                                                        onChange={handleClinicDataChange}
                                                        placeholder="Litsenziya raqamini kiriting"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group checkbox-group">
                                            <input
                                                type="checkbox"
                                                id="is_active"
                                                name="is_active"
                                                checked={clinicData.is_active}
                                                onChange={handleClinicDataChange}
                                            />
                                            <label htmlFor="is_active">{t("isActive")}</label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Branch Settings */}
                            {activeTab === "branches" && (
                                <div className="settings-panel">
                                    <div className="panel-header">
                                        <h2>{t("branchSettings")}</h2>
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleAddBranch}
                                            disabled={isAddingBranch || editingBranch !== null || saveLoading}
                                        >
                                            <FaPlus />
                                            <span>{t("addBranch")}</span>
                                        </button>
                                    </div>

                                    {/* New Branch Form */}
                                    {isAddingBranch && (
                                        <div className="branch-card new-branch">
                                            <div className="card-header">
                                                <FaPlus className="card-icon" />
                                                <h3>{t("newBranch")}</h3>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="new-branch-name">{t("branchName")} *</label>
                                                <div className="input-with-icon">
                                                    <FaBuilding className="input-icon" />
                                                    <input
                                                        id="new-branch-name"
                                                        type="text"
                                                        name="name"
                                                        value={newBranch.name}
                                                        onChange={handleBranchDataChange}
                                                        placeholder="Filial nomini kiriting"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="new-branch-address">{t("address")} *</label>
                                                <div className="input-with-icon">
                                                    <FaMapMarkerAlt className="input-icon" />
                                                    <input
                                                        id="new-branch-address"
                                                        type="text"
                                                        name="address"
                                                        value={newBranch.address}
                                                        onChange={handleBranchDataChange}
                                                        placeholder="Filial manzilini kiriting"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="new-branch-phone">{t("phone")} *</label>
                                                <div className="input-with-icon">
                                                    <FaPhone className="input-icon" />
                                                    <input
                                                        id="new-branch-phone"
                                                        type="text"
                                                        name="phone_number"
                                                        value={newBranch.phone_number}
                                                        onChange={handleBranchDataChange}
                                                        placeholder="+998 XX XXX XX XX"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="new-branch-email">{t("email")}</label>
                                                <div className="input-with-icon">
                                                    <FaEnvelope className="input-icon" />
                                                    <input
                                                        id="new-branch-email"
                                                        type="email"
                                                        name="email"
                                                        value={newBranch.email}
                                                        onChange={handleBranchDataChange}
                                                        placeholder="example@domain.com"
                                                    />
                                                </div>
                                            </div>

                                            <div className="form-actions">
                                                <button
                                                    className={`btn btn-success ${saveLoading ? "btn-loading" : ""}`}
                                                    onClick={handleSaveNewBranch}
                                                    disabled={saveLoading}
                                                >
                                                    {saveLoading ? (
                                                        <>
                                                            <FaSpinner className="spinner-icon" />
                                                            <span>Saqlanmoqda...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaSave />
                                                            <span>Saqlash</span>
                                                        </>
                                                    )}
                                                </button>
                                                <button className="btn btn-danger" onClick={handleCancelEdit}>
                                                    <FaTimes />
                                                    <span>Bekor qilish</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="branch-grid">
                                        {branches.length === 0 ? (
                                            <div className="no-data">
                                                <FaBuilding className="no-data-icon" />
                                                <p>{t("noBranchesFound")}</p>
                                                <button className="btn btn-primary" onClick={handleAddBranch}>
                                                    <FaPlus />
                                                    <span>{t("addBranch")}</span>
                                                </button>
                                            </div>
                                        ) : (
                                            branches.map((branch) => (
                                                <div className={`branch-card ${editingBranch === branch.id ? "editing" : ""}`} key={branch.id}>
                                                    <div className="card-header">
                                                        <FaBuilding className="card-icon" />
                                                        <h3>{branch.name}</h3>
                                                    </div>

                                                    <div className="branch-content">
                                                        <div className="form-group">
                                                            <label>{t("branchName")}</label>
                                                            {editingBranch === branch.id ? (
                                                                <div className="input-with-icon">
                                                                    <FaBuilding className="input-icon" />
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        value={branch.name}
                                                                        onChange={handleBranchDataChange}
                                                                        placeholder="Filial nomini kiriting"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="info-field">
                                                                    <FaBuilding className="field-icon" />
                                                                    <p>{branch.name}</p>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="form-group">
                                                            <label>{t("address")}</label>
                                                            {editingBranch === branch.id ? (
                                                                <div className="input-with-icon">
                                                                    <FaMapMarkerAlt className="input-icon" />
                                                                    <input
                                                                        type="text"
                                                                        name="address"
                                                                        value={branch.address}
                                                                        onChange={handleBranchDataChange}
                                                                        placeholder="Filial manzilini kiriting"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="info-field">
                                                                    <FaMapMarkerAlt className="field-icon" />
                                                                    <p>{branch.address}</p>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="form-group">
                                                            <label>{t("phone")}</label>
                                                            {editingBranch === branch.id ? (
                                                                <div className="input-with-icon">
                                                                    <FaPhone className="input-icon" />
                                                                    <input
                                                                        type="text"
                                                                        name="phone_number"
                                                                        value={branch.phone_number}
                                                                        onChange={handleBranchDataChange}
                                                                        placeholder="+998 XX XXX XX XX"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="info-field">
                                                                    <FaPhone className="field-icon" />
                                                                    <p>{branch.phone_number}</p>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="form-group">
                                                            <label>{t("email")}</label>
                                                            {editingBranch === branch.id ? (
                                                                <div className="input-with-icon">
                                                                    <FaEnvelope className="input-icon" />
                                                                    <input
                                                                        type="email"
                                                                        name="email"
                                                                        value={branch.email}
                                                                        onChange={handleBranchDataChange}
                                                                        placeholder="example@domain.com"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="info-field">
                                                                    <FaEnvelope className="field-icon" />
                                                                    <p>{branch.email || "—"}</p>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="form-group">
                                                            <label>{t("clinic")}</label>
                                                            <div className="info-field">
                                                                <FaHospital className="field-icon" />
                                                                <p>{branch.clinic}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="branch-actions">
                                                        {editingBranch === branch.id ? (
                                                            <>
                                                                <button
                                                                    className={`btn btn-success ${saveLoading ? "btn-loading" : ""}`}
                                                                    onClick={() => handleSaveBranch(branch.id)}
                                                                    disabled={saveLoading}
                                                                >
                                                                    {saveLoading ? (
                                                                        <>
                                                                            <FaSpinner className="spinner-icon" />
                                                                            <span>Saqlanmoqda...</span>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <FaSave />
                                                                            <span>Saqlash</span>
                                                                        </>
                                                                    )}
                                                                </button>
                                                                <button className="btn btn-danger" onClick={handleCancelEdit}>
                                                                    <FaTimes />
                                                                    <span>Bekor qilish</span>
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <button
                                                                    className="btn btn-primary"
                                                                    onClick={() => handleEditBranch(branch.id)}
                                                                    disabled={editingBranch !== null || isAddingBranch || saveLoading}
                                                                >
                                                                    <FaEdit />
                                                                    <span>Tahrirlash</span>
                                                                </button>
                                                                <button
                                                                    className="btn btn-danger"
                                                                    onClick={() => handleDeleteBranch(branch.id)}
                                                                    disabled={editingBranch !== null || isAddingBranch || saveLoading}
                                                                >
                                                                    <FaTrash />
                                                                    <span>O'chirish</span>
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
