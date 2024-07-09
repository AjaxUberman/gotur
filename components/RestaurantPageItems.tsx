"use client";
import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useContext } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { toast } from "sonner";

interface ProductImg {
  url: string;
}
interface MenuItem {
  name: string;
  price: number;
  productImage: ProductImg;
  description: string;
}

interface MenuCategory {
  category: string;
  menuItem: MenuItem[];
}

interface Restaurant {
  menu: MenuCategory[];
}

const RestaurantPageItems: React.FC<{ restaurant: Restaurant }> = ({
  restaurant,
}) => {
  const { user } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);

  const addToCartHandler = async (item: MenuItem) => {
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!email) {
      toast("User email is not available");
      return;
    }

    const data = {
      email,
      name: item.name,
      description: item.description,
      price: item.price,
    };

    try {
      const res = await GlobalApi.AddToCart(data);
      toast("Item Added to Cart");
      setUpdateCart(!updateCart);
    } catch (error) {
      console.error("Error adding to cart", error);
      toast("Failed to add item to cart");
    }
  };
  return (
    <div className="md:px-0 px-10">
      {restaurant?.menu.map((item, index) => (
        <div key={index}>
          <h3 className="font-bold text-2xl pt-4 text-gotur-main mb-2">
            {item.category}
          </h3>
          <div className="grid md:grid-cols-2">
            {item?.menuItem.map((i, idx) => (
              <div
                className="border rounded-lg shadow-sm p-4 grid grid-cols-4 relative"
                key={idx}
              >
                <div className="col-span-3">
                  <h3 className="font-semibold text-xl ">{i.name}</h3>
                  <p className="">{i.price} TL</p>
                  <p className="opacity-80 pt-4">{i.description}</p>
                </div>
                <Image
                  src={i.productImage?.url}
                  alt={i.name}
                  width={400}
                  height={400}
                  className="object-cover  rounded-md"
                />
                <FaPlusCircle
                  className="absolute bottom-4 right-4 text-gotur-main w-10 h-10 z-20 drop-shadow-md cursor-pointer hover:scale-105 ease-in transition duration-100"
                  onClick={() => addToCartHandler(i)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantPageItems;
