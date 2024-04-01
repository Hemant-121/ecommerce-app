import axios from 'axios';

const url = 'http://localhost:8000/api/v1';

export const userLogin = async (user) => {
    try {
        return await axios.post(`${url}/users/login`, user)
    } catch (error) {
        console.log('Error while calling login API: ', error);
    }
}

export const userRegister = async (user) => {
    try {
        return await axios.post(`${url}/users/register`, user)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
    }
}

export const userLogout = async () => {
    try {
        return await axios.post(`${url}/users/logout`)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
    }
}
export const getCurrentUser = async () => {
    try {
        return await axios.get(`${url}/users/current-user`)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
    }
}
export const AddNewProduct = async (data) => {
    try {
        return await axios.post(`${url}/product/add-product`, data)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
    }
}

