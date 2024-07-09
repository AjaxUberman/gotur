import React from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { MapIcon } from "lucide-react";

interface ReviewsProps {
  name: string;
  address: string;
  description: string;
  setSelectedMenu: React.Dispatch<React.SetStateAction<any>>;
}

const About: React.FC<ReviewsProps> = ({
  name,
  address,
  description,
  setSelectedMenu,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md w-full p-5 ">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl text-gotur-main">About {name}</h1>
        </div>
        <IoIosCloseCircle
          className="text-gotur-main text-3xl cursor-pointer hover:scale-105 ease-in transition duration-100"
          onClick={() => setSelectedMenu("menu")}
        />
      </div>
      <div className="flex gap-1 mt-4">
        <MapIcon className="text-gotur-main" />
        <p className="opacity-70">{address}</p>
      </div>
      <p className="font-semibold text-lg mt-6">{description}</p>
    </div>
  );
};

export default About;
