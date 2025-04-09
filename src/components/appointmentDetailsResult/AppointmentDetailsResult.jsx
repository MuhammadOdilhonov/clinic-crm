"use client"

import { useState, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Html } from "@react-three/drei"

// Tooltip component
const QuestionMarkTooltip = () => {
    const [showTooltip, setShowTooltip] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    return (
        <span
            className="question-mark"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            ?
            {showTooltip && (
                <div className="tooltip">
                    <p>Yo'riqnoma:</p>
                    <ol>
                        <li>Bir nechta a'zolarni tanlash uchun SHIFT tugmasini bosib turing va a'zolarni bosing.</li>
                        <li>A'zoni tanlovdan chiqarish uchun SHIFT tugmasini bosib turgan holda qayta bosing yoki a'zo yonidagi "X" tugmasini bosing.</li>
                        <li>Tanlovni tozalash uchun "Barcha tanlovlarni o'chirish" tugmasini bosing.</li>
                        <li>Tashxis va yechimni kiritib "Saqlash" tugmasini bosing.</li>
                        <li>Saqlangan tashxis kartochkalarini bosib, tegishli a'zolarni ko'rishingiz mumkin.</li>
                        <li>"PDF yuklab olish" tugmasi orqali tashxis ma'lumotlarini PDF formatda yuklab olishingiz mumkin.</li>
                    </ol>
                </div>
            )}
        </span>
    )
}

// 3D Model component with selectable parts
function Model({ url, onSelectOrgan, selectedOrgans }) {
    const { scene, nodes } = useGLTF(url)

    useEffect(() => {
        // Reset materials on load
        scene.traverse((object) => {
            if (object.isMesh) {
                object.userData.originalMaterial = object.material.clone()
            }
        })
    }, [scene])

    useEffect(() => {
        // Update materials based on selection
        scene.traverse((object) => {
            if (object.isMesh) {
                if (selectedOrgans.includes(object.name)) {
                    object.material.color.set('#e8e520') // Orange for selection
                } else {
                    // Reset to original material
                    if (object.userData.originalMaterial) {
                        object.material = object.userData.originalMaterial.clone()
                    }
                }
            }
        })
    }, [selectedOrgans, scene])

    return (
        <primitive
            object={scene}
            scale={[0.7, 0.7, 0.7]}
            position={[0, -0.6, 0]}
            onClick={(e) => {
                e.stopPropagation()
                if (e.object.name) {
                    onSelectOrgan(e.object.name, e.shiftKey)
                }
            }}
        />
    )
}

