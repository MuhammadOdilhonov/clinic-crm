"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { OrbitControls, Html, useGLTF, useProgress } from "@react-three/drei"
import * as THREE from "three"
import { FaDownload, FaInfoCircle, FaSearchPlus } from "react-icons/fa"

// Yuklash jarayonini ko'rsatish uchun komponent
const LoadingIndicator = () => {
    const { progress } = useProgress()
    // progress qiymatini gradusga aylantiramiz (0–360)
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
                // Tish modeli uchun kamera pozitsiyasi
                camera.position.set(0, 0.5, 1.5)
                const targetPosition = new THREE.Vector3(0, 0, 0)
                camera.lookAt(targetPosition)
            } else {
                // Anatomiya modeli uchun kamera pozitsiyasi
                camera.position.set(0.24, 1.36, 2.11)
                const targetPosition = new THREE.Vector3(0.03, 0.81, -0.2)
                camera.lookAt(targetPosition)
            }

            // Kamera matritsa yangilanishi
            camera.updateProjectionMatrix()

            // Boshlang'ich sozlash bajarildi
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

    // Zararlangan qismni topish va fokus nuqtasini aniqlash
    useEffect(() => {
        if (modelScene && affectedParts.length > 0 && isAutoFocus) {
            const affectedMeshes = []
            let center = new THREE.Vector3()

            modelScene.traverse((child) => {
                if (child.isMesh) {
                    // Zararlangan qismlarni tekshirish
                    const isAffected = affectedParts.some(
                        affectedPart => child.name.includes(affectedPart.originalName)
                    )

                    if (isAffected) {
                        affectedMeshes.push(child)

                        // Mesh markazini hisoblash
                        const boundingBox = new THREE.Box3().setFromObject(child)
                        const meshCenter = new THREE.Vector3()
                        boundingBox.getCenter(meshCenter)
                        center.add(meshCenter)
                    }
                }
            })

            // Barcha zararlangan qismlar markazini hisoblash
            if (affectedMeshes.length > 0) {
                center.divideScalar(affectedMeshes.length)

                // Kamera uchun fokus nuqtasini saqlash
                setFocusTarget(center)

                // Animatsiya boshlash
                startPosition.current.copy(camera.position)
                if (controlsRef.current) {
                    startTarget.current.copy(controlsRef.current.target)
                }

                animationRef.current = {
                    active: true,
                    progress: 0
                }
            }
        }
    }, [modelScene, affectedParts, camera, controlsRef, isAutoFocus])

    // Animatsiya kadrini ishlab chiqish
    useFrame(() => {
        if (animationRef.current.active && focusTarget && controlsRef.current) {
            // Animatsiya davom etishi
            animationRef.current.progress += 0.01

            if (animationRef.current.progress >= 1) {
                animationRef.current.active = false
                return
            }

            // Easing funksiyasi (yumshoq harakat)
            const eased = easeOutCubic(animationRef.current.progress)

            // Yangi kamera pozitsiyasi hisoblash
            const targetPosition = focusTarget.clone()

            // Zararlangan qismga qarab kamera pozitsiyasini o'zgartirish
            const offset = new THREE.Vector3(0, 0.1, 0.6) // Tishdan biroz yuqori va orqaroq
            targetPosition.add(offset)

            // Kamerani harakatlantirish
            camera.position.lerpVectors(startPosition.current, targetPosition, eased)

            // OrbitControls targetni harakatlantirish
            controlsRef.current.target.lerpVectors(startTarget.current, focusTarget, eased)
            controlsRef.current.update()
        }
    })

    // Yumshoq animatsiya uchun ease funksiyasi
    const easeOutCubic = (x) => {
        return 1 - Math.pow(1 - x, 3)
    }

    return null
}

