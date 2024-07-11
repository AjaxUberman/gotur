import React, { useContext } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { FaTurkishLiraSign } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";
import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import Link from "next/link";

interface ActiveCartMenuProps {
  datas: UserCart[];
  totalPrice: number;
  setMenuActive: React.Dispatch<React.SetStateAction<any>>;
}

interface UserCart {
  id: string;
  price: number;
  productDescription: string;
  productName: string;
  restaurant: {
    name: string;
  };
}

const ActiveCartMenu: React.FC<ActiveCartMenuProps> = ({
  datas,
  totalPrice,
  setMenuActive,
}) => {
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);

  const removeItemFromCart = async (id: string) => {
    await GlobalApi.DisconnectRestroFromUserCartItem(id).then((res) => {
      if (res) {
        const deleteData = async () =>
          await GlobalApi.DeleteCartFromItem(id).then((res) => {
            toast("Item removed");
            setUpdateCart(!updateCart);
          });
        deleteData();
      }
    });
  };

  return (
    <div className="border border-gotur-main rounded-md shadow-md z-50 md:w-80 md:p-5 p-10 bg-white absolute top-6 right-10 md:right-20 lg:right-44 md:top-6  translate-y-14 overflow-y-scroll scrollbar scrollbar-thumb-gotur-main scrollbar-track-purple-200 nax-h-[430px]">
      <div className="flex justify-between items-center border-b">
        <h4 className="font-semibold text-xl text-gotur-main">
          {datas[0]?.restaurant.name
            ? datas[0]?.restaurant.name
            : "Add Some Foods :) "}
        </h4>
        <IoMdCloseCircle
          className="text-2xl text-gotur-main cursor-pointer hover:scale-110 transition duration-100 ease-in"
          onClick={() => setMenuActive(false)}
        />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {datas.length > 0 &&
          datas?.map((data: UserCart, index: number) => (
            <div
              key={index}
              className="bg-gotur-main bg-opacity-20 rounded-lg shadow-md p-4 text-black"
            >
              <h5 className="border-b font-semibold border-gray-600">
                {data.productName}
              </h5>
              <p className="text-sm opacity-60 mt-2">
                {data.productDescription}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex items-center mt-1">
                  <FaTurkishLiraSign />
                  <p className="font-semibold text-xl">{data.price}</p>
                </div>
                <MdDeleteForever
                  className="text-2xl text-gotur-main hover:text-purple-500 hover:rotate-3 hover:scale-110 cursor-pointer transition duration-200 ease-in"
                  onClick={() => {
                    removeItemFromCart(data.id);
                  }}
                />
              </div>
            </div>
          ))}
        {datas[0]?.restaurant.name && (
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-1 flex items-center text-gotur-main">
              <FaTurkishLiraSign />
              <h4 className="font-semibold text-xl">{totalPrice}</h4>
            </div>
            <Link
              href={"/checkout/" + datas[0]?.restaurant.name}
              className="col-span-3 bg-gotur-secondary rounded-lg shadow-md font-semibold hover:bg-yellow-400 hover:scale-105 transition duration-100 ease-in text-gotur-main px-4 py-1 w-full text-center "
              onClick={() => setMenuActive(false)}
            >
              Order
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveCartMenu;
