import React, { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import ReviewsItem from "./ReviewsItem";
import AddMenu from "./AddMenu";
import GlobalApi from "@/app/_utils/GlobalApi";
import Loading from "../layouts/Loading";

interface ReviewsProps {
  name: string;
  setSelectedMenu: React.Dispatch<React.SetStateAction<any>>;
  slug: string;
  setPointOrta: React.Dispatch<React.SetStateAction<any>>;
  pointOrta: number;
}

const Reviews: React.FC<ReviewsProps> = ({
  name,
  setSelectedMenu,
  slug,
  setPointOrta,
  pointOrta,
}) => {
  const [addMenu, setAddMenu] = useState<boolean>(false);
  const [reviewData, setReviewData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [itemPost, setItemPost] = useState<boolean>(false);

  const getReviews = async () => {
    const res: any = await GlobalApi.GetReviewItem(slug);
    setReviewData(res.reviews);
    let total = 0;
    for (let data of res.reviews) {
      total += data.star;
    }
    setPointOrta((total / res.reviews.length).toFixed(1));
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getReviews();
  }, [addMenu, itemPost]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-white rounded-lg shadow-md w-full md:h-[600px] overflow-y-auto p-5 ">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl text-gotur-main">
            Reviews for {name}
          </h1>
          <div className="flex gap-4 md:gap-6">
            <div className="flex items-center gap-1">
              <BsStarFill className="text-gotur-secondary drop-shadow-md" />
              <p className="opacity-70 md:font-bold">
                {pointOrta ? pointOrta : 0}
              </p>
            </div>
            <button
              className="bg-gotur-secondary text-gotur-main rounded-lg shadow-md px-2 hover:scale-105 ease-in transition duration-100"
              onClick={() => setAddMenu(!addMenu)}
            >
              Add Review
            </button>
          </div>
        </div>
        <IoIosCloseCircle
          className="text-gotur-main text-3xl cursor-pointer hover:scale-105 ease-in transition duration-100"
          onClick={() => setSelectedMenu("menu")}
        />
      </div>
      {addMenu && (
        <AddMenu
          setAddMenu={setAddMenu}
          setItemPost={setItemPost}
          itemPost={itemPost}
          slug={slug}
        />
      )}
      {loading && <h1>Loading Reviews...</h1>}
      {reviewData?.length > 0 &&
        reviewData
          .slice()
          .reverse()
          .map((item: any, index: number) => (
            <ReviewsItem item={item} key={index} />
          ))}
    </div>
  );
};

export default Reviews;
