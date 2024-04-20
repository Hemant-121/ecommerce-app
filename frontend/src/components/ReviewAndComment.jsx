/* eslint-disable react/prop-types */
import  { useState } from 'react';
import { FaStar } from "react-icons/fa";
import { addReview } from '../services/ApiServices';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const ReviewAndComment = ({id, fetchProductData}) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState('');

  const reviews = useSelector((state)=> state?.auth?.user?.reviews);

  const [rated, setRated] = useState(reviews?.includes(id));


  const handleCommentChange = (event) => {
    setComment(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(rating);
    console.log(comment);
    if (rating ===null ||  comment?.length <=5) {
      toast.error('Please fill in all fields');
      return;
    }
    if(rated){
      toast.error('Only one review is allowed');
      return;
    }
    const data = {
      rating: rating,
      comment: comment
    }
    const res = await addReview(id, data)
    console.log(res)
    if (res.data.success) {
      toast.success(res.data.message);
      setRated(true)
      // fetchReviews();
      fetchProductData();
    } else {
      toast.error(res.data.message);
    }
    setRating(null);
    setComment('');
  };


  return (
    <div className="container">
        <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
            <div className='flex gap-1'>
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <label key={index}>
                        <input type="radio"
                        name='rating'
                        value={currentRating}
                        onClick={()=> setRating(currentRating)}
                        className='hidden'
                        />
                        <FaStar size={30} className='cursor-pointer '
                        color={currentRating <= (hover || rating) ? '#FFDF00' : '#98988b'}
                        onMouseEnter={() => setHover(currentRating)}
                        onMouseLeave={() => setHover(null)}
                        />

                    </label>
                );
            })}
            </div>
          <div className="">
          <textarea
              type="text"
              placeholder="Describe your experience.."
              className="w-full h-auto outline-none auto-expand-textarea resize-none mt-3"
              value={comment}
              onChange={handleCommentChange}
            />
            <button type='submit' className='btn px-4 py-2 border rounded-md'>Submit</button>
          </div>
        </form>
      </div>
  );
};
export default ReviewAndComment;
