import React, { useContext, useEffect, useState } from 'react'
import CreateProfile from './CreateProfile'
import { MyAuthContext } from '../../../Context/AuthContext';
import useSecureHook from '../../../Hooks/axiosSecureInstance';
import { MdModeEditOutline } from "react-icons/md";
import axios from 'axios';
const URL = "https://api.imgbb.com/1/upload?key=21ef9cea05e256fb8f349bd2e78cb460"

const Profile = () => {

    const { user } = useContext(MyAuthContext);
    const api = useSecureHook();
    const [isModalOpen, setModalOpen] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    console.log(user?.payment);

    // for updating
    const [isEditing, setIsEditing] = useState(false);
    const [editedLastName, setEditedLastName] = useState('');
    const [editedFirstName, setEditedFirstName] = useState('');
    const [editedCompanyName, setEditedCompanyName] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [editedTimeZone, setEditedTimeZone] = useState('');
    const [editedCountryName, setEditedCountryName] = useState('');
    const [newImage, setNewImage] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const officeData = localStorage.getItem('loggedUser')
    const officeBoss = JSON.parse(officeData);

    const handleSaveClick = async (e) => {
        console.log(editedTimeZone);
        e.preventDefault();
        setIsEditing(false);
        setLoading(true)

        if (newImage) {
            const res = await axios.post(URL, { image: newImage }, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
            const image = res.data.data?.display_url
            console.log(image);
            if (image) {
                const updetData = {
                    image,
                    firstName: editedFirstName || userProfile?.firstName,
                    lastName: editedLastName || userProfile?.lastName,
                    companyName: editedCompanyName || userProfile?.companyName,
                    countryName: editedCountryName || userProfile?.countryName,
                    timezone: editedTimeZone || userProfile?.timezone,
                    phoneNumber: countryCode + editedPhoneNumber || userProfile?.phoneNumber,
                }
                const res = await api.patch(`/api/update-profile/${userProfile?._id}`, updetData);
                if (res.data._id) {
                    console.log('Successfully updated');
                };
                setLoading(false);
            }
        } else {
            const updetData = {
                firstName: editedFirstName || userProfile?.firstName,
                lastName: editedLastName || userProfile?.lastName,
                companyName: editedCompanyName || userProfile?.companyName,
                countryName: editedCountryName || userProfile?.countryName,
                timezone: editedTimeZone || userProfile?.timezone,
                phoneNumber: countryCode + editedPhoneNumber || userProfile?.phoneNumber,
            }
            const res = await api.patch(`/api/update-profile/${userProfile?._id}`, updetData);
            if (res.data._id) {
                console.log('Successfully updated');
            };
            setLoading(false);
        }
    };


    const handleCancelClick = () => {
        setIsEditing(true);
        setEditedFirstName('');
        setEditedLastName('');
        setEditedCompanyName('');
        setEditedCountryName('');
        setEditedPhoneNumber('');
        setEditedTimeZone('');
        setNewImage('');
        setCountryCode('');
    };

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

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get(`/api/profile/?email=${user?.email}`);
                setUserProfile(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, [user, loading]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!userProfile) {
        return <p>User profile not found</p>;
    }

    return (
        <div className='bg-gradient-to-r from-blue-50 to-blue-400 '>
            <div className="min-h-screen flex w-full relative">
                <div className="text-black p-8 rounded-lg shadow-md w-full">
                    <div className="text-center mb-6 relative">
                        <img
                            src={isEditing ? newImage || userProfile?.image : userProfile?.image}
                            alt="User Avatar"
                            className="w-24 h-24 rounded-full mx-auto mb-4"
                        />
                        <MdModeEditOutline className='cursor-pointer absolute top-1/2 left-[54%]'
                            onClick={() => setIsEditing('image')} />
                        {isEditing === 'image' && (
                            <div className="p-1 rounded-full lg:w-[20%] h-10 w-10 mx-auto">
                                <input
                                    id="imageInput"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setNewImage(e.target.files[0])}
                                />
                            </div>
                        )}
                        <h2 className="text-3xl font-bold">{userProfile?.companyName}</h2>
                        <p className="text-black">{isEditing ? 'Editing...' : 'CEO'}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <div>

                            <div className='flex justify-start items-center gap-2'>
                                <h3 className="text-lg font-semibold mb-2">First Name</h3>
                                <MdModeEditOutline className='cursor-pointer '
                                    onClick={() => setIsEditing('userName')} />
                            </div>
                            {isEditing === 'userName' ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedFirstName}
                                        onChange={(e) => setEditedFirstName(e.target.value)}
                                    />
                                </div>
                            ) : editedFirstName && isEditing ?
                                <p className="text-black">{editedFirstName}</p> : <p className="text-black">{userProfile?.firstName}</p>
                            }
                        </div>
                        <div>
                            <div className='flex justify-start items-center gap-2'>
                                <h3 className="text-lg font-semibold mb-2">Last Name</h3>
                                <MdModeEditOutline className='cursor-pointer '
                                    onClick={() => setIsEditing('lastName')} />
                            </div>
                            {isEditing === 'lastName' ? (
                                <div>
                                    <input
                                        type="text"
                                        value={editedLastName}
                                        onChange={(e) => setEditedLastName(e.target.value)}
                                    />
                                </div>
                            ) : editedLastName && isEditing ?
                                <p className="text-black">{editedLastName}</p> : <p className="text-black">{userProfile?.lastName}</p>
                            }
                        </div>
                        <div>
                            {/*  */}
                            <div className='flex justify-start items-center gap-2'>
                                <h3 className="text-lg font-semibold mb-2">Company Name</h3>
                                <MdModeEditOutline className='cursor-pointer '
                                    onClick={() => setIsEditing('companyName')} />
                            </div>
                            {isEditing === 'companyName' ?
                                <div>
                                    <input
                                        type="text"
                                        value={editedCompanyName}
                                        onChange={(e) => setEditedCompanyName(e.target.value)}
                                    />
                                </div>
                                : editedCompanyName && !isEditing ?
                                    <p className="text-black">{editedCompanyName}</p>
                                    : <p className="text-black">{userProfile?.companyName}</p>
                            }
                        </div>
                        <div>
                            <div>
                                <div className='flex justify-start items-center gap-2'>
                                    <h3 className="text-lg font-semibold mb-2">Country Name</h3>
                                    <MdModeEditOutline className='cursor-pointer '
                                        onClick={() => setIsEditing('countryName')} />
                                </div>
                                {isEditing === 'countryName' ? (
                                    <div>
                                        <select
                                            name="countryName"
                                            className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black"
                                            onChange={(e) => setEditedCountryName(e.target.value)}

                                        >
                                            <option disabled>Select Language</option>
                                            <option value="Bangladesh">Bangladesh</option>
                                            <option value="Spain">Spain</option>
                                            <option value="Franch">Franch</option>
                                        </select>
                                    </div>
                                ) : editedCountryName && isEditing ?
                                    <p className="text-black">{editedCountryName}</p> : <p className="text-black">{userProfile?.countryName}</p>
                                }
                            </div>
                        </div>
                        <div>
                            <div>
                                <div className='flex justify-start items-center gap-2'>
                                    <h3 className="text-lg font-semibold mb-2">Time Zone</h3>
                                    <MdModeEditOutline className='cursor-pointer '
                                        onClick={() => setIsEditing('timezone')} />
                                </div>
                                {isEditing === 'timezone' ?
                                    <select
                                        name="timezone"
                                        onChange={(e) => setEditedTimeZone(e.target.value)}
                                        defaultValue={editedTimeZone || userProfile?.timezone}
                                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black">
                                        <option value="GMT+6">GMT+6</option>
                                        <option value="BST">BST</option>
                                    </select>
                                    : editedTimeZone && isEditing ?
                                        <p className="text-black">{editedTimeZone}</p>
                                        : <p className="text-black">{userProfile?.timezone}</p>
                                }
                            </div>
                        </div>
                        <div>
                            <div className='flex justify-start items-center gap-2'>
                                <h3 className="text-lg font-semibold mb-2">Email Adress</h3>
                                <MdModeEditOutline className='cursor pointer' />
                            </div>
                            <p className="text-black">{userProfile?.email}</p>
                        </div>
                        <div>
                            <div>
                                <div className='flex justify-start items-center gap-2'>
                                    <h3 className="text-lg font-semibold mb-2">Phone Number</h3>
                                    <MdModeEditOutline className='cursor-pointer '
                                        onClick={() => setIsEditing('phoneNumber')} />
                                </div>
                                {isEditing === 'phoneNumber' ?
                                    <div>
                                        <select
                                            className="bg-gray-200 border border-gray-300 p-2 rounded-l"
                                            onChange={(e) => setCountryCode(e.target.value)}
                                            value={countryCode !== undefined ? countryCode : userProfile?.countryCode}
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
                                            onChange={(e) => setEditedPhoneNumber(e.target.value)}
                                            className="border border-gray-300 p-2 rounded-r w-full"
                                        />
                                    </div>
                                    : editedPhoneNumber && isEditing ?
                                        <p className="text-black">{editedPhoneNumber}</p>
                                        : <p className="text-black"><span className='pr-1'>{userProfile?.countryCode} </span>{userProfile?.phoneNumber}</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={() => setModalOpen('profile')} className={`absolute bottom-5 ml-5 bg-gradient-to-l from-blue-50 to-blue-400 px-10 py-4 rounded-lg text-black ${user?.payment === 'success' ? 'none' : 'pointer-events-none'}`}>{user?.payment === 'success' ? "Add Account" : "Pay Frist"}</button>
            <button onClick={handleSaveClick} className='absolute bottom-5 ml-52 bg-gradient-to-l from-blue-50 to-blue-400 px-10 py-4 rounded-lg text-black'>Save Edit</button>
            <button onClick={handleCancelClick} className='absolute bottom-5 ml-96 bg-gradient-to-l from-blue-50 to-blue-400 px-10 py-4 rounded-lg text-black'>Cancel Edit</button>

            {
                isModalOpen && <div onClick={() => setModalOpen(!isModalOpen)} className='fixed top-0 left-0 w-full bg-gray-400 flex justify-center items-center inset-0 bg-opacity-75'>
                    <div onClick={(e) => e.stopPropagation()} className='bg-white p-8 max-w-3xl w-full mx-auto rounded shadow-lg relative'>
                        <CreateProfile />
                        <button onClick={() => setModalOpen(!isModalOpen)} className="mt-4 bg-gray-500 hover:bg-gray-700 text-black font-bold py-2 px-4 h-10 w-10 absolute top-0 right-5 rounded-full hover:rotate-90 duration-300">
                            X
                        </button>
                    </div>
                </div>
            }
        </div >
    )
}

export default Profile