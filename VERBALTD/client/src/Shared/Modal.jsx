import React, { useContext, useEffect, useState } from 'react';
import useSecureHook from '../Hooks/axiosSecureInstance';
import Swal from 'sweetalert2';
import { MyAuthContext } from '../Context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import FetchOfficesEmployee from '../Hooks/FetchOfficesEmployee';
import Loading from './Loading';
;

const Modal = ({ isModalOpen, setModalOpen }) => {

    const api = useSecureHook();
    const { user } = useContext(MyAuthContext);
    const navigate = useNavigate();
    const { refetch } = FetchOfficesEmployee();
    const [loader, setLoader] = useState(false);
    const officeData = localStorage.getItem('loggedUser')
    const officeBoss = JSON.parse(officeData);
    // console.log(officeBoss);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, [isModalOpen]);

    console.log(user?.email);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true)
        const form = e.target;

        const newEmployee = {
            surname: form.surname.value,
            firstName: form.firstname.value,
            employeeEmail: form.email.value,
            reference: form.reference.value,
            adminEmail: user?.email,
            companyName: 'algobot',
        }

        const res = await api.post('/api/add-user', newEmployee);
        if (res.data._id) {
            Swal.fire({
                title: "Good job!",
                text: "Employee Added Successfully!",
                icon: "success"
            });
            // navigate('/dashboard');
            refetch();
            form.reset();
            setModalOpen(false);
        }

    }

    return (
        <div class="py-10">
            {
                isModalOpen === 'table' && <div onClick={() => setModalOpen(!isModalOpen)} className='fixed top-0 left-0 w-full h-screen bg-gray-400 flex justify-center items-center inset-0 bg-opacity-75'>
                    <div onClick={(e) => e.stopPropagation()} className='bg-white p-8 max-w-md w-full mx-auto rounded shadow-lg relative'>
                        <div className="container mx-auto mt-8">
                            {
                                officeBoss?.payment === 'success' ? <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                                    <div className="mb-4">
                                        <label htmlFor="surname" className="block text-gray-600 font-semibold mb-2">Surname</label>
                                        <input
                                            type="text"
                                            name="surname"
                                            className="w-full p-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="firstname" className="block text-gray-600 font-semibold mb-2">First Name</label>
                                        <input
                                            type="text"
                                            name="firstname"
                                            className="w-full p-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            className="w-full p-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="reference" className="block text-gray-600 font-semibold mb-2">Reference</label>
                                        <input
                                            type="text"
                                            id="reference"
                                            name="reference"
                                            className="w-full p-2 border rounded-md"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                                        {
                                            loader ? <Loading /> : 'Add Employee'
                                        }
                                    </button>
                                </form> :
                                    <div className='text-center space-y-4'>
                                        <div className='flex justify-center items-center font-bold text-5xl mb-8'>You need to pay first for adding employee</div>
                                        <Link to='/pricing' className='text-blue-500 underline'>Pay Now</Link>
                                    </div>
                            }
                        </div>


                        <button onClick={() => setModalOpen(!isModalOpen)} className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 h-10 w-10 absolute top-0 right-5 rounded-full hover:rotate-90 duration-300">
                            X
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Modal;
