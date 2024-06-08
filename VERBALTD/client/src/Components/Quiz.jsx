import React from 'react'
import { Link } from 'react-router-dom'

const Quiz = () => {
    return (
        <div className='text-center px-10 py-20 space-y-5'>
            <h1 className='text-4xl font-bold text-[#080808]'>Take The Test</h1>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8 text-white">
                <div className="rounded-lg bg-[#003343] p-4 flex justify-center items-center">
                    <Link to='/test' className='bg-white py-2 px-8 text-black rounded-sm'>Take Me to the test.</Link>
                </div>
                <div className="rounded-lg bg-[#003343] lg:col-span-2 py-10 px-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas vitae nesciunt rem eius exercitationem accusamus maxime neque unde, temporibus repellat perferendis recusandae libero deserunt ipsum nulla. Officiis aliquam deserunt aliquid?</div>
            </div>
        </div>
    )
}

export default Quiz