import './assets/style/main.scss'

import { Provider } from 'react-redux'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'


import { AppHeader } from './cmps/app-header'
import { AppFooter } from './cmps/app-footer'

import { HomePage } from './pages/home-page'
import { AboutUs } from './pages/about-us'
import { ToyIndex } from './pages/toy-index'
import { ToyDetails } from './pages/toy-details'
import { ToyEdit } from './pages/toy-edit'

import { store } from './store/store'
import { ToyDashboard } from './pages/toy-dashboard'
import { LoginSignup } from './pages/login-signup'
import { UserMsg } from './cmps/user-msg'
import { ReviewApp } from './pages/review-app'

export default function App() {

    function toggleMenu() {
        document.body.classList.toggle('menu-open')
    }
    
    return <Provider store={store}>
        <Router>
            <div className="main-screen" onClick={toggleMenu}></div>

            <AppHeader />
            <main>
                <Routes>
                    <Route element={<HomePage />} path="/" />
                    <Route element={<AboutUs />} path="/about" />
                    <Route element={<ToyDashboard />} path="/dashboard" />
                    <Route element={<LoginSignup />} path="/user" />
                    <Route element={<ReviewApp />} path="/review" />
                    <Route element={<ToyIndex />} path="/toy" />
                    <Route element={<ToyEdit />} path="/toy/edit" />
                    <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                    <Route element={<ToyDetails />} path="/toy/:toyId" />
                </Routes>
            </main>
            {/* <AppFooter /> */}
            <UserMsg />
        </Router>
    </Provider >
}