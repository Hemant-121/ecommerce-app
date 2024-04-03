import { useState } from "react";
import toast from "react-hot-toast";
import { AddNewProduct } from "../services/ApiServices.js";

const AddProduct = () => {
          const [formData, setFormData] = useState({
            prodName: "",
            prodImages: [],
            prodPrice: "",
            prodDesc: "",
            category: "",
            keywords: [],
            brand: "",
          });

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]:
          name === "prodImages" || name === "keywords"
            ? value.split(",")
            : value,
      }));
    }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.prodName ||
      formData.prodImages.length === 0 ||
      !formData.prodPrice ||
      !formData.prodDesc ||
      !formData.category ||
      formData.keywords.length === 0 ||
      !formData.brand
    ) {
      toast.error("All fields are required");
      return;
    }

    // Validate price as positive number
    const price = parseFloat(formData.prodPrice);
    if (isNaN(price) || price <= 0) {
      toast.error("Price must be a positive number");
      return;
    }

    const res = await AddNewProduct(formData);
    if (res.data.success) {
      toast.success(res.data.message);
      setFormData({
        prodName: "",
        prodImages: [],
        prodPrice: "",
        prodDesc: "",
        category: "",
        keywords: [],
        brand: "",
        attributes: {},
      });
    } else {
      toast.error(res.data.message);
    }
    console.log(formData);
  };

  return (<>
    <div className=" flex items-center justify-center bg-gray-50">
      <div className="">
        <h1 className="text-2xl font-bold text-center mb-8">New Product</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="prodName" className="block text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                id="prodName"
                name="prodName"
                value={formData.prodName}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="prodPrice" className="block text-gray-700">
                Product Price
              </label>
              <input
                type="number"
                id="prodPrice"
                name="prodPrice"
                value={formData.prodPrice}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="brand" className="block text-gray-700">
                Brand
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-gray-700">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="prodDesc" className="block text-gray-700">
                Product Description
              </label>
              <textarea
                id="prodDesc"
                name="prodDesc"
                value={formData.prodDesc}
                onChange={handleChange}
                required
                rows="4"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="col-span-2">
              <label htmlFor="prodImages" className="block text-gray-700">
                Product Image URLs (comma-separated)
              </label>
              <textarea
                id="prodImages"
                name="prodImages"
                value={formData.prodImages.join(",")}
                onChange={handleChange}
                required
                rows="4"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
            
            <div className="col-span-2">
              <label htmlFor="keywords" className="block text-gray-700">
                Keywords (comma-separated)
              </label>
              <input
                type="text"
                id="keywords"
                name="keywords"
                value={formData.keywords.join(",")}
                onChange={handleChange}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md w-full"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default AddProduct;
