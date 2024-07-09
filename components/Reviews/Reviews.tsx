import React from "react";
import { BsStarFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import ReviewsItem from "./ReviewsItem";

interface ReviewsProps {
  name: string;
  setSelectedMenu: React.Dispatch<React.SetStateAction<any>>;
}

const Reviews: React.FC<ReviewsProps> = ({ name, setSelectedMenu }) => {
  return (
    <div className="bg-white rounded-lg shadow-md w-full p-5 ">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl text-gotur-main">
            Reviews for {name}
          </h1>
          <div className="flex items-center gap-1">
            <BsStarFill className="text-gotur-secondary drop-shadow-md" />
            <p className="opacity-70 md:font-bold">4.5</p>
          </div>
        </div>
        <IoIosCloseCircle
          className="text-gotur-main text-3xl cursor-pointer hover:scale-105 ease-in transition duration-100"
          onClick={() => setSelectedMenu("menu")}
        />
      </div>
      <ReviewsItem />
      <ReviewsItem />
    </div>
  );
};

export default Reviews;
