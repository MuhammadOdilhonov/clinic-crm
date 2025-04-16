"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { useParams, useNavigate } from "react-router-dom"
import { OrbitControls, Html, useGLTF, useProgress } from "@react-three/drei"
import * as THREE from "three"
import { FaDownload, FaInfoCircle, FaSearchPlus } from "react-icons/fa"
import apiPatientDetailReception from "../../api/apiPatientDetailReception"

// Yuklash jarayonini ko'rsatish uchun komponent
const LoadingIndicator = () => {
    const { progress } = useProgress()
    const angle = progress * 50

    return (
        <Html center>
            <div className="loading-container">
                <div
                    className="circular-progress"
                    style={{
                        backgroundImage: `conic-gradient(#0077cc 0deg, #0077cc ${angle}deg, #e6e6e6 ${angle}deg, #e6e6e6 360deg)`
                    }}
                >
                    <div className="progress-value">{Math.round(progress)}%</div>
                </div>
                <p className="loading-text">3D model yuklanmoqda...</p>
            </div>
        </Html>
    )
}

// Kamera boshlang'ich ko'rinishi
const InitialCameraSetup = ({ modelType }) => {
    const { camera } = useThree()
    const initialSetupDone = useRef(false)

    useEffect(() => {
        if (!initialSetupDone.current) {
            if (modelType === "dental") {
                camera.position.set(0, 0.5, 1.5)
                camera.lookAt(new THREE.Vector3(0, 0, 0))
            } else {
                camera.position.set(0.24, 1.36, 2.11)
                camera.lookAt(new THREE.Vector3(0.03, 0.81, -0.2))
            }
            camera.updateProjectionMatrix()
            initialSetupDone.current = true
        }
    }, [camera, modelType])

    return null
}

// Zararlangan qismga fokuslanish animatsiyasi
const FocusOnAffectedParts = ({ modelScene, affectedParts, controlsRef, isAutoFocus }) => {
    const { camera } = useThree()
    const [focusTarget, setFocusTarget] = useState(null)
    const animationRef = useRef({ active: false, progress: 0 })
    const startPosition = useRef(new THREE.Vector3())
    const startTarget = useRef(new THREE.Vector3())

    useEffect(() => {
        if (modelScene && affectedParts.length > 0 && isAutoFocus) {
            const affectedMeshes = []
            let center = new THREE.Vector3()

            modelScene.traverse((child) => {
                if (child.isMesh) {
                    const isAffected = affectedParts.some(
                        affectedPart => child.name.includes(affectedPart.originalName)
                    )
                    if (isAffected) {
                        affectedMeshes.push(child)
                        const boundingBox = new THREE.Box3().setFromObject(child)
                        const meshCenter = new THREE.Vector3()
                        boundingBox.getCenter(meshCenter)
                        center.add(meshCenter)
                    }
                }
            })

            if (affectedMeshes.length > 0) {
                center.divideScalar(affectedMeshes.length)
                setFocusTarget(center)
                startPosition.current.copy(camera.position)
                if (controlsRef.current) {
                    startTarget.current.copy(controlsRef.current.target)
                }
                animationRef.current = { active: true, progress: 0 }
            }
        }
    }, [modelScene, affectedParts, camera, controlsRef, isAutoFocus])

    useFrame(() => {
        if (animationRef.current.active && focusTarget && controlsRef.current) {
            animationRef.current.progress += 0.01
            if (animationRef.current.progress >= 1) {
                animationRef.current.active = false
                return
            }
            const eased = easeOutCubic(animationRef.current.progress)
            const targetPosition = focusTarget.clone().add(new THREE.Vector3(0, 0.1, 0.6))
            camera.position.lerpVectors(startPosition.current, targetPosition, eased)
            controlsRef.current.target.lerpVectors(startTarget.current, focusTarget, eased)
            controlsRef.current.update()
        }
    })

    const easeOutCubic = (x) => {
        return 1 - Math.pow(1 - x, 3)
    }

    return null
}

