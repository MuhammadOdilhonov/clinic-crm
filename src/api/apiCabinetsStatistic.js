import client from "./apiService"

// Get cabinet statistics (all branches or filtered by branch)
export const getCabinetStatistics = async (queryString = "") => {
    try {
        const response = await client.get(`/cabinet-statistics/${queryString}`)
        return response.data
    } catch (error) {
        console.error("Error fetching cabinet statistics:", error)
        throw error
    }
}

// Export all functions
export default {
    getCabinetStatistics,
}
