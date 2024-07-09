import React from "react";
import { BsStarFill } from "react-icons/bs";

const ReviewsItem = () => {
  return (
    <div className="bg-gray-100 rounded-md shadow-sm p-4 mt-4">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold">John Doe</h3>
        <div className="flex items-center gap-1 ">
          <BsStarFill className="text-gotur-secondary drop-shadow-md" />
          <p className="opacity-70 md:font-bold">4.5</p>
        </div>
      </div>
      <p className="opacity-70">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quia, maiores.
      </p>
    </div>
  );
};

export default ReviewsItem;
