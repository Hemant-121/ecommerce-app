import axios from 'axios';

const url = 'http://localhost:8000/api/v1';


const axiosInstance = axios.create({
    baseURL: url,
    withCredentials: true, // Send cookies with requests
  });

export const userLogin = async (user) => {
    try {
        return await axiosInstance.post('/users/login', user);
    } catch (error) {
        console.log('Error while calling login API: ', error);
    }
}

export const userRegister = async (user) => {
    try {
        return await axiosInstance.post(`/users/register`, user)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
    }
}

export const userLogout = async () => {
    try {
        return await axiosInstance.post(`/users/logout`)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
    }
}
export const getCurrentUser = async () => {
    try {
        return await axiosInstance.get(`/users/current-user`)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
    }
}
export const AddNewProduct = async (data) => {
    try {
        return await axiosInstance.post(`/product/add-product`, data)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
    }
}

export default axiosInstance;
