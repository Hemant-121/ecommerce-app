import {  useEffect } from 'react';
import ListProduct from '../components/Home/ListProduct';
import { getProductsForUser } from '../services/ApiServices'; // Import your API service functions
import { useSelector, useDispatch } from "react-redux";
import { setSellerProducts } from '../redux-toolkit/sellerProductSlice';
import toast from 'react-hot-toast';


const ProductList = () => {
  const userId = useSelector((state) => state.auth.user._id);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        // Fetch products from the backend
        const response = await getProductsForUser(userId); // Assuming this function fetches products for the logged-in user
        
        dispatch(setSellerProducts(response.data))
      
      } catch (error) {
       toast.error(error.message)  
      }
    };

    fetchProducts();
  }, []);
  
  const products = useSelector((state) => state.sellerProducts.sellerProducts);

  return (
    <div className='w-[60vw] mx-auto'>
      {products.map((product, index) => (
        <div key={index}>
          <ListProduct
            product={product}
            // onUpdate={() => handleUpdate(product.id)}
            // onDelete={() => handleDelete(product.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
