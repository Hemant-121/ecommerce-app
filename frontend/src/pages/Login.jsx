import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../services/ApiServices";
import toast from "react-hot-toast";
import { setUser } from "../redux-toolkit/authSlice";
import { useDispatch } from 'react-redux';


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

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    console.log(formData);
  
    const response = await userLogin(formData);
    // console.log(response)
    if (!response.data.success) {
      toast.error(response.data.message);
    } else {
      toast.success(response.data.message);
      dispatch(setUser(response.data.data));
      navigate('/')
    }
    // console.log(response)
  };


  return (
    <div className="  h-[88vh] p-5 flex items-center justify-center">
      <div className="container mx-auto max-w-md p-10  rounded bg-slate-200">
        <h2 className=" flex items-center justify-center text-[2rem] mb-4 font-bold ">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email:
            </label>
            <input
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
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              Password:
            </label>
            <input
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
