import { FaTimes, FaEdit, FaTrash, FaCheck, FaSpinner, FaClock } from "react-icons/fa"
import { useLanguage } from "../../../contexts/LanguageContext"

export default function TaskDetails({ task, onClose, onEdit, onDelete, onStatusChange }) {
    const { t } = useLanguage()

    // Format date for display
    const formatDateTime = (date) => {
        return new Intl.DateTimeFormat(navigator.language, {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(date)
    }

    // Get status badge text
    const getStatusText = (status) => {
        switch (status) {
            case "pending":
                return t("pending")
            case "in-progress":
                return t("in_progress")
            case "completed":
                return t("completed")
            default:
                return status
        }
    }

    // Get priority text
    const getPriorityText = (priority) => {
        switch (priority) {
            case "low":
                return t("low")
            case "medium":
                return t("medium")
            case "high":
                return t("high")
            default:
                return priority
        }
    }

    return (
        <div className="task-details-modal">
            <div className="task-details-content">
                <div className="details-header">
                    <div className="task-title-section">
                        <h2>{task.title}</h2>
                        <div className={`status-badge ${task.status}`}>{getStatusText(task.status)}</div>
                    </div>
                    <button className="close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                <div className="details-content">
                    <div className="detail-section">
                        <h3>{t("description")}</h3>
                        <p className="description-text">{task.description || t("no_description")}</p>
                    </div>

                    <div className="detail-section">
                        <h3>{t("details")}</h3>
                        <div className="detail-row">
                            <div className="detail-label">{t("start_time")}:</div>
                            <div className="detail-value">{formatDateTime(task.startDate)}</div>
                        </div>
                        <div className="detail-row">
                            <div className="detail-label">{t("end_time")}:</div>
                            <div className="detail-value">{formatDateTime(task.endDate)}</div>
                        </div>
                        <div className="detail-row">
                            <div className="detail-label">{t("priority")}:</div>
                            <div className="detail-value">{getPriorityText(task.priority)}</div>
                        </div>
                        <div className="detail-row">
                            <div className="detail-label">{t("assignee")}:</div>
                            <div className="detail-value">{task.assignee.name}</div>
                        </div>
                        <div className="detail-row">
                            <div className="detail-label">{t("created_by")}:</div>
                            <div className="detail-value">{task.createdBy.name}</div>
                        </div>
                        <div className="detail-row">
                            <div className="detail-label">{t("created_at")}:</div>
                            <div className="detail-value">{formatDateTime(task.createdAt)}</div>
                        </div>
                    </div>
                </div>

                <div className="details-actions">
                    {task.status !== "completed" && (
                        <button className="btn-success" onClick={() => onStatusChange("completed")}>
                            <FaCheck /> {t("mark_complete")}
                        </button>
                    )}

                    {task.status === "pending" && (
                        <button className="btn-primary" onClick={() => onStatusChange("in-progress")}>
                            <FaSpinner /> {t("start_task")}
                        </button>
                    )}

                    {task.status === "completed" && (
                        <button className="btn-primary" onClick={() => onStatusChange("pending")}>
                            <FaClock /> {t("reopen_task")}
                        </button>
                    )}

                    <button className="btn-primary" onClick={onEdit}>
                        <FaEdit /> {t("edit")}
                    </button>

                    <button className="btn-danger" onClick={onDelete}>
                        <FaTrash /> {t("delete")}
                    </button>
                </div>
            </div>
        </div>
    )
}

