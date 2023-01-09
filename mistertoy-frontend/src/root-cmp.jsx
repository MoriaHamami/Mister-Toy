import './assets/style/main.css'

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

export default function App() {

  return <Provider store={store}>
  <Router>
      <section className="main-layout app">
          <AppHeader />
          <main>
              <Routes>
                  <Route element={<HomePage />} path="/" />
                  <Route element={<AboutUs />} path="/about" />
                  <Route element={<ToyIndex />} path="/toy" />
                  <Route element={<ToyEdit />} path="/toy/edit" />
                  <Route element={<ToyEdit />} path="/toy/edit/:toyId" />
                  <Route element={<ToyDetails />} path="/toy/:toyId" />
              </Routes>
          </main>
          <AppFooter />
      </section>
  </Router>
</Provider>
}