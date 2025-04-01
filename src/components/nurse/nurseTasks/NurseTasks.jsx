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

export default function NurseTasks() {
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
    const [tasks, setTasks] = useState([])
    const [staff, setStaff] = useState([])
    const [newTaskDate, setNewTaskDate] = useState(null)
    const [selectedDay, setSelectedDay] = useState(null)

    useEffect(() => {
        setLoading(true)

        // Simulate API call to fetch tasks
        setTimeout(() => {
            // Mock tasks data for nurse
            const mockTasks = [
                {
                    id: 1,
                    title: "Bemorning haroratini o'lchash",
                    description: "Alisher Karimov, 101-xona, har 4 soatda haroratini o'lchash",
                    startDate: new Date(2023, 4, 18, 8, 0),
                    endDate: new Date(2023, 4, 18, 8, 15),
                    status: "completed",
                    priority: "medium",
                    assignee: {
                        id: 103,
                        name: "Nilufar Rahimova",
                        role: "nurse",
                    },
                    createdBy: {
                        id: 103,
                        name: "Nilufar Rahimova",
                        role: "nurse",
                    },
                    createdAt: new Date(2023, 4, 17),
                },
                {
                    id: 2,
                    title: "Dori-darmonlarni tarqatish",
                    description: "Ertalabki dori-darmonlarni bemorlarni tarqatish",
                    startDate: new Date(2023, 4, 18, 9, 0),
                    endDate: new Date(2023, 4, 18, 10, 0),
                    status: "completed",
                    priority: "high",
                    assignee: {
                        id: 103,
                        name: "Nilufar Rahimova",
                        role: "nurse",
                    },
                    createdBy: {
                        id: 103,
                        name: "Nilufar Rahimova",
                        role: "nurse",
                    },
                    createdAt: new Date(2023, 4, 17, 8, 0),
                },
                {
                    id: 3,
                    title: "Jarohatni bog'lash",
                    description: "Rustam Khasanov, 201-xona, jarohatni bog'lash va tozalash",
                    startDate: new Date(2023, 4, 18, 11, 0),
                    endDate: new Date(2023, 4, 18, 11, 30),
                    status: "in-progress",
                    priority: "medium",
                    assignee: {
                        id: 103,
                        name: "Nilufar Rahimova",
                        role: "nurse",
                    },
                    createdBy: {
                        id: 101,
                        name: "Dr. Aziz Karimov",
                        role: "doctor",
                    },
                    createdAt: new Date(2023, 4, 17, 15, 0),
                },
                {
                    id: 4,
                    title: "Bemorlarni ovqatlantirish",
                    description: "Tushlik vaqtida bemorlarni ovqatlantirish",
                    startDate: new Date(2023, 4, 18, 12, 0),
                    endDate: new Date(2023, 4, 18, 13, 0),
                    status: "pending",
                    priority: "medium",
                    assignee: {
                        id: 103,
                        name: "Nilufar Rahimova",
                        role: "nurse",
                    },
                    createdBy: {
                        id: 103,
                        name: "Nilufar Rahimova",
                        role: "nurse",
                    },
                    createdAt: new Date(2023, 4, 17, 9, 0),
                },
                {
                    id: 5,
                    title: "Yangi bemorni joylashtirish",
                    description: "Yangi kelgan bemorni 202-xonaga joylashtirish va ko'rsatmalarni tushuntirish",
                    startDate: new Date(2023, 4, 18, 14, 0),
                    endDate: new Date(2023, 4, 18, 14, 30),
                    status: "pending",
                    priority: "high",
                    assignee: {
                        id: 103,
                        name: "Nilufar Rahimova",
                        role: "nurse",
                    },
                    createdBy: {
                        id: 102,
                        name: "Malika Umarova",
                        role: "admin",
                    },
                    createdAt: new Date(2023, 4, 17, 16, 0),
                },
            ]

            // Mock staff data - Hamshira faqat o'zini ko'radi
            const mockStaff = [
                {
                    id: 103,
                    name: "Nilufar Rahimova",
                    role: "nurse",
                    department: "Kardiologiya",
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

        return matchesSearch && matchesStatus && matchesPriority
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
            let dayOfWeek = currentDate.getDay()
            if (dayOfWeek === 0) dayOfWeek = 7
            const diff = 1 - dayOfWeek
            startOfWeek.setDate(currentDate.getDate() + diff)

            const endOfWeek = new Date(startOfWeek)
            endOfWeek.setDate(startOfWeek.getDate() + 6)

            return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`
        }
    }

    // Go to today
    const goToToday = () => {
        setCurrentDate(new Date())
    }

    // Open task form for creating a new task
    const handleAddTask = (date = null) => {
        setSelectedTask(null)
        setNewTaskDate(date ? new Date(date) : null)
        setShowTaskForm(true)
    }

    // Open task form for editing an existing task
    const handleEditTask = (task) => {
        setSelectedTask({ ...task })
        setShowTaskForm(true)
        setShowTaskDetails(false)
    }

    // Open task details modal
    const handleViewTask = (task) => {
        if (!task) return
        setSelectedTask({ ...task })
        setShowTaskDetails(true)
    }

    // Handle day click in calendar
    const handleDayClick = (day) => {
        if (!day) return

        // Create a new date object to avoid reference issues
        const dayDate = new Date(day.date)

        // Get tasks for the selected day
        const dayTasks = tasks.filter((task) => {
            if (!task || !task.startDate) return false

            const taskDate = new Date(task.startDate)
            return (
                taskDate.getDate() === dayDate.getDate() &&
                taskDate.getMonth() === dayDate.getMonth() &&
                taskDate.getFullYear() === dayDate.getFullYear()
            )
        })

        setSelectedDay({
            date: dayDate,
            isCurrentMonth: day.isCurrentMonth,
            isToday: day.isToday,
            tasks: dayTasks,
        })

        // Open add task form with selected date
        handleAddTask(dayDate)
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
        setNewTaskDate(null)
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
        <div className="nurse-tasks">
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
                        <button className="today-btn btn-sm" onClick={goToToday}>
                            {t("today")}
                        </button>
                    </div>

                    <div className="task-actions">
                        <button className="btn-primary" onClick={() => handleAddTask()}>
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
                </div>

                {view === "calendar" ? (
                    <div className="calendar-container">
                        <TaskCalendar
                            tasks={filteredTasks}
                            currentDate={currentDate}
                            view="month"
                            onTaskClick={handleViewTask}
                            onDayClick={handleDayClick}
                        />
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
                            initialDate={newTaskDate}
                            onSubmit={handleTaskSubmit}
                            onCancel={() => {
                                setShowTaskForm(false)
                                setNewTaskDate(null)
                            }}
                            canAssignToSelf={true} // Hamshira faqat o'ziga vazifa beradi
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