export default function AppointmentDetailsResult() {
    const [diagnosis, setDiagnosis] = useState("")
    const [treatment, setTreatment] = useState("")
    const [selectedOrgans, setSelectedOrgans] = useState([])
    const [availableOrgans, setAvailableOrgans] = useState([])
    const [showUploadModal, setShowUploadModal] = useState(false)
    const [selectedFiles, setSelectedFiles] = useState([])
    const [isDragging, setIsDragging] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadSuccess, setUploadSuccess] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const fileInputRef = useRef(null)
    const modelRef = useRef(null)

    // Sample 3D model URL
    const modelUrl = "/models/male_anatomy.glb"

    // Supported file formats
    const supportedFormats = [".dcm", ".jpg", ".png", ".tif", ".bmp", ".raw", ".nii"]

    // Load available organs
    useEffect(() => {
        // In a real app, you would extract this from the actual model
        // These should match organ names in the actual 3D model
        setAvailableOrgans([
            "Heart", "Liver", "Lungs", "Kidneys", "Brain", "Stomach",
            "Intestines", "Pancreas", "Spleen", "Bladder", "Gallbladder"
        ])
    }, [])

    // Handle organ selection from 3D model
    const handleSelectOrgan = (organName, isShiftPressed) => {
        setSelectedOrgans(prev => {
            if (prev.includes(organName)) {
                // If already selected, remove it
                return prev.filter(name => name !== organName)
            } else if (isShiftPressed) {
                // If shift is pressed, add to selection
                return [...prev, organName]
            } else {
                // No shift - replace selection
                return [organName]
            }
        })
    }

    // Handle dropdown selection
    const handleDropdownSelect = (e) => {
        const organ = e.target.value
        if (!organ) return

        if (!selectedOrgans.includes(organ)) {
            setSelectedOrgans(prev => [...prev, organ])
        }
    }

    // Remove selected organ
    const removeOrgan = (organToRemove) => {
        setSelectedOrgans(prev => prev.filter(organ => organ !== organToRemove))
    }

    // Clear all selections
    const clearAllSelections = () => {
        setSelectedOrgans([])
    }

    const handleSave = () => {
        // Show success modal
        setShowSuccessModal(true)

        // Close the window after 2 seconds
        setTimeout(() => {
            setShowSuccessModal(false)

            // If this is opened from DocSchedule, close the window
            if (window.opener && !window.opener.closed) {
                window.close()
            }
        }, 2000)
    }

    const handleUploadResults = () => {
        setShowUploadModal(true)
    }

    // Handle file selection
    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files)
        setSelectedFiles([...selectedFiles, ...files])
    }

    // Handle drag events
    const handleDragOver = (e) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setIsDragging(false)

        const files = Array.from(e.dataTransfer.files)
        setSelectedFiles([...selectedFiles, ...files])
    }

    // Open file browser
    const openFileBrowser = () => {
        fileInputRef.current.click()
    }

    // Remove file from selection
    const removeFile = (index) => {
        const newFiles = [...selectedFiles]
        newFiles.splice(index, 1)
        setSelectedFiles(newFiles)
    }

    // Upload files
    const uploadFiles = () => {
        if (selectedFiles.length === 0) return

        setIsUploading(true)

        // Simulate upload process
        setTimeout(() => {
            setIsUploading(false)
            setShowUploadModal(false)
            setUploadSuccess(true)
            setShowSuccessModal(true)

            // Close success modal after 2 seconds
            setTimeout(() => {
                setShowSuccessModal(false)
            }, 2000)
        }, 1500)
    }

    // Get file icon based on extension
    const getFileIcon = (fileName) => {
        const extension = fileName.split(".").pop().toLowerCase()
        return extension
    }

    return (
        <div className="appointment-details-container">
            <div className="model-container">
                <Canvas camera={{ position: [0, 0, 1.5], fov: 50 }}>
                    <ambientLight intensity={1.5} />
                    <spotLight position={[5, 5, 5]} intensity={1.5} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={1} />
                    <Model
                        url={modelUrl}
                        onSelectOrgan={handleSelectOrgan}
                        selectedOrgans={selectedOrgans}
                        ref={modelRef}
                    />
                    <OrbitControls />
                </Canvas>
            </div>

            <div className="details-form">
                <div className="selected-organs-header">
                    <h2>
                        Tanlangan a'zolar: {selectedOrgans.length > 0 ? '' : 'Hech narsa tanlanmagan'}
                        <QuestionMarkTooltip />
                    </h2>
                </div>

                <div className="dropdown-section">
                    <label>Dropdown orqali tanlash:</label>
                    <select
                        onChange={handleDropdownSelect}
                        className="organ-dropdown"
                        value=""
                    >
                        <option value="">-- Tanlang --</option>
                        {availableOrgans.map((organ, index) => (
                            <option key={index} value={organ}>{organ}</option>
                        ))}
                    </select>
                </div>

                {selectedOrgans.length > 0 && (
                    <div className="selected-organs-list">
                        {selectedOrgans.map((organ, index) => (
                            <div key={index} className="selected-organ-tag">
                                <span>{organ}</span>
                                <button
                                    className="remove-organ-button"
                                    onClick={() => removeOrgan(organ)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {selectedOrgans.length > 0 && (
                    <div className="clear-selections-container">
                        <button className="clear-selections-button" onClick={clearAllSelections}>
                            Tanlovlarni o'chirish
                        </button>
                    </div>
                )}

                <div className="diagnosis-section">
                    <h2>Tashxis va tuzalish yechimlarini qo'shish</h2>

                    <div className="form-group">
                        <label>Tashxis:</label>
                        <textarea
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            placeholder="Tashxisni kiriting..."
                            rows={5}
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label>Tuzalish uchun yechim:</label>
                        <textarea
                            value={treatment}
                            onChange={(e) => setTreatment(e.target.value)}
                            placeholder="Tuzalish uchun yechimni kiriting..."
                            rows={5}
                        ></textarea>
                    </div>

                    <div className="button-group">
                        <button className={`upload-button ${uploadSuccess ? "success" : ""}`} onClick={handleUploadResults}>
                            {uploadSuccess ? (
                                <>
                                    <span className="checkmark">✓</span> Natijasi yuklandi
                                </>
                            ) : (
                                "Natijasini yuklash"
                            )}
                        </button>
                        <button className="save-button" onClick={handleSave}>
                            Saqlash
                        </button>
                    </div>
                </div>
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="modal-overlay">
                    <div className="upload-modal">
                        <div className="modal-header">
                            <h2>Natija yuklash</h2>
                            <button className="close-button" onClick={() => setShowUploadModal(false)}>
                                ×
                            </button>
                        </div>

                        <div className="modal-body">
                            <div
                                className={`drop-area ${isDragging ? "dragging" : ""}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={openFileBrowser}
                            >
                                <div className="upload-icon">⬆️</div>
                                <p>Fayllarni bu yerga tashlang yoki tanlash uchun bosing</p>
                                <span className="formats-info">Qo'llab-quvvatlanadigan formatlar: {supportedFormats.join(", ")}</span>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileSelect}
                                    multiple
                                    style={{ display: "none" }}
                                    accept=".dcm,.jpg,.jpeg,.png,.tif,.tiff,.bmp,.raw,.nii"
                                />
                            </div>

                            {selectedFiles.length > 0 && (
                                <div className="selected-files">
                                    <h3>Tanlangan fayllar ({selectedFiles.length})</h3>
                                    <div className="file-list">
                                        {selectedFiles.map((file, index) => (
                                            <div className="file-item" key={index}>
                                                <span className="file-type">{getFileIcon(file.name)}</span>
                                                <span className="file-name">{file.name}</span>
                                                <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
                                                <button className="remove-button" onClick={() => removeFile(index)}>
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button className="cancel-button" onClick={() => setShowUploadModal(false)}>
                                Bekor qilish
                            </button>
                            <button
                                className="upload-button-modal"
                                onClick={uploadFiles}
                                disabled={selectedFiles.length === 0 || isUploading}
                            >
                                {isUploading ? (
                                    <>
                                        <span className="spinner"></span>
                                        Yuklanmoqda...
                                    </>
                                ) : (
                                    "Yuklash"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="modal-overlay">
                    <div className="success-modal">
                        <div className="success-icon">✓</div>
                        <h2>Muvaffaqiyatli yuklandi!</h2>
                        <p>Fayllar muvaffaqiyatli yuklandi va saqlandi.</p>
                    </div>
                </div>
            )}
            {/* Success Modal */}
            {showSuccessModal && (
                <div className="modal-overlay">
                    <div className="success-modal">
                        <div className="success-icon">✓</div>
                        <h2>Muvaffaqiyatli saqlandi!</h2>
                        <p>Ma'lumotlar muvaffaqiyatli saqlandi.</p>
                    </div>
                </div>
            )}
        </div>
    )
}