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
} from "react-icons/fa"
import { useAuth } from "../../../contexts/AuthContext"
import { useLanguage } from "../../../contexts/LanguageContext"
import TaskCalendar from "../../commonTasks/taskCalendar/TaskCalendar"
import TaskForm from "../../commonTasks/taskForm/TaskForm"
import TaskDetails from "../../commonTasks/taskDetails/TaskDetails"
import DayTasksList from "../../commonTasks/DayTasksList/DayTasksList"

export default function Tasks() {
    const { user, selectedBranch } = useAuth()
    const { t } = useLanguage()
    const [loading, setLoading] = useState(true)
    const [view, setView] = useState("month") // month, week, day, year, list
    const [currentDate, setCurrentDate] = useState(new Date())
    const [showTaskForm, setShowTaskForm] = useState(false)
    const [showTaskDetails, setShowTaskDetails] = useState(false)
    const [showDayTasks, setShowDayTasks] = useState(false)
    const [selectedDay, setSelectedDay] = useState(null)
    const [selectedTask, setSelectedTask] = useState(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [priorityFilter, setPriorityFilter] = useState("all")
    const [assigneeFilter, setAssigneeFilter] = useState("all")
    const [tasks, setTasks] = useState([])
    const [staff, setStaff] = useState([])
    const [showFilters, setShowFilters] = useState(false)
    const [newTaskDate, setNewTaskDate] = useState(null)
    const [selectedMonthTasks, setSelectedMonthTasks] = useState([])
    const [isMonthView, setIsMonthView] = useState(false)

    useEffect(() => {
        setLoading(true)

        // Simulate API call to fetch tasks
        setTimeout(() => {
            // Mock tasks data
            const mockTasks = [
                {
                    id: 1,
                    title: "Yangi tibbiy jihozlarni tekshirish",
                    description: "Kardiologiya bo'limi uchun yangi kelgan jihozlarni tekshirish va o'rnatish",
                    startDate: new Date(2023, 4, 18, 10, 0),
                    endDate: new Date(2023, 4, 18, 12, 0),
                    status: "pending",
                    priority: "high",
                    assignee: {
                        id: 101,
                        name: "Dr. Aziz Karimov",
                        role: "doctor",
                    },
                    createdBy: {
                        id: 1,
                        name: "Sardor Alimov",
                        role: "director",
                    },
                    createdAt: new Date(2023, 4, 15),
                },
                {
                    id: 2,
                    title: "Xodimlar yig'ilishi",
                    description: "Yangi klinika qoidalari va tartiblarini muhokama qilish",
                    startDate: new Date(2023, 4, 19, 14, 0),
                    endDate: new Date(2023, 4, 19, 15, 30),
                    status: "pending",
                    priority: "medium",
                    assignee: {
                        id: 102,
                        name: "Malika Umarova",
                        role: "admin",
                    },
                    createdBy: {
                        id: 1,
                        name: "Sardor Alimov",
                        role: "director",
                    },
                    createdAt: new Date(2023, 4, 16),
                },
                {
                    id: 3,
                    title: "Yangi hamshiralar bilan suhbat",
                    description: "Yangi ishga olingan hamshiralar bilan tanishish va ularning vazifalarini tushuntirish",
                    startDate: new Date(2023, 4, 20, 11, 0),
                    endDate: new Date(2023, 4, 20, 12, 0),
                    status: "completed",
                    priority: "medium",
                    assignee: {
                        id: 103,
                        name: "Nilufar Rahimova",
                        role: "nurse",
                    },
                    createdBy: {
                        id: 1,
                        name: "Sardor Alimov",
                        role: "director",
                    },
                    createdAt: new Date(2023, 4, 17),
                },
                {
                    id: 4,
                    title: "Moliyaviy hisobotni tayyorlash",
                    description: "O'tgan oyning moliyaviy hisobotini tayyorlash va taqdim etish",
                    startDate: new Date(2023, 4, 21, 9, 0),
                    endDate: new Date(2023, 4, 21, 17, 0),
                    status: "in-progress",
                    priority: "high",
                    assignee: {
                        id: 104,
                        name: "Jasur Toshmatov",
                        role: "admin",
                    },
                    createdBy: {
                        id: 1,
                        name: "Sardor Alimov",
                        role: "director",
                    },
                    createdAt: new Date(2023, 4, 18),
                },
                {
                    id: 5,
                    title: "Yangi shifokorlar bilan suhbat",
                    description: "Yangi ishga olingan shifokorlar bilan tanishish va ularning vazifalarini tushuntirish",
                    startDate: new Date(2023, 4, 22, 13, 0),
                    endDate: new Date(2023, 4, 22, 15, 0),
                    status: "pending",
                    priority: "medium",
                    assignee: {
                        id: 105,
                        name: "Dilshod Karimov",
                        role: "doctor",
                    },
                    createdBy: {
                        id: 1,
                        name: "Sardor Alimov",
                        role: "director",
                    },
                    createdAt: new Date(2023, 4, 19),
                },
                // Qo'shimcha vazifalar - boshqa oylar uchun
                {
                    id: 6,
                    title: "Yangi yil tadbiri rejasi",
                    description: "Klinika xodimlari uchun yangi yil tadbirini rejalashtirish",
                    startDate: new Date(2023, 11, 15, 10, 0), // Dekabr
                    endDate: new Date(2023, 11, 15, 12, 0),
                    status: "pending",
                    priority: "medium",
                    assignee: {
                        id: 102,
                        name: "Malika Umarova",
                        role: "admin",
                    },
                    createdBy: {
                        id: 1,
                        name: "Sardor Alimov",
                        role: "director",
                    },
                    createdAt: new Date(2023, 11, 1),
                },
                {
                    id: 7,
                    title: "Yanvar oyi hisoboti",
                    description: "Yanvar oyi uchun klinika faoliyati hisobotini tayyorlash",
                    startDate: new Date(2023, 0, 25, 9, 0), // Yanvar
                    endDate: new Date(2023, 0, 25, 17, 0),
                    status: "completed",
                    priority: "high",
                    assignee: {
                        id: 104,
                        name: "Jasur Toshmatov",
                        role: "admin",
                    },
                    createdBy: {
                        id: 1,
                        name: "Sardor Alimov",
                        role: "director",
                    },
                    createdAt: new Date(2023, 0, 20),
                },
                {
                    id: 8,
                    title: "Mart bayram tadbiri",
                    description: "8-mart xalqaro xotin-qizlar kuni munosabati bilan tadbir o'tkazish",
                    startDate: new Date(2023, 2, 7, 14, 0), // Mart
                    endDate: new Date(2023, 2, 7, 16, 0),
                    status: "pending",
                    priority: "medium",
                    assignee: {
                        id: 103,
                        name: "Nilufar Rahimova",
                        role: "nurse",
                    },
                    createdBy: {
                        id: 1,
                        name: "Sardor Alimov",
                        role: "director",
                    },
                    createdAt: new Date(2023, 2, 1),
                },
            ]

            // Mock staff data - Direktor barcha xodimlarni ko'ra oladi
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
                {
                    id: 105,
                    name: "Dilshod Karimov",
                    role: "doctor",
                    department: "Nevrologiya",
                },
                {
                    id: 106,
                    name: "Zarina Aliyeva",
                    role: "nurse",
                    department: "Kardiologiya",
                },
                {
                    id: 107,
                    name: "Gulnora Karimova",
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

        // Assignee filter
        const matchesAssignee = assigneeFilter === "all" || task.assignee.id.toString() === assigneeFilter

        return matchesSearch && matchesStatus && matchesPriority && matchesAssignee
    })

    // Navigate to previous month/week/day
    const handlePrevious = () => {
        const newDate = new Date(currentDate)
        if (view === "month") {
            newDate.setMonth(newDate.getMonth() - 1)
        } else if (view === "week") {
            newDate.setDate(newDate.getDate() - 7)
        } else if (view === "day") {
            newDate.setDate(newDate.getDate() - 1)
        } else if (view === "year") {
            newDate.setFullYear(newDate.getFullYear() - 1)
        } else {
            newDate.setDate(newDate.getDate() - 7)
        }
        setCurrentDate(newDate)
    }

    // Navigate to next month/week/day
    const handleNext = () => {
        const newDate = new Date(currentDate)
        if (view === "month") {
            newDate.setMonth(newDate.getMonth() + 1)
        } else if (view === "week") {
            newDate.setDate(newDate.getDate() + 7)
        } else if (view === "day") {
            newDate.setDate(newDate.getDate() + 1)
        } else if (view === "year") {
            newDate.setFullYear(newDate.getFullYear() + 1)
        } else {
            newDate.setDate(newDate.getDate() + 7)
        }
        setCurrentDate(newDate)
    }

    // Go to today
    const goToToday = () => {
        setCurrentDate(new Date())
    }

    // Format date for display
    const formatDateRange = () => {
        if (view === "month") {
            const options = { month: "long", year: "numeric" }
            return new Intl.DateTimeFormat(navigator.language, options).format(currentDate)
        } else if (view === "week") {
            const startOfWeek = new Date(currentDate)
            let dayOfWeek = currentDate.getDay()
            if (dayOfWeek === 0) dayOfWeek = 7
            const diff = 1 - dayOfWeek
            startOfWeek.setDate(currentDate.getDate() + diff)

            const endOfWeek = new Date(startOfWeek)
            endOfWeek.setDate(startOfWeek.getDate() + 6)

            return `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`
        } else if (view === "day") {
            return currentDate.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })
        } else if (view === "year") {
            return currentDate.getFullYear().toString()
        } else {
            return t("tasks_list")
        }
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
        setNewTaskDate(null)
        setShowTaskForm(true)
        setShowTaskDetails(false)
    }

    // Open task details modal
    const handleViewTask = (task) => {
        if (!task) return

        setSelectedTask({ ...task })
        setShowTaskDetails(true)
        setShowDayTasks(false)
    }

    // Handle month click in year view
    const handleMonthClick = (month) => {
        if (!month || !month.date) return

        // Create a new date object to avoid reference issues
        const monthDate = new Date(month.date)

        // Set the current date
        setCurrentDate(monthDate)

        // Oyning vazifalarini olish
        const monthTasks = tasks.filter((task) => {
            if (!task || !task.startDate) return false

            const taskDate = new Date(task.startDate)
            return taskDate.getMonth() === monthDate.getMonth() && taskDate.getFullYear() === monthDate.getFullYear()
        })

        // Oy ma'lumotlarini saqlash
        setSelectedDay({
            date: monthDate,
            isMonth: true,
            monthName: monthDate.toLocaleString("default", { month: "long" }),
            year: monthDate.getFullYear(),
        })

        setSelectedMonthTasks(monthTasks)
        setIsMonthView(true)
        setShowDayTasks(true)

        // Oyni tanlagandan so'ng, ko'rinishni oylik ko'rinishga o'zgartirish
        setView("month")
    }

    // Handle day click in calendar
    const handleDayClick = (day) => {
        if (!day) return

        // Agar yillik ko'rinishda oy bosilgan bo'lsa
        if (view === "year") {
            handleMonthClick(day)
            return
        }

        // Create a new date object to avoid reference issues
        const dayDate = new Date(day.date)

        // Oddiy kun uchun vazifalarni olish
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

        setSelectedMonthTasks([])
        setIsMonthView(false)
        setShowDayTasks(true)
    }

    // Handle task form submission
    const handleTaskSubmit = (taskData) => {
        if (selectedTask && selectedTask.id) {
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

    // Toggle filters visibility
    const toggleFilters = () => {
        setShowFilters(!showFilters)
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
        <div className="director-tasks">
            <div className="tasks-container">
                <div className="tasks-header">
                    <div className="header-left">
                        <button className="today-btn" onClick={goToToday}>
                            {t("today")}
                        </button>
                        <div className="navigation-buttons">
                            <button className="nav-btn" onClick={handlePrevious}>
                                <FaChevronLeft />
                            </button>
                            <button className="nav-btn" onClick={handleNext}>
                                <FaChevronRight />
                            </button>
                        </div>
                        <h2 className="current-date-title">{formatDateRange()}</h2>
                    </div>

                    <div className="header-right">
                        <div className="search-box">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder={t("search_tasks")}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <button className="filter-btn" onClick={toggleFilters}>
                            <FaFilter />
                        </button>

                        <div className="view-buttons">
                            <button className={`view-btn ${view === "day" ? "active" : ""}`} onClick={() => setView("day")}>
                                {t("day")}
                            </button>
                            <button className={`view-btn ${view === "week" ? "active" : ""}`} onClick={() => setView("week")}>
                                {t("week")}
                            </button>
                            <button className={`view-btn ${view === "month" ? "active" : ""}`} onClick={() => setView("month")}>
                                {t("month")}
                            </button>
                            <button className={`view-btn ${view === "year" ? "active" : ""}`} onClick={() => setView("year")}>
                                {t("year")}
                            </button>
                        </div>

                        <button className={`list-view-btn ${view === "list" ? "active" : ""}`} onClick={() => setView("list")}>
                            <FaListUl />
                            {t("list_view")}
                        </button>

                        <div className="header-actions">
                            <button className="create-btn" onClick={() => handleAddTask()}>
                                <FaPlus />
                            </button>
                        </div>
                    </div>
                </div>

                {showFilters && (
                    <div className="filters-panel">
                        <div className="filter-group">
                            <label>{t("status")}:</label>
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                <option value="pending">{t("pending")}</option>
                                <option value="in-progress">{t("in_progress")}</option>
                                <option value="completed">{t("completed")}</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>{t("priority")}:</label>
                            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                                <option value="all">{t("all")}</option>
                                <option value="high">{t("high")}</option>
                                <option value="medium">{t("medium")}</option>
                                <option value="low">{t("low")}</option>
                            </select>
                        </div>

                        <div className="filter-group">
                            <label>{t("assignee")}:</label>
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
                )}

                {view !== "list" ? (
                    <div className="calendar-container">
                        <TaskCalendar
                            tasks={filteredTasks}
                            currentDate={currentDate}
                            view={view}
                            onTaskClick={handleViewTask}
                            onDayClick={handleDayClick}
                            onMonthClick={handleMonthClick}
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
                            canAssignToAll={true} // Direktor ham barcha xodimlarga vazifalarni belgilashi mumkin
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

            {showDayTasks && selectedDay && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <DayTasksList
                            day={selectedDay}
                            tasks={
                                isMonthView
                                    ? selectedMonthTasks
                                    : tasks.filter((task) => {
                                        if (!task || !task.startDate) return false

                                        const taskDate = new Date(task.startDate)
                                        return (
                                            taskDate.getDate() === selectedDay.date.getDate() &&
                                            taskDate.getMonth() === selectedDay.date.getMonth() &&
                                            taskDate.getFullYear() === selectedDay.date.getFullYear()
                                        )
                                    })
                            }
                            isMonthView={isMonthView}
                            onClose={() => {
                                setShowDayTasks(false)
                                setIsMonthView(false)
                            }}
                            onTaskClick={handleViewTask}
                            onAddTask={() => {
                                setShowDayTasks(false)
                                setIsMonthView(false)
                                handleAddTask(selectedDay.date)
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

