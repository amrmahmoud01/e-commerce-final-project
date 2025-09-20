import getAllCategories from "@/api/getAllCategories.api";
import React from "react";

import Image from "next/image";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import CategorySwiper from "./../CategorySwiper/CategorySwiper";
import { CategoryType } from "@/types/category.type";

export default async function CategorySlider() {
  const data: CategoryType[] = await getAllCategories();

  return (
    <>
      <CategorySwiper data={data} />
    </>
  );
}
