import { useRouter } from "next/navigation";
import React from "react";
import { FaTurkishLiraSign } from "react-icons/fa6";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const OrderCardDetails = ({ totalPrice }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 p-10 md:mt-32 lg:p-36 lg:mt-0">
      <IoArrowBackCircleSharp
        className="text-gotur-main text-4xl cursor-pointer hover:scale-110 transition ease-in duration-100"
        onClick={() => router.back()}
      />
      <div className="flex flex-col">
        <p className="text-sm">Card Name:</p>
        <input
          className="bg-gray-100 w-full h-10 shadow-sm rounded-md pl-4"
          type="text"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-sm">Card Number:</p>
        <input
          className="bg-gray-100 w-full h-10 shadow-sm rounded-md pl-4"
          type="number"
        />
      </div>
      <div className="grid grid-cols-3 gap-10">
        <div className="flex flex-col">
          <p className="text-sm">End Date: (MM/YY)</p>
          <div className="grid grid-cols-2 gap-1">
            <input className="bg-gray-100 w-full h-10 shadow-sm rounded-md pl-4" />
            <input className="bg-gray-100 w-full h-10 shadow-sm rounded-md pl-4" />
          </div>
        </div>
        <div className="flex flex-col col-span-2">
          <p className="text-sm">CVC:</p>
          <input className="bg-gray-100 w-full h-10 shadow-sm rounded-md pl-4" />
        </div>
      </div>
      <div>
        <button className="flex  bg-gotur-main rounded-lg w-full items-center py-2 justify-center text-white font-bold tracking-wider hover:scale-110 ease-in transition duration-100 hover:bg-purple-600">
          Pay {totalPrice}
          <FaTurkishLiraSign />
        </button>
      </div>
    </div>
  );
};

export default OrderCardDetails;
