import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getProductById,
  likeProduct,
  getCurrentUser,
  addToCart,
  getReviews,
} from "../services/ApiServices";
import toast from "react-hot-toast";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../redux-toolkit/authSlice";
import ReviewAndComment from "../components/ReviewAndComment";
import ReviewsBox from "../components/ReviewsBox";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loader, setLoader] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const wishList = useSelector((state) => state.auth.user?.wishList);
  const cart = useSelector((state) => state.auth.user?.cart);

  const [isLiked, setIsLiked] = useState(wishList?.includes(id));
  const [addedToCart, setAddedToCart] = useState(cart?.includes(id));
  const [reviews, setReviews] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [starCounts, setStarCounts] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  const fetchUser = async () => {
    try {
      const response = await getCurrentUser();
      console.log("User current", response.data.data);
      dispatch(updateUser(response.data.data));
      fetchProductData();
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const calculateReviewStats = (reviews) => {
    // Initialize variables
    let totalReviews = reviews?.length || 0; // Default to 0 if reviews is undefined
    let totalRatings = 0;
    let starCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    // Calculate total ratings and count star occurrences
    reviews?.forEach((review) => {
      totalRatings += review?.rating;
      starCounts[review?.rating]++;
    });

    // Calculate average rating
    let averageRating = totalReviews ? totalRatings / totalReviews : 0; // Check if totalReviews is 0
    // Round average rating to one decimal place
    averageRating = Math.round(averageRating * 10) / 10;

    setAverageRating(averageRating);
    setStarCounts(starCounts);
    console.log(starCounts);
  };

  const fetchProductData = async () => {
    try {
      let response = await getProductById(id);
      const { data } = response.data;
      setProduct(data);
      response = await getReviews(id);
      console.log(response.data.data);
      setReviews(response.data.data);
      calculateReviewStats(response.data.data); // Calculate review stats after setting reviews state
    } catch (error) {
      console.error("Error fetching product data:", error);
      toast.error("Failed to fetch product data");
    }
  };

  //   const fetchReviews = async () => {
  //   try {
  //       const response = await getReviews(id);
  //       console.log(response.data.data)
  //       setReviews(response.data.data);
  //       calculateReviewStats(reviews);

  //   } catch (error) {
  //       console.log("error while getting reviews", error);
  //   }
  // }
  useEffect(() => {
    fetchProductData();
  }, [isLiked, id]);

  const handleLike = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
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

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    await addToCart(id);
    fetchUser();
    setAddedToCart(true);
  };

  return (
    <>
      {!loader && product && (
        <div className="flex flex-col md:flex-row mx-auto w-[90%] mt-5">
          <div className=" border-none w-[100%] sm:w-[100%] md:w-100% lg:w-[40%]" >
            <div className="card glass rounded-none w-full h-[60vh]">
              <div className="carousel absolute w-full">
                {product.prodImages?.map((image, index) => (
                  <div
                    key={index}
                    className="carousel-item w-full h-[50vh] flex items-center justify-center py-2 pt-1"
                  >
                    <div
                      className="fixed top-2 right-2 z-50 cursor-pointer"
                      onClick={handleLike}
                    >
                      {isLiked ? (
                        <FaHeart size={24} color="red" />
                      ) : (
                        <FiHeart size={24} color="gray" />
                      )}
                    </div>
                    <img
                      src={image}
                      className="object-contain h-full w-full"
                      alt={`Product Image ${index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
              <div className="flex justify-between pb-2 px-2">
                {!addedToCart ? (
                  <button
                    className="btn w-1/2 rounded-none bg-[#ff9f00] hover:bg-[#ff9f00]"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <Link
                    to={"/cart"}
                    className="btn w-1/2 rounded-none bg-[#ff9f00] hover:bg-[#ff9f00]"
                  >
                    Go to Cart
                  </Link>
                )}

                <button className="btn w-1/2 rounded-none bg-[#fb641b] hover:bg-[#fb641b]">
                  Buy Now
                </button>
              </div>
          </div>

          <div className="w-[100%] md:pl-5 flex flex-col sm:w-[100%] md:w-100% lg:w-[100%]">
            <div className="mb-4">
              <h2 className="text-3xl font-semibold mb-2">
                {product.prodName}
              </h2>
              <p className="text-green-500 mb-4 text-3xl">
                <span className="text-green-500">₹ {product.prodPrice}</span>
              </p>
            </div>

            <div className="mb-4">
              <p>{product.prodDesc}</p>
            </div>

            <div className="mb-4 border p-5 ">
              <div className="text-[2vw] mb-5 ">
                <div className="flex items-center justify-between mb-5">
                  <span>Ratings & Reviews</span>
                  {isAuthenticated ? (
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        document.getElementById("my_modal_3").showModal()
                      }
                    >
                      rate product
                    </button>
                  ) : null}

                  <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                      <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                        <ReviewAndComment
                          id={id}
                          fetchProductData={fetchProductData}
                        />
                    </div>
                  </dialog>
                </div>

                <div className="w-full flex">
                  <div className="w-[50%] border flex flex-col items-center justify-center">
                    <span className="flex items-center gap-1">
                      {averageRating} <IoStarSharp />{" "}
                    </span>
                    <span className="text-[1vw]">
                      {reviews?.length} Rating & raviews
                    </span>
                  </div>
                  <div className="w-[50%] border text-[1vw] p-2">
                    <span className=" w-full flex items-center gap-1">
                      <div className="flex items-center gap-1">
                        5 <IoStarSharp />
                      </div>
                      <div className="w-[70%]">
                        <progress
                          className="progress progress-success w-full"
                          value={starCounts[5]}
                          max={reviews?.length}
                        ></progress>
                      </div>
                      <h3 className="w-[30%]">{starCounts[5]}</h3>
                    </span>
                    <span className=" w-full flex items-center gap-1">
                      <div className="flex items-center gap-1">
                        4 <IoStarSharp />
                      </div>
                      <div className="w-[70%]">
                        <progress
                          className="progress progress-success w-full"
                          value={starCounts[4]}
                          max={reviews?.length}
                        ></progress>
                      </div>
                      <h3 className="w-[30%]">{starCounts[4]}</h3>
                    </span>
                    <span className=" w-full flex items-center gap-1">
                      <div className="flex items-center gap-1">
                        3 <IoStarSharp />
                      </div>
                      <div className="w-[70%]">
                        <progress
                          className="progress progress-success w-full"
                          value={starCounts[3]}
                          max={reviews?.length}
                        ></progress>
                      </div>
                      <h3 className="w-[30%]">{starCounts[3]}</h3>
                    </span>

                    <span className=" w-full flex items-center gap-1">
                      <div className="flex items-center gap-1">
                        2 <IoStarSharp />
                      </div>
                      <div className="w-[70%]">
                        <progress
                          className="progress progress-warning w-full"
                          value={starCounts[2]}
                          max={reviews?.length}
                        ></progress>
                      </div>
                      <h3 className="w-[30%]">{starCounts[2]}</h3>
                    </span>

                    <span className=" w-full flex items-center gap-1">
                      <div className="flex items-center gap-1">
                        1 <IoStarSharp />
                      </div>
                      <div className="w-[70%]">
                        <progress
                          className="progress progress-error w-full"
                          value={starCounts[1]}
                          max={reviews?.length}
                        ></progress>
                      </div>
                      <h3 className="w-[30%]">{starCounts[1]}</h3>
                    </span>
                  </div>
                </div>
              </div>
              <ReviewsBox reviews={reviews} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailPage;
