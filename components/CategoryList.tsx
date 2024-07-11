"use client";

import React, { useEffect, useRef, useState } from "react";
import GlobalApi from "@/app/_utils/GlobalApi";
import Image from "next/image";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import CategorySkeleton from "./layouts/CategorySkeleton";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: {
    url: string;
  };
}

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState<Category[] | undefined>(
    undefined
  );
  const listRef = useRef<HTMLDivElement>(null);
  const params = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const categoryParam = params.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [params]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    await GlobalApi.getCategory()
      .then((res: any) => {
        if (res && res.categories) {
          setCategoryList(res.categories);
          setLoading(false);
        } else {
          console.error("Invalid response format:", res);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const scrollRightHandler = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: 100,
        behavior: "smooth",
      });
    }
  };

  const scrollLeftHandler = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: -100,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-2 md:mt-10 relative">
      <div
        className="flex gap-4 p-4 overflow-auto scrollbar-hide"
        ref={listRef}
      >
        {!loading
          ? categoryList?.map((category, index) => (
              <Link
                href={"?category=" + category.slug}
                key={index}
                className={`flex flex-col items-center gap-2 border p-3 rounded-xl min-w-28 hover:border-gotur-main hover:scale-105 hover:bg-purple-100 transition duration-100 ease-in cursor-pointer group ${
                  category.slug === selectedCategory
                    ? "bg-purple-100 border-gotur-main "
                    : ""
                }`}
              >
                <h3 className="tracking-wide text-sm font-semibold group-hover:text-gotur-main  ">
                  {category.name}
                </h3>
                <Image
                  className="group-hover:scale-125 transition duration-100 ease-in"
                  src={category.icon?.url}
                  alt={category.name}
                  width={40}
                  height={40}
                />
              </Link>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
              <CategorySkeleton key={index} />
            ))}
      </div>
      <ArrowRightCircle
        className="absolute right-4 top-14  bg-gotur-main text-white rounded-full h-8 w-8 cursor-pointer"
        onClick={() => scrollRightHandler()}
      />
      <ArrowLeftCircle
        className="absolute left-6 top-14 bg-gotur-main text-white rounded-full h-8 w-8 cursor-pointer"
        onClick={() => scrollLeftHandler()}
      />
    </div>
  );
};

export default CategoryList;
