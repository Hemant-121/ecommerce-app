import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, likeProduct, getCurrentUser } from "../services/ApiServices"; // Assume you have a function checkIfLiked to verify if the product is already liked
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { updateUser } from "../redux-toolkit/authSlice";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loader, setLoader] = useState(false);
  const { isAuthenticated } = useSelector(state => state.auth);
  const wishList = useSelector(state => state.auth.user?.wishList)
  
  const [isLiked, setIsLiked] = useState(wishList?.includes(id));
  const fetchUser = async () => {
    try {
     const response = await getCurrentUser();
     console.log("User current", response.data.data)
     dispatch(updateUser(response.data.data))
    } catch (error) {
     console.error("Error fetching user data:", error);
    }
   }

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await getProductById(id);
        const { data } = response.data;
        setProduct(data);
        
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast.error("Failed to fetch product data");
      }
    };
    fetchProductData();
  }, [isLiked, id]);


  const handleLike = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    try { 
      const response = await likeProduct(id);
      console.log(response);
      setIsLiked(!isLiked);
      toast.success(isLiked ? "Dishliked successfully" : "Liked successfully");
      fetchUser();
    
    } catch (error) {
      console.log("Error while liking the product", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {!loader && product && (
        <div className="flex flex-col md:flex-row mx-auto w-[80%] mt-5">
          <div className="md:w-1/3 border-none">
            <div className="card glass rounded-none w-full h-[500px] relative">
              <div className="carousel absolute w-full">
                {product.prodImages?.map((image, index) => (
                  <div
                    key={index}
                    className="carousel-item w-full h-[50vh] flex items-center justify-center py-2 pt-1"
                  >
                    <div className="fixed top-2 right-2 z-50 cursor-pointer" onClick={handleLike}>
                      {isLiked ? (<FaHeart size={24} color="red" />) : (<FiHeart size={24} color="gray" />)}
                    </div>
                    <img
                      src={image}
                      className="object-contain h-full w-full"
                      alt={`Product Image ${index}`}
                    />
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 w-full  flex justify-between pb-2 px-2">
                <button className="btn w-1/2 rounded-none bg-[#ff9f00] hover:bg-[#ff9f00]">Add to Cart</button>
                <button className="btn w-1/2 rounded-none bg-[#fb641b] hover:bg-[#fb641b]">Buy Now</button>
              </div>
            </div>
          </div>

          <div className="w-[70%] md:pl-5">
            <div className="mb-4">
              <h2 className="text-3xl font-semibold mb-2">{product.prodName}</h2>
              <p className="text-green-500 mb-4 text-3xl">
                <span className="text-green-500">₹ {product.prodPrice}</span>
              </p>
            </div>

            <div className="mb-4">
              <p>{product.prodDesc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ProductDetailPage;
