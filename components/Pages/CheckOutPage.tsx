"use client";
import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { FaTurkishLiraSign } from "react-icons/fa6";
import { toast } from "sonner";
import { MdDeleteForever } from "react-icons/md";
import OrderCardDetails from "../OrderCardDetails";
import Loading from "../layouts/Loading";

interface productName {
  name: string;
}
interface CartItems {
  id: string;
  price: number;
  productDescription: string;
  productName: string;
}

const CheckOutPage = () => {
  const params = useParams();
  const { user } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [cartData, setCartData] = useState<CartItems[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const getDatas = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      try {
        const res = await GlobalApi.GetUserCart(
          user.primaryEmailAddress.emailAddress
        );
        if (Array.isArray(res)) {
          setCartData(res as CartItems[]);
        } else {
          console.error(
            "Unexpected data format returned from GetUserCart:",
            res
          );
        }
      } catch (error) {
        console.error("Error fetching user cart:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.warn("Email address is undefined or null.");
      setLoading(false);
    }
  };

  const removeItemFromCart = async (id: string) => {
    await GlobalApi.DisconnectRestroFromUserCartItem(id).then(async (res) => {
      if (res) {
        await GlobalApi.DeleteCartFromItem(id).then((deleteRes) => {
          if (deleteRes) {
            toast("Item removed");
            setUpdateCart(!updateCart);
            setCartData((prevData) =>
              prevData ? prevData.filter((item) => item.id !== id) : []
            );
          }
        });
      }
    });
  };

  const calculateTotalPrice = () => {
    let total = 0;
    if (cartData) {
      for (let item of cartData) {
        total += item.price;
      }
    }
    return total;
  };

  useEffect(() => {
    const total = calculateTotalPrice();
    setTotalPrice(total);
    user && getDatas();
  }, [user, updateCart]);

  console.log(cartData);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 overflow-x-hidden">
      <div className="lg:col-span-2 flex flex-col ">
        <OrderCardDetails totalPrice={totalPrice} />
      </div>
      <div className="pl-14 my-10 md:mt-36 pb-10 w-[350px]  lg:w-full h-[400px] scrollbar scrollbar-thumb-gotur-main scrollbar-track-purple-200 overflow-y-auto">
        <h3 className="text-gotur-main text-2xl font-bold mb-4">
          {params.name}
        </h3>
        <div className="flex flex-col gap-4 pr-4">
          {cartData &&
            cartData?.length > 0 &&
            cartData.map((item, index) => (
              <div
                key={index}
                className="border border-gotur-main rounded-lg shadow-md p-4"
              >
                <h4 className="font-semibold mb-4">{item.productName}</h4>
                <p className="opacity-70">{item.productDescription}</p>
                <div className="flex justify-between">
                  <div className="flex gap-2 items-center mt-1">
                    <FaTurkishLiraSign />
                    <p className="font-semibold">{item.price}</p>
                  </div>
                  <MdDeleteForever
                    className="text-2xl text-gotur-main hover:text-purple-500 hover:rotate-3 hover:scale-110 cursor-pointer transition duration-200 ease-in"
                    onClick={() => {
                      removeItemFromCart(item.id);
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
