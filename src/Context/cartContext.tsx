"use client";
import getCart from "@/cartActions/getCart.action";
import getMyToken from "@/utilities/getMyToken";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import { CartProductType } from "@/types/cart.type";

type CartContextType = {
  cart: CartProductType[];
  setCart: Dispatch<SetStateAction<CartProductType[]>>;
  cartNumItems: number;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

type CartContextProviderProps = {
  children: ReactNode;
};

export default function CartContextProvider({
  children,
}: CartContextProviderProps) {  
  const [cart, setCart] = useState<CartProductType[]>([]);
  const [cartNumItems, setCartNumItems] = useState(0);

  async function retrieveCart() {
    const token = await getMyToken();
    if (token) {
      const res = await getCart();
      console.log(token);
      console.log(res.data.cartId)
      setCart(res.data.data.products);
      return res.data.data.products;
    }
  }

  useEffect(() => {
    // Recalculate items whenever cart changes
    const sum = cart.reduce((acc, item) => acc + item.count, 0);
    setCartNumItems(sum);
  }, [cart]);

  useEffect(() => {
    retrieveCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, cartNumItems }}>
      {children}
    </CartContext.Provider>
  );
} 

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }
  return context;
}
