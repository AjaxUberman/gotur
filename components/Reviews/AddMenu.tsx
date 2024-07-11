import React, { FC, useState } from "react";
import Rating from "../ui/ReactRating";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";

interface AddMenuProps {
  setAddMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setItemPost: React.Dispatch<React.SetStateAction<boolean>>;
  slug: string;
  itemPost: boolean;
}

interface dataItems {
  email: string;
  userName: string;
  star: number;
  reviewText: string;
  restaurantSlug: string;
}

const AddMenu: FC<AddMenuProps> = ({
  setAddMenu,
  slug,
  setItemPost,
  itemPost,
}) => {
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState<string>("");
  const { user } = useUser();

  const handleSubmit = async () => {
    if (user && user.primaryEmailAddress?.emailAddress) {
      const data: dataItems = {
        email: user.primaryEmailAddress.emailAddress,
        userName: user.fullName || "Guest",
        star: rating,
        reviewText: reviewText,
        restaurantSlug: slug,
      };

      await GlobalApi.PostReview(data)
        .then((res) => {
          console.log("Review posted successfully:", res);
        })
        .catch((error) => {
          console.error("Error posting review:", error);
        })
        .finally(() => {
          setAddMenu(false);
          setItemPost(!itemPost);
        });
    }
  };

  return (
    <div className="border z-40 p-5 rounded-lg shadow-md border-gotur-main w-full h-fit mt-4">
      <div className="">
        <Rating setRating={setRating} rating={rating} />
      </div>
      <div className="mt-2">
        <h5 className="text-xl font-semibold">Your Review:</h5>
        <div className="bg-gray-100 w-full h-40 rounded-md shadow-md mt-2">
          <textarea
            className="w-full p-4 h-full bg-transparent text-start focus:outline-none"
            placeholder="Select your point first..."
            onChange={(e) => setReviewText(e.target.value)}
            disabled={!rating}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 mt-1">
        <button
          className="py-1 bg-gotur-main text-gotur-secondary rounded-lg shadow-md font-semibold tracking-wide hover:scale-110 transition duration-200 ease-in"
          onClick={() => setAddMenu(false)}
        >
          Cancel
        </button>
        <button
          className={`py-1 text-gotur-main bg-gotur-secondary rounded-lg shadow-md font-semibold tracking-wide hover:scale-110 transition duration-200 ease-in ${
            !rating && "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => handleSubmit()}
          disabled={!reviewText}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AddMenu;
