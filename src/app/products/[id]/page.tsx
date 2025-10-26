import React from "react";
import { Button } from "@/components/ui/button";
import selectedProduct from "@/api/selectedProduct";
import Details from "./../../_components/Details/Details";
import { ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { id: string } },
) {
  const { id } = await params;

  const data = await selectedProduct(id);

  console.log("Product Name:", data.title);

  return { title: data.title };
}

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
