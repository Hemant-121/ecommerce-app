/* eslint-disable react/prop-types */
const Card = ({ product }) => {
  return (
    <div className="card w-60 h-auto bg-base-100 shadow-xl lg:h-auto rounded-md border border-blue-100">
      <figure className="relative overflow-hidden">
        <img
          src={product.prodImage}
          alt="Shoes"
          className="w-full h-[250px] p-4 transition-transform transform hover:scale-105"
        />
        {/* You can add overlay content or effects here */}
      </figure>
      <div className="card flex items-center justify-center">
        <h2 className="text-black">₹ {product.prodPrice}</h2>
        <p className="text-green-500">{product.prodName}</p>
      </div>
    </div>
  );
};

export default Card;
