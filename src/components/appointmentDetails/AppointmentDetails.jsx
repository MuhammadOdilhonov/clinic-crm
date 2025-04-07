"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Html, useGLTF } from "@react-three/drei"
import * as THREE from "three"
import { FaDownload, FaInfoCircle } from "react-icons/fa"

// Initial Camera Setup
const InitialCameraSetup = ({ modelType }) => {
    const { camera } = useThree()
    const initialSetupDone = useRef(false)

    useEffect(() => {
        if (!initialSetupDone.current) {
            if (modelType === "dental") {
                // Set camera position for dental model
                camera.position.set(0, 0.5, 1.5)
                const targetPosition = new THREE.Vector3(0, 0, 0)
                camera.lookAt(targetPosition)
            } else {
                // Set camera position for anatomy model
                camera.position.set(0.24, 1.36, 2.11)
                const targetPosition = new THREE.Vector3(0.03, 0.81, -0.2)
                camera.lookAt(targetPosition)
            }

            // Update the camera matrix
            camera.updateProjectionMatrix()

            // Set initial setup as done
            initialSetupDone.current = true
        }
    }, [camera, modelType])

    return null
}

// Model component
const Model = ({ gender, affectedParts, onPartsLoaded, modelType }) => {
    // Use the appropriate model based on modelType and gender
    let modelPath = "/models/male_anatomy.glb"

    if (modelType === "dental") {
        modelPath = "/models/dental.glb"
    } else if (gender === "female") {
        modelPath = "/models/female_anatomy.glb"
    }

    const { scene } = useGLTF(modelPath)

    // Process meshes and create parts list
    useEffect(() => {
        const parts = []
        scene.traverse((child) => {
            if (child.isMesh) {
                // Ensure each mesh has a name
                if (!child.name || child.name === "") {
                    child.name = `part-${parts.length}`
                }

                // Create material if not exists
                if (!child.material) {
                    child.material = new THREE.MeshStandardMaterial({ color: "white" })
                }

                // Store original material
                if (!child.userData.originalMaterial) {
                    child.userData.originalMaterial = child.material.clone()
                }

                child.castShadow = true
                child.receiveShadow = true
                parts.push({ name: child.name, mesh: child })
            }
        })

        // Highlight affected parts
        parts.forEach((part) => {
            if (part.mesh) {
                if (affectedParts.includes(part.name)) {
                    // Highlight with yellow color
                    const highlightMaterial = new THREE.MeshStandardMaterial({
                        color: new THREE.Color("yellow"),
                        emissive: new THREE.Color("yellow"),
                        emissiveIntensity: 0.5,
                    })
                    part.mesh.material = highlightMaterial
                }
            }
        })

        if (onPartsLoaded) {
            onPartsLoaded(parts)
        }

        // Cleanup function
        return () => {
            parts.forEach((part) => {
                if (part.mesh && part.mesh.userData.originalMaterial) {
                    part.mesh.material = part.mesh.userData.originalMaterial.clone()
                }
            })
        }
    }, [scene, affectedParts, onPartsLoaded])

    return <primitive object={scene} />
}

// Camera Controller
const CameraController = ({ controlsRef, modelType }) => {
    useEffect(() => {
        if (controlsRef.current) {
            if (modelType === "dental") {
                // Set the orbit controls target for dental model
                controlsRef.current.target.set(0, 0, 0)
            } else {
                // Set the orbit controls target for anatomy model
                controlsRef.current.target.set(0.03, 0.81, -0.2)
            }
            controlsRef.current.update()
        }
    }, [controlsRef, modelType])

    return null
}

// Main AnatomyViewer component
const AnatomyViewer = ({ gender = "male", diagnosisData, affectedParts = [], modelType = "anatomy" }) => {
    const [partsList, setPartsList] = useState([])
    const controlsRef = useRef()

    const handlePartsLoaded = (parts) => {
        setPartsList(parts)
    }

    const handleExportPDF = () => {
        // In a real app, this would generate a PDF with diagnosis information
        alert("PDF export functionality would be implemented here")
    }

    return (
        <div className="anatomy-viewer">
            <div className="anatomy-model-container">
                <Canvas camera={{ position: modelType === "dental" ? [0, 0.5, 1.5] : [0.24, 1.36, 2.11], fov: 50 }} shadows>
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                    <Suspense fallback={<Html center>Loading 3D model...</Html>}>
                        <Model
                            gender={gender}
                            affectedParts={affectedParts}
                            onPartsLoaded={handlePartsLoaded}
                            modelType={modelType}
                        />
                        <InitialCameraSetup modelType={modelType} />
                    </Suspense>
                    <OrbitControls ref={controlsRef} autoRotate={false} enableDamping dampingFactor={0.05} />
                    <CameraController controlsRef={controlsRef} modelType={modelType} />
                </Canvas>
            </div>

            <div className="anatomy-info-panel">
                <div className="anatomy-diagnosis-info">
                    <h3>Tashxis ma'lumotlari</h3>

                    <div className="info-section">
                        <h4>Sana:</h4>
                        <p>07.04.2025, 07:00:52</p>
                    </div>

                    <div className="info-section">
                        <h4>Tanlangan a'zolar:</h4>
                        <div className="selected-parts-list">
                            {diagnosisData?.parts?.map((part, index) => (
                                <div key={index} className="selected-part-item">
                                    {part.uzbekName}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="info-section">
                        <h4>Tashxis:</h4>
                        <p>{diagnosisData?.diagnosis || "Tashxis ma'lumotlari mavjud emas"}</p>
                    </div>

                    <div className="info-section">
                        <h4>Tuzalish uchun yechim:</h4>
                        <p>{diagnosisData?.solution || "Yechim ma'lumotlari mavjud emas"}</p>
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
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default AnatomyViewer

