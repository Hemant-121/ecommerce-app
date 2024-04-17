import { useEffect, useState } from "react";
import CartElement from "../components/Cart/CartElement";
import { useDispatch, useSelector } from "react-redux";
import {  getCartProducts, getCurrentUser } from "../services/ApiServices";
import { updateUser } from "../redux-toolkit/authSlice";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState(null);
  const cart = useSelector((state) => state?.auth?.user?.cart);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchUser = async () => {
    try {
      const response = await getCurrentUser();
      dispatch(updateUser(response.data.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const res = await getCartProducts();
        setCartProducts(res.data.data);
      } catch (error) {
        console.log("Error while fetching Cart Products", error);
      }
    };
    fetchCartProducts();
  }, [cart]);

  useEffect(() => {
    if (cartProducts) {
      // Calculate total price based on products and their quantities
      const totalPrice = cartProducts.reduce((acc, product) => {
        return acc + (product.prodPrice * product.quantity);
      }, 0);
      setTotalPrice(totalPrice);
    }
  }, [cartProducts]);

  return (
    <div className="w-[80vw] flex justify-between mx-auto mt-8">
      <div className="w-[65%]  flex flex-col gap-3">
        <div>
          <h1>Delivery Address</h1>
        </div>
        <div className="flex flex-col gap-2 border w-full">
          {cartProducts?.map((product, index) => {
            return <CartElement key={index} product={product} fetchUser={fetchUser} />;
          })}
        </div>
      </div>
      <div className="w-[33%] border">
        <div>PRICE DETAILS</div>
        <div>Price: {totalPrice}</div>
      </div>
    </div>
  );
};

export default Cart;
