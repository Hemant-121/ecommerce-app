import Carousal from "../components/Home/Carousal";
import Slider from "../components/Home/Slider";

const Home = () => {
  return (
    <div className="h-[92vh] ">
      <div className="flex flex-col gap-3 mx-4">
        <Carousal />
      </div>
      <div className="flex flex-col gap-3 mx-4 mb-4 border  pb-4 bg-white">
        <h1 className="w-full  p-2 text-3xl">Top Deals</h1>
        <Slider />
      </div>
      <div className="flex flex-col gap-3 mx-4 mb-4 border  pb-4 bg-white">
        <h1 className="w-full  p-2 text-3xl">Top Deals</h1>
        <Slider />
      </div>
      <div className="flex flex-col gap-3 mx-4 mb-4 border  pb-4 bg-white">
        <h1 className="w-full  p-2 text-3xl">Top Deals</h1>
        <Slider />
      </div>
      <div className="flex flex-col gap-3 mx-4 mb-4 border  pb-4 bg-white">
        <h1 className="w-full  p-2 text-3xl">Top Deals</h1>
        <Slider />
      </div>
      <div className="flex flex-col gap-3 mx-4 mb-4 border  pb-4 bg-white">
        <h1 className="w-full  p-2 text-3xl">Top Deals</h1>
        <Slider />
      </div>
      
      
    </div>
  );
};

export default Home;
