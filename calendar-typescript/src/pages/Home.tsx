import React from 'react'
import { Calendar } from '../components/Calendar'
import { useAuth } from '../components/Context'
import { Unauthorized } from '../components/Unauthotized'

export const Home: React.FC = () => {
  const context = useAuth()
  
  return (
    <div>
        {context.isAuthenticated.auth ? <Calendar/> : <Unauthorized />}
    </div>
  )
}
