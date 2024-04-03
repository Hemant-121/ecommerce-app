/* eslint-disable react/prop-types */

const ListProduct = ({ product }) => {
  return (
    <div className="flex items-center justify-between border p-4 mb-4 w-full h-[30vh] overflow-hidden">
      {/* Product Image */}
      <div className="h-[250px] carousel carousel-vertical rounded-box">
          {
            product.prodImages.map((image, index) => {
              return (
                <div key={index} className="carousel-item w-full">
                  <img
                    src={image}
                    alt={product.prodName}
                    className="w-full h-[250px] transition-transform transform hover:scale-105 p-5"
                  />
                </div>
              );
            })
          }
        </div>

      {/* Product Details */}
      <div className="w-1/2 mx-4">
        <h2 className="text-xl font-bold">{product.prodName}</h2>
        <p className="text-gray-700 mb-2">${product.prodPrice}</p>
        <p className="text-gray-600">{product.prodDesc}</p>
      </div>

      {/* Update and Delete Buttons */}
      <div className="flex items-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
          Update
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListProduct;
