"use client";
import getWishlist from "@/api/getWishlist.api";
import { Button } from "@/components/ui/button";
import { CartProductType } from "@/types/cart.type";
import { ProductType } from "@/types/product.type";
import removeItemFromWishlist from "@/wishlistActions/removeFromWishlist";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function WishlistClient() {
  const [wishlist, setwishlist] = useState([]);

  async function updateWishlist() {
    const response = await getWishlist();
    setwishlist(response.data);
  }

  useEffect(() => {
    updateWishlist();
  }, []);

  async function removeItem(id: string) {
    await removeItemFromWishlist(id);
    await updateWishlist();
    toast("Item Removed Successfully");
  }
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[80%] mx-auto mt-32">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {wishlist.map((item: ProductType) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={item._id}
              >
                <td className="p-4">
                  <img
                    src={item.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt=""
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.price} EGP
                </td>
                <td className="px-6 py-4">
                  <span
                    className="relative group inline-block cursor-pointer w-5 h-5"
                    onClick={() => removeItem(item._id)}
                  >
                    <i className="fa-solid fa-heart text-3xl text-green-500 absolute opacity-100 group-hover:opacity-0 transition-opacity duration-300"></i>

                    <i className="fa-solid fa-heart-crack text-3xl text-gray-500 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
