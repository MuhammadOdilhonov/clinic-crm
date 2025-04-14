"use client"
import { FaTimes, FaExclamationTriangle, FaCheck, FaTrash } from "react-icons/fa"

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText,
    cancelText,
    type = "warning",
    isLoading = false,
}) => {
    if (!isOpen) return null // Add back the isOpen check

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    const handleConfirm = () => {
        console.log("Confirm action triggered")
        if (typeof onConfirm === "function") {
            onConfirm()
        }
    }

    return (
        <div className="confirm-modal-overlay" onClick={handleOverlayClick}>
            <div className="confirm-modal">
                <div className={`confirm-modal-header ${type}`}>
                    <div className="confirm-modal-icon">
                        {type === "warning" && <FaExclamationTriangle />}
                        {type === "success" && <FaCheck />}
                        {type === "danger" && <FaTrash />}
                    </div>
                    <h3>{title}</h3>
                    <button className="confirm-modal-close" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>
                <div className="confirm-modal-body">
                    <p>{message}</p>
                </div>
                <div className="confirm-modal-footer">
                    <button className="confirm-modal-btn confirm-modal-cancel" onClick={onClose}>
                        {cancelText}
                    </button>
                    <button className={`confirm-modal-btn confirm-modal-${type}`} onClick={handleConfirm} disabled={isLoading}>
                        {isLoading ? `${confirmText}...` : confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal
