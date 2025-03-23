import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FaUser, FaLock, FaEnvelope, FaPhone, FaClinicMedical, FaIdCard } from "react-icons/fa"
import { MdOutlineHealthAndSafety } from "react-icons/md"

export default function SignUp() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        clinicName: "",
        position: "",
    })
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })

        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: "",
            })
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = "To'liq ism kiritilishi shart"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email kiritilishi shart"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email formati noto'g'ri"
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Telefon raqam kiritilishi shart"
        }

        if (!formData.clinicName.trim()) {
            newErrors.clinicName = "Klinika nomi kiritilishi shart"
        }

        return newErrors
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formErrors = validateForm()
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors)
            return
        }

        // Handle signup logic here
        console.log("Form submitted:", formData)
        setSubmitted(true)
    }

    const navigateToLogin = () => {
        navigate("/login")
    }

    return (
        <div className="signup-container">
            <div className="animation-left">
                <div className="dna-container">
                    <div className="dna-helix">
                        {[...Array(10)].map((_, index) => (
                            <div key={index} className="dna-step">
                                <div className="dna-base dna-base-left"></div>
                                <div className="dna-base dna-base-right"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="signup-content">
                {!submitted ? (
                    <div className="signup-form-container">
                        <div className="signup-header">
                            <MdOutlineHealthAndSafety className="logo-icon" />
                            <h1>Ro'yxatdan o'tish</h1>
                            <p>Klinika CRM tizimidan foydalanish uchun ro'yxatdan o'ting</p>
                        </div>

                        <form className="signup-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <div className="input-icon">
                                        <FaUser />
                                    </div>
                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="To'liq ismingiz"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                    {errors.fullName && <span className="error">{errors.fullName}</span>}
                                </div>

                                <div className="form-group">
                                    <div className="input-icon">
                                        <FaEnvelope />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Elektron pochta"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <span className="error">{errors.email}</span>}
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <div className="input-icon">
                                        <FaPhone />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Telefon raqami"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                    {errors.phone && <span className="error">{errors.phone}</span>}
                                </div>

                                <div className="form-group">
                                    <div className="input-icon">
                                        <FaClinicMedical />
                                    </div>
                                    <input
                                        type="text"
                                        name="clinicName"
                                        placeholder="Klinika nomi"
                                        value={formData.clinicName}
                                        onChange={handleChange}
                                    />
                                    {errors.clinicName && <span className="error">{errors.clinicName}</span>}
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-icon">
                                    <FaIdCard />
                                </div>
                                <input
                                    type="text"
                                    name="position"
                                    placeholder="Lavozimingiz (ixtiyoriy)"
                                    value={formData.position}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="terms-checkbox">
                                <input type="checkbox" id="terms" required />
                                <label htmlFor="terms">
                                    Men <a href="#">foydalanish shartlari</a> va <a href="#">maxfiylik siyosati</a> bilan tanishdim va
                                    roziman
                                </label>
                            </div>

                            <button type="submit" className="signup-button">
                                Ro'yxatdan o'tish
                            </button>

                            <div className="login-link">
                                <p>
                                    Hisobingiz bormi?{" "}
                                    <button type="button" onClick={navigateToLogin}>
                                        Tizimga kirish
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="success-message">
                        <MdOutlineHealthAndSafety className="logo-icon" />
                        <h2>Ro'yxatdan o'tish muvaffaqiyatli yakunlandi!</h2>
                        <p>
                            <strong>{formData.email}</strong> elektron pochtangizga tasdiqlash xabari yuborildi. Iltimos, hisobingizni
                            faollashtirish uchun xabarni tekshiring.
                        </p>
                        <button type="button" className="login-redirect-button" onClick={navigateToLogin}>
                            Tizimga kirish
                        </button>
                    </div>
                )}
            </div>

            <div className="animation-right">
                <div className="particles-container">
                    {[...Array(15)].map((_, index) => (
                        <div
                            key={index}
                            className="particle"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${5 + Math.random() * 10}s`,
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

