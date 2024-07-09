import React from "react";

const CategorySkeleton = () => {
  return (
    <div
      className={`h-[100px] w-[100px]  md:w-full bg-slate-200 rounded-xl animate-pulse`}
    ></div>
  );
};

export default CategorySkeleton;
