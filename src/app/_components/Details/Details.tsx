"use client";
import { ProductType } from "@/types/product.type";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import addToCart from "@/cartActions/addToCart.action";
import { toast } from "sonner";
import getRelatedProducts from "@/api/getRelatedProducts.api";
import SingleProduct from "../SingleProduct/SingleProduct";

export default function Details({ data }: { data: ProductType }) {
  // let { setCart } = useContext(CartContext);
  const [relatedProducts, setrelatedProducts] = useState([]);

  async function cartAdd(productId: string) {
    try {
      const res = await addToCart(productId);
      console.log(res);
    } catch (err) {
      console.log(err);
      toast.error("Error adding item to cart please try again");
    }
  }

  async function related() {
    const relatedProducts = await getRelatedProducts(data.category._id);
    setrelatedProducts(relatedProducts);
  }

  useEffect(() => {
    const res = related();
  }, []);
  console.log("Related Products:", relatedProducts);
  return (
    <>
      <div className="container w-[80%] mx-auto p-4 flex flex-wrap">
        <div className="w-1/4">
          <div className="p-4">
            <Image
              src={data.imageCover}
              width={500}
              height={500}
              alt=""
              className="w-full"
            />
          </div>
        </div>
        <div className="w-3/4">
          <div className="p-10 flex flex-col justify-evenly h-full">
            <h1 className="font-bold text-2xl">{data.title}</h1>
            <p>{data.description}</p>
            <p className="text-emerald-300">{data.category.name}</p>
            <div className="flex justify-between w-full">
              <span>{data.price} EGP</span>
              <span>
                {data.ratingsAverage}
                <i className="fa-solid fa-star ms-1 text-amber-300"></i>
              </span>
            </div>
            <Button
              className="cursor-pointer w-full my-2"
              onClick={() => cartAdd(data._id)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
        <h1 className="text-center w-full text-2xl mt-20 font-bold">Related Products:</h1>
        <div className="w-full flex">
          {relatedProducts.map((currentProduct: ProductType) => (
            <SingleProduct product={currentProduct} key={currentProduct._id} />
          ))}
        </div>
      </div>
    </>
  );
}
