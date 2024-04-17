import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../services/ApiServices";
import toast from 'react-hot-toast'

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    role: "",
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let newProgress = 0;
    const { password, confirmPassword } = formData;
    if (/[a-z]/.test(password)) newProgress += 15;
    if (/[A-Z]/.test(password)) newProgress += 15;
    if (/\d/.test(password)) newProgress += 15;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    if (specialCharRegex.test(password)) newProgress += 15;

    if (password.length >= 6) {
      newProgress += 20;
    }
    if (password.length >= 6 && confirmPassword === password) {
      newProgress += 20;
    }

    setProgress(newProgress);
  }, [formData]);

  const handleTogglePassword = () => {
    setFormData({
      ...formData,
      showPassword: !formData.showPassword,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const response = await userRegister(formData)
    if (!response.data.success){
      toast.error(response.data.message);
    } else {
      toast.success(response.data.message);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
        role: "",
        showPassword: false,
      });
      navigate("/login")
    }
  };


  return (
    <div className=" h-[88vh] p-5 flex items-center justify-center overflow-auto">
      <div className="container mx-auto max-w-md p-10 border rounded-lg text-sm bg-slate-200">
        <h1 className=" flex items-center justify-center text-[2rem] mb-4 font-bold">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Name"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-2">
            
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              autoComplete="true"
              required
            />
          </div>
         

            <div className="flex text-center h-10  w-full border rounded-md justify-between bg-white mb-2">
              <input
                type={formData.showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-[100%] px-2 rounded-sm outline:none focus:outline-none bg-white"
                required
              />
              <button type="button" onClick={handleTogglePassword} className="px-2">
                {formData.showPassword ? "Hide" : "Show"}
              </button>
            </div>
         

          <div className="mb-2">
            
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-2">
            <progress
              className="progress progress-success w-full"
              value={progress}
              max="100"
            ></progress>
            <p>
              1 lower, upper, digit and special character and length must be 6
              or more
            </p>
          </div>
          <div className="mb-2 flex items-center">
            <label
              htmlFor="male"
              className="block text-gray-700 font-bold mb-1 mr-2"
            >
              Gender:
            </label>
            <div className="flex items-center mr-6">
              <input
                type="radio"
                id="male"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-blue-500 mr-1"
              />
              <label htmlFor="male" className="mr-4">
                Male
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-blue-500 mr-1"
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>

          <div className="mb-2 flex items-center">
            <label
              htmlFor="buyer"
              className="block text-gray-700 font-bold mb-1 mr-2"
            >
              Role:
            </label>
            <div className="flex items-center mr-6">
              <input
                type="radio"
                id="seller"
                name="role"
                value="seller"
                checked={formData.role === "seller"}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-blue-500 mr-1"
              />
              <label htmlFor="seller" className="mr-4">
                Seller
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="buyer"
                name="role"
                value="buyer"
                checked={formData.role === "buyer"}
                onChange={handleChange}
                className="form-radio h-5 w-5 text-blue-500 mr-1"
              />
              <label htmlFor="buyer">Buyer</label>
            </div>
          </div>
          <div className="flex justify-between items-center min-gap-2 md">
            <button
              type="submit"
              className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
            <div>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 text-lg">
                <button
                  type="submit"
                  className="hover:bg-blue-700 text-black font-bold px-2 py-1.5 rounded hover:text-white focus:outline-none focus:shadow-outline"
                >
                  Login
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Register;

