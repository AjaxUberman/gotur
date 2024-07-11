import React from "react";
import { BsStarFill } from "react-icons/bs";

interface ReviewsItemProps {
  item: {
    createdAt: string;
    email: string;
    id: string;
    reviewText: string;
    star: number;
    userName: string;
  };
}

const ReviewsItem: React.FC<ReviewsItemProps> = ({ item }) => {
  return (
    <div className="bg-gray-100 rounded-md shadow-sm p-4 mt-4">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">{item.userName}</h3>
        <div className="flex items-center gap-1 ">
          <BsStarFill className="text-gotur-secondary drop-shadow-md" />
          <p className="opacity-70 md:font-bold">{item.star}</p>
        </div>
      </div>
      <p className="opacity-70">{item.reviewText}</p>
    </div>
  );
};

export default ReviewsItem;
