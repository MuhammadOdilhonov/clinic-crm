import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { LanguageProvider } from "./contexts/LanguageContext"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import SignUp from "./pages/signUp/SignUp"
import RequestAccess from "./pages/requestAccess/RequestAccess"
import Dashboard from "./pages/dashboard/Dashboard"
import NotFound from "./pages/notFount/NotFount"
import "./styles/styles.scss"

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/request-access" element={<RequestAccess />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App;