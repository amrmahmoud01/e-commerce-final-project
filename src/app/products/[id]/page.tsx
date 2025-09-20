import React from "react";
import { Button } from "@/components/ui/button";
import selectedProduct from "@/api/selectedProduct";
import Details from "./../../_components/Details/Details";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let { id } = await params;
  let data = await selectedProduct(id);
  console.log(data);
  return (
    <>
      <Details data={data} />
    </>
  );
}
