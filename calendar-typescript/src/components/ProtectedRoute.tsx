import React, { ReactNode } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "./Context"

interface MyComponentProps {
    children: ReactNode;
  }

export const ProtectedRoute: React.FC = () => {
    const auth = useAuth().isAuthenticated.auth
    if (!auth) {
        return <Navigate to="/login" />
    }

    return <Outlet />
}