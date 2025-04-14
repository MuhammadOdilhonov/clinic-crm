import client, { BaseUrl } from "./apiService"

class ApiBranches {
    // Fetch all branches
    async fetchBranches() {
        const branchesEndpoint = `${BaseUrl}/branches/`

        try {
            const response = await client.get(branchesEndpoint)
            return response.data
        } catch (error) {
            console.error("Filiallarni olishda xatolik:", error)
            throw error
        }
    }

    // Fetch a specific branch by ID
    async fetchBranchById(branchId) {
        const branchEndpoint = `${BaseUrl}/branches/${branchId}/`

        try {
            const response = await client.get(branchEndpoint)
            return response.data
        } catch (error) {
            console.error(`${branchId} ID li filialni olishda xatolik:`, error)
            throw error
        }
    }

    // Update branch data
    async updateBranch(branchId, branchData) {
        const branchEndpoint = `${BaseUrl}/branches/${branchId}/`

        try {
            const response = await client.put(branchEndpoint, branchData)
            return response.data
        } catch (error) {
            console.error(`${branchId} ID li filialni yangilashda xatolik:`, error)
            throw error
        }
    }
}

export default new ApiBranches()
