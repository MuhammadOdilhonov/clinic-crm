"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useLanguage } from "../../contexts/LanguageContext"
import {
    FaArrowLeft,
    FaUserMd,
    FaCalendarAlt,
    FaEnvelope,
    FaIdCard,
    FaUserInjured,
    FaNotesMedical,
    FaHistory,
    FaExclamationTriangle,
    FaMale,
    FaFemale,
    FaBirthdayCake,
    FaWeight,
    FaRulerVertical,
    FaHospital,
    FaClipboardList,
    FaTimes,
    FaBed,
    FaPills,
    FaCalendarCheck,
    FaStethoscope,
    FaHeartbeat,
    FaTemperatureHigh,
    FaLungs,
    FaChevronRight,
    FaUserNurse,
    FaClock,
    FaClipboard,
    FaCommentMedical,
    FaProcedures,
    FaCalendarDay,
    FaAngleDown,
    FaAngleUp,
    FaDoorOpen,
    FaDoorClosed,
} from "react-icons/fa"

const PatientDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const { t } = useLanguage()
    const [patient, setPatient] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [activeTab, setActiveTab] = useState("info")
    const [showModal, setShowModal] = useState(false)
    const [selectedDay, setSelectedDay] = useState(null)
    const [expandedHospitalization, setExpandedHospitalization] = useState(null)

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                setLoading(true)
                // In a real app, we would fetch from API
                // const data = await getPatientById(id)

                // For demo purposes, using mock data
                setTimeout(() => {
                    const mockPatient = {
                        id: Number.parseInt(id),
                        name: "Alisher Karimov",
                        age: 45,
                        gender: "male",
                        birthDate: "1978-05-15",
                        address: "Tashkent, Chilanzar 7-54",
                        phone: "+998 90 123 45 67",
                        email: "alisher@example.com",
                        bloodGroup: "A+",
                        height: "175 cm",
                        weight: "78 kg",
                        registrationDate: "2022-01-10",
                        lastVisit: "2023-05-15",
                        status: "active",
                        doctorId: 1,
                        doctorName: "Dr. Azimov",
                        appointments: [
                            {
                                id: 1,
                                date: "2023-05-15",
                                time: "10:30",
                                type: "Regular checkup",
                                doctorName: "Dr. Azimov",
                                status: "completed",
                                notes: "Blood pressure stable, medication continued",
                                diagnoses: [
                                    {
                                        id: 1,
                                        name: "Hypertension",
                                        description: "Stage 2 hypertension, requires regular monitoring",
                                        status: "active",
                                    },
                                ],
                            },
                            {
                                id: 3,
                                date: "2023-04-10",
                                time: "09:15",
                                type: "Blood test",
                                doctorName: "Dr. Karimova",
                                status: "completed",
                                notes: "Blood sugar levels slightly elevated",
                                diagnoses: [
                                    {
                                        id: 2,
                                        name: "Type 2 Diabetes",
                                        description: "Early stage, diet controlled",
                                        status: "active",
                                    },
                                ],
                            },
                        ],
                        hospitalizations: [
                            {
                                id: 1,
                                admissionDate: "2023-06-10",
                                dischargeDate: "2023-06-17",
                                department: "Cardiology",
                                roomNumber: "304",
                                bedNumber: "2",
                                doctor: "Dr. Azimov",
                                diagnosis: "Acute myocardial infarction",
                                status: "discharged",
                                dailyRecords: [
                                    {
                                        date: "2023-06-10",
                                        day: 1,
                                        vitalSigns: {
                                            temperature: "37.2°C",
                                            bloodPressure: "145/95 mmHg",
                                            heartRate: "88 bpm",
                                            respiratoryRate: "18/min",
                                            oxygenSaturation: "96%",
                                        },
                                        medications: [
                                            {
                                                name: "Aspirin",
                                                dosage: "100mg",
                                                frequency: "Once daily",
                                                time: "08:00",
                                                administeredBy: "Nurse Karimova",
                                            },
                                            {
                                                name: "Clopidogrel",
                                                dosage: "75mg",
                                                frequency: "Once daily",
                                                time: "08:00",
                                                administeredBy: "Nurse Karimova",
                                            },
                                            {
                                                name: "Atorvastatin",
                                                dosage: "40mg",
                                                frequency: "Once daily",
                                                time: "20:00",
                                                administeredBy: "Nurse Alimov",
                                            },
                                            {
                                                name: "Metoprolol",
                                                dosage: "25mg",
                                                frequency: "Twice daily",
                                                time: "08:00, 20:00",
                                                administeredBy: "Nurse Karimova, Nurse Alimov",
                                            },
                                        ],
                                        procedures: [
                                            {
                                                name: "ECG",
                                                time: "10:30",
                                                performedBy: "Nurse Karimova",
                                                result: "Sinus tachycardia, ST-segment elevation in leads V1-V4",
                                            },
                                            {
                                                name: "Blood Draw",
                                                time: "07:30",
                                                performedBy: "Nurse Karimova",
                                                result: "Samples sent to lab",
                                            },
                                        ],
                                        nurseNotes: [
                                            {
                                                time: "08:15",
                                                nurse: "Nurse Karimova",
                                                note: "Patient admitted to cardiology ward. Vital signs taken. Medications administered as prescribed.",
                                            },
                                            {
                                                time: "12:30",
                                                nurse: "Nurse Karimova",
                                                note: "Patient complaining of mild chest discomfort. Doctor notified. Extra pillow provided for comfort.",
                                            },
                                            {
                                                time: "16:45",
                                                nurse: "Nurse Alimov",
                                                note: "Patient feeling better after rest. Able to eat lunch. Encouraged to drink more fluids.",
                                            },
                                            {
                                                time: "20:15",
                                                nurse: "Nurse Alimov",
                                                note: "Evening medications administered. Patient stable and resting comfortably.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "11:00",
                                            doctor: "Dr. Azimov",
                                            notes:
                                                "Patient admitted with acute chest pain. ECG shows ST elevation MI. Started on dual antiplatelet therapy and statins. Will schedule for coronary angiography tomorrow.",
                                        },
                                    },
                                    {
                                        date: "2023-06-11",
                                        day: 2,
                                        vitalSigns: {
                                            temperature: "36.8°C",
                                            bloodPressure: "135/85 mmHg",
                                            heartRate: "82 bpm",
                                            respiratoryRate: "16/min",
                                            oxygenSaturation: "97%",
                                        },
                                        medications: [
                                            {
                                                name: "Aspirin",
                                                dosage: "100mg",
                                                frequency: "Once daily",
                                                time: "08:00",
                                                administeredBy: "Nurse Karimova",
                                            },
                                            {
                                                name: "Clopidogrel",
                                                dosage: "75mg",
                                                frequency: "Once daily",
                                                time: "08:00",
                                                administeredBy: "Nurse Karimova",
                                            },
                                            {
                                                name: "Atorvastatin",
                                                dosage: "40mg",
                                                frequency: "Once daily",
                                                time: "20:00",
                                                administeredBy: "Nurse Alimov",
                                            },
                                            {
                                                name: "Metoprolol",
                                                dosage: "25mg",
                                                frequency: "Twice daily",
                                                time: "08:00, 20:00",
                                                administeredBy: "Nurse Karimova, Nurse Alimov",
                                            },
                                        ],
                                        procedures: [
                                            {
                                                name: "Coronary Angiography",
                                                time: "14:00",
                                                performedBy: "Dr. Azimov",
                                                result: "90% blockage in left anterior descending artery. Stent placed successfully.",
                                            },
                                            {
                                                name: "Post-procedure ECG",
                                                time: "16:30",
                                                performedBy: "Nurse Alimov",
                                                result: "Improved ST segments compared to admission",
                                            },
                                        ],
                                        nurseNotes: [
                                            {
                                                time: "07:45",
                                                nurse: "Nurse Karimova",
                                                note: "Patient prepped for angiography. NPO since midnight. Morning medications given except for anticoagulants.",
                                            },
                                            {
                                                time: "15:30",
                                                nurse: "Nurse Alimov",
                                                note: "Patient returned from cath lab. Femoral access site clean and dry. Vital signs stable. Patient on bed rest for 6 hours.",
                                            },
                                            {
                                                time: "19:00",
                                                nurse: "Nurse Alimov",
                                                note: "Access site checked, no bleeding or hematoma. Patient able to eat dinner. Pain level 2/10.",
                                            },
                                            {
                                                time: "22:00",
                                                nurse: "Nurse Alimov",
                                                note: "Patient resting comfortably. Vital signs stable. Access site clean and dry.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "18:00",
                                            doctor: "Dr. Azimov",
                                            notes:
                                                "Successful PCI with stent placement in LAD. Patient tolerated procedure well. Continue current medications. Will start cardiac rehabilitation education tomorrow.",
                                        },
                                    },
                                    {
                                        date: "2023-06-12",
                                        day: 3,
                                        vitalSigns: {
                                            temperature: "36.7°C",
                                            bloodPressure: "130/80 mmHg",
                                            heartRate: "76 bpm",
                                            respiratoryRate: "16/min",
                                            oxygenSaturation: "98%",
                                        },
                                        medications: [
                                            {
                                                name: "Aspirin",
                                                dosage: "100mg",
                                                frequency: "Once daily",
                                                time: "08:00",
                                                administeredBy: "Nurse Karimova",
                                            },
                                            {
                                                name: "Clopidogrel",
                                                dosage: "75mg",
                                                frequency: "Once daily",
                                                time: "08:00",
                                                administeredBy: "Nurse Karimova",
                                            },
                                            {
                                                name: "Atorvastatin",
                                                dosage: "40mg",
                                                frequency: "Once daily",
                                                time: "20:00",
                                                administeredBy: "Nurse Alimov",
                                            },
                                            {
                                                name: "Metoprolol",
                                                dosage: "25mg",
                                                frequency: "Twice daily",
                                                time: "08:00, 20:00",
                                                administeredBy: "Nurse Karimova, Nurse Alimov",
                                            },
                                        ],
                                        procedures: [
                                            {
                                                name: "ECG",
                                                time: "10:00",
                                                performedBy: "Nurse Karimova",
                                                result: "Normal sinus rhythm, resolving ST changes",
                                            },
                                            {
                                                name: "Blood Draw",
                                                time: "07:30",
                                                performedBy: "Nurse Karimova",
                                                result: "Cardiac enzymes trending down",
                                            },
                                        ],
                                        nurseNotes: [
                                            {
                                                time: "08:30",
                                                nurse: "Nurse Karimova",
                                                note: "Patient reports feeling much better today. No chest pain. Ambulated to bathroom with assistance.",
                                            },
                                            {
                                                time: "11:15",
                                                nurse: "Nurse Karimova",
                                                note: "Cardiac rehabilitation specialist visited and provided education on activity progression.",
                                            },
                                            {
                                                time: "15:00",
                                                nurse: "Nurse Alimov",
                                                note: "Patient ambulated in hallway for 5 minutes with no complaints of pain or shortness of breath.",
                                            },
                                            {
                                                time: "20:30",
                                                nurse: "Nurse Alimov",
                                                note: "Evening medications administered. Patient watching TV and in good spirits.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "09:30",
                                            doctor: "Dr. Azimov",
                                            notes:
                                                "Patient recovering well post-PCI. No chest pain. Cardiac enzymes trending down. Continue current medications and start progressive ambulation.",
                                        },
                                    },
                                    {
                                        date: "2023-06-13",
                                        day: 4,
                                        vitalSigns: {
                                            temperature: "36.6°C",
                                            bloodPressure: "128/78 mmHg",
                                            heartRate: "72 bpm",
                                            respiratoryRate: "16/min",
                                            oxygenSaturation: "98%",
                                        },
                                        medications: [
                                            {
                                                name: "Aspirin",
                                                dosage: "100mg",
                                                frequency: "Once daily",
                                                time: "08:00",
                                                administeredBy: "Nurse Karimova",
                                            },
                                            {
                                                name: "Clopidogrel",
                                                dosage: "75mg",
                                                frequency: "Once daily",
                                                time: "08:00",
                                                administeredBy: "Nurse Karimova",
                                            },
                                            {
                                                name: "Atorvastatin",
                                                dosage: "40mg",
                                                frequency: "Once daily",
                                                time: "20:00",
                                                administeredBy: "Nurse Alimov",
                                            },
                                            {
                                                name: "Metoprolol",
                                                dosage: "25mg",
                                                frequency: "Twice daily",
                                                time: "08:00, 20:00",
                                                administeredBy: "Nurse Karimova, Nurse Alimov",
                                            },
                                        ],
                                        procedures: [
                                            {
                                                name: "Echocardiogram",
                                                time: "11:30",
                                                performedBy: "Dr. Karimova",
                                                result: "EF 50%, anterior wall hypokinesis, no pericardial effusion",
                                            },
                                        ],
                                        nurseNotes: [
                                            {
                                                time: "08:15",
                                                nurse: "Nurse Karimova",
                                                note: "Patient slept well overnight. Morning medications administered. Patient ambulated to bathroom independently.",
                                            },
                                            {
                                                time: "12:45",
                                                nurse: "Nurse Karimova",
                                                note: "Patient returned from echocardiogram. Ambulated in hallway for 10 minutes with no complaints.",
                                            },
                                            {
                                                time: "16:30",
                                                nurse: "Nurse Alimov",
                                                note: "Dietitian visited to provide education on heart-healthy diet. Patient engaged and asking questions.",
                                            },
                                            {
                                                time: "21:00",
                                                nurse: "Nurse Alimov",
                                                note: "Evening medications administered. Patient reading and comfortable.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "15:00",
                                            doctor: "Dr. Azimov",
                                            notes:
                                                "Patient continues to improve. Echo shows preserved EF with some anterior wall hypokinesis. Continue current medications. Planning for discharge in 2-3 days if progress continues.",
                                        },
                                    },
                                    {
                                        date: "2023-06-14",
                                        day: 5,
                                        vitalSigns: {
                                            temperature: "36.5°C",
                                            bloodPressure: "125/75 mmHg",
                                            heartRate: "70 bpm",
                                            respiratoryRate: "16/min",
                                            oxygenSaturation: "99%",
                                        },
                                        medications: [
                                            {
                                                name: "Aspirin",
                                                dosage: "100mg",
                                                frequency: "Once daily",
                                                time: "08:00",
                                                administeredBy: "Nurse Karimova",
                                            },
                                            {
                                                name: "Clopidogrel",
                                                dosage: "75mg",
                                                frequency: "Once daily",
                                                time: "08:00",
                                                administeredBy: "Nurse Karimova",
                                            },
                                            {
                                                name: "Atorvastatin",
                                                dosage: "40mg",
                                                frequency: "Once daily",
                                                time: "20:00",
                                                administeredBy: "Nurse Alimov",
                                            },
                                            {
                                                name: "Metoprolol",
                                                dosage: "25mg",
                                                frequency: "Twice daily",
                                                time: "08:00, 20:00",
                                                administeredBy: "Nurse Karimova, Nurse Alimov",
                                            },
                                        ],
                                        procedures: [],
                                        nurseNotes: [
                                            {
                                                time: "08:30",
                                                nurse: "Nurse Karimova",
                                                note: "Patient in good spirits this morning. Vital signs stable. Morning medications administered.",
                                            },
                                            {
                                                time: "11:00",
                                                nurse: "Nurse Karimova",
                                                note: "Patient ambulated in hallway for 15 minutes. No shortness of breath or chest pain.",
                                            },
                                            {
                                                time: "14:30",
                                                nurse: "Nurse Alimov",
                                                note: "Pharmacist visited to provide medication education. Patient understands medication regimen.",
                                            },
                                            {
                                                time: "19:45",
                                                nurse: "Nurse Alimov",
                                                note: "Evening medications administered. Patient had dinner with family who visited.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "10:00",
                                            doctor: "Dr. Azimov",
                                            notes:
                                                "Patient doing well. All labs within normal limits. Planning for discharge tomorrow. Prescriptions prepared and discharge instructions reviewed.",
                                        },
                                    },
                                    {
                                        date: "2023-06-15",
                                        day: 6,
                                        vitalSigns: {
                                            temperature: "36.5°C",
                                            bloodPressure: "120/70 mmHg",
                                            heartRate: "68 bpm",
                                            respiratoryRate: "16/min",
                                            oxygenSaturation: "99%",
                                        },
                                        medications: [
                                            {
                                                name: "Aspirin",
                                                dosage: "100mg",
                                                frequency: "Once daily",
                                                time: "08:00",
                                                administeredBy: "Nurse Karimova",
                                            },
                                            {
                                                name: "Clopidogrel",
                                                dosage: "75mg",
                                                frequency: "Once daily",
                                                time: "08:00",
                                                administeredBy: "Nurse Karimova",
                                            },
                                            {
                                                name: "Atorvastatin",
                                                dosage: "40mg",
                                                frequency: "Once daily",
                                                time: "20:00",
                                                administeredBy: "Nurse Alimov",
                                            },
                                            {
                                                name: "Metoprolol",
                                                dosage: "25mg",
                                                frequency: "Twice daily",
                                                time: "08:00, 20:00",
                                                administeredBy: "Nurse Karimova, Nurse Alimov",
                                            },
                                        ],
                                        procedures: [
                                            {
                                                name: "ECG",
                                                time: "09:00",
                                                performedBy: "Nurse Karimova",
                                                result: "Normal sinus rhythm, no acute changes",
                                            },
                                        ],
                                        nurseNotes: [
                                            {
                                                time: "08:15",
                                                nurse: "Nurse Karimova",
                                                note: "Patient slept well. Morning medications administered. Vital signs stable.",
                                            },
                                            {
                                                time: "10:30",
                                                nurse: "Nurse Karimova",
                                                note: "Discharge planning in progress. Patient educated on home medication regimen.",
                                            },
                                            {
                                                time: "14:00",
                                                nurse: "Nurse Alimov",
                                                note: "Patient ambulated in hallway for 20 minutes without difficulty.",
                                            },
                                            {
                                                time: "18:30",
                                                nurse: "Nurse Alimov",
                                                note: "Evening medications administered. Patient preparing for discharge tomorrow.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "11:30",
                                            doctor: "Dr. Azimov",
                                            notes:
                                                "Patient ready for discharge tomorrow. Reviewed discharge medications and follow-up plan. Patient to follow up in clinic in 1 week.",
                                        },
                                    },
                                    {
                                        date: "2023-06-16",
                                        day: 7,
                                        vitalSigns: {
                                            temperature: "36.6°C",
                                            bloodPressure: "118/72 mmHg",
                                            heartRate: "65 bpm",
                                            respiratoryRate: "16/min",
                                            oxygenSaturation: "99%",
                                        },
                                        medications: [
                                            {
                                                name: "Aspirin",
                                                dosage: "100mg",
                                                frequency: "Once daily",
                                                time: "08:00",
                                                administeredBy: "Nurse Karimova",
                                            },
                                            {
                                                name: "Clopidogrel",
                                                dosage: "75mg",
                                                frequency: "Once daily",
                                                time: "08:00",
                                                administeredBy: "Nurse Karimova",
                                            },
                                        ],
                                        procedures: [],
                                        nurseNotes: [
                                            {
                                                time: "08:00",
                                                nurse: "Nurse Karimova",
                                                note: "Patient ready for discharge. Morning medications administered. Vital signs stable.",
                                            },
                                            {
                                                time: "09:30",
                                                nurse: "Nurse Karimova",
                                                note: "Discharge instructions reviewed with patient and family. Patient verbalized understanding.",
                                            },
                                            {
                                                time: "11:00",
                                                nurse: "Nurse Karimova",
                                                note: "Patient discharged home with family. Prescriptions provided. Follow-up appointment scheduled.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "09:00",
                                            doctor: "Dr. Azimov",
                                            notes:
                                                "Final discharge examination completed. Patient stable and ready for discharge. Follow-up in clinic in 1 week. Continue current medications.",
                                        },
                                    },
                                ],
                            },
                            {
                                id: 2,
                                admissionDate: "2023-08-05",
                                dischargeDate: "2023-08-10",
                                department: "Pulmonology",
                                roomNumber: "205",
                                bedNumber: "3",
                                doctor: "Dr. Rahimov",
                                diagnosis: "Pneumonia",
                                status: "discharged",
                                dailyRecords: [
                                    {
                                        date: "2023-08-05",
                                        day: 1,
                                        vitalSigns: {
                                            temperature: "38.5°C",
                                            bloodPressure: "130/85 mmHg",
                                            heartRate: "95 bpm",
                                            respiratoryRate: "22/min",
                                            oxygenSaturation: "94%",
                                        },
                                        medications: [
                                            {
                                                name: "Ceftriaxone",
                                                dosage: "1g",
                                                frequency: "Twice daily",
                                                time: "08:00, 20:00",
                                                administeredBy: "Nurse Ismoilova",
                                            },
                                            {
                                                name: "Azithromycin",
                                                dosage: "500mg",
                                                frequency: "Once daily",
                                                time: "09:00",
                                                administeredBy: "Nurse Ismoilova",
                                            },
                                            {
                                                name: "Paracetamol",
                                                dosage: "1000mg",
                                                frequency: "As needed for fever",
                                                time: "14:00, 22:00",
                                                administeredBy: "Nurse Ismoilova, Nurse Yusupov",
                                            },
                                        ],
                                        procedures: [
                                            {
                                                name: "Chest X-ray",
                                                time: "10:30",
                                                performedBy: "Radiology Technician",
                                                result: "Right lower lobe consolidation consistent with pneumonia",
                                            },
                                            {
                                                name: "Blood Draw",
                                                time: "08:30",
                                                performedBy: "Nurse Ismoilova",
                                                result: "Samples sent to lab for CBC, CMP, and blood cultures",
                                            },
                                        ],
                                        nurseNotes: [
                                            {
                                                time: "08:15",
                                                nurse: "Nurse Ismoilova",
                                                note: "Patient admitted with fever, cough, and shortness of breath. Vital signs taken. IV started. First dose of antibiotics administered.",
                                            },
                                            {
                                                time: "12:30",
                                                nurse: "Nurse Ismoilova",
                                                note: "Patient experiencing chills. Extra blanket provided. Encouraged deep breathing exercises.",
                                            },
                                            {
                                                time: "16:45",
                                                nurse: "Nurse Yusupov",
                                                note: "Patient's temperature increased to 39.0°C. Paracetamol administered. Increased IV fluid rate.",
                                            },
                                            {
                                                time: "20:15",
                                                nurse: "Nurse Yusupov",
                                                note: "Evening antibiotics administered. Patient reports feeling slightly better. Temperature down to 38.2°C.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "11:30",
                                            doctor: "Dr. Rahimov",
                                            notes:
                                                "Patient admitted with community-acquired pneumonia. Chest X-ray confirms right lower lobe consolidation. Started on IV antibiotics. Will monitor response over next 24-48 hours.",
                                        },
                                    },
                                    {
                                        date: "2023-08-06",
                                        day: 2,
                                        vitalSigns: {
                                            temperature: "38.0°C",
                                            bloodPressure: "128/82 mmHg",
                                            heartRate: "90 bpm",
                                            respiratoryRate: "20/min",
                                            oxygenSaturation: "95%",
                                        },
                                        medications: [
                                            {
                                                name: "Ceftriaxone",
                                                dosage: "1g",
                                                frequency: "Twice daily",
                                                time: "08:00, 20:00",
                                                administeredBy: "Nurse Ismoilova, Nurse Yusupov",
                                            },
                                            {
                                                name: "Azithromycin",
                                                dosage: "500mg",
                                                frequency: "Once daily",
                                                time: "09:00",
                                                administeredBy: "Nurse Ismoilova",
                                            },
                                            {
                                                name: "Paracetamol",
                                                dosage: "1000mg",
                                                frequency: "As needed for fever",
                                                time: "12:00, 20:00",
                                                administeredBy: "Nurse Ismoilova, Nurse Yusupov",
                                            },
                                        ],
                                        procedures: [],
                                        nurseNotes: [
                                            {
                                                time: "08:30",
                                                nurse: "Nurse Ismoilova",
                                                note: "Patient reports sleeping poorly due to coughing. Morning medications administered. Encouraged use of incentive spirometer.",
                                            },
                                            {
                                                time: "13:15",
                                                nurse: "Nurse Ismoilova",
                                                note: "Patient ambulated to bathroom with assistance. Productive cough with yellow sputum noted.",
                                            },
                                            {
                                                time: "17:00",
                                                nurse: "Nurse Yusupov",
                                                note: "Patient's temperature fluctuating between 37.8-38.2°C. Continuing to encourage fluids and deep breathing exercises.",
                                            },
                                            {
                                                time: "21:00",
                                                nurse: "Nurse Yusupov",
                                                note: "Evening antibiotics administered. Patient reports less shortness of breath. Oxygen saturation improved to 95%.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "10:00",
                                            doctor: "Dr. Rahimov",
                                            notes:
                                                "Patient showing slight improvement after 24 hours of antibiotics. Fever persists but respiratory rate improved. Continue current treatment plan.",
                                        },
                                    },
                                    {
                                        date: "2023-08-07",
                                        day: 3,
                                        vitalSigns: {
                                            temperature: "37.5°C",
                                            bloodPressure: "125/80 mmHg",
                                            heartRate: "85 bpm",
                                            respiratoryRate: "18/min",
                                            oxygenSaturation: "96%",
                                        },
                                        medications: [
                                            {
                                                name: "Ceftriaxone",
                                                dosage: "1g",
                                                frequency: "Twice daily",
                                                time: "08:00, 20:00",
                                                administeredBy: "Nurse Ismoilova, Nurse Yusupov",
                                            },
                                            {
                                                name: "Azithromycin",
                                                dosage: "500mg",
                                                frequency: "Once daily",
                                                time: "09:00",
                                                administeredBy: "Nurse Ismoilova",
                                            },
                                            {
                                                name: "Paracetamol",
                                                dosage: "1000mg",
                                                frequency: "As needed for fever",
                                                time: "16:00",
                                                administeredBy: "Nurse Yusupov",
                                            },
                                        ],
                                        procedures: [
                                            {
                                                name: "Blood Draw",
                                                time: "07:30",
                                                performedBy: "Nurse Ismoilova",
                                                result: "CBC shows improving WBC count",
                                            },
                                        ],
                                        nurseNotes: [
                                            {
                                                time: "08:15",
                                                nurse: "Nurse Ismoilova",
                                                note: "Patient reports feeling better this morning. Less coughing overnight. Morning medications administered.",
                                            },
                                            {
                                                time: "12:30",
                                                nurse: "Nurse Ismoilova",
                                                note: "Patient ambulated in hallway for short distance. Appetite improving.",
                                            },
                                            {
                                                time: "16:45",
                                                nurse: "Nurse Yusupov",
                                                note: "Temperature increased to 37.8°C in afternoon. Paracetamol administered.",
                                            },
                                            {
                                                time: "20:15",
                                                nurse: "Nurse Yusupov",
                                                note: "Evening antibiotics administered. Patient watching TV and in good spirits.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "11:00",
                                            doctor: "Dr. Rahimov",
                                            notes:
                                                "Patient showing good response to antibiotics. Fever decreasing, respiratory status improving. Continue current treatment plan.",
                                        },
                                    },
                                    {
                                        date: "2023-08-08",
                                        day: 4,
                                        vitalSigns: {
                                            temperature: "37.0°C",
                                            bloodPressure: "122/78 mmHg",
                                            heartRate: "78 bpm",
                                            respiratoryRate: "16/min",
                                            oxygenSaturation: "97%",
                                        },
                                        medications: [
                                            {
                                                name: "Ceftriaxone",
                                                dosage: "1g",
                                                frequency: "Twice daily",
                                                time: "08:00, 20:00",
                                                administeredBy: "Nurse Ismoilova, Nurse Yusupov",
                                            },
                                            {
                                                name: "Azithromycin",
                                                dosage: "500mg",
                                                frequency: "Once daily",
                                                time: "09:00",
                                                administeredBy: "Nurse Ismoilova",
                                            },
                                        ],
                                        procedures: [
                                            {
                                                name: "Chest X-ray",
                                                time: "11:30",
                                                performedBy: "Radiology Technician",
                                                result: "Improving right lower lobe consolidation compared to admission",
                                            },
                                        ],
                                        nurseNotes: [
                                            {
                                                time: "08:30",
                                                nurse: "Nurse Ismoilova",
                                                note: "Patient reports good night's sleep. Minimal coughing. Morning medications administered.",
                                            },
                                            {
                                                time: "13:15",
                                                nurse: "Nurse Ismoilova",
                                                note: "Patient returned from repeat chest X-ray. Ambulated to radiology department without difficulty.",
                                            },
                                            {
                                                time: "17:00",
                                                nurse: "Nurse Yusupov",
                                                note: "Patient afebrile throughout the day. Cough productive but decreased in frequency.",
                                            },
                                            {
                                                time: "21:00",
                                                nurse: "Nurse Yusupov",
                                                note: "Evening antibiotics administered. Patient reading and comfortable.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "14:00",
                                            doctor: "Dr. Rahimov",
                                            notes:
                                                "Repeat chest X-ray shows improvement. Patient afebrile for 24 hours. Plan to transition to oral antibiotics tomorrow if improvement continues.",
                                        },
                                    },
                                    {
                                        date: "2023-08-09",
                                        day: 5,
                                        vitalSigns: {
                                            temperature: "36.8°C",
                                            bloodPressure: "120/75 mmHg",
                                            heartRate: "75 bpm",
                                            respiratoryRate: "16/min",
                                            oxygenSaturation: "98%",
                                        },
                                        medications: [
                                            {
                                                name: "Amoxicillin-Clavulanate",
                                                dosage: "875/125mg",
                                                frequency: "Twice daily",
                                                time: "08:00, 20:00",
                                                administeredBy: "Nurse Ismoilova, Nurse Yusupov",
                                            },
                                            {
                                                name: "Azithromycin",
                                                dosage: "500mg",
                                                frequency: "Once daily",
                                                time: "09:00",
                                                administeredBy: "Nurse Ismoilova",
                                            },
                                        ],
                                        procedures: [],
                                        nurseNotes: [
                                            {
                                                time: "08:15",
                                                nurse: "Nurse Ismoilova",
                                                note: "Patient transitioned to oral antibiotics this morning. Tolerating well. Vital signs stable.",
                                            },
                                            {
                                                time: "12:30",
                                                nurse: "Nurse Ismoilova",
                                                note: "Patient ambulated in hallway for 15 minutes without shortness of breath.",
                                            },
                                            {
                                                time: "16:45",
                                                nurse: "Nurse Yusupov",
                                                note: "Patient educated on discharge medications and follow-up plan for tomorrow.",
                                            },
                                            {
                                                time: "20:15",
                                                nurse: "Nurse Yusupov",
                                                note: "Evening medications administered. Patient preparing for discharge tomorrow.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "10:00",
                                            doctor: "Dr. Rahimov",
                                            notes:
                                                "Patient continues to improve. Transitioned to oral antibiotics. Plan for discharge tomorrow if remains stable overnight.",
                                        },
                                    },
                                    {
                                        date: "2023-08-10",
                                        day: 6,
                                        vitalSigns: {
                                            temperature: "36.7°C",
                                            bloodPressure: "118/72 mmHg",
                                            heartRate: "72 bpm",
                                            respiratoryRate: "16/min",
                                            oxygenSaturation: "98%",
                                        },
                                        medications: [
                                            {
                                                name: "Amoxicillin-Clavulanate",
                                                dosage: "875/125mg",
                                                frequency: "Twice daily",
                                                time: "08:00",
                                                administeredBy: "Nurse Ismoilova",
                                            },
                                            {
                                                name: "Azithromycin",
                                                dosage: "500mg",
                                                frequency: "Once daily",
                                                time: "09:00",
                                                administeredBy: "Nurse Ismoilova",
                                            },
                                        ],
                                        procedures: [],
                                        nurseNotes: [
                                            {
                                                time: "08:00",
                                                nurse: "Nurse Ismoilova",
                                                note: "Patient ready for discharge. Morning medications administered. Vital signs stable.",
                                            },
                                            {
                                                time: "09:30",
                                                nurse: "Nurse Ismoilova",
                                                note: "Discharge instructions reviewed with patient. Prescriptions provided for 5 more days of antibiotics.",
                                            },
                                            {
                                                time: "11:00",
                                                nurse: "Nurse Ismoilova",
                                                note: "Patient discharged home. Follow-up appointment scheduled with Dr. Rahimov in 1 week.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "09:00",
                                            doctor: "Dr. Rahimov",
                                            notes:
                                                "Patient has responded well to treatment. Afebrile, normal respiratory rate and oxygen saturation. Discharged home on oral antibiotics for 5 more days. Follow-up in clinic in 1 week.",
                                        },
                                    },
                                ],
                            },
                            {
                                id: 3,
                                admissionDate: "2023-10-15",
                                dischargeDate: "2023-10-18",
                                department: "General Surgery",
                                roomNumber: "405",
                                bedNumber: "1",
                                doctor: "Dr. Karimova",
                                diagnosis: "Acute cholecystitis",
                                status: "discharged",
                                dailyRecords: [
                                    {
                                        date: "2023-10-15",
                                        day: 1,
                                        vitalSigns: {
                                            temperature: "38.2°C",
                                            bloodPressure: "140/90 mmHg",
                                            heartRate: "92 bpm",
                                            respiratoryRate: "18/min",
                                            oxygenSaturation: "97%",
                                        },
                                        medications: [
                                            {
                                                name: "Ceftriaxone",
                                                dosage: "1g",
                                                frequency: "Twice daily",
                                                time: "08:00, 20:00",
                                                administeredBy: "Nurse Alimov",
                                            },
                                            {
                                                name: "Metronidazole",
                                                dosage: "500mg",
                                                frequency: "Three times daily",
                                                time: "08:00, 16:00, 00:00",
                                                administeredBy: "Nurse Alimov, Nurse Tursunov",
                                            },
                                            {
                                                name: "Tramadol",
                                                dosage: "50mg",
                                                frequency: "Every 6 hours as needed for pain",
                                                time: "10:00, 16:00, 22:00",
                                                administeredBy: "Nurse Alimov, Nurse Tursunov",
                                            },
                                        ],
                                        procedures: [
                                            {
                                                name: "Abdominal Ultrasound",
                                                time: "10:30",
                                                performedBy: "Ultrasound Technician",
                                                result:
                                                    "Gallbladder wall thickening, pericholecystic fluid, and gallstones consistent with acute cholecystitis",
                                            },
                                            {
                                                name: "Blood Draw",
                                                time: "08:30",
                                                performedBy: "Nurse Alimov",
                                                result: "Elevated WBC count and liver enzymes",
                                            },
                                        ],
                                        nurseNotes: [
                                            {
                                                time: "08:15",
                                                nurse: "Nurse Alimov",
                                                note: "Patient admitted with severe right upper quadrant pain, nausea, and fever. IV started. First dose of antibiotics administered.",
                                            },
                                            {
                                                time: "12:30",
                                                nurse: "Nurse Alimov",
                                                note: "Patient reports pain level 8/10. Tramadol administered with minimal relief. Surgical consult requested.",
                                            },
                                            {
                                                time: "16:45",
                                                nurse: "Nurse Tursunov",
                                                note: "Patient NPO in preparation for possible surgery tomorrow. IV fluids continued.",
                                            },
                                            {
                                                time: "20:15",
                                                nurse: "Nurse Tursunov",
                                                note: "Evening antibiotics administered. Patient resting comfortably after pain medication.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "11:30",
                                            doctor: "Dr. Karimova",
                                            notes:
                                                "Patient with acute cholecystitis confirmed by ultrasound. Started on IV antibiotics. Plan for laparoscopic cholecystectomy tomorrow morning.",
                                        },
                                    },
                                    {
                                        date: "2023-10-16",
                                        day: 2,
                                        vitalSigns: {
                                            temperature: "37.5°C",
                                            bloodPressure: "135/85 mmHg",
                                            heartRate: "88 bpm",
                                            respiratoryRate: "18/min",
                                            oxygenSaturation: "98%",
                                        },
                                        medications: [
                                            {
                                                name: "Ceftriaxone",
                                                dosage: "1g",
                                                frequency: "Twice daily",
                                                time: "08:00, 20:00",
                                                administeredBy: "Nurse Alimov, Nurse Tursunov",
                                            },
                                            {
                                                name: "Metronidazole",
                                                dosage: "500mg",
                                                frequency: "Three times daily",
                                                time: "08:00, 16:00, 00:00",
                                                administeredBy: "Nurse Alimov, Nurse Tursunov",
                                            },
                                            {
                                                name: "Morphine",
                                                dosage: "4mg",
                                                frequency: "Every 4 hours as needed for pain",
                                                time: "14:00, 18:00, 22:00",
                                                administeredBy: "Nurse Tursunov",
                                            },
                                        ],
                                        procedures: [
                                            {
                                                name: "Laparoscopic Cholecystectomy",
                                                time: "09:30",
                                                performedBy: "Dr. Karimova",
                                                result: "Successful removal of inflamed gallbladder with multiple stones. No complications.",
                                            },
                                        ],
                                        nurseNotes: [
                                            {
                                                time: "07:00",
                                                nurse: "Nurse Alimov",
                                                note: "Patient prepped for surgery. Pre-operative antibiotics administered.",
                                            },
                                            {
                                                time: "12:30",
                                                nurse: "Nurse Alimov",
                                                note: "Patient returned from recovery room. Vital signs stable. Pain controlled with IV morphine.",
                                            },
                                            {
                                                time: "16:45",
                                                nurse: "Nurse Tursunov",
                                                note: "Patient awake and alert. Small amount of clear liquid tolerated. Incision sites clean and dry.",
                                            },
                                            {
                                                time: "20:15",
                                                nurse: "Nurse Tursunov",
                                                note: "Evening antibiotics administered. Patient reports pain level 4/10. Encouraged incentive spirometer use.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "17:30",
                                            doctor: "Dr. Karimova",
                                            notes:
                                                "Laparoscopic cholecystectomy performed successfully. Patient recovering well. Continue antibiotics and pain management. Advance diet as tolerated.",
                                        },
                                    },
                                    {
                                        date: "2023-10-17",
                                        day: 3,
                                        vitalSigns: {
                                            temperature: "37.0°C",
                                            bloodPressure: "130/80 mmHg",
                                            heartRate: "80 bpm",
                                            respiratoryRate: "16/min",
                                            oxygenSaturation: "98%",
                                        },
                                        medications: [
                                            {
                                                name: "Ceftriaxone",
                                                dosage: "1g",
                                                frequency: "Twice daily",
                                                time: "08:00, 20:00",
                                                administeredBy: "Nurse Alimov, Nurse Tursunov",
                                            },
                                            {
                                                name: "Metronidazole",
                                                dosage: "500mg",
                                                frequency: "Three times daily",
                                                time: "08:00, 16:00, 00:00",
                                                administeredBy: "Nurse Alimov, Nurse Tursunov",
                                            },
                                            {
                                                name: "Tramadol",
                                                dosage: "50mg",
                                                frequency: "Every 6 hours as needed for pain",
                                                time: "10:00, 16:00, 22:00",
                                                administeredBy: "Nurse Alimov, Nurse Tursunov",
                                            },
                                        ],
                                        procedures: [],
                                        nurseNotes: [
                                            {
                                                time: "08:15",
                                                nurse: "Nurse Alimov",
                                                note: "Patient reports good night's sleep. Pain well controlled. Morning medications administered.",
                                            },
                                            {
                                                time: "12:30",
                                                nurse: "Nurse Alimov",
                                                note: "Patient ambulated in hallway. Tolerating regular diet. Incision sites clean and dry.",
                                            },
                                            {
                                                time: "16:45",
                                                nurse: "Nurse Tursunov",
                                                note: "Patient reports pain level 3/10. Switched to oral pain medication. Continues to ambulate without difficulty.",
                                            },
                                            {
                                                time: "20:15",
                                                nurse: "Nurse Tursunov",
                                                note: "Evening antibiotics administered. Patient watching TV and in good spirits.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "10:00",
                                            doctor: "Dr. Karimova",
                                            notes:
                                                "Patient recovering well post-cholecystectomy. Afebrile, tolerating diet, pain controlled. Plan for discharge tomorrow if continues to improve.",
                                        },
                                    },
                                    {
                                        date: "2023-10-18",
                                        day: 4,
                                        vitalSigns: {
                                            temperature: "36.8°C",
                                            bloodPressure: "125/75 mmHg",
                                            heartRate: "75 bpm",
                                            respiratoryRate: "16/min",
                                            oxygenSaturation: "99%",
                                        },
                                        medications: [
                                            {
                                                name: "Cefuroxime",
                                                dosage: "500mg",
                                                frequency: "Twice daily",
                                                time: "08:00",
                                                administeredBy: "Nurse Alimov",
                                            },
                                            {
                                                name: "Tramadol",
                                                dosage: "50mg",
                                                frequency: "Every 6 hours as needed for pain",
                                                time: "10:00",
                                                administeredBy: "Nurse Alimov",
                                            },
                                        ],
                                        procedures: [],
                                        nurseNotes: [
                                            {
                                                time: "08:00",
                                                nurse: "Nurse Alimov",
                                                note: "Patient ready for discharge. Morning medications administered. Vital signs stable.",
                                            },
                                            {
                                                time: "09:30",
                                                nurse: "Nurse Alimov",
                                                note: "Discharge instructions reviewed with patient. Wound care and activity restrictions explained.",
                                            },
                                            {
                                                time: "11:00",
                                                nurse: "Nurse Alimov",
                                                note: "Patient discharged home with family. Prescriptions provided for oral antibiotics and pain medication.",
                                            },
                                        ],
                                        doctorVisit: {
                                            time: "09:00",
                                            doctor: "Dr. Karimova",
                                            notes:
                                                "Patient has recovered well from laparoscopic cholecystectomy. Incisions healing appropriately. Discharged home with oral antibiotics for 5 more days. Follow-up in clinic in 2 weeks.",
                                        },
                                    },
                                ],
                            },
                        ],
                        medicalHistory: [
                            {
                                id: 1,
                                date: "2020-05-10",
                                condition: "Appendectomy",
                                description: "Surgical removal of appendix",
                                hospital: "Tashkent Medical Center",
                            },
                            {
                                id: 2,
                                date: "2018-11-15",
                                condition: "Pneumonia",
                                description: "Treated with antibiotics",
                                hospital: "City Hospital No. 1",
                            },
                        ],
                    }

                    setPatient(mockPatient)
                    setLoading(false)
                }, 800)
            } catch (err) {
                setError(err.message || "An error occurred while fetching patient data")
                setLoading(false)
            }
        }

        fetchPatientData()
    }, [id])

    // Check if nurse has access to this patient
    const hasAccess = () => {
        if (!patient) return false

        // Admin and Director have access to all patients
        if (user.role === "admin" || user.role === "director") return true

        // Doctor has access to their own patients
        if (user.role === "doctor") return user.id === patient.doctorId

        // Nurse has access to patients of the doctor they are assigned to
        if (user.role === "nurse") return user.assignedDoctorId === patient.doctorId

        return false
    }

    const handleBack = () => {
        navigate(-1)
    }

    const handleDayClick = (day) => {
        setSelectedDay(day)
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
        setSelectedDay(null)
    }

    const toggleHospitalization = (id) => {
        if (expandedHospitalization === id) {
            setExpandedHospitalization(null)
        } else {
            setExpandedHospitalization(id)
        }
    }

    const calculateDays = (admissionDate, dischargeDate) => {
        const start = new Date(admissionDate)
        const end = new Date(dischargeDate)
        const diffTime = Math.abs(end - start)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays
    }

    if (loading) {
        return (
            <div className="patient-details-loading">
                <div className="loading-spinner"></div>
                <p>{t("loading_patient_data")}...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="patient-details-error">
                <FaExclamationTriangle />
                <h2>{t("error_occurred")}</h2>
                <p>{error}</p>
                <button onClick={handleBack} className="btn-back">
                    <FaArrowLeft /> {t("go_back")}
                </button>
            </div>
        )
    }

    if (!patient) {
        return (
            <div className="patient-details-error">
                <FaExclamationTriangle />
                <h2>{t("patient_not_found")}</h2>
                <button onClick={handleBack} className="btn-back">
                    <FaArrowLeft /> {t("go_back")}
                </button>
            </div>
        )
    }

    if (!hasAccess()) {
        return (
            <div className="patient-details-error">
                <FaExclamationTriangle />
                <h2>{t("access_denied")}</h2>
                <p>{t("no_permission_view_patient")}</p>
                <button onClick={handleBack} className="btn-back">
                    <FaArrowLeft /> {t("go_back")}
                </button>
            </div>
        )
    }

    // Filter appointments to show only completed ones
    const completedAppointments = patient.appointments.filter((appointment) => appointment.status === "completed")

    return (
        <div className="patient-details-container">
            <div className="patient-details-header">
                <button onClick={handleBack} className="btn-back">
                    <FaArrowLeft /> {t("go_back")}
                </button>
                <h1>{t("patient_details")}</h1>
            </div>

            <div className="patient-details-content">
                <div className="patient-profile-section">
                    <div className="patient-profile-card">
                        <div className="patient-avatar">
                            {patient.gender === "male" ? (
                                <div className="avatar male">
                                    <FaMale />
                                </div>
                            ) : (
                                <div className="avatar female">
                                    <FaFemale />
                                </div>
                            )}
                        </div>
                        <div className="patient-basic-info">
                            <h2>{patient.name}</h2>
                            <div className="patient-id">
                                <FaIdCard /> {t("patient_id")}: {patient.id}
                            </div>
                            <div className="patient-status">
                                <span className={`status-badge ${patient.status}`}>{t(patient.status)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="patient-quick-info">
                        <div className="info-card">
                            <div className="info-icon">
                                <FaUserMd />
                            </div>
                            <div className="info-content">
                                <div className="info-label">{t("doctor")}</div>
                                <div className="info-value">{patient.doctorName}</div>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">
                                <FaCalendarAlt />
                            </div>
                            <div className="info-content">
                                <div className="info-label">{t("last_visit")}</div>
                                <div className="info-value">{patient.lastVisit}</div>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">
                                <FaBirthdayCake />
                            </div>
                            <div className="info-content">
                                <div className="info-label">{t("age")}</div>
                                <div className="info-value">
                                    {patient.age} {t("years")}
                                </div>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">
                                <FaRulerVertical />
                            </div>
                            <div className="info-content">
                                <div className="info-label">{t("height")}</div>
                                <div className="info-value">{patient.height}</div>
                            </div>
                        </div>
                        <div className="info-card">
                            <div className="info-icon">
                                <FaWeight />
                            </div>
                            <div className="info-content">
                                <div className="info-label">{t("weight")}</div>
                                <div className="info-value">{patient.weight}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="patient-tabs">
                    <button className={activeTab === "info" ? "active" : ""} onClick={() => setActiveTab("info")}>
                        <FaUserInjured /> {t("personal_info")}
                    </button>
                    <button className={activeTab === "appointments" ? "active" : ""} onClick={() => setActiveTab("appointments")}>
                        <FaCalendarAlt /> {t("appointments")}
                    </button>
                    <button
                        className={activeTab === "hospitalization" ? "active" : ""}
                        onClick={() => setActiveTab("hospitalization")}
                    >
                        <FaBed /> {t("hospitalizations")}
                    </button>
                    <button className={activeTab === "history" ? "active" : ""} onClick={() => setActiveTab("history")}>
                        <FaHistory /> {t("medical_history")}
                    </button>
                </div>

                <div className="patient-tab-content">
                    {activeTab === "info" && (
                        <div className="patient-info-tab">
                            <div className="info-section">
                                <h3>
                                    <FaUserInjured /> {t("personal_information")}
                                </h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <div className="info-label">{t("full_name")}</div>
                                        <div className="info-value">{patient.name}</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">{t("gender")}</div>
                                        <div className="info-value">{t(patient.gender)}</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">{t("birth_date")}</div>
                                        <div className="info-value">{patient.birthDate}</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">{t("blood_group")}</div>
                                        <div className="info-value">{patient.bloodGroup}</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">{t("registration_date")}</div>
                                        <div className="info-value">{patient.registrationDate}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="info-section">
                                <h3>
                                    <FaEnvelope /> {t("contact_information")}
                                </h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <div className="info-label">{t("phone")}</div>
                                        <div className="info-value">{patient.phone}</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">{t("email")}</div>
                                        <div className="info-value">{patient.email}</div>
                                    </div>
                                    <div className="info-item">
                                        <div className="info-label">{t("address")}</div>
                                        <div className="info-value">{patient.address}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "appointments" && (
                        <div className="patient-appointments-tab">
                            <div className="appointments-header">
                                <h3>
                                    <FaCalendarCheck /> {t("appointments")}
                                </h3>
                            </div>

                            <div className="appointments-list">
                                {completedAppointments && completedAppointments.length > 0 ? (
                                    completedAppointments.map((appointment) => (
                                        <div
                                            key={appointment.id}
                                            className="appointment-card"
                                            onClick={() => window.open(`/appointment-details/${appointment.id}`, '_blank')}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <div className="appointment-header">
                                                <div className="appointment-date-time">
                                                    <div className="appointment-date">
                                                        <FaCalendarAlt /> {appointment.date}
                                                    </div>
                                                    <div className="appointment-time">{appointment.time}</div>
                                                </div>
                                                <span className="status-badge completed">{t("completed")}</span>
                                            </div>
                                            <div className="appointment-details">
                                                <div className="appointment-type">
                                                    <strong>{t("type")}:</strong> {appointment.type}
                                                </div>
                                                <div className="appointment-doctor">
                                                    <strong>{t("doctor")}:</strong> {appointment.doctorName}
                                                </div>
                                            </div>
                                            {appointment.notes && (
                                                <div className="appointment-notes">
                                                    <strong>{t("notes")}:</strong> {appointment.notes}
                                                </div>
                                            )}

                                            {appointment.diagnoses && appointment.diagnoses.length > 0 && (
                                                <div className="appointment-diagnoses">
                                                    <h4>
                                                        <FaNotesMedical /> {t("diagnoses")}
                                                    </h4>
                                                    {appointment.diagnoses.map((diagnosis) => (
                                                        <div key={diagnosis.id} className="diagnosis-item">
                                                            <div className="diagnosis-name">
                                                                <FaStethoscope /> {diagnosis.name}
                                                                <span className={`status-badge ${diagnosis.status}`}>{t(diagnosis.status)}</span>
                                                            </div>
                                                            <div className="diagnosis-description">{diagnosis.description}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-data">{t("no_completed_appointments_found")}</div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === "hospitalization" && (
                        <div className="patient-hospitalization-tab">
                            <div className="hospitalization-header">
                                <h3>
                                    <FaBed /> {t("hospitalizations")}
                                </h3>
                                <div className="hospitalization-count">
                                    {t("total_hospitalizations")}: {patient.hospitalizations.length}
                                </div>
                            </div>

                            {patient.hospitalizations && patient.hospitalizations.length > 0 ? (
                                <div className="hospitalizations-list">
                                    {patient.hospitalizations.map((hospitalization) => (
                                        <div key={hospitalization.id} className="hospitalization-card">
                                            <div
                                                className="hospitalization-summary"
                                                onClick={() => toggleHospitalization(hospitalization.id)}
                                            >
                                                <div className="hospitalization-main-info">
                                                    <div className="hospitalization-dates">
                                                        <div className="admission-date">
                                                            <FaDoorOpen className="icon" />
                                                            {hospitalization.admissionDate}
                                                        </div>
                                                        <div className="discharge-date">
                                                            <FaDoorClosed className="icon" />
                                                            {hospitalization.dischargeDate}
                                                        </div>
                                                    </div>
                                                    <div className="hospitalization-diagnosis">
                                                        <FaStethoscope className="icon" />
                                                        {hospitalization.diagnosis}
                                                    </div>
                                                </div>
                                                <div className="hospitalization-secondary-info">
                                                    <div className="department-info">
                                                        <FaHospital className="icon" />
                                                        {hospitalization.department}
                                                    </div>
                                                    <div className="doctor-info">
                                                        <FaUserMd className="icon" />
                                                        {hospitalization.doctor}
                                                    </div>
                                                    <div className="days-info">
                                                        <FaCalendarDay className="icon" />
                                                        {calculateDays(hospitalization.admissionDate, hospitalization.dischargeDate)} {t("days")}
                                                    </div>
                                                    <div className="toggle-icon">
                                                        {expandedHospitalization === hospitalization.id ? <FaAngleUp /> : <FaAngleDown />}
                                                    </div>
                                                </div>
                                            </div>

                                            {expandedHospitalization === hospitalization.id && (
                                                <div className="hospitalization-days">
                                                    <div className="days-header">
                                                        <h4>{t("daily_records")}</h4>
                                                    </div>
                                                    <div className="days-list">
                                                        {hospitalization.dailyRecords.map((day) => (
                                                            <div key={day.day} className="day-card" onClick={() => handleDayClick(day)}>
                                                                <div className="day-header">
                                                                    <div className="day-number">
                                                                        {t("day")} {day.day}
                                                                    </div>
                                                                    <div className="day-date">{day.date}</div>
                                                                </div>
                                                                <div className="day-summary">
                                                                    <div className="vital-signs">
                                                                        <div className="vital-sign">
                                                                            <FaHeartbeat className="icon" />
                                                                            <span>{day.vitalSigns.heartRate}</span>
                                                                        </div>
                                                                        <div className="vital-sign">
                                                                            <FaTemperatureHigh className="icon" />
                                                                            <span>{day.vitalSigns.temperature}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="medications-count">
                                                                        <FaPills className="icon" />
                                                                        <span>
                                                                            {day.medications.length} {t("medications")}
                                                                        </span>
                                                                    </div>
                                                                    <div className="procedures-count">
                                                                        <FaProcedures className="icon" />
                                                                        <span>
                                                                            {day.procedures.length} {t("procedures")}
                                                                        </span>
                                                                    </div>
                                                                    <div className="notes-count">
                                                                        <FaClipboardList className="icon" />
                                                                        <span>
                                                                            {day.nurseNotes.length} {t("nurse_notes")}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className="view-details">
                                                                    <span>{t("view_details")}</span>
                                                                    <FaChevronRight className="icon" />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="no-data">{t("no_hospitalization_records")}</div>
                            )}
                        </div>
                    )}

                    {activeTab === "history" && (
                        <div className="patient-history-tab">
                            <div className="history-header">
                                <h3>
                                    <FaHistory /> {t("medical_history")}
                                </h3>
                            </div>

                            <div className="medical-history-list">
                                <p>Bu bo`lim hali mavjud emas</p>
                                <p>Buni ustida ishlamoqdamiz</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showModal && selectedDay && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>
                                {t("day")} {selectedDay.day} - {selectedDay.date}
                            </h2>
                            <button className="close-button" onClick={closeModal}>
                                <FaTimes />
                            </button>
                        </div>
                        <div className="modal-content">
                            <div className="modal-section vital-signs-section">
                                <h3>
                                    <FaHeartbeat /> {t("vital_signs")}
                                </h3>
                                <div className="vital-signs-grid">
                                    <div className="vital-sign-item">
                                        <div className="vital-sign-icon">
                                            <FaTemperatureHigh />
                                        </div>
                                        <div className="vital-sign-details">
                                            <div className="vital-sign-label">{t("temperature")}</div>
                                            <div className="vital-sign-value">{selectedDay.vitalSigns.temperature}</div>
                                        </div>
                                    </div>
                                    <div className="vital-sign-item">
                                        <div className="vital-sign-icon">
                                            <FaHeartbeat />
                                        </div>
                                        <div className="vital-sign-details">
                                            <div className="vital-sign-label">{t("heart_rate")}</div>
                                            <div className="vital-sign-value">{selectedDay.vitalSigns.heartRate}</div>
                                        </div>
                                    </div>
                                    <div className="vital-sign-item">
                                        <div className="vital-sign-icon">
                                            <FaLungs />
                                        </div>
                                        <div className="vital-sign-details">
                                            <div className="vital-sign-label">{t("respiratory_rate")}</div>
                                            <div className="vital-sign-value">{selectedDay.vitalSigns.respiratoryRate}</div>
                                        </div>
                                    </div>
                                    <div className="vital-sign-item">
                                        <div className="vital-sign-icon">
                                            <FaStethoscope />
                                        </div>
                                        <div className="vital-sign-details">
                                            <div className="vital-sign-label">{t("blood_pressure")}</div>
                                            <div className="vital-sign-value">{selectedDay.vitalSigns.bloodPressure}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="modal-section medications-section">
                                <h3>
                                    <FaPills /> {t("medications")}
                                </h3>
                                <div className="medications-list">
                                    {selectedDay.medications.map((medication, index) => (
                                        <div key={index} className="medication-item">
                                            <div className="medication-header">
                                                <div className="medication-name">{medication.name}</div>
                                                <div className="medication-dosage">{medication.dosage}</div>
                                            </div>
                                            <div className="medication-details">
                                                <div className="medication-frequency">
                                                    <FaClock /> {medication.frequency}
                                                </div>
                                                <div className="medication-time">
                                                    <FaCalendarCheck /> {medication.time}
                                                </div>
                                                <div className="medication-nurse">
                                                    <FaUserNurse /> {medication.administeredBy}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="modal-section procedures-section">
                                <h3>
                                    <FaProcedures /> {t("procedures")}
                                </h3>
                                {selectedDay.procedures.length > 0 ? (
                                    <div className="procedures-list">
                                        {selectedDay.procedures.map((procedure, index) => (
                                            <div key={index} className="procedure-item">
                                                <div className="procedure-header">
                                                    <div className="procedure-name">{procedure.name}</div>
                                                    <div className="procedure-time">
                                                        <FaClock /> {procedure.time}
                                                    </div>
                                                </div>
                                                <div className="procedure-details">
                                                    <div className="procedure-performer">
                                                        <FaUserMd /> {procedure.performedBy}
                                                    </div>
                                                    <div className="procedure-result">
                                                        <FaClipboard /> {procedure.result}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="no-data">{t("no_procedures_today")}</div>
                                )}
                            </div>

                            <div className="modal-section nurse-notes-section">
                                <h3>
                                    <FaCommentMedical /> {t("nurse_notes")}
                                </h3>
                                <div className="nurse-notes-timeline">
                                    {selectedDay.nurseNotes.map((note, index) => (
                                        <div key={index} className="nurse-note-item">
                                            <div className="note-time">{note.time}</div>
                                            <div className="note-content">
                                                <div className="note-nurse">{note.nurse}</div>
                                                <div className="note-text">{note.note}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {selectedDay.doctorVisit && (
                                <div className="modal-section doctor-visit-section">
                                    <h3>
                                        <FaUserMd /> {t("doctor_visit")}
                                    </h3>
                                    <div className="doctor-visit-details">
                                        <div className="visit-header">
                                            <div className="visit-doctor">{selectedDay.doctorVisit.doctor}</div>
                                            <div className="visit-time">
                                                <FaClock /> {selectedDay.doctorVisit.time}
                                            </div>
                                        </div>
                                        <div className="visit-notes">
                                            <FaClipboardList /> {selectedDay.doctorVisit.notes}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PatientDetails

