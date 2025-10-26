import { ProductType } from "@/types/product.type";
import React from "react";
import DetailsClient from "./DetailsClientComponent";
import { Metadata, ResolvingMetadata } from "next";

//TODO Generate Dynamic Metadata

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = params;
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`
  );
  const data = await res.json();
  console.log("META DATA:", data);

  return {
    title: data.data.title,
  };
}

export default function Details({ data }: { data: ProductType }) {
  return (
    <>
      <DetailsClient data={data} />
    </>
  );
}
