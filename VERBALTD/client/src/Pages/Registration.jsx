import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import useSecureHook from "../Hooks/axiosSecureInstance";
import { MyAuthContext } from "../Context/AuthContext";
import Loading from "../Shared/Loading";

const api_key = import.meta.env.VITE_IMGBB_API_KEY
const URL = "https://api.imgbb.com/1/upload?key=21ef9cea05e256fb8f349bd2e78cb460"

const Registration = () => {

    const { setClick } = useContext(MyAuthContext);
    const [countryCode, setCountryCode] = useState(null);
    const navigate = useNavigate();
    const api = useSecureHook();
    const [loader, setLoader] = useState(false);

    const registration = async (e) => {
        e.preventDefault();
        setLoader(true);

        const form = e.target;
        const imagefile = form.image.files[0];
        const res = await axios.post(URL, { image: imagefile }, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        })
        const image = res.data.data.display_url
        const number = form.mobilenumber.value;

        if (res.data.success) {
            const registrationCompany = {
                firstName: form.firstName.value,
                lastName: form.lastName.value,
                userName: form.userName.value,
                email: form.email.value,
                password: form.password.value,
                language: form.language.value,
                timezone: form.timezone.value,
                companyName: form.companyName.value,
                countryName: form.companyName.value,
                phoneNumber: countryCode + number,
                image: image,
            }

            const res = await api.post('/api/create-profile', registrationCompany)
            console.log(res.data);
            
            if (res.data._id) {
                Swal.fire({
                    title: "Good job!",
                    text: "Company Registered Successfully!",
                    icon: "success"
                });
                setClick(true);
                navigate('/pricing');
            } else {
                Swal.fire({
                    title: "OOOPS!",
                    text: "Company Already Registered Successfully!",
                    icon: "fail"
                });
                navigate('/register')
            }
        }
    }
    // 

    return (
        <div className="bg-gradient-to-r from-blue-50 to-blue-400 w-full">
            <div className="mx-auto px-4 p-4 sm:px-6 lg:px-8 min-h-screen flex justify-center items-center">
                <div className="mx-auto bg-[#003343] w-full lg:w-[800px] rounded-lg">
                    <form onSubmit={registration} className="space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                        <p className="text-center text-lg font-medium text-white">Sign in to your account</p>
                        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-5">
                            <div className="relative w-full">
                                <input
                                    required
                                    type="text"
                                    name="firstName"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                                    placeholder="First Name"
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <div className="relative w-full">
                                <input
                                    required
                                    type="text"
                                    name="lastName"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                                    placeholder="Last Name"
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-5">
                            <div className="relative w-full">
                                <input
                                    required
                                    type="text"
                                    name="userName"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                                    placeholder="User Name"
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <div className="relative w-full">
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                                    placeholder="Enter email"
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>

                            <div className="relative w-full">
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                                    placeholder="Enter Password"
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-5">
                            <div className="relative w-full">
                                <input
                                    required
                                    type="text"
                                    name="companyName"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                                    placeholder="Company Name"
                                />
                                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <div className="relative w-full">
                                <select
                                    name="language"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                                >
                                    <option disabled>Select Language</option>
                                    <option value="english">English</option>
                                    <option value="spanish">Spanish</option>
                                    <option value="french">French</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-5">
                            <div className="relative w-full">
                                <select
                                    name="countryName"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                                >
                                    <option disabled>Select Language</option>
                                    <option value="english">Bangladesh</option>
                                    <option value="spanish">Spain</option>
                                    <option value="french">Franch</option>
                                </select>
                            </div>
                            <div className="relative w-full">
                                <select
                                    name="timezone"
                                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                                >
                                    <option disabled>Select Time Zone</option>
                                    <option value="english">GMT+6</option>
                                    <option value="spanish">BST</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-5">
                            <div className="w-full flex items-center">
                                <select
                                    className="bg-gray-200 border border-gray-300 p-2 rounded-l"
                                    onChange={(e) => setCountryCode(e.target.value)}
                                >
                                    <option value="+1">+1 (USA)</option>
                                    <option value="+44">+44 (UK)</option>
                                    <option value="+91">+91 (India)</option>
                                    {/* Add more country options as needed */}
                                </select>
                                <input
                                    required
                                    type="number"
                                    name="mobilenumber"
                                    placeholder="Enter phone number"
                                    className="border border-gray-300 p-2 rounded-r w-full"
                                />
                            </div>
                            <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-5">
                                <div className="relative w-full">
                                    <input
                                        required
                                        type="file" name="image"
                                        className="file-input required required-bordered required-md w-full" />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white" >
                            {
                                loader ? <Loading /> : 'Registration'
                            }
                        </button>

                        <p className="text-center text-sm text-gray-400">
                            No account?
                            <Link to='/login' className="underline">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registration