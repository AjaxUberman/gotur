import Image from "next/image";
import Link from "next/link";
import React from "react";

interface final {
  loading: boolean;
  setSearchMenuActive: React.Dispatch<React.SetStateAction<any>>;
  filteredDatas: any[];
}

const SearchMenu: React.FC<final> = ({
  loading,
  filteredDatas,
  setSearchMenuActive,
}) => {
  console.log(filteredDatas);
  return (
    <div className="border bg-white border-gotur-main rounded-md shadow-md p-4 ">
      {loading && (
        <div className="flex justify-center items-center ">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-8 w-8"></div>
        </div>
      )}

      <div className="flex flex-col">
        {filteredDatas &&
          filteredDatas.map((data, index) => (
            <Link
              href={"/restaurants/" + data.slug}
              key={index}
              className="flex items-center border-b gap-4 p-4"
              onClick={() => setSearchMenuActive(false)}
            >
              <Image
                alt={data.name}
                src={data.banner.url}
                width={60}
                height={60}
                className="object-cover h-10 w-10 rounded-sm shadow-sm"
              />
              <h3 className="font-semibold">
                {data.name.length > 15
                  ? data.name.slice(0, 15).concat("...")
                  : data.name}
              </h3>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default SearchMenu;
