const Card = () => {
    return (
      <div className="card w-60 h-auto bg-base-100 shadow-xl lg:h-auto rounded-md">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
            className="w-full h-auto"
          />
        </figure>
        <div className="card">
          <h2 className="">Price $500</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
        </div>
      </div>
    );
  };
  
  export default Card;
  