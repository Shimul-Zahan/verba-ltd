import { Link, NavLink } from "react-router-dom"

const Footer = () => {

    const routes = [
        { name: 'home', path: '' },
        { name: 'About Us', path: '/about' },
        { name: 'Our Quotients', path: 'faqs' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Contact Us', path: '/contact' },
    ]

    return (
        <div className="bg-[#003343] px-10 py-8 min-h-52 text-white flex justify-center items-center flex-col gap-10">
            <div className='text-center flex justify-center items-center gap-10 capitalize'>
                {
                    routes && (
                        routes.map((route, index) =>
                            <Link key={index} to={route?.path}>
                                {route?.name}
                            </Link>
                        )
                    )
                }
            </div>
            <h1>All rights reserved by @VERBA LTD</h1>
        </div>
    )
}

export default Footer