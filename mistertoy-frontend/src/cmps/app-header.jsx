// import { userService } from '../services/user.service.js'
// import { LoginSignup } from './login-signup.jsx'
// import { SET_USER } from '../store/user.reducer.js'
// import { logout } from '../store/user.action.js'
// import { LoginSignup } from './login-signup.jsx'


// const { useState } = React
// const { NavLink } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux

// import { userService } from '../services/user.service.js'
// import { SET_USER } from '../store/user.reducer.js'
// import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../store/user.action.js'
// const { useState } = React
// import { TOGGLE_CART_SHOWN } from '../store/car.reducer.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

// import { LoginSignup } from './login-signup.jsx'
import logoImg from "../assets/img/logo.png"
export function AppHeader() {

    // TODO: get from storeState
    // const [user, setUser] = useState(userService.getLoggedinUser())
    const user = useSelector((storeState => storeState.userModule.user))
    // const [user, setUser] = useState(userService.getLoggedinUser())

    const dispatch = useDispatch()


    // function setUser(user) {
    //     dispatch({ type: SET_USER, user })
    // }

    async function onLogout() {
        try{
            toggleMenu()
            await logout()
            showSuccessMsg('Successfully logged out')
        } catch {
            showErrorMsg('Failed to logout')
        }
            // .then(() => {
            //     setUser(null)
            // })
    }

    // function onToggleCart(ev) {
    //     ev.preventDefault()
    //     dispatch({ type: TOGGLE_CART_SHOWN })
    // }

    function toggleMenu() {
        document.body.classList.toggle('menu-open')
    }

    return (
        <header className="app-header full main-layout">

            <NavLink to="/toy">
                <img src={logoImg} />
            </NavLink>

            <nav>
                <NavLink to="/" className="button" onClick={toggleMenu}>Home</NavLink>
                <NavLink to="/toy" className="button" onClick={toggleMenu}>Toys</NavLink>
                <NavLink to="/review" className="button" onClick={toggleMenu}>Reviews</NavLink>
                <NavLink to="/dashboard" className="button" onClick={toggleMenu}>Dashboard</NavLink>
                <NavLink to="/about" className="button" onClick={toggleMenu}>About</NavLink>
                {user ? <span className="button" onClick={onLogout}>Logout</span> : <NavLink to="/user" className="button" onClick={toggleMenu}>Login</NavLink>}
            </nav>
            <button className="menu-toggle-btn" onClick={toggleMenu}>☰</button>

        </header>
    )
}

