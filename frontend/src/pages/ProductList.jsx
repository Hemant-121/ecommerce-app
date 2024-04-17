import {  useEffect } from 'react';
import ListProduct from '../components/Home/ListProduct';
import { deleteProduct, getProductsForUser } from '../services/ApiServices'; 
import { useSelector, useDispatch } from "react-redux";
import { setSellerProducts } from '../redux-toolkit/sellerProductSlice';
import toast from 'react-hot-toast';

const ProductList = () => {
  
  const userId = useSelector((state) => state.auth.user._id);
  const isSeller = useSelector((state) => state.auth.isSeller);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductsForUser(userId);
        
        dispatch(setSellerProducts(response.data))
      
      } catch (error) {
       toast.error(error.message)  
      }
    };

    fetchProducts();
  }, [dispatch, userId, isSeller]);
  
  const products = useSelector((state) => state.sellerProducts.sellerProducts);

  return (
    <div className='w-[60vw] mx-auto mt-4'>
      {products?.map((product, index) => (
        <div key={index}>
          <ListProduct
            product={product}
            deleteProduct = {deleteProduct}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
