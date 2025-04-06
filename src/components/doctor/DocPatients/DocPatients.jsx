"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import {
    FaUserInjured,
    FaSearch,
    FaFilter,
    FaEye,
    FaHistory,
    FaNotesMedical,
    FaFileMedical,
    FaPhoneAlt,
    FaEnvelope,
    FaIdCard,
    FaBirthdayCake,
    FaVenusMars,
    FaMapMarkerAlt,
    FaWeight,
    FaRulerVertical,
    FaAllergies,
    FaPills,
    FaHeartbeat,
    FaUserMd,
    FaRegClock,
    FaRegCalendarAlt,
    FaRegClipboard,
    FaChevronLeft,
    FaChevronRight,
    FaExclamationTriangle,
    FaSpinner,
    FaTimes,
    FaPlus,
    FaSort,
    FaSortUp,
    FaSortDown,
    FaStethoscope,
} from "react-icons/fa"

export default function DocPatients() {
    const { user } = useAuth()
    const { t } = useLanguage()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Data states
    const [patients, setPatients] = useState([])
    const [appointments, setAppointments] = useState([])
    const [medicalRecords, setMedicalRecords] = useState([])

    // UI states
    const [searchTerm, setSearchTerm] = useState("")
    const [filterStatus, setFilterStatus] = useState("all")
    const [sortField, setSortField] = useState("lastVisit")
    const [sortDirection, setSortDirection] = useState("desc")
    const [currentPage, setCurrentPage] = useState(1)
    const [patientsPerPage] = useState(10)
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [activeTab, setActiveTab] = useState("info")
    const [showAddNoteModal, setShowAddNoteModal] = useState(false)
    const [newNote, setNewNote] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                // In a real app, these would be API calls
                // Simulating API calls with setTimeout
                setTimeout(() => {
                    // Mock patients data
                    const mockPatients = [
                        {
                            id: 101,
                            name: "Alisher Karimov",
                            age: 45,
                            gender: "male",
                            phone: "+998901234567",
                            email: "alisher.karimov@example.com",
                            address: "Tashkent, Chilanzar district, 14-23",
                            birthDate: "1978-05-15",
                            bloodType: "A+",
                            height: 178,
                            weight: 82,
                            allergies: ["Penicillin", "Dust"],
                            chronicConditions: ["Hypertension"],
                            medications: ["Lisinopril 10mg"],
                            lastVisit: "2023-05-15",
                            status: "active",
                            insuranceProvider: "UzMed Insurance",
                            insuranceNumber: "INS-12345-UZ",
                            emergencyContact: "Nodira Karimova (Wife) - +998901234568",
                            registrationDate: "2020-03-10",
                        },
                        {
                            id: 102,
                            name: "Dilnoza Saidova",
                            age: 32,
                            gender: "female",
                            phone: "+998901234568",
                            email: "dilnoza.saidova@example.com",
                            address: "Tashkent, Yunusabad district, 7-15",
                            birthDate: "1991-08-22",
                            bloodType: "B-",
                            height: 165,
                            weight: 58,
                            allergies: ["Sulfa drugs"],
                            chronicConditions: [],
                            medications: [],
                            lastVisit: "2023-05-16",
                            status: "active",
                            insuranceProvider: "Tashkent Health",
                            insuranceNumber: "TH-56789-UZ",
                            emergencyContact: "Akmal Saidov (Husband) - +998901234569",
                            registrationDate: "2021-01-15",
                        },
                        {
                            id: 103,
                            name: "Rustam Khasanov",
                            age: 58,
                            gender: "male",
                            phone: "+998901234569",
                            email: "rustam.khasanov@example.com",
                            address: "Tashkent, Mirzo Ulugbek district, 5-10",
                            birthDate: "1965-11-03",
                            bloodType: "O+",
                            height: 175,
                            weight: 90,
                            allergies: [],
                            chronicConditions: ["Diabetes Type 2", "Coronary Artery Disease"],
                            medications: ["Metformin 500mg", "Aspirin 81mg"],
                            lastVisit: "2023-05-17",
                            status: "active",
                            insuranceProvider: "UzMed Insurance",
                            insuranceNumber: "INS-67890-UZ",
                            emergencyContact: "Kamila Khasanova (Daughter) - +998901234570",
                            registrationDate: "2019-07-22",
                        },
                        {
                            id: 104,
                            name: "Nodira Azimova",
                            age: 27,
                            gender: "female",
                            phone: "+998901234570",
                            email: "nodira.azimova@example.com",
                            address: "Tashkent, Shaykhantaur district, 3-7",
                            birthDate: "1996-02-28",
                            bloodType: "AB+",
                            height: 162,
                            weight: 54,
                            allergies: ["Peanuts"],
                            chronicConditions: ["Asthma"],
                            medications: ["Albuterol inhaler"],
                            lastVisit: "2023-05-18",
                            status: "active",
                            insuranceProvider: "Tashkent Health",
                            insuranceNumber: "TH-98765-UZ",
                            emergencyContact: "Farida Azimova (Mother) - +998901234571",
                            registrationDate: "2022-04-05",
                        },
                        {
                            id: 105,
                            name: "Jahongir Tursunov",
                            age: 42,
                            gender: "male",
                            phone: "+998901234571",
                            email: "jahongir.tursunov@example.com",
                            address: "Tashkent, Almazar district, 9-12",
                            birthDate: "1981-09-17",
                            bloodType: "A-",
                            height: 180,
                            weight: 85,
                            allergies: [],
                            chronicConditions: ["Migraine"],
                            medications: ["Sumatriptan 50mg"],
                            lastVisit: "2023-05-19",
                            status: "inactive",
                            insuranceProvider: "UzMed Insurance",
                            insuranceNumber: "INS-54321-UZ",
                            emergencyContact: "Malika Tursunova (Wife) - +998901234572",
                            registrationDate: "2020-11-30",
                        },
                        {
                            id: 106,
                            name: "Zarina Umarova",
                            age: 35,
                            gender: "female",
                            phone: "+998901234572",
                            email: "zarina.umarova@example.com",
                            address: "Tashkent, Bektemir district, 2-5",
                            birthDate: "1988-12-10",
                            bloodType: "B+",
                            height: 168,
                            weight: 62,
                            allergies: ["Latex"],
                            chronicConditions: ["Hypothyroidism"],
                            medications: ["Levothyroxine 50mcg"],
                            lastVisit: "2023-04-25",
                            status: "active",
                            insuranceProvider: "Tashkent Health",
                            insuranceNumber: "TH-13579-UZ",
                            emergencyContact: "Bobur Umarov (Brother) - +998901234573",
                            registrationDate: "2021-06-18",
                        },
                        {
                            id: 107,
                            name: "Timur Aliyev",
                            age: 50,
                            gender: "male",
                            phone: "+998901234573",
                            email: "timur.aliyev@example.com",
                            address: "Tashkent, Yashnabad district, 11-9",
                            birthDate: "1973-07-05",
                            bloodType: "O-",
                            height: 182,
                            weight: 88,
                            allergies: ["Ibuprofen"],
                            chronicConditions: ["Gout"],
                            medications: ["Allopurinol 300mg"],
                            lastVisit: "2023-04-10",
                            status: "active",
                            insuranceProvider: "UzMed Insurance",
                            insuranceNumber: "INS-24680-UZ",
                            emergencyContact: "Sabina Aliyeva (Wife) - +998901234574",
                            registrationDate: "2019-09-15",
                        },
                        {
                            id: 108,
                            name: "Gulnora Rakhimova",
                            age: 29,
                            gender: "female",
                            phone: "+998901234574",
                            email: "gulnora.rakhimova@example.com",
                            address: "Tashkent, Sergeli district, 6-14",
                            birthDate: "1994-03-20",
                            bloodType: "A+",
                            height: 170,
                            weight: 60,
                            allergies: [],
                            chronicConditions: ["Anxiety Disorder"],
                            medications: ["Sertraline 50mg"],
                            lastVisit: "2023-03-28",
                            status: "active",
                            insuranceProvider: "Tashkent Health",
                            insuranceNumber: "TH-97531-UZ",
                            emergencyContact: "Aziz Rakhimov (Father) - +998901234575",
                            registrationDate: "2022-01-10",
                        },
                        {
                            id: 109,
                            name: "Otabek Yusupov",
                            age: 63,
                            gender: "male",
                            phone: "+998901234575",
                            email: "otabek.yusupov@example.com",
                            address: "Tashkent, Uchtepa district, 8-3",
                            birthDate: "1960-01-15",
                            bloodType: "AB-",
                            height: 173,
                            weight: 78,
                            allergies: ["Shellfish"],
                            chronicConditions: ["COPD", "Hypertension"],
                            medications: ["Tiotropium inhaler", "Amlodipine 5mg"],
                            lastVisit: "2023-03-15",
                            status: "inactive",
                            insuranceProvider: "UzMed Insurance",
                            insuranceNumber: "INS-86420-UZ",
                            emergencyContact: "Dilshod Yusupov (Son) - +998901234576",
                            registrationDate: "2018-12-05",
                        },
                        {
                            id: 110,
                            name: "Madina Ismoilova",
                            age: 38,
                            gender: "female",
                            phone: "+998901234576",
                            email: "madina.ismoilova@example.com",
                            address: "Tashkent, Chilanzar district, 19-8",
                            birthDate: "1985-06-12",
                            bloodType: "O+",
                            height: 166,
                            weight: 65,
                            allergies: ["Amoxicillin"],
                            chronicConditions: ["Rheumatoid Arthritis"],
                            medications: ["Methotrexate 10mg"],
                            lastVisit: "2023-02-20",
                            status: "active",
                            insuranceProvider: "Tashkent Health",
                            insuranceNumber: "TH-75319-UZ",
                            emergencyContact: "Shavkat Ismoilov (Husband) - +998901234577",
                            registrationDate: "2020-08-17",
                        },
                    ]

                    // Mock appointments data
                    const mockAppointments = [
                        {
                            id: 1001,
                            patientId: 101,
                            date: "2023-05-15",
                            time: "09:00",
                            type: "Regular check-up",
                            status: "completed",
                            notes:
                                "Patient's blood pressure is slightly elevated. Recommended lifestyle changes and scheduled a follow-up in 1 month.",
                        },
                        {
                            id: 1002,
                            patientId: 102,
                            date: "2023-05-16",
                            time: "10:30",
                            type: "Consultation",
                            status: "completed",
                            notes:
                                "Patient reported occasional headaches. Recommended keeping a headache diary and adequate hydration.",
                        },
                        {
                            id: 1003,
                            patientId: 103,
                            date: "2023-05-17",
                            time: "14:00",
                            type: "Follow-up",
                            status: "completed",
                            notes:
                                "Diabetes is well-controlled. Continued current medication regimen. Discussed importance of regular exercise.",
                        },
                        {
                            id: 1004,
                            patientId: 104,
                            date: "2023-05-18",
                            time: "11:15",
                            type: "Asthma review",
                            status: "completed",
                            notes: "Asthma symptoms well-controlled with current inhaler. Reviewed proper inhaler technique.",
                        },
                        {
                            id: 1005,
                            patientId: 105,
                            date: "2023-05-19",
                            time: "15:30",
                            type: "Migraine consultation",
                            status: "completed",
                            notes:
                                "Frequency of migraines has decreased with current medication. Discussed potential triggers and stress management.",
                        },
                        {
                            id: 1006,
                            patientId: 106,
                            date: "2023-04-25",
                            time: "09:45",
                            type: "Thyroid check-up",
                            status: "completed",
                            notes: "Thyroid function tests normal. Continued current medication dosage.",
                        },
                        {
                            id: 1007,
                            patientId: 107,
                            date: "2023-04-10",
                            time: "13:00",
                            type: "Gout follow-up",
                            status: "completed",
                            notes: "No recent gout attacks. Continued allopurinol. Advised on dietary modifications.",
                        },
                        {
                            id: 1008,
                            patientId: 108,
                            date: "2023-03-28",
                            time: "16:15",
                            type: "Mental health review",
                            status: "completed",
                            notes: "Anxiety symptoms improved with medication. Recommended continuing therapy sessions.",
                        },
                        {
                            id: 1009,
                            patientId: 109,
                            date: "2023-03-15",
                            time: "10:00",
                            type: "Respiratory assessment",
                            status: "completed",
                            notes: "COPD stable. Reviewed inhaler technique and importance of flu vaccination.",
                        },
                        {
                            id: 1010,
                            patientId: 110,
                            date: "2023-02-20",
                            time: "11:30",
                            type: "Arthritis review",
                            status: "completed",
                            notes:
                                "Joint pain well-controlled with current medication. Discussed importance of physical therapy exercises.",
                        },
                        {
                            id: 1011,
                            patientId: 101,
                            date: "2023-04-10",
                            time: "14:30",
                            type: "Blood pressure check",
                            status: "completed",
                            notes: "Blood pressure readings improved. Continued current medication and lifestyle modifications.",
                        },
                        {
                            id: 1012,
                            patientId: 103,
                            date: "2023-04-05",
                            time: "09:15",
                            type: "Diabetes review",
                            status: "completed",
                            notes:
                                "HbA1c levels improved. Adjusted medication dosage slightly. Emphasized importance of regular foot checks.",
                        },
                        {
                            id: 1013,
                            patientId: 104,
                            date: "2023-03-10",
                            time: "15:45",
                            type: "Allergy consultation",
                            status: "completed",
                            notes: "Discussed management strategies for peanut allergy. Prescribed EpiPen for emergency use.",
                        },
                        {
                            id: 1014,
                            patientId: 105,
                            date: "2023-04-12",
                            time: "11:00",
                            type: "Headache follow-up",
                            status: "completed",
                            notes: "Migraine frequency decreased with preventive medication. Continued current regimen.",
                        },
                        {
                            id: 1015,
                            patientId: 107,
                            date: "2023-03-05",
                            time: "10:30",
                            type: "Gout assessment",
                            status: "completed",
                            notes: "Uric acid levels within target range. Continued allopurinol. Reinforced dietary advice.",
                        },
                    ]

                    // Mock medical records data
                    const mockMedicalRecords = [
                        {
                            id: 2001,
                            patientId: 101,
                            date: "2023-05-15",
                            type: "Examination",
                            provider: "Dr. Sardor Alimov",
                            diagnosis: "Essential hypertension",
                            treatment: "Lisinopril 10mg daily",
                            notes: "Blood pressure: 145/90 mmHg. Recommended dietary sodium restriction and regular exercise.",
                        },
                        {
                            id: 2002,
                            patientId: 101,
                            date: "2023-04-10",
                            type: "Blood test",
                            provider: "Lab Services",
                            diagnosis: "",
                            treatment: "",
                            notes:
                                "Cholesterol: 210 mg/dL (slightly elevated), Glucose: 95 mg/dL (normal), Creatinine: 0.9 mg/dL (normal)",
                        },
                        {
                            id: 2003,
                            patientId: 102,
                            date: "2023-05-16",
                            type: "Examination",
                            provider: "Dr. Sardor Alimov",
                            diagnosis: "Tension headache",
                            treatment: "Acetaminophen as needed",
                            notes: "Headaches typically occur during periods of stress. No neurological abnormalities detected.",
                        },
                        {
                            id: 2004,
                            patientId: 103,
                            date: "2023-05-17",
                            type: "Examination",
                            provider: "Dr. Sardor Alimov",
                            diagnosis: "Type 2 diabetes mellitus, Coronary artery disease",
                            treatment: "Metformin 500mg twice daily, Aspirin 81mg daily",
                            notes: "Blood glucose: 135 mg/dL (fasting). Heart rate: 78 bpm, regular. Blood pressure: 138/85 mmHg.",
                        },
                        {
                            id: 2005,
                            patientId: 103,
                            date: "2023-04-05",
                            type: "HbA1c test",
                            provider: "Lab Services",
                            diagnosis: "",
                            treatment: "",
                            notes: "HbA1c: 7.1% (improved from previous 7.8%)",
                        },
                        {
                            id: 2006,
                            patientId: 104,
                            date: "2023-05-18",
                            type: "Examination",
                            provider: "Dr. Sardor Alimov",
                            diagnosis: "Asthma, well-controlled",
                            treatment: "Albuterol inhaler as needed",
                            notes: "Lung examination clear. Peak flow: 380 L/min (within normal range for patient).",
                        },
                        {
                            id: 2007,
                            patientId: 104,
                            date: "2023-03-10",
                            type: "Allergy testing",
                            provider: "Allergy Specialist",
                            diagnosis: "Peanut allergy",
                            treatment: "Avoidance, EpiPen prescription",
                            notes: "Positive skin prick test for peanuts. Negative for other common allergens.",
                        },
                        {
                            id: 2008,
                            patientId: 105,
                            date: "2023-05-19",
                            type: "Examination",
                            provider: "Dr. Sardor Alimov",
                            diagnosis: "Migraine without aura",
                            treatment: "Sumatriptan 50mg as needed",
                            notes: "Headaches occur 2-3 times monthly, typically unilateral and throbbing. No neurological deficits.",
                        },
                        {
                            id: 2009,
                            patientId: 106,
                            date: "2023-04-25",
                            type: "Examination",
                            provider: "Dr. Sardor Alimov",
                            diagnosis: "Hypothyroidism",
                            treatment: "Levothyroxine 50mcg daily",
                            notes: "Patient reports improved energy levels. No symptoms of hypo- or hyperthyroidism.",
                        },
                        {
                            id: 2010,
                            patientId: 106,
                            date: "2023-04-20",
                            type: "Thyroid function test",
                            provider: "Lab Services",
                            diagnosis: "",
                            treatment: "",
                            notes: "TSH: 2.8 mIU/L (normal), Free T4: 1.2 ng/dL (normal)",
                        },
                    ]

                    setPatients(mockPatients)
                    setAppointments(mockAppointments)
                    setMedicalRecords(mockMedicalRecords)
                    setLoading(false)
                }, 800)
            } catch (err) {
                setError(err.message || "An error occurred")
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // Filter patients based on search and filter
    const filteredPatients = patients.filter((patient) => {
        const matchesSearch =
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.phone.includes(searchTerm) ||
            patient.email.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesFilter = filterStatus === "all" || patient.status === filterStatus

        return matchesSearch && matchesFilter
    })

    // Sort patients
    const sortedPatients = [...filteredPatients].sort((a, b) => {
        let comparison = 0

        switch (sortField) {
            case "name":
                comparison = a.name.localeCompare(b.name)
                break
            case "age":
                comparison = a.age - b.age
                break
            case "lastVisit":
                comparison = new Date(a.lastVisit) - new Date(b.lastVisit)
                break
            default:
                comparison = 0
        }

        return sortDirection === "asc" ? comparison : -comparison
    })

    // Pagination
    const indexOfLastPatient = currentPage * patientsPerPage
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage
    const currentPatients = sortedPatients.slice(indexOfFirstPatient, indexOfLastPatient)
    const totalPages = Math.ceil(sortedPatients.length / patientsPerPage)

    // Handle sort
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    // Get sort icon
    const getSortIcon = (field) => {
        if (sortField !== field) return <FaSort className="sort-icon" />
        return sortDirection === "asc" ? (
            <FaSortUp className="sort-icon active" />
        ) : (
            <FaSortDown className="sort-icon active" />
        )
    }

    // Handle patient selection
    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient)
        setActiveTab("info")
    }

    // Get patient appointments
    const getPatientAppointments = (patientId) => {
        return appointments
            .filter((appointment) => appointment.patientId === patientId)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    // Get patient medical records
    const getPatientMedicalRecords = (patientId) => {
        return medicalRecords
            .filter((record) => record.patientId === patientId)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
    }

    // Handle add note
    const handleAddNote = () => {
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            const newRecord = {
                id: Math.max(...medicalRecords.map((record) => record.id)) + 1,
                patientId: selectedPatient.id,
                date: new Date().toISOString().split("T")[0],
                type: "Note",
                provider: "Dr. Sardor Alimov",
                diagnosis: "",
                treatment: "",
                notes: newNote,
            }

            setMedicalRecords([...medicalRecords, newRecord])
            setNewNote("")
            setShowAddNoteModal(false)
            setIsSubmitting(false)
        }, 800)
    }

    // Format date
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString("en-US", options)
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
        <div className="doctor-patients">
            {!selectedPatient ? (
                // Patients list view
                <>
                    <div className="page-header">
                        <div className="header-title">
                            <FaUserInjured className="header-icon" />
                            <h1>{t("my_patients")}</h1>
                        </div>
                        <div className="header-actions">
                            <div className="search-box">
                                <FaSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder={t("search_patients")}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="filter-dropdown">
                                <FaFilter className="filter-icon" />
                                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                                    <option value="all">{t("all_patients")}</option>
                                    <option value="active">{t("active_patients")}</option>
                                    <option value="inactive">{t("inactive_patients")}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="patients-table-container">
                        <table className="patients-table">
                            <thead>
                                <tr>
                                    <th className="sortable" onClick={() => handleSort("name")}>
                                        <div className="th-content">
                                            {t("patient_name")}
                                            {getSortIcon("name")}
                                        </div>
                                    </th>
                                    <th className="sortable" onClick={() => handleSort("age")}>
                                        <div className="th-content">
                                            {t("age")}
                                            {getSortIcon("age")}
                                        </div>
                                    </th>
                                    <th>{t("contact")}</th>
                                    <th>{t("conditions")}</th>
                                    <th className="sortable" onClick={() => handleSort("lastVisit")}>
                                        <div className="th-content">
                                            {t("last_visit")}
                                            {getSortIcon("lastVisit")}
                                        </div>
                                    </th>
                                    <th>{t("status")}</th>
                                    <th>{t("actions")}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentPatients.length > 0 ? (
                                    currentPatients.map((patient) => (
                                        <tr key={patient.id} className={`patient-row ${patient.status}`}>
                                            <td>
                                                <div className="patient-name">
                                                    <div className="patient-avatar">{patient.name.charAt(0)}</div>
                                                    <span>{patient.name}</span>
                                                </div>
                                            </td>
                                            <td>{patient.age}</td>
                                            <td>
                                                <div className="contact-info">
                                                    <div className="contact-item">
                                                        <FaPhoneAlt className="contact-icon" />
                                                        <span>{patient.phone}</span>
                                                    </div>
                                                    <div className="contact-item">
                                                        <FaEnvelope className="contact-icon" />
                                                        <span>{patient.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="conditions-list">
                                                    {patient.chronicConditions.length > 0 ? (
                                                        patient.chronicConditions.map((condition, index) => (
                                                            <span key={index} className="condition-tag">
                                                                {condition}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="no-conditions">{t("no_conditions")}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>{formatDate(patient.lastVisit)}</td>
                                            <td>
                                                <span className={`status-badge ${patient.status}`}>
                                                    {patient.status === "active" ? t("active") : t("inactive")}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button
                                                        className="btn btn-icon btn-view"
                                                        onClick={() => handlePatientSelect(patient)}
                                                        title={t("view_details")}
                                                    >
                                                        <FaEye />
                                                    </button>
                                                    <button
                                                        className="btn btn-icon btn-history"
                                                        onClick={() => {
                                                            handlePatientSelect(patient)
                                                            setActiveTab("history")
                                                        }}
                                                        title={t("view_history")}
                                                    >
                                                        <FaHistory />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="no-data">
                                            <div className="no-data-content">
                                                <FaUserInjured className="no-data-icon" />
                                                <p>{t("no_patients_found")}</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="btn btn-icon"
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <FaChevronLeft />
                            </button>
                            <div className="page-info">
                                {t("page")} {currentPage} {t("of")} {totalPages}
                            </div>
                            <button
                                className="btn btn-icon"
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                <FaChevronRight />
                            </button>
                        </div>
                    )}
                </>
            ) : (
                // Patient details view
                <div className="patient-details">
                    <div className="details-header">
                        <button className="btn btn-back" onClick={() => setSelectedPatient(null)}>
                            <FaChevronLeft /> {t("back_to_patients")}
                        </button>
                        <h2>{selectedPatient.name}</h2>
                        <span className={`status-badge ${selectedPatient.status}`}>
                            {selectedPatient.status === "active" ? t("active") : t("inactive")}
                        </span>
                    </div>

                    <div className="details-tabs">
                        <button
                            className={`tab-button ${activeTab === "info" ? "active" : ""}`}
                            onClick={() => setActiveTab("info")}
                        >
                            <FaIdCard className="tab-icon" />
                            {t("patient_info")}
                        </button>
                        <button
                            className={`tab-button ${activeTab === "history" ? "active" : ""}`}
                            onClick={() => setActiveTab("history")}
                        >
                            <FaHistory className="tab-icon" />
                            {t("visit_history")}
                        </button>
                        <button
                            className={`tab-button ${activeTab === "records" ? "active" : ""}`}
                            onClick={() => setActiveTab("records")}
                        >
                            <FaFileMedical className="tab-icon" />
                            {t("medical_records")}
                        </button>
                    </div>

                    <div className="details-content">
                        {activeTab === "info" && (
                            <div className="info-tab">
                                <div className="info-section personal-info">
                                    <h3 className="section-title">
                                        <FaUserInjured className="section-icon" />
                                        {t("personal_information")}
                                    </h3>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <div className="info-label">{t("full_name")}</div>
                                            <div className="info-value">{selectedPatient.name}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">{t("birth_date")}</div>
                                            <div className="info-value">
                                                <FaBirthdayCake className="info-icon" />
                                                {formatDate(selectedPatient.birthDate)} ({selectedPatient.age} {t("years")})
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">{t("gender")}</div>
                                            <div className="info-value">
                                                <FaVenusMars className="info-icon" />
                                                {selectedPatient.gender === "male" ? t("male") : t("female")}
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">{t("address")}</div>
                                            <div className="info-value">
                                                <FaMapMarkerAlt className="info-icon" />
                                                {selectedPatient.address}
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">{t("phone")}</div>
                                            <div className="info-value">
                                                <FaPhoneAlt className="info-icon" />
                                                {selectedPatient.phone}
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">{t("email")}</div>
                                            <div className="info-value">
                                                <FaEnvelope className="info-icon" />
                                                {selectedPatient.email}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-section medical-info">
                                    <h3 className="section-title">
                                        <FaNotesMedical className="section-icon" />
                                        {t("medical_information")}
                                    </h3>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <div className="info-label">{t("blood_type")}</div>
                                            <div className="info-value">
                                                <FaHeartbeat className="info-icon" />
                                                {selectedPatient.bloodType}
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">{t("height")}</div>
                                            <div className="info-value">
                                                <FaRulerVertical className="info-icon" />
                                                {selectedPatient.height} cm
                                            </div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">{t("weight")}</div>
                                            <div className="info-value">
                                                <FaWeight className="info-icon" />
                                                {selectedPatient.weight} kg
                                            </div>
                                        </div>
                                        <div className="info-item full-width">
                                            <div className="info-label">{t("allergies")}</div>
                                            <div className="info-value">
                                                <FaAllergies className="info-icon" />
                                                {selectedPatient.allergies.length > 0 ? (
                                                    <div className="tags-list">
                                                        {selectedPatient.allergies.map((allergy, index) => (
                                                            <span key={index} className="tag allergy-tag">
                                                                {allergy}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="no-data-text">{t("no_known_allergies")}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="info-item full-width">
                                            <div className="info-label">{t("chronic_conditions")}</div>
                                            <div className="info-value">
                                                <FaHeartbeat className="info-icon" />
                                                {selectedPatient.chronicConditions.length > 0 ? (
                                                    <div className="tags-list">
                                                        {selectedPatient.chronicConditions.map((condition, index) => (
                                                            <span key={index} className="tag condition-tag">
                                                                {condition}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="no-data-text">{t("no_chronic_conditions")}</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="info-item full-width">
                                            <div className="info-label">{t("current_medications")}</div>
                                            <div className="info-value">
                                                <FaPills className="info-icon" />
                                                {selectedPatient.medications.length > 0 ? (
                                                    <div className="tags-list">
                                                        {selectedPatient.medications.map((medication, index) => (
                                                            <span key={index} className="tag medication-tag">
                                                                {medication}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <span className="no-data-text">{t("no_current_medications")}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="info-section insurance-info">
                                    <h3 className="section-title">
                                        <FaIdCard className="section-icon" />
                                        {t("insurance_information")}
                                    </h3>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <div className="info-label">{t("insurance_provider")}</div>
                                            <div className="info-value">{selectedPatient.insuranceProvider}</div>
                                        </div>
                                        <div className="info-item">
                                            <div className="info-label">{t("insurance_number")}</div>
                                            <div className="info-value">{selectedPatient.insuranceNumber}</div>
                                        </div>
                                        <div className="info-item full-width">
                                            <div className="info-label">{t("emergency_contact")}</div>
                                            <div className="info-value">{selectedPatient.emergencyContact}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "history" && (
                            <div className="history-tab">
                                <div className="tab-header">
                                    <h3>{t("visit_history")}</h3>
                                </div>

                                <div className="appointments-list">
                                    {getPatientAppointments(selectedPatient.id).length > 0 ? (
                                        getPatientAppointments(selectedPatient.id).map((appointment) => (
                                            <div key={appointment.id} className="appointment-card">
                                                <div className="appointment-header">
                                                    <div className="appointment-date">
                                                        <FaRegCalendarAlt className="appointment-icon" />
                                                        {formatDate(appointment.date)}
                                                    </div>
                                                    <div className="appointment-time">
                                                        <FaRegClock className="appointment-icon" />
                                                        {appointment.time}
                                                    </div>
                                                    <div className={`appointment-status ${appointment.status}`}>{t(appointment.status)}</div>
                                                </div>
                                                <div className="appointment-body">
                                                    <div className="appointment-type">
                                                        <FaStethoscope className="appointment-icon" />
                                                        {appointment.type}
                                                    </div>
                                                    <div className="appointment-notes">
                                                        <FaRegClipboard className="appointment-icon" />
                                                        {appointment.notes}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-data-message">
                                            <FaRegCalendarAlt className="no-data-icon" />
                                            <p>{t("no_appointment_history")}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "records" && (
                            <div className="records-tab">
                                <div className="tab-header">
                                    <h3>{t("medical_records")}</h3>
                                    <button className="btn btn-primary" onClick={() => setShowAddNoteModal(true)}>
                                        <FaPlus /> {t("add_note")}
                                    </button>
                                </div>

                                <div className="records-list">
                                    {getPatientMedicalRecords(selectedPatient.id).length > 0 ? (
                                        getPatientMedicalRecords(selectedPatient.id).map((record) => (
                                            <div key={record.id} className="record-card">
                                                <div className="record-header">
                                                    <div className="record-date">
                                                        <FaRegCalendarAlt className="record-icon" />
                                                        {formatDate(record.date)}
                                                    </div>
                                                    <div className="record-type">{record.type}</div>
                                                    <div className="record-provider">
                                                        <FaUserMd className="record-icon" />
                                                        {record.provider}
                                                    </div>
                                                </div>
                                                {(record.diagnosis || record.treatment) && (
                                                    <div className="record-details">
                                                        {record.diagnosis && (
                                                            <div className="record-diagnosis">
                                                                <strong>{t("diagnosis")}:</strong> {record.diagnosis}
                                                            </div>
                                                        )}
                                                        {record.treatment && (
                                                            <div className="record-treatment">
                                                                <strong>{t("treatment")}:</strong> {record.treatment}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                <div className="record-notes">
                                                    <FaRegClipboard className="record-icon" />
                                                    {record.notes}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="no-data-message">
                                            <FaFileMedical className="no-data-icon" />
                                            <p>{t("no_medical_records")}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Add Note Modal */}
            {showAddNoteModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h3>{t("add_medical_note")}</h3>
                            <button className="close-btn" onClick={() => setShowAddNoteModal(false)}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="note">
                                    <FaRegClipboard className="form-icon" /> {t("note")}
                                </label>
                                <textarea
                                    id="note"
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    rows="5"
                                    placeholder={t("enter_medical_note")}
                                ></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={() => setShowAddNoteModal(false)} disabled={isSubmitting}>
                                {t("cancel")}
                            </button>
                            <button className="btn btn-primary" onClick={handleAddNote} disabled={!newNote.trim() || isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <FaSpinner className="spinner-icon" />
                                        {t("saving")}...
                                    </>
                                ) : (
                                    <>
                                        <FaPlus />
                                        {t("add_note")}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}