"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useLanguage } from "../../contexts/LanguageContext"
import apiProfile from "../../api/apiProfile"
import SuccessModal from "../modal/SuccessModal"
import ConfirmModal from "../modal/ConfirmModal"
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaBriefcase,
    FaClinicMedical,
    FaMoneyBillWave,
    FaIdCard,
    FaUserMd,
    FaCalendarAlt,
    FaEdit,
    FaArrowLeft,
    FaExclamationTriangle,
    FaSave,
    FaTimes,
    FaLock,
    FaInfoCircle,
} from "react-icons/fa"

export default function Profile() {
    const navigate = useNavigate()
    const { t } = useLanguage()
    const { user, logout } = useAuth()

    const [profileData, setProfileData] = useState(null)
    const [editedProfile, setEditedProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [isChangingPassword, setIsChangingPassword] = useState(false)
    const [usingCachedData, setUsingCachedData] = useState(false)

    // Password change state
    const [passwordData, setPasswordData] = useState({
        old_password: "",
        new_password: "",
        confirm_password: "",
    })

    // Modal states
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [successModalProps, setSuccessModalProps] = useState({
        title: "",
        message: "",
    })
    const [confirmModalProps, setConfirmModalProps] = useState({
        title: "",
        message: "",
        confirmText: "",
        cancelText: "",
        type: "warning",
        onConfirm: () => { },
    })

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                setLoading(true)

                // First, get user data from localStorage as a backup
                let localUserData = null
                const storedData = localStorage.getItem("user")

                if (storedData) {
                    const parsedData = JSON.parse(storedData)
                    localUserData = parsedData
                }

                // Try to fetch from API
                if (localUserData && localUserData.id) {
                    try {
                        const apiData = await apiProfile.fetchUserProfile(localUserData.id)
                        setProfileData(apiData)
                        setEditedProfile(apiData)
                        setUsingCachedData(false)
                    } catch (apiError) {
                        console.error("Error fetching from API, using cached data:", apiError)
                        // If API fails, use localStorage data
                        setProfileData(localUserData)
                        setEditedProfile(localUserData)
                        setUsingCachedData(true)
                    }
                } else {
                    // No local data available
                    setError(t("profile_data_not_found"))
                }
            } catch (err) {
                console.error("Error loading profile data:", err)
                setError(err.message || t("error_loading_profile"))
            } finally {
                setLoading(false)
            }
        }

        fetchProfileData()
    }, [t])

    // Handle back button click
    const handleBack = () => {
        navigate(-1) // Go back to previous page
    }

    // Handle edit button click
    const handleEdit = () => {
        setIsEditing(true)
    }

    // Handle cancel edit
    const handleCancelEdit = () => {
        setEditedProfile(profileData)
        setIsEditing(false)
    }

    // Handle input change in edit form
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEditedProfile({
            ...editedProfile,
            [name]: value,
        })
    }

    // Handle password input change
    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setPasswordData({
            ...passwordData,
            [name]: value,
        })
    }

    // Handle save changes
    const handleSaveChanges = async () => {
        try {
            setSaving(true)

            // Make PATCH request to update user profile using apiProfile
            const updatedUser = await apiProfile.updateUserProfile(profileData.id, editedProfile)

            // Update local storage with new data
            const storedData = localStorage.getItem("authData")
            if (storedData) {
                const parsedData = JSON.parse(storedData)
                parsedData.user = updatedUser
                localStorage.setItem("authData", JSON.stringify(parsedData))
            }

            // Update state
            setProfileData(updatedUser)
            setIsEditing(false)
            setUsingCachedData(false)

            // Show success message
            setSuccessModalProps({
                title: t("success"),
                message: t("profile_updated_successfully"),
            })
            setShowSuccessModal(true)
        } catch (err) {
            console.error("Error updating profile:", err)

            // Show error message
            setConfirmModalProps({
                title: t("error"),
                message: err.response?.data?.message || t("error_updating_profile"),
                confirmText: t("ok"),
                type: "error",
                onConfirm: () => setShowConfirmModal(false),
            })
            setShowConfirmModal(true)
        } finally {
            setSaving(false)
        }
    }

    // Handle change password button click
    const handleChangePasswordClick = () => {
        if (usingCachedData) {
            // Show warning that password can't be changed while using cached data
            setConfirmModalProps({
                title: t("service_unavailable"),
                message: t("password_change_unavailable_offline"),
                confirmText: t("ok"),
                type: "warning",
                onConfirm: () => setShowConfirmModal(false),
            })
            setShowConfirmModal(true)
            return
        }

        setIsChangingPassword(true)
    }

    // Handle cancel password change
    const handleCancelPasswordChange = () => {
        setPasswordData({
            old_password: "",
            new_password: "",
            confirm_password: "",
        })
        setIsChangingPassword(false)
    }

    // Handle save password
    const handleSavePassword = async () => {
        // Validate passwords
        if (passwordData.new_password !== passwordData.confirm_password) {
            setConfirmModalProps({
                title: t("error"),
                message: t("passwords_do_not_match"),
                confirmText: t("ok"),
                type: "error",
                onConfirm: () => setShowConfirmModal(false),
            })
            setShowConfirmModal(true)
            return
        }

        try {
            setSaving(true)

            // Make request to change password using apiProfile
            await apiProfile.changePassword({
                old_password: passwordData.old_password,
                new_password: passwordData.new_password,
            })

            // Reset form and state
            setPasswordData({
                old_password: "",
                new_password: "",
                confirm_password: "",
            })
            setIsChangingPassword(false)

            // Show success message
            setSuccessModalProps({
                title: t("success"),
                message: t("password_changed_successfully"),
            })
            setShowSuccessModal(true)
        } catch (err) {
            console.error("Error changing password:", err)

            // Show error message
            setConfirmModalProps({
                title: t("error"),
                message: err.response?.data?.message || t("error_changing_password"),
                confirmText: t("ok"),
                type: "error",
                onConfirm: () => setShowConfirmModal(false),
            })
            setShowConfirmModal(true)
        } finally {
            setSaving(false)
        }
    }

    // Format value with fallback for empty values
    const formatValue = (value, fallback = "-") => {
        if (value === null || value === undefined || value === "") {
            return fallback
        }
        return value
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
        <div className="profile-container">
            <div className="profile-header">
                <button className="btn-back" onClick={handleBack}>
                    <FaArrowLeft /> {t("back")}
                </button>
                <h1 className="profile-title">{t("my_profile")}</h1>
                <div className="profile-actions">
                    {!isEditing && !isChangingPassword && (
                        <>
                            <button className="btn btn-outline btn-icon" onClick={handleChangePasswordClick}>
                                <FaLock /> {t("change_password")}
                            </button>
                            <button className="btn btn-primary btn-icon" onClick={handleEdit}>
                                <FaEdit /> {t("edit_profile")}
                            </button>
                        </>
                    )}
                </div>
            </div>

            {usingCachedData && (
                <div className="cached-data-warning">
                    <FaInfoCircle /> {t("using_cached_data")}
                    <p>{t("service_error_try_later")}</p>
                </div>
            )}

            {profileData && (
                <div className="profile-content">
                    {isChangingPassword ? (
                        <div className="password-change-form">
                            <h2 className="section-title">{t("change_password")}</h2>

                            <div className="form-group">
                                <label htmlFor="old_password">{t("current_password")}</label>
                                <input
                                    type="password"
                                    id="old_password"
                                    name="old_password"
                                    value={passwordData.old_password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="new_password">{t("new_password")}</label>
                                <input
                                    type="password"
                                    id="new_password"
                                    name="new_password"
                                    value={passwordData.new_password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirm_password">{t("confirm_password")}</label>
                                <input
                                    type="password"
                                    id="confirm_password"
                                    name="confirm_password"
                                    value={passwordData.confirm_password}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>

                            <div className="form-actions">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCancelPasswordChange}
                                    disabled={saving}
                                >
                                    <FaTimes /> {t("cancel")}
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSavePassword} disabled={saving}>
                                    <FaSave /> {t("save_changes")}
                                </button>
                            </div>
                        </div>
                    ) : isEditing ? (
                        <div className="profile-edit-form">
                            <h2 className="section-title">{t("edit_profile")}</h2>

                            {usingCachedData && (
                                <div className="edit-warning">
                                    <FaInfoCircle /> {t("editing_while_offline")}
                                </div>
                            )}

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="first_name">{t("first_name")}</label>
                                    <input
                                        type="text"
                                        id="first_name"
                                        name="first_name"
                                        value={editedProfile.first_name || ""}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="last_name">{t("last_name")}</label>
                                    <input
                                        type="text"
                                        id="last_name"
                                        name="last_name"
                                        value={editedProfile.last_name || ""}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="email">{t("email")}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={editedProfile.email || ""}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone_number">{t("phone")}</label>
                                    <input
                                        type="text"
                                        id="phone_number"
                                        name="phone_number"
                                        value={editedProfile.phone_number || ""}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={handleCancelEdit} disabled={saving}>
                                    <FaTimes /> {t("cancel")}
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveChanges} disabled={saving}>
                                    <FaSave /> {t("save_changes")}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="profile-card">
                            <div className="profile-card-header">
                                <div className="profile-avatar">
                                    <FaUser />
                                </div>
                                <div className="profile-basic-info">
                                    <h2 className="profile-name">
                                        {formatValue(
                                            `${profileData.first_name} ${profileData.last_name}`.trim(),
                                            profileData.email || t("user"),
                                        )}
                                    </h2>
                                    <div className="profile-role">{formatValue(profileData.role_name)}</div>
                                    <div className={`profile-status ${profileData.status}`}>
                                        {profileData.status === "faol" ? t("active") : t("inactive")}
                                    </div>
                                </div>
                            </div>

                            <div className="profile-card-body">
                                <div className="info-section">
                                    <h3 className="section-title">{t("personal_information")}</h3>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <div className="info-label">
                                                <FaIdCard /> {t("id")}
                                            </div>
                                            <div className="info-value">{formatValue(profileData.id)}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">
                                                <FaEnvelope /> {t("email")}
                                            </div>
                                            <div className="info-value">{formatValue(profileData.email)}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">
                                                <FaPhone /> {t("phone")}
                                            </div>
                                            <div className="info-value">{formatValue(profileData.phone_number)}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-section">
                                    <h3 className="section-title">{t("professional_information")}</h3>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <div className="info-label">
                                                <FaBriefcase /> {t("role")}
                                            </div>
                                            <div className="info-value">{formatValue(profileData.role_name)}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">
                                                <FaUserMd /> {t("specialization")}
                                            </div>
                                            <div className="info-value">{formatValue(profileData.specialization_name)}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">
                                                <FaClinicMedical /> {t("clinic")}
                                            </div>
                                            <div className="info-value">{formatValue(profileData.clinic_name)}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">
                                                <FaClinicMedical /> {t("branch")}
                                            </div>
                                            <div className="info-value">{formatValue(profileData.branch)}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">
                                                <FaMoneyBillWave /> {t("salary")}
                                            </div>
                                            <div className="info-value">{formatValue(profileData.salary)}</div>
                                        </div>
                                    </div>
                                </div>

                                {(profileData.start_holiday || profileData.end_holiday || profileData.reason_holiday) && (
                                    <div className="info-section">
                                        <h3 className="section-title">{t("holiday_information")}</h3>
                                        <div className="info-grid">
                                            {profileData.reason_holiday && (
                                                <div className="info-item">
                                                    <div className="info-label">
                                                        <FaCalendarAlt /> {t("reason_holiday")}
                                                    </div>
                                                    <div className="info-value">{formatValue(profileData.reason_holiday)}</div>
                                                </div>
                                            )}
                                            {profileData.start_holiday && (
                                                <div className="info-item">
                                                    <div className="info-label">
                                                        <FaCalendarAlt /> {t("start_holiday")}
                                                    </div>
                                                    <div className="info-value">{new Date(profileData.start_holiday).toLocaleDateString()}</div>
                                                </div>
                                            )}
                                            {profileData.end_holiday && (
                                                <div className="info-item">
                                                    <div className="info-label">
                                                        <FaCalendarAlt /> {t("end_holiday")}
                                                    </div>
                                                    <div className="info-value">{new Date(profileData.end_holiday).toLocaleDateString()}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title={successModalProps.title}
                message={successModalProps.message}
                autoClose={true}
                autoCloseTime={3000}
            />

            {/* Confirm Modal */}
            <ConfirmModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={confirmModalProps.onConfirm}
                title={confirmModalProps.title}
                message={confirmModalProps.message}
                confirmText={confirmModalProps.confirmText}
                cancelText={confirmModalProps.cancelText}
                type={confirmModalProps.type}
                isLoading={saving}
            />
        </div>
    )
}
