import getAllCategories from "@/api/getAllCategories.api";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default async function categories() {
  let res = await getAllCategories();
  let categories = res;
  return (
    <div className="mx-auto w-[75%] flex items-center justify-center flex-wrap gap-2 mt-30">
      {categories.map((cat) => (
        <div
          key={cat._id}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 w-64 h-full flex flex-col"
        >
          <Link href={`/categories/${cat._id}`}>
            <img
              className="rounded-t-lg h-40 object-cover w-full"
              src={cat.image}
              alt={cat.name}
            />
          </Link>
          <div className="p-5">
            <Link href={`/categories/${cat._id}`}>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {cat.name}
              </h5>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
