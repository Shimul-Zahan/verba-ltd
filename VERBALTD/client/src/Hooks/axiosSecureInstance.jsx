import axios from 'axios';

const axioSecureInstance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

const useSecureHook = () => {
    return axioSecureInstance;
}

export default useSecureHook