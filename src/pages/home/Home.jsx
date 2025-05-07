"use client"

import { useState, useRef } from "react"
import {
    FaUsers,
    FaCalendarAlt,
    FaDoorOpen,
    FaUserCog,
    FaClipboardList,
    FaShieldAlt,
    FaLinkedin,
    FaGithub,
    FaTwitter,
    FaChartLine,
    FaLock,
    FaRegCheckCircle,
    FaHeadset,
    FaDatabase,
    FaEnvelope,
    FaPhone,
    FaHospital,
    FaIdCard,
    FaArrowDown,
    FaPaperPlane,
} from "react-icons/fa"
import { MdDashboard, MdOutlineSpeed, MdOutlineLocalHospital } from "react-icons/md"
import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState("overview")
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        clinicName: "",
        license: "",
    })
    const contactFormRef = useRef(null)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Form submission logic would go here
        alert("Ma'lumotlaringiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz.")
        setFormData({
            email: "",
            phone: "",
            clinicName: "",
            license: "",
        })
    }

    const scrollToContactForm = () => {
        contactFormRef.current.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div className="home-container">
            <header className="header">
                <div className="header-content">
                    <div className="logo-container">
                        <img src="./images/clinic-logo.jpg" alt="MedCRM Logo" className="logo" />
                        <h1>MedCRM</h1>
                    </div>
                    <p className="header-subtitle">Tibbiyot muassasalari uchun eng mukammal boshqaruv tizimi</p>
                    <div className="header-features">
                        <div className="header-feature">
                            <FaRegCheckCircle className="header-feature-icon" />
                            <span>Bemorlar ma'lumotlarini samarali boshqarish</span>
                        </div>
                        <div className="header-feature">
                            <FaRegCheckCircle className="header-feature-icon" />
                            <span>Shifokorlar ish jadvalini oson rejalashtirish</span>
                        </div>
                        <div className="header-feature">
                            <FaRegCheckCircle className="header-feature-icon" />
                            <span>Klinika faoliyatini to'liq nazorat qilish</span>
                        </div>
                    </div>
                    <div className="header-buttons">
                        <button className="cta-button">Batafsil Ma'lumot</button>
                        <button className="contact-button" onClick={scrollToContactForm}>
                            Biz bilan bog'laning <FaArrowDown className="icon-right" />
                        </button>
                    </div>
                </div>
                <div className="header-image">
                    <img src="/placeholder.svg?key=jy09p" alt="MedCRM tizimining dashboard ko'rinishi" />
                </div>
            </header>

            <section className="advantages-section">
                <div className="section-header">
                    <h2>Nima uchun aynan MedCRM?</h2>
                    <p className="section-subtitle">Boshqa tibbiyot tizimlaridan farqli ustunliklarimiz</p>
                </div>
                <div className="advantages-grid">
                    <div className="advantage-card">
                        <MdOutlineSpeed className="advantage-icon" />
                        <h3>Tezkor ishlash</h3>
                        <p>
                            Zamonaviy texnologiyalar asosida yaratilgan tizimimiz boshqa CRM tizimlarga qaraganda 3 barobar tezroq
                            ishlaydi
                        </p>
                    </div>
                    <div className="advantage-card">
                        <FaLock className="advantage-icon" />
                        <h3>Yuqori xavfsizlik</h3>
                        <p>
                            Bemorlar ma'lumotlari va tibbiy tarixlar eng yuqori darajadagi shifrlash texnologiyalari bilan
                            himoyalangan
                        </p>
                    </div>
                    <div className="advantage-card">
                        <FaHeadset className="advantage-icon" />
                        <h3>24/7 texnik yordam</h3>
                        <p>Kunning istalgan vaqtida malakali mutaxassislardan yordam olish imkoniyati</p>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <div className="section-header">
                    <h2>Asosiy Imkoniyatlar</h2>
                    <p className="section-subtitle">MedCRM tizimi quyidagi asosiy funksiyalarni taqdim etadi</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <FaUserCog className="feature-icon" />
                        <h3>Foydalanuvchilar Boshqaruvi</h3>
                        <p>
                            Direktor, Admin, Shifokor va Hamshiralar uchun alohida vakolatlar va imkoniyatlar. Har bir xodim faqat
                            o'ziga tegishli ma'lumotlarga kirish huquqiga ega.
                        </p>
                    </div>
                    <div className="feature-card">
                        <FaCalendarAlt className="feature-icon" />
                        <h3>Bemorlar Jadvali</h3>
                        <p>
                            Bemorlarni qabul qilish jadvalini oson boshqarish, band vaqtlarni ko'rish, qabulga yozilish va bekor
                            qilish imkoniyati. SMS orqali eslatmalar yuborish.
                        </p>
                    </div>
                    <div className="feature-card">
                        <MdDashboard className="feature-icon" />
                        <h3>Analitik Dashboard</h3>
                        <p>
                            Klinika faoliyati bo'yicha barcha muhim ko'rsatkichlarni real vaqtda kuzatish. Daromadlar, xarajatlar,
                            bemorlar soni va boshqa statistikalar.
                        </p>
                    </div>
                    <div className="feature-card">
                        <FaDoorOpen className="feature-icon" />
                        <h3>Kabinetlar Boshqaruvi</h3>
                        <p>
                            Xonalarni yaratish, shifokorlarni taqsimlash va band vaqtlarni ko'rish. Har bir xona uchun alohida
                            jihozlar ro'yxatini yuritish.
                        </p>
                    </div>
                    <div className="feature-card">
                        <FaDatabase className="feature-icon" />
                        <h3>Bemorlar Bazasi</h3>
                        <p>
                            Bemorlar haqida to'liq ma'lumotlar bazasi: shaxsiy ma'lumotlar, kasallik tarixi, tashxislar, davolanish
                            natijalari va tavsiyalar.
                        </p>
                    </div>
                    <div className="feature-card">
                        <FaChartLine className="feature-icon" />
                        <h3>Hisobotlar va Statistika</h3>
                        <p>
                            Turli xil hisobotlarni avtomatik shakllantirish: daromadlar, xarajatlar, bemorlar soni, shifokorlar ish
                            faoliyati va boshqalar.
                        </p>
                    </div>
                </div>
            </section>

            <section className="roles-section">
                <div className="section-header">
                    <h2>Foydalanuvchilar Vakolatlari</h2>
                    <p className="section-subtitle">Har bir rol uchun maxsus moslashtirilgan imkoniyatlar</p>
                </div>
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
                    <button
                        className={`tab-button ${activeTab === "nurse" ? "active" : ""}`}
                        onClick={() => setActiveTab("nurse")}
                    >
                        Hamshira
                    </button>
                </div>

                <div className="tab-content">
                    {activeTab === "overview" && (
                        <div className="role-overview">
                            <div className="role-card">
                                <FaShieldAlt className="role-icon director-icon" />
                                <h3>Direktor (Super Admin)</h3>
                                <p>
                                    Tizimning to'liq boshqaruvi va nazorati. Barcha ma'lumotlarga kirish, xodimlarni boshqarish va
                                    hisobotlarni ko'rish imkoniyati.
                                </p>
                            </div>
                            <div className="role-card">
                                <FaUsers className="role-icon admin-icon" />
                                <h3>Admin (Qabul xodimi)</h3>
                                <p>
                                    Bemorlarni ro'yxatga olish, qabul jadvalini tuzish va bemorlar ma'lumotlarini boshqarish. Shifokorlar
                                    jadvalini ko'rish.
                                </p>
                            </div>
                            <div className="role-card">
                                <FaClipboardList className="role-icon doctor-icon" />
                                <h3>Shifokor</h3>
                                <p>
                                    Bemorlarni qabul qilish, tashxis qo'yish, davolash rejasini tuzish va bemorlar tarixini yuritish. O'z
                                    jadvalini ko'rish.
                                </p>
                            </div>
                            <div className="role-card">
                                <MdOutlineLocalHospital className="role-icon nurse-icon" />
                                <h3>Hamshira</h3>
                                <p>
                                    Bemorlar holatini kuzatish, dori-darmonlarni berish, shifokor ko'rsatmalarini bajarish va bemorlar
                                    ma'lumotlarini kiritish.
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === "director" && (
                        <div className="role-details">
                            <div className="role-info">
                                <h3>Direktor (Super Admin) Vakolatlari</h3>
                                <ul className="permissions-list">
                                    <li>Barcha ma'lumotlarni ko'rish va boshqarish</li>
                                    <li>Xodimlarni (shifokorlar, adminlar, hamshiralar) qo'shish va o'chirish</li>
                                    <li>Kabinetlar va xonalarni yaratish va boshqarish</li>
                                    <li>Klinika faoliyati bo'yicha to'liq statistika va hisobotlarni ko'rish</li>
                                    <li>Moliyaviy hisobotlarni ko'rish va tahlil qilish</li>
                                    <li>Tizim sozlamalarini o'zgartirish</li>
                                    <li>Foydalanuvchilar huquqlarini boshqarish</li>
                                    <li>Xizmatlar va narxlarni belgilash</li>
                                </ul>
                            </div>
                            <div className="role-image">
                                <img src="/placeholder.svg?key=vtn7r" alt="Direktor dashboard ko'rinishi" />
                            </div>
                        </div>
                    )}

                    {activeTab === "admin" && (
                        <div className="role-details">
                            <div className="role-info">
                                <h3>Admin (Qabul xodimi) Vakolatlari</h3>
                                <ul className="permissions-list">
                                    <li>Yangi bemorlarni tizimga kiritish va ma'lumotlarini yangilash</li>
                                    <li>Qabul sanasi, vaqti, kabinet va shifokorni tanlash</li>
                                    <li>Bemorning kasallik tavsifini (dastlabki diagnostika) yozish</li>
                                    <li>Band qilingan vaqtlarni boshqarish va o'zgartirish</li>
                                    <li>Bemorlar bilan bog'lanish va eslatmalar yuborish</li>
                                    <li>Shifokorlar jadvalini ko'rish va band qilish</li>
                                    <li>Kabinetlar bandligini ko'rish</li>
                                    <li>Bemorlar to'lovlarini qabul qilish va hisobotlarni yuritish</li>
                                </ul>
                            </div>
                            <div className="role-image">
                                <img src="/placeholder.svg?key=2vlzx" alt="Admin mijozlarni ro'yxatga olish interfeysi" />
                            </div>
                        </div>
                    )}

                    {activeTab === "doctor" && (
                        <div className="role-details">
                            <div className="role-info">
                                <h3>Shifokor Vakolatlari</h3>
                                <ul className="permissions-list">
                                    <li>O'zining qabul jadvali va band qilingan vaqtlarini ko'rish</li>
                                    <li>Bemorlar ma'lumotlari va kasallik tarixini ko'rish</li>
                                    <li>Tashxis qo'yish va davolash rejasini kiritish</li>
                                    <li>Laboratoriya tekshiruvlari va protseduralarni tayinlash</li>
                                    <li>Dori-darmonlar va muolajalarni belgilash</li>
                                    <li>Bemorlar holatini kuzatish va yozuvlar kiritish</li>
                                    <li>O'zining ishlamaydigan kunlarini belgilash</li>
                                    <li>Boshqa shifokorlar bilan maslahatlar o'tkazish</li>
                                </ul>
                            </div>
                            <div className="role-image">
                                <img src="/placeholder.svg?key=nspag" alt="Shifokor uchun bemorlar jadvali ko'rinishi" />
                            </div>
                        </div>
                    )}

                    {activeTab === "nurse" && (
                        <div className="role-details">
                            <div className="role-info">
                                <h3>Hamshira Vakolatlari</h3>
                                <ul className="permissions-list">
                                    <li>Bemorlar ro'yxatini ko'rish va holatini kuzatish</li>
                                    <li>Shifokor tayinlagan dori-darmonlarni berish</li>
                                    <li>Bemorlar hayotiy ko'rsatkichlarini (harorat, qon bosimi) o'lchash va kiritish</li>
                                    <li>Protseduralar o'tkazish va natijalarni kiritish</li>
                                    <li>Bemorlar holatidagi o'zgarishlar haqida shifokorga xabar berish</li>
                                    <li>Bemorlar uchun dori-darmonlar va jihozlar hisobini yuritish</li>
                                    <li>Bemorlar parvarishi bo'yicha ma'lumotlarni kiritish</li>
                                </ul>
                            </div>
                            <div className="role-image">
                                <img src="/placeholder.svg?key=ajoca" alt="Hamshira uchun bemorlar ro'yxati ko'rinishi" />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="functions-section">
                <div className="section-header">
                    <h2>Asosiy Funksiyalar</h2>
                    <p className="section-subtitle">MedCRM tizimining eng muhim funksional imkoniyatlari</p>
                </div>
                <div className="functions-container">
                    <div className="function-item">
                        <div className="function-content">
                            <h3>Xavfsiz Autentifikatsiya</h3>
                            <p>
                                Har bir foydalanuvchi o'zining shaxsiy login va paroli orqali tizimga kiradi. Ikki bosqichli
                                autentifikatsiya, sessiya boshqaruvi va avtomatik chiqish funksiyalari ma'lumotlar xavfsizligini
                                ta'minlaydi. Direktor barcha foydalanuvchilar uchun kirish huquqlarini boshqaradi.
                            </p>
                        </div>
                        <div className="function-image">
                            <img src="/placeholder.svg?key=ebbha" alt="Xavfsiz login sahifasi ko'rinishi" />
                        </div>
                    </div>

                    <div className="function-item reverse">
                        <div className="function-content">
                            <h3>Keng Qamrovli Dashboard</h3>
                            <p>
                                Real vaqt rejimida yangilanadigan interaktiv dashboard orqali klinika faoliyatining barcha
                                ko'rsatkichlarini kuzating. Bemorlar soni, daromadlar, xarajatlar, shifokorlar bandligi, kabinetlar
                                yuklamasi va boshqa muhim ma'lumotlar bir joyda jamlangan. Turli vaqt oraliqlarida ma'lumotlarni
                                taqqoslash va tahlil qilish imkoniyati.
                            </p>
                        </div>
                        <div className="function-image">
                            <img src="/placeholder.svg?key=g3opu" alt="Keng qamrovli dashboard ko'rinishi" />
                        </div>
                    </div>

                    <div className="function-item">
                        <div className="function-content">
                            <h3>Kabinetlar va Resurslar Boshqaruvi</h3>
                            <p>
                                Klinikadagi barcha kabinetlar, xonalar va tibbiy jihozlarni samarali boshqaring. Har bir kabinet uchun
                                band vaqtlarni ko'rish, shifokorlarni taqsimlash va jihozlar ro'yxatini yuritish imkoniyati.
                                Resurslardan maksimal darajada foydalanish uchun band vaqtlarni avtomatik rejalashtirish algoritmi.
                            </p>
                        </div>
                        <div className="function-image">
                            <img src="/placeholder.svg?key=8dkbl" alt="Kabinetlar boshqaruvi interfeysi" />
                        </div>
                    </div>

                    <div className="function-item reverse">
                        <div className="function-content">
                            <h3>Bemorlar Qabulini Rejalashtirish</h3>
                            <p>
                                Bemorlar qabulini oson va tez rejalashtirish tizimi. Mavjud vaqtlarni ko'rish, band qilish, o'zgartirish
                                va bekor qilish imkoniyati. Takroriy tashriflarni avtomatik rejalashtirish, eslatmalar yuborish va
                                navbatlarni boshqarish. Bemorlar uchun onlayn ro'yxatga olish imkoniyati va SMS orqali xabarnomalar.
                            </p>
                        </div>
                        <div className="function-image">
                            <img src="/placeholder.svg?key=loh48" alt="Bemorlar qabuli jadvali" />
                        </div>
                    </div>

                    <div className="function-item">
                        <div className="function-content">
                            <h3>Bemorlar Tibbiy Tarixi</h3>
                            <p>
                                Har bir bemor uchun to'liq elektron tibbiy tarix yuritish imkoniyati. Tashxislar, davolash rejalari,
                                dori-darmonlar, laboratoriya natijalari va boshqa tibbiy ma'lumotlarni saqlash. Bemorning oldingi
                                tashriflari va davolanish natijalari haqida to'liq ma'lumot. Tibbiy hujjatlarni avtomatik shakllantirish
                                va chop etish.
                            </p>
                        </div>
                        <div className="function-image">
                            <img src="/placeholder.svg?key=puqc4" alt="Elektron tibbiy tarix tizimi" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="founders-section">
                <div className="section-header">
                    <h2>Loyiha Asoschilari</h2>
                    <p className="section-subtitle">MedCRM tizimini yaratgan professional jamoa</p>
                </div>
                <div className="founders-container">
                    <div className="founder-card">
                        <div className="founder-image">
                            <img src="/professional-female-portrait.png" alt="Tibbiyot Maslahatchisi" />
                        </div>
                        <h3>Karimova Nilufar</h3>
                        <p className="founder-position">Tibbiyot Maslahatchisi</p>
                        <p className="founder-description">
                            Tibbiyot fanlari nomzodi, 8 yillik amaliy tajribaga ega shifokor. Tibbiy axborot tizimlari bo'yicha
                            ekspert. MedCRM tizimining tibbiy modullarini ishlab chiqishda asosiy maslahatchi.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link">
                                <FaLinkedin />
                            </a>
                            <a href="#" className="social-link">
                                <FaGithub />
                            </a>
                            <a href="#" className="social-link">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>

                    <div className="founder-card">
                        <div className="founder-image">
                            <img src="/professional-male-portrait.png" alt="Frontend Dasturchi" />
                        </div>
                        <h3>Abdullayev Jasur</h3>
                        <p className="founder-position">Frontend Dasturchi</p>
                        <p className="founder-description">
                            7 yillik tajribaga ega frontend dasturchi. React, Vue va Angular texnologiyalari bo'yicha mutaxassis.
                            Foydalanuvchi interfeyslarini yaratish va optimallashtirishga ixtisoslashgan. MedCRM tizimining barcha
                            frontend qismini ishlab chiqqan.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link">
                                <FaLinkedin />
                            </a>
                            <a href="#" className="social-link">
                                <FaGithub />
                            </a>
                            <a href="#" className="social-link">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>

                    <div className="founder-card">
                        <div className="founder-image">
                            <img src="/professional-male-portrait-glasses.png" alt="Backend Dasturchi" />
                        </div>
                        <h3>Rahimov Bobur</h3>
                        <p className="founder-position">Backend Dasturchi</p>
                        <p className="founder-description">
                            10 yillik tajribaga ega backend dasturchi. Node.js, Python va ma'lumotlar bazalari bo'yicha mutaxassis.
                            Yuqori yuklamali tizimlarni loyihalash va ishlab chiqishga ixtisoslashgan. MedCRM tizimining server
                            qismini yaratgan.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link">
                                <FaLinkedin />
                            </a>
                            <a href="#" className="social-link">
                                <FaGithub />
                            </a>
                            <a href="#" className="social-link">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="partners-section">
                <div className="section-header">
                    <h2>Bizning Hamkorlarimiz</h2>
                    <p className="section-subtitle">MedCRM tizimidan foydalanayotgan va ishonch bildirgan tashkilotlar</p>
                </div>
                <div className="partners-container">
                    <div className="partner-card">
                        <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-B8opD4KQbqWm0U8AvO84RO8MnQTVgq.png"
                            alt="Tibbiyot markazi logosi"
                            className="partner-logo"
                        />
                        <h3>Shifo Med</h3>
                        <p>Zamonaviy ko'p tarmoqli tibbiyot markazi</p>
                    </div>

                    <div className="partner-card">
                        <img src="/placeholder.svg?key=1qvfp" alt="Tibbiyot universiteti logosi" className="partner-logo" />
                        <h3>Toshkent Tibbiyot Akademiyasi</h3>
                        <p>Tibbiyot ta'limi va ilmiy tadqiqotlar markazi</p>
                    </div>

                    <div className="partner-card">
                        <img src="/placeholder.svg?key=mdnfj" alt="Klinika logosi" className="partner-logo" />
                        <h3>Denta Plus</h3>
                        <p>Zamonaviy stomatologiya xizmatlari</p>
                    </div>
                </div>
            </section>

            <section className="contact-form-section" ref={contactFormRef}>
                <div className="section-header">
                    <h2>Biz bilan bog'laning</h2>
                    <p className="section-subtitle">MedCRM tizimidan foydalanish uchun ma'lumotlaringizni qoldiring</p>
                </div>

                <div className="contact-form-container">
                    <div className="contact-form-content">
                        <div className="contact-info">
                            <h3>Klinikangiz faoliyatini zamonaviy darajaga olib chiqing</h3>
                            <p>
                                MedCRM tizimi bilan tibbiyot muassasangiz samaradorligini oshiring, bemorlar sonini ko'paytiring va
                                daromadlaringizni oshiring. Biz siz bilan bog'lanib, barcha savollaringizga javob beramiz va tizimni
                                klinikangizga moslashtirishda yordam beramiz.
                            </p>

                            <div className="contact-features">
                                <div className="contact-feature">
                                    <FaRegCheckCircle className="feature-icon" />
                                    <span>Bepul maslahat va texnik yordam</span>
                                </div>
                                <div className="contact-feature">
                                    <FaRegCheckCircle className="feature-icon" />
                                    <span>Klinikangizga moslashtirilgan yechim</span>
                                </div>
                                <div className="contact-feature">
                                    <FaRegCheckCircle className="feature-icon" />
                                    <span>Tizimni o'rnatish va xodimlarni o'qitish</span>
                                </div>
                            </div>
                        </div>

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="email">Elektron pochta</label>
                                <div className="input-with-icon">
                                    <FaEnvelope className="input-icon" />
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="example@gmail.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Telefon raqam</label>
                                <div className="input-with-icon">
                                    <FaPhone className="input-icon" />
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+998 90 123 45 67"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="clinicName">Klinika nomi</label>
                                <div className="input-with-icon">
                                    <FaHospital className="input-icon" />
                                    <input
                                        type="text"
                                        id="clinicName"
                                        name="clinicName"
                                        value={formData.clinicName}
                                        onChange={handleInputChange}
                                        placeholder="Klinikangiz nomi"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="license">Litsenziya raqami</label>
                                <div className="input-with-icon">
                                    <FaIdCard className="input-icon" />
                                    <input
                                        type="text"
                                        id="license"
                                        name="license"
                                        value={formData.license}
                                        onChange={handleInputChange}
                                        placeholder="Litsenziya raqami (ixtiyoriy)"
                                    />
                                </div>
                            </div>

                            <button type="submit" className="submit-button">
                                <FaPaperPlane className="button-icon" />
                                Ma'lumotlarni yuborish
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    )
}