// Model komponenti
const Model = ({ gender, affectedParts, onPartsLoaded, modelType, onModelLoaded, isAutoFocus, controlsRef }) => {
    let modelPath = "/models/male_anatomy.glb"
    if (modelType === "dental") {
        modelPath = "/models/male_anatomy.glb"
    } else if (gender === "female") {
        modelPath = "/models/female_anatomy.glb"
    }

    const { scene } = useGLTF(modelPath)

    useEffect(() => {
        const parts = []
        scene.traverse((child) => {
            if (child.isMesh) {
                if (!child.name || child.name === "") {
                    child.name = `part-${parts.length}`
                }
                if (!child.material) {
                    child.material = new THREE.MeshStandardMaterial({ color: "white" })
                }
                if (!child.userData.originalMaterial) {
                    child.userData.originalMaterial = child.material.clone()
                }
                child.castShadow = true
                child.receiveShadow = true
                parts.push({ name: child.name, mesh: child })
            }
        })

        parts.forEach((part) => {
            if (part.mesh) {
                const isAffected = affectedParts.some(
                    affectedPart => part.name.includes(affectedPart.originalName)
                )
                if (isAffected) {
                    const highlightMaterial = new THREE.MeshStandardMaterial({
                        color: new THREE.Color("yellow"),
                        emissive: new THREE.Color("yellow"),
                        emissiveIntensity: 0.5,
                    })
                    part.mesh.material = highlightMaterial
                } else {
                    part.mesh.material = part.mesh.userData.originalMaterial.clone()
                }
            }
        })

        if (onPartsLoaded) {
            onPartsLoaded(parts)
        }
        if (onModelLoaded) {
            onModelLoaded(scene)
        }

        return () => {
            parts.forEach((part) => {
                if (part.mesh && part.mesh.userData.originalMaterial) {
                    part.mesh.material = part.mesh.userData.originalMaterial.clone()
                }
            })
        }
    }, [scene, affectedParts, onPartsLoaded, onModelLoaded])

    return (
        <>
            <primitive object={scene} />
            {isAutoFocus && (
                <FocusOnAffectedParts
                    modelScene={scene}
                    affectedParts={affectedParts}
                    controlsRef={controlsRef}
                    isAutoFocus={isAutoFocus}
                />
            )}
        </>
    )
}

// Kamera kontrollerini boshqarish
const CameraController = ({ controlsRef, modelType }) => {
    useEffect(() => {
        if (controlsRef.current) {
            if (modelType === "dental") {
                controlsRef.current.target.set(0, 0, 0)
            } else {
                controlsRef.current.target.set(0.03, 0.81, -0.2)
            }
            controlsRef.current.update()
        }
    }, [controlsRef, modelType])

    return null
}

// PDF generatsiya qilish funksiyasi
const generatePDF = (appointmentData) => {
    console.log("PDF ma'lumotlari bilan generatsiya qilinmoqda:", appointmentData)
    const content = `
        Tashxis ma'lumotlari
        -------------------
        Sana: ${new Date(appointmentData.date).toLocaleString()}

        Filial: ${appointmentData.branch_name}
        Mijoz: ${appointmentData.customer_name}
        Shifokor: ${appointmentData.doctor_name}
        Kabinet: ${appointmentData.room_name}

        Tanlangan a'zolar:
        ${appointmentData.parts.map(part => `- ${part.uzbekName}`).join('\n')}

        Tashxis: ${appointmentData.comment || "Tashxis ma'lumotlari mavjud emas"}

        To'lov miqdori: ${appointmentData.payment_amount}
    `
    alert("PDF ma'lumotlari: \n\n" + content)
}

