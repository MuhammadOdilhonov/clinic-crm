import client from "./apiService"

// Qabullarni olish
export const fetchAppointments = async (params = {}) => {
    try {
        const queryParams = new URLSearchParams()

        // Parametrlarni qo'shish
        Object.keys(params).forEach((key) => {
            if (params[key] !== undefined && params[key] !== null && params[key] !== "") {
                queryParams.append(key, params[key])
            }
        })

        const queryString = queryParams.toString() ? `?${queryParams.toString()}` : ""
        const response = await client.get(`/meetings/${queryString}`)
        return response.data
    } catch (error) {
        console.error("Qabullarni olishda xatolik:", error)
        throw error
    }
}

// Bitta qabulni ID bo'yicha olish
export const fetchAppointmentById = async (id) => {
    try {
        const response = await client.get(`/meetings/${id}/`)
        return response.data
    } catch (error) {
        console.error("Qabulni olishda xatolik:", error)
        throw error
    }
}

// Filtrlar uchun ma'lumotlarni olish (bemorlar, shifokorlar, xonalar)
export const fetchFilterData = async (branchId) => {
    try {
        const response = await client.get(`/meetings-filter/?branch_id=${branchId}`)
        return response.data
    } catch (error) {
        console.error("Filtr ma'lumotlarini olishda xatolik:", error)
        throw error
    }
}

// Band vaqtlarni olish
export const fetchBusyTimes = async (params) => {
    try {
        const { branchId, doctorId, cabinetId, date } = params
        const queryParams = new URLSearchParams()

        if (branchId) queryParams.append("branch_id", branchId)
        if (doctorId) queryParams.append("doctor_id", doctorId)
        if (cabinetId) queryParams.append("cabinet_id", cabinetId)
        if (date) queryParams.append("date", date)

        const queryString = queryParams.toString()
        const response = await client.get(`/meetings-filter/?${queryString}`)
        return response.data.busy_times || []
    } catch (error) {
        console.error("Band vaqtlarni olishda xatolik:", error)
        return []
    }
}

// Yangi qabul yaratish
export const createAppointment = async (appointmentData) => {
    try {
        const response = await client.post("/meetings/", appointmentData)
        return response.data
    } catch (error) {
        console.error("Qabul yaratishda xatolik:", error)
        throw error
    }
}

// Qabulni yangilash
export const updateAppointment = async (id, appointmentData) => {
    try {
        const response = await client.patch(`/meetings/${id}/`, appointmentData)
        return response.data
    } catch (error) {
        console.error("Qabulni yangilashda xatolik:", error)
        throw error
    }
}

// Add a new function to update only the appointment status
export const updateAppointmentStatus = async (id, status) => {
    try {
        const response = await client.patch(`/meetings/${id}/`, { status })
        return response.data
    } catch (error) {
        console.error("Qabul holatini yangilashda xatolik:", error)
        throw error
    }
}

// Qabulni o'chirish
export const deleteAppointment = async (id) => {
    try {
        const response = await client.delete(`/meetings/${id}/`)
        return response.data
    } catch (error) {
        console.error("Qabulni o'chirishda xatolik:", error)
        throw error
    }
}

// Add these new functions for daily and weekly meetings

// Get daily meetings
export const fetchDailyMeetings = async (date) => {
    try {
        const response = await client.get(`/meetings/daily_meetings/?date=${date}`)
        return response.data
    } catch (error) {
        console.error("Kunlik qabullarni olishda xatolik:", error)
        throw error
    }
}

// Get weekly meetings
export const fetchWeeklyMeetings = async (date) => {
    try {
        const response = await client.get(`/meetings/weekly_meetings/?date=${date}`)
        return response.data
    } catch (error) {
        console.error("Haftalik qabullarni olishda xatolik:", error)
        throw error
    }
}

// Update the appointment with diagnosis and organs data
export const updateAppointmentWithDiagnosis = async (appointmentId, data) => {
    try {
        // Check if data is FormData
        if (data instanceof FormData) {
            // Use the client instance which already has the correct base URL and headers
            const response = await client.patch(`/meetings/${appointmentId}/`, data, {
                headers: {
                    // Don't set Content-Type when using FormData, the browser will set it automatically
                    "Content-Type": undefined,
                },
            })
            return response.data
        } else {
            // Regular JSON data
            const response = await client.patch(`/meetings/${appointmentId}/`, data)
            return response.data
        }
    } catch (error) {
        console.error("Error updating appointment with diagnosis:", error)
        throw error
    }
}

// Update the default export to include the new functions
export default {
    fetchAppointments,
    fetchAppointmentById,
    fetchFilterData,
    fetchBusyTimes,
    createAppointment,
    updateAppointment,
    updateAppointmentStatus,
    deleteAppointment,
    fetchDailyMeetings,
    fetchWeeklyMeetings,
    updateAppointmentWithDiagnosis,
}
