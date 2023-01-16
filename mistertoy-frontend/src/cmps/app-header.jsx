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
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
// import { logout } from '../store/user.action.js'
// const { useState } = React
// import { TOGGLE_CART_SHOWN } from '../store/car.reducer.js'

// import { LoginSignup } from './login-signup.jsx'
import logoImg from "../assets/img/logo.png"
export function AppHeader() {

    // TODO: get from storeState
    // const [user, setUser] = useState(userService.getLoggedinUser())
    // const user = useSelector((storeState => storeState.userModule.user))
    // const [user, setUser] = useState(userService.getLoggedinUser())

    const dispatch = useDispatch()

    // function setUser(user) {
    //     dispatch({ type: SET_USER, user })
    // }

    // function onLogout() {
    //     logout()
    //         .then(() => {
    //             setUser(null)
    //         })
    // }

    // function onToggleCart(ev) {
    //     ev.preventDefault()
    //     dispatch({ type: TOGGLE_CART_SHOWN })
    // }

    function toggleMenu() {
        document.body.classList.toggle('menu-open')
    }
    // function setUser(user) {
    //     dispatch({ type: SET_USER, user })
    // }

    // function onLogout() {
    //     logout()
    //         .then(() => {
    //             setUser(null)
    //         })
    // }

    return (
        <header className="app-header full main-layout">

            {/* <h1>MISTER TOY</h1> */}
            <NavLink to="/toy">
                <img src={logoImg} />
            </NavLink>


            <nav>
                <NavLink to="/" className="button" onClick={toggleMenu}>Home</NavLink>
                <span className="dash">|</span>
                <NavLink to="/user" className="button" onClick={toggleMenu}>Login / Signup</NavLink>
                <span className="dash">|</span>
                <NavLink to="/review" className="button" onClick={toggleMenu}>Review</NavLink>
                <span className="dash">|</span>
                <NavLink to="/toy" className="button" onClick={toggleMenu}>Toys</NavLink>
                <span className="dash">|</span>
                <NavLink to="/dashboard" className="button" onClick={toggleMenu}>Dashboard</NavLink>
                <span className="dash">|</span>
                <NavLink to="/about" className="button" onClick={toggleMenu}>About</NavLink>
                {/* |
                <a href="#" onClick={onToggleCart}>
                    🛒 Cart
                </a> */}
            </nav>
            {<button className="menu-toggle-btn" onClick={toggleMenu}>☰</button>}


   

        </header>
    )
}

