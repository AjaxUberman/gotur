import React from "react";
import BusinessList from "../BusinessList";
import CategoryList from "@/components/CategoryList";

const MainPage = () => {
  return (
    <div>
      <CategoryList />
      <BusinessList />
    </div>
  );
};

export default MainPage;
