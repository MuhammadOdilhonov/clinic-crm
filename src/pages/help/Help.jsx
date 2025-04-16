"use client"
import { useState, useCallback } from "react"
import { useLanguage } from "../../contexts/LanguageContext"
import {
    FaQuestionCircle,
    FaCommentDots,
    FaUpload,
    FaTimes,
    FaChevronRight,
} from "react-icons/fa"

const Help = () => {
    const { t } = useLanguage()
    const [question, setQuestion] = useState("")
    const [selectedFiles, setSelectedFiles] = useState([])
    const [showImagePreview, setShowImagePreview] = useState(false)

    // Toggle filters visibility
    const toggleImagePreview = () => {
        setShowImagePreview(!showImagePreview)
    }

    // Mock frequently asked questions data
    const faqs = [
        {
            id: 1,
            question: t("faq_1_question"),
            answer: t("faq_1_answer"),
        },
        {
            id: 2,
            question: t("faq_2_question"),
            answer: t("faq_2_answer"),
        },
        {
            id: 3,
            question: t("faq_3_question"),
            answer: t("faq_3_answer"),
        },
    ]

    // Handle file selection
    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files).slice(0, 5) // Limit to 5 files
        setSelectedFiles([...selectedFiles, ...files])
    }

    // Remove file from selection
    const removeFile = (index) => {
        const newFiles = [...selectedFiles]
        newFiles.splice(index, 1)
        setSelectedFiles(newFiles)
    }

    // Handle submit question
    const handleSubmitQuestion = (e) => {
        e.preventDefault()
        // In a real app, you would handle the submission logic here
        console.log("Question submitted:", question, selectedFiles)
        alert("Question submitted! (This is a demo)")
        setQuestion("")
        setSelectedFiles([])
    }

    return (
        <div className="help-container">
            <h1 className="help-title">Yordam Markazi</h1>

            <section className="faq-section">
                <h2>Ko'p beriladigan savollar</h2>
                <ul className="faq-list">
                    {faqs.map((faq) => (
                        <li key={faq.id} className="faq-item">
                            <h3>
                                <FaQuestionCircle className="faq-icon" /> {faq.question}
                            </h3>
                            <p>{faq.answer}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="ask-question-section">
                <h2>Savolingiz bormi?</h2>
                <form className="ask-question-form" onSubmit={handleSubmitQuestion}>
                    <div className="form-group">
                        <label htmlFor="question">Savolingizni shu yerda yozing:</label>
                        <textarea
                            id="question"
                            name="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            rows={4}
                            placeholder="Savolingizni kiriting..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="images">Rasmlarni yuklash (maks. 5 ta):</label>
                        <div className="upload-area">
                            <label htmlFor="upload-image" className="upload-label">
                                <FaUpload /> Rasmlarni tanlash
                            </label>
                            <input
                                type="file"
                                id="upload-image"
                                multiple
                                accept="image/*"
                                onChange={handleFileSelect}
                                style={{ display: "none" }}
                            />
                            <div className="selected-files">
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="selected-file-item">
                                        {file.name}
                                        <button type="button" className="remove-file-button" onClick={() => removeFile(index)}>
                                            <FaTimes />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="submit-question-button">
                        Yuborish
                    </button>
                </form>
            </section>
        </div>
    )
}

export default Help
