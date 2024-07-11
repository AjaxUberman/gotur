import React from "react";
import BusinessList from "../BusinessList";
import CategoryList from "@/components/CategoryList";

const MainPage = () => {
  return (
    <div className="2xl:px-60">
      <CategoryList />
      <BusinessList />
    </div>
  );
};

export default MainPage;
