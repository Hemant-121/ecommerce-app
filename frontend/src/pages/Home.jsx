import { useEffect } from "react";
import Carousal from "../components/Home/Carousal";
import Slider from "../components/Home/Slider";
import {  useDispatch, useSelector } from 'react-redux';
import { setAllProducts } from '../redux-toolkit/productSlice';
import { getProducts } from "../services/ApiServices.js";
import { setSellerProd } from "../redux-toolkit/sellerProductSlice.js";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state)=> state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products data from the backend
        const response = await getProducts();
        // Dispatch the action to set products in Redux store
        dispatch(setAllProducts(response.data));

        dispatch(setSellerProd())
        
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    // Call the fetchProducts function
    fetchProducts();
  }, [dispatch]);
  
  return (
    <div className="h-[92vh] ">
      <div className="flex flex-col gap-3 mx-4 mt-3">
        <Carousal />
      </div>
      <div className="flex flex-col gap-3 mx-4 mb-4   pb-4 bg-white">
        <h1 className="w-full  p-2 text-3xl">Top Deals</h1>
        <Slider products={products}/>
      </div>
      <div className="flex flex-col gap-3 mx-4 mb-4   pb-4 bg-white">
        <h1 className="w-full  p-2 text-3xl">Top Deals</h1>
        <Slider products={products}/>
      </div>
      <div className="flex flex-col gap-3 mx-4 mb-4   pb-4 bg-white">
        <h1 className="w-full  p-2 text-3xl">Top Deals</h1>
        <Slider products={products}/>
      </div>
      <div className="flex flex-col gap-3 mx-4 mb-4   pb-4 bg-white">
        <h1 className="w-full  p-2 text-3xl">Top Deals</h1>
        <Slider products={products}/>
      </div>
      <div className="flex flex-col gap-3 mx-4 mb-4   pb-4 bg-white">
        <h1 className="w-full  p-2 text-3xl">Top Deals</h1>
        <Slider products={products}/>
      </div>
    </div>
  );
};

export default Home;
