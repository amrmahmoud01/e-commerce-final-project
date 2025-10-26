"use client";
import getWishlist from "@/api/getWishlist.api";
import React, { createContext, ReactNode, useEffect, useState } from "react";

type WishlistContextProviderProps = {
  children: ReactNode;
};

export const WishlistContext = createContext<{
  wishlist: string[];
  setWishlist: React.Dispatch<React.SetStateAction<string[]>>;
}>({ wishlist: [], setWishlist: () => {} });

export default function WishlistContextProvider({
  children,
}: WishlistContextProviderProps) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  async function retrieveWishlist() {
    const res = await getWishlist();
    const data = res.data;
    const ids = data.map((product: { _id: string }) => product._id);
    setWishlist(ids);
    console.log("IDS: ", ids);
    return ids;
  }

  useEffect(() => {
    retrieveWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlist, setWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
