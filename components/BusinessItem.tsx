import GlobalApi from "@/app/_utils/GlobalApi";
import { AlarmClock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsStarFill } from "react-icons/bs";

interface Banner {
  url: string;
}
interface Business {
  id: number;
  name: string;
  slug: string;
  address: string;
  aboutUs: string;
  workingHours: string;
  restroType: any[];
  categories: object;
  banner: Banner;
}

const BusinessItem: React.FC<{ business: Business }> = ({ business }) => {
  const [pointOrta, setPointOrta] = useState<number>(0);
  const getReviewPoint = async () => {
    await GlobalApi.GetReviewItem(business.slug).then((res) => {
      let total = 0;
      for (let data of res.reviews) {
        total += data.star;
      }
      setPointOrta((total / res.reviews.length).toFixed(1));
    });
  };
  useEffect(() => {
    getReviewPoint();
  }, [business]);

  return (
    <Link
      href={"/restaurants/" + business.slug}
      className=" rounded-lg shadow-sm group  "
    >
      <Image
        src={business.banner?.url}
        width={200}
        height={130}
        alt={business.name}
        className="h-[130px] object-cover w-full border group-hover:scale-105 group-hover:border-gotur-main transition duration-200 ease-in rounded-md drop-shadow-md"
      />
      <div className="pl-2 py-2 flex flex-col gap-1">
        <div className="flex justify-between">
          <h4 className="font-bold text-xl pl-1 group-hover:tracking-wide transition duration-200 ease-in">
            {business.name}
          </h4>
          <div className="flex gap-1 items-center pr-2">
            <BsStarFill className="text-gotur-secondary drop-shadow-md group-hover:scale-125 transition duration-200 ease-in" />
            <p className="opacity-70">{pointOrta ? pointOrta : 0}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <AlarmClock className="text-gotur-main scale-75 group-hover:rotate-6 transition duration-200 ease-in" />
          <p className="opacity-65 text-sm">{business.workingHours}</p>
        </div>
      </div>
    </Link>
  );
};

export default BusinessItem;
