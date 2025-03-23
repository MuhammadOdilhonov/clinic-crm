"use client"

import { createContext, useContext, useState, useEffect } from "react"

// Create auth context
const AuthContext = createContext()

// Auth provider component
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [selectedBranch, setSelectedBranch] = useState("all")

    useEffect(() => {
        // Set loading to true at the beginning
        setLoading(true)

        // Check if user is logged in from localStorage
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser)
                setUser(parsedUser)
            } catch (error) {
                console.error("Error parsing user data:", error)
                localStorage.removeItem("user") // Remove invalid data
                setUser(null)
            }
        } else {
            setUser(null)
        }

        // Check if branch is stored in localStorage
        const storedBranch = localStorage.getItem("selectedBranch")
        if (storedBranch) {
            setSelectedBranch(storedBranch)
        }

        // Set loading to false after everything is done
        setLoading(false)
    }, [])

    // Login function
    const login = (userData) => {
        try {
            // In a real app, you would validate credentials with an API
            // For demo, we'll just store the user data in localStorage
            setUser(userData)
            localStorage.setItem("user", JSON.stringify(userData))
            return Promise.resolve(userData)
        } catch (error) {
            console.error("Login error:", error)
            return Promise.reject(error)
        }
    }

    // Logout function
    const logout = () => {
        setUser(null)
        localStorage.removeItem("user")
    }

    // Check user role
    const hasRole = (role) => {
        return user && user.role === role
    }

    // Change branch
    const changeBranch = (branch) => {
        setSelectedBranch(branch)
        localStorage.setItem("selectedBranch", branch)
    }

    // Context value
    const value = {
        user,
        loading,
        login,
        logout,
        hasRole,
        selectedBranch,
        changeBranch,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
    return useContext(AuthContext)
}

