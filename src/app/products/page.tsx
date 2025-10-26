import React from "react";

import getProducts from "@/api/products.api";
import SingleProduct from "../_components/SingleProduct/SingleProduct";
import AllProducts from "../_components/AllProducts/AllProducts";

export default async function Products() {
  const data = await getProducts();

  return (
    <>
      <AllProducts />
    </>
  );
}
