"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useLanguage } from "../../contexts/LanguageContext"
import { FaLock, FaUser, FaClinicMedical, FaEnvelope } from "react-icons/fa"
import { MdOutlineHealthAndSafety } from "react-icons/md"

export default function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const { t, language, changeLanguage } = useLanguage()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [showRequestAccess, setShowRequestAccess] = useState(false)
    const [clinicInfo, setClinicInfo] = useState({
        clinicName: "",
        fullName: "",
        age: "",
        email: "",
    })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loginAttempted, setLoginAttempted] = useState(false) // Login urinishi holati

    const handleLogin = async (e) => {
        e.preventDefault()

        // Agar login jarayoni ketayotgan bo'lsa yoki allaqachon urinilgan bo'lsa, qayta chaqirmaslik
        if (loading || loginAttempted) {
            console.log("Login already in progress or attempted, ignoring duplicate submit")
            return
        }

        setError("")
        setLoading(true)
        setLoginAttempted(true) // Login urinishi boshlandi

        try {
            if (email && password) {
                console.log("Login form submitted with:", email)

                // AuthContext orqali login qilish
                const userData = {
                    email,
                    password,
                }

                await login(userData)
                navigate("/dashboard")
            } else {
                setError(t("emailPasswordRequired"))
            }
        } catch (error) {
            console.error("Login error in component:", error)
            setError(error.response?.data?.message || t("loginFailed"))
        } finally {
            setLoading(false)
            // Login tugagandan so'ng, qisqa vaqtdan keyin loginAttempted ni false qilish
            setTimeout(() => {
                setLoginAttempted(false)
            }, 1000)
        }
    }

    const handleRequestAccess = (e) => {
        e.preventDefault()
        setShowRequestAccess(true)
    }

    const handleClinicInfoSubmit = (e) => {
        e.preventDefault()
        console.log("Clinic info submitted:", clinicInfo)
        setSubmitted(true)
    }

    const navigateToSignUp = () => {
        navigate("/signup")
    }

    const handleLanguageChange = (lang) => {
        changeLanguage(lang)
    }

    return (
        <div className="login-container">
            <div className="animation-left">
                <div className="circle-container">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                </div>
            </div>

            <div className="login-content">
                {!showRequestAccess ? (
                    !submitted ? (
                        <div className="login-form-container">
                            <div className="login-header">
                                <MdOutlineHealthAndSafety className="logo-icon" />
                                <h1>Klinika CRM</h1>
                                <p>{t("loginInstructions")}</p>
                            </div>

                            <div className="language-selector">
                                <button
                                    className={`lang-btn ${language === "uz" ? "active" : ""}`}
                                    onClick={() => handleLanguageChange("uz")}
                                >
                                    UZ
                                </button>
                                <button
                                    className={`lang-btn ${language === "ru" ? "active" : ""}`}
                                    onClick={() => handleLanguageChange("ru")}
                                >
                                    RU
                                </button>
                                <button
                                    className={`lang-btn ${language === "en" ? "active" : ""}`}
                                    onClick={() => handleLanguageChange("en")}
                                >
                                    EN
                                </button>
                                <button
                                    className={`lang-btn ${language === "kz" ? "active" : ""}`}
                                    onClick={() => handleLanguageChange("kz")}
                                >
                                    KZ
                                </button>
                                <button
                                    className={`lang-btn ${language === "zh" ? "active" : ""}`}
                                    onClick={() => handleLanguageChange("zh")}
                                >
                                    ZH
                                </button>
                            </div>

                            <form className="login-form" onSubmit={handleLogin}>
                                {error && <div className="error-message">{error}</div>}

                                <div className="form-group">
                                    <div className="input-icon">
                                        <FaUser />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={t("email")}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="form-group">
                                    <div className="input-icon">
                                        <FaLock />
                                    </div>
                                    <input
                                        type="password"
                                        placeholder={t("password")}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                </div>

                                <div className="form-options">
                                    <label className="remember-me">
                                        <input type="checkbox" disabled={loading} />
                                        <span>{t("remember_me")}</span>
                                    </label>
                                    <a href="#" className="forgot-password">
                                        {t("forgot_password")}
                                    </a>
                                </div>

                                <button type="submit" className="login-button" disabled={loading || loginAttempted}>
                                    {loading ? t("loggingIn") : t("login")}
                                </button>

                                <div className="demo-credentials">
                                    <p>Demo uchun:</p>
                                    <ul>
                                        <li>Director: director@clinic.com / director123</li>
                                        <li>Admin: admin@clinic.com / admin123</li>
                                        <li>Doctor: doctor@clinic.com / doctor123</li>
                                        <li>Nurse: nurse@clinic.com / nurse123</li>
                                    </ul>
                                </div>

                                <div className="divider">
                                    <span>{t("or")}</span>
                                </div>

                                <button
                                    type="button"
                                    className="request-access-button"
                                    onClick={handleRequestAccess}
                                    disabled={loading}
                                >
                                    {t("request_access")}
                                </button>

                                <div className="signup-link">
                                    <p>
                                        {t("noAccount")}{" "}
                                        <button type="button" onClick={navigateToSignUp} disabled={loading}>
                                            {t("signUp")}
                                        </button>
                                    </p>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="success-message">
                            <MdOutlineHealthAndSafety className="logo-icon" />
                            <h2>{t("requestReceived")}</h2>
                            <p>
                                {t("credentialsSentTo")} <strong>{clinicInfo.email}</strong>
                            </p>
                            <button
                                type="button"
                                className="back-to-login"
                                onClick={() => {
                                    setShowRequestAccess(false)
                                    setSubmitted(false)
                                }}
                            >
                                {t("backToLogin")}
                            </button>
                        </div>
                    )
                ) : (
                    <div className="request-form-container">
                        <div className="login-header">
                            <FaClinicMedical className="logo-icon" />
                            <h1>{t("requestAccess")}</h1>
                            <p>{t("enterClinicInfo")}</p>
                        </div>

                        <form className="request-form" onSubmit={handleClinicInfoSubmit}>
                            <div className="form-group">
                                <div className="input-icon">
                                    <FaClinicMedical />
                                </div>
                                <input
                                    type="text"
                                    placeholder={t("clinicName")}
                                    value={clinicInfo.clinicName}
                                    onChange={(e) => setClinicInfo({ ...clinicInfo, clinicName: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <div className="input-icon">
                                    <FaUser />
                                </div>
                                <input
                                    type="text"
                                    placeholder={t("fullName")}
                                    value={clinicInfo.fullName}
                                    onChange={(e) => setClinicInfo({ ...clinicInfo, fullName: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <div className="input-icon">
                                    <span className="age-icon">Y</span>
                                </div>
                                <input
                                    type="number"
                                    placeholder={t("age")}
                                    value={clinicInfo.age}
                                    onChange={(e) => setClinicInfo({ ...clinicInfo, age: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <div className="input-icon">
                                    <FaEnvelope />
                                </div>
                                <input
                                    type="email"
                                    placeholder={t("email")}
                                    value={clinicInfo.email}
                                    onChange={(e) => setClinicInfo({ ...clinicInfo, email: e.target.value })}
                                    required
                                />
                            </div>

                            <button type="submit" className="submit-button">
                                {t("submit")}
                            </button>

                            <button type="button" className="back-button" onClick={() => setShowRequestAccess(false)}>
                                {t("back")}
                            </button>
                        </form>
                    </div>
                )}
            </div>

            <div className="animation-right">
                <div className="pulse-container">
                    <div className="pulse pulse-1"></div>
                    <div className="pulse pulse-2"></div>
                    <div className="pulse pulse-3"></div>
                </div>
            </div>
        </div>
    )
}

