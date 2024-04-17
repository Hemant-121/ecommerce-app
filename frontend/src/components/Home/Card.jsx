/* eslint-disable react/prop-types */

import {Link} from 'react-router-dom'
const Card = ({ product }) => {
  return (
    <div className="card w-60 h-auto bg-base-100 shadow-xl lg:h-auto rounded-md border border-blue-100 z-10">
      <figure className="relative overflow-hidden">
        <div className="h-[250px] carousel carousel-vertical rounded-box">
          {product.prodImages.map((image, index) => {
            return (
              <div key={index} className="carousel-item w-full">
                <img
                  src={image}
                  alt='image'
                  className="max-w-full h-[250px] transition-transform transform hover:scale-105 p-4 mx-auto"
                />
              </div>
            );
          })}
        </div>
      </figure>
      <Link to={`/product-detail/${product._id}`} className='cursor-pointer'> 
      <div className="card flex items-center justify-center">
        <h2 className="text-black">₹ {product.prodPrice}</h2>
        <p className="text-green-500">
          {product.prodName.length > 20
            ? `${product.prodName.substring(0, 20)}...`
            : product.prodName}
        </p>
      </div>
      </Link>
    </div>
  );
};
export default Card;
