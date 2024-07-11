"use client";
import React, { ReactNode, useState } from "react";
import Header from "@/components/layouts/Header";
import { CartUpdateContext } from "./_context/CartUpdateContext";

interface ProviderProps {
  children: ReactNode;
}

const Provider = ({ children }: ProviderProps) => {
  const [updateCart, setUpdateCart] = useState<boolean>(false);
  return (
    <CartUpdateContext.Provider value={{ updateCart, setUpdateCart }}>
      <div className="">
        <Header />
        <div className="lg:px-44 md:px-20">{children}</div>
      </div>
    </CartUpdateContext.Provider>
  );
};

export default Provider;
