import React , { useState, useEffect } from "react"
import {
    FaChartBar,
    FaChartLine,
    FaChartPie,
    FaDownload,
    FaCalendarAlt,
    FaMoneyBillWave,
    FaHistory,
    FaFilter,
    FaSearch,
    FaTimes,
    FaArrowLeft,
    FaArrowRight,
} from "react-icons/fa"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
} from "chart.js"
import { Pie, Bar, Line } from "react-chartjs-2"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement)

export default function Reports() {
    const { selectedBranch } = useAuth()
    const { t, language } = useLanguage()
    const [reportType, setReportType] = useState("financial")
    const [dateRange, setDateRange] = useState("month")
    const [reportData, setReportData] = useState(null)
    const [showWithdrawalModal, setShowWithdrawalModal] = useState(false)
    const [showHistoryModal, setShowHistoryModal] = useState(false)
    const [withdrawalData, setWithdrawalData] = useState({
        amount: "",
        reason: "",
        description: "",
    })
    const [historyYear, setHistoryYear] = useState(new Date().getFullYear())
    const [searchTerm, setSearchTerm] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [filterCategory, setFilterCategory] = useState("all")
    const [filterAmount, setFilterAmount] = useState("all")

    // Withdrawal reasons
    const withdrawalReasons = [
        { id: "salary", name: t("salary") },
        { id: "salary_increase", name: t("salary_increase") },
        { id: "utilities", name: t("utilities") },
        { id: "rent", name: t("rent") },
        { id: "supplies", name: t("supplies") },
        { id: "medicine", name: t("medicine") },
        { id: "repairs", name: t("repairs") },
        { id: "marketing", name: t("marketing") },
        { id: "taxes", name: t("taxes") },
        { id: "other", name: t("other_expenses") },
    ]

    // Mock data for withdrawal history
    const withdrawalHistoryData = [
        {
            id: 1,
            date: "2023-05-15",
            amount: 5000000,
            reason: "salary",
            description: t("salary_payment_description"),
            branch: "branch1",
            year: 2023,
            category: "salary",
        },
        {
            id: 2,
            date: "2023-05-10",
            amount: 1200000,
            reason: "utilities",
            description: t("utilities_payment_description"),
            branch: "branch1",
            year: 2023,
            category: "utilities",
        },
        {
            id: 3,
            date: "2023-05-05",
            amount: 2500000,
            reason: "supplies",
            description: t("supplies_payment_description"),
            branch: "branch2",
            year: 2023,
            category: "supplies",
        },
        {
            id: 4,
            date: "2023-04-25",
            amount: 800000,
            reason: "medicine",
            description: t("medicine_payment_description"),
            branch: "branch2",
            year: 2023,
            category: "medicine",
        },
        {
            id: 5,
            date: "2023-04-20",
            amount: 1500000,
            reason: "salary_increase",
            description: t("salary_increase_description"),
            branch: "branch3",
            year: 2023,
            category: "salary",
        },
        {
            id: 6,
            date: "2023-04-15",
            amount: 3000000,
            reason: "rent",
            description: t("rent_payment_description"),
            branch: "branch3",
            year: 2023,
            category: "rent",
        },
        {
            id: 7,
            date: "2022-12-15",
            amount: 4800000,
            reason: "salary",
            description: t("salary_payment_description"),
            branch: "branch1",
            year: 2022,
            category: "salary",
        },
        {
            id: 8,
            date: "2022-11-10",
            amount: 1100000,
            reason: "utilities",
            description: t("utilities_payment_description"),
            branch: "branch1",
            year: 2022,
            category: "utilities",
        },
        {
            id: 9,
            date: "2021-05-15",
            amount: 4500000,
            reason: "salary",
            description: t("salary_payment_description"),
            branch: "branch1",
            year: 2021,
            category: "salary",
        },
        {
            id: 10,
            date: "2020-05-15",
            amount: 4200000,
            reason: "salary",
            description: t("salary_payment_description"),
            branch: "branch1",
            year: 2020,
            category: "salary",
        },
        {
            id: 11,
            date: "2019-05-15",
            amount: 3800000,
            reason: "salary",
            description: t("salary_payment_description"),
            branch: "branch1",
            year: 2019,
            category: "salary",
        },
    ]

    // Financial data
    const financialData = {
        all: {
            month: {
                labels: [t("week1"), t("week2"), t("week3"), t("week4")],
                datasets: [
                    {
                        label: t("income"),
                        data: [2800000, 3200000, 2900000, 3600000],
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: t("expense"),
                        data: [1900000, 2100000, 1800000, 2400000],
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalIncome: 12500000,
                    totalExpenses: 8200000,
                    profit: 4300000,
                    profitMargin: 34.4,
                },
            },
            quarter: {
                labels: [t("january"), t("february"), t("march")],
                datasets: [
                    {
                        label: t("income"),
                        data: [11500000, 12800000, 13200000],
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: t("expense"),
                        data: [7800000, 8500000, 8900000],
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalIncome: 37500000,
                    totalExpenses: 25200000,
                    profit: 12300000,
                    profitMargin: 32.8,
                },
            },
            year: {
                labels: [t("quarter1"), t("quarter2"), t("quarter3"), t("quarter4")],
                datasets: [
                    {
                        label: t("income"),
                        data: [37500000, 42300000, 39800000, 45400000],
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: t("expense"),
                        data: [25200000, 28500000, 26900000, 30400000],
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalIncome: 165000000,
                    totalExpenses: 111000000,
                    profit: 54000000,
                    profitMargin: 32.7,
                },
            },
        },
        branch1: {
            month: {
                labels: [t("week1"), t("week2"), t("week3"), t("week4")],
                datasets: [
                    {
                        label: t("income"),
                        data: [1200000, 1350000, 1180000, 1470000],
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: t("expense"),
                        data: [820000, 910000, 780000, 990000],
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalIncome: 5200000,
                    totalExpenses: 3500000,
                    profit: 1700000,
                    profitMargin: 32.7,
                },
            },
            quarter: {
                labels: [t("january"), t("february"), t("march")],
                datasets: [
                    {
                        label: t("income"),
                        data: [4800000, 5300000, 5500000],
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: t("expense"),
                        data: [3200000, 3600000, 3700000],
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalIncome: 15600000,
                    totalExpenses: 10500000,
                    profit: 5100000,
                    profitMargin: 32.7,
                },
            },
            year: {
                labels: [t("quarter1"), t("quarter2"), t("quarter3"), t("quarter4")],
                datasets: [
                    {
                        label: t("income"),
                        data: [15600000, 17500000, 16400000, 18800000],
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: t("expense"),
                        data: [10500000, 11800000, 11000000, 12700000],
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalIncome: 68300000,
                    totalExpenses: 46000000,
                    profit: 22300000,
                    profitMargin: 32.7,
                },
            },
        },
        branch2: {
            month: {
                labels: [t("week1"), t("week2"), t("week3"), t("week4")],
                datasets: [
                    {
                        label: t("income"),
                        data: [900000, 1050000, 980000, 1170000],
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: t("expense"),
                        data: [620000, 710000, 680000, 790000],
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalIncome: 4100000,
                    totalExpenses: 2800000,
                    profit: 1300000,
                    profitMargin: 31.7,
                },
            },
            quarter: {
                labels: [t("january"), t("february"), t("march")],
                datasets: [
                    {
                        label: t("income"),
                        data: [3800000, 4300000, 4500000],
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: t("expense"),
                        data: [2600000, 2900000, 3100000],
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalIncome: 12600000,
                    totalExpenses: 8600000,
                    profit: 4000000,
                    profitMargin: 31.7,
                },
            },
            year: {
                labels: [t("quarter1"), t("quarter2"), t("quarter3"), t("quarter4")],
                datasets: [
                    {
                        label: t("income"),
                        data: [12600000, 14500000, 13400000, 15800000],
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: t("expense"),
                        data: [8600000, 9800000, 9000000, 10700000],
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalIncome: 56300000,
                    totalExpenses: 38100000,
                    profit: 18200000,
                    profitMargin: 32.3,
                },
            },
        },
        branch3: {
            month: {
                labels: [t("week1"), t("week2"), t("week3"), t("week4")],
                datasets: [
                    {
                        label: t("income"),
                        data: [700000, 800000, 740000, 960000],
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: t("expense"),
                        data: [460000, 480000, 440000, 620000],
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalIncome: 3200000,
                    totalExpenses: 2000000,
                    profit: 1200000,
                    profitMargin: 37.5,
                },
            },
            quarter: {
                labels: [t("january"), t("february"), t("march")],
                datasets: [
                    {
                        label: t("income"),
                        data: [2900000, 3200000, 3400000],
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: t("expense"),
                        data: [2000000, 2100000, 2200000],
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalIncome: 9500000,
                    totalExpenses: 6300000,
                    profit: 3200000,
                    profitMargin: 33.7,
                },
            },
            year: {
                labels: [t("quarter1"), t("quarter2"), t("quarter3"), t("quarter4")],
                datasets: [
                    {
                        label: t("income"),
                        data: [9500000, 10300000, 10000000, 11400000],
                        backgroundColor: "rgba(75, 192, 192, 0.5)",
                        borderColor: "rgba(75, 192, 192, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: t("expense"),
                        data: [6300000, 6900000, 6700000, 7600000],
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalIncome: 41200000,
                    totalExpenses: 27500000,
                    profit: 13700000,
                    profitMargin: 33.3,
                },
            },
        },
    }

    // Patients data
    const patientsData = {
        all: {
            month: {
                labels: [t("week1"), t("week2"), t("week3"), t("week4")],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [42, 38, 45, 31],
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalPatients: 156,
                    averagePerWeek: 39,
                    growth: 8.3,
                },
            },
            quarter: {
                labels: [t("january"), t("february"), t("march")],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [145, 162, 178],
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalPatients: 485,
                    averagePerMonth: 162,
                    growth: 22.8,
                },
            },
            year: {
                labels: [t("quarter1"), t("quarter2"), t("quarter3"), t("quarter4")],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [485, 520, 495, 540],
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalPatients: 2040,
                    averagePerQuarter: 510,
                    growth: 11.3,
                },
            },
        },
        branch1: {
            month: {
                labels: [t("week1"), t("week2"), t("week3"), t("week4")],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [18, 16, 20, 14],
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalPatients: 68,
                    averagePerWeek: 17,
                    growth: 11.1,
                },
            },
            quarter: {
                labels: [t("january"), t("february"), t("march")],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [62, 70, 78],
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalPatients: 210,
                    averagePerMonth: 70,
                    growth: 25.8,
                },
            },
            year: {
                labels: [t("quarter1"), t("quarter2"), t("quarter3"), t("quarter4")],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [210, 225, 215, 230],
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalPatients: 880,
                    averagePerQuarter: 220,
                    growth: 9.5,
                },
            },
        },
        branch2: {
            month: {
                labels: [t("week1"), t("week2"), t("week3"), t("week4")],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [14, 12, 15, 9],
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalPatients: 50,
                    averagePerWeek: 12.5,
                    growth: 8.7,
                },
            },
            quarter: {
                labels: [t("january"), t("february"), t("march")],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [48, 52, 56],
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalPatients: 156,
                    averagePerMonth: 52,
                    growth: 16.7,
                },
            },
            year: {
                labels: [t("quarter1"), t("quarter2"), t("quarter3"), t("quarter4")],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [156, 165, 160, 175],
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalPatients: 656,
                    averagePerQuarter: 164,
                    growth: 12.2,
                },
            },
        },
        branch3: {
            month: {
                labels: [t("week1"), t("week2"), t("week3"), t("week4")],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [10, 10, 10, 8],
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalPatients: 38,
                    averagePerWeek: 9.5,
                    growth: 5.6,
                },
            },
            quarter: {
                labels: [t("january"), t("february"), t("march")],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [35, 40, 44],
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalPatients: 119,
                    averagePerMonth: 39.7,
                    growth: 25.7,
                },
            },
            year: {
                labels: [t("quarter1"), t("quarter2"), t("quarter3"), t("quarter4")],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [119, 130, 120, 135],
                        backgroundColor: "rgba(54, 162, 235, 0.5)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                ],
                summary: {
                    totalPatients: 504,
                    averagePerQuarter: 126,
                    growth: 13.4,
                },
            },
        },
    }

    // Staff performance data
    const staffPerformanceData = {
        all: {
            month: {
                labels: ["Dr. Aziz", "Dr. Jasur", "Dr. Nilufar", "Dr. Sardor", "Dr. Malika"],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [28, 32, 19, 24, 22],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.5)",
                            "rgba(54, 162, 235, 0.5)",
                            "rgba(255, 206, 86, 0.5)",
                            "rgba(75, 192, 192, 0.5)",
                            "rgba(153, 102, 255, 0.5)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
                summary: {
                    topPerformer: "Dr. Jasur",
                    totalPatients: 125,
                    averagePerDoctor: 25,
                },
            },
            quarter: {
                labels: ["Dr. Aziz", "Dr. Jasur", "Dr. Nilufar", "Dr. Sardor", "Dr. Malika"],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [85, 98, 62, 76, 68],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.5)",
                            "rgba(54, 162, 235, 0.5)",
                            "rgba(255, 206, 86, 0.5)",
                            "rgba(75, 192, 192, 0.5)",
                            "rgba(153, 102, 255, 0.5)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
                summary: {
                    topPerformer: "Dr. Jasur",
                    totalPatients: 389,
                    averagePerDoctor: 78,
                },
            },
            year: {
                labels: ["Dr. Aziz", "Dr. Jasur", "Dr. Nilufar", "Dr. Sardor", "Dr. Malika"],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [345, 392, 248, 305, 272],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.5)",
                            "rgba(54, 162, 235, 0.5)",
                            "rgba(255, 206, 86, 0.5)",
                            "rgba(75, 192, 192, 0.5)",
                            "rgba(153, 102, 255, 0.5)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                            "rgba(153, 102, 255, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
                summary: {
                    topPerformer: "Dr. Jasur",
                    totalPatients: 1562,
                    averagePerDoctor: 312,
                },
            },
        },
        branch1: {
            month: {
                labels: ["Dr. Aziz", "Dr. Malika"],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [28, 22],
                        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)"],
                        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                        borderWidth: 1,
                    },
                ],
                summary: {
                    topPerformer: "Dr. Aziz",
                    totalPatients: 50,
                    averagePerDoctor: 25,
                },
            },
            quarter: {
                labels: ["Dr. Aziz", "Dr. Malika"],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [85, 68],
                        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)"],
                        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                        borderWidth: 1,
                    },
                ],
                summary: {
                    topPerformer: "Dr. Aziz",
                    totalPatients: 153,
                    averagePerDoctor: 76.5,
                    r: 76.5,
                },
            },
            year: {
                labels: ["Dr. Aziz", "Dr. Malika"],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [345, 272],
                        backgroundColor: ["rgba(255, 99, 132, 0.5)", "rgba(54, 162, 235, 0.5)"],
                        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                        borderWidth: 1,
                    },
                ],
                summary: {
                    topPerformer: "Dr. Aziz",
                    totalPatients: 617,
                    averagePerDoctor: 308.5,
                },
            },
        },
        branch2: {
            month: {
                labels: ["Dr. Jasur", "Dr. Nilufar"],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [32, 19],
                        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)"],
                        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
                        borderWidth: 1,
                    },
                ],
                summary: {
                    topPerformer: "Dr. Jasur",
                    totalPatients: 51,
                    averagePerDoctor: 25.5,
                },
            },
            quarter: {
                labels: ["Dr. Jasur", "Dr. Nilufar"],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [98, 62],
                        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)"],
                        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
                        borderWidth: 1,
                    },
                ],
                summary: {
                    topPerformer: "Dr. Jasur",
                    totalPatients: 160,
                    averagePerDoctor: 80,
                },
            },
            year: {
                labels: ["Dr. Jasur", "Dr. Nilufar"],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [392, 248],
                        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 206, 86, 0.5)"],
                        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)"],
                        borderWidth: 1,
                    },
                ],
                summary: {
                    topPerformer: "Dr. Jasur",
                    totalPatients: 640,
                    averagePerDoctor: 320,
                },
            },
        },
        branch3: {
            month: {
                labels: ["Dr. Sardor"],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [24],
                        backgroundColor: ["rgba(75, 192, 192, 0.5)"],
                        borderColor: ["rgba(75, 192, 192, 1)"],
                        borderWidth: 1,
                    },
                ],
                summary: {
                    topPerformer: "Dr. Sardor",
                    totalPatients: 24,
                    averagePerDoctor: 24,
                },
            },
            quarter: {
                labels: ["Dr. Sardor"],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [76],
                        backgroundColor: ["rgba(75, 192, 192, 0.5)"],
                        borderColor: ["rgba(75, 192, 192, 1)"],
                        borderWidth: 1,
                    },
                ],
                summary: {
                    topPerformer: "Dr. Sardor",
                    totalPatients: 76,
                    averagePerDoctor: 76,
                },
            },
            year: {
                labels: ["Dr. Sardor"],
                datasets: [
                    {
                        label: t("patients_count"),
                        data: [305],
                        backgroundColor: ["rgba(75, 192, 192, 0.5)"],
                        borderColor: ["rgba(75, 192, 192, 1)"],
                        borderWidth: 1,
                    },
                ],
                summary: {
                    topPerformer: "Dr. Sardor",
                    totalPatients: 305,
                    averagePerDoctor: 305,
                },
            },
        },
    }

    // Update report data when report type, date range or branch changes
    useEffect(() => {
        let data = null

        if (reportType === "financial") {
            data =
                selectedBranch === "all" || !financialData[selectedBranch]
                    ? financialData.all[dateRange]
                    : financialData[selectedBranch][dateRange]
        } else if (reportType === "patients") {
            data =
                selectedBranch === "all" || !patientsData[selectedBranch]
                    ? patientsData.all[dateRange]
                    : patientsData[selectedBranch][dateRange]
        } else if (reportType === "staff") {
            data =
                selectedBranch === "all" || !staffPerformanceData[selectedBranch]
                    ? staffPerformanceData.all[dateRange]
                    : staffPerformanceData[selectedBranch][dateRange]
        }

        setReportData(data)
    }, [reportType, dateRange, selectedBranch, language]) // Added language dependency to update when language changes

    // Handle report type change
    const handleReportTypeChange = (type) => {
        setReportType(type)
    }

    // Handle date range change
    const handleDateRangeChange = (e) => {
        setDateRange(e.target.value)
    }

    // Handle download report
    const handleDownload = () => {
        alert(t("download_report_function"))
    }

    // Handle withdrawal form change
    const handleWithdrawalChange = (e) => {
        const { name, value } = e.target
        setWithdrawalData({
            ...withdrawalData,
            [name]: value,
        })
    }

    // Handle withdrawal submit
    const handleWithdrawalSubmit = (e) => {
        e.preventDefault()

        // Add new withdrawal to history
        const newWithdrawal = {
            id: withdrawalHistoryData.length + 1,
            date: new Date().toISOString().split("T")[0],
            amount: Number.parseInt(withdrawalData.amount),
            reason: withdrawalData.reason,
            description: withdrawalData.description,
            branch: selectedBranch === "all" ? "branch1" : selectedBranch,
            year: new Date().getFullYear(),
            category: withdrawalData.reason.includes("salary") ? "salary" : withdrawalData.reason,
        }

        withdrawalHistoryData.unshift(newWithdrawal)

        // Reset form and close modal
        setWithdrawalData({
            amount: "",
            reason: "",
            description: "",
        })
        setShowWithdrawalModal(false)

        alert(t("withdrawal_success"))
    }

    // Filter withdrawal history
    const getFilteredWithdrawalHistory = () => {
        let filteredHistory = withdrawalHistoryData.filter((item) => item.year === historyYear)

        if (selectedBranch !== "all") {
            filteredHistory = filteredHistory.filter((item) => item.branch === selectedBranch)
        }

        if (searchTerm) {
            filteredHistory = filteredHistory.filter(
                (item) =>
                    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    withdrawalReasons
                        .find((reason) => reason.id === item.reason)
                        ?.name.toLowerCase()
                        .includes(searchTerm.toLowerCase()),
            )
        }

        if (filterCategory !== "all") {
            filteredHistory = filteredHistory.filter((item) => item.category === filterCategory)
        }

        if (filterAmount !== "all") {
            if (filterAmount === "high") {
                filteredHistory = filteredHistory.filter((item) => item.amount >= 2000000)
            } else if (filterAmount === "medium") {
                filteredHistory = filteredHistory.filter((item) => item.amount >= 1000000 && item.amount < 2000000)
            } else if (filterAmount === "low") {
                filteredHistory = filteredHistory.filter((item) => item.amount < 1000000)
            }
        }

        return filteredHistory
    }

    // Toggle filters
    const toggleFilters = () => {
        setShowFilters(!showFilters)
    }

    return (
        <div className="director-reports">
            <div className="page-header">
                <h1 className="page-title">{t("reports")}</h1>
                <div className="header-actions">
                    <button className="btn btn-outline btn-icon" onClick={() => setShowHistoryModal(true)}>
                        <FaHistory /> {t("history")}
                    </button>
                    <button className="btn btn-outline btn-icon" onClick={() => setShowWithdrawalModal(true)}>
                        <FaMoneyBillWave /> {t("withdraw_cash")}
                    </button>
                    <button className="btn btn-primary btn-icon" onClick={handleDownload}>
                        <FaDownload /> {t("download_report")}
                    </button>
                </div>
            </div>

            <div className="report-controls">
                <div className="report-types">
                    <button
                        className={`report-type-btn ${reportType === "financial" ? "active" : ""}`}
                        onClick={() => handleReportTypeChange("financial")}
                    >
                        <FaMoneyBillWave /> {t("financial")}
                    </button>
                    <button
                        className={`report-type-btn ${reportType === "patients" ? "active" : ""}`}
                        onClick={() => handleReportTypeChange("patients")}
                    >
                        <FaChartLine /> {t("patients")}
                    </button>
                    <button
                        className={`report-type-btn ${reportType === "staff" ? "active" : ""}`}
                        onClick={() => handleReportTypeChange("staff")}
                    >
                        <FaChartBar /> {t("staff")}
                    </button>
                </div>

                <div className="report-filters">
                    <div className="filter-group">
                        <label>
                            <FaCalendarAlt /> {t("period")}:
                        </label>
                        <select value={dateRange} onChange={handleDateRangeChange}>
                            <option value="month">{t("month")}</option>
                            <option value="quarter">{t("quarter")}</option>
                            <option value="year">{t("year")}</option>
                        </select>
                    </div>
                </div>
            </div>

            {reportData && (
                <div className="report-content">
                    {/* Financial Report */}
                    {reportType === "financial" && (
                        <>
                            <div className="dashboard-card chart-card">
                                <div className="card-header">
                                    <h2>
                                        <FaChartBar /> {t("financial_indicators")}
                                        {dateRange === "month" && ` (${t("month")})`}
                                        {dateRange === "quarter" && ` (${t("quarter")})`}
                                        {dateRange === "year" && ` (${t("year")})`}
                                    </h2>
                                </div>
                                <div className="chart-container">
                                    <Bar
                                        data={reportData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            scales: {
                                                y: {
                                                    beginAtZero: true,
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="stats-grid">
                                <div className="stat-card income">
                                    <FaMoneyBillWave className="stat-icon" />
                                    <div className="stat-value">{reportData.summary.totalIncome.toLocaleString()} {t("currency")}</div>
                                    <div className="stat-label">{t("total_income")}</div>
                                </div>

                                <div className="stat-card expense">
                                    <FaMoneyBillWave className="stat-icon" />
                                    <div className="stat-value">{reportData.summary.totalExpenses.toLocaleString()} {t("currency")}</div>
                                    <div className="stat-label">{t("total_expenses")}</div>
                                </div>

                                <div className="stat-card profit">
                                    <FaMoneyBillWave className="stat-icon" />
                                    <div className="stat-value">{reportData.summary.profit.toLocaleString()} {t("currency")}</div>
                                    <div className="stat-label">{t("net_profit")}</div>
                                </div>

                                <div className="stat-card">
                                    <FaChartPie className="stat-icon" />
                                    <div className="stat-value">{reportData.summary.profitMargin}%</div>
                                    <div className="stat-label">{t("profitability")}</div>
                                </div>
                            </div>

                            <div className="dashboard-card">
                                <div className="card-header">
                                    <h2>{t("financial_report_details")}</h2>
                                </div>
                                <div className="report-details">
                                    <p>
                                        <strong>{t("report_period")}:</strong> {dateRange === "month" && t("month")}{" "}
                                        {dateRange === "quarter" && t("quarter")} {dateRange === "year" && t("year")}
                                    </p>
                                    <p>
                                        <strong>{t("branch")}:</strong>{" "}
                                        {selectedBranch === "all"
                                            ? t("all_branches")
                                            : selectedBranch === "branch1"
                                                ? t("branch1")
                                                : selectedBranch === "branch2"
                                                    ? t("branch2")
                                                    : t("branch3")}
                                    </p>
                                    <p>
                                        <strong>{t("total_income")}:</strong> {reportData.summary.totalIncome.toLocaleString()} {t("currency")}
                                    </p>
                                    <p>
                                        <strong>{t("total_expenses")}:</strong> {reportData.summary.totalExpenses.toLocaleString()} {t("currency")}
                                    </p>
                                    <p>
                                        <strong>{t("net_profit")}:</strong> {reportData.summary.profit.toLocaleString()} {t("currency")}
                                    </p>
                                    <p>
                                        <strong>{t("profitability")}:</strong> {reportData.summary.profitMargin}%
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Patients Report */}
                    {reportType === "patients" && (
                        <>
                            <div className="dashboard-card chart-card">
                                <div className="card-header">
                                    <h2>
                                        <FaChartLine /> {t("patient_dynamics")}
                                        {dateRange === "month" && ` (${t("month")})`}
                                        {dateRange === "quarter" && ` (${t("quarter")})`}
                                        {dateRange === "year" && ` (${t("year")})`}
                                    </h2>
                                </div>
                                <div className="chart-container">
                                    <Line
                                        data={reportData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            scales: {
                                                y: {
                                                    beginAtZero: true,
                                                },
                                            },
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="stats-grid">
                                <div className="stat-card">
                                    <FaChartLine className="stat-icon" />
                                    <div className="stat-value">{reportData.summary.totalPatients}</div>
                                    <div className="stat-label">{t("total_patients")}</div>
                                </div>

                                <div className="stat-card">
                                    <FaChartBar className="stat-icon" />
                                    <div className="stat-value">
                                        {dateRange === "month" && reportData.summary.averagePerWeek}
                                        {dateRange === "quarter" && reportData.summary.averagePerMonth}
                                        {dateRange === "year" && reportData.summary.averagePerQuarter}
                                    </div>
                                    <div className="stat-label">
                                        {dateRange === "month" && t("average_weekly")}
                                        {dateRange === "quarter" && t("average_monthly")}
                                        {dateRange === "year" && t("average_quarterly")}
                                    </div>
                                </div>

                                <div className="stat-card">
                                    <FaChartPie className="stat-icon" />
                                    <div className="stat-value">{reportData.summary.growth}%</div>
                                    <div className="stat-label">{t("growth")}</div>
                                </div>
                            </div>

                            <div className="dashboard-card">
                                <div className="card-header">
                                    <h2>{t("patient_report_details")}</h2>
                                </div>
                                <div className="report-details">
                                    <p>
                                        <strong>{t("report_period")}:</strong> {dateRange === "month" && t("month")}{" "}
                                        {dateRange === "quarter" && t("quarter")} {dateRange === "year" && t("year")}
                                    </p>
                                    <p>
                                        <strong>{t("branch")}:</strong>{" "}
                                        {selectedBranch === "all"
                                            ? t("all_branches")
                                            : selectedBranch === "branch1"
                                                ? t("branch1")
                                                : selectedBranch === "branch2"
                                                    ? t("branch2")
                                                    : t("branch3")}
                                    </p>
                                    <p>
                                        <strong>{t("total_patients")}:</strong> {reportData.summary.totalPatients}
                                    </p>
                                    <p>
                                        <strong>
                                            {dateRange === "month" && t("average_weekly_patients")}
                                            {dateRange === "quarter" && t("average_monthly_patients")}
                                            {dateRange === "year" && t("average_quarterly_patients")}
                                        </strong>
                                        {dateRange === "month" && reportData.summary.averagePerWeek}
                                        {dateRange === "quarter" && reportData.summary.averagePerMonth}
                                        {dateRange === "year" && reportData.summary.averagePerQuarter}
                                    </p>
                                    <p>
                                        <strong>{t("growth")}:</strong> {reportData.summary.growth}%
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Staff Performance Report */}
                    {reportType === "staff" && (
                        <>
                            <div className="dashboard-card chart-card">
                                <div className="card-header">
                                    <h2>
                                        <FaChartPie /> {t("doctor_efficiency")}
                                        {dateRange === "month" && ` (${t("month")})`}
                                        {dateRange === "quarter" && ` (${t("quarter")})`}
                                        {dateRange === "year" && ` (${t("year")})`}
                                    </h2>
                                </div>
                                <div className="chart-container">
                                    <Pie
                                        data={reportData}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="stats-grid">
                                <div className="stat-card">
                                    <FaChartBar className="stat-icon" />
                                    <div className="stat-value">{reportData.summary.topPerformer}</div>
                                    <div className="stat-label">{t("top_performing_doctor")}</div>
                                </div>

                                <div className="stat-card">
                                    <FaChartLine className="stat-icon" />
                                    <div className="stat-value">{reportData.summary.totalPatients}</div>
                                    <div className="stat-label">{t("total_patients")}</div>
                                </div>

                                <div className="stat-card">
                                    <FaChartPie className="stat-icon" />
                                    <div className="stat-value">{reportData.summary.averagePerDoctor}</div>
                                    <div className="stat-label">{t("average_patients_per_doctor")}</div>
                                </div>
                            </div>

                            <div className="dashboard-card">
                                <div className="card-header">
                                    <h2>{t("staff_performance_report")}</h2>
                                </div>
                                <div className="report-details">
                                    <p>
                                        <strong>{t("report_period")}:</strong> {dateRange === "month" && t("month")}{" "}
                                        {dateRange === "quarter" && t("quarter")} {dateRange === "year" && t("year")}
                                    </p>
                                    <p>
                                        <strong>{t("branch")}:</strong>{" "}
                                        {selectedBranch === "all"
                                            ? t("all_branches")
                                            : selectedBranch === "branch1"
                                                ? t("branch1")
                                                : selectedBranch === "branch2"
                                                    ? t("branch2")
                                                    : t("branch3")}
                                    </p>
                                    <p>
                                        <strong>{t("top_performing_doctor")}:</strong> {reportData.summary.topPerformer}
                                    </p>
                                    <p>
                                        <strong>{t("total_patients")}:</strong> {reportData.summary.totalPatients}
                                    </p>
                                    <p>
                                        <strong>{t("average_patients_per_doctor")}:</strong> {reportData.summary.averagePerDoctor}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Withdrawal Modal */}
            {showWithdrawalModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2>{t("withdraw_cash")}</h2>
                            <button className="close-button" onClick={() => setShowWithdrawalModal(false)}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="modal-content">
                            <form onSubmit={handleWithdrawalSubmit}>
                                <div className="form-group">
                                    <label>{t("amount")} ({t("currency")})</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={withdrawalData.amount}
                                        onChange={handleWithdrawalChange}
                                        placeholder={t("enter_amount")}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>{t("reason")}</label>
                                    <select
                                        name="reason"
                                        value={withdrawalData.reason}
                                        onChange={handleWithdrawalChange}
                                        required
                                    >
                                        <option value="">{t("select_reason")}</option>
                                        {withdrawalReasons.map((reason) => (
                                            <option key={reason.id} value={reason.id}>
                                                {reason.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>{t("description")}</label>
                                    <textarea
                                        name="description"
                                        value={withdrawalData.description}
                                        onChange={handleWithdrawalChange}
                                        placeholder={t("enter_additional_description")}
                                        rows={3}
                                        required
                                    ></textarea>
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="btn btn-primary">
                                        {t("confirm")}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowWithdrawalModal(false)}
                                    >
                                        {t("cancel")}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* History Modal */}
            {showHistoryModal && (
                <div className="modal-overlay">
                    <div className="modal-container history-modal">
                        <div className="modal-header">
                            <h2>{t("expense_history")}</h2>
                            <button className="close-button" onClick={() => setShowHistoryModal(false)}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="history-controls">
                                <div className="year-selector">
                                    <button
                                        className="btn btn-icon year-nav"
                                        onClick={() => setHistoryYear(historyYear - 1)}
                                        disabled={historyYear <= 2019}
                                    >
                                        <FaArrowLeft />
                                    </button>
                                    <span className="year-display">{historyYear}</span>
                                    <button
                                        className="btn btn-icon year-nav"
                                        onClick={() => setHistoryYear(historyYear + 1)}
                                        disabled={historyYear >= new Date().getFullYear()}
                                    >
                                        <FaArrowRight />
                                    </button>
                                </div>

                                <div className="search-filter">
                                    <div className="search-input">
                                        <FaSearch className="search-icon" />
                                        <input
                                            type="text"
                                            placeholder={t("search")}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        className={`filter-toggle-btn ${showFilters ? "active" : ""}`}
                                        onClick={toggleFilters}
                                    >
                                        <FaFilter /> {t("filters")}
                                    </button>
                                </div>

                                {showFilters && (
                                    <div className="history-filters">
                                        <div className="filter-group">
                                            <label>{t("category")}:</label>
                                            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                                                <option value="all">{t("all")}</option>
                                                <option value="salary">{t("salary")}</option>
                                                <option value="utilities">{t("utilities")}</option>
                                                <option value="rent">{t("rent")}</option>
                                                <option value="supplies">{t("supplies")}</option>
                                                <option value="medicine">{t("medicine")}</option>
                                                <option value="repairs">{t("repairs")}</option>
                                                <option value="marketing">{t("marketing")}</option>
                                                <option value="taxes">{t("taxes")}</option>
                                                <option value="other">{t("other")}</option>
                                            </select>
                                        </div>

                                        <div className="filter-group">
                                            <label>{t("amount")}:</label>
                                            <select value={filterAmount} onChange={(e) => setFilterAmount(e.target.value)}>
                                                <option value="all">{t("all")}</option>
                                                <option value="high">Yuqori {"(> 2,000,000)"}</option>
                                                <option value="medium">O'rta (1,000,000 - 2,000,000)</option>
                                                <option value="low">Past {"(< 1,000,000)"}</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="history-table-container">
                                <table className="history-table">
                                    <thead>
                                        <tr>
                                            <th>{t("date")}</th>
                                            <th>{t("amount")}</th>
                                            <th>{t("reason")}</th>
                                            <th>{t("description")}</th>
                                            {selectedBranch === "all" && <th>{t("branch")}</th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {getFilteredWithdrawalHistory().length > 0 ? (
                                            getFilteredWithdrawalHistory().map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.date}</td>
                                                    <td className="amount-cell">{item.amount.toLocaleString()} {t("currency")}</td>
                                                    <td>
                                                        {withdrawalReasons.find(reason => reason.id === item.reason)?.name || item.reason}
                                                    </td>
                                                    <td>{item.description}</td>
                                                    {selectedBranch === "all" && (
                                                        <td>
                                                            {item.branch === "branch1" && t("branch1")}
                                                            {item.branch === "branch2" && t("branch2")}
                                                            {item.branch === "branch3" && t("branch3")}
                                                        </td>
                                                    )}
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={selectedBranch === "all" ? 5 : 4} className="no-data">
                                                    {t("no_data_found")}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};