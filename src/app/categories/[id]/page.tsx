"use server";
import getCategoryProducts from "@/api/getCategoryProducts.api";
import getSpecificBrandProducts from "@/api/getSpecificBrandProducts.api";
import SingleProduct from "@/app/_components/SingleProduct/SingleProduct";
import { ProductType } from "@/types/product.type";
import React from "react";

export default async function categoryProducts({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params;

  let data = await getCategoryProducts(id);
  console.log("Cat Products:", data);
  return (
    <div className=" container mx-auto w-[80%] flex flex-wrap my-12">
      {data.map((currentProduct: ProductType) => (
        <SingleProduct product={currentProduct} key={currentProduct._id} />
      ))}
    </div>
  );
}
