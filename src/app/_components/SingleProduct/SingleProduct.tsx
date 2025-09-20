"use client";
import React, { useContext } from "react";
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

export default function SingleProduct({ product }: { product: ProductType }) {
  let { setCart } = useCart();

  async function cartAdd(productId: string) {
    let token = await getMyToken();

    if (token) {
      try {
        let res = await addToCart(productId);
        setCart(res.data.data.products);
      } catch (err) {
        console.log(err);
        toast.error("Error adding item to cart please try again");
      }
    } else {
      toast.error("Please Login to add to cart");
    }
  }

  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/4 xl:w-1/5 " key={product.id}>
        <div className="p-5">
          <Card className="p-2">
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
