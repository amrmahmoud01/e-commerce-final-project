"use server";
import getSpecificBrandProducts from "@/api/getSpecificBrandProducts.api";
import SingleProduct from "@/app/_components/SingleProduct/SingleProduct";
import { ProductType } from "@/types/product.type";
import React from "react";

export default async function BrandProducts({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getSpecificBrandProducts(id);
  console.log(id);
  console.log("Brand Products:", data);
  return (
    <div className=" container mx-auto w-[80%] flex flex-wrap my-12">
      {data.map((currentProduct: ProductType) => (
        <SingleProduct product={currentProduct} key={currentProduct._id} />
      ))}
    </div>
  );
}
