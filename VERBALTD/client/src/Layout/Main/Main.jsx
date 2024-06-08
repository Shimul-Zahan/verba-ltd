import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../Components/Navbar'
import Footer from '../../Pages/Footer'

const Main = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Main