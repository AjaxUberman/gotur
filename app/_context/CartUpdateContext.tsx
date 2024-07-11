import { createContext, Dispatch, SetStateAction } from "react";

interface CartUpdateContextType {
  updateCart: boolean;
  setUpdateCart: Dispatch<SetStateAction<boolean>>;
}

const defaultValue: CartUpdateContextType = {
  updateCart: false,
  setUpdateCart: () => {},
};

export const CartUpdateContext =
  createContext<CartUpdateContextType>(defaultValue);
