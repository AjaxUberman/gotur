"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import BusinessItem from "./BusinessItem";
import BusinessItemSkelton from "./layouts/BusinessItemSkelton";

const BusinessList: React.FC = () => {
  const params = useSearchParams();
  const [category, setCategory] = useState<string | null>(null);
  const [businessList, setBusinessList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (params) {
      setCategory(params.get("category"));
    }
  }, [params]);

  const getBusinessList = (category_: string | null) => {
    if (category_) {
      GlobalApi.getBusiness(category_).then((res: any) =>
        setBusinessList(res?.restaurants)
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    getBusinessList(category);
  }, [category]);

  return (
    <div className="flex flex-col px-6 md:px-0">
      <h2 className="tracking-wide pt-2 md:text-2xl text-xl font-bold capitalize">
        Popular {category} Restaurants
      </h2>
      <h3 className="md:text-xl text-gotur-main font-semibold">
        {businessList?.length} Restaurants Found
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-4">
        {!loading
          ? businessList?.map((business, index) => (
              <div key={index}>
                <BusinessItem business={business} />
              </div>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
              <BusinessItemSkelton key={index} />
            ))}
      </div>
    </div>
  );
};

export default BusinessList;
