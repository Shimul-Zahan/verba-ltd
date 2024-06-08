import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useSecureHook from '../../../Hooks/axiosSecureInstance';
import Swal from 'sweetalert2';
import Loading from '../../../Shared/Loading';
import { MyAuthContext } from '../../../Context/AuthContext';

const CreateProfile = () => {

    const [countryCode, setCountryCode] = useState(null);
    const navigate = useNavigate();
    const api = useSecureHook();
    const [loader, setLoader] = useState(false);
    const { user } = useContext(MyAuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoader(true);
        const form = e.target;

        const newAccount = {
            firstName: form.firstName.value,
            lastName: form.lastName.value,
            userName: form.name.value,
            emailAddress: form.emailAddress.value,
            phoneNumber: countryCode + form.mobilenumber.value,
            companyName: 'algobot',
            adminEmail: user?.email,
        }

        console.log(newAccount);
        const res = await api.post('/api/create-new-account', newAccount)
        if (res.data._id) {
            Swal.fire({
                title: "Good job!",
                text: "Create New Account Successfully!",
                icon: "success"
            });
            setLoader(false);
            navigate('/dashboard/profile');
        }
    }

    return (
        <div className="flex items-center justify-center w-full">
            <form
                className="bg-white p-8 rounded-lg shadow-md w-full "
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-lg font-semibold">
                            User Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="firstName" className="block mb-2 text-lg font-semibold">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block mb-2 text-lg font-semibold">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="emailAddress" className="block mb-2 text-lg font-semibold">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="emailAddress"
                            name="emailAddress"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="emailAddress" className="block mb-2 text-lg font-semibold">
                            Phone Number
                        </label>
                        <div className="w-full flex items-center">
                            <select
                                className="bg-gray-200 w-[50%] border border-gray-300 p-2 rounded-l"
                                onChange={(e) => setCountryCode(e.target.value)}
                            >
                                <option value="+1">+1 (USA)</option>
                                <option value="+44">+44 (UK)</option>
                                <option value="+91">+91 (India)</option>
                            </select>
                            <input
                                required
                                type="number"
                                name="mobilenumber"
                                placeholder="Enter phone number"
                                className="border border-gray-300 p-2 rounded-r w-full"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        {
                            loader ? <Loading />: 'Create Profile'
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateProfile