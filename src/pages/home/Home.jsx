import React, { useState } from "react"
import { FaUsers, FaCalendarAlt, FaDoorOpen, FaUserCog, FaClipboardList, FaShieldAlt, FaArrowRight } from "react-icons/fa"
import { MdDashboard } from "react-icons/md"
import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("overview")

    return (
        <div className="home-container">
            <header className="header">
                <div className="header-content">
                    <h1>Klinika CRM Tizimi</h1>
                    <p>Klinikalar uchun zamonaviy boshqaruv tizimi</p>
                    <button className="cta-button">Batafsil Ma'lumot</button>
                </div>
                <div className="header-image">
                    {/* Alt: Klinika CRM tizimining dashboard ko'rinishi */}
                    <img src="/placeholder.svg?height=400&width=600" alt="Klinika CRM tizimining dashboard ko'rinishi" />
                </div>
            </header>

            <section className="features-section">
                <h2>Asosiy Imkoniyatlar</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <FaUserCog className="feature-icon" size={48} />
                        <h3>Foydalanuvchilar Boshqaruvi</h3>
                        <p>Direktor, Admin va Shifokorlar uchun alohida vakolatlar va imkoniyatlar</p>
                    </div>
                    <div className="feature-card">
                        <FaCalendarAlt className="feature-icon" size={48} />
                        <h3>Mijozlar Jadvali</h3>
                        <p>Mijozlarni qabul qilish va band qilingan vaqtlarni boshqarish</p>
                    </div>
                    <div className="feature-card">
                        <MdDashboard className="feature-icon" size={48} />
                        <h3>Dashboard</h3>
                        <p>Barcha ma'lumotlarni kuzatish va tahlil qilish imkoniyati</p>
                    </div>
                    <div className="feature-card">
                        <FaDoorOpen className="feature-icon" size={48} />
                        <h3>Kabinetlar Boshqaruvi</h3>
                        <p>Xonalarni yaratish va shifokorlarni taqsimlash</p>
                    </div>
                </div>
            </section>

            <section className="roles-section">
                <h2>Foydalanuvchilar Vakolatlari</h2>
                <div className="tabs">
                    <button
                        className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
                        onClick={() => setActiveTab("overview")}
                    >
                        Umumiy
                    </button>
                    <button
                        className={`tab-button ${activeTab === "director" ? "active" : ""}`}
                        onClick={() => setActiveTab("director")}
                    >
                        Direktor
                    </button>
                    <button
                        className={`tab-button ${activeTab === "admin" ? "active" : ""}`}
                        onClick={() => setActiveTab("admin")}
                    >
                        Admin
                    </button>
                    <button
                        className={`tab-button ${activeTab === "doctor" ? "active" : ""}`}
                        onClick={() => setActiveTab("doctor")}
                    >
                        Shifokor
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === "overview" && (
                        <div className="role-overview">
                            <div className="role-card">
                                <FaShieldAlt className="role-icon director-icon" size={36} />
                                <h3>Direktor (Super Admin)</h3>
                                <p>Tizimning to'liq boshqaruvi va nazorati</p>
                            </div>
                            <div className="role-card">
                                <FaUsers className="role-icon admin-icon" size={36} />
                                <h3>Admin (Qabul xodimi)</h3>
                                <p>Mijozlarni ro'yxatga olish va jadval tuzish</p>
                            </div>
                            <div className="role-card">
                                <FaClipboardList className="role-icon doctor-icon" size={36} />
                                <h3>Shifokor</h3>
                                <p>Mijozlarni qabul qilish va diagnostika</p>
                            </div>
                        </div>
                    )}

                    {activeTab === "director" && (
                        <div className="role-details">
                            <div className="role-info">
                                <h3>Direktor (Super Admin) Vakolatlari</h3>
                                <ul className="permissions-list">
                                    <li>Barcha ma'lumotlarni boshqarish</li>
                                    <li>Ishchilar (shifokorlar, adminlar) qo'shish</li>
                                    <li>Kabinetlar (xona) yaratish</li>
                                    <li>Adminlarni qo'shish/o'chirish huquqi</li>
                                    <li>Barcha hisobotlarni va jadvallarni kuzatish</li>
                                </ul>
                            </div>
                            <div className="role-image">
                                {/* Alt: Direktor dashboard ko'rinishi */}
                                <img src="/placeholder.svg?height=300&width=500" alt="Direktor dashboard ko'rinishi" />
                            </div>
                        </div>
                    )}

                    {activeTab === "admin" && (
                        <div className="role-details">
                            <div className="role-info">
                                <h3>Admin (Qabul xodimi) Vakolatlari</h3>
                                <ul className="permissions-list">
                                    <li>Mijozlarni tizimga kiritish</li>
                                    <li>Kelish sanasi, vaqti, kabinet va shifokorni tanlash</li>
                                    <li>Mijozning kasallik tavsifini (diagnostika) yozish</li>
                                    <li>Band qilingan vaqtni belgilash</li>
                                    <li>Dashboard orqali jadvallarda mijozlarni kuzatish</li>
                                    <li>Shifokorlar va kabinetlarni ko'rish (lekin qo'sha olmaslik)</li>
                                </ul>
                            </div>
                            <div className="role-image">
                                {/* Alt: Admin mijozlarni ro'yxatga olish interfeysi */}
                                <img src="/placeholder.svg?height=300&width=500" alt="Admin mijozlarni ro'yxatga olish interfeysi" />
                            </div>
                        </div>
                    )}

                    {activeTab === "doctor" && (
                        <div className="role-details">
                            <div className="role-info">
                                <h3>Shifokor Vakolatlari</h3>
                                <ul className="permissions-list">
                                    <li>O'zining band qilingan kunlarini ko'rish</li>
                                    <li>Mijozlarning kasallik sababini ko'rib, diagnostika qilish</li>
                                    <li>O'zining qabul qilmaydigan kunlarini kiritish va sababini yozib qoldirish</li>
                                    <li>Xonalarni o'zgartira olmaslik</li>
                                </ul>
                            </div>
                            <div className="role-image">
                                {/* Alt: Shifokor uchun mijozlar jadvali ko'rinishi */}
                                <img src="/placeholder.svg?height=300&width=500" alt="Shifokor uchun mijozlar jadvali ko'rinishi" />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="functions-section">
                <h2>Asosiy Funksiyalar</h2>
                <div className="functions-container">
                    <div className="function-item">
                        <div className="function-content">
                            <h3>Autentifikatsiya (Login & Parol)</h3>
                            <p>
                                Har bir foydalanuvchi o'zining login va paroli orqali tizimga kiradi. Direktor barcha
                                foydalanuvchilarning loginlarini yaratishi mumkin.
                            </p>
                        </div>
                        <div className="function-image">
                            {/* Alt: Login sahifasi ko'rinishi */}
                            <img src="/placeholder.svg?height=250&width=400" alt="Login sahifasi ko'rinishi" />
                        </div>
                    </div>

                    <div className="function-item reverse">
                        <div className="function-content">
                            <h3>Dashboard (Boshqaruv paneli)</h3>
                            <p>
                                Direktor va admin barcha ma'lumotlarni kuzata oladi. Mijozlar ro'yxati (jadval shaklida), band qilingan
                                vaqtlar jadvali, hisobotlar (Shifokor bandlik darajasi, qabul qilingan mijozlar soni va h.k.)
                            </p>
                        </div>
                        <div className="function-image">
                            {/* Alt: Dashboard statistika va hisobotlar ko'rinishi */}
                            <img src="/placeholder.svg?height=250&width=400" alt="Dashboard statistika va hisobotlar ko'rinishi" />
                        </div>
                    </div>

                    <div className="function-item">
                        <div className="function-content">
                            <h3>Xonalar (Kabinetlar)</h3>
                            <p>Direktor xonalarni qo'shishi va boshqarishi mumkin. Admin va shifokor faqat ko'rish huquqiga ega.</p>
                        </div>
                        <div className="function-image">
                            {/* Alt: Kabinetlar boshqaruvi interfeysi */}
                            <img src="/placeholder.svg?height=250&width=400" alt="Kabinetlar boshqaruvi interfeysi" />
                        </div>
                    </div>

                    <div className="function-item reverse">
                        <div className="function-content">
                            <h3>Mijozlar bandligi</h3>
                            <p>
                                Admin mijozlarni tizimga kiritadi. Qabul vaqti, kabinet va shifokorni tanlaydi. Kasallik tavsifini
                                yozadi. Band qilingan vaqtlar jadval shaklida ko'rinadi.
                            </p>
                        </div>
                        <div className="function-image">
                            {/* Alt: Mijozlar bandligi jadvali */}
                            <img src="/placeholder.svg?height=250&width=400" alt="Mijozlar bandligi jadvali" />
                        </div>
                    </div>

                    <div className="function-item">
                        <div className="function-content">
                            <h3>Shifokor jadvali</h3>
                            <p>
                                Shifokor faqat o'ziga tegishli qabul qilingan mijozlarni ko'ra oladi. O'zining ishlamaydigan kunlarini
                                belgilab qo'yishi mumkin.
                            </p>
                        </div>
                        <div className="function-image">
                            {/* Alt: Shifokor ish jadvali ko'rinishi */}
                            <img src="/placeholder.svg?height=250&width=400" alt="Shifokor ish jadvali ko'rinishi" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="tech-section">
                <h2>Texnologiyalar</h2>
                <div className="tech-container">
                    <div className="tech-card">
                        <h3>Frontend</h3>
                        <p>React.js / React Native</p>
                    </div>
                    <div className="tech-card">
                        <h3>Backend</h3>
                        <p>Node.js + Express</p>
                    </div>
                    <div className="tech-card">
                        <h3>Ma'lumotlar bazasi</h3>
                        <p>SQLite yoki Local Storage</p>
                    </div>
                    <div className="tech-card">
                        <h3>Autentifikatsiya</h3>
                        <p>JWT yoki lokal login-parol</p>
                    </div>
                </div>
            </section>

            <button className='btn-start' onClick={() => { navigate('/login') }}>boshlash <FaArrowRight /></button>

            <footer className="footer">
                <div className="footer-content">
                    <h2>Klinika CRM Tizimi</h2>
                    <p>Klinikalar uchun zamonaviy boshqaruv tizimi</p>
                    <div className="contact-info">
                        <p>Telefon: +998 XX XXX XX XX</p>
                        <p>Email: info@klinika-crm.uz</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}