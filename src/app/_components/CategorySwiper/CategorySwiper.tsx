"use client";
import React from "react";
import Image from "next/image";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { CategoryType } from "@/types/category.type";

export default function CategorySwiper({ data }: { data: CategoryType[] }) {
  return (
    <>
      <h2>Shop Popular Categories</h2>
      <Swiper
        spaceBetween={0}
        slidesPerView={7}
        modules={[Autoplay]}
        autoplay={{ delay: 2000 }}
      >
        {data.map((category: CategoryType) => (
          <SwiperSlide key={category._id} className="w-full ">
            <Image
              width={500}
              height={500}
              alt="test"
              src={category.image}
              className="w-full object-cover h-[150px]"
            />
            <p className="text-center font-bold">{category.name}</p>
          </SwiperSlide>
        ))}

        {/* <SwiperSlide className="w-full">
          <Image alt="" src={} className="w-full object-cover h-[400px]" />
        </SwiperSlide>
        <SwiperSlide className="w-full">
          <Image alt="" src={} className="w-full object-cover h-[400px]" />
        </SwiperSlide> */}
      </Swiper>
    </>
  );
}
