import { useSelector } from "react-redux"
import WishListCard from "../components/WishListCard";


const WishList = () => {
    const wishList = useSelector((state)=> state.auth?.user?.wishList);

    console.log(wishList)

  return (
    <div className='w-[60vw] mx-auto mt-4'>
      {wishList?.map((id, index) => (
        <div key={index}>
          <WishListCard
            id={id}
          />
        </div>
      ))}
    </div>
  );
}

export default WishList
