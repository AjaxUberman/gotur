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
import ActiveCartMenu from "./ActiveCartMenu";
import SearchMenu from "./SearchMenu";
import Loading from "./Loading";

const Header = () => {
  const { updateCart } = useContext(CartUpdateContext);
  const { user } = useUser();
  const [datas, setDatas] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [menuActive, setMenuActive] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [searchMenuInput, setSearchMenuInput] = useState<string>("");
  const [searchMenuActive, setSearchMenuActive] = useState<boolean>(false);
  const [filteredDatas, setFilteredDatas] = useState();
  const [restaurantDatas, setRestaurantDatas] = useState();

  const getUserCart = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      await GlobalApi.GetUserCart(user.primaryEmailAddress.emailAddress)
        .then((res) => {
          if (res.userCarts.length > 0) {
            setDatas(res.userCarts);
            calculateTotalPrice(res.userCarts);
          } else {
            setDatas([]);
            setTotalPrice(0);
          }
        })
        .catch((error) => {
          console.error("Error fetching user cart:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const calculateTotalPrice = (cartItems: UserCart[]) => {
    let total = 0;
    for (let item of cartItems) {
      total += item.price;
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      user && getUserCart();
    }, 500);
  }, [updateCart, totalPrice, user]);

  interface UserCart {
    id: string;
    price: number;
    productDescription: string;
    productName: string;
    restaurant: {
      name: string;
    };
  }
  const searchHandler = (e) => {
    setSearchMenuInput(e.target.value);
    setSearchMenuActive(true);
    if (!e.target.value) {
      setSearchMenuActive(false);
    }
  };

  const getAllItems = async () => {
    await GlobalApi.getBusiness("all").then((res) => {
      setRestaurantDatas(res.restaurants);
      setLoading(false);
    });
    const filtered = restaurantDatas?.filter((res) =>
      res.name.toLowerCase().includes(searchMenuInput.toLowerCase())
    );
    setFilteredDatas(filtered);
  };

  useEffect(() => {
    setLoading(true);
    getAllItems();
  }, [searchMenuInput]);

  return (
    <div className="flex sm:justify-around gap-9 md:gap-0 md:py-4 items-center bg-gotur-main shadow-md relative">
      <Link href={"/"} className="flex items-center">
        <Image src={mainLogo} alt="MainLogo" className="w-20 h-20" />
        <h1 className="hidden md:flex text-2xl font-bold text-gotur-secondary">
          GOTUR
        </h1>
      </Link>
      <div className="flex flex-col items-center">
        <div className="flex items-center border p-2 rounded-lg bg-gray-100 md:w-96 w-32 shadow-md">
          <input
            type="text"
            className="bg-transparent focus:outline-none w-full"
            onChange={searchHandler}
          />
          <IoIosSearch />
        </div>
        {searchMenuActive && (
          <div className="absolute top-16 md:top-20 z-40 md:w-96 w-52">
            <SearchMenu
              loading={loading}
              filteredDatas={filteredDatas}
              setSearchMenuActive={setSearchMenuActive}
            />
          </div>
        )}
      </div>
      <div className="text-white tracking-wide">
        <SignedIn>
          <div className="flex items-center justify-center md:gap-5 gap-1 relative ">
            {loading ? (
              <div className="flex justify-center items-center ">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-8 w-8"></div>
              </div>
            ) : (
              <button
                className="flex bg-white rounded-md shadow-md py-1 px-4 relative"
                onClick={() => setMenuActive(!menuActive)}
              >
                <p className="text-black font-bold mr-5 ">
                  {datas?.length > 0 ? datas.length : 0}
                </p>
                <CgShoppingCart className="text-2xl text-gotur-main h-fit rounded-md absolute right-0" />
              </button>
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
      {menuActive && (
        <ActiveCartMenu
          key={updateCart}
          setMenuActive={setMenuActive}
          datas={datas}
          totalPrice={totalPrice}
        />
      )}
    </div>
  );
};

export default Header;
