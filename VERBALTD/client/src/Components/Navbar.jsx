import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './nav.css'
import { MyAuthContext } from '../Context/AuthContext'

const Navbar = () => {

    const { user, loading } = useContext(MyAuthContext);
    const navigate = useNavigate();

    const routes = [
        { name: 'home', path: '' },
        { name: 'About Us', path: '/about' },
        { name: 'Our Quotients', path: 'faqs' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Contact Us', path: '/contact' },
    ]

    const logout = () => {
        localStorage.removeItem('loggedUser');
        navigate('/login');
        window.location.reload();
    }

    return (
        <div className='bg-[#003343] px-10 py-8 text-white sticky top-0 z-50'>
            <div className='flex justify-between items-center'>
                <h1 className='text-2xl font-medium'>VERBA LTD</h1>
                <div className='text-center flex justify-center items-center gap-4 lg:gap-10 capitalize'>
                    {
                        routes && (
                            routes.map((route, index) =>
                                <Link key={index} to={route?.path}>
                                    {route?.name}
                                </Link>
                            )
                        )
                    }
                    {user && (
                        <NavLink to='/dashboard'>
                            Dashboard
                        </NavLink>
                    )}
                </div>
                <div className='flex justify-center items-center gap-5'>
                    {
                        user ?
                            <button onClick={logout}  className='bg-[#8b5252] px-4 text-black rounded-sm'>
                                Logout
                            </button> :
                            <Link to='/login' className='bg-[#D9D9D9] px-4 text-black rounded-sm'>
                                Login
                            </Link>
                    }
                    <Link to='/regi' className='bg-[#D9D9D9] px-4 text-black rounded-sm'>
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar