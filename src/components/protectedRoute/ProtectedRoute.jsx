"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, loading } = useAuth()

    // Agar loading bo'lsa, hech narsa ko'rsatmaymiz
    if (loading) {
        return <div className="loading">Yuklanmoqda...</div>
    }

    // Agar foydalanuvchi tizimga kirmagan bo'lsa, login sahifasiga yo'naltiramiz
    if (!isAuthenticated()) {
        return <Navigate to="/login" replace />
    }

    // Agar foydalanuvchi tizimga kirgan bo'lsa, children ni ko'rsatamiz
    return children
}

