/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { getCurrentUser, getProductById, likeProduct } from "../services/ApiServices";
import { Link } from "react-router-dom";
import { updateUser } from "../redux-toolkit/authSlice";
import { useDispatch } from "react-redux";


const WishListCard = ({id}) => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getProductById(id);
            // console.log(response.data.data)
            setProduct(response.data.data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [id])

      const fetchUser = async () => {
        try {
         const response = await getCurrentUser();
         console.log("User current", response.data.data)
         dispatch(updateUser(response.data.data))
        } catch (error) {
         console.error("Error fetching user data:", error);
        }
       }

      const handleRemove =async (e) => {
        e.preventDefault();
        console.log(id)
        await likeProduct(id);
        fetchUser();
      }

  return (
    <div className="flex items-center justify-between border p-4 mb-4 w-full h-[30vh] overflow-hidden bg-white">
      <div className="h-[250px] carousel carousel-vertical rounded-box">
        {product?.prodImages?.map((image, index) => {
          return (
            <div key={index} className="carousel-item w-auto">
              <img
                src={image}
                alt={product?.prodName}
                className="w-[250PX] h-[250px] transition-transform transform hover:scale-105 p-5"
              />
            </div>
          );
        })}
      </div>

      <div className="w-1/2 mx-4">
        <h2 className="text-xl font-bold">{product?.prodName}</h2>
        <p className="text-green-500 mb-2">₹ {product?.prodPrice}</p>
      </div>

      <div className="flex items-center">
        <Link to={'/wishlist'}>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleRemove}        
          >
            Remove
          </button>
        </Link>
      </div>
    </div>
  )
}

export default WishListCard