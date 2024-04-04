import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct, getCategory} from "../services/ApiServices.js";

const EditProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    prodName: "",
    prodImages: [],
    prodPrice: "",
    prodDesc: "",
    prodCategory: "",
    keywords: [],
    brand: "",
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await getProductById(id);
        let { prodName, prodImages, prodPrice, prodDesc, prodCategory, keywords, brand } = response.data.data;
        const res = await getCategory(prodCategory);
        const { name } = res.data.data;
        prodCategory = name;
        setFormData({
          prodName,
          prodImages,
          prodPrice,
          prodDesc,
          prodCategory,
          keywords,
          brand,
        });
      } catch (error) {
        console.error("Error fetching product data:", error);
        toast.error("Failed to fetch product data");
      }
    };
    fetchProductData();
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "prodImages" || name === "keywords" ? value.split(",") : value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(id, formData);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/my-product')
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };

  return (
    <>
      <div className=" flex items-center justify-center  min-h-[91.7vh]">
        <div className=" border border-gray-300 py-10 px-10 bg-slate-400 rounded-lg min-w-[50vw]">
          <h1 className="text-2xl font-bold text-center mb-8">Edit Product</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="prodName" className="block text-gray-700">
              </label>
              <input
                placeholder="Product Name"
                type="text"
                id="prodName"
                name="prodName"
                value={formData.prodName}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-blue-100 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="prodPrice" className="block text-gray-700">
                
              </label>
              <input
                placeholder="Product Price"
                type="number"
                id="prodPrice"
                name="prodPrice"
                value={formData.prodPrice}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 bg-blue-100 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="brand" className="block text-gray-700">
                
              </label>
              <input
              placeholder="Brand"
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 bg-blue-100 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="prodCategory" className="block text-gray-700">
                
              </label>
              <input
              placeholder="prodCategory"
                type="text"
                id="prodCategory"
                name="prodCategory"
                value={formData.prodCategory}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 bg-blue-100 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="prodDesc" className="block text-gray-700">
                
              </label>
              <textarea
              placeholder="Product Description"
                id="prodDesc"
                name="prodDesc"
                value={formData.prodDesc}
                onChange={handleChange}
                required
                rows="4"
                className="mt-1 p-2 w-full border border-gray-300 bg-blue-100 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="prodImages" className="block text-gray-700">
                
              </label>
              <textarea
              placeholder="Product Image URLs (comma-separated)"
                id="prodImages"
                name="prodImages"
                value={formData.prodImages.join(",")}
                onChange={handleChange}
                required
                rows="4"
                className="mt-1 p-2 w-full border border-gray-300 bg-blue-100 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            
            <div className="col-span-2">
              <label htmlFor="keywords" className="block text-gray-700">
                
              </label>
              <input
              placeholder="Keywords (comma-separated)"
                type="text"
                id="keywords"
                name="keywords"
                value={formData.keywords.join(",")}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 bg-blue-100 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md w-full"
          >
            Submit
          </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProductPage;
