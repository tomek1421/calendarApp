import React from 'react'
import { Outlet } from 'react-router-dom'

export const SharedLayout: React.FC = () => {
  return (
    <div className="flex justify-center">
        <Outlet />
    </div>
  )
}
