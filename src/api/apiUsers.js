import client from "./apiService"

// API endpoints
const USERS_ENDPOINT = "/users/"

// Get all users with optional pagination and filtering
const fetchUsers = async (page = 1, limit = 10, filters = {}) => {
    try {
        // Build query parameters
        const queryParams = new URLSearchParams()

        // Add pagination params
        queryParams.append("page", page)
        queryParams.append("page_size", limit)

        // Add filters if provided
        if (filters.branch && filters.branch !== "all") {
            queryParams.append("branch_id", filters.branch)
        }

        if (filters.role && filters.role !== "all") {
            queryParams.append("role", filters.role)
        }

        if (filters.status && filters.status !== "all") {
            queryParams.append("status", filters.status)
        }

        if (filters.search) {
            queryParams.append("search", filters.search)
        }

        const response = await client.get(`${USERS_ENDPOINT}?${queryParams.toString()}`)
        return response.data
    } catch (error) {
        console.error("Error fetching users:", error)
        throw error
    }
}

// Get a single user by ID
const fetchUserById = async (userId) => {
    try {
        const response = await client.get(`${USERS_ENDPOINT}${userId}/`)
        return response.data
    } catch (error) {
        console.error(`Error fetching user with ID ${userId}:`, error)
        throw error
    }
}

// Create a new user
const createUser = async (userData) => {
    try {
        const response = await client.post(USERS_ENDPOINT, userData)
        return response.data
    } catch (error) {
        console.error("Error creating user:", error)
        throw error
    }
}

// Update an existing user
const updateUser = async (userId, userData) => {
    try {
        const response = await client.patch(`${USERS_ENDPOINT}${userId}/`, userData)
        return response.data
    } catch (error) {
        console.error(`Error updating user with ID ${userId}:`, error)
        throw error
    }
}

// Delete a user
const deleteUser = async (userId) => {
    try {
        const response = await client.delete(`${USERS_ENDPOINT}${userId}/`)
        return response.data
    } catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error)
        throw error
    }
}

// Export all functions
const apiUsers = {
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
}

export default apiUsers
