import axios from 'axios';

const url = '/api/v1';

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

export const getProductById = async (id) => {
    try {
        return await axiosInstance.get(`/product/get-product/${id}`)
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

  export const likeProduct = async (productId) => {
    try {
        return await axiosInstance.post(`/product/wishlist/${productId}`)
    } catch (error) {
        console.log("Error while adding to wishlist product")
    }
  };


export const addToCart = async (productId) => {
    try {
        return await axiosInstance.post(`/product/addToCart/${productId}`);
    } catch (error) {
        console.error("Error while adding product to cart:", error);
        throw error; // Re-throw the error to handle it in the calling code
    }
};

export const getCartProducts = async () => {
    try {
        return await axiosInstance.get(`/product/cartProducts`);
    } catch (error) {
        console.error("Error while fetching cart products:", error);
        throw error;
    }
};

export const removeFromCart = async (productId) => {
    try {
        return await axiosInstance.delete(`/product/removeFromCart/${productId}`);
    } catch (error) {
        console.error("Error while removing product from cart:", error);
        throw error;
    }
};
export const updateProductQuantity = async (data) => {
    try {
        return await axiosInstance.post(`/product/update-quantity`, data);
    } catch (error) {
        console.error("Error while removing product from cart:", error);
        throw error;
    }
};

export const addReview = async (id, data) => {
    try {
        return await axiosInstance.post(`/review/addreview/${id}`, data);
    } catch (error) {
        console.error("Error while removing product from cart:", error);
        throw error;
    }
};

export const getReviews = async (id) => {
    try {
        return await axiosInstance.get(`/review/reviews/${id}`);
    } catch (error) {
        console.error("Error while fetching product reviews :", error);
        throw error;
    }
};



export default axiosInstance;
