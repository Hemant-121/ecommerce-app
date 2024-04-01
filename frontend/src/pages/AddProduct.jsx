import { useState } from "react";
import toast from "react-hot-toast";
import { AddNewProduct } from "../services/ApiServices.js";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    prodName: "",
    prodPrice: "",
    prodDesc: "",
    category: "",
    prodImage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!formData.prodName || !formData.prodPrice || !formData.prodDesc || !formData.category || !formData.prodImage) {
      toast.required("All fields are required");
      return;
    }

    // Validate price as positive number
    const price = parseFloat(formData.prodPrice);
    if (isNaN(price) || price <= 0) {
      toast.error("Price must be a positive number");
      return;
    }

    const res = await AddNewProduct(formData);
    if(res.data.success) {
      toast.success(res.data.message);
      setFormData({
        prodName: "",
        prodPrice: "",
        prodDesc: "",
        category: "",
        prodImage: "",
      });
    }else{
      toast.error(res.data.message);
    }
    console.log(formData);
   
  };

  return (
    <div className="h-[88vh] p-5 flex items-center justify-center overflow-auto bg-white">
      <div className="container mx-auto max-w-md p-10 border rounded-lg text-sm bg-slate-200">
      <h1 className=" flex items-center justify-center text-[2rem] mb-4 font-bold">
          NewProduct
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="prodName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="prodName"
              name="prodName"
              value={formData.prodName}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="prodPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Product Price
            </label>
            <input
              type="number"
              id="prodPrice"
              name="prodPrice"
              value={formData.prodPrice}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="prodDesc"
              className="block text-sm font-medium text-gray-700"
            >
              Product Description
            </label>
            <textarea
              id="prodDesc"
              name="prodDesc"
              value={formData.prodDesc}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="prodImage"
              className="block text-sm font-medium text-gray-700"
            >
              Product Image URL
            </label>
            <input
              type="url"
              id="prodImage"
              name="prodImage"
              value={formData.prodImage}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
