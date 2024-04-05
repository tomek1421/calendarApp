import React from 'react'
import { useAuth } from './Context'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const Navbar: React.FC = () => {

    const context = useAuth();

    const navigate = useNavigate()

    function handleLogout() {
        localStorage.removeItem("token")
        context.logout()
        navigate('/login')
    }
    console.log(context.isAuthenticated)
    return (
        <div className="navbar">
            <div className="flex gap-[2rem] a">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/register">Sign-up</NavLink>
                { !context.isAuthenticated.auth ? <NavLink to="/login">Login</NavLink> : <button onClick={handleLogout} >Logout</button> }
            </div>
            { context.isAuthenticated.username == "Admin" ? <button onClick={() => navigate('/admin')}>{context.isAuthenticated.username}</button> : <div>{context.isAuthenticated.username}</div>}
        </div>
    )
}