// Model komponenti
const Model = ({ gender, affectedParts, onPartsLoaded, modelType, onModelLoaded, isAutoFocus, controlsRef }) => {
    // Model turini tanlash
    let modelPath = "/models/male_anatomy.glb"

    if (modelType === "dental") {
        modelPath = "/models/male_anatomy.glb"
    } else if (gender === "female") {
        modelPath = "/models/female_anatomy.glb"
    }

    const { scene } = useGLTF(modelPath)

    // Qismlarni qayta ishlash va ro'yxatini yaratish
    useEffect(() => {
        const parts = []
        scene.traverse((child) => {
            if (child.isMesh) {
                // Har bir meshga nom berish
                if (!child.name || child.name === "") {
                    child.name = `part-${parts.length}`
                }

                // Material yaratish (agar yo'q bo'lsa)
                if (!child.material) {
                    child.material = new THREE.MeshStandardMaterial({ color: "white" })
                }

                // Asl materialni saqlash
                if (!child.userData.originalMaterial) {
                    child.userData.originalMaterial = child.material.clone()
                }

                child.castShadow = true
                child.receiveShadow = true
                parts.push({ name: child.name, mesh: child })
            }
        })

        // Zararlangan qismlarni ajratib ko'rsatish
        parts.forEach((part) => {
            if (part.mesh) {
                // Qism zararlangan qismlar ro'yxatida bor-yo'qligini tekshirish
                const isAffected = affectedParts.some(
                    affectedPart => part.name.includes(affectedPart.originalName)
                )

                if (isAffected) {
                    // Sariq rang bilan ajratib ko'rsatish
                    const highlightMaterial = new THREE.MeshStandardMaterial({
                        color: new THREE.Color("yellow"),
                        emissive: new THREE.Color("yellow"),
                        emissiveIntensity: 0.5,
                    })
                    part.mesh.material = highlightMaterial
                } else {
                    // Asl materialga qaytarish
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

        // Tozalash funksiyasi
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
                // Tish modeli uchun orbit kontrollerini moslash
                controlsRef.current.target.set(0, 0, 0)
            } else {
                // Anatomiya modeli uchun orbit kontrollerini moslash
                controlsRef.current.target.set(0.03, 0.81, -0.2)
            }
            controlsRef.current.update()
        }
    }, [controlsRef, modelType])

    return null
}

// PDF generatsiya qilish funksiyasi
const generatePDF = (diagnosisData) => {
    // Haqiqiy loyihada PDF kutubxonasi bilan ishlaydi
    console.log("PDF ma'lumotlari bilan generatsiya qilinmoqda:", diagnosisData)

    // Haqiqiy loyihada jsPDF yoki pdfmake kutubxonalari ishlatiladi
    const content = `
        Tashxis ma'lumotlari
        -------------------
        Sana: ${diagnosisData.date}
        
        Tanlangan a'zolar:
        ${diagnosisData.parts.map(part => `- ${part.uzbekName}`).join('\n')}
        
        Tashxis: ${diagnosisData.diagnosis}
        
        Tuzalish uchun yechim: ${diagnosisData.solution}
    `

    alert("PDF ma'lumotlari: \n\n" + content)

    // Haqiqiy loyihada PDF faylini yuklab olishni boshlaydi
}

// AppointmentDetails asosiy komponenti
const AppointmentDetails = () => {
    const [partsList, setPartsList] = useState([])
    const controlsRef = useRef()
    const [modelScene, setModelScene] = useState(null)
    const [isAutoFocus, setIsAutoFocus] = useState(true)
    const modelType = "dental" // Tish modelini tanlash

    // Berilgan tashxis ma'lumotlari
    const diagnosisData = {
        "date": "08.04.2025, 13:41:59",
        "diagnosis": "tish qurtlagan",
        "id": 1744101719950,
        "parts": [
            {
                "originalName": "13-Upper_caninel_Generated_Mesh_From_X3D685",
                "uzbekName": "13-Yuqori qoziq tish"
            },
            {
                "originalName": "14-Upper_first_premolarl_Generated_Mesh_From_X3D670",
                "uzbekName": "14-Yuqori birinchi premolar"
            }
        ],
        "solution": "chiska qilib plomba qvordim 2 3 kunda tuzaladi"
    }

    const handlePartsLoaded = (parts) => {
        setPartsList(parts)
    }

    const handleModelLoaded = (scene) => {
        setModelScene(scene)
    }

    const handleExportPDF = () => {
        generatePDF(diagnosisData)
    }

    const handleFocusToggle = () => {
        setIsAutoFocus(!isAutoFocus)

        // Agar avtofokus o'chirilgan bo'lsa, kamerani boshlang'ich holatga qaytarish
        if (isAutoFocus && controlsRef.current) {
            controlsRef.current.reset()
        } else {
            // Fokusni qayta faollashtirish
            setIsAutoFocus(true)
        }
    }

    return (
        <div className="anatomy-viewer">
            <div className="anatomy-model-container">
                <Canvas camera={{ position: [0, 0.5, 1.5], fov: 50 }} shadows>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                    <Suspense fallback={<LoadingIndicator />}>
                        <Model
                            gender="male"
                            affectedParts={diagnosisData.parts}
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

                {/* Fokus tugmasi */}
                <button className="focus-button" onClick={handleFocusToggle}>
                    <FaSearchPlus /> {isAutoFocus ? "Fokusni bekor qilish" : "Zararlangan joyni fokusga olish"}
                </button>
            </div>

            <div className="anatomy-info-panel">
                <div className="anatomy-diagnosis-info">
                    <h3>Tashxis ma'lumotlari</h3>

                    <div className="info-section">
                        <h4>Sana:</h4>
                        <p>{diagnosisData.date}</p>
                    </div>

                    <div className="info-section">
                        <h4>Tanlangan a'zolar:</h4>
                        <div className="selected-parts-list">
                            {diagnosisData.parts.map((part, index) => (
                                <div key={index} className="selected-part-item">
                                    {part.uzbekName}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="info-section">
                        <h4>Tashxis:</h4>
                        <p>{diagnosisData.diagnosis || "Tashxis ma'lumotlari mavjud emas"}</p>
                    </div>

                    <div className="info-section">
                        <h4>Tuzalish uchun yechim:</h4>
                        <p>{diagnosisData.solution || "Yechim ma'lumotlari mavjud emas"}</p>
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

export default AppointmentDetails;