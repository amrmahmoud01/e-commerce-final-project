import React from "react";
import getBrands from "@/api/getBrands.api";
import Link from "next/link";
import Image from "next/image";
import { Brand } from "@/types/cart.type";

export default async function brands() {
  const res = await getBrands();
  const brands = res;
  console.log(brands);
  return (
    <div className="mx-auto w-[75%] flex items-center justify-center flex-wrap gap-2 mt-30">
      {brands.map((brand: Brand) => (
        <div
          key={brand._id}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 w-64 h-full flex flex-col"
        >
          <Link href={`/brands/${brand._id}`}>
            <Image
              className="rounded-t-lg h-40 object-cover w-full"
              src={brand.image}
              alt={brand.name}
              width={500}
              height={500}
            />
          </Link>
          <div className="p-5">
            <Link href={`/brands/${brand._id}`}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {brand.name}
              </h5>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
