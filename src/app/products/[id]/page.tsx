import React from "react";
import { Button } from "@/components/ui/button";
import selectedProduct from "@/api/selectedProduct";
import Details from "./../../_components/Details/Details";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await selectedProduct(id);
  console.log(data);
  return (
    <>
      <Details data={data} />
    </>
  );
}
