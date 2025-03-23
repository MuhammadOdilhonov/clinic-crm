"use client"

import { useState } from "react"
import { FaSave, FaGlobe, FaBuilding, FaMoneyBillWave, FaUserCog, FaBell, FaLock } from "react-icons/fa"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"

export default function Settings() {
    const { selectedBranch } = useAuth()
    const { language, changeLanguage, t } = useLanguage()

    const [activeTab, setActiveTab] = useState("general")

    // General settings
    const [generalSettings, setGeneralSettings] = useState({
        clinicName: "Klinika CRM",
        address: "Toshkent sh., Chilonzor tumani, 7-mavze",
        phone: "+998 90 123 45 67",
        email: "info@klinika-crm.uz",
        website: "www.klinika-crm.uz",
        workingHours: "09:00 - 18:00",
        workingDays: "Dushanba - Shanba",
    })

    // Branch settings
    const [branchSettings, setBranchSettings] = useState({
        branch1: {
            name: "1-Filial",
            address: "Toshkent sh., Chilonzor tumani, 7-mavze",
            phone: "+998 90 123 45 67",
            email: "filial1@klinika-crm.uz",
        },
        branch2: {
            name: "2-Filial",
            address: "Toshkent sh., Yunusobod tumani, 19-mavze",
            phone: "+998 90 234 56 78",
            email: "filial2@klinika-crm.uz",
        },
        branch3: {
            name: "3-Filial",
            address: "Toshkent sh., Mirzo Ulug'bek tumani, 5-mavze",
            phone: "+998 90 345 67 89",
            email: "filial3@klinika-crm.uz",
        },
    })

    // Financial settings
    const [financialSettings, setFinancialSettings] = useState({
        currency: "so'm",
        taxRate: 12,
        paymentMethods: ["Naqd", "Karta", "Bank o'tkazmasi"],
        invoicePrefix: "INV-",
        invoiceFooter: "Rahmat! Bizni tanlaganingiz uchun minnatdormiz.",
    })

    // User settings
    const [userSettings, setUserSettings] = useState({
        name: "Director",
        email: "director@example.com",
        phone: "+998 90 123 45 67",
        language: language,
        notifications: true,
        twoFactorAuth: false,
    })

    // Notification settings
    const [notificationSettings, setNotificationSettings] = useState({
        emailNotifications: true,
        smsNotifications: false,
        newPatientNotification: true,
        appointmentReminder: true,
        financialReports: true,
        systemUpdates: true,
    })

    // Security settings
    const [securitySettings, setSecuritySettings] = useState({
        passwordExpiry: 90,
        loginAttempts: 5,
        sessionTimeout: 30,
        requireStrongPassword: true,
    })

    // Handle general settings change
    const handleGeneralSettingsChange = (e) => {
        const { name, value } = e.target
        setGeneralSettings({
            ...generalSettings,
            [name]: value,
        })
    }

    // Handle branch settings change
    const handleBranchSettingsChange = (branch, e) => {
        const { name, value } = e.target
        setBranchSettings({
            ...branchSettings,
            [branch]: {
                ...branchSettings[branch],
                [name]: value,
            },
        })
    }

    // Handle financial settings change
    const handleFinancialSettingsChange = (e) => {
        const { name, value } = e.target
        setFinancialSettings({
            ...financialSettings,
            [name]: value,
        })
    }

    // Handle user settings change
    const handleUserSettingsChange = (e) => {
        const { name, value, type, checked } = e.target

        if (name === "language") {
            changeLanguage(value)
        }

        setUserSettings({
            ...userSettings,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    // Handle notification settings change
    const handleNotificationSettingsChange = (e) => {
        const { name, checked } = e.target
        setNotificationSettings({
            ...notificationSettings,
            [name]: checked,
        })
    }

    // Handle security settings change
    const handleSecuritySettingsChange = (e) => {
        const { name, value, type, checked } = e.target
        setSecuritySettings({
            ...securitySettings,
            [name]: type === "checkbox" ? checked : value,
        })
    }

    // Handle save settings
    const handleSaveSettings = () => {
        alert(t("settingsSaved"))
    }

    return (
        <div className="director-settings">
            <div className="page-header">
                <h1 className="page-title">{t("settings")}</h1>
                <button className="btn btn-primary btn-icon" onClick={handleSaveSettings}>
                    <FaSave /> {t("save")}
                </button>
            </div>

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
                    <button
                        className={`settings-tab ${activeTab === "financial" ? "active" : ""}`}
                        onClick={() => setActiveTab("financial")}
                    >
                        <FaMoneyBillWave /> {t("financialSettings")}
                    </button>
                    <button
                        className={`settings-tab ${activeTab === "user" ? "active" : ""}`}
                        onClick={() => setActiveTab("user")}
                    >
                        <FaUserCog /> {t("userSettings")}
                    </button>
                    <button
                        className={`settings-tab ${activeTab === "notifications" ? "active" : ""}`}
                        onClick={() => setActiveTab("notifications")}
                    >
                        <FaBell /> {t("notificationSettings")}
                    </button>
                    <button
                        className={`settings-tab ${activeTab === "security" ? "active" : ""}`}
                        onClick={() => setActiveTab("security")}
                    >
                        <FaLock /> {t("securitySettings")}
                    </button>
                </div>

                <div className="settings-content">
                    {/* General Settings */}
                    {activeTab === "general" && (
                        <div className="settings-panel">
                            <h2>{t("generalSettings")}</h2>

                            <div className="form-group">
                                <label>{t("clinicName")}</label>
                                <input
                                    type="text"
                                    name="clinicName"
                                    value={generalSettings.clinicName}
                                    onChange={handleGeneralSettingsChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>{t("address")}</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={generalSettings.address}
                                    onChange={handleGeneralSettingsChange}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>{t("phone")}</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={generalSettings.phone}
                                        onChange={handleGeneralSettingsChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>{t("email")}</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={generalSettings.email}
                                        onChange={handleGeneralSettingsChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>{t("website")}</label>
                                <input
                                    type="text"
                                    name="website"
                                    value={generalSettings.website}
                                    onChange={handleGeneralSettingsChange}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>{t("workingHours")}</label>
                                    <input
                                        type="text"
                                        name="workingHours"
                                        value={generalSettings.workingHours}
                                        onChange={handleGeneralSettingsChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>{t("workingDays")}</label>
                                    <input
                                        type="text"
                                        name="workingDays"
                                        value={generalSettings.workingDays}
                                        onChange={handleGeneralSettingsChange}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Branch Settings */}
                    {activeTab === "branches" && (
                        <div className="settings-panel">
                            <h2>{t("branchSettings")}</h2>

                            <div className="branch-settings">
                                <div className="branch-card">
                                    <h3>{t("branch1")}</h3>

                                    <div className="form-group">
                                        <label>{t("branchName")}</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={branchSettings.branch1.name}
                                            onChange={(e) => handleBranchSettingsChange("branch1", e)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>{t("address")}</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={branchSettings.branch1.address}
                                            onChange={(e) => handleBranchSettingsChange("branch1", e)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>{t("phone")}</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={branchSettings.branch1.phone}
                                            onChange={(e) => handleBranchSettingsChange("branch1", e)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>{t("email")}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={branchSettings.branch1.email}
                                            onChange={(e) => handleBranchSettingsChange("branch1", e)}
                                        />
                                    </div>
                                </div>

                                <div className="branch-card">
                                    <h3>{t("branch2")}</h3>

                                    <div className="form-group">
                                        <label>{t("branchName")}</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={branchSettings.branch2.name}
                                            onChange={(e) => handleBranchSettingsChange("branch2", e)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>{t("address")}</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={branchSettings.branch2.address}
                                            onChange={(e) => handleBranchSettingsChange("branch2", e)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>{t("phone")}</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={branchSettings.branch2.phone}
                                            onChange={(e) => handleBranchSettingsChange("branch2", e)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>{t("email")}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={branchSettings.branch2.email}
                                            onChange={(e) => handleBranchSettingsChange("branch2", e)}
                                        />
                                    </div>
                                </div>

                                <div className="branch-card">
                                    <h3>{t("branch3")}</h3>

                                    <div className="form-group">
                                        <label>{t("branchName")}</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={branchSettings.branch3.name}
                                            onChange={(e) => handleBranchSettingsChange("branch3", e)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>{t("address")}</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={branchSettings.branch3.address}
                                            onChange={(e) => handleBranchSettingsChange("branch3", e)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>{t("phone")}</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={branchSettings.branch3.phone}
                                            onChange={(e) => handleBranchSettingsChange("branch3", e)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>{t("email")}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={branchSettings.branch3.email}
                                            onChange={(e) => handleBranchSettingsChange("branch3", e)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Financial Settings */}
                    {activeTab === "financial" && (
                        <div className="settings-panel">
                            <h2>{t("financialSettings")}</h2>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>{t("currency")}</label>
                                    <input
                                        type="text"
                                        name="currency"
                                        value={financialSettings.currency}
                                        onChange={handleFinancialSettingsChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>{t("taxRate")} (%)</label>
                                    <input
                                        type="number"
                                        name="taxRate"
                                        value={financialSettings.taxRate}
                                        onChange={handleFinancialSettingsChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>To'lov usullari (vergul bilan ajrating)</label>
                                <input
                                    type="text"
                                    name="paymentMethods"
                                    value={financialSettings.paymentMethods.join(", ")}
                                    onChange={(e) => {
                                        setFinancialSettings({
                                            ...financialSettings,
                                            paymentMethods: e.target.value.split(", "),
                                        })
                                    }}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Hisob-faktura prefiksi</label>
                                    <input
                                        type="text"
                                        name="invoicePrefix"
                                        value={financialSettings.invoicePrefix}
                                        onChange={handleFinancialSettingsChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Hisob-faktura pastki qismi</label>
                                <textarea
                                    name="invoiceFooter"
                                    value={financialSettings.invoiceFooter}
                                    onChange={handleFinancialSettingsChange}
                                    rows={3}
                                ></textarea>
                            </div>
                        </div>
                    )}

                    {/* User Settings */}
                    {activeTab === "user" && (
                        <div className="settings-panel">
                            <h2>{t("userSettings")}</h2>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>{t("fullName")}</label>
                                    <input type="text" name="name" value={userSettings.name} onChange={handleUserSettingsChange} />
                                </div>

                                <div className="form-group">
                                    <label>{t("email")}</label>
                                    <input type="email" name="email" value={userSettings.email} onChange={handleUserSettingsChange} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>{t("phone")}</label>
                                    <input type="text" name="phone" value={userSettings.phone} onChange={handleUserSettingsChange} />
                                </div>

                                <div className="form-group">
                                    <label>{t("language")}</label>
                                    <select name="language" value={userSettings.language} onChange={handleUserSettingsChange}>
                                        <option value="uz">O'zbek</option>
                                        <option value="ru">Русский</option>
                                        <option value="en">English</option>
                                        <option value="kz">Қазақша</option>
                                        <option value="zh">China</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group checkbox-group">
                                <input
                                    type="checkbox"
                                    id="notifications"
                                    name="notifications"
                                    checked={userSettings.notifications}
                                    onChange={handleUserSettingsChange}
                                />
                                <label htmlFor="notifications">Bildirishnomalarni yoqish</label>
                            </div>

                            <div className="form-group checkbox-group">
                                <input
                                    type="checkbox"
                                    id="twoFactorAuth"
                                    name="twoFactorAuth"
                                    checked={userSettings.twoFactorAuth}
                                    onChange={handleUserSettingsChange}
                                />
                                <label htmlFor="twoFactorAuth">Ikki faktorli autentifikatsiyani yoqish</label>
                            </div>
                        </div>
                    )}

                    {/* Notification Settings */}
                    {activeTab === "notifications" && (
                        <div className="settings-panel">
                            <h2>{t("notificationSettings")}</h2>

                            <div className="form-group checkbox-group">
                                <input
                                    type="checkbox"
                                    id="emailNotifications"
                                    name="emailNotifications"
                                    checked={notificationSettings.emailNotifications}
                                    onChange={handleNotificationSettingsChange}
                                />
                                <label htmlFor="emailNotifications">Email orqali bildirishnomalar</label>
                            </div>

                            <div className="form-group checkbox-group">
                                <input
                                    type="checkbox"
                                    id="smsNotifications"
                                    name="smsNotifications"
                                    checked={notificationSettings.smsNotifications}
                                    onChange={handleNotificationSettingsChange}
                                />
                                <label htmlFor="smsNotifications">SMS orqali bildirishnomalar</label>
                            </div>

                            <div className="form-group checkbox-group">
                                <input
                                    type="checkbox"
                                    id="newPatientNotification"
                                    name="newPatientNotification"
                                    checked={notificationSettings.newPatientNotification}
                                    onChange={handleNotificationSettingsChange}
                                />
                                <label htmlFor="newPatientNotification">Yangi mijoz qo'shilganda bildirishnoma</label>
                            </div>

                            <div className="form-group checkbox-group">
                                <input
                                    type="checkbox"
                                    id="appointmentReminder"
                                    name="appointmentReminder"
                                    checked={notificationSettings.appointmentReminder}
                                    onChange={handleNotificationSettingsChange}
                                />
                                <label htmlFor="appointmentReminder">Qabul eslatmalari</label>
                            </div>

                            <div className="form-group checkbox-group">
                                <input
                                    type="checkbox"
                                    id="financialReports"
                                    name="financialReports"
                                    checked={notificationSettings.financialReports}
                                    onChange={handleNotificationSettingsChange}
                                />
                                <label htmlFor="financialReports">Moliyaviy hisobotlar</label>
                            </div>

                            <div className="form-group checkbox-group">
                                <input
                                    type="checkbox"
                                    id="systemUpdates"
                                    name="systemUpdates"
                                    checked={notificationSettings.systemUpdates}
                                    onChange={handleNotificationSettingsChange}
                                />
                                <label htmlFor="systemUpdates">Tizim yangilanishlari</label>
                            </div>
                        </div>
                    )}

                    {/* Security Settings */}
                    {activeTab === "security" && (
                        <div className="settings-panel">
                            <h2>{t("securitySettings")}</h2>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Parol muddati (kunlar)</label>
                                    <input
                                        type="number"
                                        name="passwordExpiry"
                                        value={securitySettings.passwordExpiry}
                                        onChange={handleSecuritySettingsChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Kirish urinishlari</label>
                                    <input
                                        type="number"
                                        name="loginAttempts"
                                        value={securitySettings.loginAttempts}
                                        onChange={handleSecuritySettingsChange}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Sessiya vaqti (daqiqalar)</label>
                                    <input
                                        type="number"
                                        name="sessionTimeout"
                                        value={securitySettings.sessionTimeout}
                                        onChange={handleSecuritySettingsChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group checkbox-group">
                                <input
                                    type="checkbox"
                                    id="requireStrongPassword"
                                    name="requireStrongPassword"
                                    checked={securitySettings.requireStrongPassword}
                                    onChange={handleSecuritySettingsChange}
                                />
                                <label htmlFor="requireStrongPassword">Kuchli parol talab qilish</label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
};