// AppointmentDetails asosiy komponenti
const AppointmentDetails = () => {
    const { id } = useParams()
    const [appointmentData, setAppointmentData] = useState(null)
    const [partsList, setPartsList] = useState([])
    const controlsRef = useRef()
    const [modelScene, setModelScene] = useState(null)
    const [isAutoFocus, setIsAutoFocus] = useState(true)
    const modelType = "dental" // Tish modeli

    // Masalan, hozirgi appointment ID sini 1 deb belgilaymiz
    const appointmentId = id

    // API orqali appointment maʼlumotlarini yuklab olish
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiPatientDetailReception.fetchAppointmentById(appointmentId)
                // API dan kelgan "organs" massivini Model kutadigan formatga aylantiramiz:
                // Har bir element uchun "originalName" va "uzbekName" maydonlarini yarataylik.
                const parts = data.organs.map(organ => ({
                    originalName: organ,
                    uzbekName: organ // Zaruratga qarab tarjima yoki mapping qoʻshish mumkin
                }))
                setAppointmentData({ ...data, parts })
            } catch (error) {
                console.error("Appointment ma'lumotlarini olishda xatolik:", error)
            }
        }
        fetchData()
    }, [appointmentId])

    const handlePartsLoaded = (parts) => {
        setPartsList(parts)
    }

    const handleModelLoaded = (scene) => {
        setModelScene(scene)
    }

    const handleExportPDF = () => {
        generatePDF(appointmentData)
    }

    const handleFocusToggle = () => {
        setIsAutoFocus(!isAutoFocus)
        if (isAutoFocus && controlsRef.current) {
            controlsRef.current.reset()
        } else {
            setIsAutoFocus(true)
        }
    }

    if (!appointmentData) {
        return <div>Yuklanmoqda...</div>
    }

    return (
        <div className="anatomy-viewer">
            <div className="anatomy-model-container">
                <Canvas camera={{ position: [0, 0, 1.5], fov: 50 }} shadows>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                    <Suspense fallback={<LoadingIndicator />}>
                        <Model
                            gender={appointmentData.customer_gender}
                            affectedParts={appointmentData.parts}
                            onPartsLoaded={handlePartsLoaded}
                            onModelLoaded={handleModelLoaded}
                            modelType={modelType}
                            isAutoFocus={isAutoFocus}
                            controlsRef={controlsRef}
                        />
                        <InitialCameraSetup modelType={modelType} />
                    </Suspense>
                    <OrbitControls
                        ref={controlsRef}
                        autoRotate={false}
                        enableDamping
                        dampingFactor={0.05}
                        maxDistance={5}
                        minDistance={0.5}
                    />
                    <CameraController controlsRef={controlsRef} modelType={modelType} />
                </Canvas>

                <button className="focus-button" onClick={handleFocusToggle}>
                    <FaSearchPlus /> {isAutoFocus ? "Fokusni bekor qilish" : "Zararlangan joyni fokusga olish"}
                </button>
            </div>

            <div className="anatomy-info-panel">
                <div className="anatomy-diagnosis-info">
                    <h3>Tashxis ma'lumotlari</h3>

                    <div className="info-section">
                        <h4>Sana:</h4>
                        <p>{new Date(appointmentData.date).toLocaleString()}</p>
                    </div>

                    <div className="info-section">
                        <h4>Filial:</h4>
                        <p>{appointmentData.branch_name}</p>
                    </div>

                    <div className="info-section">
                        <h4>Mijoz:</h4>
                        <p>{appointmentData.customer_name}</p>
                    </div>

                    <div className="info-section">
                        <h4>Shifokor:</h4>
                        <p>{appointmentData.doctor_name}</p>
                    </div>

                    <div className="info-section">
                        <h4>Kabinet:</h4>
                        <p>{appointmentData.room_name}</p>
                    </div>

                    <div className="info-section">
                        <h4>Tanlangan a'zolar:</h4>
                        <div className="selected-parts-list">
                            {appointmentData.parts.map((part, index) => (
                                <div key={index} className="selected-part-item">
                                    {part.uzbekName}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="info-section">
                        <h4>Tashxis (Izoh):</h4>
                        <p>{appointmentData.comment || "Tashxis ma'lumotlari mavjud emas"}</p>
                    </div>

                    <div className="info-section">
                        <h4>To'lov miqdori:</h4>
                        <p>{appointmentData.payment_amount}</p>
                    </div>

                    <div className="info-note">
                        <FaInfoCircle />
                        <p>3D modelda sariq rangda ajratilgan a'zolar tashxis qo'yilgan a'zolardir.</p>
                    </div>

                    <button className="export-pdf-button" onClick={handleExportPDF}>
                        <FaDownload /> PDF yuklab olish
                    </button>
                </div>

                <div className="anatomy-instructions">
                    <h4>Yo'riqnoma:</h4>
                    <ul>
                        <li>Modelni aylantirish uchun sichqonchaning chap tugmasini bosib, harakatlantiring</li>
                        <li>Yaqinlashtirish/uzoqlashtirish uchun g'ildirakni aylantiring</li>
                        <li>Modelni siljitish uchun sichqonchaning o'ng tugmasini bosib, harakatlantiring</li>
                        <li>Zararlangan joyni ko'rish uchun "Zararlangan joyni fokusga olish" tugmasini bosing</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AppointmentDetails
