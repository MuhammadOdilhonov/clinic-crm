import React, { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useLanguage } from "../../contexts/LanguageContext"
import { FaUserCircle, FaEnvelope, FaPhone, FaLock, FaIdCard } from "react-icons/fa"

export default function Profile() {
    const { user } = useAuth()
    const { t, language, changeLanguage } = useLanguage()
    const [isEditing, setIsEditing] = useState(false)
    const [profileData, setProfileData] = useState({
        name: user.name || "",
        email: "user@example.com",
        phone: "+998 90 123 45 67",
        position: user.role === "doctor" ? t("doctor") : user.role === "admin" ? t("admin") : t("director"),
        bio: "Klinika CRM tizimida faoliyat yurituvchi xodim.",
        language: language,
    })
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [passwordError, setPasswordError] = useState("")
    const [passwordSuccess, setPasswordSuccess] = useState("")

    const handleProfileChange = (e) => {
        const { name, value } = e.target

        if (name === "language") {
            changeLanguage(value)
        }

        setProfileData({
            ...profileData,
            [name]: value,
        })
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setPasswordData({
            ...passwordData,
            [name]: value,
        })

        // Clear errors when typing
        if (passwordError) setPasswordError("")
        if (passwordSuccess) setPasswordSuccess("")
    }

    const handleProfileSubmit = (e) => {
        e.preventDefault()
        // Here you would typically send the updated profile to your API
        console.log("Updated profile:", profileData)
        setIsEditing(false)
    }

    const handlePasswordSubmit = (e) => {
        e.preventDefault()

        // Simple validation
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError(t("passwordMismatch"))
            return
        }

        if (passwordData.newPassword.length < 6) {
            setPasswordError(t("passwordLength"))
            return
        }

        // Here you would typically send the password change request to your API
        console.log("Password change request:", passwordData)

        // Reset form and show success message
        setPasswordData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        })
        setPasswordSuccess(t("passwordChanged"))
    }

    return (
        <div className="profile-container">
            <h1 className="page-title">{t("profile")}</h1>

            <div className="profile-content">
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="profile-avatar">{user.name.charAt(0)}</div>
                        <h2>{user.name}</h2>
                        <p className={`profile-role ${user.role}`}>{t(user.role)}</p>
                    </div>

                    <div className="profile-body">
                        <form onSubmit={handleProfileSubmit}>
                            <div className="form-group">
                                <label>
                                    <FaUserCircle /> {t("fullName")}
                                </label>
                                {isEditing ? (
                                    <input type="text" name="name" value={profileData.name} onChange={handleProfileChange} />
                                ) : (
                                    <p>{profileData.name}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>
                                    <FaEnvelope /> {t("email")}
                                </label>
                                {isEditing ? (
                                    <input type="email" name="email" value={profileData.email} onChange={handleProfileChange} />
                                ) : (
                                    <p>{profileData.email}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>
                                    <FaPhone /> {t("phone")}
                                </label>
                                {isEditing ? (
                                    <input type="tel" name="phone" value={profileData.phone} onChange={handleProfileChange} />
                                ) : (
                                    <p>{profileData.phone}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>
                                    <FaIdCard /> {t("position")}
                                </label>
                                {isEditing ? (
                                    <input type="text" name="position" value={profileData.position} onChange={handleProfileChange} />
                                ) : (
                                    <p>{profileData.position}</p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>{t("language")}</label>
                                {isEditing ? (
                                    <select name="language" value={profileData.language} onChange={handleProfileChange}>
                                        <option value="uz">O'zbek</option>
                                        <option value="ru">Русский</option>
                                        <option value="en">English</option>
                                        <option value="kz">Қазақша</option>
                                    </select>
                                ) : (
                                    <p>
                                        {profileData.language === "uz" && "O'zbek"}
                                        {profileData.language === "ru" && "Русский"}
                                        {profileData.language === "en" && "English"}
                                        {profileData.language === "kz" && "Қазақша"}
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label>{t("bio")}</label>
                                {isEditing ? (
                                    <textarea name="bio" value={profileData.bio} onChange={handleProfileChange} rows={4}></textarea>
                                ) : (
                                    <p>{profileData.bio}</p>
                                )}
                            </div>

                            <div className="form-actions">
                                {isEditing ? (
                                    <>
                                        <button type="submit" className="btn btn-primary">
                                            {t("save")}
                                        </button>
                                        <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                                            {t("cancel")}
                                        </button>
                                    </>
                                ) : (
                                    <button type="button" className="btn btn-primary" onClick={() => setIsEditing(true)}>
                                        {t("edit")}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="password-card">
                    <div className="card-header">
                        <h2>{t("changePassword")}</h2>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handlePasswordSubmit}>
                            {passwordError && <div className="error-message">{passwordError}</div>}

                            {passwordSuccess && <div className="success-message">{passwordSuccess}</div>}

                            <div className="form-group">
                                <label>
                                    <FaLock /> {t("currentPassword")}
                                </label>
                                <input
                                    type="password"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <FaLock /> {t("newPassword")}
                                </label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>
                                    <FaLock /> {t("confirmPassword")}
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">
                                    {t("changePassword")}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};