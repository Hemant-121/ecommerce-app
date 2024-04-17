/* eslint-disable react/prop-types */
import Card from "./Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 9,
    slidesToSlide: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 5,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1200, min: 700 },
    items: 3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 700, min: 500 },
    items: 2,
    slidesToSlide: 1,
  },
  sm: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};
export default function Slider({products}) {
  return (
    <Carousel
      responsive={responsive}
      swipeable={true}
      autoPlaySpeed={1000}
      transitionDuration={100}
      draggable={true}
      keyBoardControl={true}
      removeArrowOnDeviceType={["tablet", "mobile", "sm"]}
      itemClass="carousel-item-padding-40-px"  
    >
      {products && products.length > 0 ? (
        products.map((product, index) => (
          <div key={index} className="p-1 flex justify-evenly">
            <Card product={product} />
          </div>
        ))
      ) : (
        <p>No products available</p>
      )}
      
    </Carousel>
  );
}
