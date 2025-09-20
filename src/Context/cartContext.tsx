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

// 1. Define the context type
type CartContextType = {
  cart: CartProductType[];
  setCart: Dispatch<SetStateAction<CartProductType[]>>;
  cartNumItems: number;
};

// 2. Create the context (can be undefined if used outside provider)
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

// 3. Props for the provider
type CartContextProviderProps = {
  children: ReactNode;
};

// 4. Provider component
export default function CartContextProvider({
  children,
}: CartContextProviderProps) {
  const [cart, setCart] = useState<CartProductType[]>([]);
  const [cartNumItems, setCartNumItems] = useState(0);

  async function retrieveCart() {
    let token = await getMyToken();
    if (token) {
      let res = await getCart();
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
