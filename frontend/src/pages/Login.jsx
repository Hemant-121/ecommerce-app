import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../services/ApiServices";
import toast from "react-hot-toast";
import { setUser } from "../redux-toolkit/authSlice";
import { useDispatch } from 'react-redux';
import { setProducts } from "../redux-toolkit/productSlice";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  dispatch(setProducts())
  
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    console.log(formData);
    const response = await userLogin(formData);
    if (!response.data.success) {
      toast.error(response.data.message);
    } else {
      toast.success(response.data.message);
      dispatch(setUser(response?.data?.data));
      navigate('/')
    }
  };


  return (
    <div className="  h-[88vh] p-5 flex items-center justify-center">
      <div className="container mx-auto max-w-md px-10 py-20 rounded bg-slate-200">
        <h2 className=" flex items-center justify-center text-[2rem] mb-4 font-bold ">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
            placeholder="Email"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <input
            placeholder="Password"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          <div >
              {`Don't have an account? `}
              <Link to="/register" className="text-blue-500 text-lg">
              <button
            type="submit"
            className="hover:bg-blue-700 text-black font-bold px-2 py-1.5 rounded hover:text-white focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
              </Link>
            </div>
            </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
