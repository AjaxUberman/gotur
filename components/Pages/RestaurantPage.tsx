"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../layouts/Loading";
import NotFound from "@/app/not-found";
import { MapIcon } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import RestaurantPageItems from "../RestaurantPageItems";
import { BsStarFill } from "react-icons/bs";
import Reviews from "../Reviews/Reviews";
import About from "../Reviews/About";
import { IoArrowBackCircleSharp } from "react-icons/io5";

const RestaurantPage = () => {
  const params = useParams();
  const [category, setCategory] = useState<string>("");
  const [datas, setDatas] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedMenu, setSelectedMenu] = useState<string>("menu");
  const [pointOrta, setPointOrta] = useState<number>(0);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 754px)" });
  const router = useRouter();

  useEffect(() => {
    if (params) {
      setCategory(params.id as string);
    }
  }, [params]);

  const getRestaurantDatas = async (restaurantID: string) => {
    if (restaurantID) {
      try {
        const res = await GlobalApi.getBusinessDetail(restaurantID);
        setDatas(res);
      } catch (error) {
        console.error("Failed to fetch restaurant data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getReviewPoint = async () => {
    try {
      const res = await GlobalApi.GetReviewItem(datas?.restaurant.slug);
      let total = 0;
      for (let data of res.reviews) {
        total += data.star;
      }
      setPointOrta((total / res.reviews.length).toFixed(1));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getReviewPoint();
  }, [datas]);

  useEffect(() => {
    getRestaurantDatas(category);
  }, [category]);

  if (!datas) {
    return <Loading />;
  }

  const restaurant = datas.restaurant;
  if (restaurant === null) {
    return <NotFound />;
  }

  return (
    <div className="relative overflow-x-hidden">
      {restaurant && (
        <div className="pt-10 md:px-0 pl-4 2xl:px-20 ">
          <IoArrowBackCircleSharp
            className="text-gotur-main text-4xl cursor-pointer hover:scale-110 transition ease-in duration-100 mb-2"
            onClick={() => router.back()}
          />
          <div className="flex gap-4 border-b pb-4">
            {restaurant?.banner?.url && (
              <Image
                src={restaurant.banner.url}
                alt={restaurant.name}
                width={150}
                height={150}
                className="rounded-lg lg:w-[150px] lg:h-[150px] shadow-md object-cover"
              />
            )}
            <div className="flex flex-col gap-4  justify-between w-full ">
              <div className="flex md:flex-row flex-col justify-between mr-4">
                <div className="flex gap-2 opacity-70">
                  {restaurant?.categories?.length > 0
                    ? restaurant.categories.map(
                        (category_: string, index: number) => (
                          <p key={index}>{category_.name}</p>
                        )
                      )
                    : restaurant.categories[0].name}
                </div>
                <div className="flex gap-1 items-center pr-2 md:scale-125 md:gap-1">
                  <button
                    className="text-gotur-main underline cursor-pointer"
                    onClick={() => setSelectedMenu("reviews")}
                  >
                    Reviews
                  </button>
                  <BsStarFill className="text-gotur-secondary drop-shadow-md" />
                  <p className="opacity-70 md:font-bold">
                    {pointOrta ? pointOrta : 0}
                  </p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:justify-between  gap-1 md:items-end">
                <div className="flex flex-col md:gap-6">
                  <h3 className="font-bold text-2xl md:text-4xl mb-2 text-gotur-main ">
                    {restaurant.name}
                  </h3>
                  <div className="flex gap-2 items-center">
                    <MapIcon className="text-gotur-main" />
                    <p className="opacity-70 text-sm whitespace-nowrap ">
                      {isTabletOrMobile
                        ? restaurant.address.slice(0, 15).concat("...")
                        : restaurant.address}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-gotur-secondary shadow-md text-gotur-main hover:yellow-400 hover:border hover:scale-105 transition duration-100 ease-in rounded-lg w-fit px-4  md:px-8 md:py-2 h-10 lg:mr-3 font-semibold"
                  onClick={() => setSelectedMenu("about")}
                >
                  About
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <RestaurantPageItems restaurant={restaurant} />

      {selectedMenu === "reviews" && (
        <div className="absolute top-0 px-10  md:px-10 lg:px-40 py-10 w-full z-40 drop-shadow-lg">
          <Reviews
            name={restaurant.name}
            key={restaurant}
            slug={restaurant.slug}
            setSelectedMenu={setSelectedMenu}
            setPointOrta={setPointOrta}
            pointOrta={pointOrta}
          />
        </div>
      )}
      {selectedMenu === "about" && (
        <div className="absolute top-0 px-10 py-10 w-full z-40">
          <About
            name={restaurant.name}
            address={restaurant.address}
            description={restaurant.aboutUs}
            setSelectedMenu={setSelectedMenu}
          />
        </div>
      )}
    </div>
  );
};

export default RestaurantPage;
