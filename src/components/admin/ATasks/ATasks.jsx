"use client"

import { useState, useEffect } from "react"
import {
    FaTasks,
    FaCalendarAlt,
    FaSearch,
    FaFilter,
    FaPlus,
    FaChevronLeft,
    FaChevronRight,
    FaListUl,
    FaUser,
    FaFlag,
} from "react-icons/fa"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import TaskCalendar from "../../commonTasks/taskCalendar/TaskCalendar"
import TaskForm from "../../commonTasks/taskForm/TaskForm"
import TaskDetails from "../../commonTasks/taskDetails/TaskDetails"

export default function ATasks() {
    const { user, selectedBranch } = useAuth()
    const { t } = useLanguage()
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState("calendar") // calendar, list
    const [currentDate, setCurrentDate] = useState(new Date())
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [showTaskDetails, setShowTaskDetails] = useState(false)
    const [selectedTask, setSelectedTask] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [priorityFilter, setPriorityFilter] = useState("all")
    const [assigneeFilter, setAssigneeFilter] = useState("all")
    const [tasks, setTasks] = useState([])
    const [staff, setStaff] = useState([])

    useEffect(() => {
        setLoading(true)

        // Simulate API call to fetch tasks
        setTimeout(() => {
            // Mock tasks data for admin
            const mockTasks = [
                {
                    id: 1,
                    title: "Yangi bemorni ro'yxatga olish",
                    description: "Yangi kelgan bemorni ro'yxatga olish va shifokorga yo'naltirish",
                    startDate: new Date(2023, 4, 18, 9, 0),
                    endDate: new Date(2023, 4, 18, 10, 0),
                    status: "completed",
                    priority: "medium",
                    assignee: {
                        id: 102,
                        name: "Malika Umarova",
                        role: "admin",
                    },
                    createdBy: {
                        id: 102,
                        name: "Malika Umarova",
                        role: "admin",
                    },
                    createdAt: new Date(2023, 4, 17),
                },
                {
                    id: 2,
                    title: "Hisobotlarni tayyorlash",
                    description: "Haftalik hisobotlarni tayyorlash va direktsiyaga topshirish",
                    startDate: new Date(2023, 4, 19, 13, 0),
                    endDate: new Date(2023, 4, 19, 16, 0),
                    status: "pending",
                    priority: "high",
                    assignee: {
                        id: 102,
                        name: "Malika Umarova",
                        role: "admin",
                    },
                    createdBy: {
                        id: 102,
                        name: "Malika Umarova",
                        role: "admin",
                    },
                    createdAt: new Date(2023, 4, 18),
                },
                {
                    id: 3,
                    title: "Dori-darmonlarni tekshirish",
                    description: "Dori-darmonlar zaxirasini tekshirish va yangi buyurtma berish",
                    startDate: new Date(2023, 4, 20, 10, 0),
                    endDate: new Date(2023, 4, 20, 11, 30),
                    status: "in-progress",
                    priority: "medium",
                    assignee: {
                        id: 104,
                        name: "Jasur Toshmatov",
                        role: "admin",
                    },
                    createdBy: {
                        id: 102,
                        name: "Malika Umarova",
                        role: "admin",
                    },
                    createdAt: new Date(2023, 4, 19),
                },
                {
                    id: 4,
                    title: "Shifokorlar jadvalini tuzish",
                    description: "Kelasi hafta uchun shifokorlar ish jadvalini tuzish",
                    startDate: new Date(2023, 4, 21, 14, 0),
                    endDate: new Date(2023, 4, 21, 16, 0),
                    status: "pending",
                    priority: "high",
                    assignee: {
                        id: 102,
                        name: "Malika Umarova",
                        role: "admin",
                    },
                    createdBy: {
                        id: 102,
                        name: "Malika Umarova",
                        role: "admin",
                    },
                    createdAt: new Date(2023, 4, 20),
                },
            ]

            // Mock staff data
            const mockStaff = [
                {
                    id: 101,
                    name: "Dr. Aziz Karimov",
                    role: "doctor",
                    department: "Kardiologiya",
                },
                {
                    id: 102,
                    name: "Malika Umarova",
                    role: "admin",
                    department: "Qabul bo'limi",
                },
                {
                    id: 103,
                    name: "Nilufar Rahimova",
                    role: "nurse",
                    department: "Pediatriya",
                },
                {
                    id: 104,
                    name: "Jasur Toshmatov",
                    role: "admin",
                    department: "Moliya bo'limi",
                },
            ]

            setTasks(mockTasks)
            setStaff(mockStaff)
            setLoading(false)
        }, 800)
    }, [selectedBranch])

    // Filter tasks based on search query and filters
    const filteredTasks = tasks.filter((task) => {
        // Search query filter
        const matchesSearch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase())

        // Status filter
        const matchesStatus = statusFilter === "all" || task.status === statusFilter

        // Priority filter
        const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter

        // Assignee filter
        const matchesAssignee = assigneeFilter === "all" || task.assignee.id.toString() === assigneeFilter

        return matchesSearch && matchesStatus && matchesPriority && matchesAssignee
    })

    // Navigate to previous month/week/day
    const handlePrevious = () => {
        const newDate = new Date(currentDate)
        if (view === "calendar") {
            newDate.setMonth(newDate.getMonth() - 1)
        } else {
            newDate.setDate(newDate.getDate() - 7)
        }
        setCurrentDate(newDate)
    }

    // Navigate to next month/week/day
    const handleNext = () => {
        const newDate = new Date(currentDate)
        if (view === "calendar") {
            newDate.setMonth(newDate.getMonth() + 1)
        } else {
            newDate.setDate(newDate.getDate() + 7)
        }
        setCurrentDate(newDate)
    }

    // Format date for display
    const formatDateRange = () => {
        if (view === "calendar") {
            return new Intl.DateTimeFormat(navigator.language, { month: "long", year: "numeric" }).format(currentDate)
        } else {
            const startOfWeek = new Date(currentDate)
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

            const endOfWeek = new Date(startOfWeek)
            endOfWeek.setDate(startOfWeek.getDate() + 6)

            return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`
        }
    }

    // Open task form for creating a new task
    const handleAddTask = () => {
        setSelectedTask(null)
        setShowTaskForm(true)
    }

    // Open task form for editing an existing task
    const handleEditTask = (task) => {
        setSelectedTask(task)
        setShowTaskForm(true)
        setShowTaskDetails(false)
    }

    // Open task details modal
    const handleViewTask = (task) => {
        setSelectedTask(task)
        setShowTaskDetails(true)
    }

    // Handle task form submission
    const handleTaskSubmit = (taskData) => {
        if (selectedTask) {
            // Update existing task
            setTasks(tasks.map((task) => (task.id === selectedTask.id ? { ...task, ...taskData } : task)))
        } else {
            // Create new task
            const newTask = {
                id: tasks.length + 1,
                ...taskData,
                createdBy: {
                    id: user.id,
                    name: user.name,
                    role: user.role,
                },
                createdAt: new Date(),
            }
            setTasks([...tasks, newTask])
        }
        setShowTaskForm(false)
    }

    // Handle task deletion
    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId))
        setShowTaskDetails(false)
    }

    // Handle task status change
    const handleStatusChange = (taskId, newStatus) => {
        setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
        setShowTaskDetails(false)
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>{t("loading")}...</p>
            </div>
        )
    }

    return (
        <div className="admin-tasks">
            <h1 className="page-title">{t("tasks_management")}</h1>

            <div className="tasks-container">
                <div className="tasks-header">
                    <div className="view-controls">
                        <button
                            className={`btn ${view === "calendar" ? "btn-primary" : "btn-outline"}`}
                            onClick={() => setView("calendar")}
                        >
                            <FaCalendarAlt /> {t("calendar_view")}
                        </button>
                        <button
                            className={`btn ${view === "list" ? "btn-primary" : "btn-outline"}`}
                            onClick={() => setView("list")}
                        >
                            <FaListUl /> {t("list_view")}
                        </button>
                    </div>

                    <div className="date-navigation">
                        <button className="btn-icon" onClick={handlePrevious}>
                            <FaChevronLeft />
                        </button>
                        <div className="current-date">{formatDateRange()}</div>
                        <button className="btn-icon" onClick={handleNext}>
                            <FaChevronRight />
                        </button>
                    </div>

                    <div className="task-actions">
                        <button className="btn-primary" onClick={handleAddTask}>
                            <FaPlus /> {t("add_task")}
                        </button>
                    </div>
                </div>

                <div className="tasks-filters">
                    <div className="search-box">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            placeholder={t("search_tasks")}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <div className="filter-label">
                            <FaFilter /> {t("status")}:
                        </div>
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="all">{t("all")}</option>
                            <option value="pending">{t("pending")}</option>
                            <option value="in-progress">{t("in_progress")}</option>
                            <option value="completed">{t("completed")}</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <div className="filter-label">
                            <FaFlag /> {t("priority")}:
                        </div>
                        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                            <option value="all">{t("all")}</option>
                            <option value="high">{t("high")}</option>
                            <option value="medium">{t("medium")}</option>
                            <option value="low">{t("low")}</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <div className="filter-label">
                            <FaUser /> {t("assignee")}:
                        </div>
                        <select value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)}>
                            <option value="all">{t("all")}</option>
                            {staff.map((person) => (
                                <option key={person.id} value={person.id.toString()}>
                                    {person.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {view === "calendar" ? (
                    <div className="calendar-container">
                        <TaskCalendar tasks={filteredTasks} currentDate={currentDate} onTaskClick={handleViewTask} />
                    </div>
                ) : (
                    <div className="tasks-list-container">
                        <h2 className="section-title">{t("tasks_list")}</h2>
                        {filteredTasks.length > 0 ? (
                            <div className="tasks-list">
                                {filteredTasks.map((task) => (
                                    <div key={task.id} className="task-card" onClick={() => handleViewTask(task)}>
                                        <div className="task-header">
                                            <h3 className="task-title">{task.title}</h3>
                                            <div className={`status-badge ${task.status}`}>
                                                {task.status === "completed" && t("completed")}
                                                {task.status === "in-progress" && t("in_progress")}
                                                {task.status === "pending" && t("pending")}
                                            </div>
                                        </div>
                                        <div className="task-details">
                                            <div className="task-date">
                                                <FaCalendarAlt />
                                                <span>
                                                    {task.startDate.toLocaleDateString()}{" "}
                                                    {task.startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                </span>
                                            </div>
                                            <div className="task-assignee">
                                                <FaUser />
                                                <span>{task.assignee.name}</span>
                                            </div>
                                            <div className={`priority-badge ${task.priority}-priority`}>{t(task.priority)}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-tasks-message">
                                <FaTasks />
                                <p>{t("no_tasks_found")}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {showTaskForm && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <TaskForm
                            task={selectedTask}
                            staff={staff}
                            onSubmit={handleTaskSubmit}
                            onCancel={() => setShowTaskForm(false)}
                        />
                    </div>
                </div>
            )}

            {showTaskDetails && selectedTask && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <TaskDetails
                            task={selectedTask}
                            onClose={() => setShowTaskDetails(false)}
                            onEdit={() => handleEditTask(selectedTask)}
                            onDelete={() => handleDeleteTask(selectedTask.id)}
                            onStatusChange={(newStatus) => handleStatusChange(selectedTask.id, newStatus)}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

