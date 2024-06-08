import React, { useContext } from 'react'
import { useQuery } from '@tanstack/react-query';
import { MyAuthContext } from '../Context/AuthContext';
import useSecureHook from './axiosSecureInstance';

const FetchOfficesEmployee = () => {

    const { user } = useContext(MyAuthContext);
    const api = useSecureHook();

    console.log(user?.email);

    const { data, refetch, isLoading } = useQuery({
        queryKey: ['all-offices', user?.email],
        queryFn: async () => {
            const res = await api.get(`/api/all-offices?email=${user?.email}`)
            return await res.data
        }
    })

    return { data, refetch, isLoading }
}

export default FetchOfficesEmployee