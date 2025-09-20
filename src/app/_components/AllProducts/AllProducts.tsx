import getProducts from "@/api/products.api";
import React from "react";
import SingleProduct from "../SingleProduct/SingleProduct";
import { ProductType } from "@/types/product.type";

export default async function AllProducts() {
  const data = await getProducts();
  return (
    <div className=" container mx-auto w-[80%] flex flex-wrap my-12">
      {data.map((currentProduct: ProductType) => (
        <SingleProduct product={currentProduct} key={currentProduct._id} />
      ))}
    </div>
  );
}
