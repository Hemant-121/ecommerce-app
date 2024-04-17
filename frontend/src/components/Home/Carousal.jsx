import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Carousal = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel
      responsive={responsive}
      customTransition="all 2"
      autoPlaySpeed={2000}
      transitionDuration={100}
      autoPlay={true}
      keyBoardControl={true}
      // removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
      removeArrowOnDeviceType={false}
      showDots={true}
      swipeable={true}
      draggable={true}
      infinite={true}
    >
      <div>
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/3000/800/image/bd94c9e6358f3a70.jpg?q=20"
          className="w-full"
        />
      </div>
      <div>
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/3200/540/image/efc2678b65ca1390.jpg?q=20"
          className="w-full"
        />
      </div>
      <div>
        <img
          src="https://rukminim2.flixcart.com/fk-p-flap/3000/510/image/a6311495f641d028.jpg?q=20"
          className="w-full"
        />
      </div>
      <div>
        <img
          src="https://rukminim2.flixcart.com/fk-p-flap/3000/510/image/ceb25a1e133b7c45.jpg?q=20"
          className="w-full"
        />
      </div>
    </Carousel>
  );
};

export default Carousal;

