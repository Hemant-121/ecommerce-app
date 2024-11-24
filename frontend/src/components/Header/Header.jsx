import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateUser } from "../../redux-toolkit/authSlice";
import toast from "react-hot-toast";
import { getCurrentUser, userLogout } from "../../services/ApiServices";
import { setSellerProd } from "../../redux-toolkit/sellerProductSlice";
import { BsHeart } from "react-icons/bs";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isSeller = useSelector((state) => state.auth.isSeller);
  const user = useSelector((state) => state.auth?.user);
  const wishList = useSelector((state) => state.auth.user?.wishList);
  const cart = useSelector((state) => state.auth.user?.cart);
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        console.log("User current", response.data.data);
        dispatch(updateUser(response.data.data));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, [dispatch])
  

  const handleLogout = async () => {
    try {
      const res = await userLogout();
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
      dispatch(logout());
      dispatch(setSellerProd());
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return (
    <>
      <div className="navbar fixed z-50 bg-blue-100 h-[8vh] p-3 flex items-center justify-evenly">
        <div className="flex">
          <Link className="btn btn-ghost lg:text-3xl sm:text-xl text-blue-600 font-extrabold">
            FlipCart
          </Link>
        </div>

        {isAuthenticated || !isSeller ? (
          <div className="form-control flex">
            <label htmlFor="search"></label>
            <input
              type="text"
              placeholder="Search"
              id="search"
              name="search"
              className="input input-bordered w-24 md:w-auto bg-blue-100 focus:outline-none"
            />
          </div>
        ) : null}

        {isAuthenticated && isSeller ? (
          <div className="flex gap-2">
            <Link to="/add-product">
              <button className="btn btn-ghost">Add Product</button>
            </Link>
            <Link to="/my-product">
              <button className="btn btn-ghost">All Products</button>
            </Link>
          </div>
        ) : null}

        <div className="flex gap-2">
          {isAuthenticated ? (
            <div className="hidden md:block lg:block">
              <h3>
                Welcome{" "}
                <span className="text-2xl text-blue-700">
                  {user?.fullName?.toUpperCase()}
                </span>
              </h3>
            </div>
          ) : null}
          <div className="flex gap-2">
            {isAuthenticated ? (
              <Link to={"/wishlist"}>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <BsHeart size={24} />
                    </svg>
                    {wishList?.length > 0 ? (
                      <span className="badge badge-sm indicator-item">
                        {wishList?.length}
                      </span>
                    ) : null}
                  </div>
                </div>
              </Link>
            ) : null}

              <Link to={'/cart'}
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {cart?.length > 0 ? (
                    <span className="badge badge-sm indicator-item">
                      {cart?.length}
                    </span>
                  ) : null}
                </div>
              </Link>


            {!isAuthenticated ? (
              location.pathname === "/login" ? (
                <Link to="/register">
                  <button className="btn btn-outline">Register</button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="btn btn-outline">Login</button>
                </Link>
              )
            ) : (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to={"/user-profile"}>Profile</Link>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li onClick={handleLogout}>
                    <Link to="/">Logout</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="navbar  bg-blue-100 h-[8vh] p-3 flex items-center justify-evenly"></div>
    </>
  );
};

export default Header;