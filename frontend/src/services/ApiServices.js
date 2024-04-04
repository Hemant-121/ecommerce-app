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
export const getProducts = async () => {
    try {
        return await axiosInstance.get(`/product/all-product`)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
    }
}
export const getProductsForUser = async (id) => {
    try {
        return await axiosInstance.get(`/product/user-product/${id}`)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
    }
}
export const deleteProduct = async (id) => {
    console.log(id)
    try {
        return await axiosInstance.delete(`/product/delete-product/${id}`)
    } catch (error) {
        console.log('Error while calling Signup API: ', error);
    }
}

export const getProductById = async (productId) => {
    try {
        return await axiosInstance.get(`/product/get-product/${productId}`)
    } catch (error) {
      console.log("Error while getting product")
    }
  };
export const getCategory = async (categoryId) => {
    try {
        return await axiosInstance.get(`/product/get-category/${categoryId}`)
    } catch (error) {
      console.log("Error while getting category")
    }
  };
  
  export const updateProduct = async (productId, productData) => {
    try {
        return await axiosInstance.put(`/product/update-product/${productId}`, productData)
    } catch (error) {
        console.log("Error while updating product")
    }
  };

export default axiosInstance;
