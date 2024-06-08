import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './navlink.css'

const DashboardHome = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-6'>
            <div className="flex fixed min-h-screen flex-col justify-between border-e col-span-1 bg-[#003343]">
                <div className="px-4 py-6">
                    <span className="grid h-10 w-full place-content-center rounded-lg text-2xl text-white">
                        VERBA LTD
                    </span>

                    <ul className="mt-6 space-y-1">
                        <li>
                            <NavLink to='/dashboard' className="block rounded-lg px-4 py-2 text-lg font-medium text-gray-700">
                                ALl Users
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to='/dashboard/profile' className="block rounded-lg px-4 py-2 text-lg font-medium text-white">
                                Setting
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to='/' className="block rounded-lg px-4 py-2 text-lg font-medium text-white">
                                Main Home
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 col-span-4">
                    <a href="#" className="flex items-center gap-2 bg-[#003343] p-4 text-white">
                        <img
                            alt="Man"
                            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                            className="h-10 w-10 rounded-full object-cover"
                        />

                        <div>
                            <p className="text-xs">
                                <strong className="block font-medium">Eric Frusciante</strong>

                                <span> eric@frusciante.com </span>
                            </p>
                        </div>
                    </a>
                </div>
            </div>
            <div className='w-full lg:col-span-5 ml-52'>
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardHome