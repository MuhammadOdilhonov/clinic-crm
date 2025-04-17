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
        const response = await client.put(`/meetings/${id}/`, appointmentData)
        return response.data
    } catch (error) {
        console.error("Qabulni yangilashda xatolik:", error)
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

export default {
    fetchAppointments,
    fetchAppointmentById,
    fetchFilterData,
    fetchBusyTimes,
    createAppointment,
    updateAppointment,
    deleteAppointment,
}
