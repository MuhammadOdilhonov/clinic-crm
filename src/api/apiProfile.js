import client from "./apiService"

// Get user profile data
const fetchUserProfile = async (userId) => {
    try {
        const response = await client.get(`/users/${userId}/`)
        return response.data
    } catch (error) {
        console.error(`Error fetching user profile with ID ${userId}:`, error)
        throw error
    }
}

// Update user profile
const updateUserProfile = async (userId, profileData) => {
    try {
        const response = await client.patch(`/users/${userId}/`, profileData)
        return response.data
    } catch (error) {
        console.error(`Error updating user profile with ID ${userId}:`, error)
        throw error
    }
}

// Change password
const changePassword = async (passwordData) => {
    try {
        const response = await client.post("/users/change-password/", passwordData)
        return response.data
    } catch (error) {
        console.error("Error changing password:", error)
        throw error
    }
}

// Export all functions
const apiProfile = {
    fetchUserProfile,
    updateUserProfile,
    changePassword,
}

export default apiProfile
