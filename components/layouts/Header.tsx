import React, { useContext, useEffect, useState } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Image from "next/image";
import mainLogo from "@/public/gotur_logo.png";
import { IoIosSearch } from "react-icons/io";
import Link from "next/link";
import { CgShoppingCart } from "react-icons/cg";
import { CartUpdateContext } from "@/app/_context/CartUpdateContext";
import GlobalApi from "@/app/_utils/GlobalApi";

const Header = () => {
  const { updateCart } = useContext(CartUpdateContext);
  const { user } = useUser();
  const [datas, setDatas] = useState<any[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const getUserCart = () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GlobalApi.GetUserCart(user.primaryEmailAddress.emailAddress)
        .then((res: any) => setDatas(res))
        .catch((error) => console.error("Error fetching user cart:", error));
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserCart();
  }, [updateCart, user]);

  console.log(datas);

  return (
    <div className="flex justify-around md:py-4 items-center bg-gotur-main shadow-md">
      <Link href={"/"} className="flex items-center">
        <Image src={mainLogo} alt="MainLogo" className="w-20 h-20" />
        <h1 className="hidden md:flex text-2xl font-bold text-gotur-secondary">
          GOTUR
        </h1>
      </Link>
      <div className="flex items-center border p-2 rounded-lg bg-gray-100 md:w-96 w-32 shadow-md">
        <input
          type="text"
          className="bg-transparent focus:outline-none w-full"
        />
        <IoIosSearch />
      </div>
      <div className="text-white tracking-wide">
        <SignedIn>
          <div className="flex items-center gap-5 ">
            {loading ? (
              <div className="flex justify-center items-center ">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-8 w-8"></div>
              </div>
            ) : (
              <div className="flex bg-white rounded-md shadow-md py-1 px-4 relative ">
                <p className="text-black font-bold mr-5 ">
                  {datas?.userCarts?.length}
                </p>
                <CgShoppingCart className="text-2xl text-gotur-main h-fit rounded-md absolute right-0" />
              </div>
            )}
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="bg-gotur-secondary hover:scale-105 ease-in transition duration-100 text-gotur-main px-4 py-1 rounded-lg">
            <SignInButton />
          </div>
        </SignedOut>
      </div>
    </div>
  );
};

export default Header;
