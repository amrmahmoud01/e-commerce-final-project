"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ProductType } from "@/types/product.type";
import addToCart from "@/cartActions/addToCart.action";
import { CartContext, useCart } from "@/Context/cartContext";
import getMyToken from "@/utilities/getMyToken";
import { toast } from "sonner";
import addToWishlit from "@/wishlistActions/addToWishlist";
import getWishlist from "@/api/getWishlist.api";
import addToWishlist from "@/wishlistActions/addToWishlist";
import { WishlistContext } from "@/Context/wishlistContext";
import removeItemFromWishlist from "@/wishlistActions/removeFromWishlist";

export default function SingleProduct({
  product,
}: {
  product: ProductType;
  // wishlist: string[];
}) {
  const { setCart } = useCart();
  const { wishlist, setWishlist } = useContext(WishlistContext)!;

  // console.log(wishlist);

  async function cartAdd(productId: string) {
    const token = await getMyToken();

    if (token) {
      try {
        const res = await addToCart(productId);
        setCart(res.data.data.products);
      } catch (err) {
        console.log(err);
        toast.error("Error adding item to cart please try again");
      }
    } else {
      toast.error("Please Login to add to cart");
    }
  }

  async function addItemToWishlist(id: string) {
    console.log("PRODUCT ID ", id);
    const res = await addToWishlist(id);
    console.log(res);
    if (res.status === "success") {
      setWishlist(res.data);
      toast.success("Product Wishlisted Successfully");
    } else {
      toast.error("Something wrong happened");
    }
  }

  async function removeFromWishlist(id: string) {
    const res = await removeItemFromWishlist(id);
    if (res.status === "success") {
      setWishlist(res.data);
      toast.success("Product Removed From Wishlist Successfully");
    } else {
      toast.error("Something wrong happened");
    }
  }

  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 " key={product.id}>
        <div className="p-5">
          <Card className="p-2 relative">
            {wishlist.includes(product.id) ? (
              <i
                className="fa-solid fa-heart absolute top-3 right-3 text-green-500 text-2xl cursor-pointer hover:scale-130 duration-100"
                onClick={() => {
                  removeFromWishlist(product.id);
                }}
              ></i>
            ) : (
              <i
                className="fa-regular fa-heart absolute top-3 right-3 text-2xl cursor-pointer hover:scale-130 duration-100"
                onClick={() => {
                  console.log(product.id);
                  addItemToWishlist(product.id);
                }}
              ></i>
            )}
            <Link href={`/products/${product.id}`}>
              <CardHeader>
                <CardTitle>
                  <img src={product.imageCover}></img>
                </CardTitle>
                <CardDescription className="text-emerald-300">
                  {product.category.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="font-bold">
                <p>{product.title}</p>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between w-full">
                  <span>{product.price} EGP</span>
                  <span>
                    {product.ratingsAverage}
                    <i className="fa-solid fa-star ms-1 text-amber-300"></i>
                  </span>
                </div>
              </CardFooter>
            </Link>
            <Button
              onClick={() => cartAdd(product._id)}
              className="cursor-pointer"
            >
              Add to Cart
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}
