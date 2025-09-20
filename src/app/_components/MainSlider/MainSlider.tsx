"use client";
import React from "react";
import img1 from "../../../../public/images/cheerful-african-american-woman-supermarket-600nw-2207384301.webp";
import img2 from "../../../../public/images/food-2179178_1920-1-998x665.jpg";
import img3 from "../../../../public/images/intro-1673380828.jpg";
import Image from "next/image";
import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// init Swiper:

export default function MainSlider() {
  return (
    <div className="w-[80%] mx-auto p-4 my-4 flex mt-20">
      <div className="w-3/4">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 2000 }}
        >
          <SwiperSlide className="w-full">
            <Image
              alt=""
              src={img1}
              className="w-full object-cover h-[400px]"
            />
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <Image
              alt=""
              src={img2}
              className="w-full object-cover h-[400px]"
            />
          </SwiperSlide>
          <SwiperSlide className="w-full">
            <Image
              alt=""
              src={img3}
              className="w-full object-cover h-[400px]"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-1/4">
        <Image alt="" src={img2} className="w-full object-cover h-[200px]" />
        <Image alt="" src={img3} className="w-full object-cover h-[200px]" />
      </div>
    </div>
  );
}
