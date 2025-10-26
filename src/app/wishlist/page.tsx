import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wishlist | FreshCart",
  description: "View and manage your favorite items",
};
import React from "react";
import WishlistClient from "./wishlistClientComponent";

export default function wishlist() {
  return (
    <>
      <WishlistClient />
    </>
  );
}
