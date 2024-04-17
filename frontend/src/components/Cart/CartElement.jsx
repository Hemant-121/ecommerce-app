/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  removeFromCart,
  updateProductQuantity,
} from "../../services/ApiServices";

const CartElement = ({ product, fetchUser }) => {
  const [count, setCount] = useState(product.quantity); // Initialize count with product quantity

  const increment = () => {
    if(count >= 10){
      return;
    }
    setCount(count + 1);
    updateQuantity(count + 1); // Update quantity in database
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
      updateQuantity(count - 1); // Update quantity in database
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if(e.target.value > 10 ){
      return;
    }
    if(e.target.value == ''){
        return;
    }

    setCount(e.target.value);
    updateQuantity(e.target.value); // Update quantity in database
    fetchUser();
  }

  const updateQuantity = async (newQuantity) => {
    try {
      const data = { productId: product._id, quantity: newQuantity };
      await updateProductQuantity(data);
      fetchUser();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  useEffect(() => {
    setCount(product.quantity); // Update count when product quantity changes
  }, [product.quantity]);

  return (
    <div className="flex flex-col p-2 border cursor-pointer w-full">
      <div className="w-full text-[1.5vw] flex items-center gap-2 h-[10vw] overflow-hidden">
        <div className="w-[20%] h-full overflow-hidden flex items-center justify-center">
          <img
            src={product?.prodImages[0]}
            alt=""
            className="object-fit w-auto h-full mx-auto p-2"
          />
        </div>
        <div className="sm:xl w-[75%]">
          <h1 className="text-green-500">₹ {product?.prodPrice * count}</h1>
          <h1 className="text-gray-400">{product?.prodName}</h1>
        </div>
      </div>
      <div className="flex items-center justify-evenly text-[1.5vw]">
        <div className="flex items-center gap-2">
          <button
            className={`p-[1vw] border border-gray-200 rounded-full ${
              count <= 1 ? "disabled bg-[#f3ebeb]" : ""
            }`}
            onClick={decrement}
          >
            <FaMinus size={10} />
          </button>
          <input
            type="text"
            value={count}
            onChange={handleChange}
            className="w-[3vw] h-auto text-center border border-gray-200 rounded-lg appearance-none active:border-none focus:outline-none"
          />
          <button
            className={`p-[1vw] border border-gray-200 rounded-full ${
              count >= 10 ? "disabled bg-[#f3ebeb]" : ""
            }`}
            onClick={increment}
          >
            <FaPlus size={10} />
          </button>
        </div>
        <button
          className="rounded-full border px-2 py-1 hover:bg-gray-200 cursor-pointer"
          onClick={async () => {
            await removeFromCart(product._id);
            await fetchUser();
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartElement;
