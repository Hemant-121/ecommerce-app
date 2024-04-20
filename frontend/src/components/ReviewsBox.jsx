/* eslint-disable react/prop-types */
import { IoStarSharp } from "react-icons/io5";

const ReviewsBox = ({reviews}) => {
    
    
  return (
    <div className="flex flex-col gap-2">
        {
            reviews?.map((review)=> {
                return (
                    <div key={review?._id} className="border flex flex-col gap-5 p-2">
                        <div className="flex items-center ">
                            <div className={`flex items-center w-auto   text-white px-2 ${review?.rating > 2 ? 'bg-[#388e3c]' : review?.rating == 2 ? 'bg-[#ff9f00]' : 'bg-[#ff6161]'}`}>
                                <h1>{review?.rating}</h1>
                                <IoStarSharp fill="white"/>
                            </div>
                            <h1 className="ml-2">{review?.authorName}</h1>
                        </div>
                        <p>{review?.comment}</p>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ReviewsBox
