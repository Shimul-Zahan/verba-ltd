import React, { useContext, useState } from 'react'
import Modal from '../../../Shared/Modal'
import FetchOfficesEmployee from '../../../Hooks/FetchOfficesEmployee';
import { FaSearch } from "react-icons/fa";
import useSecureHook from '../../../Hooks/axiosSecureInstance';
import { MyAuthContext } from '../../../Context/AuthContext';

const Table = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [sortedData, setSortedData] = useState([]);
    const [sort, setSort] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('asc');
    const { data, refetch, isLoading } = FetchOfficesEmployee();
    const { user } = useContext(MyAuthContext);
    const api = useSecureHook();

    const handleSearch = async () => {
        try {
            const res = await api.get(`/search?searchName=${searchTerm}`);
            const userSortedData = await res?.data?.filter((item) => item.adminEmail === user?.email);
            setSort(true);
            setSortedData(userSortedData);
        } catch (error) {
            console.error('Error searching data:', error);
        }
    };

    const dateSort = async (id) => {
        const res = await api.get(`/api/sort-by-date?date=${id}`)
        const userSortedData = await res?.data?.filter(item => item.adminEmail === user?.email);
        setSort(true);
        setSortedData(userSortedData);
    }


    const applySorting = (dataToSort) => {
        const sorted = [...dataToSort];
        if (sortOption === 'asc') {
            sorted.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
        } else if (sortOption === 'desc') {
            sorted.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        }
        setSort(true);
        setSortedData(sorted);
    };

    const handleSortChange = (selectedOption) => {
        setSortOption(selectedOption);
        setSort(false);
        setSortedData([]);
    };

    const displayData = sort ? sortedData : data;

    return (
        <div className='bg-gradient-to-r from-blue-50 to-blue-400'>
            <div className="flex justify-between flex-row-reverse items-center p-4 mt-2">
                {/* Left side buttons */}
                <div className="flex space-x-8">
                    <button onClick={() => dateSort('today')} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Today</button>
                    <button onClick={() => dateSort('week')} className="px-4 py-2 bg-blue-500 text-white rounded-lg">This Week</button>
                    <button onClick={() => dateSort('month')} className="px-4 py-2 bg-blue-500 text-white rounded-lg">This Month</button>
                </div>

                {/* Right side search and sort */}
                <div className="flex items-center space-x-4">
                    {/* Sort By dropdown */}
                    <div className="relative">
                        <select
                            className="py-2 px-4 border rounded-md"
                            value={sortOption}
                            onChange={(e) => handleSortChange(e.target.value)}
                        >
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </select>
                    </div>

                    {/* Search input with icon on the right */}
                    <div className="relative">
                        <input
                            type="text"
                            name="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search..."
                            className="py-2 px-4 border rounded-md"
                        />
                        <div onClick={handleSearch} className="absolute inset-y-0 right-0 flex items-center pr-3">
                            <FaSearch />
                        </div>
                    </div>
                </div>
            </div>
            <div className='relative min-h-screen'>
                <div className="overflow-x-auto py-4">
                    <table className="table text-lg">
                        <thead>
                            <tr className='text-lg font-bold'>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Reference</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                displayData && (
                                    displayData.map((item, index) =>
                                        <tr key={index}>
                                            <th>{item?.surname}</th>
                                            <td>{item?.createdAt}</td>
                                            <td>{item?.reference}</td>
                                            <td>....</td>
                                        </tr>
                                    )
                                )
                            }
                        </tbody>
                    </table>
                </div>
                <button onClick={() => setModalOpen('table')} className='absolute bottom-5 bg-[#003343] px-10 py-4 rounded-lg text-white'>Add New User</button>
                <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
            </div>
        </div>
    )
}

export default Table