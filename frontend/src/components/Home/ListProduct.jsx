/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ListProduct = ({ product, deleteProduct }) => {

  return (
    <div className="flex items-center justify-between border p-4 mb-4 w-full h-[30vh] overflow-hidden bg-white">
      <div className="h-[250px] carousel carousel-vertical rounded-box">
        {product.prodImages.map((image, index) => {
          return (
            <div key={index} className="carousel-item w-full">
              <img
                src={image}
                alt={product.prodName}
                className="w-[250PX] h-[250px] transition-transform transform hover:scale-105 p-5"
              />
            </div>
          );
        })}
      </div>

  
      <div className="w-1/2 mx-4">
        <h2 className="text-xl font-bold">{product.prodName}</h2>
        <p className="text-gray-700 mb-2">₹ {product.prodPrice}</p>
      </div>

      <div className="flex items-center">
        <Link to={`/edit-product/${product._id}`}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
            Update
          </button>
        </Link>
        <Link to={'/my-product'}>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={async() => {
              const res = await deleteProduct(product._id);
              if (res.data.success) {
                toast.success(res.data.message);
                window.location.reload();
              }
              else{
                toast.error(res.data.message);
              }
            }}          
          >
            Delete
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ListProduct;
