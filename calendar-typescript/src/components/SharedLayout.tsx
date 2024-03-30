import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export const SharedLayout: React.FC = () => {
  return (
    <div>
        <Navbar />
        <div className="flex justify-center">
          <Outlet />
        </div>
    </div>
  )
}
